import asyncio
from typing import List, Dict, Any
from mcp.server.fastmcp import FastMCP
from schemas import GeoJSONFeature
from spatial_engine import validate_collection_topology, calculate_parcel_score, perform_context_analysis
from vur_service import vur_service

# Initialize FastMCP Server
mcp = FastMCP(
    "DGZ Spatial Intelligence Engine",
    description="Sovereign Multipurpose Cadastre & Spatial Intelligence Tools"
)

@mcp.tool()
def validate_topology(features: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Expert topological validation engine.
    Examines GeoJSON features for structural integrity, overlaps, gaps, sliver detection, and self-intersections.
    
    Args:
        features: A list of GeoJSON features representing land parcels or zones.
    """
    parsed_features = []
    for idx, f in enumerate(features):
        parsed_features.append(GeoJSONFeature(
            type=f.get("type", "Feature"),
            properties=f.get("properties", {}),
            geometry=f.get("geometry", {})
        ))
    return validate_collection_topology(parsed_features)

@mcp.tool()
def get_parcel_score(feature: Dict[str, Any]) -> Dict[str, Any]:
    """
    Calculates the 'Spatial Intelligence Score' for a single GeoJSON parcel based on urban and cadastral variables.
    
    Args:
        feature: A single GeoJSON feature representing the target parcel.
    """
    parsed_feature = GeoJSONFeature(
        type=feature.get("type", "Feature"),
        properties=feature.get("properties", {}),
        geometry=feature.get("geometry", {})
    )
    return calculate_parcel_score(parsed_feature)

@mcp.tool()
def analyze_context(feature: Dict[str, Any]) -> Dict[str, Any]:
    """
    Advanced Environmental and Infrastructure Context analysis using Polars and DuckDB Simulation.
    Provides risk level assessment, proximity indexes, and strategic recommendations.
    
    Args:
        feature: A single GeoJSON feature representing the target parcel.
    """
    parsed_feature = GeoJSONFeature(
        type=feature.get("type", "Feature"),
        properties=feature.get("properties", {}),
        geometry=feature.get("geometry", {})
    )
    res = perform_context_analysis(parsed_feature)
    return res.model_dump()

@mcp.tool()
async def query_snr_vur(matricula: str) -> Dict[str, Any]:
    """
    Queries property status data from the Superintendent of Notaries and Registry (SNR/VUR) based on its registration number.
    
    Args:
        matricula: Property registration number (Matrícula Inmobiliaria).
    """
    return await vur_service.get_parcel_data(matricula)

if __name__ == "__main__":
    mcp.run()
