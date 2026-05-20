import os
import logging
from PyQt5.QtCore import QObject, Qt
from PyQt5.QtWidgets import QAction, QMessageBox, QFileDialog, QDockWidget
from PyQt5.QtGui import QIcon

# Graceful QGIS Imports to allow headless/standalone testing
QGIS_AVAILABLE = False
try:
    from qgis.core import QgsProject, QgsVectorLayer, QgsGeometry
    from qgis.gui import QgisInterface
    QGIS_AVAILABLE = True
except ImportError:
    logging.warn("QGIS Gui core not detected. Standing by in Headless Simulation Mode.")

# Import core logics
from .core.db_connector import DevGizDBConnector
from .core.vur_depurator import DgzVurDepurator
from .core.partitioning_engine import MunicipalSpatialPartitioner
from .core.task_assigner import DgzTaskAssigner
from .core.ladm_engine import DgzLadmColEngine

class DgzDepuratorPlugin(QObject):
    """
    Main controller for the DGZ LADM-COL QGIS Plugin.
    Coordinates menus, toolbar actions, Dock Widgets, and business events.
    """
    def __init__(self, iface=None):
        super().__init__()
        self.iface = iface
        self.plugin_dir = os.path.dirname(__file__)
        self.actions = []
        self.menu_name = "&DGZ LADM-COL Depurador"
        self.dock_widget = None
        
        # Initialize Core Engines
        self.db = DevGizDBConnector()
        self.vur = DgzVurDepurator()
        self.partitioner = MunicipalSpatialPartitioner()
        self.assigner = DgzTaskAssigner()
        self.ladm = DgzLadmColEngine()

    def initGui(self):
        """
        QGIS callback. Sets up menus, toolbars, and dock widgets.
        """
        if not QGIS_AVAILABLE or not self.iface:
            logging.info("Skipping QGIS Gui setup in Headless Mode.")
            return

        icon_path = os.path.join(self.plugin_dir, "icon.png")
        if not os.path.exists(icon_path):
            # Create a mock placeholder icon if it doesn't exist
            icon_path = ""

        # Create Action 1: Depuración Físico-Jurídica
        self.action_depurate = QAction(
            QIcon(icon_path),
            "Ejecutar Depuración VUR/SNR",
            self.iface.mainWindow()
        )
        self.action_depurate.triggered.connect(self.run_cruce_vur)
        self.iface.addPluginToVectorMenu(self.menu_name, self.action_depurate)
        self.actions.append(self.action_depurate)

        # Create Action 2: Subdivisión Municipal
        self.action_split = QAction(
            QIcon(icon_path),
            "Subdividir Municipio por Sectores/Manzanas",
            self.iface.mainWindow()
        )
        self.action_split.triggered.connect(self.run_subdivision)
        self.iface.addPluginToVectorMenu(self.menu_name, self.action_split)
        self.actions.append(self.action_split)

        # Create Action 3: Exportar INTERLIS XTF
        self.action_export = QAction(
            QIcon(icon_path),
            "Exportar LADM-COL INTERLIS (.xtf)",
            self.iface.mainWindow()
        )
        self.action_export.triggered.connect(self.run_export_xtf)
        self.iface.addPluginToVectorMenu(self.menu_name, self.action_export)
        self.actions.append(self.action_export)

        logging.info("DGZ QGIS Plugin toolbar and menu loaded successfully.")

    def unload(self):
        """
        QGIS callback. Clears toolbar and menu items on plugin disable.
        """
        if not QGIS_AVAILABLE or not self.iface:
            return

        for action in self.actions:
            self.iface.removePluginVectorMenu(self.menu_name, action)
        self.actions.clear()
        
        if self.dock_widget:
            self.iface.mainWindow().removeDockWidget(self.dock_widget)
        logging.info("DGZ QGIS Plugin unloaded cleanly.")

    def run_cruce_vur(self):
        """
        Action triggered to run real-time VUR/SNR audit on selected layer.
        """
        if not QGIS_AVAILABLE or not self.iface:
            QMessageBox.information(None, "Headless DGZ", "Cruce SNR/VUR simulado con éxito.")
            return

        active_layer = self.iface.activeLayer()
        if not active_layer or active_layer.type() != QgsVectorLayer.VectorLayer:
            QMessageBox.warning(self.iface.mainWindow(), "DGZ Error", "Por favor selecciona una capa vectorial válida de predios.")
            return

        # Ensure required LADM/SNR columns exist in QGIS layer
        provider = active_layer.dataProvider()
        fields = active_layer.fields()
        
        # Check columns or create them dynamically
        missing_fields = []
        if fields.indexFromName("dgz_cruce") == -1:
            from PyQt5.QtCore import QVariant
            from qgis.core import QgsField
            provider.addAttributes([
                QgsField("dgz_cruce", QVariant.String, len=100),
                QgsField("dgz_propietario", QVariant.String, len=150),
                QgsField("dgz_area_snr", QVariant.Double)
            ])
            active_layer.updateFields()
            active_layer.commitChanges()
            QMessageBox.information(
                self.iface.mainWindow(), 
                "Estructuración DGZ", 
                "Se han inyectado las columnas 'dgz_cruce', 'dgz_propietario' y 'dgz_area_snr' en la tabla de atributos."
            )

        # Iterate through features and process physical-legal discrepancies
        active_layer.startEditing()
        processed = 0
        
        for feat in active_layer.getFeatures():
            # Get geometry area (in project units - EPSG:9377 meters)
            geom_area = feat.geometry().area()
            # Read matrícula FMI
            matricula = feat.attribute("matricula") or feat.attribute("fmi") or ""
            
            # Run the audit engine
            depurated = self.vur.depurate_qgis_feature(geom_area, str(matricula))
            
            # Update attributes
            active_layer.changeAttributeValue(feat.id(), active_layer.fields().indexFromName("dgz_cruce"), depurated["status_code"])
            active_layer.changeAttributeValue(feat.id(), active_layer.fields().indexFromName("dgz_propietario"), depurated["owner"])
            active_layer.changeAttributeValue(feat.id(), active_layer.fields().indexFromName("dgz_area_snr"), depurated["registered_area"])
            processed += 1
            
        active_layer.commitChanges()
        QMessageBox.information(
            self.iface.mainWindow(), 
            "Depuración Finalizada", 
            f"Se depuraron {processed} predios. Banderas LADM-COL actualizadas en la tabla de atributos."
        )

    def run_subdivision(self):
        """
        Action triggered to split municipality into Veredas/Manzanas.
        """
        if not QGIS_AVAILABLE or not self.iface:
            return

        QMessageBox.information(
            self.iface.mainWindow(),
            "Subdivisión Territorial",
            "Módulo de Segmentación Espacial: Por favor seleccione la capa de manzanas/sectores destino para asociar predios."
        )

    def run_export_xtf(self):
        """
        Action triggered to export clean vector layer to INTERLIS .xtf format.
        """
        if not QGIS_AVAILABLE or not self.iface:
            return

        active_layer = self.iface.activeLayer()
        if not active_layer or active_layer.type() != QgsVectorLayer.VectorLayer:
            QMessageBox.warning(self.iface.mainWindow(), "DGZ Error", "Por favor selecciona una capa catastral activa.")
            return

        file_path, _ = QFileDialog.getSaveFileName(
            self.iface.mainWindow(),
            "Guardar Lote de Transferencia LADM-COL INTERLIS",
            "",
            "INTERLIS XTF (*.xtf)"
        )
        
        if not file_path:
            return

        mapped_data = []
        for feat in active_layer.getFeatures():
            # Get geometric WKT
            wkt = feat.geometry().asWkt()
            
            # Map attributes
            attrs = {field.name(): feat.attribute(field.name()) for field in active_layer.fields()}
            mapped = self.ladm.map_feature_to_ladm(attrs, wkt)
            mapped_data.append(mapped)
            
        success = self.ladm.generate_xtf_xml(mapped_data, file_path)
        if success:
            QMessageBox.information(
                self.iface.mainWindow(),
                "Exportación Exitosa",
                f"Archivo INTERLIS generado de forma impecable en:\n{file_path}"
            )
        else:
            QMessageBox.critical(
                self.iface.mainWindow(),
                "Fallo de Exportación",
                "Hubo un error de sintaxis al empaquetar el XML catastral."
            )
