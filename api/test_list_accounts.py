from fastapi.testclient import TestClient
from main import app

from queries.accounts import AccountQueries

client = TestClient(app)


class EmptyAccountRepo:
    def list_accounts(self):
        return []


def test_list_all_accounts():
    app.dependency_overrides[AccountQueries] = EmptyAccountRepo
    response = client.get("/api/accounts/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json()["accounts"] == []
