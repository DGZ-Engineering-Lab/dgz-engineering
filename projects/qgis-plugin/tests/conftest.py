import sys
from pathlib import Path

# The plugin's pure-Python core (no QGIS/PyQt imports) is tested standalone.
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
