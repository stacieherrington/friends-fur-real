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

@router.get("/api/stories/",response_model=SuccessStoryList)
def list_stories(queries:SuccessStoryQueries=Depends()):
    return SuccessStoryList(stories=queries.list_stories())