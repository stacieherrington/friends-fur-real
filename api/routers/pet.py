from fastapi import APIRouter, Depends, HTTPException
from models.pet import PetOut, PetIn, PetsList
from queries.pet import PetQueries

router = APIRouter()


@router.get("/{id}/", response_model=PetOut)
def get_pet(id: str, queries: PetQueries = Depends()):
    response = queries.get_pet(id)
    if response:
        return response
    else:
        raise HTTPException(404, "this pet id does not exist!")


@router.post("/")
def create_pet(pet: PetIn, queries: PetQueries = Depends()):
    response = queries.create_pet(pet)
    return response


@router.get("/", response_model=PetsList)
def list_pets(queries: PetQueries = Depends()):
    return PetsList(pets=queries.list_pets())


@router.delete("/{id}/")
def delete_pet(id: str, queries: PetQueries = Depends()):
    response = queries.delete_pet(id)
    if response:
        return response
    else:
        raise HTTPException(404, "this pet id does not exist!")


@router.put("/{id}/", response_model=PetOut)
def update_pet(id: str, data: PetIn, queries: PetQueries = Depends()):
    response = queries.update_pet(id, data)
    if response:
        return response
    else:
        raise HTTPException(404, "this pet id does not exist!")


@router.get("/random/", response_model=PetsList)
def get_three_random_pets(queries: PetQueries = Depends()):
    return PetsList(pets=queries.get_three_random_pets())
