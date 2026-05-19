import sys
import os
import importlib.util

# Resolutor dinámico basado en importlib.util para evitar colisiones de nombres (circular imports)
# Carga apps/api/core_validator.py de forma totalmente aislada para mantener el código 100% DRY
api_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "apps", "api"))
file_path = os.path.join(api_dir, "core_validator.py")

if not os.path.exists(file_path):
    raise FileNotFoundError(f"Source core_validator.py not found at: {file_path}")

spec = importlib.util.spec_from_file_location("apps_api_core_validator", file_path)
module = importlib.util.module_from_spec(spec)
sys.modules["apps_api_core_validator"] = module
spec.loader.exec_module(module)

# Exponer la clase
GeoQAValidator = module.GeoQAValidator

if __name__ == '__main__':
    validator = GeoQAValidator()
    print("Módulo QA/QC LADM-COL (DGZ Engine dynamic wrapper) cargado exitosamente.")
