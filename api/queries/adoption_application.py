from models.adoption_application import AdoptionApplicationUpdate
from .client import Queries
from models.adoption_application import (
    AdoptionApplicationIn,
    AdoptionApplicationList,
    AdoptionApplicationOut,
)
from bson.objectid import ObjectId
from pymongo import ReturnDocument


class AdoptionApplicationQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "adoption_applications"

    def create_application(self, appt: AdoptionApplicationIn):
        self.collection.insert_one(appt.dict())  # .inserted_id
        return {"success!"}

    def list_adoption_applications(
        self,
    ) -> AdoptionApplicationList:
        response = self.collection.find({})
        apps = []
        for app in response:
            app["id"] = str(app["_id"])
            apps.append(AdoptionApplicationOut(**app))
        return apps

    def single_adoption_application(self, id) -> AdoptionApplicationUpdate:
        try:
            app = self.collection.find_one({"_id": ObjectId(id)})
        except:
            return None
        if not app:
            return None
        # app["id"] = str(app["_id"])
        return AdoptionApplicationUpdate(**app, id=id)

    def update_adoption_application(
        self, id, data
    ) -> AdoptionApplicationUpdate:
        try:
            app = self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": data.dict(exclude_unset=True)},
                return_document=ReturnDocument.AFTER,
            )
        except:
            return None
        if app:
            return AdoptionApplicationUpdate(**app, id=id)

    def delete_adoption_application(self, id):
        try:
            id = ObjectId(id)
            app = self.collection.find_one({"_id": id})
        except:
            return None
        if app:
            self.collection.delete_one({"_id": id})
            return {"message": "Your Adoption application has been deleted!"}
