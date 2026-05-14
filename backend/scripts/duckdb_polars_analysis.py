import os
import polars as pl
from sqlalchemy import create_engine
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env.local'))
DATABASE_URL = os.getenv("DATABASE_URL")

def run_elite_analytics():
    print("Iniciando Analytics de Nivel 5 (Polars Native + PostGIS)...")
    
    parquet_path = "commerical_density.parquet"
    
    # Simulating external commercial data
    external_data = pl.DataFrame({
        "codigo_manzana": ["110011100000000030004", "110011100000000030005", "110011100000000030006"],
        "indice_comercial": [0.85, 0.45, 0.92],
        "flujo_peatonal": [1200, 450, 2100],
        "category": ["PREMIUM", "STANDARD", "PREMIUM"]
    })
    external_data.write_parquet(parquet_path)
    print("Dataset externo generado.")

    try:
        print("Conectando a base de datos...")
        engine = create_engine(DATABASE_URL)
        query = "SELECT objectid, codigo, area_m2 FROM public.cadastral_parcels LIMIT 500"
        
        db_parcels = pl.read_database(query, connection=engine)
        
        print(f"Registros base: {len(db_parcels)}")
        
        # High-performance Join
        enriched_data = db_parcels.join(
            external_data, 
            left_on="codigo", 
            right_on="codigo_manzana", 
            how="left"
        ).fill_null(0)

        # Intelligence Logic
        enriched_data = enriched_data.with_columns([
            ((pl.col("area_m2") * pl.col("indice_comercial")) / 10).alias("profitability_index")
        ])

        premium_parcels = enriched_data.filter(pl.col("indice_comercial") > 0)

        print("--- ANALYTICS SUMMARY ---")
        print(f"Total Parcels: {len(enriched_data)}")
        print(f"Premium Match: {len(premium_parcels)}")
        
        # Guardar resultado final
        enriched_data.write_parquet("enriched_parcels_analytics.parquet")
        print("Resultado guardado en 'enriched_parcels_analytics.parquet'")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if os.path.exists(parquet_path):
            os.remove(parquet_path)

if __name__ == "__main__":
    run_elite_analytics()
