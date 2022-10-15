from .client import Queries
from typing import List
from models.adoption_application import (
    ApplicationIn,
    ApplicationList,
    ApplicationOut,
)
from bson.objectid import ObjectId
from pymongo import ReturnDocument


class ApplicationQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "adoption_applications"

    def create_application(self, app: ApplicationIn):
        app = app.dict()
        # check if the account_id has an application based on the same pet_id:
        record = self.collection.find_one(
            {"pet_id": app["pet_id"], "account_id": app["account_id"]}
        )
        if not record:
            insert_result = self.collection.insert_one(app)
            if insert_result.acknowledged:
                return {"message": "Your application is submitted!"}

    def list_applications_by_rescue_id(self, id) -> List[ApplicationOut]:
        response = self.collection.find({"rescue_id": id})
        apps = []
        for app in response:
            app["id"] = str(app["_id"])
            apps.append(ApplicationOut(**app))
        return apps

    def detail_application(self, id) -> ApplicationOut:
        try:
            app = self.collection.find_one({"_id": ObjectId(id)})
        except:
            return None
        if app:
            return ApplicationOut(**app, id=id)


"""
    def update_adoption_application(self, id, data) -> ApplicationIn:
        try:
            app = self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": data.dict(exclude_unset=True)},
                return_document=ReturnDocument.AFTER,
            )
        except:
            return None
        if app:
            return ApplicationIn(**app, id=id)

    def delete_adoption_application(self, id):
        try:
            id = ObjectId(id)
            app = self.collection.find_one({"_id": id})
        except:
            return None
        if app:
            self.collection.delete_one({"_id": id})
            return {"message": "Your Adoption application has been deleted!"}
"""
