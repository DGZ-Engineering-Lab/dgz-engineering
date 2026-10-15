// Base de datos comercial y técnica de los 10 servicios de DevGiz

export const SERVICES_DATA = {
  "gis-geointelligence": {
    id: "SVC-C1-01",
    slug: "gis-geointelligence",
    title: "GIS & GEOINTELLIGENCE",
    capa: "capa-1",
    capaLabel: "INTELIGENCIA (CORE)",
    tagline: "Inteligencia Territorial Soberana en Tiempo Real",
    theme: "cyan",
    iconName: "Globe",
    concept: "Convertimos datos geográficos crudos en inteligencia estratégica accionable para la planeación urbana, la administración catastral y la toma de decisiones corporativas avanzadas.",
    metrics: [
      { label: "Tiempo de Carga", value: "< 2s" },
      { label: "Precisión Cartográfica", value: "Subcentimétrica" },
      { label: "Cumplimiento Normativo", value: "100%" }
    ],
    problemSolved: "Las entidades territoriales e industrias a menudo operan con cartografía desactualizada, bases de datos geográficas fragmentadas e incompatibilidades entre sistemas que retrasan trámites y causan imprecisiones jurídicas.",
    solution: "Integramos visores WebGIS de alto rendimiento y motores espaciales vectorizados que consolidan toda la dinámica del territorio bajo estándares internacionales abiertos y soberanos.",
    useCases: [
      {
        title: "Catastro Multipropósito Municipal",
        desc: "Implementación del modelo LADM-COL v3.0 para la administración eficiente y recaudo fiscal optimizado en entes territoriales."
      },
      {
        title: "Inteligencia de Localización (Retail/Real Estate)",
        desc: "Análisis espacial multicriterio para determinar la ubicación ideal de nuevos activos y predecir el comportamiento del mercado local."
      },
      {
        title: "Gestión de Servicios Públicos y Redes",
        desc: "Mapeo inteligente y enrutamiento automatizado para el mantenimiento de redes de servicios e infraestructura crítica."
      }
    ],
    specs: {
      inputs: ["Shapefiles (.shp)", "GeoJSON", "GeoPackage (.gpkg)", "KML/KMZ", "Rásters (TIFF/DEM)"],
      outputs: ["Visores WebGIS Interactivos", "Archivos GML Estructurados", "APIs OGC (WMS, WFS)", "Archivos .XTF (INTERLIS)"],
      compliance: ["ISO 19152 (LADM)", "Estándar LADM-COL v3.0 (IGAC/SNR)", "Open Geospatial Consortium (OGC)", "ICDE (Infraestructura de Datos Espaciales de Colombia)"],
      architecture: "Arquitectura basada en visores livianos React alimentados por teselas vectoriales en caché geodistribuida, interactuando de forma asíncrona con bases de datos PostGIS centralizadas y optimizadas a través de APIs geoespaciales escalables."
    },
    marketplace: [
      {
        name: "Piloto WebGIS Municipal",
        // Precio confirmado por Daniel (2026-10-15).
        price: "COP 18.000.000",
        priceNote: "Precio fijo + IVA",
        // Anticipo por link de pago Wompi (sin backend). Si la variable no está
        // definida en Vercel, el botón de anticipo no se muestra.
        deposit: {
          percent: 40,
          amount: "COP 7.200.000",
          url: process.env.NEXT_PUBLIC_WOMPI_PILOTO_WEBGIS_URL || ""
        },
        duration: "4 Semanas",
        deliverables: [
          "Visor WebGIS básico para 1 zona",
          "Ingesta de hasta 5,000 predios",
          "1 Modelo de datos unificado",
          "Capacitación básica al equipo técnico"
        ]
      },
      {
        name: "Catastro Enterprise LADM-COL",
        price: "Consultar",
        duration: "12-16 Semanas",
        deliverables: [
          "Plataforma completa de Catastro Multipropósito",
          "Soporte estricto LADM-COL e INTERLIS",
          "Módulos avanzados de edición topológica",
          "Integración directa con bases de datos locales",
          "Soporte técnico preferente 24/7"
        ]
      },
      {
        name: "Soberanía On-Premise / Cloud Dedicado",
        price: "Custom",
        duration: "Variable",
        deliverables: [
          "Despliegue completo en nube soberana propia",
          "Código fuente bajo licenciamiento especializado",
          "Garantía de cumplimiento legal nacional absoluto",
          "Integraciones a la medida con SNR y catastros"
        ]
      }
    ]
  },

  "data-analytics-bi": {
    id: "SVC-C1-02",
    slug: "data-analytics-bi",
    title: "DATA ANALYTICS & BI",
    capa: "capa-1",
    capaLabel: "INTELIGENCIA (CORE)",
    tagline: "Decisiones Guiadas por Datos, Conectadas al Territorio",
    theme: "indigo",
    iconName: "BarChart3",
    concept: "Transformamos flujos masivos de datos crudos en dashboards ejecutivos de alto impacto, analítica predictiva y modelos estadísticos que maximizan la eficiencia operativa de tu negocio.",
    metrics: [
      { label: "Velocidad de Consulta", value: "< 5ms (Polars)" },
      { label: "Volumen de Datos", value: "Terabytes" },
      { label: "Automatización", value: "100% Desatendida" }
    ],
    problemSolved: "Las compañías acumulan millones de registros de operaciones, clientes o predios en hojas de cálculo y bases de datos aisladas, perdiendo de vista patrones críticos y demorando la toma de decisiones por reportes manuales lentos.",
    solution: "Construimos pipelines de analítica in-memory ultrarrápidos y tableros interactivos e integrales de Business Intelligence que actualizan y cruzan tus métricas clave de forma instantánea.",
    useCases: [
      {
        title: "Tablero de Control de Impacto Fiscal",
        desc: "Monitoreo en tiempo real de avalúos catastrales, recaudo de impuestos y proyecciones de inversión municipal."
      },
      {
        title: "Optimización de Operaciones en Campo",
        desc: "Dashboards analíticos del rendimiento de cuadrillas, tiempos de levantamiento y control de cuellos de botella en obra."
      },
      {
        title: "Análisis Predictivo de Demanda Comercial",
        desc: "Modelamiento estadístico cruzado con geolocalización para proyectar las zonas con mayor rentabilidad de distribución."
      }
    ],
    specs: {
      inputs: ["CSV / Excel masivos", "Parquet / Orc", "Bases de datos SQL/NoSQL", "APIs JSON/REST"],
      outputs: ["Tableros Interactivos (BI)", "Modelos Parquet particionados", "Reportes PDF automatizados", "Alertas en tiempo real (Slack/Email)"],
      compliance: ["ISO/IEC 27001 (Seguridad)", "GDPR / Ley 1581 (Habeas Data)", "Estándares OGC para metadatos analíticos"],
      architecture: "Pipelines de datos vectorizados con Polars y DuckDB para consultas analíticas ultrarrápidas, desplegados sobre servidores distribuidos e integrados de forma nativa en visores ejecutivos web con animaciones interactivas."
    },
    marketplace: [
      {
        name: "Dashboard Táctico Inicial",
        price: "Consultar",
        duration: "3 Semanas",
        deliverables: [
          "Integración de 2 fuentes de datos",
          "1 Tablero interactivo con 4 visualizaciones",
          "Pipeline básico de actualización diaria",
          "Entrega de manual de usuario digital"
        ]
      },
      {
        name: "Enterprise Analytics Hub",
        price: "Consultar",
        duration: "8-10 Semanas",
        deliverables: [
          "Integración masiva multiorigen",
          "Arquitectura con Polars y DuckDB integrada",
          "Dashboards interactivos jerárquicos",
          "Automatización completa de alertas operativas",
          "Mantenimiento y soporte preventivo por 6 meses"
        ]
      }
    ]
  },

  "ia-automatizacion": {
    id: "SVC-C1-03",
    slug: "ia-automatizacion",
    title: "IA & AUTOMATIZACIÓN",
    capa: "capa-1",
    capaLabel: "INTELIGENCIA (CORE)",
    tagline: "El Siguiente Nivel de Automatización Territorial",
    theme: "purple",
    iconName: "Brain",
    concept: "Diseñamos e implementamos modelos de IA aplicada para clasificar imágenes satelitales, automatizar tareas documentales catastrales y agilizar procesos operacionales técnicos mediante agentes cognitivos.",
    metrics: [
      { label: "Precisión de Modelos", value: "95% (Computer Vision)" },
      { label: "Reducción de Tiempos", value: "Hasta 85%" },
      { label: "Soporte Cognitivo", value: "24/7 Autónomo" }
    ],
    problemSolved: "Procesos manuales como la detección de construcciones informales, la digitalización de folios de registro o el análisis de inconsistencias topológicas consumen miles de horas hombre y conllevan a errores costosos.",
    solution: "Desplegamos modelos avanzados de visión artificial, procesamiento de lenguaje natural y agentes inteligentes que automatizan los flujos de datos del territorio sin intervención manual.",
    useCases: [
      {
        title: "Detección de Cambios de Cobertura y Construcción",
        desc: "Visión artificial aplicada a ortofotos para identificar de manera automática nuevas edificaciones o ampliaciones no declaradas."
      },
      {
        title: "Procesamiento Inteligente de Títulos de Tierras",
        desc: "Extracción automática de cabidas, linderos y folios inmobiliarios a partir de PDFs escaneados utilizando modelos NLP adaptados."
      },
      {
        title: "Agentes de Soporte Técnico Territorial",
        desc: "Agentes cognitivos interactivos con conexión a bases geográficas para resolver dudas de ordenamiento territorial al instante."
      }
    ],
    specs: {
      inputs: ["Imágenes Satelitales (TIF/JPG)", "Documentos PDF/Escaneados", "Folios de Registro (SNR)", "Textos en Lenguaje Natural"],
      outputs: ["Polígonos de Construcción Identificados", "Base de datos estructurada con datos de escrituras", "Agentes de Chat Inteligentes", "Alertas y clasificaciones predictivas"],
      compliance: ["Ethics Guidelines for Trustworthy AI", "ISO/IEC 42001 (Inteligencia Artificial)", "Estándares de interoperabilidad de la ICDE"],
      architecture: "Modelos neuronales convolucionales (CNN) y transformadores (LLM) alojados en infraestructuras GPU de alto rendimiento, orquestados mediante FastMCP y FastAPI para interactuar dinámicamente con los sistemas centrales del cliente."
    },
    marketplace: [
      {
        name: "Prueba de Concepto (PoC) IA",
        price: "Consultar",
        duration: "5 Semanas",
        deliverables: [
          "Entrenamiento del modelo con datos de muestra",
          "Dashboard interactivo para validación del modelo",
          "Reporte detallado de precisión y falsos positivos",
          "Plan de escalamiento a producción"
        ]
      },
      {
        name: "Sistema Automatizado de Producción",
        price: "Consultar",
        duration: "12-16 Semanas",
        deliverables: [
          "Integración nativa del pipeline de IA en sistemas locales",
          "Consumo API asíncrono y escalable",
          "Modelo de autoaprendizaje con datos históricos",
          "Soporte preferente de ingeniería y mantenimiento"
        ]
      }
    ]
  },

  "arquitectura-inteligente": {
    id: "SVC-C2-01",
    slug: "arquitectura-inteligente",
    title: "ARQUITECTURA INTELIGENTE",
    capa: "capa-2",
    capaLabel: "SOLUCIONES (SECTORES)",
    tagline: "Arquitectura Basada en Datos y Gemelos Digitales",
    theme: "blue",
    iconName: "Building",
    concept: "Planificamos, diseñamos y modelamos proyectos de edificación integrando datos geográficos en tiempo real y gemelos digitales BIM que optimizan costos, sostenibilidad y cumplimiento legal.",
    metrics: [
      { label: "Optimización BIM", value: "Clash Detection 100%" },
      { label: "Ahorro en Construcción", value: "Hasta 15%" },
      { label: "Integridad del Entorno", value: "Exactitud GIS" }
    ],
    problemSolved: "Muchos diseños conceptuales de arquitectura fallan al integrarse con la topografía real, provocando sobrecostos por movimientos de tierras inesperados, problemas de linderos legales o retrasos en licencias de construcción.",
    solution: "Fusionamos el modelado conceptual clásico con geodatabases de alta precisión y gemelos digitales BIM, permitiendo validar la viabilidad física, ambiental y jurídica de cada diseño desde el primer día.",
    useCases: [
      {
        title: "Diseño Urbano Basado en Datos",
        desc: "Modelado de conjuntos residenciales o comerciales interactuando dinámicamente con las determinantes ambientales y viales de la zona."
      },
      {
        title: "Gemelos Digitales de Edificios Institucionales",
        desc: "Modelos BIM enriquecidos con sensores en tiempo real para optimizar la administración y mantenimiento del activo físico."
      },
      {
        title: "Regularización Catastral de Estructuras Complejas",
        desc: "Planimetría digital 3D precisa de edificios de propiedad horizontal para el cargue directo en el modelo LADM-COL."
      }
    ],
    specs: {
      inputs: ["Estudios de Suelos", "Nubes de Puntos LiDAR", "Parámetros Urbanísticos del POT", "Conceptos de Diseño"],
      outputs: ["Modelos BIM (Revit/IFC)", "Planimetría Digital e Implantes", "Renders e Immersiones 3D", "Estudios Geotécnicos e Hidrológicos"],
      compliance: ["Estándares ISO 19650 (BIM)", "Norma Sismo Resistente NSR-10", "Planes de Ordenamiento Territorial (POT) locales", "LADM-COL v3.0 (Submodelo de Construcción)"],
      architecture: "Flujos coordinados utilizando Revit, Civil 3D y ArcGIS Pro, vinculando modelos geométricos paramétricos directamente con bases de datos espaciales y plataformas web de visualización en 3D interactivo."
    },
    marketplace: [
      {
        name: "Diseño Conceptual Integrado",
        price: "Consultar",
        duration: "6 Semanas",
        deliverables: [
          "Planimetría digital y volumetría 3D inicial",
          "Implantación en entorno real geoespacial",
          "Análisis preliminar de afectaciones urbanísticas",
          "3 Renders del exterior del proyecto"
        ]
      },
      {
        name: "Gemelo Digital Completo (BIM-GIS)",
        price: "Consultar",
        duration: "Variable",
        deliverables: [
          "Modelo BIM coordinado (arquitectura, estructura, MEP)",
          "Integración en visor WebGIS corporativo",
          "Detección automática de colisiones y vacíos",
          "Base de datos de activos lista para operación (FM)"
        ]
      }
    ]
  },

  "infraestructura-vial-digital": {
    id: "SVC-C2-02",
    slug: "infraestructura-vial-digital",
    title: "INFRAESTRUCTURA VIAL DIGITAL",
    capa: "capa-2",
    capaLabel: "SOLUCIONES (SECTORES)",
    tagline: "Corredores Viales Soportados por Datos de Alta Precisión",
    theme: "emerald",
    iconName: "Route",
    concept: "Planificamos, monitoreamos y auditamos proyectos viales complejos mediante topografía láser, fotogrametría aérea y monitoreo de avance de obra en tiempo real.",
    metrics: [
      { label: "Precisión de Pendiente", value: "< 0.5%" },
      { label: "Frecuencia de Monitoreo", value: "Semanal" },
      { label: "Control de Volúmenes", value: "Tolerancia subcentimétrica" }
    ],
    problemSolved: "El desarrollo de infraestructura vial suele enfrentar desviaciones presupuestarias críticas debido a cálculos erróneos en el movimiento de tierras, falta de inventarios viales precisos e ineficiencia en el control de contratistas.",
    solution: "Implementamos sistemas de supervisión geoespacial de alta frecuencia, generando modelos digitales del terreno precisos (LiDAR y Drones) para auditar cada fase de la obra y controlar la inversión.",
    useCases: [
      {
        title: "Inventario Vial Digital de Redes Municipales",
        desc: "Mapeo y catalogación interactiva del estado del pavimento, señalización, alcantarillado y mobiliario de corredores viales."
      },
      {
        title: "Monitoreo y Cubicidad en Concesiones Viales",
        desc: "Cálculo preciso del volumen de corte e implantación de terraplenes para auditoría externa en consorcios de infraestructura."
      },
      {
        title: "Diseño de Trazados e Hidrología Vial",
        desc: "Simulaciones geomorfológicas e hidrológicas sobre modelos digitales del terreno para evitar inundaciones o deslizamientos."
      }
    ],
    specs: {
      inputs: ["Nubes de Puntos (LAS/LAZ)", "Fotografías Aéreas", "Trazados de Diseño (Civil 3D)", "Datos de Campo GNSS RTK"],
      outputs: ["Modelos Digitales del Terreno (DTM/DSM)", "Cálculos de Volúmenes y Excavación", "Inventario en Base de Datos Geográfica", "Ortofotos de Alta Resolución"],
      compliance: ["Especificaciones del INVIAS", "Manual de Diseño Geométrico de Carreteras", "Estándares OGC para elevación digital", "Estándares de la ICDE para georreferenciación"],
      architecture: "Procesamiento masivo de nubes de puntos de millones de vértices para generar curvas de nivel e implantes digitales precisos, integrándose con tableros interactivos viales que muestran el estado del proyecto a los stakeholders."
    },
    marketplace: [
      {
        name: "Auditoría Vial Inicial (LiDAR/Fotogrametría)",
        price: "Consultar",
        duration: "4 Semanas",
        deliverables: [
          "Levantamiento aéreo de hasta 10 km de vía",
          "Modelo Digital de Terreno (DTM)",
          "Ortofotomosaico detallado",
          "Informe técnico de cubicación preliminar"
        ]
      },
      {
        name: "Supervisión de Obra Vial Continua",
        price: "Consultar",
        duration: "Mensual",
        deliverables: [
          "Vuelos de dron periódicos según cronograma",
          "Comparativa de avance físico vs teórico en 3D",
          "Monitoreo de movimientos de tierras continuo",
          "Acceso a plataforma web de control de obra"
        ]
      }
    ]
  },

  "agricultura-precision": {
    id: "SVC-C2-03",
    slug: "agricultura-precision",
    title: "AGRICULTURA DE PRECISIÓN",
    capa: "capa-2",
    capaLabel: "SOLUCIONES (SECTORES)",
    tagline: "Maximiza el Rendimiento Agrícola Mediante Inteligencia Territorial",
    theme: "teal",
    iconName: "Sprout",
    concept: "Optimizamos el rendimiento de cultivos y la eficiencia de insumos mediante teledetección satelital, análisis multiespectral con drones, zonificación de suelos y modelos predictivos climáticos.",
    metrics: [
      { label: "Ahorro de Agroinsumos", value: "Hasta 20%" },
      { label: "Precisión de Mapeo", value: "Hasta 5 cm/pixel" },
      { label: "Aumento de Productividad", value: "10% - 15%" }
    ],
    problemSolved: "Los productores agrícolas aplican fertilizantes, agua y plaguicidas de forma uniforme en todo el lote, ignorando la variabilidad interna de los suelos. Esto incrementa costos ambientales y reduce la productividad global.",
    solution: "Desplegamos un sistema analítico que sectoriza tus campos según su salud foliar, humedad de suelo e índices de nitrógeno, aplicando insumos únicamente donde y cuando se necesitan.",
    useCases: [
      {
        title: "Monitoreo Satelital de Cultivos a Escala",
        desc: "Seguimiento periódico del índice NDVI para alertar de forma temprana anomalías de crecimiento en grandes plantaciones agrícolas."
      },
      {
        title: "Detección de Estrés Hídrico con Drones Térmicos",
        desc: "Vuelos multiespectrales para identificar deficiencias de riego o acumulación de agua antes de que afecten la cosecha."
      },
      {
        title: "Zonificación y Mapeo de Aptitud de Suelos",
        desc: "Análisis físico-químico cruzado con variables topográficas para planificar la siembra del tipo de cultivo ideal en cada zona."
      }
    ],
    specs: {
      inputs: ["Imágenes Satelitales Sentinel/Landsat", "Imágenes Multiespectrales (Drones)", "Datos de Estaciones Meteorológicas", "Análisis de Suelos Georreferenciados"],
      outputs: ["Mapas de Índices de Vegetación (NDVI, NDRE, SAVI)", "Mapas de Prescripción de Aplicación Variable", "Reportes de Salud Foliar y Estrés", "Modelos de Dinámica Hídrica"],
      compliance: ["Directrices globales de Agricultura Sostenible", "Normas OGC para coberturas de la tierra", "Estándares del IDEAM para información hidroclimática"],
      architecture: "Procesamiento automatizado de bandas multiespectrales en la nube con Python y librerías científicas, generando capas ráster optimizadas que se integran en aplicaciones de campo offline para los agrónomos."
    },
    marketplace: [
      {
        name: "Plan de Monitoreo Satelital Anual",
        price: "Consultar",
        duration: "Anual",
        deliverables: [
          "Monitoreo satelital cada 5-8 días (libre de nubes)",
          "Tablero web de visualización de índices NDVI",
          "Alertas automáticas de anomalías foliares",
          "4 Reportes analíticos de rendimiento estacionales"
        ]
      },
      {
        name: "Diagnóstico Multiespectral Intensivo (Dron)",
        price: "Consultar",
        duration: "3 Semanas",
        deliverables: [
          "Vuelo multiespectral de hasta 100 hectáreas",
          "Mapas de resolución ultra-alta (5 cm/px) de NDVI y NDRE",
          "Mapa de prescripción para fertilización variable",
          "Asesoría técnica presencial con agrónomo especialista"
        ]
      }
    ]
  },

  "gestion-ambiental-inteligente": {
    id: "SVC-C2-04",
    slug: "gestion-ambiental-inteligente",
    title: "GESTIÓN AMBIENTAL INTELIGENTE",
    capa: "capa-2",
    capaLabel: "SOLUCIONES (SECTORES)",
    tagline: "Sostenibilidad Territorial Respaldada por Datos Empíricos",
    theme: "teal",
    iconName: "Wind",
    concept: "Monitoreamos variables ambientales críticas, evaluamos impactos de proyectos sobre ecosistemas y garantizamos el cumplimiento normativo mediante modelado geoespacial y sensores continuos.",
    metrics: [
      { label: "Monitoreo Forestal", value: "100% Automatizado" },
      { label: "Detección de Deforestación", value: "< 24h" },
      { label: "Precisión de Afectación", value: "Submétrica" }
    ],
    problemSolved: "Las empresas enfrentan sanciones severas, retrasos en licenciamientos y riesgos reputacionales debido a la falta de monitoreo continuo de sus impactos ambientales y a la dificultad para justificar la sostenibilidad de sus proyectos.",
    solution: "Desplegamos un ecosistema de monitoreo geoespacial continuo, cruzando imágenes satelitales, estaciones de campo y análisis de coberturas vegetales para garantizar la sostenibilidad y el cumplimiento de las normas.",
    useCases: [
      {
        title: "Monitoreo Multitemporal de Deforestación",
        desc: "Detección temprana de pérdida de bosques nativos y cambios no autorizados en el uso de la tierra en reservas naturales."
      },
      {
        title: "Evaluación de Impacto Ambiental para Licencias",
        desc: "Estudios territoriales complejos integrando fauna, flora, hidrología y geología bajo parámetros exigidos por la ANLA."
      },
      {
        title: "Gestión de Cuencas y Recursos Hídricos",
        desc: "Modelado dinámico de escorrentías, calidad del agua y disponibilidad hídrica en subcuencas abastecedoras de acueductos."
      }
    ],
    specs: {
      inputs: ["Imágenes Multiespectrales e Hiperspectrales", "Datos de Estaciones Hidrométricas", "Inventarios de Cobertura Terrestre", "POT y Áreas Protegidas (RUNAP)"],
      outputs: ["Mapas de Cobertura Corine Land Cover", "Estudios de Impacto Ambiental (EIA)", "Modelos de Dinámica de Inundación", "Reportes de Alertas de Deforestación"],
      compliance: ["Directrices de la ANLA (Colombia)", "Normativas del Ministerio de Ambiente y Desarrollo Sostenible", "Metodología Corine Land Cover Adaptada para Colombia", "Estándares ISO 14001 (Gestión Ambiental)"],
      architecture: "Flujos de análisis multiespectral continuo combinando procesamiento en la nube (Google Earth Engine) con bases de datos espaciales y visores web dinámicos accesibles para entes reguladores y equipos internos."
    },
    marketplace: [
      {
        name: "Estudio de Coberturas y Afectación Ambiental",
        price: "Consultar",
        duration: "5 Semanas",
        deliverables: [
          "Mapeo de coberturas bajo estándar Corine Land Cover",
          "Análisis multitemporal de cambios en los últimos 5 años",
          "Estudio de vulnerabilidad y riesgos ambientales",
          "Presentación del informe final con cartografía lista para radicar"
        ]
      },
      {
        name: "Sistema de Monitoreo y Sostenibilidad Continuo",
        price: "Consultar",
        duration: "Mensual",
        deliverables: [
          "Monitoreo satelital mensual de coberturas",
          "Alertas de deforestación o quemas en menos de 48 horas",
          "Reportes periódicos para corporaciones autónomas (CAR)",
          "Acceso a la plataforma web de monitoreo de pasivos ambientales"
        ]
      }
    ]
  },

  "devops-cloud-engineering": {
    id: "SVC-C3-01",
    slug: "devops-cloud-engineering",
    title: "DEVOPS & CLOUD ENGINEERING",
    capa: "capa-3",
    capaLabel: "TECNOLOGÍA (SOPORTE)",
    tagline: "Arquitectura Cloud Escalable para Soluciones Geoespaciales e IA",
    theme: "orange",
    iconName: "Cloud",
    concept: "Diseñamos, escalamos y operamos infraestructuras tecnológicas sumamente robustas en la nube, garantizando el 99.9% de disponibilidad, despliegues automáticos y seguridad perimetral estricta.",
    metrics: [
      { label: "Disponibilidad (SLA)", value: "99.9%" },
      { label: "Tiempos de Despliegue", value: "< 5 Minutos" },
      { label: "Seguridad de Datos", value: "Cifrado End-to-End" }
    ],
    problemSolved: "Sistemas catastrales y plataformas analíticas sufren caídas constantes durante periodos de alta demanda, presentan fugas de información sensible por malas configuraciones cloud o demoran semanas en desplegar actualizaciones menores.",
    solution: "Implementamos infraestructuras basadas en contenedores autogestionados y código parametrizado (IaC) con orquestadores de despliegue automatizado y observabilidad integrada.",
    useCases: [
      {
        title: "Escalamiento de Servidores GIS en Época de Recaudo",
        desc: "Configuración de autoescalado elástico en la nube para visores catastrales durante los meses de pago de impuesto predial."
      },
      {
        title: "Infraestructura Segura para Datos de Tierras (Zero-Trust)",
        desc: "Arquitectura cloud blindada con redes privadas virtuales y auditoría distribuida para proteger datos confidenciales del catastro nacional."
      },
      {
        title: "Pipelines de CI/CD para Equipos de Desarrollo Geo",
        desc: "Automatización completa que compila, prueba y despliega visualizadores y complementos GIS en servidores de prueba y producción al instante."
      }
    ],
    specs: {
      inputs: ["Configuración de Código de Infraestructura", "Repositorios de Código (Git)", "Políticas de Seguridad", "Requisitos de Carga"],
      outputs: ["Plantillas Terraform / Ansible", "Clústeres Kubernetes Operacionales", "Pipelines CI/CD (GitHub Actions / GitLab)", "Dashboards de Monitoreo (Grafana/Prometheus)"],
      compliance: ["ISO/IEC 27001 (Seguridad de la Información)", "Estándares SOC 2 Type II", "Lineamientos de Ciberseguridad del Gobierno Digital", "AWS / Azure Well-Architected Frameworks"],
      architecture: "Arquitectura cloud nativa desacoplada e inmutable escrita con Terraform, implementando contenedores Docker coordinados por clústeres Kubernetes con balanceo de carga global y encriptación de datos en reposo y tránsito."
    },
    marketplace: [
      {
        name: "Diseño y Setup de Infraestructura Cloud",
        price: "Consultar",
        duration: "5 Semanas",
        deliverables: [
          "Diseño de la arquitectura cloud multizona",
          "Setup completo de clústeres de base de datos y servidores",
          "Plantillas de Infraestructura como Código (IaC)",
          "1 Pipeline CI/CD automatizado de despliegue"
        ]
      },
      {
        name: "Soporte DevOps Enterprise & Monitoreo",
        price: "Consultar",
        duration: "Mensual",
        deliverables: [
          "Monitoreo proactivo 24/7 con sistemas de alertas",
          "Optimización mensual de costos de consumo en nube",
          "Administración de parches de seguridad y backups",
          "Soporte inmediato ante caídas del sistema (SLA < 30 min)"
        ]
      }
    ]
  },

  "drones-earth-data": {
    id: "SVC-C3-02",
    slug: "drones-earth-data",
    title: "DRONES & EARTH DATA",
    capa: "capa-3",
    capaLabel: "TECNOLOGÍA (SOPORTE)",
    tagline: "Captura de Datos del Mundo Real con Precisión Subcentimétrica",
    theme: "red",
    iconName: "Plane",
    concept: "Capturamos información geoespacial de ultra-alta definición mediante sensores aerotransportados LiDAR, cámaras fotogramétricas y sistemas térmicos operados por pilotos expertos.",
    metrics: [
      { label: "Precisión de Georreferencia", value: "Subcentimétrica (RTK)" },
      { label: "Densidad LiDAR", value: "> 100 puntos/m2" },
      { label: "Rendimiento de Vuelo", value: "Hasta 500 ha/día" }
    ],
    problemSolved: "La topografía tradicional por tierra para grandes extensiones de terreno es lenta, costosa y peligrosa en zonas de difícil acceso. Además, no captura el detalle volumétrico total requerido para ingeniería avanzada.",
    solution: "Desplegamos vehículos aéreos no tripulados (UAVs) equipados con sensores de última generación, capturando millones de puntos de datos en minutos con una precisión georreferenciada absoluta.",
    useCases: [
      {
        title: "Levantamiento Fotogramétrico de Zonas Urbanas",
        desc: "Ortofotos de ultra-alta definición para la identificación milimétrica de linderos, fachadas y elementos del espacio público."
      },
      {
        title: "Escaneo LiDAR de Bosques y Zonas con Alta Vegetación",
        desc: "Uso de pulsos láser que penetran la copa de los árboles para revelar el relieve real del terreno y planificar obras hidráulicas o viales."
      },
      {
        title: "Inspección Técnica de Activos Críticos e Industriales",
        desc: "Revisión térmica y visual detallada de líneas de alta tensión, puentes, torres e infraestructura de telecomunicaciones."
      }
    ],
    specs: {
      inputs: ["Planes de Vuelo Automatizados", "Puntos de Control Terrestre (GCPs)", "Coordenadas Base GNSS RTK", "Permisos Aeronáuticos"],
      outputs: ["Ortofotomosaicos Georreferenciados (TIF)", "Nubes de Puntos LiDAR (LAS/LAZ)", "Modelos 3D de Mallado de Texturas", "Modelos Digitales de Elevación (DEM)"],
      compliance: ["Reglamento RAC 91 de la Aerocivil (Colombia)", "Estándares de precisión de la ICDE", "Especificaciones técnicas del IGAC para cartografía básica", "Estándares OGC para nubes de puntos espaciales"],
      architecture: "Procesamiento de datos aéreos georreferenciados mediante potentes clústeres de fotogrametría digital y filtrado de nubes de puntos láser, exportando resultados estructurados directamente para su integración en sistemas GIS y BIM."
    },
    marketplace: [
      {
        name: "Levantamiento Fotogramétrico Inicial",
        price: "Consultar",
        duration: "3 Semanas",
        deliverables: [
          "Planificación y vuelo de dron de hasta 50 hectáreas",
          "Ortofotomosaico detallado georreferenciado (RTK)",
          "Modelo Digital del Terreno y Curvas de nivel",
          "Entrega de archivos en formatos estándar GIS (.shp, .tif)"
        ]
      },
      {
        name: "Levantamiento Completo LiDAR + 3D",
        price: "Consultar",
        duration: "Variable",
        deliverables: [
          "Vuelo LiDAR de alta densidad de puntos",
          "Clasificación completa de la nube de puntos (suelo, vegetación, estructuras)",
          "Modelado de terreno real filtrado sin vegetación",
          "Mallado 3D fotorrealista de estructuras de interés"
        ]
      }
    ]
  },

  "desarrollo-software": {
    id: "SVC-C3-03",
    slug: "desarrollo-software",
    title: "DESARROLLO DE SOFTWARE",
    capa: "capa-3",
    capaLabel: "TECNOLOGÍA (SOPORTE)",
    tagline: "Software de Élite Especializado en Datos Espaciales",
    theme: "pink",
    iconName: "Code",
    concept: "Diseñamos y programamos aplicaciones a la medida, plataformas WebGIS de alto desempeño y APIs robustas enfocadas en el geoprocesamiento, la automatización y el control de flujos de datos.",
    metrics: [
      { label: "Tiempos de Respuesta API", value: "< 15ms" },
      { label: "Seguridad de Código", value: "OWASP Top 10" },
      { label: "Arquitectura", value: "Escalable / Reactiva" }
    ],
    problemSolved: "Las organizaciones utilizan software GIS comercial que requiere costosas licencias anuales por usuario, o contratan software a medida tradicional que no sabe procesar datos espaciales masivos provocando caídas y lentitud crítica.",
    solution: "Desarrollamos sistemas a medida utilizando tecnologías ágiles y de alto rendimiento (Next.js, FastAPI, C++, Rust), optimizadas específicamente para almacenar, indexar y visualizar datos complejos de forma ultrarrápida.",
    useCases: [
      {
        title: "Plataformas WebGIS Corporativas Propietarias",
        desc: "Aplicaciones web completas que permiten a miles de usuarios consultar bases geográficas catastrales de forma concurrente sin pagar licencias de terceros."
      },
      {
        title: "Integraciones de Flujos de Datos IGAC-SNR",
        desc: "Sistemas internos que consultan y concilian folios inmobiliarios frente a límites catastrales de manera automatizada mediante webhooks."
      },
      {
        title: "Complementos y Extensiones de Escritorio para QGIS",
        desc: "Desarrollo de plugins nativos escritos en Python/PyQt5 para automatizar la digitalización técnica de linderos catastrales LADM-COL en campo."
      }
    ],
    specs: {
      inputs: ["Historias de Usuario / Requisitos", "APIs y Repositorios Existentes", "Esquemas de Base de Datos", "Estándares de Diseño UI/UX"],
      outputs: ["Aplicación Web Reactiva (Next.js)", "APIs Documentadas en OpenAPI (Swagger)", "Código Fuente en Repositorio Seguro", "Base de datos optimizada (PostgreSQL/PostGIS)"],
      compliance: ["Estándares W3C para desarrollo web", "Pautas de Accesibilidad Web (WCAG 2.1)", "OWASP Top 10 para ciberseguridad", "Lineamientos de la Política de Gobierno Digital"],
      architecture: "Código modular e inmutable escrito bajo Clean Architecture, utilizando microservicios asíncronos y almacenes de datos optimizados con caché distribuido para responder con latencia mínima."
    },
    marketplace: [
      {
        name: "Plataforma / Geoportal a la Medida MVP",
        price: "Consultar",
        duration: "10-12 Semanas",
        deliverables: [
          "Diseño UI/UX interactivo en Figma",
          "Desarrollo frontend interactivo en Next.js",
          "Integración de mapa básico interactivo con Mapbox",
          "API backend básica y base de datos relacional",
          "Código fuente y despliegue inicial en nube"
        ]
      },
      {
        name: "Enterprise Software Suite",
        price: "Consultar",
        duration: "Variable",
        deliverables: [
          "Sistema de software a gran escala multiperfil",
          "Motor analítico de geoprocesamiento avanzado",
          "Integraciones API con SNR, IGAC u otros entes catastrales",
          "Seguridad con autenticación federada (SSO)",
          "Mantenimiento integral y soporte continuado"
        ]
      }
    ]
  }
};
