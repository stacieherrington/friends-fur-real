from fastapi import APIRouter, Depends, HTTPException
from models.application import (
    ApplicationIn,
    ApplicationList,
    ApplicationOut,
)
from queries.application import ApplicationQueries

router = APIRouter(tags=["Applications"])


@router.post(
    "/api/applications/",
    summary="Create Application",
    description="This will create a new application, need all the form_info and pet_id ,rescue_id ,account_id. this api will auto check if there is an application from same account to a same pet ",
)
def create_adoption_application(
    app: ApplicationIn,
    queries: ApplicationQueries = Depends(),
):
    response = queries.create_application(app)
    if response:
        return response
    else:
        raise HTTPException(
            400, "Sorry, You have submitted an application for this pet!"
        )


@router.get(
    "/api/accounts/{account_id}/applications/",
    response_model=ApplicationList,
    summary="List all Application for an account profile page",
    description="This lists all the applicaitons by account_id",
)
def list_account_applications(
    account_id: str,
    queries: ApplicationQueries = Depends(),
):
    return ApplicationList(
        applications=queries.list_account_applications(account_id)
    )


@router.get(
    "/api/{rescue_id}/applications/",
    response_model=ApplicationList,
    summary="List all Application for Rescue",
    description="This lists all the applicaitons by rescue_id",
)
def list_adoption_applications(
    rescue_id: str,
    queries: ApplicationQueries = Depends(),
):
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
    application_id: str, queries: ApplicationQueries = Depends()
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
    summary="Approve an Application",
    description="Approve an application by application_id, will check if there is an approved application based on the same pet_id, if not, change current status to Approved and change all other application have the same pet_id to Rejected",
)
def approve_application(
    application_id: str, queries: ApplicationQueries = Depends()
):
    response = queries.approve_application(application_id)
    if response:
        return response
    else:
        raise HTTPException(404, "this application does not exist!")


@router.patch(
    "/api/applications/{application_id}/reject/",
    response_model=ApplicationOut | dict,
    summary="Reject an Application",
    description="Reject an application by application_id",
)
def reject_application(
    application_id: str, queries: ApplicationQueries = Depends()
):
    response = queries.reject_application(application_id)
    return response


@router.delete(
    "/api/applications/{application_id}/",
    summary="Delete an Application",
    description="Delete an application by application_id, allow user to cancle an applicaiton from account profile page",
)
def delete_application(
    application_id: str, queries: ApplicationQueries = Depends()
):
    return queries.delete_application(application_id)


@router.patch(
    "/api/applications/{application_id}/",
    response_model=ApplicationOut,
    summary="Update Application(by adopter)",
    description="Allowed adopter to update application details from account profile page",
)
def update_application(
    application_id: str,
    data: ApplicationIn,
    queries: ApplicationQueries = Depends(),
):
    response = queries.update_application(application_id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "This applcation id does not exist!")
