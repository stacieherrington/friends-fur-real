from fastapi import APIRouter, Depends, HTTPException
from models import PetOut,PetIn,PetsList
from queries.pet import PetQueries

router = APIRouter()

@router.get('/api/pets/{id}/',response_model=PetOut)
def test_pet(id:str,queries:PetQueries=Depends()):
    response = queries.get_pet(id)
    if response:
        return response
    else:
        raise HTTPException(404,"this pet id is not exist!")

@router.post('/api/pets/')
def create_pet(pet:PetIn,queries:PetQueries=Depends()):
    response = queries.create_pet(pet.name)
    return response

@router.get("/api/pets",)
def list_pets(queries:PetQueries=Depends()):
    response = queries.list_pets()
    return PetsList(response)

@router.delete("/api/pets/{id}")
def delete_pet(id:str,queries:PetQueries=Depends()):
    response = queries.delete_pet(id)
    return response