from .client import Queries
from models.pet import PetOut, PetIn, PetsList
from bson.objectid import ObjectId
from typing import List
from pymongo import ReturnDocument
from random import randint

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
        # pet['id'] = str(pet['_id'])
        # pet['adopter']
        # pet['is_adopted']
        return PetOut(**pet, id=id)

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
            pet = self.collection.find_one_and_update(
                {"_id":id},
                {"$set": data.dict()},
                return_document=ReturnDocument.AFTER
                )
        except:
            return None
        if pet:
            # pet['id'] = str(pet['_id'])
            return PetOut(**pet, id=id)

    def get_three_random_pets(self):
        result = self.collection.find({})
        pets = []
        three_pets = []
        for pet in result:
            pet['id'] = str(pet['_id'])
            pets.append(PetOut(**pet))
        random_num_list = []
        if len(pets) >= 3:
            n = 3
        else:
            n = len(pets)
        while len(random_num_list) < n:
            random_num = randint(0, len(pets) - 1)
            if random_num not in random_num_list:
                random_num_list.append(random_num)
        for num in random_num_list:
            three_pets.append(pets[num])
        return three_pets
