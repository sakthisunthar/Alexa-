from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

VALID_TRIP = {
    "destination": "Kyoto, Japan",
    "startDate": "2025-04-01",
    "endDate": "2025-04-05",
    "travelers": 2,
    "budget": "3000",
    "currency": "USD",
    "travelStyle": "moderate",
    "interests": ["culture", "food"],
    "accommodation": "hotel",
    "transportation": "mixed",
}


def test_generate_trip():
    response = client.post("/api/trips/generate", json=VALID_TRIP)
    assert response.status_code == 200
    data = response.json()
    assert data["destination"] == "Kyoto, Japan"
    assert data["travelers"] == 2
    assert len(data["days"]) == 5
    assert "budget" in data
    assert data["budget"]["currency"] == "USD"
    assert data["dataSource"] == "sample"


def test_generate_trip_has_activities():
    response = client.post("/api/trips/generate", json=VALID_TRIP)
    data = response.json()
    for day in data["days"]:
        assert len(day["activities"]) > 0
        for act in day["activities"]:
            assert "name" in act
            assert "time" in act
            assert "category" in act


def test_generate_trip_budget_breakdown():
    response = client.post("/api/trips/generate", json=VALID_TRIP)
    budget = response.json()["budget"]
    assert budget["total"] == 3000
    assert budget["totalEstimated"] > 0
    breakdown = budget["breakdown"]
    assert breakdown["accommodation"] > 0
    assert breakdown["food"] > 0
    assert breakdown["transportation"] > 0


def test_retrieve_trip():
    gen = client.post("/api/trips/generate", json=VALID_TRIP)
    trip_id = gen.json()["id"]
    response = client.get(f"/api/trips/{trip_id}")
    assert response.status_code == 200
    assert response.json()["id"] == trip_id


def test_retrieve_missing_trip():
    response = client.get("/api/trips/nonexistent")
    assert response.status_code == 404


def test_invalid_trip_request():
    response = client.post(
        "/api/trips/generate",
        json={"destination": "", "startDate": "bad", "endDate": "bad", "budget": ""},
    )
    assert response.status_code == 422


def test_chat_endpoint():
    response = client.post(
        "/api/chat", json={"message": "Hello, help me plan a trip"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert isinstance(data["response"], str)
    assert len(data["response"]) > 0
