from fastapi.testclient import TestClient
from main import app

from queries.accounts import AccountQueries


client = TestClient(app)

class EmptyAccountRepo:
    def list_accounts(self):
        return[]

class CreateAccountQueries:
    def create(self, acct):
        result = {

            "email": "test@success.com",
            "password": "success",
            "address": {
                "address_one": "string",
                "address_two": "string",
                "city": "string",
                "state": "string",
                "zip_code": "12345",
            },
        }
        result.update(acct)
        return result
def test_get_all_accounts():
    app.dependency_overrides[AccountQueries.single_account] = EmptyAccountRepo
    response = client.get('/api/accounts/')
    app.dependency_overrides={}
    assert response.status_code == 200
    assert response.json()==[]
