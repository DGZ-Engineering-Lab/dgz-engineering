import os
import sys

import pytest

API_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if API_DIR not in sys.path:
    sys.path.insert(0, API_DIR)

# Entorno aislado: sin BD, sin Redis, sin Sentry ni credenciales VUR (modo demo).
for var in ("DATABASE_URL", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "SENTRY_DSN", "VUR_USER", "VUR_PASS", "MAPBOX_TOKEN"):
    os.environ.pop(var, None)


@pytest.fixture(scope="session")
def client():
    from fastapi.testclient import TestClient

    from main import app

    return TestClient(app)
