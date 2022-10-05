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

class AdoptionApplicationIn(BaseModel):
    pet: PetOut | None
    first_name: str | None
    last_name: str | None
    address: Address | None
    phone_number: str | None
    has_small_children: bool | None
    has_dogs: bool | None
    has_cats: bool | None
    residence_type: str | None
    residence_owned: str | None
    landlord_restrictions: str | None
    date_ready: str | None
    wants_preapproval: bool | None
    agrees_to_terms: bool | None
    status: str | None

class AdoptionApplicationOut(PetIn):
    id:str

class AdoptionApplicationList(BaseModel):
    adoptions: List[AdoptionApplicationOut]