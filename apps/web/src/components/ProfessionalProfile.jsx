"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Award,
  Briefcase,
  GraduationCap,
  Cpu,
  Globe2,
  CheckCircle2,
  ExternalLink,
  Download,
  Terminal,
  Layers,
  MapPin,
  Phone,
  Mail,
  Compass,
  Radio,
  FileCheck,
  Check,
  ChevronRight,
  Database,
  Code2
} from "lucide-react";

// ============================================================================
// DATOS DEL CV DE ALBERT DANIEL GAVIRIA ZAPATA (declarados por el titular)
// ============================================================================

export const MISSIONS = [
  {
    period: "09/2025 – 12/2025",
    role: "Analista Geográfico",
    company: "Geografía Satelital GEOSAT S.A.S.",
    location: "Medellín, Colombia",
    badge: "Misión Reciente",
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    highlights: [
      "Fotointerpretación 360°: Procesamiento avanzado de información geoespacial mediante análisis de insumos 360° y restitución vectorial, garantizando consistencia topológica entre datos gráficos y alfanuméricos.",
      "Digitalización Catastral: Digitalización de precisión de unidades de construcción y terrenos, integrando análisis de planos arquitectónicos para actualización catastral masiva.",
      "Cartografía Oficial: Generación experta de mapas temáticos y productos cartográficos, asegurando cumplimiento de estándares de calidad, confidencialidad y cronogramas de entrega."
    ],
    tags: ["Fotointerpretación 360°", "Restitución Vectorial", "LADM-COL", "QA/QC Topológico"]
  },
  {
    period: "05/2025 – 09/2025",
    role: "Control de Calidad de Reconocimiento Predial (QA/QC)",
    company: "ACCIÓN DEL CAUCA S.A.S. (Proyecto IGAC)",
    location: "Popayán, Colombia",
    badge: "Auditoría IGAC",
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    highlights: [
      "Auditoría QA/QC: Ejecución de auditorías técnicas de calidad sobre información de reconocimiento predial, asegurando estricto cumplimiento de la normativa oficial IGAC.",
      "Validación Integral: Validación de componentes físicos, jurídicos y económicos, garantizando consistencia y veracidad de la información catastral recolectada.",
      "SAGRILAFT / FPADM: Gestión de inconsistencias y saneamiento de datos en articulación con políticas de gestión del riesgo y transparencia institucional."
    ],
    tags: ["Normativa IGAC", "SAGRILAFT/FPADM", "Validación Jurídica", "Auditoría Técnica"]
  },
  {
    period: "02/2025 – 04/2025",
    role: "Digitalizador SIG",
    company: "ARBITRIUM S.A.S.",
    location: "San Pedro de Urabá, Ant.",
    badge: "Estructuración Masiva",
    badgeColor: "border-blue-500/40 text-blue-400 bg-blue-500/10",
    highlights: [
      "Digitalización Integral: Ejecución integral de digitalización catastral (Urbana / Rural) y estructuración topológica, asegurando cumplimiento de estándares técnicos.",
      "Calidad QA/QC: Gestión avanzada de calidad y depuración cartográfica para eliminar inconsistencias topológicas y alfanuméricas.",
      "Reportes Espaciales & Datos: Generación de reportes espaciales de alta precisión y productos gráficos finales; garantía de integridad y seguridad de la información."
    ],
    tags: ["Estructuración Topológica", "Urbana/Rural", "Depuración Cartográfica", "Integridad de Datos"]
  },
  {
    period: "01/2025 – 01/2025",
    role: "Coordinador de Cuadrilla (Coordinador Campo)",
    company: "ARBITRIUM S.A.S.",
    location: "San Pedro de Urabá, Ant.",
    badge: "Liderazgo en Terreno",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    highlights: [
      "Coordinación Estratégica: Operativos de campo para identificación física y jurídica de predios y construcciones.",
      "Brigadas de Barrido: Planificación y despliegue de brigadas de barrido predial, asegurando cumplimiento de cronogramas y metas de rendimiento.",
      "Control de Calidad: Supervisión de procesos de depuración y corrección catastral, garantizando la calidad del dato desde la captura en terreno."
    ],
    tags: ["Barrido Predial", "Captura en Terreno", "Coordinación Operativa", "Control de Rendimiento"]
  },
  {
    period: "10/2024 – 12/2024",
    role: "Líder de Reconocimiento (Líder de Campo)",
    company: "ARBITRIUM S.A.S.",
    location: "San Pedro de Urabá, Ant.",
    badge: "Componente Jurídico",
    badgeColor: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    highlights: [
      "Liderazgo Técnico: Dirección de equipos de reconocimiento predial, gestionando asignaciones, rendimientos y QA en campo y oficina.",
      "Componente Jurídico: Verificación de mutaciones catastrales y articulación con Registro (linderos, áreas, propiedad).",
      "Aseguramiento de Calidad: Validación del cruce de trámites y consistencia de datos móviles; optimización operativa con monitoreo de KPIs."
    ],
    tags: ["Mutaciones Catastrales", "Registro de Tierras", "Cruce Alfanumérico", "Gestión de Equipos"]
  },
  {
    period: "09/2024 – 10/2024",
    role: "Coordinador de Cuadrilla (Coordinador Campo)",
    company: "ARBITRIUM S.A.S.",
    location: "Arboletes, Ant.",
    badge: "Intervención Territorial",
    badgeColor: "border-slate-400 text-slate-300 bg-slate-800/40",
    highlights: [
      "Identificación Catastral: Incorporación de terrenos y construcciones bajo conformidad normativa.",
      "Monitoreo de Procesos: Planificación de métodos directos e indirectos de barrido predial.",
      "Gestión Logística: Despliegue de brigadas y depuración de inscripciones catastrales."
    ],
    tags: ["Métodos Directos/Indirectos", "Logística de Brigadas", "Arboletes"]
  },
  {
    period: "12/2023 – 08/2024",
    role: "Profesional SIG (Geomática & Drones)",
    company: "GRUPO EMPRESARIAL OD",
    location: "Barranquilla, ATL",
    badge: "Drones & Topografía",
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    highlights: [
      "Geomática y Drones: Procesamiento de ortofotos, fotogrametría y topografía con drones para proyectos de infraestructura.",
      "Seguimiento Alfanumérico: Gestión de bases de datos espaciales y desarrollo de herramientas de reporte en MS Access y SQL.",
      "Gestión Predial: Coordinación integral para proyectos de infraestructura y saneamiento jurídico."
    ],
    tags: ["Fotogrametría Digital", "Drones RPAS", "Ortofotos", "MS Access/SQL", "Saneamiento Jurídico"]
  },
  {
    period: "09/2023 – 08/2024",
    role: "Coordinador Profesional SIG",
    company: "UNIÓN TEMPORAL SMART CITY",
    location: "Barranquilla, ATL",
    badge: "LADM-COL v3.0 Core",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    highlights: [
      "Estándares LADM-COL: Implementación del modelo LADM-COL e interoperabilidad para gestión catastral eficiente.",
      "Digitalización Masiva: Dirección de procesos de digitalización masiva y control de calidad (QA) orientado a reducir inconsistencias gráficas.",
      "Optimización SIG: Gestión de infraestructura de datos espaciales y automatización de procedimientos."
    ],
    tags: ["LADM-COL v3.0", "Control de Calidad", "Automatización SIG", "IDE"]
  },
  {
    period: "09/2022 – 12/2022",
    role: "Digitalizador Profesional SIG",
    company: "CINTELI S.A.S.",
    location: "Barranquilla, ATL",
    badge: "Cruce Gráfico-Alfanumérico",
    badgeColor: "border-slate-500 text-slate-300 bg-slate-800/40",
    highlights: [
      "Digitalización masiva y depuración conforme a normativa IGAC.",
      "Cruce e integración de bases gráficas y alfanuméricas para garantizar completitud y consistencia topológica.",
      "Generación de reportes de inconsistencias y avances mediante consultas SQL y Access."
    ],
    tags: ["Normativa IGAC", "SQL", "Topología", "Ploteos de Verificación"]
  },
  {
    period: "02/2021 – 05/2022",
    role: "Gestión Predial - Proyecto K 51-B",
    company: "CONSORCIO VIAL DE BARRANQUILLA",
    location: "Barranquilla, Colombia",
    badge: "Infraestructura Vial",
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    highlights: [
      "Fotogrametría: Pilotaje de drones para generación de insumos gráficos de alta resolución.",
      "Planos Técnicos: Elaboración de planos técnicos y delineamiento para adquisición predial vial.",
      "Trazabilidad de Expedientes: Gestión documental y técnica para soporte jurídico continuo."
    ],
    tags: ["Adquisición Predial", "Pilotaje RPAS", "Planos de Vía", "Trazabilidad Jurídica"]
  },
  {
    period: "05/2021 – 12/2022",
    role: "Gestor Ambiental",
    company: "COSARGO SAS",
    location: "Puerto Gaitán, META",
    badge: "Gestión Ambiental",
    badgeColor: "border-emerald-600/40 text-emerald-400 bg-emerald-950/40",
    highlights: [
      "Supervisión de cumplimiento normativo ambiental en proyectos de infraestructura.",
      "Apoyo técnico en gestión de recursos naturales y ejecución de planes de manejo ambiental (PMA).",
      "Control operacional para minimizar el impacto en el territorio."
    ],
    tags: ["Planes de Manejo Ambiental", "Normativa Ambiental", "Recursos Naturales"]
  }
];

const SKILLS_CATEGORIES = [
  {
    category: "Software SIG de Precisión",
    icon: Compass,
    items: [
      { name: "QGIS Desktop & Server", level: "100%", status: "Experto", bar: 100 },
      { name: "ArcGIS Pro", level: "100%", status: "Experto", bar: 100 },
      { name: "ArcGIS Desktop / ArcMap", level: "100%", status: "Experto", bar: 100 },
      { name: "Global Mapper", level: "80%", status: "Avanzado", bar: 80 },
      { name: "Google Earth Pro", level: "Avanzado", status: "Avanzado", bar: 85 },
      { name: "MapInfo Professional", level: "Avanzado", status: "Avanzado", bar: 80 }
    ]
  },
  {
    category: "Infraestructura Espacial & Bases de Datos",
    icon: Database,
    items: [
      { name: "PostgreSQL / PostGIS", level: "95%", status: "Avanzado", bar: 95 },
      { name: "SQL Server", level: "90%", status: "Muy Avanzado", bar: 90 },
      { name: "GeoServer / MapServer", level: "90%", status: "Avanzado", bar: 90 },
      { name: "ArcGIS Enterprise / Portal", level: "85%", status: "Avanzado", bar: 85 },
      { name: "DuckDB & Parquet Geospacial", level: "90%", status: "Avanzado", bar: 90 },
      { name: "SQLite / SpatiaLite / Access", level: "90%", status: "Avanzado", bar: 90 }
    ]
  },
  {
    category: "Drones (RPAS) & Telemetría GNSS",
    icon: Radio,
    items: [
      { name: "Operación de Drones / RPAS", level: "Experiencia en campo", status: "Avanzado", bar: 95 },
      { name: "Receptores GNSS / GPS RTK", level: "Operación", status: "Experto", bar: 95 },
      { name: "Fotogrametría Digital (Pix4D, Agisoft)", level: "Alta Resolución", status: "Avanzado", bar: 90 },
      { name: "QField & ODK Collect (Campo Móvil)", level: "100%", status: "Experto", bar: 95 }
    ]
  },
  {
    category: "Diseño Técnico & CAD/BIM",
    icon: Layers,
    items: [
      { name: "AutoCAD 2D", level: "90%", status: "Muy Avanzado", bar: 90 },
      { name: "AutoCAD Civil 3D", level: "90%", status: "Muy Avanzado", bar: 90 },
      { name: "Adobe Photoshop (Cartografía)", level: "Muy Avanzado", status: "Avanzado", bar: 85 },
      { name: "Revit Architecture / BIM", level: "Básico", status: "Básico", bar: 45 }
    ]
  },
  {
    category: "Desarrollo Geoespacial & Full-Stack",
    icon: Code2,
    items: [
      { name: "Python (GeoPandas, Pandas, Shapely)", level: "95%", status: "Experto", bar: 95 },
      { name: "PyQGIS Scripting & Plugins", level: "90%", status: "Avanzado", bar: 90 },
      { name: "JavaScript / TypeScript / React", level: "90%", status: "Avanzado", bar: 90 },
      { name: "Next.js / Mapbox GL / MapLibre", level: "90%", status: "Avanzado", bar: 90 },
      { name: "FastAPI / Docker / CI-CD", level: "85%", status: "Avanzado", bar: 85 }
    ]
  }
];

const EDUCATION = [
  {
    title: "Ingeniería en Desarrollo Territorial",
    institution: "Formación Universitaria en Curso",
    period: "En Curso // Medellín",
    desc: "Especialización en gestión del suelo, ordenamiento territorial, catastro multipropósito y planificación espacial sustentable.",
    highlight: true
  },
  {
    title: "Tecnólogo en Gestión de Recursos Naturales",
    institution: "SENA — C. Industrial de Aviación",
    period: "2021 // Medellín",
    desc: "Manejo integral de cuencas, sistemas de información geográfica aplicados al medio ambiente, topografía y normatividad ambiental.",
    highlight: false
  },
  {
    title: "Técnico en Conservación de Recursos Naturales",
    institution: "SENA — C. Tecnológico Agroempresarial",
    period: "2019 // Medellín",
    desc: "Supervisión ambiental, monitoreo de ecosistemas y gestión comunitaria de áreas de protección.",
    highlight: false
  },
  {
    title: "Bachiller Académico",
    institution: "I.E. Francisco de Paula Santander",
    period: "2019 // Medellín",
    desc: "Enfoque en ciencias exactas y bases técnicas preparatorias.",
    highlight: false
  }
];

const CERTIFICATIONS = [
  {
    title: "Tecnologías Geoespaciales",
    issuer: "ICDE (Infraestructura Colombiana de Datos Espaciales)",
    verifiable: true,
    category: "IDE & Geoinformación"
  },
  {
    title: "Administración Digital del Territorio (EUADG)",
    issuer: "ICDE (Infraestructura Colombiana de Datos Espaciales)",
    verifiable: true,
    category: "Gobernanza de Tierras"
  },
  {
    title: "Gestión y Administración del Territorio",
    issuer: "ICDE (Infraestructura Colombiana de Datos Espaciales)",
    verifiable: true,
    category: "Catastro y Tierras"
  },
  {
    title: "Especialización: Programación en Python",
    issuer: "Universidad Austral (Coursera)",
    verifiable: true,
    category: "Desarrollo & Algoritmos"
  },
  {
    title: "GIS Fundamentals",
    issuer: "University of California, Davis (UC Davis / Coursera)",
    verifiable: true,
    category: "Ciencia Espacial"
  },
  {
    title: "Diplomado en Integración de Sistemas de Gestión (2023)",
    issuer: "Politécnico Superior",
    verifiable: true,
    category: "HSEQ & Calidad"
  },
  {
    title: "Certificación Profesional en Gestión de Proyectos",
    issuer: "Google (Coursera - Fundamentos, Planificación, Ejecución)",
    verifiable: true,
    category: "Project Management"
  },
  {
    title: "Reconocedor Predial Urbano-Rural (2021)",
    issuer: "SENA (Servicio Nacional de Aprendizaje)",
    verifiable: true,
    category: "Catastro Multipropósito"
  },
  {
    title: "Mapas Topográficos con QGIS (2023)",
    issuer: "SENA",
    verifiable: true,
    category: "Topografía & SIG"
  },
  {
    title: "Diseño y Planos en AutoCAD 2D (2023)",
    issuer: "SENA",
    verifiable: true,
    category: "Diseño CAD"
  },
  {
    title: "Auditoría Interna de Calidad ISO 9001 (2023)",
    issuer: "SENA",
    verifiable: true,
    category: "QA/QC Calidad"
  },
  {
    title: "Gestión Ambiental ISO 14001:2015 (2023)",
    issuer: "SENA",
    verifiable: true,
    category: "Sostenibilidad"
  },
  {
    title: "Seguridad y Salud en el Trabajo SG-SST (50 horas)",
    issuer: "SENA",
    verifiable: true,
    category: "Seguridad Industrial"
  },
  {
    title: "Trabajo Seguro en Alturas (Avanzado & Básico Operativo)",
    issuer: "Centro de Entrenamiento en Alturas (2021 - 2023)",
    verifiable: true,
    category: "Seguridad en Terreno"
  }
];

const LANGUAGES = [
  { name: "Español", level: "Nativo", badge: "Lengua Materna", percent: 100 },
  { name: "Inglés", level: "Avanzado C1", badge: "Documentación & Fluidez Técnica", percent: 90 },
  { name: "Francés", level: "Intermedio B1", badge: "Competencia Profesional", percent: 65 },
  { name: "Alemán", level: "Intermedio B1", badge: "Competencia Técnica", percent: 65 }
];

export default function ProfessionalProfile() {
  const [activeTab, setActiveTab] = useState("missions"); // 'missions' | 'skills' | 'education' | 'languages'
  const [selectedMission, setSelectedMission] = useState(0);
  const [certQuery, setCertQuery] = useState("");

  const filteredCerts = CERTIFICATIONS.filter((c) => {
    if (!certQuery.trim()) return true;
    const q = certQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.issuer.toLowerCase().includes(q)
    );
  });

  return (
    <section id="portfolio-dossier" className="relative w-full py-14 md:py-16 z-20 bg-[#060911] text-slate-100 overflow-hidden border-t border-slate-800/80">
      
      {/* Background Industrial Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ==================================================================== */}
        {/* EXECUTIVE HEADER: IDENTIDAD INSTITUCIONAL IMPONENTE */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-slate-800/80">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                DOSSIER DE INGENIERÍA {"//"} PORTAFOLIO DE AUTOR
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-slate-900 text-slate-400 border border-slate-800">
                <MapPin className="w-3 h-3 text-cyan-400" /> Medellín, Colombia
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Check className="w-3 h-3" /> Disponibilidad Inmediata
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                Albert Daniel <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  Gaviria Zapata
                </span>
              </h2>
              <p className="text-lg md:text-xl font-light text-slate-300 pt-2">
                Estudiante de Ingeniería en Desarrollo Territorial <span className="text-cyan-400 font-normal">|</span> Profesional SIG
              </p>
            </div>

            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-3xl">
              Especialista en Sistemas de Información Geográfica, bases de datos espaciales y automatización con Python para la gestión eficiente del <strong className="text-white font-medium">Catastro Multipropósito bajo el estándar LADM-COL v3.0</strong>. Diseñador del ecosistema <strong className="text-cyan-400 font-medium">DevGiz</strong>. Coordinador de brigadas de barrido predial, operador de drones (RPAS) y especialista en telemetría GNSS/GPS RTK.
            </p>
          </div>

          {/* Quick Contact & Datasheet Action */}
          <div className="lg:col-span-4 bg-[#0a0f18] p-6 rounded-2xl border border-slate-800/90 shadow-2xl space-y-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-between pb-2 border-b border-slate-800">
              <span>TELEMETRÍA DE CONTACTO</span>
              <span className="text-cyan-400">EN LÍNEA</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <a href="https://wa.me/573053261466" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 hover:bg-emerald-500/10 hover:text-emerald-400 border border-slate-800/80 transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+57 305 326 1466 / 310 651 4707</span>
              </a>
              <a href="mailto:Albertg2109@gmail.com" className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 hover:bg-cyan-500/10 hover:text-cyan-400 border border-slate-800/80 transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Albertg2109@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/soyalbertgz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 hover:bg-blue-500/10 hover:text-blue-400 border border-slate-800/80 transition-colors">
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                <span>linkedin.com/in/soyalbertgz</span>
              </a>
              <a href="https://github.com/gaviriaz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-700/40 hover:text-white border border-slate-800/80 transition-colors">
                <Code2 className="w-3.5 h-3.5 text-slate-400" />
                <span>github.com/gaviriaz</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20"
              >
                <Compass className="w-4 h-4" />
                Solicitar Consultoría Territorial
              </a>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* KPI METRIC STRIP (ENTERPRISE IMPACT) */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-[#090e17] border border-slate-800/80 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Experiencia Laboral</div>
            <div className="text-3xl font-black text-white font-mono mt-1">2021+</div>
            <div className="text-xs text-slate-400 mt-1">Catastro, gestión predial y SIG</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#090e17] border border-slate-800/80 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Organizaciones</div>
            <div className="text-3xl font-black text-emerald-400 font-mono mt-1">8</div>
            <div className="text-xs text-slate-400 mt-1">Empleadores y proyectos del CV</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#090e17] border border-slate-800/80 relative overflow-hidden group hover:border-blue-500/40 transition-colors">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Estándar Aplicado</div>
            <div className="text-3xl font-black text-cyan-400 font-mono mt-1">LADM-COL</div>
            <div className="text-xs text-slate-400 mt-1">Metodología alineada con ISO 19152</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#090e17] border border-slate-800/80 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Formación Complementaria</div>
            <div className="text-3xl font-black text-amber-400 font-mono mt-1">14</div>
            <div className="text-xs text-slate-400 mt-1">Cursos y diplomados (SENA, ICDE, Coursera)</div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* INTERACTIVE DOSSIER NAVIGATION TABS */}
        {/* ==================================================================== */}
        {/* INTERACTIVE DOSSIER NAVIGATION TABS */}
        {/* ==================================================================== */}
        <div
          role="tablist"
          aria-label="Secciones del Dossier Profesional"
          className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-[#0a0f18] border border-slate-800/90 max-w-fit"
        >
          <button
            type="button"
            role="tab"
            id="tab-missions"
            aria-selected={activeTab === "missions"}
            aria-controls="panel-missions"
            onClick={() => setActiveTab("missions")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-mono tracking-wider transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
              activeTab === "missions"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            TRAYECTORIA & MISIONES ({MISSIONS.length})
          </button>
          
          <button
            type="button"
            role="tab"
            id="tab-skills"
            aria-selected={activeTab === "skills"}
            aria-controls="panel-skills"
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-mono tracking-wider transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
              activeTab === "skills"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Cpu className="w-4 h-4" />
            ARSENAL TÉCNICO & DNA
          </button>

          <button
            type="button"
            role="tab"
            id="tab-education"
            aria-selected={activeTab === "education"}
            aria-controls="panel-education"
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-mono tracking-wider transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
              activeTab === "education"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            FORMACIÓN & CERTIFICACIONES ({CERTIFICATIONS.length})
          </button>

          <button
            type="button"
            role="tab"
            id="tab-languages"
            aria-selected={activeTab === "languages"}
            aria-controls="panel-languages"
            onClick={() => setActiveTab("languages")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-mono tracking-wider transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
              activeTab === "languages"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Globe2 className="w-4 h-4" />
            IDIOMAS & POLÍGLOTA
          </button>
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: TRAYECTORIA Y MISIONES (FULL HISTORY EXPLORER) */}
        {/* ==================================================================== */}
        {activeTab === "missions" && (
          <motion.div
            id="panel-missions"
            role="tabpanel"
            aria-labelledby="tab-missions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Mission Selector List */}
            <div
              role="tablist"
              aria-label="Experiencia laboral"
              aria-orientation="vertical"
              className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-2 custom-scrollbar"
            >
              {MISSIONS.map((m, idx) => (
                <button
                  type="button"
                  key={idx}
                  role="tab"
                  id={`mission-btn-${idx}`}
                  aria-selected={selectedMission === idx}
                  aria-controls="mission-detail-view"
                  onClick={() => setSelectedMission(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
                    selectedMission === idx
                      ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/5"
                      : "bg-[#090e17] border-slate-800/80 hover:border-slate-700 hover:bg-[#0c131f]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono tabular-nums text-slate-400">{m.period}</span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${m.badgeColor}`}>
                      {m.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400">{m.role}</h4>
                  <div className="text-xs text-slate-400 font-light flex items-center justify-between mt-1">
                    <span>{m.company}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{m.location}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Mission Expanded Detail Card */}
            <div id="mission-detail-view" role="tabpanel" aria-labelledby={`mission-btn-${selectedMission}`} className="lg:col-span-7 bg-[#0a0f1a] border border-slate-800 rounded-2xl p-8 relative shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1">
                    {MISSIONS[selectedMission].company} {"//"} {MISSIONS[selectedMission].location}
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {MISSIONS[selectedMission].role}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                    {MISSIONS[selectedMission].period}
                  </span>
                </div>
              </div>

              <div className="py-6 space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  Desglose Técnico y Responsabilidades:
                </div>
                {MISSIONS[selectedMission].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300 font-light leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                  Tecnologías & Competencias Clave:
                </div>
                <div className="flex flex-wrap gap-2">
                  {MISSIONS[selectedMission].tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 bg-slate-900/90 text-slate-300 border border-slate-800 rounded-lg hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: ARSENAL TÉCNICO & DNA (GAUGES & METRICS) */}
        {/* ==================================================================== */}
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SKILLS_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[#090e17] border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-800">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-wide">{cat.category}</h4>
                    </div>

                    <div className="space-y-4">
                      {cat.items.map((item, j) => (
                        <div key={j} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-300 font-medium">{item.name}</span>
                            <span className="font-mono text-cyan-400 text-[11px] font-bold">{item.level}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: `${item.bar}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>CAPACIDAD DE DESPLIEGUE</span>
                    <span className="text-emerald-400">AUTOEVALUACIÓN</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: FORMACIÓN ACADÉMICA & CERTIFICACIONES OFICIALES */}
        {/* ==================================================================== */}
        {activeTab === "education" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Trayectoria Académica */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
                EDUCACIÓN SUPERIOR & TÉCNICA
              </div>
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all ${
                    edu.highlight
                      ? "bg-gradient-to-br from-cyan-950/20 to-transparent border-cyan-500/40 shadow-xl"
                      : "bg-[#090e17] border-slate-800"
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-500 mb-1">{edu.period}</div>
                  <h4 className="text-base font-bold text-white">{edu.title}</h4>
                  <div className="text-xs text-cyan-400 font-medium mb-3">{edu.institution}</div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{edu.desc}</p>
                </div>
              ))}
            </div>

            {/* Credenciales y Cursos Verificables */}
            <div className="lg:col-span-7 bg-[#0a0f18] p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  DIPLOMAS & CERTIFICACIONES VERIFICABLES
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="search"
                    value={certQuery}
                    onChange={(e) => setCertQuery(e.target.value)}
                    placeholder="Filtrar acreditación…"
                    className="w-44 px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 font-mono"
                    aria-label="Filtrar certificaciones"
                  />
                  <span className="text-[10px] font-mono tabular-nums text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/30 shrink-0">
                    {filteredCerts.length} REGISTROS
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCerts.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                        <span>{cert.category}</span>
                        {cert.verifiable && <span className="text-emerald-400">✓ Verificable</span>}
                      </div>
                      <h5 className="text-xs font-bold text-slate-200 leading-snug">{cert.title}</h5>
                    </div>
                    <div className="text-[10px] text-slate-500 font-light mt-2 pt-2 border-t border-slate-800/40">
                      {cert.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: IDIOMAS & MATRIZ POLÍGLOTA */}
        {/* ==================================================================== */}
        {activeTab === "languages" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {LANGUAGES.map((lang, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#090e17] border border-slate-800 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">COMPETENCIA</div>
                  <h4 className="text-2xl font-black text-white">{lang.name}</h4>
                  <div className="text-sm font-bold text-cyan-400 font-mono mt-1">{lang.level}</div>
                  <p className="text-xs text-slate-400 font-light mt-2">{lang.badge}</p>
                </div>

                <div className="space-y-2">
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${lang.percent}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 text-right">
                    Nivel MCER autodeclarado
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
