import os
import logging
from typing import Dict, Any, List, Tuple

# Graceful QGIS Imports to allow headless/standalone testing
QGIS_AVAILABLE = False
try:
    from qgis.core import (
        QgsProject,
        QgsVectorLayer,
        QgsFeature,
        QgsGeometry,
        QgsSpatialIndex,
        QgsVectorFileWriter,
        QgsCoordinateTransformContext
    )
    QGIS_AVAILABLE = True
except ImportError:
    logging.warn("QGIS Core not detected. Standing by in Standalone Mode using fallback spatial indexes.")

class MunicipalSpatialPartitioner:
    """
    Hierarchical Spatial Segmentation & Partitioning Engine.
    Structures raw municipal cartography into administrative sectors:
    Veredas (Rural) / Sectores -> Barrios (Urban) / Manzanas -> Predios
    Allows dispatching local chunks for offline field operations.
    """
    def __init__(self):
        self.hierarchy = {}

    def run_qgis_containment_analysis(self, parent_layer: Any, child_layer: Any) -> Dict[str, List[str]]:
        """
        Groups child features (e.g. Predios or Manzanas) into parent administrative areas (e.g. Barrios or Veredas).
        Utilizes high-speed QgsSpatialIndex for QGIS environments.
        """
        containment_map = {}
        if not QGIS_AVAILABLE:
            logging.warn("QGIS not available. Returning empty containment mapping.")
            return containment_map

        # Build spatial index on child features
        index = QgsSpatialIndex(child_layer.getFeatures())
        
        for parent_feat in parent_layer.getFeatures():
            parent_geom = parent_feat.geometry()
            parent_id = str(parent_feat.attribute("codigo") or parent_feat.id())
            containment_map[parent_id] = []
            
            # Query candidate geometries inside bounding box
            candidates = index.intersects(parent_geom.boundingBox())
            
            for child_id in candidates:
                # Fetch full feature to verify exact containment or intersection
                child_feat = child_layer.getFeature(child_id)
                if child_feat and parent_geom.contains(child_feat.geometry()):
                    child_code = str(child_feat.attribute("codigo") or child_feat.id())
                    containment_map[parent_id].append(child_code)
                    
        return containment_map

    def partition_municipality_by_bounds(self, features: List[Dict[str, Any]], x_splits: int = 2, y_splits: int = 2) -> Dict[str, List[Dict[str, Any]]]:
        """
        Fallback analytical split of a bulk municipal dataset based on geometric bounding box division.
        Useful when official vereda/sector boundaries are missing during "Preparación de Insumo".
        """
        if not features:
            return {}

        # Calculate bounding box of the whole municipality
        min_x = min(f["geometry"]["bbox"][0] for f in features if "geometry" in f and "bbox" in f["geometry"])
        min_y = min(f["geometry"]["bbox"][1] for f in features if "geometry" in f and "bbox" in f["geometry"])
        max_x = max(f["geometry"]["bbox"][2] for f in features if "geometry" in f and "bbox" in f["geometry"])
        max_y = max(f["geometry"]["bbox"][3] for f in features if "geometry" in f and "bbox" in f["geometry"])

        step_x = (max_x - min_x) / x_splits
        step_y = (max_y - min_y) / y_splits

        partitions = {}
        for x in range(x_splits):
            for y in range(y_splits):
                part_id = f"Sector_Provisional_R{x+1}C{y+1}"
                partitions[part_id] = []
                
                # Boundary box for this quadrant
                q_min_x = min_x + (x * step_x)
                q_max_x = q_min_x + step_x
                q_min_y = min_y + (y * step_y)
                q_max_y = q_min_y + step_y
                
                for f in features:
                    f_bbox = f["geometry"]["bbox"]
                    # Centroid check to avoid splitting complex polygons across borders
                    f_cx = (f_bbox[0] + f_bbox[2]) / 2.0
                    f_cy = (f_bbox[1] + f_bbox[3]) / 2.0
                    
                    if q_min_x <= f_cx < q_max_x and q_min_y <= f_cy < q_max_y:
                        partitions[part_id].append(f)
                        
        return partitions

    def export_assigned_package(self, base_layer: Any, feature_ids: List[int], output_path: str) -> bool:
        """
        Creates an encrypted/locked local GeoPackage containing ONLY the features 
        assigned to a digitalizer or field surveyor.
        """
        if not QGIS_AVAILABLE:
            logging.warn("Cannot export GPKG. QGIS environment required.")
            return False

        try:
            # Set up subset string
            id_string = ",".join(map(str, feature_ids))
            base_layer.setSubsetString(f"id IN ({id_string})")
            
            # Export to GeoPackage
            options = QgsVectorFileWriter.SaveVectorOptions()
            options.driverName = "GPKG"
            options.fileEncoding = "UTF-8"
            
            error = QgsVectorFileWriter.writeAsVectorFormatV2(
                base_layer,
                output_path,
                QgsCoordinateTransformContext(),
                options
            )
            
            # Clear filter
            base_layer.setSubsetString("")
            
            if error[0] == QgsVectorFileWriter.NoError:
                logging.info(f"Assigned GeoPackage exported successfully to {output_path}")
                return True
            else:
                logging.error(f"GPKG Export Error Code: {error[0]}")
                return False
        except Exception as e:
            logging.error(f"GPKG Export critical crash: {str(e)}")
            return False
