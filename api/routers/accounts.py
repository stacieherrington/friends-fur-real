from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token

from .auth import authenticator
from pydantic import BaseModel

from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)
from queries.sessions import SessionQueries

from models.accounts import (
    Account,
    AccountIn,
    AccountOut,
    AccountList,
    AccountUpdate,
    AccountDisplay,
)
from acl.nominatim import Nominatim


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.get(
    "/token/",
    response_model=AccountToken | None,
)
async def get_token(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post(
    "/api/accounts/",
    description="create an account, form.address.zip_code is required!",
    response_model=AccountToken | HttpError,
    tags=["Accounts"],
)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
    session: SessionQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account already exists! Please change credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo, session)
    return AccountToken(account=account, **token.dict())


@router.delete(
    "/api/sessions/{account_id}/",
)
async def delete_session(
    account_id: str,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: SessionQueries = Depends(),
) -> bool:
    if "base" not in account["roles"]:
        raise not_authorized
    repo.delete_sessions(account_id)
    return True


@router.get(
    "/api/accounts/",
    response_model=AccountList,
    tags=["Accounts"],
)
async def list_accounts(
    queries: AccountQueries = Depends(),
):
    return AccountList(accounts=queries.list_accounts())


@router.get(
    "/api/manage/staff/",
    tags=["Accounts", "management"],
    response_model=AccountList,
    summary="List Rescue staff ----> management",
    description="* admin required! list all the staff for\
         rescue admin by rescue_id, will auto check\
        if logged in account is 'admin', will auto get\
        admin's rescue_id and only display staff that belong to the rescue! ",
)
async def list_accounts(
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    if "admin" not in account["roles"]:
        raise not_authorized
    rescue_id = account["rescue_id"]
    return AccountList(accounts=queries.list_accounts_by_rescue_id(rescue_id))


@router.get(
    "/api/accounts/profile/",
    response_model=AccountDisplay,
    summary="Detail Current Logined Account",
    description="display on account profile page,can\
         use PATCH /api/accounts/{account_id} to update",
    tags=["Accounts"],
)
async def single_account(
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    if account and authenticator.cookie_name in request.cookies:
        account_id = account["id"]
    else:
        raise not_authorized

    response = queries.single_account(account_id)
    if response:
        return response
    else:
        raise HTTPException(
            404, f"This Account id: {account_id} does not exist"
        )


@router.patch(
    "/api/accounts/profile/",
    response_model=AccountDisplay,
    summary="Update Current Logged in Account",
    description="Allows logged in user to update personal\
     detail in account profile page.(Don't Change Email! CAN\
         NOT change password yet!)",
    tags=["Accounts"],
)
def update_account(
    request: Request,
    data: AccountUpdate,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    if account and authenticator.cookie_name in request.cookies:
        account_id = account["id"]
    else:
        raise not_authorized
    response = queries.update_account(account_id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "This account id does not exist!")


@router.patch(
    "/api/accounts/promote/{email}/",
    summary="Promote an account as a staff by email ----> management",
    description="Admin enter an email to promote that account to 'staff'\
         with the same rescue_id of admin(auto use same rescue_id of the admin)",
    tags=["Accounts", "management"],
)
async def promote_account(
    email: str,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    if "admin" not in account["roles"]:
        raise not_authorized
    rescue_id = account["rescue_id"]
    response = queries.promote_account(email, rescue_id)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot promote-- Invalid Account ")


@router.patch(
    "/api/accounts/demote/{email}/",
    summary="Demote an account as a staff by email ----> management",
    description="Admin enter an email to Demote that account, remove\
        staff with the same rescue_id of admin. This api will\
        check if the staff is belong to this admin's rescue",
    tags=["Accounts", "management"],
)
async def demote_account(
    email: str,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    if "admin" not in account["roles"]:
        raise not_authorized
    rescue_id = account["rescue_id"]
    response = queries.demote_account(email, rescue_id)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot demote-- Invalid Account ")


@router.patch(
    "/api/accounts/{account_id}/localize/",
    tags=["Accounts"],
)
async def localize_account(
    account_id: str,
    queries: AccountQueries = Depends(),
    address_service: Nominatim = Depends(),
):
    account = queries.get_account_dict(account_id)
    address = account["address"]
    address_string = address["address_one"]
    if address["address_two"] is not None:
        address_string = f"{address_string}, {address['address_two']}"
    address_string = f"{address_string},{address['city']}, {address['state']}, {address['zip_code']}"
    query = address_string.replace(" ", "+")
    location = address_service.location_from_address(query)
    if location is None:
        address_string = (
            f"{address['city']}, {address['state']}, {address['zip_code']}"
        )
        query = address_string.replace(" ", "+")
        location = address_service.location_from_address(query)
    response = queries.set_account_location(account, location)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot set location")
