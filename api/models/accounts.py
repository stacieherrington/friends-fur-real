from pydantic import BaseModel
from typing import Optional, List
from models.rescue import Address
from models.pet import PetOut
from models.success_story import SuccessStoryOut
from models.adoption_application import AdoptionApplicationOut
from pydantic_model import PydanticObjectId


class AccountIn(BaseModel):
    email: str | None
    password: str | None


class Account(AccountIn):
    id: PydanticObjectId
    roles: List[str]


class AccountOut(BaseModel):
    id: str
    roles: List[str]


class AccountUpdate(BaseModel):
    email: str | None
    password: str | None
    first_name: str | None
    last_name: str | None
    address: Address | None
    picture: str | None
    applications: list | None
    favorites: list | None
    adopted_pets: list | None
    success_stories: list | None


class AccountList(BaseModel):
    accounts: List[AccountOut]
