import os
import sys
import logging

# Set up logging to stdout
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Ensure the parent directory is in sys.path to resolve relative imports
plugin_dir = os.path.dirname(os.path.abspath(__file__))
if plugin_dir not in sys.path:
    sys.path.insert(0, plugin_dir)

try:
    from core.db_connector import DevGizDBConnector
    from core.vur_depurator import DgzVurDepurator
    from core.partitioning_engine import MunicipalSpatialPartitioner
    from core.ladm_engine import DgzLadmColEngine
    logging.info("🟢 SUCCESS: All DGZ-LADM-COL core plugin modules imported flawlessly!")
except Exception as e:
    logging.error(f"🔴 IMPORT FAILURE: {str(e)}")
    sys.exit(1)

def run_simulation():
    logging.info("🚀 Starting DGZ LADM-COL QGIS Plugin Simulation QA Test...")
    
    # 1. Test Authentication & Cloud Rules
    logging.info("--- Step 1: Testing Cloud Auth & Project Context ---")
    db = DevGizDBConnector()
    # Attempt local offline authentication
    auth_success = db.authenticate("operador_medellin_01", "dgz_hashed_pass_2026")
    logging.info(f"Auth Success: {auth_success}")
    logging.info(f"Operator Role loaded: {db.get_role()}")
    logging.info(f"Permissions for 'edit_geometry': {db.has_permission('edit_geometry')}")
    
    # 2. Test VUR Real-time Query & Discrepancy Evaluation
    logging.info("--- Step 2: Testing VUR Query & Cadastral Depuration ---")
    depurator = DgzVurDepurator()
    
    # Scenario A: Perfect match (Area consistent)
    res_a = depurator.depurate_qgis_feature(calculated_area=120.0, matricula="050N-123456", tolerance=10.0)
    logging.info(f"Scenario A (Clean Match) -> Code: {res_a['status_code']}, Owner: {res_a['owner']}, Diagnosis: {res_a['description']}")
    
    # Scenario B: Discrepancy (Significant area mismatch)
    res_b = depurator.depurate_qgis_feature(calculated_area=350.0, matricula="050N-654321", tolerance=10.0)
    logging.info(f"Scenario B (Area Mismatch) -> Code: {res_b['status_code']}, Owner: {res_b['owner']}, Diagnosis: {res_b['description']}")
    
    # Scenario C: Omission (Missing registration number)
    res_c = depurator.depurate_qgis_feature(calculated_area=80.0, matricula="", tolerance=10.0)
    logging.info(f"Scenario C (Missing SNR Registration) -> Code: {res_c['status_code']}, Diagnosis: {res_c['description']}")

    # 3. Test Partitioning Engine Bounds Fallback
    logging.info("--- Step 3: Testing Municipal Spatial Partitioning ---")
    partitioner = MunicipalSpatialPartitioner()
    
    # Create fake municipal parcel geometries
    synthetic_parcels = [
        {"id": 1, "codigo": "0101001", "geometry": {"bbox": [10.0, 10.0, 12.0, 12.0]}},
        {"id": 2, "codigo": "0101002", "geometry": {"bbox": [12.1, 10.0, 14.0, 12.0]}},
        {"id": 3, "codigo": "0101003", "geometry": {"bbox": [10.0, 12.1, 12.0, 14.0]}},
        {"id": 4, "codigo": "0101004", "geometry": {"bbox": [12.1, 12.1, 14.0, 14.0]}},
    ]
    
    sectors = partitioner.partition_municipality_by_bounds(synthetic_parcels, x_splits=2, y_splits=2)
    for sector_id, parcels in sectors.items():
        logging.info(f"Partition [{sector_id}] assigned with {len(parcels)} parcels.")

    # 4. Test LADM-COL INTERLIS XML/XTF Writer
    logging.info("--- Step 4: Testing LADM-COL INTERLIS XTF Serialization ---")
    ladm_engine = DgzLadmColEngine()
    
    # Map a mock feature with official MAGNA-SIRGAS National Origin coordinates (EPSG:9377)
    mock_attrs = {
        "npn": "050010100000000010002000000000",
        "matricula": "050N-987654",
        "area_m2": 154.20,
        "propietario": "MARIA CONSUELO RESTREPO",
        "documento": "43000555",
        "tipo": "PRIVADO",
        "falsa_tradicion": "NO"
    }
    # Polygon boundary in EPSG:9377
    wkt_geom = "POLYGON ((4800000.0 2000000.0, 4800020.0 2000000.0, 4800020.0 2000015.0, 4800000.0 2000015.0, 4800000.0 2000000.0))"
    
    mapped_feat = ladm_engine.map_feature_to_ladm(mock_attrs, wkt_geom)
    
    output_xtf = os.path.join(plugin_dir, "test_ladm_output.xtf")
    success = ladm_engine.generate_xtf_xml([mapped_feat], output_xtf)
    
    if success and os.path.exists(output_xtf):
        logging.info(f"🟢 SUCCESS: INTERLIS XTF XML generated successfully at: {output_xtf}")
        # Clean up temporary test file
        try:
            os.remove(output_xtf)
            logging.info("Temporary test XTF file cleaned up.")
        except OSError:
            pass
    else:
        logging.error("🔴 FAILURE: INTERLIS XTF XML generation failed.")
        sys.exit(1)
        
    logging.info("🟢 ALL SIMULATION QA TESTS COMPLETED SUCCESSFULLY!")

if __name__ == "__main__":
    run_simulation()
