from typing import Literal
from pydantic import BaseModel
from typing import List
from models.pet import PetOut


class SuccessStoryIn(BaseModel):
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
    application_id: str | None
    pet_id: str | None
    rescue_id: str | None
    account_id: str | None


class SuccessStoryList(BaseModel):
    stories: List[SuccessStoryOut]
