from fastapi import APIRouter, Depends, HTTPException, Request, status

from routers.auth import authenticator
from models.foster_application import (
    FosterApplicationIn,
    FosterApplicationOut,
    FosterApplicationUpdate,
    FosterApplicationOutWithPet,
    ListFosterApplications,
    ListFosterApplicationsWithPet,
)
from queries.foster_application import FosterAdoptionApplicationQueries

router = APIRouter(tags=["ListFosterApplications"])
not_authorized = HTTPException(
    status_code=status.HTTP_418_IM_A_TEAPOT,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.post(
    "/api/foster_applications/",
    summary="Create Foster Application",
)
def create_foster_application(
    app: FosterApplicationIn,
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: FosterAdoptionApplicationQueries = Depends(),
):
    if account and authenticator.cookie_name in request.cookies:
        account_id = account["id"]
        response = queries.create_foster_application(app, account_id)
        if response:
            return response
        else:
            raise HTTPException(
                418,
                "Sorry, you have already submitted a Application to become a foster",
            )
    else:
        raise not_authorized


@router.get(
    "/api/accounts/profile/foster_applications/",
    response_model=ListFosterApplicationsWithPet,
    summary="List all Foster applications for an account profile",
    description="This lists all the foster applications for current logged in user",
)
def list_account_foster_application(
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: FosterAdoptionApplicationQueries = Depends(),
):
    if account and authenticator.cookie_name in request.cookies:
        account_id = account["id"]
        return ListFosterApplications(
            foster_applications=queries.list_account_foster_applications(
                account_id
            )
        )
    else:
        raise not_authorized


@router.get(
    "/api/manage/foster_applications/",
    response_model=ListFosterApplications,
    summary="List all foster applications for Rescue",
    description="This lists all foster_applcations by rescue",
    tags=["management"],
)
def list_rescue_foster_applications(
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: FosterAdoptionApplicationQueries = Depends(),
):
    if "staff" not in account["roles"] and "admin" not in account["roles"]:
        raise not_authorized
    rescue_id = account["rescue_id"]
    return ListFosterApplications(
        foster_applications=queries.list_rescue_foster_applications(rescue_id)
    )


@router.get(
    "/api/foster_applications/{foster_application_id}/",
    response_model=FosterApplicationOut,
    summary="Single Foster Application",
    description="get a single foster adoptionApplication by foster_application_id",
)
def single_foster_application(
    foster_application_id: str,
    queries: FosterAdoptionApplicationQueries = Depends(),
):
    adoptionApplication = queries.single_foster_application(
        foster_application_id
    )
    if adoptionApplication:
        return adoptionApplication
    raise HTTPException(
        418,
        f"This foster adoptionApplication {foster_application_id} does not exist",
    )


@router.patch(
    "/api/foster_applications/{foster_application_id}/approve/",
    response_model=FosterApplicationOut | dict,
    summary="Approve a Foster Application",
)
def approve_foster_application(
    foster_application_id: str,
    queries: FosterAdoptionApplicationQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if "staff" not in account["roles"] and "admin" not in account["roles"]:
        raise not_authorized
    elif not queries.current_rescue_foster_application(
        foster_application_id, account["rescue_id"]
    ):
        raise not_authorized
    adoptionApplication = queries.approve_foster_application(
        foster_application_id
    )
    if adoptionApplication:
        return adoptionApplication
    raise HTTPException(418, "This foster adoptionApplication does not exist")
