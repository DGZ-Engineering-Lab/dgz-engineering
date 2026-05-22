"use client";

import { useState, useEffect, useRef } from "react";
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
  Zap,
  Play,
  RotateCw,
  Droplet,
  Layers,
  Terminal,
  Clock,
  Compass,
  Database,
  Cpu
} from "lucide-react";

// Mapeo estratégico de colores para Tailwind
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

// Flujo operacional con mapeos
const OPERATIONAL_STEPS = [
  { step: "01", title: "CAPTURA DE DATOS", slug: "drones-earth-data", capa: "capa-3", color: "from-rose-500 to-orange-500", desc: "Sensores LiDAR y drones." },
  { step: "02", title: "PROCESAMIENTO", slug: "devops-cloud-engineering", capa: "capa-3", color: "from-orange-500 to-cyan-500", desc: "Software robusto y cloud." },
  { step: "03", title: "INTELIGENCIA", slug: "gis-geointelligence", capa: "capa-1", color: "from-cyan-500 to-indigo-500", desc: "Analítica geoespacial e IA." },
  { step: "04", title: "DECISIÓN", slug: "arquitectura-inteligente", capa: "capa-2", color: "from-indigo-500 to-emerald-500", desc: "Soluciones y cumplimiento." }
];

export default function ServicesSection() {
  const [activeCapa, setActiveCapa] = useState("capa-1");
  const [activeServiceSlug, setActiveServiceSlug] = useState("gis-geointelligence");
  
  // Buscar datos activos
  const currentCapaData = STRATEGIC_CAPAS.find(c => c.id === activeCapa);
  const activeService = currentCapaData?.services.find(s => s.slug === activeServiceSlug) || STRATEGIC_CAPAS.flatMap(c => c.services).find(s => s.slug === activeServiceSlug);

  // Al cambiar la capa, activar el primer servicio de esta
  const handleCapaChange = (capaId) => {
    setActiveCapa(capaId);
    const targetCapa = STRATEGIC_CAPAS.find(c => c.id === capaId);
    if (targetCapa && targetCapa.services.length > 0) {
      setActiveServiceSlug(targetCapa.services[0].slug);
    }
  };

  // Determinar en qué paso del Pipeline de Valor cae el servicio activo
  const getPipelineActiveStep = () => {
    if (!activeServiceSlug) return 0;
    if (activeServiceSlug === "drones-earth-data") return 0;
    if (activeServiceSlug === "devops-cloud-engineering" || activeServiceSlug === "desarrollo-software") return 1;
    if (activeServiceSlug === "gis-geointelligence" || activeServiceSlug === "data-analytics-bi" || activeServiceSlug === "ia-automatizacion") return 2;
    return 3; // Soluciones
  };

  const activePipelineStep = getPipelineActiveStep();

  const handlePipelineClick = (step) => {
    const targetCapa = step.capa;
    setActiveCapa(targetCapa);
    setActiveServiceSlug(step.slug);
  };

  return (
    <section id="services" className="relative w-full py-20 lg:py-28 z-10 bg-transparent border-t border-slate-100 overflow-hidden">
      {/* Luces y brillos decorativos en background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Encabezado Principal */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
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
            className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-[1.1] max-w-5xl"
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
            className="mt-4 text-slate-600 text-sm md:text-base font-light leading-relaxed max-w-2xl"
          >
            No vendemos servicios sueltos. Desplegamos un sistema completo de valor estructurado en tres capas operacionales para transformar el territorio.
          </motion.p>
        </div>

        {/* CONTENEDOR UNIFICADO DEL DASHBOARD (CENTRO DE CONTROL) */}
        <div className="glass-card-premium rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl relative overflow-hidden bg-white/70 backdrop-blur-md z-20 flex flex-col">
          
          {/* Fila Superior: Pipeline de Valor Integrado */}
          <div className="p-6 md:p-8 border-b border-slate-200/80 bg-slate-50/40">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-widest block mb-1">OPERATIONAL PIPELINE</span>
                <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Flujo de Valor Territorial</h3>
              </div>
              <div className="px-4 py-1.5 bg-cyan-50 border border-cyan-200 rounded-full text-[9px] font-mono text-cyan-600 uppercase tracking-widest font-black">
                End-To-End Pipeline
              </div>
            </div>

            {/* Stepper Horizontal Interactivo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
              {/* Línea conectora base */}
              <div className="absolute top-[22px] left-[12%] right-[12%] h-[2px] bg-slate-200 hidden md:block z-0"></div>
              {/* Línea de progreso de color gradiente */}
              <div 
                className="absolute top-[22px] left-[12%] h-[2px] bg-gradient-to-r from-cyan-500 to-indigo-500 hidden md:block z-0 transition-all duration-700 ease-in-out"
                style={{ width: `${activePipelineStep * 25 + 2}%` }}
              ></div>

              {OPERATIONAL_STEPS.map((step, idx) => {
                const isActive = activePipelineStep === idx;
                const isPassed = activePipelineStep >= idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handlePipelineClick(step)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-white/50 text-left hover:border-slate-350 hover:bg-white z-10 transition-all group"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black transition-all ${
                      isActive 
                        ? `bg-gradient-to-r ${step.color} text-white shadow-md shadow-cyan-500/20 scale-105` 
                        : isPassed
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-400"
                    }`}>
                      {step.step}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-[10px] font-black tracking-wider transition-colors ${
                        isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-[9px] text-slate-400 truncate hidden sm:block">
                        {step.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fila Principal: Panel Izquierdo (Selección) & Panel Derecho (Visualizador + Simulador) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px] lg:min-h-[640px]">
            
            {/* Panel Izquierdo: Selectores de Capa y de Servicios (col-span-4) */}
            <div className="col-span-12 lg:col-span-4 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col gap-6 bg-slate-50/20">
              
              {/* Segmented Control de Capas */}
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-3">
                  Capa Operacional
                </span>
                <div className="flex bg-slate-100 p-1 rounded-xl relative">
                  {STRATEGIC_CAPAS.map((capa) => {
                    const isSelected = activeCapa === capa.id;
                    return (
                      <button
                        key={capa.id}
                        onClick={() => handleCapaChange(capa.id)}
                        className={`flex-1 text-center py-2 text-[10px] font-bold rounded-lg relative z-10 transition-colors uppercase tracking-wider ${
                          isSelected ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeCapaBg"
                            className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        Capa {capa.id.split("-")[1]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lista Vertical de Servicios de la Capa Activa */}
              <div className="flex-1 flex flex-col gap-3">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
                  Servicios en la Capa
                </span>
                
                <div className="space-y-2.5">
                  {currentCapaData?.services.map((svc) => {
                    const isSelected = activeServiceSlug === svc.slug;
                    const theme = COLOR_THEMES[svc.theme];
                    const IconComponent = svc.icon;

                    return (
                      <button
                        key={svc.slug}
                        onClick={() => setActiveServiceSlug(svc.slug)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 relative overflow-hidden ${
                          isSelected
                            ? "bg-white border-slate-200 shadow-md shadow-slate-100 scale-[1.01]"
                            : "bg-white/40 border-slate-200/60 hover:bg-white/80 hover:border-slate-300"
                        }`}
                      >
                        {/* Indicador de borde dinámico izquierdo */}
                        {isSelected && (
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${theme.dot}`} />
                        )}

                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? theme.bg : "bg-slate-100/80 text-slate-400"
                        }`}>
                          <IconComponent className={`w-4.5 h-4.5 ${isSelected ? theme.text : ""}`} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[8px] font-mono text-slate-400 tracking-wider">
                              {svc.id}
                            </span>
                            {isSelected && (
                              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
                            )}
                          </div>
                          <div className={`text-xs font-bold leading-tight truncate ${
                            isSelected ? "text-slate-900" : "text-slate-650"
                          }`}>
                            {svc.title}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Caja de Concepto Maestro Contextual */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm hidden lg:block">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">CONCEPTO CAPA</span>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                  {currentCapaData?.description}
                </p>
              </div>

            </div>

            {/* Panel Derecho: Detalles del Servicio + Simulador Interactivo (col-span-8) */}
            <div className="col-span-12 lg:col-span-8 p-6 md:p-8 flex flex-col gap-8 bg-slate-50/10 justify-between">
              
              {activeService ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-full">
                  
                  {/* Sub-columna Izquierda: Información de Detalles (col-span-5) */}
                  <div className="md:col-span-5 flex flex-col justify-between gap-6">
                    
                    <div className="space-y-4">
                      {/* Badge superior */}
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-[8px] font-mono font-bold tracking-wider rounded-md text-slate-500 uppercase">
                          {activeService.id}
                        </span>
                        <span className="text-[8px] font-mono text-cyan-600 uppercase tracking-widest font-black">
                          {activeCapa === "capa-1" ? "Inteligencia" : activeCapa === "capa-2" ? "Soluciones" : "Tecnología"}
                        </span>
                      </div>

                      {/* Título y Concepto */}
                      <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-tight">
                        {activeService.title}
                      </h3>
                      
                      <p className="text-slate-500 text-xs font-light leading-relaxed">
                        {activeService.concept}
                      </p>

                      {/* Capacidades */}
                      <div className="pt-4 border-t border-slate-200/60 space-y-2">
                        <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                          Servicios de Valor
                        </span>
                        <div className="space-y-1.5">
                          {activeService.capacidades.slice(0, 4).map((cap, cIdx) => (
                            <div key={cIdx} className="flex gap-2 items-start text-[11px] text-slate-650 font-light leading-snug">
                              <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-cyan-600`} />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Enfoque Diferencial y Botón */}
                    <div className="space-y-4 pt-4 border-t border-slate-200/60">
                      <div className="bg-slate-100/50 border border-slate-200 p-3.5 rounded-xl">
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                          Enfoque Diferencial
                        </span>
                        <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                          {activeService.enfoque}
                        </p>
                      </div>

                      <Link 
                        href={`/services/${activeService.slug}`}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-950 border border-slate-800 rounded-xl text-[9px] font-mono text-white uppercase tracking-[0.2em] font-black transition-all flex items-center justify-center gap-2 group shadow-md"
                      >
                        <span>Explorar Solución</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>

                  </div>

                  {/* Sub-columna Derecha: Simulador Interactivo (col-span-7) */}
                  <div className="md:col-span-7 flex flex-col bg-[#02050a] border border-slate-800 rounded-2xl relative overflow-hidden h-[360px] md:h-auto min-h-[360px] shadow-2xl p-4">
                    
                    {/* Header de la consola de simulación */}
                    <div className="flex justify-between items-center pb-3 border-b border-slate-900 mb-3 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-300 font-bold">
                          Simulador Real // Activo
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                      </div>
                    </div>

                    {/* Cuerpo dinámico del simulador */}
                    <div className="flex-1 flex flex-col justify-between overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={activeServiceSlug}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="flex-1 flex flex-col justify-between overflow-hidden"
                        >
                          <ActiveSimulator slug={activeServiceSlug} theme={COLOR_THEMES[activeService.theme]} />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm font-light">
                  Selecciona un servicio para visualizar detalles.
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// COMPONENTE CONTENEDOR DE TODOS LOS SIMULADORES EN CÓDIGO PURO
function ActiveSimulator({ slug, theme }) {
  // Estados genéricos
  const [logs, setLogs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Helper para añadir logs
  const addLog = (text) => {
    const time = new Date().toLocaleTimeString().split(" ")[0];
    setLogs(prev => [...prev.slice(-4), `[${time}] ${text}`]);
  };

  // ==========================================
  // SIMULADOR 1: DRONES & EARTH DATA (Capa 3 - Captura)
  // ==========================================
  if (slug === "drones-earth-data") {
    const [dronePos, setDronePos] = useState({ x: 10, y: 10 });
    const [scanGrid, setScanGrid] = useState(Array(16).fill(false));
    
    useEffect(() => {
      let step = 0;
      const interval = setInterval(() => {
        const path = [
          { x: 10, y: 10, g: 0 }, { x: 35, y: 10, g: 1 }, { x: 60, y: 10, g: 2 }, { x: 85, y: 10, g: 3 },
          { x: 85, y: 35, g: 7 }, { x: 60, y: 35, g: 6 }, { x: 35, y: 35, g: 5 }, { x: 10, y: 35, g: 4 },
          { x: 10, y: 60, g: 8 }, { x: 35, y: 60, g: 9 }, { x: 60, y: 60, g: 10 }, { x: 85, y: 60, g: 11 },
          { x: 85, y: 85, g: 15 }, { x: 60, y: 85, g: 14 }, { x: 35, y: 85, g: 13 }, { x: 10, y: 85, g: 12 }
        ];
        const nextPos = path[step % path.length];
        setDronePos({ x: nextPos.x, y: nextPos.y });
        setScanGrid(prev => {
          const nextGrid = [...prev];
          nextGrid[nextPos.g] = true;
          return nextGrid;
        });
        
        if (step % 4 === 0) {
          addLog(`Dron barriendo sector ${nextPos.g + 1}...`);
        } else if (step % 4 === 2) {
          addLog(`LiDAR: Capturando a ${1400 + Math.floor(Math.random()*200)} pts/m²`);
        }
        
        step++;
      }, 900);
      return () => clearInterval(interval);
    }, []);

    const resetScan = () => {
      setScanGrid(Array(16).fill(false));
      addLog("Limpiando mapa y reiniciando misión");
    };

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* Telemetría en vivo */}
        <div className="grid grid-cols-3 gap-2 bg-[#060b14] border border-slate-900 p-2.5 rounded-lg text-slate-400 mb-3">
          <div>ALTITUD: <span className="text-cyan-400">120.4 m</span></div>
          <div>BATERÍA: <span className="text-emerald-400">92%</span></div>
          <div>ESTADO: <span className="text-rose-400 animate-pulse">ESCANEO</span></div>
        </div>

        {/* Ventana de visualización */}
        <div className="flex-1 bg-slate-950 border border-slate-900 rounded-xl relative overflow-hidden min-h-[160px] flex items-center justify-center">
          {/* Rejilla de fondo */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
          <div className="relative w-44 h-44 border border-slate-800 rounded bg-[#03060c]/80 p-1 grid grid-cols-4 gap-1.5">
            {scanGrid.map((scanned, i) => (
              <div 
                key={i} 
                className={`rounded-sm transition-all duration-700 flex flex-col justify-between p-1 ${
                  scanned 
                    ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300" 
                    : "bg-slate-900/30 border border-slate-950 text-slate-800"
                }`}
              >
                <span>S{i+1}</span>
                {scanned && <span className="text-[7px] text-cyan-400 self-end">LiDAR</span>}
              </div>
            ))}

            {/* Drone Icon */}
            <div 
              className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 pointer-events-none"
              style={{ left: `${dronePos.x}%`, top: `${dronePos.y}%` }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Cono de escaneo */}
                <div className="absolute w-12 h-12 bg-cyan-400/25 blur-sm rounded-full -z-10 animate-ping"></div>
                <div className="absolute w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center border border-white">
                  <Plane className="w-2.5 h-2.5 text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consola de logs */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-2.5 rounded-lg">
          <div className="text-slate-500 font-bold mb-1.5 uppercase text-[9px]">Log Drones:</div>
          <div className="space-y-0.5 min-h-[48px]">
            {logs.map((log, i) => (
              <div key={i} className="text-cyan-400/80 truncate">{log}</div>
            ))}
          </div>
          <button 
            onClick={resetScan}
            className="mt-2 w-full py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-white uppercase text-[8px] tracking-wider transition-colors"
          >
            Reiniciar Escaneo
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // SIMULADOR 2: DEVOPS & CLOUD ENGINEERING (Capa 3 - Procesamiento)
  // ==========================================
  if (slug === "devops-cloud-engineering") {
    const [pods, setPods] = useState([
      { name: "pod-gis-1", status: "Running", cpu: "12%" },
      { name: "pod-gis-2", status: "Running", cpu: "28%" },
      { name: "pod-auth-1", status: "Running", cpu: "4%" },
      { name: "pod-db-1", status: "Running", cpu: "42%" }
    ]);
    const [latency, setLatency] = useState(Array(15).fill(40));

    useEffect(() => {
      const interval = setInterval(() => {
        // Ticking pod metrics
        setPods(prev => prev.map(p => ({
          ...p,
          cpu: `${Math.floor(Math.random() * 45) + 3}%`
        })));

        // Ticking Latency sparkline
        setLatency(prev => [...prev.slice(1), Math.floor(Math.random() * 60) + 15]);

        if (Math.random() > 0.6) {
          addLog(`Kubernetes auto-scaler: Healthy, cluster load average 31%`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* Kubernetes Cluster diagram */}
        <div className="flex-1 grid grid-cols-2 gap-4 min-h-[160px]">
          {/* Node 1 */}
          <div className="bg-[#050a12]/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-2">
              <span className="font-bold text-cyan-400">NODE-MASTER</span>
              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 rounded">ACTIVE</span>
            </div>
            <div className="space-y-1.5">
              {pods.slice(0, 2).map((pod, i) => (
                <div key={i} className="flex justify-between items-center text-[9px] bg-black/40 p-1.5 rounded border border-slate-900">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-slate-300 font-bold">{pod.name}</span>
                  </div>
                  <span className="text-slate-500">CPU: {pod.cpu}</span>
                </div>
              ))}
            </div>
            <div className="text-[8px] text-slate-500 pt-2 text-right">MAGNA-SIRGAS Origin API</div>
          </div>

          {/* Node 2 */}
          <div className="bg-[#050a12]/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-2">
              <span className="font-bold text-indigo-400">NODE-COMPUTE</span>
              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 rounded">ACTIVE</span>
            </div>
            <div className="space-y-1.5">
              {pods.slice(2, 4).map((pod, i) => (
                <div key={i} className="flex justify-between items-center text-[9px] bg-black/40 p-1.5 rounded border border-slate-900">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-slate-300 font-bold">{pod.name}</span>
                  </div>
                  <span className="text-slate-500">CPU: {pod.cpu}</span>
                </div>
              ))}
            </div>
            <div className="text-[8px] text-slate-500 pt-2 text-right">LADM-COL Parser Node</div>
          </div>
        </div>

        {/* Latency Sparkline Graph */}
        <div className="mt-3 bg-[#03070f] border border-slate-900 p-2.5 rounded-lg flex flex-col">
          <div className="flex justify-between text-slate-500 text-[8px] mb-1 font-bold">
            <span>LATENCIA DEL PROCESADOR (ms)</span>
            <span className="text-emerald-400 font-mono">PROM: 32ms</span>
          </div>
          <div className="h-10 w-full flex items-end gap-0.5">
            {latency.map((val, i) => (
              <div 
                key={i} 
                className="flex-1 bg-cyan-500/30 border border-cyan-400/40 rounded-t-sm transition-all duration-300 hover:bg-cyan-400"
                style={{ height: `${val}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Logs */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-2.5 rounded-lg space-y-0.5 min-h-[40px]">
          {logs.map((log, i) => (
            <div key={i} className="text-emerald-400/80 truncate">{log}</div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // SIMULADOR 3: DESARROLLO DE SOFTWARE (Capa 3 - Procesamiento)
  // ==========================================
  if (slug === "desarrollo-software") {
    const [status, setStatus] = useState("idle");
    const [payload, setPayload] = useState(null);

    const executeQuery = () => {
      setStatus("loading");
      addLog("POST /api/v1/spatial/ladm-col/validate - Solicitud enviada...");
      
      setTimeout(() => {
        setStatus("success");
        setPayload({
          status: "success",
          timestamp: new Date().toISOString(),
          record: "NUPRE-1100101010012",
          validation: {
            topology: "VALID",
            overlaps: "0_DETECTED",
            magna_sirgas: "Magna-Sirgas / Origen-Unico"
          },
          polygon: {
            area_m2: 348.91,
            vertices: 4
          }
        });
        addLog("Response status: 200 OK. Estructura validada correctamente.");
      }, 1000);
    };

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* Request Input Area */}
        <div className="bg-[#050a12]/80 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-[8px] font-bold uppercase">
            <span>Query Console (API Sandbox)</span>
            <span className="text-cyan-400">HTTPS POST</span>
          </div>
          <div className="bg-black/60 border border-slate-900 p-2 rounded text-slate-300 text-[9px] leading-relaxed">
            <div><span className="text-rose-400">endpoint</span>: <span className="text-emerald-400">&quot;https://api.dgz.co/v1/spatial/validate&quot;</span></div>
            <div><span className="text-rose-400">headers</span>: &#123; Authorization: <span className="text-yellow-400">&quot;Bearer dgz_live_key_92c3...&quot;</span> &#125;</div>
            <div><span className="text-rose-400">body</span>: &#123; id: <span className="text-indigo-400">&quot;PARCEL-BOG-CHAPINERO&quot;</span>, format: <span className="text-indigo-400">&quot;LADM-COL-XTF&quot;</span> &#125;</div>
          </div>
          <button 
            onClick={executeQuery}
            disabled={status === "loading"}
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-bold uppercase text-[9px] tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/10 disabled:opacity-50"
          >
            <Play className="w-2.5 h-2.5 fill-black" />
            {status === "loading" ? "Procesando..." : "Ejecutar Consulta API"}
          </button>
        </div>

        {/* JSON Response Area */}
        <div className="flex-1 mt-3 bg-slate-950 border border-slate-900 rounded-xl p-3 overflow-hidden flex flex-col min-h-[120px]">
          <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-2 text-slate-500 text-[8px] font-bold uppercase">
            <span>API Response Body</span>
            {status === "idle" && <span className="text-slate-600">ESPERANDO EJECUCIÓN</span>}
            {status === "loading" && <span className="text-yellow-400 animate-pulse">CARGANDO DATA...</span>}
            {status === "success" && <span className="text-emerald-400">HTTP 200 OK</span>}
          </div>
          
          <div className="flex-1 overflow-auto scrollbar-hide text-[9px] leading-relaxed">
            {status === "success" && payload ? (
              <pre className="text-emerald-400/90 whitespace-pre">
                {JSON.stringify(payload, null, 2)}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 italic">
                {status === "loading" ? "Validando topología XML/XTF..." : "Haz clic arriba para simular la petición"}
              </div>
            )}
          </div>
        </div>

        {/* Logs */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-2 rounded text-cyan-400/80 min-h-[30px] truncate">
          {logs[logs.length - 1] || "[Sistema] Listo para recibir consultas catastrales estructuradas."}
        </div>
      </div>
    );
  }

  // ==========================================
  // SIMULADOR 4: GIS & GEOINTELLIGENCE (Capa 1 - Inteligencia)
  // ==========================================
  if (slug === "gis-geointelligence") {
    const [layerCatastro, setLayerCatastro] = useState(true);
    const [layerVias, setLayerVias] = useState(false);
    const [layerZonas, setLayerZonas] = useState(true);
    const [coords, setCoords] = useState({ x: "1,024,842.12", y: "854,921.43" });
    const [selectedParcel, setSelectedParcel] = useState(null);

    const handleMouseMove = (e) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      
      const geoX = (1000000 + x * 125.43).toFixed(2);
      const geoY = (850000 + y * 92.15).toFixed(2);
      setCoords({ x: geoX, y: geoY });
    };

    const handleParcelClick = (name, area, owner) => {
      setSelectedParcel({ name, area, owner });
      addLog(`Detalle Catastral: Seleccionada parcela ${name} (${area})`);
    };

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* Controles de Capas GIS */}
        <div className="flex gap-2 mb-3">
          <button 
            onClick={() => { setLayerCatastro(!layerCatastro); addLog(`Capa Catastro: ${!layerCatastro ? 'Visible' : 'Oculta'}`); }}
            className={`flex-1 py-1.5 px-2 rounded-lg border text-[8px] font-bold transition-all ${
              layerCatastro ? "bg-rose-500/10 border-rose-500/30 text-rose-400" : "bg-slate-950 border-slate-800 text-slate-500"
            }`}
          >
            [X] CATASTRO
          </button>
          <button 
            onClick={() => { setLayerVias(!layerVias); addLog(`Capa Red Vial: ${!layerVias ? 'Visible' : 'Oculta'}`); }}
            className={`flex-1 py-1.5 px-2 rounded-lg border text-[8px] font-bold transition-all ${
              layerVias ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : "bg-slate-950 border-slate-800 text-slate-500"
            }`}
          >
            [X] VÍAS
          </button>
          <button 
            onClick={() => { setLayerZonas(!layerZonas); addLog(`Capa Zonas Restringidas: ${!layerZonas ? 'Visible' : 'Oculta'}`); }}
            className={`flex-1 py-1.5 px-2 rounded-lg border text-[8px] font-bold transition-all ${
              layerZonas ? "bg-purple-500/10 border-purple-500/30 text-purple-400" : "bg-slate-950 border-slate-800 text-slate-500"
            }`}
          >
            [X] ZONAS
          </button>
        </div>

        {/* Visor de Mapa Interactivo */}
        <div 
          onMouseMove={handleMouseMove}
          className="flex-1 bg-slate-950 border border-slate-900 rounded-xl relative overflow-hidden min-h-[180px] flex items-center justify-center cursor-crosshair group"
        >
          {/* Rejilla de Fondo GIS */}
          <div className="absolute inset-0 opacity-[0.08] stroke-slate-800" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <svg viewBox="0 0 200 200" className="w-48 h-48 relative z-10">
            {/* Capa Zonas */}
            {layerZonas && (
              <polygon 
                points="20,40 180,20 160,180 50,150" 
                className="fill-purple-500/10 stroke-purple-500/30 stroke-[1] stroke-dasharray-[3,3]"
              />
            )}

            {/* Capa Catastro (Parcelas clickables) */}
            {layerCatastro && (
              <>
                <polygon 
                  points="30,50 90,60 80,120 25,110" 
                  onClick={() => handleParcelClick("PRCL-C1", "345 m²", "Soberania Terr. SAS")}
                  className="fill-rose-500/10 hover:fill-rose-500/30 stroke-rose-500 stroke-[1.2] transition-colors cursor-pointer"
                />
                <polygon 
                  points="90,60 160,50 150,130 80,120" 
                  onClick={() => handleParcelClick("PRCL-C2", "580 m²", "Nación Sector 4")}
                  className="fill-rose-500/10 hover:fill-rose-500/30 stroke-rose-500 stroke-[1.2] transition-colors cursor-pointer"
                />
              </>
            )}

            {/* Capa Vías */}
            {layerVias && (
              <path 
                d="M 10,140 Q 100,80 190,140" 
                className="fill-none stroke-yellow-500 stroke-[3] stroke-opacity-70"
              />
            )}
          </svg>

          {/* Telemetría y Coordenadas Flotantes */}
          <div className="absolute bottom-2 left-2 bg-black/85 border border-slate-800 p-2 rounded text-[8px] text-slate-300">
            <div>ESTE: <span className="text-cyan-400">{coords.x}</span></div>
            <div>NORTE: <span className="text-cyan-400">{coords.y}</span></div>
            <div className="text-[7px] text-slate-500 mt-1">SISTEMA: MAGNA-SIRGAS (Origen Unico)</div>
          </div>

          {/* Info de Parcela Seleccionada */}
          {selectedParcel && (
            <div className="absolute top-2 right-2 bg-black/90 border border-slate-800 p-2 rounded text-[8px] text-slate-300 max-w-[120px]">
              <div className="font-bold text-rose-400 mb-1">{selectedParcel.name}</div>
              <div>Área: {selectedParcel.area}</div>
              <div className="truncate">Titular: {selectedParcel.owner}</div>
              <button 
                onClick={() => setSelectedParcel(null)}
                className="mt-1 text-[7px] text-slate-500 underline hover:text-white"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>

        {/* Consola de logs */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-2 rounded text-cyan-400/80 min-h-[30px] truncate">
          {logs[logs.length - 1] || "[Sistema] Mueve el cursor por el visor para leer coordenadas Magna-Sirgas."}
        </div>
      </div>
    );
  }

  // ==========================================
  // SIMULADOR 5: DATA ANALYTICS & BI (Capa 1 - Inteligencia)
  // ==========================================
  if (slug === "data-analytics-bi") {
    const [activeTab, setActiveTab] = useState("territory");
    const [counter, setCounter] = useState(1480290);
    const [kpis, setKpis] = useState({ fiscal: "94.2%", efficiency: "88.1%", compliance: "99.8%" });

    useEffect(() => {
      const timer = setInterval(() => {
        setCounter(prev => prev + Math.floor(Math.random() * 8) + 1);
      }, 1500);
      return () => clearInterval(timer);
    }, []);

    const chartData = {
      territory: [40, 65, 85, 55, 95, 75],
      fiscal: [80, 50, 45, 90, 60, 78],
      sectors: [35, 45, 75, 60, 50, 92]
    };

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* KPI Counters */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[#050a12]/80 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-slate-500 text-[8px] uppercase tracking-wider block">Registros Procesados</span>
            <span className="text-lg font-black text-white tracking-tight">{counter.toLocaleString()}</span>
          </div>
          <div className="bg-[#050a12]/80 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-slate-500 text-[8px] uppercase tracking-wider block">Estándar LADM-COL</span>
            <span className="text-lg font-black text-emerald-400 tracking-tight">100% CUMPLIDO</span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="flex-1 bg-slate-950 border border-slate-900 rounded-xl p-3.5 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-center border-b border-slate-900 pb-2 mb-3">
            <span className="text-slate-400 text-[8px] font-bold uppercase">Tableros de Mando Ejecutivos</span>
            <div className="flex gap-1.5 bg-slate-900 p-0.5 rounded-md">
              <button 
                onClick={() => { setActiveTab("territory"); addLog("Cargando métricas de Territorio"); }}
                className={`px-1.5 py-0.5 rounded text-[8px] transition-all ${
                  activeTab === "territory" ? "bg-indigo-500 text-white" : "text-slate-500"
                }`}
              >
                TERRITORIO
              </button>
              <button 
                onClick={() => { setActiveTab("fiscal"); addLog("Cargando optimización catastral"); }}
                className={`px-1.5 py-0.5 rounded text-[8px] transition-all ${
                  activeTab === "fiscal" ? "bg-indigo-500 text-white" : "text-slate-500"
                }`}
              >
                RECAUDO
              </button>
              <button 
                onClick={() => { setActiveTab("sectors"); addLog("Cargando impacto sectorial"); }}
                className={`px-1.5 py-0.5 rounded text-[8px] transition-all ${
                  activeTab === "sectors" ? "bg-indigo-500 text-white" : "text-slate-500"
                }`}
              >
                SECTORES
              </button>
            </div>
          </div>

          {/* Gráfico de barras puro CSS */}
          <div className="flex-1 flex items-end gap-3 h-24 pt-2">
            {chartData[activeTab].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[7px] text-slate-400 font-bold">{val}%</span>
                <div 
                  className="w-full bg-indigo-500/25 border border-indigo-400/40 rounded-t-sm transition-all duration-500 hover:bg-indigo-400"
                  style={{ height: `${val * 0.7}px` }}
                ></div>
                <span className="text-[7px] text-slate-500">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logs */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-2 rounded text-cyan-400/80 min-h-[30px] truncate">
          {logs[logs.length - 1] || "[Sistema] Selecciona las pestañas para auditar las analíticas territoriales."}
        </div>
      </div>
    );
  }

  // ==========================================
  // SIMULADOR 6: IA & AUTOMATIZACIÓN (Capa 1 - Inteligencia)
  // ==========================================
  if (slug === "ia-automatizacion") {
    const [boxes, setBoxes] = useState([
      { label: "BOSQUE", confidence: "97.4%", points: "M 20,40 L 90,30 L 100,90 L 30,100 Z", color: "stroke-emerald-400 fill-emerald-500/10", tagX: 25, tagY: 35 },
      { label: "CONSTR", confidence: "94.8%", points: "M 110,60 L 170,50 L 160,110 L 100,120 Z", color: "stroke-cyan-400 fill-cyan-500/10", tagX: 105, tagY: 45 }
    ]);
    const [modelState, setModelState] = useState("running");

    useEffect(() => {
      const timer = setInterval(() => {
        // Ticking confidence randomly
        setBoxes(prev => prev.map(b => ({
          ...b,
          confidence: `${(94 + Math.random() * 5).toFixed(1)}%`
        })));

        if (Math.random() > 0.7) {
          addLog("Computer Vision: Segmentando coberturas de terreno multiespectral...");
        }
      }, 1200);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* Status bar */}
        <div className="bg-[#050a12]/80 border border-slate-800 p-2.5 rounded-xl flex justify-between items-center mb-3">
          <span className="text-slate-500 text-[8px] font-bold">MODELO DE IA: SEGMENTATION_NET_V2</span>
          <span className="text-[8px] text-purple-400 font-bold animate-pulse">INFERENCIA ACTIVA</span>
        </div>

        {/* Imagen del satélite simulada con SVG */}
        <div className="flex-1 bg-slate-950 border border-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center min-h-[160px]">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          
          <svg viewBox="0 0 200 200" className="w-44 h-44 relative z-10 border border-slate-800 rounded bg-[#03060c]">
            {boxes.map((box, i) => (
              <g key={i}>
                <path d={box.points} className={`${box.color} stroke-[1.5] transition-all`} />
                <rect x={box.tagX} y={box.tagY} width="50" height="12" rx="2" className="fill-black border border-slate-850" />
                <text x={box.tagX + 4} y={box.tagY + 9} className="fill-white text-[7px] font-bold font-mono">
                  {box.label} {box.confidence}
                </text>
              </g>
            ))}

            {/* Neural scan line */}
            <line x1="0" y1="10" x2="200" y2="10" className="stroke-purple-500 stroke-[1.5] opacity-50" style={{ animation: 'pipeline-scan 4s linear infinite' }} />
          </svg>
        </div>

        {/* Logs */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-2.5 rounded-lg space-y-0.5 min-h-[44px]">
          {logs.map((log, i) => (
            <div key={i} className="text-purple-400/80 truncate">{log}</div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // SIMULADOR 7: ARQUITECTURA INTELIGENTE (Capa 2 - Soluciones)
  // ==========================================
  if (slug === "arquitectura-inteligente") {
    const [rotY, setRotY] = useState(45);
    const [activeSpec, setActiveSpec] = useState("LOD-400");

    useEffect(() => {
      let interval;
      if (isPlaying) {
        interval = setInterval(() => {
          setRotY(prev => (prev + 2) % 360);
        }, 60);
      }
      return () => clearInterval(interval);
    }, [isPlaying]);

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* BIM Specs Header */}
        <div className="grid grid-cols-3 gap-2 bg-[#060b14] border border-slate-900 p-2 rounded-lg text-slate-400 mb-3">
          <div className="truncate">TIPO: <span className="text-blue-400">GEMELO_DIGITAL</span></div>
          <div className="truncate">ESTÁNDAR: <span className="text-blue-400">BIM_IFC</span></div>
          <div className="truncate">ESTADO: <span className="text-emerald-400 font-bold">OK</span></div>
        </div>

        {/* 3D Wireframe Canvas */}
        <div className="flex-1 bg-slate-950 border border-slate-900 rounded-xl relative overflow-hidden min-h-[160px] flex items-center justify-center">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
          {/* Proyección isométrica con SVG en rotación */}
          <div 
            className="w-32 h-32 relative flex items-center justify-center transition-transform duration-300"
            style={{ transform: `rotateX(60deg) rotateZ(${rotY}deg)` }}
          >
            {/* Box wireframe 1 */}
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-blue-500 fill-none stroke-[1.2]">
              <rect x="15" y="15" width="70" height="70" className="stroke-blue-400" />
              <rect x="25" y="25" width="50" height="50" className="stroke-blue-600/70" />
              <line x1="15" y1="15" x2="25" y2="25" />
              <line x1="85" y1="15" x2="75" y2="25" />
              <line x1="15" y1="85" x2="25" y2="75" />
              <line x1="85" y1="85" x2="75" y2="75" />

              {/* Animating height points */}
              <circle cx="25" cy="25" r="2.5" className="fill-cyan-400 animate-ping" />
              <circle cx="75" cy="75" r="2.5" className="fill-cyan-400" />
            </svg>
          </div>

          <div className="absolute bottom-2 right-2 flex gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-bold text-white text-[8px]"
            >
              {isPlaying ? "PAUSAR GIRO" : "GIRAR"}
            </button>
          </div>
        </div>

        {/* Telemetría del gemelo digital */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-2.5 rounded-lg">
          <div className="text-slate-500 font-bold mb-1 uppercase text-[8px]">Propiedades del Modelo:</div>
          <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-350">
            <div>• Nivel de Detalle: <span className="text-blue-400 font-bold">LOD 400</span></div>
            <div>• Formato: <span className="text-blue-400 font-bold">IFC 4.3</span></div>
            <div>• Interoperabilidad: <span className="text-blue-400 font-bold">GIS + BIM</span></div>
            <div>• Clash Detection: <span className="text-emerald-400 font-bold">0 Errores</span></div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SIMULADOR 8: INFRAESTRUCTURA VIAL DIGITAL (Capa 2 - Soluciones)
  // ==========================================
  if (slug === "infraestructura-vial-digital") {
    const [scanOffset, setScanOffset] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setScanOffset(prev => (prev + 5) % 100);
        if (Math.random() > 0.7) {
          addLog(`LiDAR vial: Analizando pendiente en K0+${120 + Math.floor(Math.random()*850)}`);
        }
      }, 300);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* Telemetría vial */}
        <div className="grid grid-cols-3 gap-2 bg-[#060b14] border border-slate-900 p-2.5 rounded-lg text-slate-400 mb-3">
          <div>PENDIENTE: <span className="text-emerald-400">+3.12%</span></div>
          <div>ESTACIÓN: <span className="text-cyan-400">K2+350</span></div>
          <div>SEGURIDAD: <span className="text-emerald-400 font-bold">APROBADO</span></div>
        </div>

        {/* Visor de perfil de elevación */}
        <div className="flex-1 bg-slate-950 border border-slate-900 rounded-xl relative overflow-hidden min-h-[160px] flex items-center justify-center">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
          <svg viewBox="0 0 200 120" className="w-full h-36 relative z-10 px-4">
            {/* Terreno natural */}
            <path d="M 0,90 Q 60,60 110,85 T 200,40 L 200,120 L 0,120 Z" className="fill-slate-900 stroke-slate-800 stroke-[1]" />
            {/* Vía diseñada */}
            <path d="M 0,85 Q 60,55 110,80 T 200,35" className="fill-none stroke-emerald-500 stroke-[2]" />
            
            {/* Scanner line vertical */}
            <line 
              x1={`${scanOffset}%`} y1="0" 
              x2={`${scanOffset}%`} y2="120" 
              className="stroke-cyan-500 stroke-[1.5] opacity-50"
            />
            {/* Scanner intersection dot */}
            <circle 
              cx={`${scanOffset}%`} cy="70" r="2.5" 
              className="fill-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            />
          </svg>
        </div>

        {/* Logs */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-2.5 rounded-lg space-y-0.5 min-h-[44px]">
          {logs.map((log, i) => (
            <div key={i} className="text-emerald-400/80 truncate">{log}</div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // SIMULADOR 9: AGRICULTURA DE PRECISIÓN (Capa 2 - Soluciones)
  // ==========================================
  if (slug === "agricultura-precision") {
    // Rejilla de parcelas NDVI
    const [ndviGrid, setNdviGrid] = useState([
      { id: 1, ndvi: 0.72, status: "Normal" }, { id: 2, ndvi: 0.45, status: "Seco" }, { id: 3, ndvi: 0.81, status: "Excelente" }, { id: 4, ndvi: 0.68, status: "Normal" },
      { id: 5, ndvi: 0.38, status: "Crítico" }, { id: 6, ndvi: 0.74, status: "Normal" }, { id: 7, ndvi: 0.42, status: "Seco" }, { id: 8, ndvi: 0.83, status: "Excelente" },
      { id: 9, ndvi: 0.79, status: "Excelente" }, { id: 10, ndvi: 0.70, status: "Normal" }, { id: 11, ndvi: 0.39, status: "Crítico" }, { id: 12, ndvi: 0.75, status: "Normal" }
    ]);
    const [selectedCell, setSelectedCell] = useState(null);

    const handleIrrigate = () => {
      if (selectedCell === null) return;
      
      setNdviGrid(prev => prev.map(cell => {
        if (cell.id === selectedCell + 1) {
          addLog(`Riego automático aplicado a Parcela S${cell.id}. NDVI incrementado.`);
          return { ...cell, ndvi: 0.84, status: "Excelente" };
        }
        return cell;
      }));

      setSelectedCell(null);
    };

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* Telemetría ambiental del cultivo */}
        <div className="grid grid-cols-3 gap-2 bg-[#060b14] border border-slate-900 p-2.5 rounded-lg text-slate-400 mb-3">
          <div>HUMEDAD: <span className="text-cyan-400">42%</span></div>
          <div>TEMPERATURA: <span className="text-orange-400">26.8°C</span></div>
          <div>DOSIFICACIÓN: <span className="text-teal-400 font-bold">AUTOMÁTICA</span></div>
        </div>

        {/* Rejilla interactiva NDVI */}
        <div className="flex-1 bg-slate-950 border border-slate-900 rounded-xl relative overflow-hidden min-h-[140px] flex items-center justify-center p-4">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
          <div className="w-56 grid grid-cols-4 gap-2 relative z-10">
            {ndviGrid.map((cell, i) => {
              // Colorear dependiendo del NDVI
              let colorClass = "bg-rose-500/25 border-rose-500/50 text-rose-300"; // Crítico (< 0.4)
              if (cell.ndvi >= 0.4 && cell.ndvi < 0.6) colorClass = "bg-orange-500/20 border-orange-500/40 text-orange-300"; // Seco (0.4 - 0.6)
              if (cell.ndvi >= 0.6 && cell.ndvi < 0.8) colorClass = "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"; // Normal (0.6 - 0.8)
              if (cell.ndvi >= 0.8) colorClass = "bg-teal-500/30 border-teal-400/50 text-teal-300 animate-pulse"; // Excelente (>= 0.8)

              const isSelected = selectedCell === i;

              return (
                <div 
                  key={cell.id} 
                  onClick={() => setSelectedCell(i)}
                  className={`rounded-xl border p-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-12 relative ${colorClass} ${
                    isSelected ? "scale-[1.08] ring-2 ring-white z-20 shadow-lg" : "hover:scale-[1.02]"
                  }`}
                >
                  <span className="text-[7px] font-bold">S{cell.id}</span>
                  <span className="text-[9px] font-black self-end font-mono">{(cell.ndvi).toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consola de Control de Riego */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-2.5 rounded-lg">
          {selectedCell !== null ? (
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white font-bold">Parcela S{ndviGrid[selectedCell].id} Seleccionada</div>
                <div className="text-[9px] text-slate-500">Estado: {ndviGrid[selectedCell].status} (NDVI: {ndviGrid[selectedCell].ndvi})</div>
              </div>
              <button 
                onClick={handleIrrigate}
                className="py-1.5 px-3 bg-teal-500 hover:bg-teal-400 text-black font-black uppercase text-[8px] tracking-wider rounded-lg transition-colors flex items-center gap-1 shadow-md shadow-teal-500/10"
              >
                <Droplet className="w-2.5 h-2.5 fill-black" />
                Dosificar Riego
              </button>
            </div>
          ) : (
            <div className="text-slate-500 text-center py-1.5 italic text-[9px]">
              Selecciona una parcela seca o crítica en el mapa para aplicarle riego.
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // SIMULADOR 10: GESTIÓN AMBIENTAL INTELIGENTE (Capa 2 - Soluciones)
  // ==========================================
  if (slug === "gestion-ambiental-inteligente") {
    const [sliderYear, setSliderYear] = useState(2026);
    
    // Proyección de métricas basadas en el año seleccionado
    const reforestedArea = Math.min(100, Math.max(0, (sliderYear - 2026) * 22 + 10));
    const co2Offsets = ((sliderYear - 2026) * 45.8 + 120.4).toFixed(1);
    const carbonFootprint = Math.max(10, 100 - (sliderYear - 2026) * 18.5).toFixed(1);

    return (
      <div className="flex-1 flex flex-col justify-between h-full font-mono text-[10px]">
        {/* Telemetría ambiental */}
        <div className="grid grid-cols-3 gap-2 bg-[#060b14] border border-slate-900 p-2.5 rounded-lg text-slate-400 mb-3">
          <div>CO2 REMOVIDO: <span className="text-teal-400 font-bold">{co2Offsets} Ton</span></div>
          <div>HUELLA DE CARBONO: <span className="text-rose-400">{carbonFootprint}%</span></div>
          <div>REFORESTADO: <span className="text-emerald-400">{reforestedArea}%</span></div>
        </div>

        {/* Mapa de Cobertura de Bosques Reforestados */}
        <div className="flex-1 bg-slate-950 border border-slate-900 rounded-xl relative overflow-hidden min-h-[140px] flex items-center justify-center">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
          <svg viewBox="0 0 200 120" className="w-full h-32 relative z-10 px-6">
            {/* Base de terreno */}
            <polygon points="10,100 190,100 170,30 30,50" className="fill-slate-900 stroke-slate-800 stroke-[1]" />
            
            {/* Árboles que aparecen progresivamente dependiendo del año */}
            {reforestedArea >= 10 && <circle cx="45" cy="75" r="4" className="fill-emerald-500/80 stroke-emerald-400 stroke-[1] animate-[pulse_3s_infinite]" />}
            {reforestedArea >= 32 && <circle cx="75" cy="65" r="6" className="fill-emerald-600/80 stroke-emerald-400 stroke-[1]" />}
            {reforestedArea >= 54 && <circle cx="115" cy="70" r="5" className="fill-emerald-500/90 stroke-emerald-400 stroke-[1] animate-[pulse_2s_infinite]" />}
            {reforestedArea >= 76 && <circle cx="150" cy="55" r="4.5" className="fill-emerald-600/90 stroke-emerald-400 stroke-[1]" />}
            {reforestedArea >= 98 && <circle cx="95" cy="50" r="7" className="fill-emerald-500 stroke-emerald-400 stroke-[1]" />}

            <text x="15" y="20" className="fill-slate-500 text-[8px] font-bold">PROYECCIÓN FORESTAL {sliderYear}</text>
          </svg>
        </div>

        {/* Timeline Slider Interactivo */}
        <div className="mt-3 bg-black/60 border border-slate-900 p-3 rounded-lg flex flex-col gap-2">
          <div className="flex justify-between items-center text-slate-400 text-[8px] font-bold uppercase">
            <span>Control de Proyección Ambiental</span>
            <span className="text-teal-400 font-bold">Año: {sliderYear}</span>
          </div>
          <input 
            type="range" 
            min="2026" 
            max="2030" 
            value={sliderYear} 
            onChange={(e) => setSliderYear(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
          />
          <div className="flex justify-between text-[7px] text-slate-500 px-1 font-bold">
            <span>2026 (Actual)</span>
            <span>2028</span>
            <span>2030 (Meta)</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
