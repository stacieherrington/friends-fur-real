from .client import Queries
from models import PetOut, PetIn, PetsList
from bson.objectid import ObjectId
from typing import List
from pymongo import ReturnDocument

class PetQueries(Queries):
    DB_NAME = 'fur'
    COLLECTION = 'pet'

    def get_pet(self,id) -> PetOut:
        try:
            id = ObjectId(id)
            pet = self.collection.find_one({"_id":id})
        except:
            return None
        if not pet:
            return None
        pet['id'] = str(pet['_id'])
        # pet['adopter']
        # pet['is_adopted']
        return PetOut(**pet)

    def create_pet(self,pet:PetIn):
        self.collection.insert_one(pet.dict())
        return {"message":"Yeah! pet added!"}

    def list_pets(self)->List[PetOut]:
        result = self.collection.find({})
        pets = []
        for pet in result:
            pet['id'] = str(pet['_id'])
            pets.append(PetOut(**pet))
        return pets

    def delete_pet(self,id):
        try:
            id = ObjectId(id)
            pet = self.collection.find_one({"_id":id})
        except:
            return None
        if pet:
            self.collection.delete_one({"_id":id})
            return {"message":"pet has been deleted!"}

    def update_pet(self, id, data) -> PetOut:
        try:
            print(data, "AaAAAAAAAAAAAAAAAAAA<----------------")
            id = ObjectId(id)
            pet = self.collection.find_one_and_update({"_id":id}, {"$set": data.dict()}, return_document=ReturnDocument.AFTER)

            # pet = self.collection.find_one_and_update({"_id":id},
            #     data,
            #     return_document=ReturnDocument.AFTER)
            # pet = self.collection.find_and_modify({"query": {"_id":id},
            #     "new": True,
            #     "update": data.dict() })
        except:
            return None
        if pet:
            pet['id'] = str(pet['_id'])
            return PetOut(**pet)
