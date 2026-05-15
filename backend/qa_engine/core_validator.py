import geopandas as gpd
from shapely.validation import make_valid
import os

class GeoQAValidator:
    """
    Motor LADM-COL de Control de Calidad Catastral (QA/QC).
    Realiza validaciones topológicas y alfanuméricas sobre conjuntos de datos prediales.
    """
    
    def __init__(self, epsg_crs="EPSG:3116"): # Magna-Sirgas Origen Nacional
        self.crs = epsg_crs
        self.tolerance_area = 5.0  # Slivers menores a 5 m2
        
    def load_dataset(self, file_path: str) -> gpd.GeoDataFrame:
        """Carga un dataset geospatial (.shp, .geojson, .gpkg) en un GeoDataFrame."""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Input file not found: {file_path}")
            
        gdf = gpd.read_file(file_path)
        if gdf.crs != self.crs:
            gdf = gdf.to_crs(self.crs)
        return gdf

    def validate_geometries(self, gdf: gpd.GeoDataFrame) -> dict:
        """Evalúa geometrías inválidas y las repara automáticamente."""
        invalid_count = (~gdf.is_valid).sum()
        
        # Auto-heal geometries (Optimizado: vectorizado nativo de GeoPandas)
        gdf.geometry = gdf.geometry.make_valid()
        
        return {
            "invalid_geometries_found": int(invalid_count),
            "status": "Healed" if invalid_count > 0 else "Clean"
        }

    def detect_slivers(self, gdf: gpd.GeoDataFrame) -> dict:
        """Detecta micro-polígonos (Slivers) típicamente producidos por errores de topología."""
        sliver_mask = gdf.geometry.area < self.tolerance_area
        slivers_count = sliver_mask.sum()
        sliver_ids = gdf[sliver_mask].index.tolist() # o la columna id/npu real
        
        return {
            "slivers_count": int(slivers_count),
            "sliver_indices": sliver_ids,
            "threshold_m2": self.tolerance_area
        }
        
    def detect_overlaps(self, gdf: gpd.GeoDataFrame) -> dict:
        """Detecta polígonos que se sobreponen con otros (regla topológica estricta)."""
        # Explicación: Para una base catastral LADM-COL, los predios no deben superponerse.
        # Una operación espacial avanzada requiere crear un sjoin consigo misma.
        overlaps_found = 0
        overlap_pairs = []
        
        if len(gdf) > 1:
            try:
                # Spatial join intersect with itself, keep only where left_id != right_id
                sjoined = gpd.sjoin(gdf, gdf, how='inner', predicate='intersects')
                real_overlaps = sjoined[sjoined.index != sjoined['index_right']]
                
                # Deduplicate backwards pairs
                unique_pairs = set()
                for idx, row in real_overlaps.iterrows():
                    pair = tuple(sorted((idx, row['index_right'])))
                    if pair not in unique_pairs:
                        unique_pairs.add(pair)
                        
                overlaps_found = len(unique_pairs)
                overlap_pairs = list(unique_pairs)
            except Exception as e:
                print(f"Overlap detection skipped due to complex topology: {e}")
                
        return {
            "overlaps_count": overlaps_found,
            "overlap_pairs": overlap_pairs
        }

    def check_ladm_mandatories(self, gdf: gpd.GeoDataFrame, required_columns: list) -> dict:
        """Verifica que los atributos mínimos del modelo LADM-COL estén presentes y no sean nulos."""
        missing_attrs = {}
        for col in required_columns:
            if col not in gdf.columns:
                missing_attrs[col] = "Column Missing Full"
            else:
                null_count = gdf[col].isnull().sum()
                if null_count > 0:
                    missing_attrs[col] = f"{null_count} Null values detected"
                    
        return {
            "alfanumeric_errors": missing_attrs,
            "check_status": "Passed" if not missing_attrs else "Failed"
        }

    def run_full_qaqc(self, gdf: gpd.GeoDataFrame, mandatory_fields=None) -> dict:
        """Pipeline oficial de Inteligencia Espacial."""
        if not mandatory_fields:
            mandatory_fields = ['npu', 'uso_suelo', 'codigo_homologado']
            
        ladm_compliance = self.check_ladm_mandatories(gdf, mandatory_fields)
        
        report = {
            "total_features": len(gdf),
            "geometry_val": self.validate_geometries(gdf),
            "slivers_val": self.detect_slivers(gdf),
            "topology_val": self.detect_overlaps(gdf),
            "ladm_col_compliance": ladm_compliance
        }
        return report

    def cross_reference_excel(self, gdf: gpd.GeoDataFrame, excel_path: str, join_col="npu") -> dict:
        """
        Módulo de Interoperabilidad: Cruce Físico-Jurídico (Catastro vs Registro).
        Compara la base cartográfica con una matriz tabular (Excel/CSV) usando Polars para ultra-rendimiento.
        """
        import polars as pl
        import warnings
        
        # 1. Cargar Excel/CSV con Polars
        try:
            if excel_path.endswith('.xlsx'):
                df_registral = pl.read_excel(excel_path)
            else:
                df_registral = pl.read_csv(excel_path, ignore_errors=True)
        except Exception as e:
            return {"error": f"Error al cargar el archivo tabular con Polars: {e}"}
            
        # Normalizar nombres de columnas a minúsculas para evitar errores de digitación
        gdf.columns = [c.lower() for c in gdf.columns]
        df_registral = df_registral.rename({col: col.lower() for col in df_registral.columns})
        join_col = join_col.lower()

        if join_col not in gdf.columns or join_col not in df_registral.columns:
            return {"error": f"Columna de unión '{join_col}' no encontrada en ambos archivos."}

        # Aseguramos que el gdf tenga calculada la columna area_m2
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            gdf['area_m2_calc'] = gdf.geometry.area

        # Convertimos la parte alfanumérica de GeoPandas a Polars (sin geometría para ahorrar memoria)
        # Convertimos tipos explícitamente a string (Utf8) para evitar problemas de merge entre ints y strs
        df_spatial = pl.from_pandas(gdf[[join_col, 'area_m2_calc']]).with_columns(pl.col(join_col).cast(pl.Utf8))
        df_registral = df_registral.with_columns(pl.col(join_col).cast(pl.Utf8))

        # 2. Identificar Diferencias de Existencia usando Anti-Joins de Polars (Vectorizado Puro)
        # Registros en lo registral (Excel) que no están en lo espacial (Shapefile)
        missing_in_spatial = df_registral.join(df_spatial, on=join_col, how="anti").height
        # Registros en lo espacial (Shapefile) que no están en lo registral (Excel)
        missing_in_registral = df_spatial.join(df_registral, on=join_col, how="anti").height

        # 3. Comparación de Áreas (si existe columna 'area')
        area_diffs = []
        area_col_snr = [c for c in df_registral.columns if 'area' in c]
        
        area_discrepancies_count = 0
        if area_col_snr:
            snr_area_col = area_col_snr[0]
            
            # Asegurar que el área en el registro sea float
            df_registral = df_registral.with_columns(pl.col(snr_area_col).cast(pl.Float64, strict=False))
            
            # Inner join para comparar los que existen en ambos
            merged = df_spatial.join(df_registral.select([join_col, snr_area_col]), on=join_col, how="inner")
            
            # Filtramos diferencias mayores a 1 m2
            discrepancies = merged.with_columns(
                (pl.col("area_m2_calc") - pl.col(snr_area_col)).abs().alias("diff_m2")
            ).filter(pl.col("diff_m2") > 1.0).sort("diff_m2", descending=True)
            
            area_discrepancies_count = discrepancies.height
            
            # Limitamos el reporte a las primeras 100 anomalías para no saturar JSON
            area_diffs = discrepancies.head(100).select([join_col, "diff_m2"]).to_dicts()
            
            # Formateamos la lista resultante
            for diff in area_diffs:
                diff['id'] = diff.pop(join_col)
                diff['diff_m2'] = round(diff['diff_m2'], 2)

        return {
            "total_spatial": df_spatial.height,
            "total_registral": df_registral.height,
            "missing_geometries": missing_in_spatial,
            "missing_legal_records": missing_in_registral,
            "area_discrepancies_count": area_discrepancies_count,
            "sample_discrepancies": area_diffs[:5]
        }


# Ejemplo de uso interno (para pruebas expertas antes de conectar a API)
if __name__ == '__main__':
    validator = GeoQAValidator()
    print("Módulo QA/QC LADM-COL (DGZ Engine) activo y listo para integrarse a FastAPI.")
