from fastapi import APIRouter, Depends, HTTPException
from models import RescueOut
from queries.rescue import RescueQueries

router = APIRouter()


@router.get('/api/rescues/{id}/',response_model=RescueOut)
def get_rescue(id:str, queries: RescueQueries=Depends()):
    response = queries.get_rescue(id)
    if response:
        return response
    else:
        raise HTTPException(404,"this rescue id does not exist!")