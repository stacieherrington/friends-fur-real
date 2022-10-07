from typing import Literal
from pydantic import BaseModel
from typing import List
from models.pet import PetOut

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