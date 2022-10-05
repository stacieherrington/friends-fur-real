from fastapi import APIRouter, Depends, HTTPException
from models import RescueOut, RescueIn
from queries.rescue import RescueQueries

router = APIRouter()


@router.get('/api/rescues/{id}/',response_model=RescueOut)
def get_rescue(id:str, queries: RescueQueries=Depends()):
    response = queries.get_rescue(id)
    if response:
        return response
    else:
        raise HTTPException(404,"this rescue id does not exist!")


@router.post('/api/rescues/')
def create_rescue(rescue: RescueIn, queries: RescueQueries=Depends()):
    response = queries.create_rescue(rescue)
    return response
