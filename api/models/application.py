from pydantic import BaseModel
from typing import List, Literal
from models.rescue import Address
from models.pet import PetOut


class ApplicationIn(BaseModel):
    first_name: str | None
    last_name: str | None
    address: Address | None
    phone_number: str | None
    has_small_children: bool | None
    has_dogs: bool | None
    has_cats: bool | None
    smoke_free_home: bool | None
    residence_type: str | None
    residence_owned: bool | None
    landlord_restrictions: str | None
    date_ready: str | None
    wants_preapproval: bool | None
    agrees_to_terms: bool | None
    account_id: str | None
    pet_id: str
    rescue_id: str
    status: Literal[
        "Submitted",
        "Approved",
        "Rejected",
    ] | None


class ApplicationUpdate(BaseModel):
    first_name: str | None
    last_name: str | None
    address: Address | None
    phone_number: str | None
    has_small_children: bool | None
    has_dogs: bool | None
    has_cats: bool | None
    residence_type: str | None
    residence_owned: bool | None
    landlord_restrictions: str | None
    date_ready: str | None
    wants_preapproval: bool | None
    agrees_to_terms: bool | None
    story_written: bool | None



class ApplicationOut(ApplicationIn):
    id: str
    story_written: bool | None



class ApplicationOutWithPet(ApplicationOut):
    pet: PetOut


class ApplicationList(BaseModel):
    applications: List[ApplicationOut]

class ApplicationListWithPet(BaseModel):
    applications: List[ApplicationOutWithPet]