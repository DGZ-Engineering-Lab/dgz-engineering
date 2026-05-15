import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env.local'))

DATABASE_URL = os.getenv("DATABASE_URL")

def enable_postgis():
    if not DATABASE_URL:
        print("DATABASE_URL no configurada.")
        return

    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            print("Habilitando extension PostGIS en Neon...")
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis;"))
            conn.commit()
            print("PostGIS habilitado con exito.")
    except Exception as e:
        print(f"Error habilitando PostGIS: {e}")

if __name__ == "__main__":
    enable_postgis()
