from pymongo import ReturnDocument
from .client import Queries
from models import Account, AccountIn, AccountOut, AccountList, AccountUpdate
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
        result = self.collection.find_one({"email": props["email"]})
        if result:
            raise DuplicateAccountError()
        self.collection.insert_one(props)
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
                return_document=ReturnDocument.AFTER,
            )
        except:
            return None
        # if acct:
        #     acct["id"] = str(acct["_id"])
        return AccountUpdate(**acct, id=id)

    def delete_account(self, id):
        try:
            self.collection.find_one_and_delete({"_id": ObjectId(id)})
        except:
            return None
        return {"message": "Your Account has been deleted!"}
