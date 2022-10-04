from .client import Queries
from models import PetOut
from bson.objectid import ObjectId

class PetQueries(Queries):
    DB_NAME = 'fur'
    COLLECTION = 'pet'

    def get_pet(self,id) -> PetOut:
        id = ObjectId(id)
        props = self.collection.find_one({"_id":id})
        if not props:
            return None
        props['id'] = str(props['_id'])
        return PetOut(**props)