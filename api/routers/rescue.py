from fastapi import APIRouter, Depends, HTTPException
from models import RescueOut, RescueIn, RescuesList
from queries.rescue import RescueQueries

router = APIRouter(tags=["Rescues"])


@router.get("/api/rescues/{id}/", response_model=RescueOut)
def get_rescue(id: str, queries: RescueQueries = Depends()):
    response = queries.get_rescue(id)
    if response:
        return response
    else:
        raise HTTPException(404, "this rescue id does not exist!")


@router.post("/api/rescues/")
def create_rescue(rescue: RescueIn, queries: RescueQueries = Depends()):
    response = queries.create_rescue(rescue)
    return response


@router.delete("/api/rescues/{id}/")
def delete_rescue(id: str, queries: RescueQueries = Depends()):
    response = queries.delete_rescue(id)
    if response:
        return response
    else:
        raise HTTPException(404, "This rescue id does not exist!")


@router.get("/api/rescues/", response_model=RescuesList)
def list_rescues(queries: RescueQueries = Depends()):
    return RescuesList(rescues=queries.list_rescues())


@router.put("/api/rescues/{id}/", response_model=RescueOut)
def update_rescue(
    id: str, data: RescueIn, queries: RescueQueries = Depends()
):
    response = queries.update_rescue(id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "This rescue id does not exist!")
