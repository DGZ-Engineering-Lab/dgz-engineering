from PyQt5.QtCore import Qt, QVariantAnimation, QEasingCurve
from PyQt5.QtWidgets import (
    QDockWidget, QWidget, QVBoxLayout, QLabel, 
    QLineEdit, QPushButton, QComboBox, QTextEdit, QFrame, 
    QScrollArea, QMessageBox, QGraphicsDropShadowEffect, QProgressBar
)
from PyQt5.QtGui import QColor

# Graceful QGIS Imports to support testing
QGIS_AVAILABLE = False
try:
    from qgis.core import QgsProject, QgsVectorLayer, QgsGeometry
    QGIS_AVAILABLE = True
except ImportError:
    pass

class DgzMainDockWidget(QDockWidget):
    """
    Lateral HUD panel (QDockWidget) for the DGZ LADM-COL Depurator Plugin.
    Enables operators to query the VUR/SNR in real time, view ownership files,
    conduct physical-legal area cross-referencing, and inject compliance flags directly.
    Featuring a high-fidelity Cyberpunk theme with hardware-accelerated glows and pulse animations.
    """
    def __init__(self, parent=None, plugin=None):
        super().__init__("DEVRGIZ SPATIAL // CONTROL PANEL", parent)
        self.plugin = plugin
        self.setAllowedAreas(Qt.LeftDockWidgetArea | Qt.RightDockWidgetArea)
        
        # Primary container
        self.main_widget = QWidget()
        self.setWidget(self.main_widget)
        
        # Main Layout with a Scroll Area for narrow screen adaptability
        self.main_layout = QVBoxLayout(self.main_widget)
        self.main_layout.setContentsMargins(8, 8, 8, 8)
        self.main_layout.setSpacing(10)
        
        self.scroll = QScrollArea()
        self.scroll.setWidgetResizable(True)
        self.scroll.setFrameShape(QFrame.NoFrame)
        self.scroll_widget = QWidget()
        self.scroll_layout = QVBoxLayout(self.scroll_widget)
        self.scroll_layout.setContentsMargins(4, 4, 4, 4)
        self.scroll_layout.setSpacing(12)
        
        # Premium CSS Cyberpunk QSS Style Sheets
        self.setStyleSheet("""
            QWidget {
                background-color: #070a13;
                color: #e2e8f0;
                font-family: 'Consolas', 'Segoe UI', Arial, sans-serif;
            }
            QScrollArea {
                background-color: #070a13;
                border: none;
            }
            QLabel {
                color: #94a3b8;
                font-size: 11px;
            }
            QLabel#TitleLabel {
                color: #00f3ff;
                font-size: 18px;
                font-weight: bold;
                border-bottom: 2px solid #ff007f;
                padding-bottom: 6px;
                margin-top: 5px;
                margin-bottom: 2px;
                letter-spacing: 2px;
            }
            QLabel#SubTitle {
                color: #ff007f;
                font-size: 9px;
                font-weight: bold;
                font-style: normal;
                margin-top: -6px;
                margin-bottom: 10px;
                letter-spacing: 1px;
            }
            QLabel#HeaderLabel {
                color: #00f3ff;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 1px;
                border-left: 3px solid #ff007f;
                padding-left: 6px;
            }
            QLineEdit, QComboBox {
                background-color: #101524;
                border: 1px solid #1f293d;
                border-radius: 3px;
                padding: 6px;
                color: #f8fafc;
                font-size: 11px;
            }
            QLineEdit:focus, QComboBox:focus {
                border: 1px solid #00f3ff;
                background-color: #141b2f;
            }
            QPushButton {
                background-color: #1e293b;
                color: #ffffff;
                border: 1px solid #ff007f;
                border-radius: 3px;
                padding: 8px 12px;
                font-weight: bold;
                font-size: 11px;
                letter-spacing: 1px;
            }
            QPushButton:hover {
                background-color: #ff007f;
                color: #070a13;
                border: 1px solid #00f3ff;
            }
            QPushButton#QueryBtn {
                background-color: #00f3ff;
                color: #070a13;
                border: 1px solid #00f3ff;
            }
            QPushButton#QueryBtn:hover {
                background-color: #070a13;
                color: #00f3ff;
                border: 1px solid #00f3ff;
            }
            QPushButton#InjectBtn {
                background-color: #f59e0b;
                color: #070a13;
                border: 1px solid #f59e0b;
            }
            QPushButton#InjectBtn:hover {
                background-color: #070a13;
                color: #f59e0b;
                border: 1px solid #f59e0b;
            }
            QFrame#CardFrame {
                background-color: #0d1222;
                border: 1px solid #1a2238;
                border-radius: 6px;
                padding: 10px;
            }
            QTextEdit {
                background-color: #090d16;
                border: 1px solid #1a2238;
                border-radius: 3px;
                color: #f1f5f9;
                font-size: 10px;
            }
            QScrollBar:vertical {
                border: none;
                background: #070a13;
                width: 6px;
                margin: 0px 0px 0px 0px;
            }
            QScrollBar::handle:vertical {
                background: #1f293d;
                min-height: 20px;
                border-radius: 3px;
            }
            QScrollBar::handle:vertical:hover {
                background: #00f3ff;
            }
            QScrollBar::add-line:vertical, QScrollBar::sub-line:vertical {
                height: 0px;
            }
        """)
        
        # Build UI Elements
        self.build_header()
        self.build_auth_hud()
        self.build_vur_query_hud()
        self.build_snr_data_card()
        self.build_cruce_catastral_hud()
        
        # Assemble scroll widget
        self.scroll.setWidget(self.scroll_widget)
        self.main_layout.addWidget(self.scroll)
        
        # Current active data state variables
        self.last_query_result = None
        self.current_qgis_feature = None
        self.current_calculated_area = 0.0

        # Initialize glowing and pulsing heartbeat effects
        self.setup_heartbeat_animation()

    def add_glow_effect(self, widget, color, radius=12):
        """Adds a hardware-accelerated glowing drop shadow to make modules float."""
        shadow = QGraphicsDropShadowEffect(widget)
        shadow.setBlurRadius(radius)
        shadow.setColor(color)
        shadow.setOffset(0, 0)
        widget.setGraphicsEffect(shadow)

    def build_header(self):
        """Header and brand label initialization."""
        title = QLabel("DEVGIZ SPATIAL OS")
        title.setObjectName("TitleLabel")
        title.setAlignment(Qt.AlignCenter)
        self.scroll_layout.addWidget(title)
        
        subtitle = QLabel("SYSTEM // LADM-COL DEPURATOR")
        subtitle.setObjectName("SubTitle")
        subtitle.setAlignment(Qt.AlignCenter)
        self.scroll_layout.addWidget(subtitle)

    def build_auth_hud(self):
        """Operator profile and connection state panel."""
        group = QFrame()
        group.setObjectName("CardFrame")
        layout = QVBoxLayout(group)
        layout.setContentsMargins(10, 10, 10, 10)
        layout.setSpacing(6)
        
        header = QLabel("👤 OPERATOR STATUS")
        header.setObjectName("HeaderLabel")
        layout.addWidget(header)
        
        self.lbl_profile = QLabel("USER: CLAUDIAC.GOMEZ (DIGITALIZADOR)")
        self.lbl_profile.setStyleSheet("color: #00f3ff; font-weight: bold; font-size: 11px;")
        layout.addWidget(self.lbl_profile)
        
        self.lbl_permissions = QLabel("ROLE: READ VUR // LOCAL GIS INJECTION [ACTIVE]")
        self.lbl_permissions.setStyleSheet("color: #94a3b8; font-size: 9px;")
        layout.addWidget(self.lbl_permissions)
        
        self.add_glow_effect(group, QColor(0, 243, 255, 30))
        self.scroll_layout.addWidget(group)

    def build_vur_query_hud(self):
        """VUR Search criteria form."""
        group = QFrame()
        group.setObjectName("CardFrame")
        layout = QVBoxLayout(group)
        layout.setContentsMargins(10, 10, 10, 10)
        layout.setSpacing(8)
        
        header = QLabel("🔍 REAL-TIME VUR CONNECTOR")
        header.setObjectName("HeaderLabel")
        layout.addWidget(header)
        
        # ORIP selection search helper
        lbl_search_orip = QLabel("FILTER REGISTRY (ORIP) BY NAME:")
        layout.addWidget(lbl_search_orip)
        
        self.txt_orip_search = QLineEdit()
        self.txt_orip_search.setPlaceholderText("Search Bogota, Medellin, Cali...")
        self.txt_orip_search.textChanged.connect(self.filter_orip_dropdown)
        layout.addWidget(self.txt_orip_search)
        
        lbl_orip = QLabel("OFFICE OF REGISTRATION:")
        layout.addWidget(lbl_orip)
        self.cmb_orip = QComboBox()
        self.populate_orips()
        layout.addWidget(self.cmb_orip)
        
        lbl_matricula = QLabel("MATRÍCULA INMOBILIARIA (FMI):")
        layout.addWidget(lbl_matricula)
        
        self.txt_matricula = QLineEdit()
        self.txt_matricula.setPlaceholderText("Enter FMI number e.g. 50N-30123")
        layout.addWidget(self.txt_matricula)
        
        # Loader Progress Bar
        self.progress_bar = QProgressBar()
        self.progress_bar.setStyleSheet("""
            QProgressBar {
                border: 1px solid #1a2238;
                border-radius: 2px;
                background-color: #070a13;
                text-align: center;
                color: #ffffff;
                font-size: 8px;
                height: 4px;
            }
            QProgressBar::chunk {
                background-color: #00f3ff;
            }
        """)
        self.progress_bar.setRange(0, 0)
        self.progress_bar.setVisible(False)
        layout.addWidget(self.progress_bar)

        self.btn_query = QPushButton("EXECUTE DEEP VUR QUERY")
        self.btn_query.setObjectName("QueryBtn")
        self.btn_query.clicked.connect(self.trigger_vur_query)
        layout.addWidget(self.btn_query)
        
        self.add_glow_effect(group, QColor(0, 243, 255, 30))
        self.scroll_layout.addWidget(group)

    def build_snr_data_card(self):
        """Detailed ownership card from SNR database."""
        group = QFrame()
        group.setObjectName("CardFrame")
        self.snr_card = group
        layout = QVBoxLayout(group)
        layout.setContentsMargins(10, 10, 10, 10)
        layout.setSpacing(6)
        
        header = QLabel("📄 SNR FOLIO RECORD DETAILS")
        header.setObjectName("HeaderLabel")
        layout.addWidget(header)
        
        self.lbl_owner = QLabel("PROPIETARIO: --")
        self.lbl_owner.setStyleSheet("color: #ffffff; font-size: 12px; font-weight: bold;")
        layout.addWidget(self.lbl_owner)
        
        self.lbl_area_snr = QLabel("ÁREA REGISTRADA: --")
        self.lbl_area_snr.setStyleSheet("color: #00f3ff; font-size: 11px; font-weight: bold;")
        layout.addWidget(self.lbl_area_snr)
        
        self.lbl_juridico = QLabel("ESTADO JURÍDICO: --")
        self.lbl_juridico.setStyleSheet("color: #94a3b8; font-size: 10px;")
        layout.addWidget(self.lbl_juridico)
        
        self.lbl_salvedades = QLabel("LIMITACIONES / SALVEDADES:")
        layout.addWidget(self.lbl_salvedades)
        
        self.txt_salvedades_snr = QTextEdit()
        self.txt_salvedades_snr.setReadOnly(True)
        self.txt_salvedades_snr.setFixedHeight(50)
        self.txt_salvedades_snr.setPlaceholderText("No salvedades detected.")
        layout.addWidget(self.txt_salvedades_snr)
        
        # Cyberpunk Neon-Red Warning/Alert card for Active Precautionary Measures
        self.lbl_alert_card = QFrame()
        self.lbl_alert_card.setStyleSheet("""
            background-color: #1f0810;
            border: 1px solid #ff0055;
            border-radius: 4px;
            padding: 8px;
            margin-top: 4px;
        """)
        alert_layout = QVBoxLayout(self.lbl_alert_card)
        alert_layout.setContentsMargins(4, 4, 4, 4)
        
        self.lbl_alert_title = QLabel("⚠️ CRITICAL ALERT: MEDIDAS CAUTELARES DETECTED")
        self.lbl_alert_title.setStyleSheet("color: #ff0055; font-weight: bold; font-size: 10px; letter-spacing: 1px;")
        alert_layout.addWidget(self.lbl_alert_title)
        
        self.txt_alert_details = QTextEdit()
        self.txt_alert_details.setReadOnly(True)
        self.txt_alert_details.setFixedHeight(50)
        self.txt_alert_details.setStyleSheet("background-color: #070a13; border: none; color: #ff0055; font-size: 9px;")
        alert_layout.addWidget(self.txt_alert_details)
        
        layout.addWidget(self.lbl_alert_card)
        self.lbl_alert_card.setVisible(False)
        
        # Historical Annotations Section
        self.lbl_anotaciones = QLabel("ANNOTATIONS HISTORY:")
        layout.addWidget(self.lbl_anotaciones)
        
        self.txt_anotaciones_snr = QTextEdit()
        self.txt_anotaciones_snr.setReadOnly(True)
        self.txt_anotaciones_snr.setFixedHeight(65)
        self.txt_anotaciones_snr.setPlaceholderText("Historical annotations will render here.")
        layout.addWidget(self.txt_anotaciones_snr)
        
        self.add_glow_effect(group, QColor(0, 243, 255, 30))
        self.scroll_layout.addWidget(group)

    def build_cruce_catastral_hud(self):
        """Cross-referencing geometric vs legal information section."""
        group = QFrame()
        group.setObjectName("CardFrame")
        layout = QVBoxLayout(group)
        layout.setContentsMargins(10, 10, 10, 10)
        layout.setSpacing(8)
        
        header = QLabel("📐 CADASTRAL-REGISTRY CROSS LINK")
        header.setObjectName("HeaderLabel")
        layout.addWidget(header)
        
        self.btn_load_qgis = QPushButton("LOAD ACTIVE LAYER PARCEL")
        self.btn_load_qgis.clicked.connect(self.load_selected_qgis_feature)
        layout.addWidget(self.btn_load_qgis)
        
        self.lbl_qgis_info = QLabel("ID PREDIO GIS: --\nCADASTRAL GEOM AREA: --")
        self.lbl_qgis_info.setStyleSheet("color: #e2e8f0; font-size: 11px; font-weight: normal;")
        layout.addWidget(self.lbl_qgis_info)
        
        # Discrepancy box
        self.lbl_discrepancy_badge = QLabel("LADM-COL COMPLIANCE: AWAITING QUERY")
        self.lbl_discrepancy_badge.setStyleSheet("""
            background-color: #101524;
            color: #94a3b8;
            font-weight: bold;
            padding: 8px;
            border-radius: 4px;
            font-size: 11px;
            border: 1px solid #1f293d;
        """)
        self.lbl_discrepancy_badge.setAlignment(Qt.AlignCenter)
        layout.addWidget(self.lbl_discrepancy_badge)
        
        self.btn_inject = QPushButton("INJECT METRIC FLAGS TO GIS")
        self.btn_inject.setObjectName("InjectBtn")
        self.btn_inject.clicked.connect(self.inject_flags_to_qgis)
        layout.addWidget(self.btn_inject)
        
        self.add_glow_effect(group, QColor(0, 243, 255, 30))
        self.scroll_layout.addWidget(group)

    def setup_heartbeat_animation(self):
        """Prepares the heartbeat pulse effect for warning alert cards using a Variant Animation."""
        self.alert_shadow = QGraphicsDropShadowEffect(self.lbl_alert_card)
        self.alert_shadow.setBlurRadius(15)
        self.alert_shadow.setColor(QColor(255, 0, 85, 80))
        self.alert_shadow.setOffset(0, 0)
        self.lbl_alert_card.setGraphicsEffect(self.alert_shadow)

        self.heartbeat_anim = QVariantAnimation(self)
        self.heartbeat_anim.setDuration(1500)
        self.heartbeat_anim.setStartValue(80)   # Low opacity value
        self.heartbeat_anim.setEndValue(255)    # High opacity value
        self.heartbeat_anim.setEasingCurve(QEasingCurve.InOutSine)
        self.heartbeat_anim.setLoopCount(-1)    # Run infinitely
        
        def apply_alpha(val):
            self.alert_shadow.setColor(QColor(255, 0, 85, val))
        
        self.heartbeat_anim.valueChanged.connect(apply_alpha)

    def populate_orips(self):
        """Populates the ORIP offices combo box from the unified database dictionary."""
        if not self.plugin or not hasattr(self.plugin, 'vur'):
            # Basic fallback if standalone/no plugin context
            self.cmb_orip.addItem("ORIP - BOGOTA NORTE - ( 50N )", "50N")
            return
            
        from apps.api.vur_service import ORIP_OFFICES
        self.all_orips_list = sorted(
            [(circulo, info["nombre"]) for circulo, info in ORIP_OFFICES.items()],
            key=lambda x: x[1]
        )
        
        self.cmb_orip.clear()
        for circulo, name in self.all_orips_list:
            self.cmb_orip.addItem(name, circulo)

    def filter_orip_dropdown(self, text):
        """Filters the ORIP dropdown items dynamically avoiding flickering."""
        if not hasattr(self, 'all_orips_list'):
            return
        
        search_str = text.strip().lower()
        
        # Block signals to prevent triggering index-changed cascades
        self.cmb_orip.blockSignals(True)
        self.cmb_orip.clear()
        
        for circulo, name in self.all_orips_list:
            if not search_str or search_str in name.lower() or search_str in circulo.lower():
                self.cmb_orip.addItem(name, circulo)
                
        self.cmb_orip.blockSignals(False)

    def load_selected_qgis_feature(self):
        """Reads selected feature parameters from active layer in QGIS map canvas."""
        if not QGIS_AVAILABLE or not self.plugin or not self.plugin.iface:
            QMessageBox.information(self, "Modo Simulación", "No se detectó un entorno activo de QGIS.")
            return
 
        active_layer = self.plugin.iface.activeLayer()
        if not active_layer or active_layer.type() != QgsVectorLayer.VectorLayer:
            QMessageBox.warning(self, "DGZ Error", "Por favor selecciona una capa vectorial de predios.")
            return
            
        selected_features = active_layer.selectedFeatures()
        if len(selected_features) == 0:
            QMessageBox.warning(self, "DGZ Error", "Por favor selecciona un polígono predial en el mapa canvas.")
            return
            
        feat = selected_features[0]
        self.current_qgis_feature = feat
        
        geom = feat.geometry()
        self.current_calculated_area = geom.area()
        
        # Read matrícula from feature attribute
        fmi = ""
        for field_name in ["matricula", "fmi", "MATRICULA", "FMI"]:
            idx = active_layer.fields().indexFromName(field_name)
            if idx != -1:
                fmi = str(feat.attribute(idx))
                break
                
        self.lbl_qgis_info.setText(f"ID PREDIO GIS: {feat.id()}\nCADASTRAL GEOM AREA: {self.current_calculated_area:.2f} m²")
        
        # Highlight card with bright green border momentarily
        self.btn_load_qgis.setStyleSheet("border: 1px solid #10b981; background-color: #062f22;")
        
        if fmi and fmi.strip() != "NULL" and fmi.strip() != "":
            self.txt_matricula.setText(fmi)
            
        self.evaluate_cruce()

    def trigger_vur_query(self):
        """Executes the live query and updates the ownership card GUI panels with animations."""
        matricula = self.txt_matricula.text().strip()
        circulo_idx = self.cmb_orip.currentIndex()
        if circulo_idx == -1 or not matricula:
            QMessageBox.warning(self, "DGZ Advertencia", "Por favor ingresa un número de matrícula y selecciona una ORIP.")
            return
            
        circulo_code = self.cmb_orip.itemData(circulo_idx)
        
        # Set UI to loading state
        self.btn_query.setEnabled(False)
        self.btn_query.setText("QUERYING SECURE SNR-VUR...")
        self.progress_bar.setVisible(True)
        self.lbl_owner.setText("PROPIETARIO: Loading...")
        self.lbl_area_snr.setText("ÁREA REGISTRADA: Loading...")
        self.txt_salvedades_snr.setText("Searching secure folios in official registers...")
        self.lbl_alert_card.setVisible(False)
        self.heartbeat_anim.stop()
        self.txt_anotaciones_snr.setText("Loading annotations...")
        
        # Ensure our plugin VUR depurator queries correctly
        try:
            # Check if there is an active token
            token = self.plugin.db.token if self.plugin and self.plugin.db else None
            if token:
                self.plugin.vur.token = token
                
            query_fmi = f"{circulo_code}-{matricula}" if "-" not in matricula else matricula
            result = self.plugin.vur.query_property_registration(query_fmi)
            self.last_query_result = result
            
            # Reset button state
            self.btn_query.setEnabled(True)
            self.btn_query.setText("EXECUTE DEEP VUR QUERY")
            self.progress_bar.setVisible(False)
            
            if result.get("status") == "INVALID" or result.get("owner_name") == "DESCONOCIDO":
                self.lbl_owner.setText("PROPIETARIO: DESCONOCIDO")
                self.lbl_area_snr.setText("ÁREA REGISTRADA: 0.00 m²")
                self.lbl_juridico.setText("ESTADO JURÍDICO: RECORD NOT FOUND")
                self.lbl_juridico.setStyleSheet("color: #ff0055;")
                self.txt_salvedades_snr.setText(result.get("message", "Folio inexistente o inactivo."))
                self.lbl_alert_card.setVisible(False)
                self.txt_anotaciones_snr.clear()
            else:
                self.lbl_owner.setText(f"PROPIETARIO:\n{result.get('owner_name')}")
                self.lbl_area_snr.setText(f"ÁREA REGISTRADA: {result.get('area_snr_m2'):.2f} m²")
                
                limitaciones = result.get('legal_incumbrances', 'VIGENTE')
                self.lbl_juridico.setText(f"ESTADO JURÍDICO: {limitaciones}")
                if "AFECTADO" in limitaciones or "EMBARGO" in limitaciones:
                    self.lbl_juridico.setStyleSheet("color: #ff0055; font-weight: bold;")
                else:
                    self.lbl_juridico.setStyleSheet("color: #10b981; font-weight: bold;")
                    
                self.txt_salvedades_snr.setText(result.get('salvedades', 'Sin salvedades o limitaciones en el folio.'))
                
                # Check precautionary measures
                medidas = result.get("medidasCautelares", [])
                if medidas and len(medidas) > 0:
                    self.lbl_alert_card.setVisible(True)
                    self.txt_alert_details.setText("\n".join(f"• {m}" for m in medidas))
                    self.heartbeat_anim.start() # Start premium visual pulsing
                else:
                    self.lbl_alert_card.setVisible(False)
                    self.txt_alert_details.clear()
                    self.heartbeat_anim.stop()
                    
                # Format annotations
                arbol = result.get("arbolAnotaciones", [])
                if arbol and len(arbol) > 0:
                    txt_arbol = []
                    for anot in arbol:
                        txt_arbol.append(f"Anotación {anot.get('anotacion')}: {anot.get('tipo')} - {anot.get('comentario')}")
                    self.txt_anotaciones_snr.setText("\n".join(txt_arbol))
                else:
                    self.txt_anotaciones_snr.setText("No hay anotaciones registradas en el folio.")
                
            self.evaluate_cruce()
            
        except Exception as err:
            self.btn_query.setEnabled(True)
            self.btn_query.setText("EXECUTE DEEP VUR QUERY")
            self.progress_bar.setVisible(False)
            self.lbl_alert_card.setVisible(False)
            self.heartbeat_anim.stop()
            QMessageBox.critical(self, "DGZ Query Error", f"Fallo al conectar al API de DevGiz/VUR:\n{str(err)}")

    def evaluate_cruce(self):
        """Compares calculations and registered metrics, displaying premium glowing LADM-COL badges."""
        if not self.last_query_result:
            return
            
        # Get areas
        registered_area = float(self.last_query_result.get("area_snr_m2", 0.0))
        
        # Calculate status
        if self.last_query_result.get("status") == "INVALID" or registered_area <= 0:
            status_code = "04_Omision_Registral"
            desc = "Folio SNR no existe o se encuentra inactivo."
        else:
            if self.current_calculated_area <= 0:
                status_code = "03_Omision_Catastral"
                desc = "Folio registrado, predio no digitalizado en QGIS."
            else:
                status_code, desc = self.plugin.vur.evaluate_discrepancy(
                    self.current_calculated_area, registered_area, 10.0
                )
                
        # Update badge
        self.lbl_discrepancy_badge.setText(f"LADM-COL CODE: {status_code}")
        
        # Change colors and drop shadows depending on compliance
        if status_code == "01_Cruce_Exitoso":
            self.lbl_discrepancy_badge.setStyleSheet("""
                background-color: #022c22;
                color: #10b981;
                font-weight: bold;
                padding: 10px;
                border-radius: 4px;
                font-size: 11px;
                border: 1px solid #10b981;
                letter-spacing: 1px;
            """)
            self.add_glow_effect(self.lbl_discrepancy_badge, QColor(16, 185, 129, 120), radius=15)
            
        elif status_code == "02_Discrepancia_Area":
            self.lbl_discrepancy_badge.setStyleSheet("""
                background-color: #451a03;
                color: #f59e0b;
                font-weight: bold;
                padding: 10px;
                border-radius: 4px;
                font-size: 11px;
                border: 1px solid #f59e0b;
                letter-spacing: 1px;
            """)
            self.add_glow_effect(self.lbl_discrepancy_badge, QColor(245, 158, 11, 120), radius=15)
            
        elif status_code == "03_Omision_Catastral":
            self.lbl_discrepancy_badge.setStyleSheet("""
                background-color: #2e1065;
                color: #8b5cf6;
                font-weight: bold;
                padding: 10px;
                border-radius: 4px;
                font-size: 11px;
                border: 1px solid #8b5cf6;
                letter-spacing: 1px;
            """)
            self.add_glow_effect(self.lbl_discrepancy_badge, QColor(139, 92, 246, 120), radius=15)
            
        else: # 04_Omision_Registral
            self.lbl_discrepancy_badge.setStyleSheet("""
                background-color: #4c0519;
                color: #ef4444;
                font-weight: bold;
                padding: 10px;
                border-radius: 4px;
                font-size: 11px;
                border: 1px solid #ef4444;
                letter-spacing: 1px;
            """)
            self.add_glow_effect(self.lbl_discrepancy_badge, QColor(239, 68, 68, 120), radius=15)

    def inject_flags_to_qgis(self):
        """Overwrites the selected feature's compliance properties in QGIS attribute table with micro-confirmations."""
        if not QGIS_AVAILABLE or not self.plugin or not self.plugin.iface:
            QMessageBox.information(self, "Modo Simulación", "No se detectó un entorno activo de QGIS.")
            return
            
        if not self.current_qgis_feature or not self.last_query_result:
            QMessageBox.warning(self, "DGZ Error", "Por favor carga un predio de QGIS y realiza una consulta al VUR primero.")
            return
            
        active_layer = self.plugin.iface.activeLayer()
        if not active_layer or active_layer.type() != QgsVectorLayer.VectorLayer:
            return
            
        # Get fields
        fields = active_layer.fields()
        cruce_idx = fields.indexFromName("dgz_cruce")
        prop_idx = fields.indexFromName("dgz_propietario")
        area_idx = fields.indexFromName("dgz_area_snr")
        alertas_idx = fields.indexFromName("dgz_alertas")
        
        # Ensure fields exist, create them if they do not
        if cruce_idx == -1 or prop_idx == -1 or area_idx == -1 or alertas_idx == -1:
            from PyQt5.QtCore import QVariant
            from qgis.core import QgsField
            provider = active_layer.dataProvider()
            
            new_fields = []
            if cruce_idx == -1:
                new_fields.append(QgsField("dgz_cruce", QVariant.String, len=100))
            if prop_idx == -1:
                new_fields.append(QgsField("dgz_propietario", QVariant.String, len=150))
            if area_idx == -1:
                new_fields.append(QgsField("dgz_area_snr", QVariant.Double))
            if alertas_idx == -1:
                new_fields.append(QgsField("dgz_alertas", QVariant.String, len=254))
                
            active_layer.startEditing()
            provider.addAttributes(new_fields)
            active_layer.updateFields()
            active_layer.commitChanges()
            
            # Refresh indices
            fields = active_layer.fields()
            cruce_idx = fields.indexFromName("dgz_cruce")
            prop_idx = fields.indexFromName("dgz_propietario")
            area_idx = fields.indexFromName("dgz_area_snr")
            alertas_idx = fields.indexFromName("dgz_alertas")
            
        # Write to feature
        active_layer.startEditing()
        
        registered_area = float(self.last_query_result.get("area_snr_m2", 0.0))
        owner = self.last_query_result.get("owner_name", "DESCONOCIDO")
        
        # Calculate status code
        if self.last_query_result.get("status") == "INVALID" or registered_area <= 0:
            status_code = "04_Omision_Registral"
        else:
            status_code, _ = self.plugin.vur.evaluate_discrepancy(
                self.current_calculated_area, registered_area, 10.0
            )
            
        # Determine alerts list
        medidas = self.last_query_result.get("medidasCautelares", [])
        alertas_text = "NINGUNA"
        if medidas and len(medidas) > 0:
            alertas_text = "; ".join(medidas)[:254]
            
        active_layer.changeAttributeValue(self.current_qgis_feature.id(), cruce_idx, status_code)
        active_layer.changeAttributeValue(self.current_qgis_feature.id(), prop_idx, owner)
        active_layer.changeAttributeValue(self.current_qgis_feature.id(), area_idx, registered_area)
        active_layer.changeAttributeValue(self.current_qgis_feature.id(), alertas_idx, alertas_text)
        
        active_layer.commitChanges()
        
        # Micro visual confirmation: Change Inject button styling to success green temporarily
        self.btn_inject.setText("METRICS INJECTED ✓")
        self.btn_inject.setStyleSheet("background-color: #065f46; color: #10b981; border: 1px solid #10b981;")
        
        QMessageBox.information(
            self, "Cruce Exitoso", 
            f"Se han inyectado las banderas en la capa predial para el ID {self.current_qgis_feature.id()}:\n"
            f"  - Cruce: {status_code}\n  - Propietario: {owner}\n  - Área SNR: {registered_area} m²\n  - Alertas: {alertas_text}"
        )
