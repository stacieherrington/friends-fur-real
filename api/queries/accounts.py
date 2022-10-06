from .client import Queries
from models import Account, AccountIn
from pymongo.errors import DuplicateKeyError

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

    def get(self, email: str) -> AccountIn:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return Account(**props)

