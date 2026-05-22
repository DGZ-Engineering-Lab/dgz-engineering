"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Globe, 
  BarChart3, 
  Brain, 
  Building, 
  Route, 
  Sprout, 
  Wind, 
  Cloud, 
  Plane, 
  Code, 
  Check, 
  ArrowUpRight,
  Compass,
  Zap,
  ArrowRight,
  Shield,
  Activity,
  Award
} from "lucide-react";

// Mapeo estratégico de colores para Tailwind v4
const COLOR_THEMES = {
  cyan: {
    text: "text-cyan-600",
    bg: "bg-cyan-50/70",
    border: "border-slate-200 hover:border-cyan-400/40",
    glow: "bg-cyan-500/5 group-hover:bg-cyan-500/10",
    badge: "text-cyan-600 bg-cyan-50 border-cyan-200",
    dot: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]",
  },
  indigo: {
    text: "text-indigo-600",
    bg: "bg-indigo-50/70",
    border: "border-slate-200 hover:border-indigo-400/40",
    glow: "bg-indigo-500/5 group-hover:bg-indigo-500/10",
    badge: "text-indigo-600 bg-indigo-50 border-indigo-200",
    dot: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]",
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-50/70",
    border: "border-slate-200 hover:border-purple-400/40",
    glow: "bg-purple-500/5 group-hover:bg-purple-500/10",
    badge: "text-purple-600 bg-purple-50 border-purple-200",
    dot: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.3)]",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-50/70",
    border: "border-slate-200 hover:border-blue-500/40",
    glow: "bg-blue-500/5 group-hover:bg-blue-500/10",
    badge: "text-blue-600 bg-blue-50 border-blue-200",
    dot: "bg-blue-505 shadow-[0_0_8px_rgba(59,130,246,0.3)]",
  },
  emerald: {
    text: "text-emerald-600",
    bg: "bg-emerald-50/70",
    border: "border-slate-200 hover:border-emerald-500/40",
    glow: "bg-emerald-500/5 group-hover:bg-emerald-500/10",
    badge: "text-emerald-600 bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
  },
  teal: {
    text: "text-teal-600",
    bg: "bg-teal-50/70",
    border: "border-slate-200 hover:border-teal-500/40",
    glow: "bg-teal-500/5 group-hover:bg-teal-500/10",
    badge: "text-teal-600 bg-teal-50 border-teal-200",
    dot: "bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.3)]",
  },
  orange: {
    text: "text-orange-600",
    bg: "bg-orange-50/70",
    border: "border-slate-200 hover:border-orange-500/40",
    glow: "bg-orange-500/5 group-hover:bg-orange-500/10",
    badge: "text-orange-600 bg-orange-50 border-orange-200",
    dot: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.3)]",
  },
  red: {
    text: "text-rose-600",
    bg: "bg-rose-50/70",
    border: "border-slate-200 hover:border-rose-500/40",
    glow: "bg-rose-500/5 group-hover:bg-rose-500/10",
    badge: "text-rose-600 bg-rose-50 border-rose-200",
    dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]",
  },
  pink: {
    text: "text-pink-600",
    bg: "bg-pink-50/70",
    border: "border-slate-200 hover:border-pink-500/40",
    glow: "bg-pink-500/5 group-hover:bg-pink-500/10",
    badge: "text-pink-600 bg-pink-50 border-pink-200",
    dot: "bg-pink-505 shadow-[0_0_8px_rgba(236,72,153,0.3)]",
  }
};
const STRATEGIC_CAPAS = [
  {
    id: "capa-1",
    label: "CAPA 01 // INTELIGENCIA",
    tagline: "El Core Analítico y de Decisión",
    description: "Aquí está nuestro diferenciador real. No ejecutamos tareas aisladas; combinamos cartografía, analítica y modelos predictivos de IA para habilitar decisiones soberanas y de alto impacto sobre el territorio.",
    services: [
      {
        id: "SVC-C1-01",
        slug: "gis-geointelligence",
        title: "GIS & GEOINTELLIGENCE",
        concept: "Convertimos datos geográficos en inteligencia territorial mediante análisis espacial, plataformas geoespaciales y visualización avanzada.",
        theme: "cyan",
        icon: Globe,
        capacidades: [
          "Cartografía digital de alta precisión",
          "WebGIS y visores interactivos corporativos",
          "Análisis espacial multicriterio avanzado",
          "Integración y normalización de bases geográficas",
          "Teledetección y procesamiento satelital automatizado",
          "Catastro multipropósito (Estándar LADM-COL v3.0)",
          "Automatización integral de geoprocesos",
          "Dashboards y analítica espacial en tiempo real"
        ],
        enfoque: "Inteligencia territorial soberana en tiempo real, operada nativamente en la nube e integrada con modelos avanzados de IA."
      },
      {
        id: "SVC-C1-02",
        slug: "data-analytics-bi",
        title: "DATA ANALYTICS & BI",
        concept: "Transformamos datos en decisiones mediante analítica avanzada, visualización estratégica y modelos estadísticos predictivos.",
        theme: "indigo",
        icon: BarChart3,
        capacidades: [
          "Data analytics e ingeniería de datos",
          "Business Intelligence (BI) para toma de decisiones",
          "Dashboards ejecutivos e interactivos",
          "Automatización de reportes analíticos complejos",
          "Modelos estadísticos aplicados al territorio",
          "Integración de fuentes de datos heterogéneas",
          "Definición y monitoreo de KPIs operacionales",
          "Análisis predictivo de tendencias territoriales"
        ],
        enfoque: "Analítica de alto rendimiento conectada al territorio, el marco de cumplimiento normativo y la viabilidad fiscal."
      },
      {
        id: "SVC-C1-03",
        slug: "ia-automatizacion",
        title: "IA & AUTOMATIZACIÓN",
        concept: "Diseñamos soluciones inteligentes basadas en IA para optimizar procesos complejos, reducir tiempos y anticipar escenarios territoriales.",
        theme: "purple",
        icon: Brain,
        capacidades: [
          "Machine Learning avanzado para territorio",
          "Computer Vision para análisis de coberturas",
          "Modelos NLP y agentes inteligentes",
          "Automatización robótica de procesos técnicos",
          "Automatización de topologías y flujos GIS",
          "Procesamiento documental inteligente catastral",
          "Modelado predictivo de cambios en el suelo",
          "Agentes autónomos de soporte de datos"
        ],
        enfoque: "IA práctica aplicada directamente a datos territoriales, optimización de infraestructura y operaciones de ingeniería."
      }
    ]
  },
  {
    id: "capa-2",
    label: "CAPA 02 // SOLUCIONES",
    tagline: "Resultados Tangibles en Sectores Clave",
    description: "Aquí es donde la tecnología e inteligencia se convierten en resultados de negocio. Traducimos la complejidad de los datos en valor sectorial para arquitectura, infraestructura, agricultura y sostenibilidad.",
    services: [
      {
        id: "SVC-C2-01",
        slug: "arquitectura-inteligente",
        title: "ARQUITECTURA INTELIGENTE",
        concept: "Diseñamos proyectos arquitectónicos integrando modelación digital avanzada, datos del territorio y análisis geoespacial.",
        theme: "blue",
        icon: Building,
        capacidades: [
          "Diseño arquitectónico conceptual y técnico",
          "Modelado 2D / 3D de alta fidelidad",
          "Planimetría digital e información catastral",
          "BIM (Building Information Modeling)",
          "Gemelos digitales para gestión de activos",
          "Renderizado fotorrealista y visualización 3D",
          "Integración de datos GIS + Arquitectura",
          "Análisis urbano y planificación territorial"
        ],
        enfoque: "Proyectos arquitectónicos optimizados de extremo a extremo y guiados por datos geográficos y territoriales precisos."
      },
      {
        id: "SVC-C2-02",
        slug: "infraestructura-vial-digital",
        title: "INFRAESTRUCTURA VIAL DIGITAL",
        concept: "Optimizamos proyectos de infraestructura mediante análisis geoespacial estratégico, captura de datos de alta precisión y monitoreo continuo.",
        theme: "emerald",
        icon: Route,
        capacidades: [
          "Estudios topográficos terrestres y aéreos",
          "Fotogrametría vial de alta resolución",
          "Modelos digitales del terreno (DTM/DSM)",
          "Inventario vial digital y gestión de activos",
          "Monitoreo temporal de avance de obras",
          "Gestión y planeación de corredores viales",
          "Supervisión y control geoespacial de proyectos",
          "Análisis de cuencas e hidrología vial"
        ],
        enfoque: "Infraestructuras viales planificadas y gestionadas en tiempo real mediante datos geográficos milimétricos."
      },
      {
        id: "SVC-C2-03",
        slug: "agricultura-precision",
        title: "AGRICULTURA DE PRECISIÓN",
        concept: "Mejoramos el rendimiento y rentabilidad agrícola mediante monitoreo remoto de cultivos, análisis territorial e índices biofísicos.",
        theme: "teal",
        icon: Sprout,
        capacidades: [
          "Diseño de sistemas de agricultura de precisión",
          "Monitoreo satelital y aéreo continuo de cultivos",
          "Cálculo de índices de vegetación (NDVI, SAVI, etc.)",
          "Análisis multiespectral de suelo y planta",
          "Zonificación agrícola y aptitud de tierras",
          "Gestión hídrica y eficiencia de riego",
          "Detección temprana de anomalías y estrés vegetal",
          "Modelos de predicción de rendimiento de cosecha"
        ],
        enfoque: "Producción y gestión agrícola inteligente impulsada por análisis territorial y teledetección predictiva."
      },
      {
        id: "SVC-C2-04",
        slug: "gestion-ambiental-inteligente",
        title: "GESTIÓN AMBIENTAL INTELIGENTE",
        concept: "Apoyamos la sostenibilidad y resiliencia de proyectos mediante análisis de vulnerabilidad, monitoreo ambiental y cumplimiento normativo.",
        theme: "teal",
        icon: Wind,
        capacidades: [
          "Monitoreo ambiental sistémico multitemporal",
          "Clasificación y análisis de coberturas vegetales",
          "Evaluación de impacto ambiental y licencias",
          "Modelamiento y gestión de recursos hídricos",
          "Análisis de riesgo natural y cambio climático",
          "Monitoreo de deforestación y cambio de uso de suelo",
          "Estudios territoriales y ordenamiento ambiental",
          "Sistemas de alerta temprana de pasivos ambientales"
        ],
        enfoque: "Cumplimiento normativo y sostenibilidad corporativa basados en datos empíricos y monitoreo geoespacial permanente."
      }
    ]
  },
  {
    id: "capa-3",
    label: "CAPA 03 // TECNOLOGÍA",
    tagline: "Infraestructura de Soporte y Escala",
    description: "Esto es lo que nos convierte en una empresa de tecnología real y no solo en una consultora. Diseñamos, escalamos y operamos las plataformas robustas sobre las cuales corren las soluciones de misión crítica.",
    services: [
      {
        id: "SVC-C3-01",
        slug: "devops-cloud-engineering",
        title: "DEVOPS & CLOUD ENGINEERING",
        concept: "Diseñamos e implementamos infraestructuras tecnológicas sumamente robustas, automatizadas, resilientes y escalables.",
        theme: "orange",
        icon: Cloud,
        capacidades: [
          "Pipelines CI/CD totalmente automatizados",
          "Contenedores y microservicios (Docker/Kubernetes)",
          "Infraestructura como Código (IaC - Terraform/Ansible)",
          "Automatización completa de despliegues multicloud",
          "Sistemas de monitoreo proactivo y observabilidad",
          "Arquitecturas de almacenamiento cloud distribuido",
          "Políticas de seguridad Zero-Trust (DevSecOps)",
          "Optimización de costos y disponibilidad del 99.9%"
        ],
        enfoque: "Infraestructura tecnológica cloud robusta, optimizada específicamente para Big Data, GIS e IA territorial."
      },
      {
        id: "SVC-C3-02",
        slug: "drones-earth-data",
        title: "DRONES & EARTH DATA",
        concept: "Capturamos datos geoespaciales precisos del mundo real utilizando sensores aerotransportados de última generación.",
        theme: "red",
        icon: Plane,
        capacidades: [
          "Fotogrametría aérea de altísima resolución",
          "Escaneo LiDAR y modelos de nube de puntos",
          "Generación de ortofotos métricas calibradas",
          "Modelos 3D y gemelos digitales de elevación",
          "Inspección técnica de infraestructura inaccesible",
          "Monitoreo de avance y auditoría de volumen de tierras",
          "Seguimiento automatizado y patrullaje de activos",
          "Integración nativa de datos de campo a pipelines GIS"
        ],
        enfoque: "Captura ágil e industrial de datos espaciales georreferenciados con precisión subcentimétrica."
      },
      {
        id: "SVC-C3-03",
        slug: "desarrollo-software",
        title: "DESARROLLO DE SOFTWARE",
        concept: "Desarrollamos aplicaciones web, plataformas robustas y sistemas integrados a la medida orientados a datos y automatización.",
        theme: "pink",
        icon: Code,
        capacidades: [
          "Desarrollo frontend web moderno interactivo",
          "Arquitectura de APIs robustas de alto rendimiento",
          "Plataformas WebGIS y geoportales interactivos",
          "Visualizadores en tiempo real de analítica compleja",
          "Aplicaciones empresariales para gestión interna",
          "Integración de sistemas cloud heredados",
          "Herramientas internas para optimización de procesos",
          "Soporte de frameworks analíticos y geoprocesamiento"
        ],
        enfoque: "Sistemas digitales y software propietario especializado en big data, análisis espacial y automatización catastral."
      }
    ]
  }
];

export default function ServicesSection() {
  const [activeCapa, setActiveCapa] = useState("capa-1");

  const currentCapaData = STRATEGIC_CAPAS.find(c => c.id === activeCapa);

  return (
    <section id="services" className="relative w-full py-32 z-10 bg-transparent border-t border-slate-100 overflow-hidden">
      {/* Luces y brillos decorativos premium en background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado Principal */}
        <div className="flex flex-col items-center text-center mb-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500"></div>
            <span className="text-cyan-600 font-mono text-xs tracking-[0.4em] uppercase font-bold">Modelo Estratégico</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-[1.05] max-w-5xl"
          >
            Ecosistema de Soluciones <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 italic">
              Soberanía Territorial
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-slate-600 text-base md:text-lg font-light leading-relaxed max-w-2xl"
          >
            No vendemos servicios sueltos. Desplegamos un sistema completo de valor estructurado en tres capas operacionales para transformar el territorio.
          </motion.p>
        </div>

        {/* PIPELINE DE VALOR ("CÓMO TRABAJAMOS") */}
        <div className="mb-28 relative z-20">
          <div className="glass-card-premium rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 via-transparent to-purple-500/3 pointer-events-none"></div>
            
            <div className="text-center md:text-left mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest block mb-2">OPERATIONAL WORKFLOW</span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">El Ecosistema Completo de Valor</h3>
              </div>
              <div className="px-5 py-2.5 bg-cyan-50 border border-cyan-200 rounded-full text-[10px] font-mono text-cyan-600 uppercase tracking-widest font-black">
                End-To-End Pipeline
              </div>
            </div>

            {/* Pipeline Stepper Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Línea conectora entre pasos (Desktop Only) */}
              <div className="absolute top-[35px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-rose-200 via-orange-200 via-cyan-200 to-emerald-200 hidden md:block z-0"></div>

              {[
                { 
                  step: "01", 
                  title: "CAPTURA DE DATOS", 
                  desc: "A través de sensores aerotransportados LiDAR, Drones y datos satelitales calibrados.", 
                  badge: "CAPA 3",
                  color: "border-rose-200 text-rose-600",
                  bg: "bg-rose-50/50"
                },
                { 
                  step: "02", 
                  title: "PROCESAMIENTO", 
                  desc: "Soporte de software robusto y arquitecturas cloud seguras de escala masiva.", 
                  badge: "CAPA 3",
                  color: "border-orange-200 text-orange-600",
                  bg: "bg-orange-50/50"
                },
                { 
                  step: "03", 
                  title: "INTELIGENCIA", 
                  desc: "Analítica geoespacial compleja con Polars y algoritmos predictivos con IA.", 
                  badge: "CAPA 1",
                  color: "border-cyan-200 text-cyan-600",
                  bg: "bg-cyan-50/50"
                },
                { 
                  step: "04", 
                  title: "DECISIÓN", 
                  desc: "Sectores optimizados con soluciones técnicas y de cumplimiento normativo.", 
                  badge: "CAPA 2",
                  color: "border-emerald-200 text-emerald-600",
                  bg: "bg-emerald-50/50"
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`group relative p-6 rounded-2xl border bg-white/60 z-10 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 shadow-sm ${item.color} ${item.bg}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-2xl font-black text-slate-800">{item.step}</span>
                    <span className="px-3 py-1 rounded-full border text-[8px] font-mono font-bold tracking-widest">{item.badge}</span>
                  </div>
                  <h4 className="text-sm font-black tracking-wider text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors uppercase">{item.title}</h4>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENEDOR DE PESTAÑAS (TAB SELECTOR) */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch relative z-10">
          
          {/* Columna Izquierda: Botones de Pestaña */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-2 border-b border-slate-100 pb-3">
              Arquitectura de Negocio
            </div>

            {STRATEGIC_CAPAS.map((capa) => {
              const isSelected = activeCapa === capa.id;
              
              return (
                <button
                  key={capa.id}
                  onClick={() => setActiveCapa(capa.id)}
                  className={`w-full text-left p-6 rounded-3xl border transition-all duration-500 group relative overflow-hidden flex flex-col justify-between ${
                    isSelected 
                      ? "bg-white border-cyan-500/30 shadow-[0_8px_30px_rgba(6,182,212,0.05)] scale-[1.01]" 
                      : "bg-white/50 border-slate-200/80 hover:border-slate-350 hover:bg-slate-50/70"
                  }`}
                >
                  {/* Sliding Background Glow */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none animate-[pulse_3s_infinite]"></div>
                  )}

                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-mono font-bold tracking-[0.25em] ${isSelected ? "text-cyan-600" : "text-slate-400"}`}>
                        {capa.label}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
                      )}
                    </div>
                    <div className={`text-xl font-black tracking-tight leading-none ${isSelected ? "text-slate-950" : "text-slate-400 group-hover:text-slate-650 transition-colors"}`}>
                      {capa.tagline}
                    </div>
                  </div>

                  {/* Shimmer line indicator */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-600 w-full z-20"></div>
                  )}
                </button>
              );
            })}

            {/* Cuadro de resumen estratégico */}
            <div className="bg-slate-50/60 border border-slate-200/80 rounded-3xl p-6 mt-4 hidden lg:block">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-3">CONCEPTO MAESTRO</span>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                El valor estratégico real surge al integrar las 3 capas: capturamos la realidad con tecnología, la organizamos y modelamos con inteligencia analítica, y ejecutamos soluciones específicas para cada sector económico del país.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Contenido Dinámico (Cards Grid) */}
          <div className="lg:w-2/3 flex flex-col">
            <div className="glass-card-premium rounded-[2rem] p-8 lg:p-10 flex-1 flex flex-col">
              
              {/* Encabezado del contenido de la capa */}
              <div className="mb-10 pb-8 border-b border-slate-200/80">
                <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-[0.2em] font-black block mb-2">ACTIVE ARCHITECTURE LAYER</span>
                <h3 className="text-2xl font-black text-slate-950 tracking-tight mb-4">{currentCapaData.label}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  {currentCapaData.description}
                </p>
              </div>

              {/* Grid de servicios activos */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapa}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-stretch"
                >
                  {currentCapaData.services.map((svc) => {
                    const theme = COLOR_THEMES[svc.theme];
                    const IconComponent = svc.icon;

                    return (
                      <div
                        key={svc.id}
                        className={`group relative flex flex-col p-8 rounded-3xl bg-[#03060c] border ${theme.border} transition-all duration-500 hover:-translate-y-1.5 shadow-2xl overflow-hidden`}
                      >
                        {/* Glow de fondo animado en hover */}
                        <div className={`absolute -top-24 -right-24 w-44 h-44 blur-[50px] transition-all duration-700 rounded-full pointer-events-none ${theme.glow}`}></div>

                        {/* Top ID & Badge */}
                        <div className="flex justify-between items-start mb-6">
                          <span className="font-mono text-[9px] text-slate-500 tracking-[0.2em]">{svc.id}</span>
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[8px] font-black tracking-[0.1em] ${theme.badge}`}>
                            <span className={`w-1.2 h-1.2 rounded-full ${theme.dot}`}></span>
                            {activeCapa === "capa-1" ? "CORE SYSTEM" : activeCapa === "capa-2" ? "SECTOR SOLUTION" : "TECH PLATFORM"}
                          </div>
                        </div>

                        {/* Icon Container */}
                        <div className={`mb-6 p-4 rounded-xl border border-slate-800 group-hover:border-cyan-500/30 group-hover:bg-[#070b15] transition-all duration-500 inline-flex items-center justify-center self-start text-cyan-400 ${theme.bg}`}>
                          <IconComponent className={`w-6 h-6 ${theme.text}`} />
                        </div>

                        {/* Title & Concept */}
                        <h4 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">
                          {svc.title}
                        </h4>
                        <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                          {svc.concept}
                        </p>

                        {/* Capacidades Específicas */}
                        <div className="space-y-2 border-t border-slate-900/80 pt-6 mb-8 flex-1">
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block mb-3">SERVICIOS DE VALOR</span>
                          {svc.capacidades.slice(0, 4).map((cap, cIdx) => (
                            <div key={cIdx} className="flex gap-2 items-start text-[11px] text-slate-400 font-light leading-snug">
                              <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${theme.text}`} />
                              <span>{cap}</span>
                            </div>
                          ))}
                          {svc.capacidades.length > 4 && (
                            <div className="text-[9px] font-mono text-slate-500 pl-5 pt-1">
                              + {svc.capacidades.length - 4} capacidades adicionales
                            </div>
                          )}
                        </div>

                        {/* Enfoque Diferencial */}
                        <div className="bg-[#050914] border border-slate-900/60 p-4 rounded-xl mb-6">
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block mb-1">ENFOQUE DIFERENCIAL</span>
                          <p className="text-[10px] text-slate-300 font-light leading-relaxed">
                            {svc.enfoque}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <Link 
                          href={`/services/${svc.slug}`}
                          className="w-full py-3.5 bg-slate-950 hover:bg-[#070b15] border border-slate-850 hover:border-cyan-500/40 rounded-xl text-[9px] font-mono text-white uppercase tracking-[0.2em] font-black transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md"
                        >
                          <span>Explorar Solución</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
