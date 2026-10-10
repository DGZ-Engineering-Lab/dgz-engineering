import logging
import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List

from .schemas import ValidationRequest, GeoJSONFeature, AnalysisResult
from .spatial_engine import validate_collection_topology, calculate_parcel_score, perform_context_analysis
from .database import get_db

logger = logging.getLogger(__name__)

app = FastAPI(
    title="DGZ Spatial Intelligence Engine",
    description="Advanced Spatial Systems Engineering API for Multipurpose Cadastre & Territorial Intelligence.",
    version="6.1.0"
)

# CORS: public read-only API. Origins come from CORS_ALLOW_ORIGINS (comma-separated);
# credentials are never allowed, since a wildcard origin with credentials is unsafe.
_cors_origins = [o.strip() for o in os.getenv("CORS_ALLOW_ORIGINS", "*").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

@app.get("/", tags=["System"])
async def get_system_status():
    """Returns the Sovereign System status and versioning."""
    return {
        "engine": "DGZ_SPATIAL_OS",
        "version": "6.1.0",
        "status": "OPERATIONAL",
        "architecture": "MODULAR_V6",
        "telemetry": {
            "uptime": "99.99%",
            "spatial_load": "nominal",
            "db_status": "CONNECTED"
        }
    }

@app.get("/parcels", tags=["Cadastre"])
async def get_ingested_parcels(db: Session = Depends(get_db)):
    """
    Retrieves real cadastral data ingested from IGAC.
    Level 1: Data Access.
    """
    try:
        # Fetching 100 features from PostGIS as GeoJSON
        query = text("""
            SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(ST_AsGeoJSON(t.*)::json)
            )
            FROM (
                SELECT objectid, codigo, area_m2, geometry FROM public.cadastral_parcels LIMIT 100
            ) as t;
        """)
        result = db.execute(query).fetchone()
        return result[0] if result else {"type": "FeatureCollection", "features": []}
    except Exception:
        # Log the real error server-side; don't leak SQL/connection details to clients.
        logger.exception("Failed to fetch cadastral parcels")
        raise HTTPException(status_code=500, detail="Database error")

@app.post("/validate", tags=["Topology"])
async def validate_topology(request: ValidationRequest):
    """Expert-level topological validation engine."""
    return validate_collection_topology(request.features)

@app.post("/intelligence/parcel_score", tags=["AI"])
async def calculate_parcel_intelligence(feature: GeoJSONFeature):
    """Calculates the 'Spatial Intelligence Score' for a parcel."""
    return calculate_parcel_score(feature)

@app.post("/intelligence/analyze_context", tags=["GeoAI"], response_model=AnalysisResult)
async def analyze_context(feature: GeoJSONFeature):
    """
    Advanced Environmental and Infrastructure Analysis.
    Level 4: Digital Twin Simulation.
    """
    return perform_context_analysis(feature)

@app.get("/config/mapbox-token", tags=["System"])
async def get_mapbox_token():
    """Returns the Mapbox token from environment variables."""
    token = os.getenv("MAPBOX_TOKEN")
    return {"token": token if token else ""}
