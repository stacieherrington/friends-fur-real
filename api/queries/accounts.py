from pymongo import ReturnDocument
from queries.sessions import SessionQueries
from .client import Queries
from models.accounts import (
    Account,
    AccountIn,
    AccountOut,
    AccountList,
    AccountUpdate,
    AccountDisplay,
)
from pymongo.errors import DuplicateKeyError
from bson.objectid import ObjectId
from typing import Any


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "accounts"

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
        dup_test = self.collection.find_one({"email": props["email"]})
        if dup_test:
            raise DuplicateAccountError
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
        acct = self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": data.dict(exclude_unset=True)},
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
        # find_ond_and_update not raise error, return None, before or after document
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
        # kick off the user
        acct["id"] = str(acct["_id"])
        SessionQueries().delete_sessions(account_id=acct["id"])
        return AccountOut(**acct)

    def demote_account(self, email, rescue_id) -> AccountOut:
        #
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
        # kick off the user
        acct["id"] = str(acct["_id"])
        SessionQueries().delete_sessions(account_id=acct["id"])
        return AccountOut(**acct)

    # here:
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
