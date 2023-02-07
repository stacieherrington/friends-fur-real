from pydantic import BaseModel
from typing import List, Literal
from models.rescue import Address
from models.pet import PetOut


class NewPetInfo(BaseModel):
    desired_personality: str  # calm, protective, energetic, cough-potato
    crate_training: bool  # aware of crate training?
    past_house_training: bool
    reprecussions: str  # what did you do if dog accident occured?
    hours_alone: str  # how long will pet be alone per day
    pet_sleeping: str  # where will new pet sleep
    outdoor_supervision: str  # how will you supervise pet outdoors
    alternative_pet_sleeping: str  # where will pet sleep
    patience_with_pet: bool  # can you work through issues with your pet if they have any?
    new_environment: bool  # new environment can be stressful for pet
    obedience_training: bool  # will you be taking for training
    training_location: str
    pet_forfiture_reason: str  # what would cause you to give up your new pet?
    pet_forfiture: str  # what would you do with the pet?


class CurrentPreviousPets(BaseModel):
    all_pets: List(str)  # within 5 years
    how_many_neutered: str
    where_pets_now: str
    previous_adopter: bool
    previous_adoption_from: str
    past_forfiture: bool
    reason_forfiture: str
    current_vet_name: str
    current_vet_phone: str


class HouseholdInfo(BaseModel):
    primary_caregiver: str
    residence_type: str
    residence_owned: bool
    landlord_name: str
    landlord_phone: str
    landlord_restrictions: str
    smoke_free_home: bool
    fenced_yard: bool
    fence_height: str
    pet_capacity: str
    underground_fence: bool
    kennel: bool
    dog_run: bool
    has_dogs: bool
    has_small_children: bool
    has_cats: bool
    number_household_adults: str
    number_household_children: str
    household_children_ages: str
    household_allergies: bool | List(str)


class AdoptionAdditions(BaseModel):
    first_name: str
    last_name: str
    age: str
    address: Address
    phone_number: str
    todays_date: str
    household_info: HouseholdInfo
    current_previous_pets: CurrentPreviousPets
    new_pet: NewPetInfo
    reference_names: List(str)
    reference_phone: List(str)
    wants_preapproval: bool
    agrees_to_terms: bool


class AdoptionAdditions(BaseModel):
    first_name: str
    last_name: str
    age: str
    address: Address
    phone_number: str
    todays_date: str
    household_info: HouseholdInfo
    current_previous_pets: CurrentPreviousPets
    reference_names: List(str)
    reference_phone: List(str)
    wants_preapproval: bool
    agrees_to_terms: bool
    account_id: str
    pet_id: List(PetOut)
    rescue_id: str
    status: Literal[
        "Submitted",
        "Approved",
        "Rejected",
    ]
