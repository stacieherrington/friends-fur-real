from fastapi.testclient import TestClient
from main import app
from queries.story import SuccessStoryQueries

client = TestClient(app)


class EmptyStoryQueries:
    def get_three_random_stories(self):
        return []


def test_list_random_pets():
    app.dependency_overrides[SuccessStoryQueries] = EmptyStoryQueries

    response = client.get("/api/stories/random/")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"stories": []}
