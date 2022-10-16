from fastapi import APIRouter, Depends, HTTPException, Request, status
from models.success_story import (
    SuccessStoryIn,
    SuccessStoryList,
    SuccessStoryOut,
)
from queries.success_story import SuccessStoryQueries
from .auth import authenticator

router = APIRouter(tags=["Stories"])

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.post(
    "/api/applications/{application_id}/story/",
    summary="Create an Story for an Application",
    description="only allowed to create a story for an appoved application. (A story is really only for an appoved application, not a pet.)",
)
def create_story(
    application_id: str,
    story: SuccessStoryIn,
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: SuccessStoryQueries = Depends(),
):
    # 1. check if login and get account_id:
    if account and authenticator.cookie_name in request.cookies:
        response = queries.create_story(story, application_id)
        if response:
            return response
        else:
            raise HTTPException(400, "something went wrong!")
    else:
        raise not_authorized


@router.get(
    "/api/stories/",
    summary="List All Approved Stories",
    response_model=SuccessStoryList,
)
def list_stories(queries: SuccessStoryQueries = Depends()):
    return SuccessStoryList(stories=queries.get_approved_stories())


@router.get(
    "/api/stories/random/",
    summary="List 3 Random Approved Stories",
    response_model=SuccessStoryList,
)
def get_three_random_stories(queries: SuccessStoryQueries = Depends()):
    return SuccessStoryList(stories=queries.get_three_random_stories())


"""
@router.get("/api/pets/{id}/story")
def get_story(id: str, queries: SuccessStoryQueries = Depends()):
    response = queries.get_story(id)
    if response:
        return response
    else:
        raise HTTPException(404, "This story does not exist!")


@router.get("/api/rescues/{rescue_id}/stories")
def list_rescue_stories(
    rescue_id: str, queries: SuccessStoryQueries = Depends()
):
    response = queries.get_stories_by_rescue(rescue_id)
    return SuccessStoryList(stories=response)


@router.get("/api/stories/random", response_model=SuccessStoryList)
def get_three_random_stories(queries: SuccessStoryQueries = Depends()):
    return SuccessStoryList(stories=queries.get_three_random_stories())


@router.delete("/api/stories/{id}/")
def delete_pet(id:str,queries: SuccessStoryQueries=Depends()):
    response = queries.delete_story(id)
    if response:
        return response
    else:
        raise HTTPException(404, "This story id does not exist!")


@router.put("/api/stories/{id}/", response_model=SuccessStoryOut)
def update_story(id:str, data: SuccessStoryIn, queries: SuccessStoryQueries=Depends()):
    response = queries.update_story(id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "This story id does not exist!")
"""
