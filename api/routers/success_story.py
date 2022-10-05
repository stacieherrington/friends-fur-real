from fastapi import APIRouter, Depends, HTTPException
from models import SuccessStoryIn, SuccessStoryList, SuccessStoryOut
from queries.success_story import SuccessStoryQueries

router = APIRouter()

@router.post('/api/pets/{id}/story/')
def create_story (
    story:SuccessStoryIn, 
    queries:SuccessStoryQueries=Depends()):
    response = queries.create_story(story)
    return response


@router.get('/api/pets/{id}/story')
def get_story (
    id:str,
    queries:SuccessStoryQueries=Depends()):
    response = queries.get_story(id)
    if response:
        return response
    else:
        raise HTTPException(404, "This story does not exist!")
        

@router.get('/api/rescues/{rescue_id}/stories')
def list_rescue_stories (
    rescue_id: str,
    queries: SuccessStoryQueries=Depends()):
    response = queries.get_stories_by_rescue(rescue_id)
    return SuccessStoryList(stories=response)