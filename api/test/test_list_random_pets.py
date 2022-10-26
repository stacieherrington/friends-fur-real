from fastapi.testclient import TestClient
from main import app
from queries.pet import PetQueries

client = TestClient(app)


class EmptyPetQueries:
    def get_three_random_pets(self):
        return []


def test_list_random_pets():
    app.dependency_overrides[PetQueries] = EmptyPetQueries

    response = client.get("/api/random/pets/")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"pets": []}