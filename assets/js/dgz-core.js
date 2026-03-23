/**
 * DGZ_CORE_v1.0 - Global Intelligence & Navigation
 * Handles i18n, Global Header injection, and Navigation Bridges.
 */

const dgzTranslations = {
    en: {
        nav_home: "Nucleus",
        nav_lab: "Spatial Lab",
        nav_validator: "Command Center",
        nav_map: "Intel Map",
        nav_projects: "Technical Assets",
        nav_about: "Strategic Overview",
        nav_contact: "Contact",
        nav_cv: "Neural_Datasheet",
        lang_switch: "ES",
        back_to_core: "Return to Core",
        system_status: "SYSTEM_LEVEL: SOVEREIGN",
        api_connected: "API CONNECTED",
        ai_active: "Groq Llama-3 Active",

        // Hero
        hero_tag: "// SPATIAL_SYSTEMS_ENGINEERING",
        hero_available: "Available for Projects · Medellín, Colombia",
        hero_h1: "Automating Multipurpose Cadastre & Territorial Intelligence Systems",
        hero_desc: "High-Performance Geospatial Engineering & Automated Systems for Multipurpose Cadastre, GovTech, and Territorial Intelligence.",
        hero_btn_lab: "⭐ Explore Spatial Lab",
        hero_btn_contact: "Link_Direct",
        hero_btn_map: "🗺️ Intel Map",

        // CV Modal
        cv_close: "EXIT_INTERFACE",
        cv_label_profile: "Professional_Identity",
        cv_label_skills: "Technical_DNA",
        cv_label_langs: "Communication_Nodes",
        cv_label_metrics: "Architectural_Impact",
        cv_label_edu: "Academic_Trajectory",
        cv_label_cert: "Certifications & Credentials",
        cv_label_exp_main: "Current_Deployment",
        cv_label_exp_log: "Operational_History",
        cv_download: "Download Technical Datasheet (PDF)",
        cv_summary: "Spatial Systems Engineer focused on merging high-precision GIS expertise with robust architectural design and automated software development for territorial management.",
        cv_role_1: "Geographic Analyst",
        cv_role_2: "GIS Coordinator",
        cv_role_3: "QA/QC Specialist",
        cv_role_4: "Field Operations Leader",
        cv_role_5: "Drone & photogrammetry Lead",
        cv_edu_1: "B.S. Spatial Engineering (Candidate)",
        cv_edu_2: "Maintenance Technician",
        cv_rec_1: "Management Systems",
        cv_rec_2: "GIS Environmental Institute",
        cv_rec_3: "Electrical Design",
        cv_rec_4: "Occupational Health",

        // Capabilities / Services
        cap_tag: "Specialized Services",
        cap_title: "Specialized <em style='font-style:normal;color:#00E87A;'>solutions</em> for every territorial challenge",
        svc_1_title: "Mass Cadastral Update",
        svc_1_desc: "Management and validation of 500+ parcels per cycle. Full automation of land recognition workflow under IGAC and LADM-COL V3 standards.",
        svc_2_title: "Cadastral QA/QC (Quality Control)",
        svc_2_desc: "Technical audits with Python and QGIS. Automatic detection of overlaps, gaps, and topological errors. Certified PDF reports for oversight.",
        svc_3_title: "Geospatial ETL Pipelines",
        svc_3_desc: "Unattended transformation architecture for massive GIS data ingestion. From field to database with zero manual intervention.",
        svc_4_title: "GeoAI — Change Detection",
        svc_4_desc: "Machine Learning on Sentinel-2 imagery to detect urban expansion, land cover changes, and multi-temporal territorial mutations.",
        svc_5_title: "Enterprise GIS Dashboards",
        svc_5_desc: "Interactive interfaces connected to PostGIS for real-time territorial analysis. Visualization of cadastral indicators for executives and entities.",
        svc_6_title: "GIS Field Coordination",
        svc_6_desc: "Leadership of technical teams in complex terrains. Topographic leveling, mass digitization, and coordination under NSR-10 regulations.",

        // Challenges
        chal_tag: "Territorial Challenges",
        chal_title: "What I <em style='font-style:normal;color:#00E87A;'>solve</em> for your entity",
        chal_desc: "Governments and territorial entities face critical spatial data challenges that hinder development. These are the problems I transform into automated solutions.",
        chal_prob_1: "Slow and error-prone manual QA",
        chal_sol_1: "Automated validation with Python + PostGIS",
        chal_prob_2: "Inconsistent parcel data",
        chal_sol_2: "Structured LADM-COL spatial modeling",
        chal_prob_3: "Slow digitization processes",
        chal_sol_3: "Automated GIS pipelines with GDAL/FME",
        chal_prob_4: "Broken cadastral topology",
        chal_sol_4: "Automated topological validation engines",
        chal_prob_5: "No visibility on land cover changes",
        chal_sol_5: "GeoAI: Change detection with Sentinel + Rasterio",

        // About
        about_label: "Engineering Core",
        about_title: "GIS Excellence & Software Architecture",
        about_h3: "GIS EXCELLENCE & SOFTWARE ARCHITECTURE.",
        about_p1: "We bridge the gap between traditional GIS mapping and scalable software architecture. Focused on high-precision data flows and technical automation. Our core transforms unstructured geographic data into automated, sovereign territorial intelligence.",

        // Tech DNA
        tech_tag: "Tech Stack",
        tech_title: "The Engineering Matrix",
        tech_infra: "GIS_SPATIAL_INFRA",
        tech_infra_desc: "PostGIS topology matrix, LADM-COL V3 compliance, and high-fidelity vector architecture.",
        tech_sys: "SYSTEMS_ENGINEERING",
        tech_sys_desc: "Backend systems for spatial intelligence, RESTful Node architecture, and automated logic.",
        tech_auto: "AUTOMATION_DEVOPS",
        tech_auto_desc: "CI/CD pipelines for geospatial assets, containerized spatial nodes, and kernel optimization.",

        // Metrics
        metrics_label: "Proven Performance",
        metrics_title: "Impact Metrics",
        metrics_1_label: "Spatial Records Processed",
        metrics_1_sub: "Parcels // Cartography // Cadastre",
        metrics_2_label: "Error Margin Reduction",
        metrics_2_sub: "QA/QC // Automation // Validation",
        metrics_3_label: "Operational Efficiency",
        metrics_3_sub: "ROI // Workflow Automation",
        metrics_4_label: "Multipurpose Cadastre Projects",
        metrics_4_sub: "LADM-COL // IGAC Standards",

        // Lab
        lab_title: "Spatial Intelligence Laboratory",
        lab_desc: "High-performance geospatial nodes demonstrating territorial automation, multipurpose cadastral engines, and advanced spatial systems engineering.",
        lab_live: "The following assets are active demonstrations, not mere placeholders.",
        lab_gesture: "Free Trial: Vision Sandbox (Gestural AI)",
        lab_p1_title: "Interactive Spatial Node",
        lab_p1_desc: "High-precision GIS viewer with real-time parcel rendering. Interacting with local datasets exported from QGIS with deep topology attributes.",
        lab_p1_btn: "EXECUTE_VIEWER",
        lab_p2_title: "Cadastral Intelligence Engine",
        lab_p2_desc: "Automated LADM-COL V3 validator. Detecting overlaps, slivers, and topological inconsistencies using high-fidelity Python kernels.",
        lab_p2_btn: "INITIALIZE_VAL_ENGINE",
        lab_p2_full: "ACCESS_FULL_INTERFACE",
        lab_p3_title: "Sovereign Data Pipelines",
        lab_p3_desc: "Unattended ETL architecture for massive geospatial ingestion, ensuring data integrity across distributed GIS nodes.",

        // Projects
        proj_label: "// FLAGSHIP_ASSETS",
        proj_title: "Technical Deployments",
        proj_1_desc: "Enterprise level GIS monitoring for modern urban infrastructure. Synchronizing real-time telemetry across distributed nodes.",
        proj_2_title: "Territorial ETL Pipelines",
        proj_2_desc: "Unattended automation of geographic data transformations to avoid slow manual processes.",
        proj_3_title: "Enterprise GIS Dashboard",
        proj_3_desc: "Interactive interface connected to PostGIS for territorial analysis and real-time telemetry.",
        proj_4_title: "LADM-COL QGIS Plugin",
        proj_4_desc: "Scripts inserted as native tools in the QGIS UI for instantaneous topological validation.",
        proj_5_title: "GeoAI Experimental",
        proj_5_desc: "Machine Learning prototype lab on Sentinel-2 for urban change detection.",
        proj_6_title: "Geo-LLM Intelligence",
        proj_6_desc: "Artificial Intelligence agent that translates natural language into Spatial SQL queries and generates statistical cadastral reports in real-time.",

        // GeoAI
        geoai_label: "// GEOAI_MODULE",
        geoai_title: "GeoAI Intelligence",
        geoai_sub: "Urban Change Detection with Sentinel Imagery",
        geoai_desc: "Application of geospatial artificial intelligence to detect urban and rural cover changes by comparing multi-temporal satellite images. Complete pipeline from Sentinel download to GeoJSON export.",
        geoai_step_1_title: "Sentinel-2 Imagery Download",
        geoai_step_1_desc: "Copernicus API // Spectral bands B04, B08, B11 // 10m resolution",
        geoai_step_2_title: "Processing with Rasterio + GeoPandas",
        geoai_step_2_desc: "Radiometric normalization // Multi-temporal comparison // NumPy arrays",
        geoai_step_3_title: "Classification with Scikit-learn",
        geoai_step_3_desc: "Random Forest // Change detection // Polygon vectorization",
        geoai_step_4_title: "GeoJSON Export → Web GIS",
        geoai_step_4_desc: "MapLibre GL visualization // PostGIS integration // REST API",
        geoai_status: "[CHANGE_DETECTION_ENGINE] STATUS: PROCESSING_DEMO",

        // Architecture
        arch_label: "// ENGINEERING_ARCHITECTURE",
        arch_title: "System Architecture",
        arch_desc: "Complete architecture of the modern GovTech stack — from field capture to web publication. Designed to scale at municipal, departmental, or national levels.",
        arch_node_1: "Field Capture",
        arch_node_1_sub: "GPS // 360° Survey // Drones",
        arch_node_2: "Python Validation Engine",
        arch_node_2_sub: "GDAL // GeoPandas // Shapely",
        arch_node_3: "PostGIS Database",
        arch_node_3_sub: "PostgreSQL // LADM-COL Schema",
        arch_node_4: "FastAPI Spatial API",
        arch_node_4_sub: "/validate // /topology // /parcel_score",
        arch_node_5: "Web GIS Interface",
        arch_node_5_sub: "MapLibre GL JS // Chart.js",

        // Timeline
        timeline_label: "Professional Trajectory",
        timeline_title: "Professional Trajectory",
        timeline_desc: "6+ years of specialized GIS and territorial engineering across Colombia's most complex cadastral projects.",
        tl_role_1: "Geographic Analyst",
        tl_desc_1: "Advanced geospatial processing via photointerpretation, 360° input analysis and vector restitution. Mass digitization for cadastral update with topological validation under LADM-COL V3.",
        tl_role_2: "Cadastral Quality Control (QA/QC)",
        tl_desc_2: "Technical quality audits for predial recognition. IGAC QA standards enforcement, topological consistency checks, and field report validation.",
        tl_role_3: "GIS Coordinator & Field Leader",
        tl_desc_3: "Co-leader of field survey teams. Urban/rural topographic leveling, mass digitization, and GIS coordination for multipurpose cadastre missions in complex terrain.",
        tl_role_4: "Professional GIS Coordinator",
        tl_desc_4: "LADM-COL standards implementation, mass digitization and GIS coordination for Smart City multipurpose cadastre deployment. QA/QC across distributed field nodes.",
        tl_role_5: "GIS Professional — Drones & Geomatics",
        tl_desc_5: "Drone-based photogrammetric surveys, predial management, and vector GIS production. Spatial analysis and cartographic outputs for real estate and environmental projects.",
        tl_role_6: "Digitizer / Topographer",
        tl_desc_6: "Road topography surveys and GIS digitization for vial infrastructure projects. GPS field surveys and cartographic production under professional standards.",

        // Map
        map_label: "// SPATIAL_INTEL_WORKSTATION_V6",
        map_title: "Territorial Intelligence Hub",
        map_desc: "Full-stack GIS workstation — interactive parcel data, toggleable layers, real coordinate intelligence, and live attribute queries. Click any map node to inspect its LADM-COL attributes.",
        map_layer_manager: "LAYER_MANAGER",
        map_vector_layers: "VECTOR_LAYERS",
        map_legend_label: "LEGEND",
        map_projection_label: "PROJECTION INFO",
        map_identify_hint: "IDENTIFY MODE — Click a feature to inspect",
        legend_hq_node: "HQ Node — Active",
        legend_field_node: "Field Node — Remote",
        legend_parcel_validated: "Parcel — Validated",
        legend_parcel_error: "Parcel — Error",
        legend_urban_perimeter: "Urban Perimeter",

        // Pricing
        pricing_tag: "ACQUIRE_OS_LICENSE // SPATIAL_INTELLIGENCE_SaaS",
        pricing_desc: "The most advanced cadastral validation engine in Latin America. Designed for auditing, municipalities, and GIS contractors who need real results.",
        pricing_roi_1: "Faster than manual QA",
        pricing_roi_2: "Error Reduction",
        pricing_roi_3: "Parcels Processed",
        pricing_roi_4: "V3 Certified Engine",
        pricing_bad_header: "⛔ WITHOUT DGZ SPATIAL OS",
        pricing_good_header: "✅ WITH DGZ SPATIAL OS",
        pricing_bad_1: "Manual QA: 3-5 days per municipality",
        pricing_bad_2: "Undetected topological errors",
        pricing_bad_3: "Manual SNR crossing (error-prone)",
        pricing_bad_4: "Non-standard Excel reports",
        pricing_bad_5: "No traceability on mutation history",
        pricing_good_1: "Automatic validation in minutes",
        pricing_good_2: "LADM-COL V3 topological engine",
        pricing_good_3: "Automatic SNR matricular crossing",
        pricing_good_4: "Certified Technical PDF and GeoJSON",
        pricing_good_5: "Full traceability of every parcel",

        plan_starter_tier: "STARTER_CORE",
        plan_starter_name: "Spatial Explorer",
        plan_starter_for: "For GIS professionals, technicians, and advanced students.",
        plan_starter_price: "$0",
        plan_starter_period: "/month · Forever Free",
        plan_starter_cap: "Capacity: 5,000 parcels/layer",
        plan_starter_feat_1: "Basic LADM-COL topological validation",
        plan_starter_feat_2: "Up to 5,000 parcels per layer",
        plan_starter_feat_3: "5 Geo-LLM Reports / day",
        plan_starter_feat_4: "Embedded interactive GIS viewer",
        plan_starter_no_1: "Physical-Legal SNR Cross-check",
        plan_starter_no_2: "FastAPI for automation",
        plan_starter_no_3: "Premium technical support",
        plan_starter_btn: "Get Started Free",

        plan_pro_tier: "INTERVENTORÍA_PRO",
        plan_pro_name: "Spatial Pro",
        plan_pro_for: "For handover contracts, massive QA/QC, and technical teams.",
        plan_pro_price: "$10",
        plan_pro_period: "/month · per user",
        plan_pro_cap: "Capacity: Unlimited ∞",
        plan_pro_feat_1: "Unlimited parcels (.shp / .gpkg)",
        plan_pro_feat_2: "Automatic SNR Matricular Crossing (Excel)",
        plan_pro_feat_3: "Certified technical PDF reports",
        plan_pro_feat_4: "FastAPI for full automation",
        plan_pro_feat_5: "Export GeoJSON + PostGIS ready",
        plan_pro_feat_6: "Real-time analytics dashboard",
        plan_pro_feat_7: "48h priority technical support",
        plan_pro_btn: "Acquire Pro License",
        plan_pro_trust: "🔒 Secure payment · Cancel anytime",

        plan_gov_tier: "GOVERNMENT_NODE",
        plan_gov_name: "Sovereign Tier",
        plan_gov_for: "For Cadastre Offices, IGAC, Municipalities, and large contractors.",
        plan_gov_price: "Custom",
        plan_gov_period: "/project · On-prem available",
        plan_gov_cap: "Enterprise-Scale · Dedicated Infra",
        plan_gov_feat_1: "On-Premises deployment (own servers)",
        plan_gov_feat_2: "SGDEA / Municipal Tax integration",
        plan_gov_feat_3: "Fine-tuned Geo-LLM models for the municipality",
        plan_gov_feat_4: "On-site training for the GIS team",
        plan_gov_feat_5: "Guaranteed technical SLA (72h response)",
        plan_gov_feat_6: "White-label: municipality's own brand",
        plan_gov_feat_7: "Full access to source code (license)",
        plan_gov_btn: "Contact Architect",
        plan_gov_trust: "Response in < 24h · NDA available",

        // Contact
        contact_label: "Start a Project",
        contact_title: "Let's discuss your<br>next project.",
        contact_desc: "Architecting the next generation of spatial intelligence. Let's discuss your project, municipality, or enterprise GIS challenge.",
        contact_email_label: "Email",
        contact_loc_label: "Location",
        contact_linkedin_label: "LinkedIn",
        contact_github_label: "GitHub",
        form_name: "Full_Name",
        form_placeholder_name: "Organization / Lead Architect",
        form_email: "Email_Uplink",
        form_service: "Service_Type",
        form_service_select: "— Select Service —",
        form_svc_1: "GIS Automation & ETL Pipeline",
        form_svc_2: "Cadastral QA/QC (LADM-COL)",
        form_svc_3: "Enterprise GIS Dashboard",
        form_svc_4: "GeoAI / Satellite Analysis",
        form_svc_5: "Government / Municipal Project",
        form_svc_6: "Other / Consulting",
        form_msg: "Mission_Brief",
        form_placeholder_msg: "Define mission parameters & objectives...",
        form_btn: "INITIATE_HANDSHAKE",

        // Footer
        footer_copy: "© 2026 ALBERT DANIEL GAVIRIA ZAPATA. ALL RIGHTS RESERVED.",

        boot_1: "DGZ_OS_v5.2_SOVEREIGN [BOOT_SEQUENCE_INIT]",
        boot_2: "Mounting PostGIS Vector Engine... OK",
        boot_3: "Initializing LADM-COL Validation Matrix...",
        boot_4: "Hydrating Spatial Intelligence Layers...",
        boot_5: "Handshaker: Geo-LLM Proxy Status... CONNECTED",
        boot_6: "DGZ_CORE: Decrypting Sovereign Credentials...",
        boot_7: "ACCESS_GRANTED: Welcome, Engineer Zapata.",

        demo_btn_run: "RUN_VALIDATION_DEMO",
        demo_btn_processing: "PROCESSING_NODES...",
        demo_log_1: "[ENGINE] Initializing LADM-COL V3 ruleset...",
        demo_log_2: "Extracting geometries via GeoPandas...",
        demo_log_3: "Checking overlap matrix (O(n log n))...",
        demo_log_4: "Analyzing sliver polygons < 0.05m2...",
        demo_log_5: "CONSULTING_DGZ_ENGINE: PASS"
    },
    es: {
        nav_home: "Núcleo",
        nav_lab: "Lab Espacial",
        nav_validator: "Centro de Mando",
        nav_map: "Mapa Intel",
        nav_projects: "Activos Técnicos",
        nav_about: "Visión Estratégica",
        nav_contact: "Contacto",
        nav_cv: "Datasheet_Neural",
        lang_switch: "EN",
        back_to_core: "Volver al Núcleo",
        system_status: "NIVEL_SISTEMA: SOBERANO",
        api_connected: "API CONECTADA",
        ai_active: "Groq Llama-3 Activo",

        // Hero
        hero_tag: "// INGENIERÍA_DE_SISTEMAS_ESPACIALES",
        hero_available: "Disponible para Proyectos · Medellín, Colombia",
        hero_h1: "Automatizando Sistemas de Inteligencia Territorial y Catastro Multipropósito",
        hero_desc: "Ingeniería Geoespacial de Alto Rendimiento y Sistemas Automatizados para Catastro Multipropósito, GovTech e Inteligencia Territorial.",
        hero_btn_lab: "⭐ Explorar Lab Espacial",
        hero_btn_contact: "Enlace_Directo",
        hero_btn_map: "🗺️ Mapa Intel",

        // CV Modal
        cv_close: "SALIR_INTERFAZ",
        cv_label_profile: "Identidad_Profesional",
        cv_label_skills: "ADN_Técnico",
        cv_label_langs: "Nodos_Comunicación",
        cv_label_metrics: "Impacto_Arquitectónico",
        cv_label_edu: "Trayectoria_Académica",
        cv_label_cert: "Certificaciones y Credenciales",
        cv_label_exp_main: "Despliegue_Actual",
        cv_label_exp_log: "Historial_Operativo",
        cv_download: "Descargar Datasheet Técnico (PDF)",
        cv_summary: "Ingeniero de Sistemas Espaciales enfocado en fusionar la experiencia SIG de alta precisión con un diseño arquitectónico robusto y desarrollo de software automatizado para la gestión territorial.",
        cv_role_1: "Analista Geográfico",
        cv_role_2: "Coordinador Profesional SIG",
        cv_role_3: "Control Calidad Catastral (QA/QC)",
        cv_role_4: "Coordinador & Líder de Campo",
        cv_role_5: "Profesional SIG (Drones & GIS)",
        cv_edu_1: "Ingeniería de Sistemas (C)",
        cv_edu_2: "Técnico Conservación",
        cv_rec_1: "Sistemas de Gestión",
        cv_rec_2: "Instituto Ambiental SIG",
        cv_rec_3: "Diseño Eléctrico",
        cv_rec_4: "Seguridad y Salud",

        // Capabilities / Services
        cap_tag: "Servicios Especializados",
        cap_title: "Soluciones <em style='font-style:normal;color:#00E87A;'>especializadas</em> para cada desafío territorial",
        svc_1_title: "Actualización Catastral Masiva",
        svc_1_desc: "Gestión y validación de +500 predios por ciclo. Automatización completa del flujo de reconocimiento predial bajo estándares IGAC y LADM-COL V3.",
        svc_2_title: "QA/QC Catastral (Control de Calidad)",
        svc_2_desc: "Auditorías técnicas con Python y QGIS. Detección automática de solapamientos, huecos y errores topológicos. Reportes PDF certificados para interventoría.",
        svc_3_title: "Pipelines ETL Geoespaciales",
        svc_3_desc: "Arquitectura de transformación desatendida para ingesta masiva de datos GIS. De campo a base de datos sin intervención manual.",
        svc_4_title: "GeoAI — Detección de Cambios",
        svc_4_desc: "Machine Learning sobre imagenería Sentinel-2 para detectar expansión urbana, cambios de cobertura y mutaciones territoriales multitemporales.",
        svc_5_title: "Dashboards GIS Empresariales",
        svc_5_desc: "Interfaces interactivas conectadas a PostGIS para análisis territorial en tiempo real. Visualización de indicadores catastrales para directivos y entidades.",
        svc_6_title: "Coordinación de Campo GIS",
        svc_6_desc: "Liderazgo de equipos técnicos en terrenos complejos. Nivelación topográfica, digitalización masiva y coordinación bajo normativa NSR-10.",

        // Challenges
        chal_tag: "Desafíos Territoriales",
        chal_title: "Lo que <em style='font-style:normal;color:#00E87A;'>resuelvo</em> para su entidad",
        chal_desc: "Los gobiernos y entidades territoriales enfrentan desafíos críticos de datos espaciales que frenan el desarrollo. Estos son los problemas que transformo en soluciones automatizadas.",
        chal_prob_1: "QA manual lento y propenso a errores",
        chal_sol_1: "Validación automática con Python + PostGIS",
        chal_prob_2: "Datos prediales inconsistentes",
        chal_sol_2: "Modelado espacial LADM-COL estructurado",
        chal_prob_3: "Procesos de digitalización lentos",
        chal_sol_3: "Pipelines SIG automatizados con GDAL/FME",
        chal_prob_4: "Topología catastral rota",
        chal_sol_4: "Motores de validación topológica automatizados",
        chal_prob_5: "Sin visibilidad sobre cambios de cobertura",
        chal_sol_5: "GeoAI: detección cambios con Sentinel + Rasterio",

        // About
        about_label: "Núcleo de Ingeniería",
        about_title: "Excelencia GIS & Arquitectura de Software",
        about_h3: "EXCELENCIA SIG Y ARQUITECTURA DE SOFTWARE.",
        about_p1: "Cerramos la brecha entre el mapeo SIG tradicional y la arquitectura de software escalable. Enfocados en flujos de datos de alta precisión y automatización técnica. Nuestro núcleo transforma datos geográficos sin estructura en inteligencia territorial automatizada y soberana.",

        // Tech DNA
        tech_tag: "Stack Tecnológico",
        tech_title: "La Matriz de Ingeniería",
        tech_infra: "INFRAESTRUCTURA_ESPACIAL_SIG",
        tech_infra_desc: "Matriz de topología PostGIS, cumplimiento LADM-COL V3 y arquitectura vectorial de alta fidelidad.",
        tech_sys: "INGENIERÍA_DE_SISTEMAS",
        tech_sys_desc: "Sistemas backend para inteligencia espacial, arquitectura Node RESTful y lógica automatizada.",
        tech_auto: "AUTOMATIZACIÓN_DEVOPS",
        tech_auto_desc: "Pipelines CI/CD para activos geoespaciales, nodos espaciales en contenedores y optimización de kernel.",

        // Metrics
        metrics_label: "Rendimiento Comprobado",
        metrics_title: "Métricas de Impacto",
        metrics_1_label: "Registros Espaciales Procesados",
        metrics_1_sub: "Predios // Cartografía // Catastro",
        metrics_2_label: "Reducción del Margen de Error",
        metrics_2_sub: "QA/QC // Automatización // Validación",
        metrics_3_label: "Eficiencia Operativa",
        metrics_3_sub: "ROI // Automatización de Workflow",
        metrics_4_label: "Proyectos de Catastro Multipropósito",
        metrics_4_sub: "LADM-COL // Estándares IGAC",

        // Lab
        lab_title: "Laboratorio de Inteligencia Espacial",
        lab_desc: "Nodos geoespaciales de alto rendimiento que demuestran automatización territorial, motores catastrales multipropósito e ingeniería de sistemas espaciales avanzada.",
        lab_live: "Los siguientes activos son demostraciones activas, no simples marcadores.",
        lab_gesture: "Prueba Gratuita: Vision Sandbox (IA Gestual)",
        lab_p1_title: "Nodo Espacial Interactivo",
        lab_p1_desc: "Visor SIG de alta precisión con renderizado de predios en tiempo real. Interactuando con datasets locales exportados de QGIS con atributos topológicos profundos.",
        lab_p1_btn: "EJECUTAR_VISOR",
        lab_p2_title: "Motor de Inteligencia Catastral",
        lab_p2_desc: "Validador automatizado LADM-COL V3. Detección de traslapes, slivers e inconsistencias topológicas utilizando kernels de Python de alta fidelidad.",
        lab_p2_btn: "INICIALIZAR_MOTOR_VAL",
        lab_p2_full: "ACCEDER_INTERFAZ_COMPLETA",
        lab_p3_title: "Pipelines de Datos Soberanos",
        lab_p3_desc: "Arquitectura ETL desatendida para ingesta geoespacial masiva, garantizando la integridad de los datos en nodos SIG distribuidos.",

        // Projects
        proj_label: "// ACTIVOS_ESTRELLA",
        proj_title: "Despliegues Técnicos",
        proj_1_desc: "Monitoreo SIG de nivel empresarial para infraestructura urbana moderna. Sincronización de telemetría en tiempo real entre nodos distribuidos.",
        proj_2_title: "Pipelines ETL Territoriales",
        proj_2_desc: "Automatización desatendida de transformaciones de datos geográficos para evitar procesos manuales lentos.",
        proj_3_title: "Tablero GIS Empresarial",
        proj_3_desc: "Interfaz interactiva conectada a PostGIS para análisis territorial y telemetría en tiempo real.",
        proj_4_title: "Plugin QGIS LADM-COL",
        proj_4_desc: "Scripts insertados como herramientas nativas en la UI de QGIS para validación topológica instantánea.",
        proj_5_title: "GeoAI Experimental",
        proj_5_desc: "Laboratorio de prototipos de Machine Learning sobre Sentinel-2 para detección de cambios urbanos.",
        proj_6_title: "Inteligencia Geo-LLM",
        proj_6_desc: "Agente de Inteligencia Artificial que traduce lenguaje natural a sentencias Spatial SQL y genera informes catastrales estadísticos en tiempo real.",

        // GeoAI
        geoai_label: "// MÓDULO_GEOAI",
        geoai_title: "Inteligencia GeoAI",
        geoai_sub: "Detección de Cambios Urbanos con Imágenes Sentinel",
        geoai_desc: "Aplicación de inteligencia artificial geoespacial para detectar cambios de cobertura urbana y rural comparando imágenes satelitales multitemporales. Pipeline completo desde descarga Sentinel hasta exportación GeoJSON.",
        geoai_step_1_title: "Descarga de Imágenes Sentinel-2",
        geoai_step_1_desc: "API Copernicus // Bandas espectrales B04, B08, B11 // resolución 10m",
        geoai_step_2_title: "Procesamiento con Rasterio + GeoPandas",
        geoai_step_2_desc: "Normalización radiométrica // Comparación multitemporal // NumPy arrays",
        geoai_step_3_title: "Clasificación con Scikit-learn",
        geoai_step_3_desc: "Random Forest // Detección de cambios // Vectorización de polígonos",
        geoai_step_4_title: "Exportación GeoJSON → Web GIS",
        geoai_step_4_desc: "Visualización en MapLibre GL // Integración PostGIS // API REST",
        geoai_status: "[MOTOR_DETECCIÓN_CAMBIOS] ESTADO: PROCESANDO_DEMO",

        // Architecture
        arch_label: "// ARQUITECTURA_DE_INGENIERÍA",
        arch_title: "Arquitectura del Sistema",
        arch_desc: "Arquitectura completa del stack GovTech moderno — desde captura en campo hasta publicación web. Diseñado para escalar a nivel municipal, departamental o nacional.",
        arch_node_1: "Captura en Campo",
        arch_node_1_sub: "GPS // Levantamiento 360° // Drones",
        arch_node_2: "Motor de Validación Python",
        arch_node_2_sub: "GDAL // GeoPandas // Shapely",
        arch_node_3: "Base de Datos PostGIS",
        arch_node_3_sub: "PostgreSQL // Esquema LADM-COL",
        arch_node_4: "FastAPI Spatial API",
        arch_node_4_sub: "/validate // /topology // /parcel_score",
        arch_node_5: "Interfaz Web GIS",
        arch_node_5_sub: "MapLibre GL JS // Chart.js",

        // Timeline
        timeline_label: "Trayectoria Profesional",
        timeline_title: "Trayectoria Profesional",
        timeline_desc: "Más de 6 años de experiencia especializada en SIG e ingeniería territorial en los proyectos catastrales más complejos de Colombia.",
        tl_role_1: "Analista Geográfico",
        tl_desc_1: "Procesamiento avanzado de información geoespacial mediante fotointerpretación, análisis de insumos 360° y restitución vectorial. Digitalización masiva para actualización catastral con validación topológica bajo LADM-COL V3.",
        tl_role_2: "Control de Calidad Catastral (QA/QC)",
        tl_desc_2: "Auditorías de calidad técnica para reconocimiento predial. Aplicación de estándares de calidad IGAC, comprobaciones de consistencia topológica y validación de informes de campo.",
        tl_role_3: "Coordinador SIG y Líder de Campo",
        tl_desc_3: "Co-líder de equipos de levantamiento de campo. Nivelación topográfica urbana/rural, digitalización masiva y coordinación SIG para misiones de catastro multipropósito en terrenos complejos.",
        tl_role_4: "Coordinador Profesional SIG",
        tl_desc_4: "Implementación de estándares LADM-COL, digitalización masiva y coordinación SIG para despliegue de catastro multipropósito en Smart Cities. QA/QC en nodos de campo distribuidos.",
        tl_role_5: "Profesional SIG — Drones y Geomática",
        tl_desc_5: "Levantamientos fotogramétricos con drones, gestión predial y producción SIG vectorial. Análisis espacial y salidas cartográficas para proyectos inmobiliarios y ambientales.",
        tl_role_6: "Digitalizador / Topógrafo",
        tl_desc_6: "Levantamientos topográficos viales y digitalización SIG para proyectos de infraestructura víal. Levantamientos de campo con GPS y producción cartográfica bajo estándares profesionales.",

        // Map
        map_label: "// ESTACIÓN_DE_TRABAJO_INTEL_ESPACIAL_V6",
        map_title: "Hub de Inteligencia Territorial",
        map_desc: "Estación de trabajo SIG completa — datos prediales interactivos, capas conmutables, inteligencia de coordenadas reales y consultas de atributos en vivo. Haga clic en cualquier nodo del mapa para inspeccionar sus atributos LADM-COL.",
        map_layer_manager: "GESTOR_CAPAS",
        map_vector_layers: "CAPAS_VECTORIALES",
        map_legend_label: "LEYENDA",
        map_projection_label: "INFO PROYECCIÓN",
        map_identify_hint: "MODO IDENTIFICAR — Click en un elemento para inspeccionar",
        legend_hq_node: "Nodo HQ — Activo",
        legend_field_node: "Nodo Campo — Remoto",
        legend_parcel_validated: "Predio — Validado",
        legend_parcel_error: "Predio — Error",
        legend_urban_perimeter: "Perímetro Urbano",

        // Pricing
        pricing_tag: "ADQUIRIR_LICENCIA_OS // Inteligencia_Espacial_SaaS",
        pricing_desc: "El motor de validación catastral más avanzado de Latinoamérica. Diseñado para interventorías, municipios y contratistas SIG que necesitan resultados reales.",
        pricing_roi_1: "Más rápido que QA manual",
        pricing_roi_2: "Reducción de Errores",
        pricing_roi_3: "Predios Procesados",
        pricing_roi_4: "Motor Certificado V3",
        pricing_bad_header: "⛔ SIN DGZ SPATIAL OS",
        pricing_good_header: "✅ CON DGZ SPATIAL OS",
        pricing_bad_1: "QA manual: 3-5 días por municipio",
        pricing_bad_2: "Errores topológicos sin detectar",
        pricing_bad_3: "Cruce SNR manual (propenso a error)",
        pricing_bad_4: "Reportes en Excel sin estándar",
        pricing_bad_5: "Sin trazabilidad sobre historia de mutaciones",
        pricing_good_1: "Validación automática en minutos",
        pricing_good_2: "Motor topológico LADM-COL V3",
        pricing_good_3: "Cruce matricular automático SNR",
        pricing_good_4: "PDF Técnico y GeoJSON certificado",
        pricing_good_5: "Trazabilidad completa de cada predio",

        plan_starter_tier: "STARTER_CORE",
        plan_starter_name: "Explorador Espacial",
        plan_starter_for: "Para profesionales SIG, técnicos y estudiantes avanzados.",
        plan_starter_price: "$0",
        plan_starter_period: "/mes · Gratis por Siempre",
        plan_starter_cap: "Capacidad: 5,000 predios/capa",
        plan_starter_feat_1: "Validación topológica LADM-COL básica",
        plan_starter_feat_2: "Hasta 5,000 predios por capa",
        plan_starter_feat_3: "5 Reportes Geo-LLM / día",
        plan_starter_feat_4: "Visor GIS interactivo embebido",
        plan_starter_no_1: "Cruce Físico-Jurídico SNR",
        plan_starter_no_2: "API FastAPI para automatización",
        plan_starter_no_3: "Soporte técnico premium",
        plan_starter_btn: "Comenzar Gratis",

        plan_pro_tier: "INTERVENTORÍA_PRO",
        plan_pro_name: "Spatial Pro",
        plan_pro_for: "Para contratos de empalme, QA/QC masivo y equipos técnicos.",
        plan_pro_price: "$10",
        plan_pro_period: "/mes · por usuario",
        plan_pro_cap: "Capacidad: Ilimitada ∞",
        plan_pro_feat_1: "Predios ilimitados (.shp / .gpkg)",
        plan_pro_feat_2: "Cruce Matricular SNR automático (Excel)",
        plan_pro_feat_3: "Reportes PDF técnicos certificados",
        plan_pro_feat_4: "FastAPI para automatización completa",
        plan_pro_feat_5: "Export GeoJSON + PostGIS ready",
        plan_pro_feat_6: "Dashboard de analítica en tiempo real",
        plan_pro_feat_7: "Soporte técnico prioritario 48h",
        plan_pro_btn: "Adquirir Licencia Pro",
        plan_pro_trust: "🔒 Pago seguro · Cancela cuando quieras",

        plan_gov_tier: "NODO_GUBERNAMENTAL",
        plan_gov_name: "Nivel Soberano",
        plan_gov_for: "Para Oficinas de Catastro, IGAC, Alcaldías y grandes contratistas.",
        plan_gov_price: "Personalizado",
        plan_gov_period: "/proyecto · On-prem disponible",
        plan_gov_cap: "Escala Empresarial · Infra Dedicada",
        plan_gov_feat_1: "Despliegue On-Premises (servidores propios)",
        plan_gov_feat_2: "Integración SGDEA / Rentas municipales",
        plan_gov_feat_3: "Modelos Geo-LLM ajustados al municipio",
        plan_gov_feat_4: "Capacitación presencial del equipo SIG",
        plan_gov_feat_5: "SLA técnico garantizado (72h respuesta)",
        plan_gov_feat_6: "White-label: marca propia del municipio",
        plan_gov_feat_7: "Acceso total al código fuente (licencia)",
        plan_gov_btn: "Contactar Arquitecto",
        plan_gov_trust: "Respuesta en < 24h · NDA disponible",

        // Contact
        contact_label: "Iniciar Proyecto",
        contact_title: "Hablemos de su<br>próximo proyecto.",
        contact_desc: "Arquitectando la próxima generación de inteligencia espacial. Hablemos de su proyecto, municipio o desafío SIG empresarial.",
        contact_email_label: "Correo",
        contact_loc_label: "Ubicación",
        contact_linkedin_label: "LinkedIn",
        contact_github_label: "GitHub",
        form_name: "Nombre_Completo",
        form_placeholder_name: "Organización / Arquitecto Líder",
        form_email: "Enlace_Email",
        form_service: "Tipo_de_Servicio",
        form_service_select: "— Seleccionar Servicio —",
        form_svc_1: "Automatización SIG y Pipeline ETL",
        form_svc_2: "QA/QC Catastral (LADM-COL)",
        form_svc_3: "Tablero GIS Empresarial",
        form_svc_4: "GeoAI / Análisis Satelital",
        form_svc_5: "Proyecto Gubernamental / Municipal",
        form_svc_6: "Otro / Consultoría",
        form_msg: "Breve_de_Misión",
        form_placeholder_msg: "Defina parámetros y objetivos de la misión...",
        form_btn: "INICIAR_HANDSHAKE",

        // Footer
        footer_copy: "© 2026 ALBERT DANIEL GAVIRIA ZAPATA. TODOS LOS DERECHOS RESERVADOS.",

        boot_1: "DGZ_OS_v5.2_SOBERANO [INICIANDO_SECUENCIA_ARRANQUE]",
        boot_2: "Montando Motor Vectorial PostGIS... OK",
        boot_3: "Inicializando Matriz de Validación LADM-COL...",
        boot_4: "Hidratando Capas de Inteligencia Espacial...",
        boot_5: "Estado Proxy Geo-LLM... CONECTADO",
        boot_6: "DGZ_CORE: Desencriptando Credenciales Soberanas...",
        boot_7: "ACCESO_CONCEDIDO: Bienvenido, Ingeniero Zapata.",

        demo_btn_run: "EJECUTAR_DEMO_VALIDACIÓN",
        demo_btn_processing: "PROCESANDO_NODOS...",
        demo_log_1: "[MOTOR] Inicializando reglas LADM-COL V3...",
        demo_log_2: "Extrayendo geometrías vía GeoPandas...",
        demo_log_3: "Comprobando matriz de traslapes (O(n log n))...",
        demo_log_4: "Analizando polígonos astilla < 0.05m2...",
        demo_log_5: "CONSULTANDO_MOTOR_DGZ: PASA"
    }
};

class DGZCore {
    constructor() {
        this.lang = localStorage.getItem('dgz_lang') || 'es';
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.injectHeader();
            this.applyTranslations();
            this.setupListeners();

            // Fast-load check: if skip_intro is in URL or was recently seen
            if (window.location.search.includes('skip_intro') || sessionStorage.getItem('dgz_skip_intro')) {
                const intro = document.getElementById('terminal-intro');
                if (intro) intro.classList.add('hidden');
                this.startTelemetry();
            } else {
                this.handleTerminal();
            }

            this.setupMouseTracking();
        });
    }

    setupMouseTracking() {
        let ticking = false;
        document.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const x = (e.clientX / window.innerWidth) * 100;
                    const y = (e.clientY / window.innerHeight) * 100;
                    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
                    document.documentElement.style.setProperty('--mouse-y', `${y}%`);

                    const cursor = document.querySelector('.cursor-main');
                    const trail = document.querySelector('.cursor-trail');
                    if (cursor && trail) {
                        cursor.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
                        trail.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    async handleTerminal() {
        const terminal = document.getElementById('terminal-content');
        if (!terminal) return;

        // Reset terminal
        terminal.innerHTML = '';
        const t = dgzTranslations[this.lang];

        const lines = [
            { text: t.boot_1, color: "var(--accent-cyan)" },
            { text: t.boot_2, color: "#fff" },
            { text: t.boot_3, color: "#fff" },
            { text: t.boot_4, color: "#fff" },
            { text: t.boot_5, color: "var(--status-ok)" },
            { text: t.boot_6, color: "#fff" },
            { text: t.boot_7, color: "var(--accent-electric)" }
        ];

        for (const line of lines) {
            const div = document.createElement('div');
            div.className = 'terminal-line';
            div.style.color = line.color;
            terminal.appendChild(div);

            for (let i = 0; i < line.text.length; i++) {
                div.textContent += line.text[i];
                await new Promise(r => setTimeout(r, 10));
            }
            await new Promise(r => setTimeout(r, 200));
        }

        setTimeout(() => {
            const intro = document.getElementById('terminal-intro');
            if (intro) intro.classList.add('hidden');
            sessionStorage.setItem('dgz_skip_intro', 'true');
            this.startTelemetry();
        }, 800);
    }

    startTelemetry() {
        const latency = document.getElementById('tele-latency');
        if (!latency) return;

        setInterval(() => {
            const ms = Math.floor(Math.random() * 15) + 5;
            latency.textContent = `${ms}ms`;
        }, 3000);
    }

    injectHeader() {
        // Prevent double injection
        if (document.getElementById('dgz-global-header')) return;

        const header = document.createElement('header');
        header.id = 'dgz-global-header';
        header.className = 'dgz-nav-master';

        const isSubDir = window.location.pathname.includes('/projects/') || window.location.pathname.includes('/lab/');
        const rootPath = isSubDir ? (window.location.pathname.includes('/projects/') ? '../../' : '../') : './';

        header.innerHTML = `
            <div class="nav-blur-bg"></div>
            <div class="nav-content">
                <a href="${rootPath}index.html" class="nav-logo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-electric)" stroke-width="2.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>DGZ <span class="hide-mobile">ENGINEERING</span></span>
                </a>

                <nav class="nav-links">
                    <a href="${rootPath}index.html" class="nav-link" data-i18n="nav_home">Nucleus</a>
                    <div class="nav-dropdown">
                        <span class="nav-link" data-i18n="nav_lab">Spatial Lab <i class="ph ph-caret-down"></i></span>
                        <div class="dropdown-content">
                            <a href="${rootPath}lab/validator.html" data-i18n="nav_validator">Command Center</a>
                            <a href="${rootPath}lab/map.html" data-i18n="nav_map">Intel Map</a>
                        </div>
                    </div>
                    <div class="nav-dropdown">
                        <span class="nav-link" data-i18n="nav_projects">Assets <i class="ph ph-caret-down"></i></span>
                        <div class="dropdown-content">
                            <a href="${rootPath}projects/geo-llm/index.html" data-i18n="proj_geo_llm">Geo-LLM</a>
                            <a href="${rootPath}projects/automation-systems/index.html" data-i18n="proj_automation">Automation</a>
                            <a href="${rootPath}projects/gis-dashboard/index.html" data-i18n="proj_gis_dash">Dashboard</a>
                            <a href="${rootPath}projects/qgis-plugin/index.html" data-i18n="proj_qgis">QGIS Plugin</a>
                            <a href="${rootPath}projects/research/index.html" data-i18n="proj_research">Research</a>
                        </div>
                    </div>
                </nav>

                <div class="nav-actions">
                    <div class="system-status hide-mobile">
                        <span class="status-dot"></span>
                        <span data-i18n="system_status">SYSTEM_OK</span>
                    </div>
                    <button class="lang-toggle-btn" id="dgz-lang-toggle">
                        <i class="ph ph-globe"></i>
                        <span id="lang-label">${this.lang.toUpperCase() === 'EN' ? 'ES' : 'EN'}</span>
                    </button>
                </div>
            </div>
        `;

        document.body.prepend(header);
        this.addStyles();
    }

    addStyles() {
        if (document.getElementById('dgz-core-styles')) return;
        const style = document.createElement('style');
        style.id = 'dgz-core-styles';
        style.textContent = `
            .dgz-nav-master {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 60px;
                z-index: 9999;
                display: flex;
                align-items: center;
                color: #fff;
            }
            .nav-blur-bg {
                position: absolute;
                inset: 0;
                background: rgba(3, 3, 5, 0.8);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(0, 229, 255, 0.2);
            }
            .nav-content {
                position: relative;
                width: 100%;
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 100%;
            }
            .nav-logo {
                display: flex;
                align-items: center;
                gap: 10px;
                text-decoration: none;
                color: #fff;
                font-weight: 900;
                letter-spacing: 1px;
                font-size: 0.9rem;
            }
            .nav-links {
                display: flex;
                gap: 2rem;
                align-items: center;
            }
            .nav-link {
                text-decoration: none;
                color: rgba(255,255,255,0.7);
                font-family: var(--font-mono, monospace);
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: 0.3s;
                position: relative;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .nav-link:hover, .nav-link.active {
                color: var(--accent-electric, #00e5ff);
            }
            .nav-dropdown {
                position: relative;
            }
            .dropdown-content {
                position: absolute;
                top: 100%;
                left: 0;
                background: #0A0A0F;
                border: 1px solid rgba(0, 229, 255, 0.2);
                border-radius: 8px;
                min-width: 200px;
                padding: 0.5rem;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: 0.3s;
                box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            }
            .nav-dropdown:hover .dropdown-content {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            .dropdown-content a {
                display: block;
                padding: 0.6rem 1rem;
                color: rgba(255,255,255,0.6);
                text-decoration: none;
                font-size: 0.7rem;
                font-family: var(--font-mono, monospace);
                text-transform: uppercase;
                border-radius: 4px;
            }
            .dropdown-content a:hover {
                background: rgba(0, 229, 255, 0.1);
                color: var(--accent-electric, #00e5ff);
            }
            .nav-actions {
                display: flex;
                align-items: center;
                gap: 1.5rem;
            }
            .system-status {
                display: flex;
                align-items: center;
                gap: 8px;
                font-family: var(--font-mono, monospace);
                font-size: 0.6rem;
                color: rgba(255,255,255,0.4);
            }
            .status-dot {
                width: 6px;
                height: 6px;
                background: #4ade80;
                border-radius: 50%;
                box-shadow: 0 0 10px #4ade80;
            }
            .lang-toggle-btn {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                color: #fff;
                padding: 5px 12px;
                border-radius: 20px;
                cursor: pointer;
                font-family: var(--font-mono, monospace);
                font-size: 0.7rem;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: 0.3s;
            }
            .lang-toggle-btn:hover {
                border-color: var(--accent-electric, #00e5ff);
                background: rgba(0, 229, 255, 0.1);
            }
            @media (max-width: 768px) {
                .hide-mobile { display: none; }
                .nav-links { gap: 1rem; }
            }
        `;
        document.head.appendChild(style);
    }

    setupListeners() {
        const btn = document.getElementById('dgz-lang-toggle');
        if (btn) {
            btn.addEventListener('click', () => {
                this.lang = this.lang === 'en' ? 'es' : 'en';
                localStorage.setItem('dgz_lang', this.lang);
                document.getElementById('lang-label').textContent = this.lang === 'en' ? 'ES' : 'EN';
                this.applyTranslations();
                window.dispatchEvent(new CustomEvent('dgzLangChanged', { detail: this.lang }));
            });
        }
    }

    applyTranslations() {
        const t = dgzTranslations[this.lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = t[key];
                } else if (el.tagName === 'SELECT') {
                    // Logic for select options if needed
                } else {
                    el.innerHTML = t[key];
                }
            }
        });
        document.documentElement.lang = this.lang;
    }
}

// Global instance
window.dgzCore = new DGZCore();

// Support for the Inline Demo in index.html
async function runCadastralValidation() {
    const btn = document.getElementById('run-validator');
    const output = document.getElementById('validator-output');
    if (!btn || !output) return;

    const currentLang = localStorage.getItem('dgz_lang') || 'es';
    const t = dgzTranslations[currentLang];

    btn.disabled = true;
    btn.textContent = t.demo_btn_processing;
    output.innerHTML = `<div style="color:var(--accent-cyan)">${t.demo_log_1}</div>`;

    const phases = [
        { t: t.demo_log_2, c: "#fff" },
        { t: t.demo_log_3, c: "#fff" },
        { t: t.demo_log_4, c: "#fff" },
        { t: t.demo_log_5, c: "var(--status-ok)" }
    ];

    for (const p of phases) {
        await new Promise(r => setTimeout(r, 1200));
        const line = document.createElement('div');
        line.style.color = p.c;
        line.textContent = `> ${p.t}`;
        output.appendChild(line);
    }

    btn.textContent = "VALIDATION_COMPLETE";
    btn.style.background = "var(--status-ok)";
    btn.style.color = "#000";
}

window.runCadastralValidation = runCadastralValidation;
