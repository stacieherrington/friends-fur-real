from .client import Queries
from models.pet import PetOut, PetIn
from bson.objectid import ObjectId
from typing import List
from pymongo import ReturnDocument
import os


AWS_HOST = os.environ.get("AWS_HOST", "").strip("/")


def enrich_pictures(pet):
    if (
        pet.get("pictures")
        and not pet["pictures"].startswith("http")
        and AWS_HOST
    ):
        pet["pictures"] = f"{AWS_HOST}/{pet['pictures']}"


class PetQueries(Queries):
    DB_NAME = "Fur-data"
    COLLECTION = "pets"

    def get_pet(self, id) -> PetOut:
        try:
            id = ObjectId(id)
            pet = self.collection.find_one({"_id": id})
            enrich_pictures(pet)
        except:
            return None
        if not pet:
            return None
        return PetOut(**pet, id=str(id))

    def create_pet(self, pet: PetIn, rescue_id) -> PetOut:
        pet = pet.dict()
        pet["is_adopted"] = False
        pet["rescue_id"] = rescue_id
        if pet["pictures"] is None:
            del pet["pictures"]
        insert_result = self.collection.insert_one(pet)
        if insert_result.acknowledged:
            return {"message": "Yeah! pet added!"}

    def list_pets(self) -> List[PetOut]:
        result = self.collection.find({"is_adopted": False})
        pets = []
        for pet in result:
            enrich_pictures(pet)
            pet["id"] = str(pet["_id"])
            pets.append(PetOut(**pet))
        return pets

    def delete_pet(self, id):
        try:
            delete_result = self.collection.delete_one({"_id": ObjectId(id)})
        except:
            return
        if delete_result:
            return {"message": "pet has been deleted!"}

    def update_pet(self, id, data) -> PetOut:
        try:
            id = ObjectId(id)
            data = data.dict()
            if data["pictures"] is None:
                del data["pictures"]
            pet = self.collection.find_one_and_update(
                {"_id": id},
                {"$set": data},
                return_document=ReturnDocument.AFTER,
            )
        except:
            return None
        if pet:
            enrich_pictures(pet)
            return PetOut(**pet, id=str(id))

    def get_three_random_pets(self) -> List[PetOut]:
        result = self.collection.aggregate(
            [{"$match": {"is_adopted": False}}, {"$sample": {"size": 3}}]
        )
        pets = []
        for pet in result:
            enrich_pictures(pet)
            pet["id"] = str(pet["_id"])
            pets.append(PetOut(**pet))
        return pets

    def list_rescue_pets(self, rescue_id) -> List[PetOut]:
        result = self.collection.find({"rescue_id": rescue_id})
        pets = []
        for pet in result:
            enrich_pictures(pet)
            pet["id"] = str(pet["_id"])
            pets.append(PetOut(**pet))
        return pets

    def is_adopted(self, pet_id):
        self.collection.update_one(
            filter={"_id": ObjectId(pet_id)},
            update={"$set": {"is_adopted": True}},
        )

    def rescue_own_pet(self, pet_id, rescue_id) -> bool:
        pet = self.get_pet(pet_id)
        if pet:
            return pet.dict()["rescue_id"] == rescue_id
        return False
