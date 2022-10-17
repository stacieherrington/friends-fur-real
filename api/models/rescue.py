from pydantic import BaseModel
from typing import List

from models.pet import PetOut


class Location(BaseModel):
    type: str | None
    coordinates: List[float] | None


class Address(BaseModel):
    address_one: str | None
    address_two: str | None
    city: str | None
    state: str | None
    zip_code: str


class RescueIn(BaseModel):
    name: str
    description: str | None
    address: Address | None
    logo: str | None
    picture: str | None
    location: Location | None
    admin_email: str


class RescueOut(RescueIn):
    id: str | None


class RescuesList(BaseModel):
    rescues: List[RescueOut]
