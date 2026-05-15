import pytest
import geopandas as gpd
from shapely.geometry import Polygon
from core_validator import GeoQAValidator

@pytest.fixture
def validator():
    # Instanciamos el validador con origen Nacional
    return GeoQAValidator(epsg_crs="EPSG:3116")

@pytest.fixture
def sample_gdf():
    # Creamos un polígono válido y uno inválido ("moño" que se auto-intersecta)
    poly_valid = Polygon([(0, 0), (0, 10), (10, 10), (10, 0), (0, 0)])
    poly_invalid = Polygon([(0, 0), (0, 10), (10, 0), (10, 10), (0, 0)])
    
    gdf = gpd.GeoDataFrame({
        "npu": ["10001", "10002"],
        "geometry": [poly_valid, poly_invalid]
    }, crs="EPSG:3116")
    return gdf

def test_validate_geometries_auto_heals(validator, sample_gdf):
    assert not sample_gdf.geometry.is_valid.all(), "El GDF original debería tener geometrías inválidas"
    
    result = validator.validate_geometries(sample_gdf)
    
    assert result["invalid_geometries_found"] == 1
    assert sample_gdf.geometry.is_valid.all(), "El validador debió curar las geometrías"

def test_detect_slivers(validator):
    # Creamos un sliver (área < 5) y un polígono grande (área 100)
    sliver = Polygon([(0, 0), (0, 1), (1, 1), (1, 0), (0, 0)])
    large = Polygon([(0, 0), (0, 10), (10, 10), (10, 0), (0, 0)])
    
    gdf = gpd.GeoDataFrame({"npu": ["1", "2"], "geometry": [sliver, large]}, crs="EPSG:3116")
    
    result = validator.detect_slivers(gdf)
    assert result["slivers_count"] == 1
    assert len(result["sliver_indices"]) == 1
    assert result["sliver_indices"][0] == 0

def test_detect_overlaps(validator):
    # Dos polígonos que comparten un área sustancial (overlap)
    poly1 = Polygon([(0, 0), (0, 10), (10, 10), (10, 0), (0, 0)])
    poly2 = Polygon([(5, 5), (5, 15), (15, 15), (15, 5), (5, 5)])
    
    gdf = gpd.GeoDataFrame({"npu": ["1", "2"], "geometry": [poly1, poly2]}, crs="EPSG:3116")
    
    result = validator.detect_overlaps(gdf)
    assert result["overlaps_count"] == 1
    assert len(result["overlap_pairs"]) == 1