from typing import Literal
from pydantic import BaseModel
from typing import List


class PetIn(BaseModel):
    name: str
    type: str | None
    breed: str | None
    age: int | None
    sex: str | None
    size: str | None
    description: str | None
    weight: int | None  # str ?
    pictures: List[str] | None
    primary_color: str | None
    ok_with_dogs: bool | None
    ok_with_cats: bool | None
    shots_up_to_date: bool | None
    ok_with_kids: bool | None
    spayed_neutered: bool | None
    house_trained: bool | None
    special_needs: bool | None
    adopter: str | None  # AccountOut ?
    is_adopted: bool | None
    rescue_id: str | None
    story_id: str | None


class PetOut(PetIn):
    id: str


class PetsList(BaseModel):
    pets: List[PetOut]


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


class AdoptionApplicationOut(AdoptionApplicationIn):
    id: str


class AdoptionApplicationList(BaseModel):
    adoptions: List[AdoptionApplicationOut]


class SuccessStoryIn(BaseModel):
    pet: PetOut
    account: object | None  # account not made yet
    title: str | None
    story: str | None
    picture: str | None
    status: Literal[
        "Submitted",
        "Approved",
        "Rejected",
    ] | None


class SuccessStoryOut(SuccessStoryIn):
    id: str


class SuccessStoryList(BaseModel):
    stories: List[SuccessStoryOut]

class AccountIn(BaseModel):
    email: str
    password: str

class Account(AccountIn):
    id: str
    roles: List[str]

class AccountOut(BaseModel):
    id: str
    roles: List[str]


