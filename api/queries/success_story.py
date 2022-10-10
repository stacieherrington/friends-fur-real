from .client import Queries
from bson.objectid import ObjectId
from typing import List
from models.success_story import (
    SuccessStoryOut,
    SuccessStoryIn,
    SuccessStoryList,
)
from random import randint


class SuccessStoryQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "story"

    def create_story(self, story: SuccessStoryIn):
        self.collection.insert_one(story.dict())
        return {"message": "Thank you for your story!"}

    def list_stories(self) -> List[SuccessStoryOut]:
        result = self.collection.find({})
        stories = []
        for story in result:
            story["id"] = str(story["_id"])
            stories.append(SuccessStoryOut(**story))
        return stories

    def get_story(self, id) -> SuccessStoryOut:
        try:
            id = ObjectId(id)
            story = self.collection.find_one({"_id": id})
        except:
            return None
        if story:
            story["id"] = str(story["_id"])
            return SuccessStoryOut(**story)
        else:
            return None

    def get_three_random_stories(self) -> List[SuccessStoryOut]:
        result = self.collection.find({})
        stories = []
        three_stories = []
        for story in result:
            story["id"] = str(story["_id"])
            stories.append(SuccessStoryOut(**story))
        random_num_list = []
        if len(stories) >= 3:
            n = 3
        else:
            n = len(stories)
        while len(random_num_list) < n:
            random_num = randint(0, len(stories) - 1)
            if random_num not in random_num_list:
                random_num_list.append(random_num)
        for rand_num in random_num_list:
            three_stories.append(stories[rand_num])
        return three_stories

    def get_stories_by_rescue(self, rescue_id) -> List[SuccessStoryOut]:
        result = self.collection.aggregate(
            [{"$match": {"pet.rescue_id": rescue_id}}]
        )
        stories = []
        for story in result:
            story["id"] = str(story["_id"])
            stories.append(SuccessStoryOut(**story))
        return stories
