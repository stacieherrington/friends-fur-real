from .client import Queries
from typing import List
from models.adoption_application import (
    ApplicationIn,
    ApplicationOut,
)
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from .pet import PetQueries


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

    def detail_application(self, application_id) -> ApplicationOut:
        app = self.collection.find_one({"_id": ObjectId(application_id)})
        if app:
            return ApplicationOut(**app, id=application_id)

    def list_account_applications(self, id) -> List[ApplicationOut]:
        response = self.collection.find({"account_id": id})
        apps = []
        for app in response:
            app["id"] = str(app["_id"])
            apps.append(ApplicationOut(**app))
        return apps

    def approve_application(self, application_id) -> ApplicationOut:
        # 1. check if there is an approved applicaiton with the same pet_id
        pet_id = self.detail_application(application_id).pet_id
        has_approved_app = self.collection.find_one(
            {"pet_id": pet_id, "status": "Approved"}
        )
        # 2. if there is an approved application for the same pet, change current application status to Rejected and return message
        if has_approved_app:
            self.collection.update_one(
                filter={"application_id": ObjectId(application_id)},
                update={"$set": {"status": "Rejected"}},
            )
            return {
                "message": "Sorry, this pet has been adopted by other family!"
            }
        else:
            # 3. if there is no approved application for this pet,
            #       update all application status to Rejected, then update current application_id to approved
            #       update pet is_adopted to True
            PetQueries().is_adopted(pet_id)
            self.collection.update_many(
                filter={"pet_id": pet_id},
                update={"$set": {"status": "Rejected"}},
            )
            result = self.collection.find_one_and_update(
                filter={"_id": ObjectId(application_id)},
                update={"$set": {"status": "Approved"}},
                return_document=ReturnDocument.AFTER,
            )
            return ApplicationOut(**result, id=application_id)

    def reject_application(self, application_id) -> ApplicationOut:
        result = self.collection.find_one_and_update(
            filter={"_id": ObjectId(application_id)},
            update={"$set": {"status": "Rejected"}},
            return_document=ReturnDocument.AFTER,
        )
        return ApplicationOut(**result, id=application_id)


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
