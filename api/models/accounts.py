from pydantic import BaseModel
from typing import List
from models.rescue import Address

class AccountIn(BaseModel):
    email: str
    password: str


class Account(AccountIn):
    id: str
    roles: List[str]


class AccountOut(BaseModel):
    id: str
    roles: List[str]


class AccountUpdate(AccountIn):
    first_name: str
    last_name: str
    address: Address
    picture: str
    applications: List[str]
    favorites: List[str]
    adopted_pets: List[str]
    success_stories: List[str]
    roles: List[str]


class AccountList(BaseModel):
    accounts: List[AccountOut]