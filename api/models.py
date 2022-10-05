from pydantic import BaseModel
from typing import List




class PetIn(BaseModel):
    name:str
    type:str | None
    breed:str | None
    age:int | None
    sex:str | None
    size:str | None
    description:str | None
    weight:int | None # str ?
    pictures: List[str] | None
    primary_color:str | None
    ok_with_dogs:bool | None
    ok_with_cats:bool | None
    shots_up_to_date:bool | None
    ok_with_kids:bool | None
    spayed_neutered:bool | None
    house_trained:bool | None
    special_needs:bool | None
    adopter: str | None # AccountOut ?
    is_adopted:bool | None


class PetOut(PetIn):
    id:str


class PetsList(BaseModel):
    pets: List[PetOut]


class RescueIn(BaseModel):
    name: str
    description: str | None
    address: Address
    logo: str | None
    picture: str | None
    rescue_admin: object | None
    pets: List[PetOut] | None
    staff: List[str] | None # no staff/account yet
    approved_adopters: List[str] | None


class RescueOut(RescueIn):
    id: str

class RescueList(BaseModel):
    rescues: List[RescueOut]
