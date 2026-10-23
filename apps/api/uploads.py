"""
Utilidades de subida segura de archivos (path traversal, DoS y zip bombs).
Replica el enfoque de backend/qa_engine/main.py.
"""
import os
import zipfile
from typing import Iterable

from fastapi import HTTPException, UploadFile

# ─── Límites de subida (configurables por entorno) ───
MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_BYTES", 25 * 1024 * 1024))  # 25 MB por archivo
MAX_ZIP_UNCOMPRESSED_BYTES = int(os.getenv("MAX_ZIP_UNCOMPRESSED_BYTES", 200 * 1024 * 1024))  # 200 MB
MAX_ZIP_MEMBERS = 500

SPATIAL_EXTENSIONS = (".zip", ".geojson", ".json", ".gpkg", ".kml")
TABULAR_EXTENSIONS = (".xlsx", ".csv")
# Formatos que se buscan dentro de un zip extraído (en orden de preferencia)
ZIP_SPATIAL_EXTENSIONS = (".shp", ".gpkg", ".geojson", ".json", ".kml")


def safe_filename(filename: str, allowed_extensions: Iterable[str]) -> str:
    """Devuelve solo el nombre base validando la extensión contra una whitelist."""
    name = os.path.basename((filename or "").replace("\\", "/")).strip()
    if not name or name in (".", "..") or name.startswith("."):
        raise HTTPException(status_code=400, detail="Nombre de archivo inválido.")
    allowed = tuple(allowed_extensions)
    if not name.lower().endswith(allowed):
        raise HTTPException(status_code=400, detail=f"Extensión no soportada. Use {', '.join(allowed)}")
    return name


async def save_upload(upload: UploadFile, temp_dir: str, allowed_extensions: Iterable[str]) -> str:
    """Guarda el archivo en temp_dir respetando MAX_UPLOAD_BYTES. Devuelve la ruta."""
    path = os.path.join(temp_dir, safe_filename(upload.filename, allowed_extensions))
    written = 0
    with open(path, "wb") as f:
        while chunk := await upload.read(1024 * 1024):
            written += len(chunk)
            if written > MAX_UPLOAD_BYTES:
                raise HTTPException(status_code=413, detail="Archivo demasiado grande.")
            f.write(chunk)
    return path


def safe_extract_zip(zip_path: str, extract_dir: str) -> None:
    """Extrae un zip validando número de miembros, tamaño total y rutas."""
    base = os.path.realpath(extract_dir)
    try:
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            members = zip_ref.infolist()
            if len(members) > MAX_ZIP_MEMBERS:
                raise HTTPException(status_code=400, detail="El zip contiene demasiados archivos.")
            if sum(m.file_size for m in members) > MAX_ZIP_UNCOMPRESSED_BYTES:
                raise HTTPException(status_code=413, detail="El zip descomprimido excede el tamaño permitido.")
            for m in members:
                name = m.filename.replace("\\", "/")
                if name.startswith("/") or os.path.isabs(name) or ".." in name.split("/"):
                    raise HTTPException(status_code=400, detail="Ruta no permitida dentro del zip.")
                target = os.path.realpath(os.path.join(extract_dir, name))
                if not target.startswith(base + os.sep) and target != base:
                    raise HTTPException(status_code=400, detail="Ruta no permitida dentro del zip.")
            zip_ref.extractall(extract_dir)
    except zipfile.BadZipFile:
        raise HTTPException(status_code=400, detail="Archivo zip inválido.")


def find_spatial_file(directory: str) -> str:
    """Localiza la primera capa espacial dentro de un directorio extraído."""
    found = {}
    for root, _dirs, files in os.walk(directory):
        for fname in sorted(files):
            if fname.startswith(".") or "__MACOSX" in root:
                continue
            ext = os.path.splitext(fname)[1].lower()
            if ext in ZIP_SPATIAL_EXTENSIONS and ext not in found:
                found[ext] = os.path.join(root, fname)
    for ext in ZIP_SPATIAL_EXTENSIONS:
        if ext in found:
            return found[ext]
    raise HTTPException(status_code=400, detail="El zip no contiene una capa espacial soportada (.shp, .gpkg, .geojson, .kml).")
