from .client import Queries
from typing import List
from models.foster_application import (
    FosterApplicationIn,
    FosterApplicationOut,
    FosterApplicationOutWithPet,
    FosterApplicationUpdate,
    ListFosterApplications,
    ListFosterApplicationsWithPet,
)
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from queries.pet import PetQueries, PetOut

# import sys


class FosterAdoptionApplicationQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "foster_applications"

    def create_foster_application(
        self, fosterApplication: FosterApplicationIn, account_id
    ):
        fosterApplication = fosterApplication.dict()
        fosterApplication["account_id"] = account_id
        fosterApplication["status"] = "Submitted"
        record = self.collection.find_one_and_update(
            {
                "$match": {
                    "account_id": account_id,
                }
            },
            fosterApplication,
            upsert=True,
        )
        if record.acknowledged:
            return {"Your foster fosterApplication has been submitted!"}

    def list_rescue_foster_applications(self, id) -> ListFosterApplications:
        result = self.collection.find({"rescue_id": id})
        applications = []
        for fosterApplication in result:
            applications.append(FosterApplicationOut(**fosterApplication[id]))
        return applications

    def list_account_foster_applications(self, id) -> ListFosterApplications:
        record = self.collection.find({"foster_id": id})
        applications = []
        for fosterApplication in result:
            fosterApplication["id"] = str(fosterApplication["_id"])
            pet = fosterApplication["pets"][0]
            pet["id"] = str(pet["_id"])
            fosterApplication["pet"] = pet
            applications.append(
                FosterApplicationOutWithPet(**fosterApplication)
            )
        return applications

    def list_account_fostered_pets(self, id) -> ListFosterApplicationsWithPet:
        rescue = self.collection.find({"rescue_id": id})
        pets = []
        for pet in rescue:
            pet["id"] = ObjectId(pet["_id"])
            pet.append(PetOut(**pet))
        return pets

    def list_rescue_fostered_pets(self, id):
        pass

    def single_foster_application(
        self, foster_application_id
    ) -> FosterApplicationOut:
        result = self.collection.find_one(
            {"_id": ObjectId(foster_application_id)}
        )
        if result:
            return FosterApplicationOut(**result, id=foster_application_id)

    def patch_foster_application(
        self, foster_application_id: str, data: FosterApplicationUpdate
    ) -> FosterApplicationOut:
        fosterApplication = self.collection.find_one_and_update(
            {"_id": ObjectId(foster_application_id)},
            {"$addToSet": data.dict(exclude_unset=True)},
            return_document=ReturnDocument.AFTER,
        )
        if fosterApplication:
            return FosterApplicationOut(
                **fosterApplication, id=foster_application_id
            )
        return {
            "Error, the data provided does not match an existing Foster Application"
        }

    def delete_foster_application(self, foster_application_id):
        deleted = self.collection.find_one_and_delete(
            filter={"_id": ObjectId(foster_application_id)}
        )
        if deleted.acknowledged:
            return {"Your Foster Application has been deleted"}
        return {"This Foster Application does not exist"}

    def current_account_foster_application(
        self, foster_application_id, current_account_id
    ) -> bool:
        fosterApplication = self.single_foster_application(
            foster_application_id
        )
        if fosterApplication:
            return fosterApplication.dict()["account_id"] == current_account_id
        return False

    def current_rescue_foster_application(
        self, foster_application_id, current_staff_rescue_id
    ) -> bool:
        fosterApplication = self.single_foster_application(
            foster_application_id
        )
        if fosterApplication:
            return (
                fosterApplication.dict()["rescue_id"]
                == current_staff_rescue_id
            )
        return False

    def approve_foster_application(
        self, foster_application_id
    ) -> FosterApplicationOut:
        result = self.collection.find_one_and_update(
            filter={"_id": ObjectId(foster_application_id)},
            update={"$addToSet": {"status": "Apprvoed"}},
            return_document=ReturnDocument.AFTER,
        )
        return FosterApplicationOut(**result, id=foster_application_id)

    def reject_foster_application(
        self, foster_application_id
    ) -> FosterApplicationOut:
        result = self.collection.find_one_and_update(
            filter={"_id": ObjectId(foster_application_id)},
            update={"$addToSet": {"status": "Rejected"}},
            return_document=ReturnDocument.AFTER,
        )
        return FosterApplicationOut(**result, id=foster_application_id)

    def approve_fostered_pet(
        self, foster_application_id
    ) -> FosterApplicationOut:
        pet = self.single_foster_application(foster_application_id)
        if not pet:
            return None
        pet_id = pet.pet_id
        has_approved_app = self.collection.find_one(
            {"pet_id": pet_id, "status": "Approved"}
        )
        if has_approved_app:
            self.collection.update_one(
                filter={
                    "foster_application_id": ObjectId(foster_application_id)
                },
                update={"$addToSet": {"status": "Rejected"}},
            )
            return {"Sorry, this pet has already been fostered"}
        else:
            PetQueries().is_fostered(pet_id)
            self.collection.update_many(
                filter={"pet_id": pet_id},
                update={"$addToSet": {"status": "Rejected"}},
            )
            result = self.collection.find_one_and_update(
                filter={"_id": ObjectId(foster_application_id)},
                update={"$addToSet": {"status": "Approved"}},
                return_document=ReturnDocument.AFTER,
            )
            return FosterApplicationOut(**result, id=foster_application_id)
