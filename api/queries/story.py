from .client import Queries
from bson.objectid import ObjectId
from typing import List
from pymongo import ReturnDocument
from models.story import (
    SuccessStoryOut,
    SuccessStoryIn,
    SuccessStoryList,
)

from .application import ApplicationQueries


class SuccessStoryQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "stories"

    def create_story(self, story: SuccessStoryIn, application_id):
        story = story.dict()
        # need to check if there is an story based on this application_id
        dup_check = self.collection.find_one(
            {"application_id": application_id}
        )
        if dup_check:
            return {"message": "You have submitted a story for this pet!"}
        # use application_id to get pet_id, rescue_id,account_id, and check if the status of application is "Approved"
        try:
            application = (
                ApplicationQueries().detail_application(application_id).dict()
            )
        except:
            return None
        if application and application["status"] == "Approved":
            story["application_id"] = application_id
            story["pet_id"] = application["pet_id"]
            story["rescue_id"] = application["rescue_id"]
            story["account_id"] = application["account_id"]
            insert_result = self.collection.insert_one(story)
            if insert_result.acknowledged:
                return {"message": "Thank you for your story!"}
        else:
            return {
                "message": "The application is not exist or may not been approved!"
            }

    def get_approved_stories(self) -> List[SuccessStoryOut]:
        result = self.collection.find({"status": "Approved"})
        stories = []
        for story in result:
            story["id"] = str(story["_id"])
            stories.append(SuccessStoryOut(**story))
        return stories

    def get_three_random_stories(self) -> List[SuccessStoryOut]:
        result = self.collection.aggregate(
            [{"$match": {"status": "Approved"}}, {"$sample": {"size": 3}}]
        )
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

    def get_approved_stories_by_rescue(
        self, rescue_id
    ) -> List[SuccessStoryOut]:
        result = self.collection.find(
            {"rescue_id": rescue_id, "status": "Approved"}
        )
        stories = []
        for story in result:
            story["id"] = str(story["_id"])
            stories.append(SuccessStoryOut(**story))
        return stories

    def get_all_stories_by_rescue(self, rescue_id) -> List[SuccessStoryOut]:
        result = self.collection.find({"rescue_id": rescue_id})
        stories = []
        for story in result:
            story["id"] = str(story["_id"])
            stories.append(SuccessStoryOut(**story))
        return stories

    def approve_story(self, story_id) -> SuccessStoryOut:
        try:
            story = self.get_story(story_id).dict()
        except:
            return
        # 1. check db, make sure the target story status is Submitted:
        if story["status"] == "Submitted":
            # 2. update status from Submitted to Approved
            result = self.collection.find_one_and_update(
                filter={"_id": ObjectId(story_id)},
                update={"$set": {"status": "Approved"}},
                return_document=ReturnDocument.AFTER,
            )
            return SuccessStoryOut(**result, id=story_id)

    def reject_story(self, story_id) -> SuccessStoryOut:
        try:
            story = self.get_story(story_id).dict()
        except:
            return
        # 1. check db, make sure the target story status is Submitted:
        if story["status"] == "Submitted":
            # 2. update status from Submitted to Reject
            result = self.collection.find_one_and_update(
                filter={"_id": ObjectId(story_id)},
                update={"$set": {"status": "Rejected"}},
                return_document=ReturnDocument.AFTER,
            )
            return SuccessStoryOut(**result, id=story_id)

    def list_account_story(self, account_id) -> List[SuccessStoryOut]:
        result = self.collection.find({"account_id": account_id})
        stories = []
        for story in result:
            story["id"] = str(story["_id"])
            stories.append(SuccessStoryOut(**story))
        return stories

    def update_story(self, story_id, data):
        try:
            id = ObjectId(story_id)
            data = data.dict()
            data["status"] = "Submitted"
            story = self.collection.find_one_and_update(
                {"_id": id},
                {"$set": data},
                return_document=ReturnDocument.AFTER,
            )
        except:
            return None
        if story:
            return SuccessStoryOut(**story, id=story_id)

    def delete_story(self, story_id):
        try:
            id = ObjectId(story_id)
            delete_result = self.collection.delete_one(filter={"_id": id})
        except:
            return None
        if delete_result.acknowledged:
            return {"message": "pet has been deleted!"}