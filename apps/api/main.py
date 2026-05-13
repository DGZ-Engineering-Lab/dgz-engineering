import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Cargar variables de entorno (útil para pruebas locales)
load_dotenv()

app = FastAPI(
    title="DevGiz API Engine",
    description="Backend services for Smart Geospatial DevOps Systems",
    version="1.0.0"
)

# Configurar CORS para permitir que el frontend en Vercel se comunique
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción se debería cambiar por "https://devgiz.vercel.app"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexión a Neon PostgreSQL
def get_db_connection():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        raise ValueError("No DATABASE_URL found in environment variables")
    
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "DevGiz Spatial Backend",
        "message": "API Engine is running correctly."
    }

@app.get("/health/db")
def check_db():
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT version();")
            db_version = cursor.fetchone()
            cursor.close()
            conn.close()
            return {"status": "success", "database_version": db_version['version']}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    else:
        raise HTTPException(status_code=500, detail="Could not connect to Neon database")

# Ejemplo de estructura que podrías recibir del frontend
class SpatialQuery(BaseModel):
    coordinates: list[float]
    radius: int

@app.post("/analyze-territory")
def analyze_territory(query: SpatialQuery):
    # Aquí irá la lógica Geoespacial/GeoPandas en el futuro
    return {
        "status": "processed",
        "received_coordinates": query.coordinates,
        "action": "Simulated spatial analysis complete"
    }
