from fastapi.testclient import TestClient
from main import app
from queries.rescue import RescueQueries

client = TestClient(app)


class EmptyRescueQueries:
    def list_rescues(self):
        return []


def test_rescue_list():
    app.dependency_overrides[RescueQueries] = EmptyRescueQueries

    response = client.get("/api/rescues/")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"rescues": []}