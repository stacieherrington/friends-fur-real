from pydantic import BaseModel
from typing import List


class PetOut(BaseModel):
    name:str
    type:str
    breed:str
    age:int
    sex:str
    size:str
    description:str
    weight:int # str ?
    pictures: List[str]
    primary_color:str
    ok_with_dogs:bool
    ok_with_cats:bool
    shots_up_to_date:bool
    ok_with_kids:bool
    spayed_neutered:bool
    house_trained:bool
    special_needs:bool
    is_adopted:bool
    adopter: str # account id ?
    
