from fastapi import APIRouter, Depends, HTTPException, Request, status
from queries.application import ApplicationQueries
from models.story import (
    SuccessStoryIn,
    SuccessStoryList,
    SuccessStoryOut,
)
from queries.story import SuccessStoryQueries
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
    application_queries: ApplicationQueries = Depends(),
):
    # 1. check if login and get account_id:
    if account and authenticator.cookie_name in request.cookies:
        if not application_queries.current_account_id_match_application(
            application_id, account["id"]
        ):
            raise not_authorized
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


@router.get(
    "/api/stories/{story_id}/",
    summary="Detail a Story",
    description="Detail a Story by story_id",
    response_model=SuccessStoryOut,
)
def get_story(story_id: str, queries: SuccessStoryQueries = Depends()):
    response = queries.get_story(story_id)
    if response:
        return response
    else:
        raise HTTPException(404, "This story does not exist!")


@router.get(
    "/api/rescues/{rescue_id}/stories/",
    summary="List all approved stories by rescue_id",
    description="allowed user to use dropdown to filter approved stories by rescue_id",
    response_model=SuccessStoryList,
)
def list_rescue_stories(
    rescue_id: str, queries: SuccessStoryQueries = Depends()
):
    response = queries.get_approved_stories_by_rescue(rescue_id)
    return SuccessStoryList(stories=response)


@router.get(
    "/api/manage/stories/",
    summary="List All Stories for Review by admin/staff rescue_id ----> management",
    description="this api check if the current user is 'admin'/ 'staff', and list all the stories for their recue only",
    response_model=SuccessStoryList,
    tags=["management"],
)
def manage_list_story(
    account: dict = Depends(authenticator.get_current_account_data),
    queries: SuccessStoryQueries = Depends(),
):
    if "admin" not in account["roles"] and "staff" not in account["roles"]:
        raise not_authorized
    rescue_id = account["rescue_id"]
    response = queries.get_all_stories_by_rescue(rescue_id)
    return SuccessStoryList(stories=response)


@router.patch(
    "/api/stories/{story_id}/approve/",
    summary="To Approve a Story ----> management",
    description="will auto check if current user is admin/staff and check if this story related pet/application belone to this rescue",
    tags=["management"],
)
def approve_story(
    story_id: str,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: SuccessStoryQueries = Depends(),
):
    # 1. check if current user is admin/ staff
    if "admin" in account["roles"] or "staff" in account["roles"]:
        # 2. check if account[rescue_id] = story[rescue_id]
        story = queries.get_story(story_id)
        account_rescue_id = account["rescue_id"]
        if story and account_rescue_id == story.dict()["rescue_id"]:
            # 3. approve story by story id
            response = queries.approve_story(story_id)
            if response:
                return response
            raise HTTPException(
                400,
                "this story id is not exist or you don't have right to approve this story",
            )
        raise HTTPException(
            400,
            "this story id is not exist or you don't have right to approve this story",
        )
    else:
        raise not_authorized


@router.patch(
    "/api/stories/{story_id}/reject/",
    summary="To Reject a Story ----> management",
    description="will auto check if current user is admin/staff and check if this story related pet/application belone to this rescue",
    tags=["management"],
)
def reject_story(
    story_id: str,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: SuccessStoryQueries = Depends(),
):
    # 1. check if current user is admin/ staff
    if "admin" in account["roles"] or "staff" in account["roles"]:
        # 2. check if account[rescue_id] = story[rescue_id]
        story = queries.get_story(story_id)
        account_rescue_id = account["rescue_id"]
        if story and account_rescue_id == story.dict()["rescue_id"]:
            # 3. approve story by story id
            response = queries.reject_story(story_id)
            if response:
                return response
            raise HTTPException(
                400,
                "this story id is not exist or you don't have right to approve this story",
            )
        raise HTTPException(
            400,
            "this story id is not exist or you don't have right to approve this story",
        )
    else:
        raise not_authorized


@router.get(
    "/api/accounts/profile/stories/",
    summary="List All Stories for Current User",
    description="This api list all the current user's stories",
    response_model=SuccessStoryList,
)
def list_account_story(
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: SuccessStoryQueries = Depends(),
):
    if account and authenticator.cookie_name in request.cookies:
        account_id = account["id"]
        return SuccessStoryList(stories=queries.list_account_story(account_id))
    else:
        raise not_authorized


@router.patch(
    "/api/stories/{story_id}/",
    summary="update an submitted story before approved/rejected.",
    description="allowed current user to update a submitted story before approved/rejected.",
    response_model=SuccessStoryOut,
)
def update_story(
    request: Request,
    story_id: str,
    data: SuccessStoryIn,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: SuccessStoryQueries = Depends(),
):
    if account and authenticator.cookie_name in request.cookies:
        account_id = account["id"]
    else:
        raise not_authorized
    story = queries.get_story(story_id)
    if story:
        if story.dict()["account_id"] == account_id:
            response = queries.update_story(story_id, data)
            if response:
                return response
            else:
                raise HTTPException(404, "This story id does not exist!")
        else:
            raise not_authorized
    else:
        raise HTTPException(404, "This story id does not exist!")


@router.delete(
    "/api/stories/{story_id}/",
    summary="Delete A Story",
    description="allowed current user to delete a submitted story .",
)
def delete_story(
    request: Request,
    story_id: str,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: SuccessStoryQueries = Depends(),
):
    if account and authenticator.cookie_name in request.cookies:
        account_id = account["id"]
    else:
        raise not_authorized
    story = queries.get_story(story_id)
    if story:
        if story.dict()["account_id"] == account_id:
            response = queries.delete_story(story_id)
            if response:
                return response
            else:
                raise HTTPException(404, "This story id does not exist!")
        else:
            raise not_authorized
    else:
        raise HTTPException(404, "This story id does not exist!")
