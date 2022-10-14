from fastapi import APIRouter, Depends, HTTPException
from models.rescue import RescueOut, RescueIn, RescuesList
from queries.rescue import RescueQueries
from acl.nominatim import Nominatim

router = APIRouter()


@router.get("/{id}/", response_model=RescueOut)
def get_rescue(id: str, queries: RescueQueries = Depends()):
    response = queries.get_rescue(id)
    if response:
        return response
    else:
        raise HTTPException(404, "this rescue id does not exist!")


@router.post("/")
def create_rescue(rescue: RescueIn, queries: RescueQueries = Depends()):
    response = queries.create_rescue(rescue)
    return response


@router.delete("/{id}/")
def delete_rescue(id: str, queries: RescueQueries = Depends()):
    response = queries.delete_rescue(id)
    if response:
        return response
    else:
        raise HTTPException(404, "This rescue id does not exist!")


@router.get("/", response_model=RescuesList)
def list_rescues(queries: RescueQueries = Depends()):
    return RescuesList(rescues=queries.list_rescues())


@router.put("/{id}/", response_model=RescueOut)
def update_rescue(id: str, data: RescueIn, queries: RescueQueries = Depends()):
    response = queries.update_rescue(id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "This rescue id does not exist!")


@router.patch(
    "/localize/{id}/",
)
async def localize_rescue(
    id: str,
    queries: RescueQueries = Depends(),
    address_service: Nominatim = Depends(),
):
    rescue = queries.get_rescue_dict(id)
    address = rescue["address"]
    address_string = address["address_one"]
    if address["address_two"] is not None:
        address_string = f"{address_string}, {address['address_two']}"
    address_string = f"{address_string},{address['city']}, {address['state']}, {address['zip_code']}"
    query = address_string.replace(" ", "+")
    location = address_service.location_from_address(query)
    if location is None:
        address_string = (
            f"{address['city']}, {address['state']}, {address['zip_code']}"
        )
        query = address_string.replace(" ", "+")
        location = address_service.location_from_address(query)
    response = queries.set_rescue_location(rescue, location)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot set location")

@router.get("/api/rescues/{account_id}", response_model = RescuesList)
def get_rescues_by_distance(account_id: str, queries: RescueQueries = Depends()):
    return RescuesList(rescues = queries.sort_rescues_by_distance(account_id))
