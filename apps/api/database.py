import os
import threading
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv
from pathlib import Path
from fastapi import HTTPException

# Base project path for .env.local
BASE_DIR = Path(__file__).parent.parent.parent
load_dotenv(BASE_DIR / ".env.local")

Base = declarative_base()

# Engine perezoso: la app arranca aunque falte DATABASE_URL (los endpoints devuelven 503)
_engine = None
_SessionLocal = None
_lock = threading.Lock()


def _normalize_url(url: str) -> str:
    # SQLAlchemy 2.x ya no acepta el esquema "postgres://" (Heroku/Render/Neon lo usan)
    if url.startswith("postgres://"):
        return "postgresql://" + url[len("postgres://"):]
    return url


def get_engine():
    """Crea el engine bajo demanda. Devuelve None si DATABASE_URL no está configurada."""
    global _engine, _SessionLocal
    if _engine is not None:
        return _engine
    url = os.getenv("DATABASE_URL")
    if not url:
        return None
    with _lock:
        if _engine is None:
            # Pool pequeño para free tier (Neon/Render cierran conexiones inactivas)
            _engine = create_engine(
                _normalize_url(url),
                pool_pre_ping=True,
                pool_recycle=240,
                pool_size=3,
                max_overflow=2,
                connect_args={"connect_timeout": 10},
            )
            _SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=_engine)
    return _engine


def get_db():
    if get_engine() is None:
        raise HTTPException(status_code=503, detail="Base de datos no configurada.")
    db = _SessionLocal()
    try:
        yield db
    finally:
        db.close()
