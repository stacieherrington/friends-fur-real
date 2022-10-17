from fastapi import APIRouter, Depends, HTTPException
from models.pet import PetOut, PetIn, PetsList
from queries.pet import PetQueries

router = APIRouter(tags=["Pets"])


@router.get("/api/pets/{pet_id}/", response_model=PetOut)
def get_pet(pet_id: str, queries: PetQueries = Depends()):
    response = queries.get_pet(pet_id)
    if response:
        return response
    else:
        raise HTTPException(404, "this pet id does not exist!")


@router.post(
    "/api/pets/",
    summary="create a pet",
    tags=["management"],
)
def create_pet(pet: PetIn, queries: PetQueries = Depends()):
    response = queries.create_pet(pet)
    return response


@router.get("/api/pets/", response_model=PetsList)
def list_pets(queries: PetQueries = Depends()):
    return PetsList(pets=queries.list_pets())


@router.delete(
    "/api/pets/{pet_id}/", summary="delete a pet  ----> management <----"
)
def delete_pet(pet_id: str, queries: PetQueries = Depends()):
    response = queries.delete_pet(pet_id)
    if response:
        return response
    else:
        raise HTTPException(404, "this pet id does not exist!")


@router.put("/api/pets/{pet_id}/", response_model=PetOut)
def update_pet(pet_id: str, data: PetIn, queries: PetQueries = Depends()):
    response = queries.update_pet(pet_id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "this pet id does not exist!")


@router.get("/api/random/pets/", response_model=PetsList)
def get_three_random_pets(queries: PetQueries = Depends()):
    return PetsList(pets=queries.get_three_random_pets())


@router.get("/api/rescues/{rescue_id}/pets/", response_model=PetsList)
def list_rescue_pets(rescue_id: str, queries: PetQueries = Depends()):
    return PetsList(pets=queries.list_rescue_pets(rescue_id))
