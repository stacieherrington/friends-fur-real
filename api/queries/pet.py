from tokenize import Double
from .client import Queries
from models.pet import PetOut, PetIn, PetsList
from bson.objectid import ObjectId
from typing import List
from pymongo import ReturnDocument
from random import randint
from .accounts import AccountQueries


class PetQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "pets"

    def get_pet(self, id) -> PetOut:
        try:
            id = ObjectId(id)
            pet = self.collection.find_one({"_id": id})
        except:
            return None
        if not pet:
            return None
        return PetOut(**pet, id=str(id))

    def create_pet(self, pet: PetIn, rescue_id) -> PetOut:
        pet = pet.dict()
        pet["is_adopted"] = False
        pet["rescue_id"] = rescue_id
        insert_result = self.collection.insert_one(pet)
        # the insert_result have acknowledged(True/ False), and inserted_id(ObjectID of the new pet)
        if insert_result.acknowledged:
            return {"message": "Yeah! pet added!"}

    def list_pets(self) -> List[PetOut]:
        # now return all the pet, need working on sort by distance later?
        result = self.collection.find({"is_adopted": False})
        pets = []
        for pet in result:
            pet["id"] = str(pet["_id"])
            pets.append(PetOut(**pet))
        return pets

    def delete_pet(self, id):
        try:
            delete_result = self.collection.delete_one({"_id": ObjectId(id)})
        except:
            return
        # delete result has delete_result.deleted_count(ing), and delete_result.acknowledged(bool)
        if delete_result:
            return {"message": "pet has been deleted!"}

    def update_pet(self, id, data) -> PetOut:
        try:
            id = ObjectId(id)
            pet = self.collection.find_one_and_update(
                {"_id": id},
                {"$set": data.dict()},
                return_document=ReturnDocument.AFTER,
            )
        except:
            return None
        if pet:
            return PetOut(**pet, id=str(id))

    def get_three_random_pets(self) -> List[PetOut]:
        result = self.collection.aggregate(
            [{"$match": {"is_adopted": False}}, {"$sample": {"size": 3}}]
        )
        pets = []
        for pet in result:
            pet["id"] = str(pet["_id"])
            pets.append(PetOut(**pet))
        return pets

    def list_rescue_pets(self, rescue_id) -> List[PetOut]:
        result = self.collection.find({"rescue_id": rescue_id})
        pets = []
        for pet in result:
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
