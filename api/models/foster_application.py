from pydantic import BaseModel
from typing import List, Literal
from models.rescue import Address
from models.pet import PetOut


# class Foster(BaseModel):
#     preferred_animal: Literal["Dog", "Cat"]
#     previously_fostered: bool  # yes or no
#     prev_foster_program: str  # if yes, who did you previously foster for?
#     dog_puppy_exp: str  # level of experience with puppies/dogs
#     cat_kitten_exp: str  # level of experience with kittens/cats
#     seperate_animals: bool  # can you keep your own animals seperated from fosters?
#     daily_foster_alone_hours: Literal["0-1", "2-3", "4-5", "6-7", "8+"]
#     foster_care: str  # where will foster stay when you are at work or not home?
#     foster_sleep: str  # where will the foster sleep at night?
#     foster_time: str  # what's the maximum time you are able to foster?
#     time_limit: str  # if time limit, please explain time limit
#     transport_foster: bool  # Can you transport the pet between potential adoptions or other events?
#     home_visit: bool  # do you object to Friends_Fur_Real conducting an at home visit to see the conditions you will provide to the fosters?


class CurrentPastPets(BaseModel):
    all_pets: List(str)  # within 5 years
    how_many_neutered: str
    where_pets_now: str
    previous_adopter: bool
    previous_adoption_from: str
    pet_forfiture: bool
    reason_forfiture: str
    spayed_neutered: bool
    if_not_spayed: str
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
    yard_description: str
    fenced_yard: bool
    fence_type: str
    fence_area: str
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


class FosterApplicationIn(BaseModel):
    first_name: str
    last_name: str
    address: Address
    phone_number: str
    email: str
    age: str
    date_submitted: str
    driver_license_state: str
    household_info: HouseholdInfo
    past_pets: CurrentPastPets
    reference_names: List(str)
    reference_phone: List(str)
    preferred_animal: Literal["Dog", "Cat"]
    previously_fostered: bool  # yes or no
    prev_foster_program: str  # if yes, who did you previously foster for?
    dog_puppy_exp: str  # level of experience with puppies/dogs
    cat_kitten_exp: str  # level of experience with kittens/cats
    seperate_animals: bool  # can you keep your own animals seperated from fosters?
    daily_foster_alone_hours: Literal["0-1", "2-3", "4-5", "6-7", "8+"]
    foster_care: str  # where will foster stay when you are at work or not home?
    foster_sleep: str  # where will the foster sleep at night?
    foster_time: str  # what's the maximum time you are able to foster?
    time_limit: str  # if time limit, please explain time limit
    transport_foster: bool  # Can you transport the pet between potential adoptions or other events?
    home_visit: bool  # do you object to Friends_Fur_Real conducting an at home visit to see the conditions you will provide to the fosters?
    reason_to_foster: str
    agrees_to_terms: bool
    rescue_id: str

    wants_preapproval: bool
    status: Literal[
        "Submitted",
        "Approved",
        "Rejected",
    ]


class FosterApplicationUpdate(FosterApplicationIn):
    id: str
    updated_date: str


class FosterApplicationOut(FosterApplicationUpdate):
    account_id: str


class FosterApplicationOutWithPet(FosterApplicationOut):
    pets: List[str]


class ListFosterApplications(BaseModel):
    foster_applications: List(FosterApplicationOut)


class ListFosterApplicationsWithPet(BaseModel):
    foster_applications: List(FosterApplicationOutWithPet)
