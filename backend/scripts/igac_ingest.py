import os
import geopandas as gpd
from sqlalchemy import create_engine
from geoalchemy2 import Geometry, WKTElement
import pandas as pd
from dotenv import load_dotenv
import sys

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env.local'))

DATABASE_URL = os.getenv("DATABASE_URL")

# IGAC FeatureServer Layer 7 (U_TERRENO - Urban Terrain)
# Target: A small sector of Bogota (Suba area approx)
IGAC_URL = (
    "https://services2.arcgis.com/RVvWzU3lgJISqdke/arcgis/rest/services/CATASTRO_PUBLICO_31032026/FeatureServer/7/query"
    "?where=1=1"
    "&outFields=*"
    "&resultRecordCount=500"
    "&f=geojson"
)

def run_ingest():
    print("Inciando proceso de ingesta DevGiz Pipeline...")
    
    try:
        # 1. Extraction using GeoPandas + PyOgrio (Fast engine)
        print("Descargando datos desde IGAC FeatureServer...")
        gdf = gpd.read_file(IGAC_URL, engine="pyogrio")
        
        if gdf.empty:
            print("No se encontraron datos.")
            return

        print(f"Se descargaron {len(gdf)} registros.")

        # 2. Transformation (Expert Stack - Cleanup & Spatial Ops)
        print("Procesando geometrias y atributos...")
        
        # Ensure CRS is WGS84 for Web Visualization (4326)
        if gdf.crs is None:
            gdf.set_crs(epsg=4326, inplace=True)
        else:
            gdf = gdf.to_crs(epsg=4326)

        # Basic cleanup: remove empty columns and normalize names
        gdf.columns = [c.lower() for c in gdf.columns]
        
        # Calculate area (using a metric CRS temporarily for accurate area calculation)
        gdf_metric = gdf.to_crs(epsg=3857)
        gdf['area_m2'] = gdf_metric.geometry.area
        
        # 3. Persistence (PostGIS in Neon)
        if not DATABASE_URL:
            print("DATABASE_URL no configurada en .env.local")
            return

        engine = create_engine(DATABASE_URL)
        
        print("Guardando en PostGIS (Neon Database)...")
        # We use 'replace' for the demo, but in production we'd use 'append' or UPSERT
        gdf.to_postgis("cadastral_parcels", engine, if_exists='replace', index=True, 
                       dtype={'geometry': Geometry('POLYGON', srid=4326)})

        
        print("Ingesta completada con exito. Tabla 'cadastral_parcels' lista para el Digital Twin.")

    except Exception as e:
        print(f"Error durante la ingesta: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    run_ingest()
