from typing import Literal
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
























































class SuccessStoryIn(BaseModel):
    pet: PetOut
    account: object # account not made yet
    title: str
    story: str 
    picture: str
    status: Literal[
        "Submitted",
        "Approved",
        "Rejected",
    ] 

class SuccessStoryOut(SuccessStoryIn):
    id: str

class SuccessStoryList(BaseModel):
    stories: List[SuccessStoryOut]