from fastapi import APIRouter, Depends, HTTPException
from models.pet import PetOut,PetIn,PetsList
from queries.pet import PetQueries

router = APIRouter(tags=["Pets"])

@router.get('/api/pets/{id}/',response_model=PetOut)
def get_pet(id:str,queries:PetQueries=Depends()):
    response = queries.get_pet(id)
    if response:
        return response
    else:
        raise HTTPException(404,"this pet id does not exist!")

@router.post('/api/pets/')
def create_pet(pet:PetIn,queries:PetQueries=Depends()):
    response = queries.create_pet(pet)
    return response

@router.get("/api/pets",response_model=PetsList)
def list_pets(queries:PetQueries=Depends()):
    return PetsList(pets=queries.list_pets())

@router.delete("/api/pets/{id}/")
def delete_pet(id:str,queries:PetQueries=Depends()):
    response = queries.delete_pet(id)
    if response:
        return response
    else:
        raise HTTPException(404,"this pet id does not exist!")

@router.put("/api/pets/{id}/", response_model=PetOut)
def update_pet(id:str, data: PetIn, queries:PetQueries=Depends()):
    response = queries.update_pet(id, data)
    if response:
        return response
    else:
        raise HTTPException(404,"this pet id does not exist!")

@router.get("/api/pets/random", response_model=PetsList)
def get_three_random_pets(queries:PetQueries=Depends()):
    return PetsList(pets=queries.get_three_random_pets())