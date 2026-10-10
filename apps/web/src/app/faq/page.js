"use client";
import { useState, useRef, useMemo, useId } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, Search, Mail, ArrowRight, HelpCircle, BookOpen, Cpu, Shield, Database, Brain, Scale, Settings, GraduationCap, Map } from "lucide-react";
import Link from "next/link";
import Logo from "../../components/Logo";

const FAQS = [
  {
    category: "Gobernanza & Estándares",
    icon: BookOpen,
    questions: [
      {
        q: "¿Qué es el estándar LADM-COL y por qué es vital?",
        a: "El LADM-COL (ISO 19152) es el pilar de la administración de tierras en Colombia. Garantiza que la información de propiedad, derechos y restricciones sea interoperable entre el IGAC, la SNR y los municipios, asegurando la soberanía jurídica del dato. Es el marco normativo que permite la identificación precisa de cada predio, interesado y derecho en el territorio nacional."
      },
      {
        q: "¿Cómo aseguran la interoperabilidad con el IGAC?",
        a: "Nuestra arquitectura consume y genera archivos .XTF basados en modelos INTERLIS oficiales. Estamos alineados con los protocolos de la ICDE, facilitando el intercambio de información sin pérdida de integridad semántica. Cada entrega pasa por un proceso de validación automatizada contra los esquemas oficiales publicados por el IGAC."
      },
      {
        q: "¿Qué diferencia hay entre LADM-COL v2.x y v3.0?",
        a: "La versión 3.0 del modelo LADM-COL introduce mejoras significativas en la modelación de restricciones ambientales, servidumbres de paso y derechos de ocupación. Además, incorpora nuevos objetos como LA_RestriccionTerritorial y LA_ServidumbrePaso, y refina el esquema de validación INTERLIS para soportar topologías más complejas. DevGiz implementa ambas versiones y asiste en la migración progresiva."
      },
      {
        q: "¿Qué es INTERLIS y cómo se usa en catastro?",
        a: "INTERLIS es un lenguaje de descripción conceptual suizo adoptado por Colombia para la transferencia masiva de datos geográficos. Permite definir modelos de datos (.ili) y generar archivos de intercambio (.xtf) que son validados automáticamente contra reglas topológicas y de integridad. En catastro, cada base de datos municipal debe ser exportada y validada en formato XTF antes de ser radicada ante el IGAC."
      },
      {
        q: "¿Qué son los protocolos ICDE y por qué importan?",
        a: "La Infraestructura Colombiana de Datos Espaciales (ICDE) establece los lineamientos nacionales para el intercambio soberano de información geográfica. Define estándares de metadatos (ISO 19115), servicios web (WMS/WFS/WCS) y catálogos de objetos oficiales. Todo dato geoespacial publicado por entidades del Estado debe cumplir con estos protocolos para garantizar la interoperabilidad institucional."
      },
      {
        q: "¿Cómo se articulan las normas ISO 19152 con la legislación colombiana?",
        a: "La norma ISO 19152 fue adaptada por el IGAC como LADM-COL mediante resoluciones técnicas que la hacen de obligatorio cumplimiento para todos los gestores catastrales habilitados. La Ley 1955 de 2019 y el CONPES 3958 establecen el marco de política pública, mientras que las resoluciones del IGAC definen los esquemas técnicos. DevGiz opera en plena conformidad con este marco normativo."
      },
      {
        q: "¿Qué es un Gestor Catastral y cuáles son sus obligaciones?",
        a: "Un Gestor Catastral es una entidad (municipal, departamental o privada) habilitada por el IGAC para realizar la actualización y conservación catastral en su jurisdicción. Sus obligaciones incluyen mantener la base catastral actualizada bajo el modelo LADM-COL, garantizar la correspondencia registro-catastro, y radicar entregas periódicas en formato XTF. DevGiz provee la infraestructura tecnológica que permite cumplir estas obligaciones de manera eficiente."
      }
    ]
  },
  {
    category: "Normativa & IGAC (Colombia)",
    icon: Map,
    questions: [
      {
        q: "¿Qué regula la Resolución 1149 de 2021 del IGAC y cómo la cumple DevGiz?",
        a: "La Resolución 1149 de 2021 del IGAC establece el marco técnico y operativo para los procesos de formación, actualización, conservación y difusión catastral en el territorio nacional. Regula detalladamente la entrada de trámites y los estándares de calidad de la información. DevGiz integra en sus pipelines de validación un motor de auditoría automatizado que examina cada mutación predial en caliente, garantizando que cumpla con los requisitos documentales, jurídicos y de bases de datos exigidos por la norma antes de su radicación ante el IGAC o el gestor catastral habilitado."
      },
      {
        q: "¿Cuáles son las especificaciones de exactitud posicional de la Resolución 1040 de 2020?",
        a: "La Resolución 1040 de 2020 del IGAC define las especificaciones técnicas mínimas para el levantamiento catastral multipropósito. Exige exactitudes posicionales rigurosas, clasificadas según el tipo de terreno: urbano (con errores medios cuadráticos admisibles en la escala de 10 cm) y rural (con tolerancias entre 50 cm y 1 metro). Nuestras herramientas de software automatizan el cálculo de la precisión geométrica de los vértices y la verificación de tolerancias frente al estándar oficial, identificando puntos fuera de norma instantáneamente."
      },
      {
        q: "¿Cómo se define la figura del Gestor y Operador Catastral bajo el Decreto 148 de 2020?",
        a: "El Decreto 148 de 2020 reglamenta la gestión catastral como servicio público. El 'Gestor Catastral' es la entidad pública habilitada para administrar y operar el catastro en su territorio, mientras que el 'Operador Catastral' es la persona natural o jurídica que ejecuta las labores de campo y oficina bajo contrato del Gestor. DevGiz provee la infraestructura tecnológica y las herramientas SIG móviles que permiten a gestores y operadores trabajar coordinadamente, manteniendo el control de calidad y la coherencia de datos en tiempo real."
      },
      {
        q: "¿Qué es la Resolución Conjunta IGAC 11119 y SNR 1905 de 2023 de interoperabilidad?",
        a: "Es la resolución que define los lineamientos técnicos para el flujo e intercambio de información entre los Gestores Catastrales y las Oficinas de Registro de Instrumentos Públicos (ORIP/SNR). El objetivo es sincronizar la realidad física y jurídica del territorio. Nuestras soluciones automatizan esta sincronización, cruzando la información alfanumérica del folio de matrícula inmobiliaria con la base catastral geoespacial del predio (NPN) e identificando discrepancias de área, titulares o linderos automáticamente."
      },
      {
        q: "¿Cómo garantiza DevGiz la proyección cartográfica oficial MAGNA-SIRGAS Origen Único (CTM12)?",
        a: "De acuerdo con la Resolución 509 de 2020 del IGAC, toda la cartografía y datos geoespaciales en Colombia deben estar referidos al marco geocéntrico nacional de referencia MAGNA-SIRGAS bajo la proyección de origen único nacional CTM12 (Coordenadas Transversas de Mercator con origen central en el meridiano 73°W). DevGiz incorpora un motor de reproyección al vuelo basado en GDAL y PROJ que convierte automáticamente datos históricos capturados en los antiguos orígenes locales (Bogotá, Oeste, Este, etc.) a CTM12, asegurando que todos los entregables cumplan con la norma geográfica nacional."
      },
      {
        q: "¿Qué son los lineamientos de metadatos de la ICDE y cómo los automatiza DevGiz?",
        a: "La Infraestructura Colombiana de Datos Espaciales (ICDE) promueve el estándar técnico de metadatos geográficos en el país (bajo la norma ISO 19115 / NTC 4617). Exige que cada conjunto de datos territoriales se entregue con su correspondiente archivo de metadatos estructurado. DevGiz cuenta con un generador automático de metadatos que extrae la información espacial, temporal y de linaje de sus datos y genera el archivo XML de metadatos en pleno cumplimiento con la plantilla oficial de la ICDE, eliminando horas de redacción manual."
      },
      {
        q: "¿Cómo gestiona LADM-COL el catastro multipropósito según los CONPES 3958 y 4007?",
        a: "El CONPES 3958 de 2019 establece la estrategia para la implementación del catastro multipropósito y el CONPES 4007 de 2020 asegura los recursos y continuidad de la política. Definen la adopción obligatoria del estándar LADM-COL (Land Administration Domain Model - Perfil Colombia). En DevGiz, toda nuestra arquitectura de datos está diseñada con base en el núcleo conceptual de LADM-COL, garantizando que los objetos geográficos y alfanuméricos (predios, derechos, restricciones, interesados) se organicen y relacionen exactamente como lo requiere el marco de política pública nacional."
      },
      {
        q: "¿Cómo se clasifican y procesan las mutaciones catastrales (1a a 5a clase) en el sistema?",
        a: "La normativa catastral colombiana clasifica los cambios territoriales en mutaciones: Primera Clase (cambios de sujeto activo/propietario), Segunda Clase (cambios en las mejoras o construcciones), Tercera Clase (desenglobes, englobes y desgloses que alteran el aspecto físico), Cuarta Clase (autoavalúos) y Quinta Clase (predios omitidos). El sistema DevGiz automatiza estos flujos predio a predio, vinculando la base de datos catastral alfanumérica con la geográfica, generando el histórico de cambios de linderos y manteniendo la trazabilidad absoluta exigida por los entes de control."
      },
      {
        q: "¿Cómo valida el sistema los predios baldíos y zonas de protección ambiental?",
        a: "Los baldíos son predios propiedad de la Nación imprescriptibles e inalienables, regulados por la Agencia Nacional de Tierras (ANT). Las restricciones ambientales comprenden páramos, parques nacionales (SINAP) y reservas forestales de la Ley 2 de 1959. DevGiz integra servicios WFS de la ANT y del RUNAP para realizar cruces espaciales automáticos. Al ingresar un predio privado, el sistema valida instantáneamente si se superpone con un baldío de la nación o un área protegida de conservación, generando reportes de incompatibilidad territorial automáticos."
      },
      {
        q: "¿Cómo apoya DevGiz en la migración del modelo de datos de LADM-COL v2.1.1 a v3.0?",
        a: "El IGAC y la Superintendencia de Notariado y Registro actualizan constantemente las especificaciones del modelo LADM-COL para mejorar el manejo de derechos 3D, servidumbres y restricciones territoriales complejas. DevGiz proporciona scripts de migración de bases de datos geoespaciales y mapeadores de esquemas INTERLIS avanzados que traducen bases de datos estructuradas en la versión 2.x al nuevo estándar v3.0, ejecutando validaciones de consistencia semántica automáticas durante la transición."
      }
    ]
  },
  {
    category: "Ingeniería & Datos",
    icon: Cpu,
    questions: [
      {
        q: "¿Qué tecnologías de alto rendimiento utilizan?",
        a: "Implementamos motores de procesamiento masivo basados en Polars y DuckDB sobre infraestructuras Cloud-Native. Esto nos permite realizar análisis espaciales y validaciones topológicas en segundos, donde otros tardan horas. Complementamos con GDAL/OGR para transformaciones de formato y PostGIS para almacenamiento y consultas espaciales avanzadas."
      },
      {
        q: "¿Qué precisión tienen sus levantamientos LiDAR?",
        a: "Nuestros pipelines de procesamiento LiDAR garantizan una precisión submétrica y de grado milimétrico para infraestructura crítica, cumpliendo con los estándares más exigentes de ingeniería civil y catastro. Los datos LiDAR son procesados mediante clasificación automática de puntos, generación de MDE/MDS y cálculo de áreas con tolerancias definidas por la normativa vigente."
      },
      {
        q: "¿Cómo funciona su pipeline ETL territorial?",
        a: "Nuestro pipeline ETL opera en cuatro fases: (1) Ingesta de datos heterogéneos (GML, GeoJSON, Shapefile, XTF), (2) Validación estructural contra esquemas INTERLIS y reglas topológicas, (3) Transformación y armonización bajo el modelo LADM-COL, y (4) Carga en base de datos PostGIS con trazabilidad completa. Todo el proceso es orquestado mediante Python con Polars para operaciones tabulares y DuckDB para consultas analíticas en memoria."
      },
      {
        q: "¿Qué bases de datos geoespaciales soportan?",
        a: "Trabajamos nativamente con PostgreSQL/PostGIS como motor principal de almacenamiento espacial. También soportamos GeoPackage para distribución local, DuckDB Spatial para análisis en memoria, y SQLite/SpatiaLite para aplicaciones móviles de campo. La elección depende del volumen de datos, requisitos de concurrencia y contexto operativo del proyecto."
      },
      {
        q: "¿Qué formatos de datos geoespaciales procesan?",
        a: "Procesamos más de 30 formatos geoespaciales incluyendo: GeoJSON, Shapefile, GML, KML/KMZ, GeoPackage, GeoTIFF, LAS/LAZ (LiDAR), XTF (INTERLIS), CSV con coordenadas, WKT/WKB, FileGDB, MapInfo TAB, y formatos CAD (DXF/DWG). Nuestros pipelines utilizan GDAL/OGR como capa de abstracción para garantizar conversiones sin pérdida de información geométrica ni atributos."
      },
      {
        q: "¿Cómo manejan la validación topológica a gran escala?",
        a: "Implementamos validación topológica en dos niveles: (1) Validación geométrica individual mediante Shapely para detectar auto-intersecciones, vértices duplicados y geometrías inválidas, y (2) Validación relacional mediante consultas PostGIS para detectar traslapes entre predios, huecos en la cobertura y inconsistencias de linderos. El motor puede procesar más de 500,000 geometrías por hora con resultados detallados por predio."
      },
      {
        q: "¿Qué es PostGIS y por qué lo prefieren sobre otras soluciones?",
        a: "PostGIS es la extensión espacial de PostgreSQL que convierte una base de datos relacional en un motor geoespacial completo. Lo preferimos porque: es software libre (sin costos de licenciamiento), cumple con estándares OGC, soporta SQL espacial completo (ST_Intersects, ST_Buffer, ST_Area, etc.), maneja índices espaciales GIST para consultas ultrarrápidas, y se integra nativamente con QGIS, GeoServer y nuestros pipelines Python."
      }
    ]
  },
  {
    category: "Inteligencia Artificial",
    icon: Brain,
    questions: [
      {
        q: "¿Qué es Geo-LLM y cómo funciona?",
        a: "Geo-LLM es nuestro motor de inteligencia artificial que permite interactuar con bases de datos geográficas mediante lenguaje natural. El sistema interpreta preguntas complejas como '¿Cuáles predios se traslapan con la ronda de río?' y las traduce automáticamente a consultas Spatial SQL precisas sobre PostGIS. Utiliza un modelo híbrido que combina comprensión semántica con validación de esquemas geoespaciales."
      },
      {
        q: "¿Qué capacidades de análisis predictivo ofrecen?",
        a: "Nuestros modelos de análisis predictivo incluyen: (1) Predicción de crecimiento urbano basada en series temporales de cambio de uso del suelo, (2) Estimación de riesgo de informalidad predial mediante análisis de patrones espaciales, (3) Detección automática de inconsistencias registro-catastro usando algoritmos de comparación fuzzy, y (4) Clasificación automática de coberturas terrestres a partir de imágenes satelitales multiespectrales."
      },
      {
        q: "¿Cómo integran la IA en los flujos de trabajo catastral?",
        a: "La IA se integra en tres puntos críticos del flujo catastral: en la captura de datos (clasificación automática de ortofotografías y detección de construcciones), en la validación (detección de anomalías topológicas y alertas de inconsistencias), y en la entrega (generación automática de reportes técnicos y verificación de completitud contra el modelo LADM-COL). Cada intervención de IA es supervisada por un experto humano."
      },
      {
        q: "¿Pueden entrenar modelos personalizados para mi organización?",
        a: "Sí. Ofrecemos servicios de fine-tuning y entrenamiento de modelos especializados para tareas geoespaciales específicas. Esto incluye clasificadores de uso del suelo adaptados a la realidad territorial colombiana, detectores de cambios en coberturas agrícolas, y asistentes de consulta espacial entrenados con los esquemas particulares de su base de datos PostGIS."
      },
      {
        q: "¿Qué modelos de lenguaje utilizan internamente?",
        a: "Utilizamos una arquitectura híbrida que combina modelos de lenguaje de última generación (Groq, Google AI) con capas de validación semántica propias. El componente LLM se encarga de la comprensión del lenguaje natural, mientras que nuestra capa de validación verifica que las consultas SQL generadas sean sintácticamente correctas y semánticamente coherentes con el esquema PostGIS objetivo."
      },
      {
        q: "¿Cómo se protege la privacidad de los datos al usar IA?",
        a: "Aplicamos un enfoque de privacy-by-design: los datos catastrales sensibles nunca salen de la infraestructura del cliente. Los modelos de IA operan localmente o sobre datos anonimizados. Las consultas Geo-LLM se procesan como traducciones SQL sin transmitir los datos subyacentes. Cumplimos con la Ley 1581 de 2012 (Habeas Data) y las directrices de protección de datos del IGAC."
      }
    ]
  },
  {
    category: "Ciberseguridad & Protección",
    icon: Shield,
    questions: [
      {
        q: "¿Qué protocols de seguridad implementan?",
        a: "Implementamos cifrado AES-256 para datos en reposo, TLS 1.3 para datos en tránsito, autenticación multifactor (MFA) para acceso a sistemas críticos, y auditoría completa de todas las operaciones sobre datos catastrales. Cada acción queda registrada con timestamp, usuario y hash de integridad para trazabilidad forense."
      },
      {
        q: "¿Cómo protegen los datos sensibles de catastro?",
        a: "Los datos catastrales contienen información personal protegida por la Ley 1581 de 2012. Implementamos controles de acceso basados en roles (RBAC), enmascaramiento de datos sensibles en entornos de desarrollo, copias de seguridad cifradas con rotación automática, y monitoreo continuo de accesos anómalos. La infraestructura cumple con los lineamientos del MINTIC para entidades públicas."
      },
      {
        q: "¿Realizan auditorías de seguridad periódicas?",
        a: "Sí. Realizamos auditorías trimestrales que incluyen: escaneo de vulnerabilidades en infraestructura, pruebas de penetración en aplicaciones web, revisión de políticas de acceso, verificación de cumplimiento normativo, y evaluación de la postura de seguridad general. Los resultados se documentan y las remediaciones se implementan dentro de SLAs definidos."
      },
      {
        q: "¿Cómo manejan la continuidad del negocio y recuperación ante desastres?",
        a: "Mantenemos un plan de continuidad del negocio (BCP) y recuperación ante desastres (DRP) que incluye: réplicas geográficas de bases de datos en tiempo real, backups incrementales cada hora con retención de 90 días, procedimientos de failover automático, y RPO/RTO definidos por criticidad del sistema. Para datos catastrales de misión crítica, el RPO es de 1 hora y el RTO de 4 horas."
      },
      {
        q: "¿Qué certificaciones de seguridad poseen?",
        a: "Nuestra infraestructura se despliega sobre proveedores certificados SOC 2 Type II e ISO 27001. A nivel de aplicación, seguimos las prácticas de OWASP Top 10, implementamos Content Security Policy (CSP), y realizamos análisis estático de código (SAST) en cada despliegue. Estamos en proceso de certificación ISO 27001 propia para 2027."
      },
      {
        q: "¿Cómo protegen las APIs de acceso público?",
        a: "Todas nuestras APIs están protegidas mediante: rate limiting con Upstash Redis para prevenir abuso, validación de tokens JWT con expiración corta, CORS restrictivo por dominio, sanitización de inputs para prevenir inyección SQL y XSS, y monitoreo en tiempo real de patrones de tráfico anómalos mediante Sentry y PostHog."
      }
    ]
  },
  {
    category: "Infraestructura & DevOps",
    icon: Database,
    questions: [
      {
        q: "¿Qué infraestructura cloud utilizan?",
        a: "Operamos sobre una arquitectura multi-cloud que combina Vercel para frontend y APIs serverless, servicios de base de datos gestionados para PostgreSQL/PostGIS, almacenamiento de objetos para archivos geoespaciales de gran tamaño, y CDN global para distribución de assets estáticos. Esta arquitectura nos permite escalar horizontalmente según la demanda de procesamiento."
      },
      {
        q: "¿Cuál es su SLA de disponibilidad?",
        a: "Garantizamos un SLA de 99.95% de disponibilidad para aplicaciones de producción, con monitoreo 24/7 mediante alertas automatizadas. Para servicios de procesamiento batch (ETL, validaciones masivas), el SLA es de 99.9%. En caso de incidentes, nuestro tiempo de respuesta es inferior a 15 minutos para severidad crítica y 1 hora para severidad alta."
      },
      {
        q: "¿Cómo gestionan los despliegues y las actualizaciones?",
        a: "Seguimos una estrategia de despliegue continuo (CD) con: revisión de código obligatoria en pull requests, suite de tests automatizados (unitarios, integración, E2E), despliegues preview por rama para revisión visual, rollback automático en caso de errores de compilación, y feature flags para activación gradual de funcionalidades nuevas. Cada despliegue es atómico y reversible."
      },
      {
        q: "¿Qué herramientas de monitoreo y observabilidad usan?",
        a: "Utilizamos un stack de observabilidad completo: Sentry para tracking de errores y performance monitoring, Vercel Analytics para métricas de experiencia de usuario, PostHog para analytics de producto y sesiones de usuario, y Upstash Redis para métricas de rate limiting en tiempo real. Todo se centraliza en dashboards ejecutivos con alertas proactivas."
      },
      {
        q: "¿Soportan despliegues on-premise para entidades gubernamentales?",
        a: "Sí. Para entidades que requieren soberanía total sobre sus datos, ofrecemos despliegues on-premise con Docker y Kubernetes. La arquitectura se adapta a infraestructura local manteniendo las mismas capacidades de procesamiento. Incluimos soporte para configuración de red segura, integración con directorios activos (LDAP/AD), y cumplimiento con las políticas de seguridad del MINTIC."
      },
      {
        q: "¿Cómo escalan el procesamiento para volúmenes masivos de datos?",
        a: "Para proyectos que requieren procesar millones de registros, implementamos: particionamiento de datos por municipio/departamento, procesamiento paralelo con pools de workers configurables, lazy evaluation con Polars para optimizar memoria, caching inteligente de resultados intermedios, y distribución de carga mediante colas de mensajes. Un pipeline típico puede procesar 500k+ registros por día en un solo nodo."
      }
    ]
  },
  {
    category: "Estrategia & Consultoría",
    icon: HelpCircle,
    questions: [
      {
        q: "¿Cómo beneficia DevGiz a un Gestor Catastral?",
        a: "Reducimos la carga operativa mediante la automatización de procesos de validación, garantizamos la calidad del dato antes de la radicación oficial y optimizamos los tiempos de actualización del inventario predial. Un gestor catastral que implementa nuestras herramientas reduce en promedio un 70% el tiempo de preparación de entregas XTF."
      },
      {
        q: "¿Ofrecen soluciones para el sector privado?",
        a: "Sí. Apoyamos a empresas de infraestructura, energía, minería y agroindustria en la gestión táctica de sus activos territoriales y en el cumplimiento de normativas ambientales y legales. Esto incluye análisis de superposición con áreas protegidas, gestión de servidumbres, y dashboards de monitoreo territorial en tiempo real."
      },
      {
        q: "¿Cuánto tiempo toma implementar sus soluciones?",
        a: "Depende del alcance: una integración de validación topológica puede estar operativa en 2-3 semanas. Un pipeline ETL completo para un municipio mediano requiere 4-6 semanas. Una implementación integral con Geo-LLM, dashboards y automatización completa puede tomar 2-3 meses. Cada proyecto inicia con una fase de diagnóstico técnico de 1 semana."
      },
      {
        q: "¿Qué modelo de contratación manejan?",
        a: "Ofrecemos tres modalidades: (1) Proyecto llave en mano con alcance, tiempo y costo definidos, (2) Staff augmentation para equipos que necesitan capacidades geoespaciales especializadas, y (3) Suscripción mensual para acceso continuo a nuestra plataforma de validación y procesamiento. Para entidades públicas, operamos bajo los marcos de contratación de Colombia Compra Eficiente."
      },
      {
        q: "¿Trabajan con entidades internacionales?",
        a: "Sí. Hemos colaborado con proyectos de administración de tierras en varios países de América Latina. Nuestra experiencia con LADM (ISO 19152) es transferible a cualquier jurisdicción que adopte este estándar. También trabajamos con organismos multilaterales como el BID y el Banco Mundial en proyectos de fortalecimiento institucional catastral."
      },
      {
        q: "¿Ofrecen diagnósticos técnicos gratuitos?",
        a: "Ofrecemos una sesión de diagnóstico técnico inicial sin costo donde evaluamos: el estado actual de su base catastral, el nivel de conformidad con LADM-COL, las oportunidades de automatización inmediata, y una hoja de ruta priorizada de mejoras. Esta sesión dura aproximadamente 2 horas y se realiza de manera virtual."
      }
    ]
  },
  {
    category: "Marco Legal & Normativo",
    icon: Scale,
    questions: [
      {
        q: "¿Qué leyes regulan el catastro multipropósito en Colombia?",
        a: "El marco legal incluye: la Ley 1955 de 2019 (Plan Nacional de Desarrollo) que establece el catastro multipropósito, el CONPES 3958 que define la política nacional de catastro, las resoluciones conjuntas IGAC-SNR para la articulación registro-catastro, y el Decreto 148 de 2020 que reglamenta la gestión catastral. DevGiz asegura que cada entrega técnica cumpla con este marco normativo."
      },
      {
        q: "¿Qué es la correspondencia registro-catastro y por qué es importante?",
        a: "La correspondencia registro-catastro es la verificación de que la información del predio en la base catastral (IGAC) coincida con la información registrada en la Oficina de Registro de Instrumentos Públicos (ORIP/SNR). Las discrepancias generan inseguridad jurídica. Nuestros sistemas realizan reconciliación automática comparando folios de matrícula inmobiliaria con identificadores prediales."
      },
      {
        q: "¿Cómo se manejan los predios informales en el sistema?",
        a: "Los predios informales se gestionan bajo las categorías de 'Derecho de Ocupación' y 'Posesión' del modelo LADM-COL. Nuestros sistemas permiten registrar estos derechos con sus respectivas evidencias, generando insumos para los procesos de formalización de la propiedad. El sistema soporta la trazabilidad completa del proceso de transición de informal a formal."
      },
      {
        q: "¿Qué normativa aplica para las zonas de restricción ambiental?",
        a: "Las restricciones ambientales se modelan bajo LA_RestriccionTerritorial en LADM-COL e incluyen: rondas hídricas (Decreto 2245 de 2017), áreas protegidas del SINAP, zonas de reserva forestal (Ley 2 de 1959), y páramos. Nuestros sistemas cruzan automáticamente la base catastral con las capas de restricción ambiental de las CAR y ANLA para detectar superposiciones."
      },
      {
        q: "¿Cómo abordan los conflictos de propiedad y linderos?",
        a: "Los conflictos de linderos se documentan como 'diferencias' en el modelo LADM-COL con sus respectivas evidencias técnicas. Nuestro sistema genera informes de diagnóstico que incluyen: comparación de áreas registradas vs. levantadas, análisis de superposición entre predios colindantes, y recomendaciones técnicas para resolución. Estos informes sirven como insumo para los procesos de conciliación o jurisdicción."
      },
      {
        q: "¿Cuáles son las consecuencias de no cumplir con los estándares catastrales?",
        a: "El incumplimiento puede resultar en: rechazo de entregas por parte del IGAC, imposibilidad de radicación de trámites ciudadanos, pérdida de la habilitación como gestor catastral, y riesgo de responsabilidad fiscal. A nivel técnico, los archivos XTF que no pasen la validación INTERLIS son rechazados automáticamente por el sistema nacional. DevGiz garantiza la conformidad desde la primera entrega."
      }
    ]
  },
  {
    category: "Herramientas & Software GIS",
    icon: Settings,
    questions: [
      {
        q: "¿Qué es el LADM-COL QGIS Plugin?",
        a: "Es una herramienta de software libre desarrollada para el ecosistema QGIS que permite a los gestores catastrales validar bases de datos territoriales directamente desde su escritorio. El plugin ejecuta reglas topológicas (no-superposición, no-huecos, concordancia de linderos), genera reportes de conformidad, y permite la exportación directa a formato XTF para radicación ante el IGAC."
      },
      {
        q: "¿Por qué eligieron QGIS sobre software privativo?",
        a: "QGIS es software libre (GNU GPL), lo que elimina costos de licenciamiento para las entidades públicas. Además, ofrece: soporte nativo para PostGIS, un ecosistema de plugins extensible, capacidad de procesamiento de datos vectoriales y raster a escala, y una comunidad global activa. Para entidades con presupuestos limitados, QGIS con nuestro plugin es la solución más costo-efectiva del mercado."
      },
      {
        q: "¿Qué herramientas usan para visualización de datos geoespaciales?",
        a: "Utilizamos un stack de visualización multicapa: Mapbox GL JS para renderizado de mapas web interactivos de alto rendimiento, Lightweight Charts para series temporales y métricas, SVG dinámico para diagramas esquemáticos de parcelas, y QGIS para visualización de escritorio. Cada herramienta se selecciona según el contexto: web público, dashboard interno, o análisis técnico."
      },
      {
        q: "¿Pueden integrar sus soluciones con nuestro GIS existente?",
        a: "Sí. Nuestras soluciones están diseñadas para interoperar con cualquier stack GIS: ArcGIS (mediante APIs REST y FileGDB), QGIS (mediante plugins nativos y PostGIS), GeoServer (mediante WMS/WFS), y cualquier sistema que soporte los estándares OGC. La integración típica se realiza mediante APIs REST, conexión directa a base de datos, o intercambio de archivos en formatos estándar."
      },
      {
        q: "¿Ofrecen APIs para desarrolladores?",
        a: "Sí. Exponemos APIs REST documentadas para: validación de geometrías contra reglas topológicas, conversión entre formatos geoespaciales, consultas al motor Geo-LLM, y acceso a métricas de telemetría. Las APIs están protegidas mediante API keys con rate limiting, documentadas con OpenAPI/Swagger, y disponibles en versiones de producción y sandbox para pruebas."
      },
      {
        q: "¿Soportan la generación de mapas y reportes automáticos?",
        a: "Sí. Nuestro sistema genera automáticamente: mapas temáticos de cobertura predial por municipio, reportes técnicos de validación topológica en PDF, dashboards de avance de actualización catastral, fichas prediales con información alfanumérica y geográfica integrada, y cartografía oficial lista para publicación. Todos los reportes son personalizables según los requerimientos de la entidad."
      }
    ]
  },
  {
    category: "Capacitación & Soporte",
    icon: GraduationCap,
    questions: [
      {
        q: "¿Ofrecen programas de capacitación?",
        a: "Sí. Ofrecemos programas de capacitación escalonados: (1) Taller introductorio de LADM-COL y validación XTF (8 horas), (2) Curso avanzado de procesamiento geoespacial con Python/QGIS (24 horas), (3) Certificación en uso del LADM-COL QGIS Plugin (16 horas), y (4) Workshop de Geo-LLM para analistas territoriales (8 horas). Todos los programas incluyen material técnico, ejercicios prácticos con datos reales y certificado de asistencia."
      },
      {
        q: "¿Qué tipo de soporte técnico ofrecen?",
        a: "Ofrecemos tres niveles de soporte: (1) Soporte estándar (horario laboral, respuesta en 4 horas, correo y chat), (2) Soporte prioritario (horario extendido, respuesta en 1 hora, acceso a ingenieros senior), y (3) Soporte dedicado (24/7, respuesta en 15 minutos, ingeniero asignado, sesiones de revisión semanales). Todos los niveles incluyen acceso a nuestra base de conocimientos y documentación técnica actualizada."
      },
      {
        q: "¿Tienen documentación técnica disponible?",
        a: "Sí. Mantenemos una biblioteca técnica completa que incluye: guías de inicio rápido para cada herramienta, documentación de API con ejemplos interactivos, tutoriales paso a paso para flujos de trabajo comunes, arquitectura de referencia para despliegues, y un glosario técnico de más de 200 términos catastrales y geoespaciales. Todo está disponible en español e inglés."
      },
      {
        q: "¿Pueden capacitar a nuestro equipo en LADM-COL desde cero?",
        a: "Absolutamente. Nuestro programa 'LADM-COL Fundamentals' está diseñado para equipos sin experiencia previa en el estándar. Cubre desde los conceptos básicos de administración de tierras hasta la implementación práctica con nuestras herramientas. El programa incluye 40 horas de formación distribuidas en 5 semanas, con evaluaciones parciales y un proyecto final con datos reales del municipio del participante."
      },
      {
        q: "¿Ofrecen acompañamiento durante las primeras entregas al IGAC?",
        a: "Sí. Nuestro servicio de acompañamiento incluye: revisión técnica previa de cada archivo XTF, validación contra los esquemas oficiales vigentes, corrección de inconsistencias detectadas, simulación de radicación en ambiente de pruebas, y soporte en tiempo real durante el proceso de radicación oficial. Garantizamos la aprobación en la primera entrega."
      },
      {
        q: "¿Cómo se mantienen actualizados con los cambios normativos?",
        a: "Mantenemos un equipo dedicado al monitoreo normativo que: participa en las mesas técnicas del IGAC, analiza cada nueva resolución y circular técnica, actualiza nuestros esquemas de validación dentro de las 48 horas posteriores a cualquier cambio oficial, y notifica a todos nuestros clientes sobre los impactos y acciones requeridas. Nuestros clientes nunca son sorprendidos por cambios normativos."
      }
    ]
  }
];

function FAQAccordion({ q, a, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  
  return (
    <motion.div 
      className="border-b border-slate-100 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full py-8 flex items-center justify-between text-left group cursor-pointer"
      >
        <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#1a1a1a]' : 'text-slate-500 group-hover:text-[#1a1a1a]'}`}>
          {q}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${
          isOpen ? 'bg-[#1a1a1a] text-white rotate-0' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
        }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 text-lg text-slate-500 font-light leading-relaxed max-w-3xl pl-0 border-l-2 border-slate-200 ml-1 pl-6">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQS[0].category);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const activeFAQs = useMemo(() => {
    const cat = FAQS.find(cat => cat.category === activeCategory);
    if (!searchQuery.trim()) return cat?.questions || [];
    return cat?.questions.filter(
      faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
             faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  }, [activeCategory, searchQuery]);

  const totalQuestions = FAQS.reduce((acc, cat) => acc + cat.questions.length, 0);

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200 pt-40 pb-32">
      
      <div className="max-w-7xl mx-auto px-6" ref={headerRef}>
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-32"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div 
            className="space-y-8"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#1a1a1a]"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Expert Support // Knowledge Center</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]">
              Consultoría de <br /> <span className="text-slate-400 italic font-light">Conocimiento</span>
            </h1>
          </motion.div>
          <motion.div 
            className="max-w-sm"
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } } }}
          >
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Resolvemos los desafíos técnicos y estratégicos más complejos de la gestión territorial moderna.
            </p>
            <div className="mt-4 flex items-center gap-4 text-[10px] font-mono text-slate-400">
              <span className="px-3 py-1.5 bg-slate-100 rounded-full font-bold">{totalQuestions} Respuestas</span>
              <span className="px-3 py-1.5 bg-slate-100 rounded-full font-bold">{FAQS.length} Categorías</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-32 space-y-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-8">Categorías</div>
              {FAQS.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.category}
                    type="button"
                    aria-pressed={activeCategory === cat.category}
                    onClick={() => { setActiveCategory(cat.category); setSearchQuery(""); }}
                    className={`block w-full text-left text-xs font-bold uppercase tracking-[0.15em] py-4 px-6 border-l-2 transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      activeCategory === cat.category 
                        ? 'border-[#1a1a1a] text-[#1a1a1a] bg-white shadow-sm rounded-r-lg' 
                        : 'border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600 hover:bg-white/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${activeCategory === cat.category ? 'text-[#1a1a1a]' : 'text-slate-300'}`} />
                    {cat.category}
                  </button>
                );
              })}

              <div className="mt-16 p-8 bg-white border border-slate-100 rounded-xl space-y-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Newsletter</div>
                <h3 className="text-sm font-black leading-tight uppercase">Territorial Intelligence Brief</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">Reciba mensualmente análisis técnicos sobre el catastro en Colombia.</p>
                <div className="flex flex-col gap-3">
                  <input type="email" aria-label="Email institucional para el newsletter" autoComplete="email" placeholder="Email institucional" className="bg-[#fafafa] border border-slate-100 p-3 text-[10px] font-mono focus:outline-none focus:border-slate-400 rounded-lg transition-colors" />
                  <button type="button" className="bg-[#1a1a1a] text-white text-[9px] font-bold py-3 uppercase tracking-widest hover:bg-slate-800 transition-all rounded-lg cursor-pointer flex items-center justify-center gap-2">
                    <Mail className="w-3 h-3" />
                    Suscribirse
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-100 p-8 lg:p-16 shadow-sm min-h-[600px] rounded-xl">
              <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-8 gap-6">
                <h2 className="text-3xl font-black tracking-tight">{activeCategory}</h2>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="search" 
                    aria-label="Buscar en las preguntas frecuentes"
                    placeholder="Buscar solución..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-[#fafafa] border border-slate-100 text-xs font-mono rounded-full focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all w-48" 
                  />
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-0"
                >
                  {activeFAQs.length > 0 ? (
                    activeFAQs.map((faq, i) => (
                      <FAQAccordion key={i} q={faq.q} a={faq.a} index={i} />
                    ))
                  ) : (
                    <div className="py-20 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center">
                        <Search className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-slate-400 font-light">No se encontraron resultados para "{searchQuery}"</p>
                      <button onClick={() => setSearchQuery("")} className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer">
                        Limpiar Búsqueda
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-32 pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <Logo className="w-12 h-12 opacity-80" />
             <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">DevGiz Knowledge Board</span>
                <span className="text-[10px] text-slate-400 font-mono">Última actualización: Mayo 2026</span>
             </div>
          </div>
          <Link href="/#contact" className="px-12 py-5 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl group flex items-center gap-3">
             Iniciar Auditoría Técnica
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
}
