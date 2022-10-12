from pydantic import BaseModel
from typing import List
from models.adoption_application import AdoptionApplicationOut
from models.success_story import SuccessStoryOut  # , Optional
from models.rescue import Address, Location
from models.pet import PetOut

# from models.pet import PetOut
# from models.success_story import SuccessStoryOut
# from models.adoption_application import AdoptionApplicationOut
# from pydantic_model import PydanticObjectId

class SessionOut(BaseModel):
    jti:str
    account_id:str

class AccountIn(BaseModel):
    email: str | None
    password: str | None


class Account(AccountIn):
    id: str
    roles: List[str]


class AccountOut(BaseModel):
    email: str
    id: str
    roles: List[str]


class AccountDisplay(BaseModel):
    first_name: str | None
    last_name: str | None
    address: Address | None
    picture: str | None
    applications: List[AdoptionApplicationOut] | None
    favorites: List[PetOut] | None
    adopted_pets: List[PetOut] | None
    success_stories: List[SuccessStoryOut] | None
    location: Location | None


class AccountUpdate(AccountDisplay):
    # email: str | None
    password: str | None


class AccountList(BaseModel):
    accounts: List[AccountOut]
