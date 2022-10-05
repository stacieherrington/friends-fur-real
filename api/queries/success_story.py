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

    def get_story(self, id) -> SuccessStoryOut:
        try:
            id = ObjectId(id)
            story = self.collection.find_one({"_id":id})
        except:
            return None
        if story:
            story['id'] = str(story['_id'])
            return SuccessStoryOut(**story)
        else:
            return None