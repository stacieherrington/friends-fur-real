from pydantic import BaseModel
from typing import List

from models.pet import PetOut


class Address(BaseModel):
    address_one: str
    address_two: str
    city: str
    state: str
    zip_code: str

class RescueIn(BaseModel):
    name: str
    description: str | None
    address: Address | None
    logo: str | None
    picture: str | None
    rescue_admin: str | None  # Replace with Account
    pets: List[PetOut] | None
    staff: List[str] | None  # Replace with List[Account]
    approved_adopters: List[str] | None  # Replace with List[Account]


class RescueOut(RescueIn):
    id: str


class RescuesList(BaseModel):
    rescues: List[RescueOut]