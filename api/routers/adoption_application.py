from fastapi import APIRouter, Depends, HTTPException
from models.adoption_application import (
    AdoptionApplicationIn,
    AdoptionApplicationList,
    AdoptionApplicationOut,
    AdoptionApplicationUpdate,
)
from queries.adoption_application import AdoptionApplicationQueries

router = APIRouter(tags=["Adoption Applications"])


@router.post("/api/adoption_applications/")
def create_adoption_application(
    app: AdoptionApplicationIn,
    queries: AdoptionApplicationQueries = Depends(),
):
    response = queries.create_application(app)
    return response


@router.get(
    "/api/adoption_applications/",
    response_model=AdoptionApplicationList,
)
def list_adoption_applications(
    queries: AdoptionApplicationQueries = Depends(),
):
    return AdoptionApplicationList(
        adoptions=queries.list_adoption_applications()
    )


@router.get(
    "/api/adoption_applications/{id}/",
    response_model=AdoptionApplicationOut,
)
def get_adoption_application(
    id: str, queries: AdoptionApplicationQueries = Depends()
):
    response = queries.get_adoption_application(id)
    if response:
        return response
    else:
        raise HTTPException(
            404, "This adoption application id does not exist!"
        )


@router.patch(
    "/api/adoption_applications/{id}/",
    response_model=AdoptionApplicationUpdate,
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


@router.delete("/api/adoption_applications/{id}/")
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
