from pydantic import BaseModel
from typing import List
from models.application import ApplicationOut
from models.success_story import SuccessStoryOut  # , Optional
from models.rescue import Address, Location
from models.pet import PetOut

# from models.pet import PetOut
# from models.success_story import SuccessStoryOut
# from models.adoption_application import ApplicationOut
# from pydantic_model import PydanticObjectId


class SessionOut(BaseModel):
    jti: str
    account_id: str


class AccountIn(BaseModel):
    email: str
    password: str
    address: Address


class Account(AccountIn):
    id: str
    roles: List[str]
    rescue_id: str | None
    address: Address | None


class AccountOut(BaseModel):
    email: str
    id: str
    roles: List[str]
    # rescue_id: str | None
    address: Address | None


class AccountDisplay(AccountOut):
    first_name: str | None
    last_name: str | None
    picture: str | None
    address: Address | None
    location: Location | None


class AccountUpdate(AccountDisplay):

    password: str | None


class AccountList(BaseModel):
    accounts: List[AccountOut]
