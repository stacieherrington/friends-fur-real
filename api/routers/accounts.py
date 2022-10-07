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
from typing import Optional
import os

from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)

from models import Account, AccountIn, AccountOut, AccountList, AccountUpdate

SIGNING_KEY = os.environ["SIGNING_KEY"]
ALGORITHM = "HS256"
COOKIE_NAME = "fastapi_access_token"

router = APIRouter(tags=["Account Authentication"])

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
    account = repo.get_account(email)
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


@router.post("/token")
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


@router.get("/token", response_model=AccessToken | None)
async def get_token(
    request: Request, account: AccountOut = Depends(try_get_current_account)
):
    if COOKIE_NAME in request.cookies:
        return {
            "access_token": request.cookies[COOKIE_NAME],
            "type": "Bearer",
            "account": account,
        }


@router.delete("/token")
async def delete_token(request: Request, response: Response):
    delete_access_cookie(request, response)
    return True


@router.post("/api/accounts/", response_model=AccountOut | HttpError)
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
)
async def list_accounts(
    queries: AccountQueries = Depends(),
):
    return AccountList(accounts=queries.list_accounts())


@router.patch(
    "/api/accounts/{id}/",
    response_model=AccountOut,
)
async def update_account(
    id: str,
    data: AccountUpdate,
    queries: AccountQueries = Depends(),
):
    response = queries.update_account(id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "This account id does not exist!")


@router.delete("/api/accounts/{id}/")
async def delete_account(id: str, queries: AccountQueries = Depends()):
    response = queries.delete_account(id)
    if response:
        return response, {"message": f"Account {id} has been deleted!"}
    else:
        raise HTTPException(404, "Id for this account does not exist!")
