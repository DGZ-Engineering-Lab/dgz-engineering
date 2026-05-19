import sys
import os
sys.path.insert(0, r"c:\Users\AlbertG\IGGA.SAS\PERSONAL\DEV\REPOS\dgz-engineering\backend\qa_engine")

import asyncio
from typing import List, Dict, Any
import geopandas as gpd
from shapely.geometry import shape, mapping
from mcp.server.fastmcp import FastMCP
from schemas import GeoJSONFeature
from spatial_engine import validate_collection_topology, calculate_parcel_score, perform_context_analysis
from vur_service import vur_service
from core_validator import GeoQAValidator

# Initialize FastMCP Server
mcp = FastMCP(
    "DGZ Spatial Intelligence Engine",
    description="Sovereign Multipurpose Cadastre & Spatial Intelligence Tools"
)

@mcp.tool()
def heal_topology(geometry: Dict[str, Any]) -> Dict[str, Any]:
    """
    Expert topological healing engine.
    Receives a GeoJSON geometry, loads it into a GeoDataFrame in EPSG:4326 or EPSG:3116,
    heals the geometry using GeoQAValidator, and returns the healed GeoJSON geometry.
    
    Args:
        geometry: GeoJSON geometry dictionary to heal.
    """
    geom = shape(geometry)
    
    # Determine CRS based on geometry bounds
    bounds = geom.bounds
    if all(-180 <= val <= 180 for val in bounds):
        crs = "EPSG:4326"
    else:
        crs = "EPSG:3116"
        
    gdf = gpd.GeoDataFrame(geometry=[geom], crs=crs)
    
    validator = GeoQAValidator(epsg_crs=crs)
    validator.validate_geometries(gdf)
    
    healed_geom = gdf.geometry.iloc[0]
    return mapping(healed_geom)

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
