from fastapi import APIRouter, Depends, HTTPException, Request, status
from sniffio import current_async_library_cvar
from .auth import authenticator
from models.application import (
    ApplicationIn,
    ApplicationList,
    ApplicationOut,
    ApplicationUpdate,
    ApplicationListWithPet,
)
from queries.application import ApplicationQueries

router = APIRouter(tags=["Applications"])
not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.post(
    "/api/applications/",
    summary="Create Application",
    description="This will create a new application, need all the form_info and pet_id ,rescue_id ,will auto add current user's account_id . this api will auto check if there is an application from same account to a same pet ",
)
def create_adoption_application(
    app: ApplicationIn,
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: ApplicationQueries = Depends(),
):
    if account and authenticator.cookie_name in request.cookies:
        account_id = account["id"]
        response = queries.create_application(app, account_id)
        if response:
            return response
        else:
            raise HTTPException(
                400, "Sorry, You have submitted an application for this pet!"
            )
    else:
        raise not_authorized


@router.get(
    "/api/accounts/profile/applications/",
    response_model=ApplicationListWithPet,
    summary="List all Application for an account profile page",
    description="This lists all the applicaitons by current loggin user's account_id",
)
def list_account_applications(
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: ApplicationQueries = Depends(),
):
    if account and authenticator.cookie_name in request.cookies:
        account_id = account["id"]
        return ApplicationListWithPet(
            applications=queries.list_account_applications(account_id)
        )
    raise not_authorized


@router.get(
    "/api/manage/applications/",
    response_model=ApplicationList,
    summary="List all Application for Rescue ----> management",
    description="This lists all the applicaitons by rescue_id of current admin/staff",
    tags=["management"],
)
def list_adoption_applications(
    request: Request,
    account: dict = Depends(authenticator.get_current_account_data),
    queries: ApplicationQueries = Depends(),
):
    if "staff" not in account["roles"] and "admin" not in account["roles"]:
        raise not_authorized
    rescue_id = account["rescue_id"]
    return ApplicationList(
        applications=queries.list_applications_by_rescue_id(rescue_id)
    )


@router.get(
    "/api/applications/{application_id}/",
    response_model=ApplicationOut,
    summary="Detail Application",
    description="get application detail by application_id",
)
def detail_application(
    application_id: str,
    queries: ApplicationQueries = Depends(),
):
    response = queries.detail_application(application_id)
    if response:
        return response
    else:
        raise HTTPException(
            404, f"This application {application_id} does not exist!"
        )


@router.patch(
    "/api/applications/{application_id}/approve/",
    response_model=ApplicationOut | dict,
    summary="Approve an Application ----> management",
    description="Approve an application by application_id, will check if there is an approved application based on the same pet_id, if not, change current status to Approved and change all other application have the same pet_id to Rejected",
    tags=["management"],
)
def approve_application(
    application_id: str,
    queries: ApplicationQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if "staff" not in account["roles"] and "admin" not in account["roles"]:
        raise not_authorized
    elif not queries.current_staff_rescue_id_match_application(
        application_id, account["rescue_id"]
    ):
        raise not_authorized
    response = queries.approve_application(application_id)
    if response:
        return response
    else:
        raise HTTPException(404, "this application does not exist!")


@router.patch(
    "/api/applications/{application_id}/reject/",
    response_model=ApplicationOut | dict,
    summary="Reject an Application ----> management",
    description="Reject an application by application_id",
    tags=["management"],
)
def reject_application(
    application_id: str,
    queries: ApplicationQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if "staff" not in account["roles"] and "admin" not in account["roles"]:
        raise not_authorized
    elif not queries.current_staff_rescue_id_match_application(
        application_id, account["rescue_id"]
    ):
        raise not_authorized
    response = queries.reject_application(application_id)
    return response


@router.delete(
    "/api/applications/{application_id}/",
    summary="Delete an Application",
    description="Delete an application by application_id, allow user to cancle an applicaiton from account profile page, this api will make sure current user is the owner of that applicaiton",
)
def delete_application(
    application_id: str,
    queries: ApplicationQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if "base" not in account["roles"]:
        raise not_authorized
    elif not queries.current_account_id_match_application(
        application_id, account["id"]
    ):
        raise not_authorized
    else:
        return queries.delete_application(application_id)


@router.patch(
    "/api/applications/{application_id}/",
    response_model=ApplicationOut,
    summary="Update Application(by adopter)",
    description="Allowed adopter to update application details from account profile page",
)
def update_application(
    application_id: str,
    data: ApplicationUpdate,
    queries: ApplicationQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if "base" not in account["roles"]:
        raise not_authorized
    elif not queries.current_account_id_match_application(
        application_id, account["id"]
    ):
        raise not_authorized
    response = queries.update_application(application_id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "This applcation id does not exist!")
