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

        # Agregar columna departamento (procedural con fallback aleatorio)
        import random
        departamentos = ['Antioquia', 'Cundinamarca', 'Valle del Cauca']
        dept_list = []
        for cod in enriched_data["codigo"]:
            if cod:
                cod_str = str(cod)
                if cod_str.startswith("11"):
                    dept_list.append("Cundinamarca")
                elif cod_str.startswith("05"):
                    dept_list.append("Antioquia")
                elif cod_str.startswith("76"):
                    dept_list.append("Valle del Cauca")
                else:
                    dept_list.append(random.choice(departamentos))
            else:
                dept_list.append(random.choice(departamentos))
        
        enriched_data = enriched_data.with_columns(pl.Series("departamento", dept_list))

        premium_parcels = enriched_data.filter(pl.col("indice_comercial") > 0)

        print("--- ANALYTICS SUMMARY ---")
        print(f"Total Parcels: {len(enriched_data)}")
        print(f"Premium Match: {len(premium_parcels)}")
        
        # Guardar resultado final usando Hive Partitioning
        output_path = "enriched_parcels_analytics"
        import shutil
        if os.path.exists(output_path):
            if os.path.isdir(output_path):
                shutil.rmtree(output_path)
            else:
                os.remove(output_path)
                
        try:
            print("Intentando guardar con Hive Partitioning usando PyArrow...")
            enriched_data.write_parquet(
                output_path,
                use_pyarrow=True,
                pyarrow_options={"partition_cols": ["departamento"]}
            )
            print(f"Resultado guardado en '{output_path}'")
        except Exception as pyarrow_err:
            print(f"PyArrow falló o no está instalado ({pyarrow_err}). Usando fallback nativo de Polars...")
            os.makedirs(output_path, exist_ok=True)
            for (dept,), group in enriched_data.group_by(["departamento"]):
                dept_dir = os.path.join(output_path, f"departamento={dept}")
                os.makedirs(dept_dir, exist_ok=True)
                group.write_parquet(os.path.join(dept_dir, "data.parquet"))
            print(f"Resultado guardado con fallback nativo en '{output_path}'")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if os.path.exists(parquet_path):
            os.remove(parquet_path)

if __name__ == "__main__":
    run_elite_analytics()
