from pydantic import BaseModel
from typing import List

from models.pet import PetOut

class Location(BaseModel):
    latitude: str | None
    longitude: str | None

class Address(BaseModel):
    address_one: str | None
    address_two: str | None
    city: str | None
    state: str | None
    zip_code: str | None

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
    location: Location | None


class RescueOut(RescueIn):
    id: str | None


class RescuesList(BaseModel):
    rescues: List[RescueOut]