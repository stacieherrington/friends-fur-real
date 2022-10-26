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
    residence_owned: str | None
    landlord_restrictions: str | None
    date_ready: str | None
    wants_preapproval: bool | None
    agrees_to_terms: bool | None
    account_id: str | None
    pet_id: str | None
    rescue_id: str | None
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
    residence_owned: str | None
    landlord_restrictions: str | None
    date_ready: str | None
    wants_preapproval: bool | None
    agrees_to_terms: bool | None


class ApplicationOut(ApplicationIn):
    id: str


class ApplicationList(BaseModel):
    applications: List[ApplicationOut]
