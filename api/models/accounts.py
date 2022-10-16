from pydantic import BaseModel
from typing import List
from models.rescue import Address, Location


class SessionOut(BaseModel):
    jti: str
    account_id: str


class AccountIn(BaseModel):
    email: str
    password: str
    address: Address


class Account(AccountIn):
    email: str
    id: str
    first_name: str | None
    last_name: str | None
    picture: str | None
    roles: List[str]
    rescue_id: str | None
    address: Address | None
    location: Location | None


class AccountOut(BaseModel):
    email: str
    id: str
    first_name: str | None
    last_name: str | None
    picture: str | None
    roles: List[str]
    rescue_id: str | None
    address: Address | None
    location: Location | None


class AccountDisplay(BaseModel):
    email: str
    first_name: str | None
    last_name: str | None
    picture: str | None
    address: Address | None


class AccountUpdate(BaseModel):
    first_name: str | None
    last_name: str | None
    picture: str | None
    address: Address | None


class AccountList(BaseModel):
    accounts: List[AccountOut]
