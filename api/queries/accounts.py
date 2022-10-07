from pymongo import ReturnDocument
from .client import Queries
from models.accounts import (
    Account,
    AccountIn,
    AccountOut,
    AccountList,
    AccountUpdate,
)
from pymongo.errors import DuplicateKeyError
from bson.objectid import ObjectId


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "fur"
    COLLECTION = "accounts"

    def create(self, acct: AccountIn, roles=["base"]) -> Account:
        props = acct.dict()
        props["roles"] = roles
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return Account(**props)

    def list_accounts(
        self,
    ) -> AccountList:
        response = self.collection.find({})
        accts = []
        for acct in response:
            acct["id"] = str(acct["_id"])
            accts.append(AccountOut(**acct))
        return accts

    def get_account(self, email: str) -> AccountIn:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return Account(**props)

    def update_account(self, id, data) -> AccountUpdate:
        try:
            acct = self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": data.dict()},
                return_document=ReturnDocument.BEFORE,
            )
        except:
            return None
        return AccountOut(**acct, id=id)

    def delete_account(self, id):
        try:
            id = ObjectId(id)
            account = self.collection.find_one({"_id": id})
        except:
            return None
        if account:
            self.collection.delete_one({"_id": id})
            return {"message": f"Account {id} has been deleted!"}
