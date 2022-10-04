from fastapi import APIRouter, Depends, HTTPException,Response
from models import PetOut
from queries.pet import PetQueries

router = APIRouter()

@router.get('/api/pets/{id}/',response_model=PetOut)
def test_pet(id:str,response:Response,queries:PetQueries=Depends()):
    response = queries.get_pet(id)
    return response