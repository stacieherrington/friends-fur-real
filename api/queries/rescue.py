from .client import Queries
from models.rescue import RescueOut, RescueIn
from bson.objectid import ObjectId
from typing import List, Any
from pymongo import ReturnDocument
from .accounts import AccountQueries


class RescueQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "rescues"

    def get_rescue(self, id) -> RescueOut:
        try:
            id = ObjectId(id)
            rescue = self.collection.find_one({"_id": id})
        except:
            return None
        if not rescue:
            return None
        rescue["id"] = str(rescue["_id"])
        return RescueOut(**rescue)

    def get_rescue_dict(self, id) -> dict[str, Any]:
        return self.collection.find_one({"_id": ObjectId(id)})

    def create_rescue(self, rescue: RescueIn):
        rescue = rescue.dict()
        admin_email = rescue["admin_email"]
        insert_result = self.collection.insert_one(rescue)
        if insert_result.acknowledged:
            rescue_id = str(insert_result.inserted_id)
            set_admin = AccountQueries().collection.find_one_and_update(
                {"email": admin_email},
                {
                    "$addToSet": {"roles": {"$each": ["admin", "staff"]}},
                    "$set": {"rescue_id": rescue_id},
                },
                return_document=ReturnDocument.AFTER,
            )
            if set_admin:
                return {"message": "Yeah! Rescue added!"}

    def delete_rescue(self, id):
        try:
            id = ObjectId(id)
            rescue = self.collection.find_one({"_id": id})
        except:
            return None
        if rescue:
            self.collection.delete_one({"_id": id})
            return {"message": "Rescue has been deleted!"}

    def list_rescues(self) -> List[RescueOut]:
        result = self.collection.find({})
        rescues = []
        for rescue in result:
            rescue["id"] = str(rescue["_id"])
            rescues.append(RescueOut(**rescue))
        return rescues

    def update_rescue(self, id, data) -> RescueOut:
        try:
            id = ObjectId(id)
            rescue = self.collection.find_one_and_update(
                {"_id": id},
                {"$set": data.dict()},
                return_document=ReturnDocument.AFTER,
            )
        except:
            return None
        if rescue:
            rescue["id"] = str(rescue["_id"])
            return RescueOut(**rescue)

    def set_rescue_location(self, rescue: dict, location: dict) -> RescueOut:
        try:
            self.collection.update_one(
                {"_id": rescue["_id"]}, {"$set": {"location": location}}
            )
            rescue["location"] = location
        except Exception as e:
            print(e)
            return None
        return RescueOut(**rescue)

    def sort_rescues_by_distance(self, account_id):
        account = AccountQueries().get_account_dict(account_id)
        account_location = account["location"]
        location_query = {
            "$nearSphere": {
                "$geometry": account_location,
                "$maxDistance": 321869,  # 200 miles in meters
            }
        }
        result = self.collection.find({"location": location_query})
        rescues = []
        for rescue in result:
            rescue["id"] = str(rescue["_id"])
            rescues.append(RescueOut(**rescue))
        return rescues
