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
    "/api/{rescue_id}/staffs/",
    tags=["Accounts"],
    response_model=AccountList,
    summary="List Rescue Staffs",
    description="list all the staffs for by rescue_id",
)
async def list_accounts(
    rescue_id: str,
    queries: AccountQueries = Depends(),
):
    return AccountList(accounts=queries.list_accounts_by_rescue_id(rescue_id))


@router.get(
    "/api/accounts/{id}/",
    response_model=AccountDisplay,
    tags=["Accounts"],
)
def single_account(id: str, queries: AccountQueries = Depends()):
    account = queries.single_account(id)
    if account:
        return account
    else:
        raise HTTPException(404, f"This Account id: {id} does not exist")


@router.patch(
    "/api/accounts/{id}/",
    response_model=AccountDisplay,
    tags=["Accounts"],
)
def update_account(
    id: str,
    data: AccountUpdate,
    queries: AccountQueries = Depends(),
):
    # ensure password will be hashed
    # data.password = pwd_context.hash(data.password)
    response = queries.update_account(id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "This account id does not exist!")


@router.patch(
    "/api/accounts/promote/{id}/",
    tags=["Accounts"],
)
async def promote_account(id: str, queries: AccountQueries = Depends()):
    response = queries.promote_account(id)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot promote-- Invalid Account ")


@router.patch(
    "/api/accounts/demote/{id}/",
    tags=["Accounts"],
)
async def demote_account(id: str, queries: AccountQueries = Depends()):
    response = queries.demote_account(id)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot promote-- Invalid Account ")


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
