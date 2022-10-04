from fastapi import APIRouter, Depends, HTTPException
from models import PetOut

router = APIRouter()

@router.get('/api/pets/')
def test_pet():
    return "from get router"