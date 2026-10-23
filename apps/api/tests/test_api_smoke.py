"""Pruebas de humo de la API: arranque, contratos básicos y controles de seguridad."""

SQUARE = {
    "type": "Polygon",
    "coordinates": [[[-75.57, 6.24], [-75.56, 6.24], [-75.56, 6.25], [-75.57, 6.25], [-75.57, 6.24]]],
}


def feature(codigo="001", geometry=SQUARE):
    return {"type": "Feature", "properties": {"codigo": codigo}, "geometry": geometry}


def test_health(client):
    assert client.get("/healthz").json() == {"status": "ok"}
    assert client.get("/health").status_code == 200


def test_root(client):
    assert client.get("/").status_code == 200


def test_sentry_debug_removed(client):
    assert client.get("/sentry-debug").status_code == 404


def test_mapbox_token_hidden_without_public_token(client):
    assert client.get("/config/mapbox-token").status_code == 404


def test_validate_ok(client):
    r = client.post("/validate", json={"type": "FeatureCollection", "features": [feature("001"), feature("002")]})
    assert r.status_code == 200


def test_validate_rejects_too_many_features(client):
    r = client.post("/validate", json={"type": "FeatureCollection", "features": [feature(str(i)) for i in range(501)]})
    assert r.status_code == 422


def test_analyze_context_sql_injection_payload_is_harmless(client):
    r = client.post("/intelligence/analyze_context", json=feature("x' OR '1'='1"))
    assert r.status_code == 200


def test_vur_rejects_path_injection(client):
    assert client.get("/api/vur/query", params={"matricula": "50N-../x"}).status_code in (400, 422)
    assert client.get("/api/vur/query", params={"matricula": "XYZ-1"}).status_code == 400


def test_vur_demo_mode(client):
    r = client.get("/api/vur/query", params={"matricula": "50N-30123"})
    assert r.status_code == 200
    assert r.json().get("simulated") is True


def test_cross_reference_rejects_traversal_filename(client):
    files = {
        "spatial_file": ("../../main.py", b"print('x')", "text/plain"),
        "legal_file": ("legal.csv", b"npu\n1\n", "text/csv"),
    }
    r = client.post("/api/v1/cross-reference", files=files)
    assert 400 <= r.status_code < 500


def test_errors_do_not_leak_cors_wildcard(client):
    r = client.get("/", headers={"Origin": "https://evil.example"})
    assert r.headers.get("access-control-allow-origin") != "*"
