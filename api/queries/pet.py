from .client import Queries
from models import PetOut
from bson.objectid import ObjectId


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
        return PetOut(**pet)

    def create_pet(self,name):
        self.collection.insert_one({'name':name})
        return {"message":"Yeah! pet added!"}

    def list_pets(self):
        pets= []
        cursor = self.collection.find({})
        for pet in cursor:
            pet['id'] = str(pet['_id'])
            pets.append(PetOut(**(pet)))
        return pets
    
    def delete_pet(self,id):
        try:
            id = ObjectId(id)
            pet = self.collection.find_one({"_id":id})
        except:
            return None
        if pet:
            self.collection.delete_one({"id":id})
            return {"message":"pet has been deleted!"}