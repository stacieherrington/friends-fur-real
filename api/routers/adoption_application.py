from fastapi import APIRouter, Depends, HTTPException
from models.adoption_application import (
    AdoptionApplicationIn,
    AdoptionApplicationList,
    AdoptionApplicationOut,
    AdoptionApplicationUpdate,
)
from queries.adoption_application import AdoptionApplicationQueries

router = APIRouter()


@router.post(
    "",
    description="This will create a new application",
)
def create_adoption_application(
    app: AdoptionApplicationIn,
    queries: AdoptionApplicationQueries = Depends(),
):
    response = queries.create_application(app)
    if response:
        return response
    else:
        raise HTTPException(404, "Application already exists")


@router.get(
    "",
    response_model=AdoptionApplicationList,
    summary="All Adoption Applications",
    description="This lists all available adoption applications",
)
def list_adoption_applications(
    queries: AdoptionApplicationQueries = Depends(),
):
    return AdoptionApplicationList(
        adoptions=queries.list_adoption_applications()
    )


@router.get(
    "/{id}",
    response_model=AdoptionApplicationUpdate,
    summary="Single Adoption Application",
)
def single_adoption_application(
    id: str, queries: AdoptionApplicationQueries = Depends()
):
    response = queries.single_adoption_application(id)
    if response:
        return response
    else:
        raise HTTPException(
            404, f"This adoption application {id} does not exist!"
        )


@router.patch(
    "/{id}",
    response_model=AdoptionApplicationUpdate,
    response_description="Successfully Updated Application!",
)
def update_adoption_application(
    id: str,
    data: AdoptionApplicationUpdate,
    queries: AdoptionApplicationQueries = Depends(),
):
    response = queries.update_adoption_application(id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "This adoption applcation id does not exist!")


@router.delete(
    "/{id}",
    response_description="Successfully Deleted Account!",
)
def delete_adoption_application(
    id: str, queries: AdoptionApplicationQueries = Depends()
):

    response = queries.delete_adoption_application(id)
    if response:
        return response
    else:
        raise HTTPException(
            404, "This adoption application id does not exist!"
        )
