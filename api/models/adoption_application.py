from pydantic import BaseModel
from typing import List
from models.rescue import Address
from models.pet import PetOut

class AdoptionApplicationUpdate(BaseModel):
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
    
class AdoptionApplicationIn(AdoptionApplicationUpdate):
    pet: PetOut | None


class AdoptionApplicationOut(AdoptionApplicationIn):
    id: str


class AdoptionApplicationList(BaseModel):
    adoptions: List[AdoptionApplicationOut]