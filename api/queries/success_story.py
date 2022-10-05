from .client import Queries
from bson.objectid import ObjectId
from typing import List
from models import SuccessStoryOut, SuccessStoryIn, SuccessStoryList


class SuccessStoryQueries(Queries):
    DB_NAME = 'fur'
    COLLECTION = 'story'

    def create_story(self, story:SuccessStoryIn):
        self.collection.insert_one(story.dict())
        return {"message": "Thank you for your story!"}

    def list_stories(self) ->List[SuccessStoryOut]:
        result = self.collection.find({})
        stories = []
        for story in result:
            story['id'] = str(story['_id'])
            stories.append(SuccessStoryOut(**story))
        return stories
     