from .client import Queries
from models import (
    AdoptionApplicationIn,
    AdoptionApplicationList,
    AdoptionApplicationOut,
)
from bson.objectid import ObjectId
from typing import List
from pymongo import ReturnDocument


class AdoptionApplicationQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "adoption_applications"

    def create_application(self, app: AdoptionApplicationIn):
        self.collection.insert_one(app.dict())
        return {"message": "Congratulations! Your Application has been submitted!"}

    def list_adoption_applications(self) -> List[AdoptionApplicationOut]:
        response = self.collection.find({})
        apps = []
        for app in response:
            app["id"] = str(app["_id"])
            apps.append(AdoptionApplicationOut(**app))
        return apps

    def get_adoption_application(self, id) -> AdoptionApplicationOut:
        try:
            app = self.collection.find_one({"_id": ObjectId(id)})
        except:
            return None
        if not app:
            return None
        app["id"] = str(app["_id"])
        return AdoptionApplicationOut(**app)

    def update_adoption_application(self, id, data) -> AdoptionApplicationOut:
        try:
            app = self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": data.dict()},
                return_document=ReturnDocument.AFTER,
            )
        except:
            return None
        if app:
            app["id"] = str(app["_id"])
            return AdoptionApplicationOut(**app)

    def delete_adoption_application(self, id):
        try:
            id = ObjectId(id)
            app = self.collection.find_one({"_id": id})
        except:
            return None
        if app:
            self.collection.delete_one({"_id": id})
            return {"message": "Your Adoption Application has been deleted!"}
