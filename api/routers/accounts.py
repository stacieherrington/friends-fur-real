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
    tags=[
        "Token Authorization",
    ],
)
async def get_token(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    # this line is to check if the user is logined
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post(
    "/api/accounts/",
    description="create an account, form.address.zip_code is required!!!",
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
    tags=["Token Authorization"],
)
async def delete_session(
    account_id: str,
    # here is how to check current_account data/roles from back end 1
    account: dict = Depends(authenticator.get_current_account_data),
    repo: SessionQueries = Depends(),
) -> bool:
    # here is how to check current_account data/roles from back end 2
    if "base" not in account["roles"]:
        raise not_authorized
    repo.delete_sessions(account_id)
    return True


# IDK if we need this:
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
    "/api/manage/staffs/",
    tags=["Accounts"],
    response_model=AccountList,
    summary="List Rescue Staffs",
    description="* admin required! list all the staffs for rescue admin by rescue_id, will auto check if logined account is 'admin', will auto get admin's rescue_id and only display staffs belone to the rescue! ",
)
async def list_accounts(
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    # 1. check if "admin" in "roles":
    if "admin" not in account["roles"]:
        raise not_authorized
    # 2. get rescue_id from admin account:
    rescue_id = account["rescue_id"]
    # 3. return the list of staffs by rescue_id:
    return AccountList(accounts=queries.list_accounts_by_rescue_id(rescue_id))


@router.get(
    "/api/accounts/profile/",
    response_model=AccountDisplay,
    summary="Detail Current Logined Account",
    description="display on account profile page,can use PATCH /api/accounts/{account_id} to update",
    tags=["Accounts"],
)
async def single_account(
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    # check if logined:
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
    summary="Update Current Logined Account",
    description="allowed logined user to update personal detail in account profile page.(Don't Change Email! CAN NOT change password yet!)",
    tags=["Accounts"],
)
def update_account(
    request: Request,
    data: AccountUpdate,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    # for change password: need to check old passwrod, need a way to decode hashed password -> ensure password will be hashed -> data.password = pwd_context.hash(data.password)
    # check if logined:
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
    summary="Promote an account as a staff by email",
    description="Admin enter an email to promote that account to 'staff' with the same rescue_id of admin(aotu use same rescue_id of the admin)",
    tags=["Accounts"],
)
async def promote_account(
    email: str,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    # 1. check if "admin" in "roles":
    if "admin" not in account["roles"]:
        raise not_authorized
    # 2. get rescue_id from current admin account:
    rescue_id = account["rescue_id"]
    # 3. promote account by using email and rescue_id:
    response = queries.promote_account(email, rescue_id)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot promote-- Invalid Account ")


@router.patch(
    "/api/accounts/demote/{email}/",
    summary="Demote an account as a staff by email",
    description="Admin enter an email to Demote that account, remove staff with the same rescue_id of admin. This api will check if the staff is belone to this admin's rescue",
    tags=["Accounts"],
)
async def demote_account(
    email: str,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends(),
):
    # 1. check if "admin" in current account 'roles':
    if "admin" not in account["roles"]:
        raise not_authorized
    # get rescue_id from current account data:
    rescue_id = account["rescue_id"]
    response = queries.demote_account(email, rescue_id)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot deomote-- Invalid Account ")


# Can you move this localize function under queries.account.py?
# Make it one function when you call it pass in an account_id
# so we can use it anywhere we could by just call import can call it?
@router.patch(
    "/api/accounts/localize/{id}/",
    tags=["Accounts"],
)
async def localize_account(
    id: str,
    queries: AccountQueries = Depends(),
    address_service: Nominatim = Depends(),
):
    account = queries.get_account_dict(id)
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
