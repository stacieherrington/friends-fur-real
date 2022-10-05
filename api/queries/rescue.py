from .client import Queries
from models import RescueOut
from bson.objectid import ObjectId
from typing import List
from pymongo import ReturnDocument


class RescueQueries(Queries):
    DB_NAME = 'fur'
    COLLECTION = 'rescue'

    def get_rescue(self, id) -> RescueOut:
        try:
            id = ObjectId(id)
            rescue = self.collection.find_one({"_id":id})
        except:
            return None
        if not rescue:
            return None
        rescue['id'] = str(rescue['_id'])
        return RescueOut(**rescue)
