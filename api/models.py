from pydantic import BaseModel
from typing import List


class PetOut(BaseModel):
    id:str
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
    is_adopted:bool | None
    adopter: str | None # account id ?
    
