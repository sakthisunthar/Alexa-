from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "aiConfigured" in data


def test_health_returns_version():
    response = client.get("/api/health")
    assert response.json()["version"] == "0.1.0"
