from routers.accounts import (
    AccountToken,
    list_accounts,
    AccountQueries,
    AccountOut,
    single_account,
    Account,
)
from models.rescue import Address, Location
from models.accounts import AccountList
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

fakeAdminAccount = AccountList(
    accounts=[
        AccountOut(
            email="email",
            id="1",
            first_name="",
            last_name="",
            picture="",
            rescue_id="rescue",
            roles=[2],
            address=Address(
                address_one="",
                address_two="",
                city="",
                state="",
                zip_code="18064",
            ),
            location=Location(type="Point", coordinates=["11.1", "22.2"]),
        )
    ]
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


# async def admin_in_override():
#     return fakeAdminAccount


# app.dependency_overrides[
#     authenticator.try_get_current_account_data
# ] = admin_in_override


# def test_get_current_account():
#     response = client.get("/api/manage/staff/")

#     assert response.status_code == 200
#     assert response.json() == []
