from pydantic import BaseModel, Field
from typing import Any, Dict, List, Literal, Optional

# Tipos de geometría GeoJSON aceptados
GeometryType = Literal[
    "Point", "MultiPoint", "LineString", "MultiLineString",
    "Polygon", "MultiPolygon", "GeometryCollection",
]

MAX_FEATURES = 500
MAX_PROPERTIES = 200


class SpatialProperty(BaseModel):
    npu: Optional[str] = Field(None, description="Número Predial Unificado")
    area_m2: Optional[float] = Field(None, description="Calculated area in square meters")
    uso: Optional[str] = Field(None, description="Land use classification")
    estrato: Optional[int] = Field(None, ge=1, le=6, description="Socio-economic stratum")

class GeoJSONFeature(BaseModel):
    type: Literal["Feature"] = "Feature"
    properties: Dict[str, Any] = Field(..., max_length=MAX_PROPERTIES)
    geometry: Dict[str, Any] = Field(..., max_length=10)

class ValidationRequest(BaseModel):
    type: Literal["FeatureCollection"] = "FeatureCollection"
    features: List[GeoJSONFeature] = Field(..., max_length=MAX_FEATURES)

class HealTopologyRequest(BaseModel):
    """Acepta una geometría GeoJSON en la raíz o envuelta en {"geometry": {...}} (Feature)."""
    type: Optional[Literal[GeometryType, "Feature"]] = None
    coordinates: Optional[List[Any]] = Field(None, max_length=1000)
    geometry: Optional[Dict[str, Any]] = Field(None, max_length=10)

class SemanticSearchRequest(BaseModel):
    query: str = Field("", max_length=200)

class AnalysisResult(BaseModel):
    parcel_id: str
    risk_level: str
    infrastructure_proximity: Dict[str, float]
    urban_compliance: bool
    spatial_score: int
    recommendations: List[str]
    simulation_data: Optional[Dict[str, Any]] = None
    context_layers: Optional[List[Dict[str, Any]]] = None
