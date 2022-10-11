from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    Cookie,
    APIRouter,
    Request,
)
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional  # , List

# from bson.objectid import ObjectId
import os

from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)

from models.accounts import (
    Account,
    AccountIn,
    AccountOut,
    AccountList,
    AccountUpdate,
    AccountDisplay,
)
from acl.nominatim import Nominatim

SIGNING_KEY = os.environ["SIGNING_KEY"]
ALGORITHM = "HS256"
COOKIE_NAME = "fastapi_access_token"

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)


class HttpError(BaseModel):
    detail: str


class TokenData(BaseModel):
    username: str


class AccessToken(BaseModel):
    access_token: str
    type: str
    account: AccountOut | None


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_account(
    repo: AccountQueries,
    email: str,
    password: str,
) -> Account:
    account = repo.get_account_to_auth(email)
    if not account:
        return False
    if not verify_password(password, account.password):
        return False
    return account


def create_access_token(data: dict) -> str:
    encoded_jwt = jwt.encode(data, SIGNING_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def set_access_cookie(
    account: Account,
    request: Request,
    response: Response,
) -> str:
    account_data = AccountOut(**account.dict()).dict()
    data = {"sub": account.email, "account": account_data}
    access_token = create_access_token(
        data=data,
    )
    token = {"access_token": access_token, "token_type": "bearer"}
    headers = request.headers
    samesite = "none"
    secure = True
    if "origin" in headers and "localhost" in headers["origin"]:
        samesite = "lax"
        secure = False
    response.set_cookie(
        key=COOKIE_NAME,
        value=access_token,
        httponly=True,
        samesite=samesite,
        secure=secure,
    )
    return token


def delete_access_cookie(
    request: Request,
    response: Response,
) -> str:
    headers = request.headers
    samesite = "none"
    secure = True
    if "origin" in headers and "localhost" in headers["origin"]:
        samesite = "lax"
        secure = False
    response.delete_cookie(
        key=COOKIE_NAME,
        httponly=True,
        samesite=samesite,
        secure=secure,
    )


async def try_get_current_account(
    bearer_token: Optional[str] = Depends(oauth2_scheme),
    cookie_token: Optional[str]
    | None = (Cookie(default=None, alias=COOKIE_NAME)),
) -> AccountOut:
    token = bearer_token
    if not token and cookie_token:
        token = cookie_token
    try:
        payload = jwt.decode(token, SIGNING_KEY, algorithms=[ALGORITHM])
        if "account" in payload:
            return AccountOut(**payload["account"])
    except (JWTError, AttributeError):
        pass
    return None


async def get_current_account(
    account: AccountOut = Depends(try_get_current_account),
) -> AccountOut:
    if account is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return account


@router.post("/token", tags=["Token Authorization"])
async def login_for_access_token(
    response: Response,
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    repo: AccountQueries = Depends(),
):
    account = authenticate_account(
        repo, form_data.username, form_data.password
    )
    if not account:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return set_access_cookie(account, request, response)


@router.get(
    "/token",
    response_model=AccessToken | None,
    tags=[
        "Token Authorization",
    ],
)
async def get_token(
    request: Request, account: AccountOut = Depends(try_get_current_account)
):
    if COOKIE_NAME in request.cookies:
        return {
            "access_token": request.cookies[COOKIE_NAME],
            "type": "Bearer",
            "account": account,
        }


@router.delete("/token", tags=["Token Authorization"])
async def delete_token(request: Request, response: Response):
    delete_access_cookie(request, response)
    return True


@router.post(
    "/api/accounts/",
    response_model=AccountOut | HttpError,
    tags=["Account Authentication"],
)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    info.password = pwd_context.hash(info.password)
    try:
        account = repo.create(info)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account already exists! Please change credentials",
        )
    set_access_cookie(account, request, response)
    return account


@router.get(
    "/api/accounts/",
    response_model=AccountList,
    tags=["Account Authentication"],
)
async def list_accounts(
    queries: AccountQueries = Depends(),
):
    return AccountList(accounts=queries.list_accounts())


@router.get(
    "/api/accounts/{id}/",
    response_model=AccountDisplay,
    tags=["Account Authentication"],
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
    tags=["Account Authentication"],
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


@router.delete(
    "/api/accounts/{id}/",
    tags=["Account Authentication"],
)
async def delete_account(id: str, queries: AccountQueries = Depends()):
    response = queries.delete_account(id)
    if response:
        return response
    else:
        raise HTTPException(404, "Id for this account does not exist!")


@router.patch(
    "/api/accounts/promote/{id}/",
)
async def promote_account(
    id: str, queries: AccountQueries = Depends()
):
    response = queries.promote_account(id)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot promote-- Invalid Account ")

@router.patch(
    "/api/accounts/demote/{id}/",
)
async def demote_account(
    id: str, queries: AccountQueries = Depends()
):
    response = queries.demote_account(id)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot promote-- Invalid Account ")

@router.patch(
    "/api/accounts/localize/{id}/",
)
async def localize_account(
    id: str, queries: AccountQueries = Depends(), address_service: Nominatim = Depends()
):
    account = queries.get_account_dict(id)
    address = account["address"]
    address_string = address["address_one"]
    if address["address_two"] is not None:
        address_string = f"{address_string}, {address['address_two']}"
    address_string = f"{address_string},{address['city']}, {address['state']}, {address['zip_code']}"
    query = address_string.replace(" ", "+")
    location = address_service.location_from_address(query)
    response = queries.set_account_location(account, location)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot set location")
