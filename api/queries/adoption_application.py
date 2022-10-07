from http.client import HTTPException
from .client import Queries
from models.adoption_application import (
    AdoptionApplicationIn,
    AdoptionApplicationList,
    AdoptionApplicationOut,
)
from bson.objectid import ObjectId
from typing import List
from pymongo import ReturnDocument


class ApplicationDoesNotExist(ValueError):
    pass


class AdoptionApplicationQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "adoption_applications"

    def create_application(self, appt: AdoptionApplicationIn):
        self.collection.insert_one(appt.dict())
        return {
            "message": "Congratulations! Your application has been submitted!"
        }

    # Time Complexity: O(n)
    def list_adoption_applications(
        self,
    ) -> AdoptionApplicationList:
        response = self.collection.find({})
        appts = []
        for appt in response:
            appt["id"] = str(appt["_id"])
            appts.append(AdoptionApplicationOut(**appt))
        return appts

    def get_adoption_application(self, id) -> AdoptionApplicationOut:
        try:
            appt = self.collection.find_one({"_id": ObjectId(id)})
        except:
            return None
        if not appt:
            return None
        appt["id"] = str(appt["_id"])
        return AdoptionApplicationOut(**appt)

    def update_adoption_application(self, id, data) -> AdoptionApplicationOut:
        try:
            appt = self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": data.dict()},
                return_document=ReturnDocument.AFTER,
            )
        except:
            return None
        if appt:
            return AdoptionApplicationOut(**appt, id=id)

    def delete_adoption_application(self, id):
        try:
            id = ObjectId(id)
            appt = self.collection.find_one({"_id": id})
        except:
            return None
        if appt:
            self.collection.delete_one({"_id": id})
            return {"message": "Your Adoption application has been deleted!"}
