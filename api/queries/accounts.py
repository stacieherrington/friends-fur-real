from pymongo import ReturnDocument
from queries.sessions import SessionQueries
from pymongo import MongoClient
from .client import Queries
from models.accounts import (
    Account,
    AccountIn,
    AccountOut,
    AccountList,
    AccountDisplay,
    AccountPets,
)
from bson.objectid import ObjectId
from typing import Any
from acl.nominatim import Nominatim
from fastapi import Depends


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "accounts"

    def __init__(self, address_service: Nominatim = Depends()):
        self.address_service = address_service

    def get(self, email: str) -> Account:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return Account(**props)

    def create(
        self, acct: AccountIn, hashed_password: str, roles=["base"]
    ) -> Account:
        props = acct.dict()
        props["password"] = hashed_password
        props["roles"] = roles
        props["address"]["address_one"] = ""
        props["address"]["address_two"] = ""
        props["address"]["city"] = ""
        props["address"]["state"] = ""
        dup_test = self.collection.find_one({"email": props["email"]})
        if dup_test:
            raise DuplicateAccountError
        self.add_location(props)
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return Account(**props)

    def list_accounts(
        self,
    ) -> AccountList:
        accounts = self.collection.find()
        accts = []
        for acct in accounts:
            acct["id"] = str(acct["_id"])
            accts.append(AccountOut(**acct))
        return accts

    def list_accounts_by_rescue_id(self, rescue_id) -> AccountList:
        accounts = self.collection.find(
            {"rescue_id": rescue_id, "roles": "staff"}
        )
        accts = []
        for acct in accounts:
            acct["id"] = str(acct["_id"])
            accts.append(AccountOut(**acct))
        return accts

    def single_account(self, id) -> AccountDisplay:
        acct = self.collection.find_one({"_id": ObjectId(id)})
        if not acct:
            return None
        return AccountDisplay(**acct)

    def get_account_dict(self, id) -> dict[str, Any]:
        return self.collection.find_one({"_id": ObjectId(id)})

    def update_account(self, id, data) -> AccountDisplay:
        data = data.dict(exclude_unset=True)
        self.add_location(data)
        acct = self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": data},
            return_document=ReturnDocument.AFTER,
        )
        if not acct:
            return None
        return AccountDisplay(**acct)

    def delete_account(self, id):
        try:
            id = ObjectId(id)
            account = self.collection.find_one({"_id": id})
        except:
            return None
        if account:
            self.collection.delete_one({"_id": id})
            return {"message": f"Account {id} has been deleted!"}

    def promote_account(self, email, rescue_id) -> AccountOut:
        acct = self.collection.find_one_and_update(
            {"email": email},
            {
                "$addToSet": {"roles": "staff"},
                "$set": {"rescue_id": rescue_id},
            },
            return_document=ReturnDocument.AFTER,
        )
        if not acct:
            return None
        acct["id"] = str(acct["_id"])
        SessionQueries().delete_sessions(account_id=acct["id"])
        return AccountOut(**acct)

    def demote_account(self, email, rescue_id) -> AccountOut:
        acct = self.collection.find_one_and_update(
            {"email": email, "rescue_id": rescue_id},
            {
                "$pull": {"roles": "staff"},
                "$unset": {"rescue_id": rescue_id},
            },
            return_document=ReturnDocument.AFTER,
        )
        if not acct:
            return None
        acct["id"] = str(acct["_id"])
        SessionQueries().delete_sessions(account_id=acct["id"])
        return AccountOut(**acct)

    def set_account_location(
        self, acct: dict, location: dict
    ) -> AccountDisplay:
        try:
            self.collection.update_one(
                {"_id": acct["_id"]}, {"$set": {"location": location}}
            )
            acct["location"] = location
        except Exception as e:
            print(e)
            return None
        return AccountDisplay(**acct)

    def add_location(self, account):
        address = account["address"]
        address_string = address["address_one"]
        if address["address_two"] is not None:
            address_string = f"{address_string}, {address['address_two']}"
        address_string = f"{address_string},{address['city']}, {address['state']}, {address['zip_code']}"
        query = address_string.replace(" ", "+")
        location = self.address_service.location_from_address(query)
        if location is None:
            address_string = (
                f"{address['city']}, {address['state']}, {address['zip_code']}"
            )
            query = address_string.replace(" ", "+")
            location = self.address_service.location_from_address(query)
        account["location"] = location

    def favorite_pet(self, account_id, pet) -> AccountPets:

        # pet = ObjectId(pet_id.dict()["pet_id"])
        acct = self.collection.find_one_and_update(
            {"_id": ObjectId(account_id)},
            {
                "$addToSet": {"favorites": {"pet_id": pet.id}},
            },
            return_document=ReturnDocument.AFTER,
        )
        print(acct)
        if not acct:
            return None
        # acct.favorites["pets"] = str(acct.favorites["pets"])
        acct["id"] = str(acct["_id"])
        return AccountPets(**acct)

    def delete_favorite(self, account_id, pet) -> AccountDisplay:

        acct = self.collection.find_one_and_update(
            {"_id": ObjectId(account_id)},
            {
                "$pull": {"favorites": {"pet_id": pet.id}},
            },
            return_document=ReturnDocument.AFTER,
        )
        if not acct:
            return None
        return {"Successfully removed pet from favorites"}

    # def list_favorites(self, account_id):

    # def list_favorites(self, account_id):
    #     account = self.collection.aggrgate(
    #         {"_id": account_id},

    #         )
    # pet = self.collection.find({"$favorites":['_id']})
    # favs=[]
    # for fav in pet:
    #     if pet in account:
    #         favs.append(pet)
    # return favs

    def get_favorites(self, account_id):
        account = (
            self.collection.find(
                {"_id": ObjectId(account_id)},
                # {
                #     "from": "pets",
                #     "pipeline": [
                #         {"$unwind": "$_id"},
                # [
                #     {
                #         "$lookup": {
                #             "from": "pets",
                #             "localField": "favorites.pet_id",
                #             "foreignField": "_id",
                #             "as": "FavoritePets",
                #         }
                #     },
                #     # {'$map': {'input': '$favorites', 'as' :'pet_id','in':'$pet_id'}},
                #     {
                #         "$match": {
                #             "_id": {
                #                 "$map": {
                #                     "input": "$favorites",
                #                     "as": "pet_id",
                #                     "in": "$pet_id",
                #                 }
                #             }
                #         }
                #     },
                # ],
                #     ],
                #     "as": "pets",
                # },
            ),
        )
        # result = self.collection["accounts"].aggregate(
        #     [
        #         {
        #             "$lookup": {
        #                 "from": "pets",
        #                 "pipeline": [{"$unwind": "$_id"}, {"$match": {}}],
        #                 "as": "pets",
        #             }
        #         },
        #         {"$project": {"favorites": "1", "pets": "1"}},
        #     ]
        # )

        # Requires the PyMongo package.
        # https://api.mongodb.com/python/current

        result = self.collection["accounts"].aggregate(
            [
                {
                    "$lookup": {
                        "from": "pets",
                        "pipeline": [
                            {"$unwind": "$_id"},
                            {"$match": {"_id": "$account.favorites.pet_id"}},
                        ],
                        "as": "pets",
                    }
                },
                {"$project": {"favorites": "1", "pets": "1"}},
            ]
        )

        return [result]
        # pets = self.collection.aggregate(
        #     {
        #         "from": "pets",
        #         "pipeline": [
        #             {"$unwind": "$_id"},
        #             {
        #                 "$match": {
        #                     "_id": {
        #                         "$map": {
        #                             "input": "$favorites",
        #                             "as": "pet_id",
        #                             "in": "$pet_id",
        #                         }
        #                     }
        #                 }
        #             },
        #         ],
        #         "as": "pets",
        #     }
        #         [
        #             {
        #                 "$lookup": {
        #                     "from": "pets",
        #                     "localField": "favorites.pet_id",
        #                     "foreignField": "_id",
        #                     "as": "FavoritePets",
        #                 }
        #             },
        #             # {'$map': {'input': '$favorites', 'as' :'pet_id','in':'$pet_id'}},
        #             {
        #                 "$match": {
        #                     "_id": {
        #                         "$map": {
        #                             "input": "$favorites",
        #                             "as": "pet_id",
        #                             "in": "$pet_id",
        #                         }
        #                     }
        #                 }
        #             },
        #         ],
        #     ],
        #     "as": "pets",
        # },
        # )
        # pets = self.collection.aggregate(
        #     [
        #         {
        #             "$lookup": {
        #                 "from": "pets",
        #                 "localField": "FavPets",
        #                 "foreignField": "_id",
        #                 "as": "FavoritePets",
        #             }
        #         },
        #         {"$match": {"_id": ObjectId(pet_id)}},
        #     ]
        # )

        # for i in account:
        #     # del i["FavPets"]
        #     for j in i["FavoritePets"]:
        #         j["pet_id"] = str(j["_id"])
        #         print(i, "+++++++++++++++++++++++++++")
