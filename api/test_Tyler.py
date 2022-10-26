from routers.accounts import (
    AccountToken,
    AccountQueries,
    AccountOut,
)
from models.rescue import Address, Location
from main import app
from fastapi.testclient import TestClient
from routers.auth import authenticator
from queries.accounts import AccountQueries

client = TestClient(app)


fakeAccount = AccountOut(
    email="email",
    id="1",
    first_name="",
    last_name="",
    picture="",
    roles=["base"],
    address=Address(
        address_one="",
        address_two="",
        city="",
        state="",
        zip_code="18064",
    ),
    location=Location(type="Point", coordinates=["11.1", "22.2"]),
)


fakeToken = AccountToken(
    access_token="faked",
    token_type="Bearer",
    account=fakeAccount,
)


async def account_in_override():
    return fakeAccount


app.dependency_overrides[
    authenticator.try_get_current_account_data
] = account_in_override


def test_get_token():
    response = client.get("/token/", cookies={"fastapi_token": "faked"})

    assert response.status_code == 200
    assert response.json() == fakeToken


class EmptyAccountRepo:
    def list_accounts(self):
        return []

def test_list_all_accounts():
    app.dependency_overrides[AccountQueries] = EmptyAccountRepo
    response = client.get("/api/accounts/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json()["accounts"] == []
