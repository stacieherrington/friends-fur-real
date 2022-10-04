from fastapi import APIRouter, Depends, HTTPException
from models import PetOut
from queries.pet import PetQueries

router = APIRouter()

@router.get('/api/pets/{id}/',response_model=PetOut)
def test_pet(id:str,queries:PetQueries=Depends()):
    response = queries.get_pet(id)
    if response:
        return response
    else:
        raise HTTPException(404,"this pet id is not exist!")