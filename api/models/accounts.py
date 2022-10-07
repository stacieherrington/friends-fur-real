
from pydantic import BaseModel
from typing import List
from models.rescue import Address
from models.pet import PetOut
from models.success_story import SuccessStoryOut
from models.adoption_application import AdoptionApplicationOut
from pydantic_model import PydanticObjectId

class AccountIn(BaseModel):
    email: str
    password: str


class Account(AccountIn):
    id: PydanticObjectId
    roles: List[str]


class AccountOut(BaseModel):
    id: str
    roles: List[str]


class AccountUpdate(AccountIn):
    first_name: str
    last_name: str
    address: Address
    picture: str
    applications: List[AdoptionApplicationOut]
    favorites: List[PetOut]
    adopted_pets: List[PetOut]
    success_stories: List[SuccessStoryOut]
    roles: List[str]


class AccountList(BaseModel):
    accounts: List[AccountOut]