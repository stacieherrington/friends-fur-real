from pydantic import BaseModel
from typing import List


class PetUpdate(BaseModel):
    name: str
    type: str | None
    breed: str | None
    age: int | None
    sex: str | None
    size: str | None
    description: str | None
    weight: int | None  # str ?
    pictures: str | None
    primary_color: str | None
    ok_with_dogs: bool | None
    ok_with_cats: bool | None
    shots_up_to_date: bool | None
    ok_with_kids: bool | None
    spayed_neutered: bool | None
    house_trained: bool | None
    special_needs: bool | None
    is_adopted: bool | None


class PetIn(PetUpdate):
    rescue_id: str | None


class PetOut(PetIn):
    id: str


class PetsList(BaseModel):
    pets: List[PetOut]
