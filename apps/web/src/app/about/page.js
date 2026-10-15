"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Target, 
  Award, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Cpu, 
  Zap, 
  Database, 
  Terminal, 
  Fingerprint, 
  Activity, 
  Code, 
  Check 
} from "lucide-react";
import Link from "next/link";
import Logo from "../../components/Logo";

const ACHIEVEMENTS = [
  { label: "Municipios Actualizados", value: 29, suffix: "", desc: "Soberanía fiscal activa en entes territoriales." },
  { label: "Predios Procesados", value: 1.2, suffix: "M+", desc: "Bases de datos armonizadas bajo LADM-COL." },
  { label: "Integraciones OGC", value: 15, suffix: "+", desc: "Interoperabilidad nativa con IGAC/SNR." },
  { label: "Precisión Técnica", value: 99.9, suffix: "%", desc: "Garantía de seguridad jurídica del dato." }
];

const DIRECTORS = [
  { 
    name: "Albert Daniel Gaviria Zapata", 
    role: "Fundador, Desarrollador Principal & Profesional SIG", 
    desc: "Estudiante de Ingeniería en Desarrollo Territorial y Profesional SIG. Diseñador de la plataforma SaaS DevGiz bajo el estándar LADM-COL v3.0. Especialista en PostgreSQL/PostGIS, SQL Server, automatización con Python (GeoPandas, Pandas, Shapely), interfaces web interactivas (TypeScript, React, Next.js), coordinador de brigadas de barrido predial, operador de drones/RPAS y especialista en telemetría GNSS/GPS RTK.",
    initials: "AGZ",
    icon: Cpu,
    publicKey: "ID: 1007533510 // LADM-COL V3.0 // MEDELLÍN",
    signatureHash: "Albert Daniel Gaviria Zapata // IGAC QA/QC // ICDE Certified",
    status: "ONLINE",
    latency: "6ms",
    coordinates: "LAT: 6.2442° N // LON: 75.5812° W", // Medellín, Colombia
    capabilities: [
      { name: "Estándar LADM-COL v3.0 & ISO 19152", level: 100 },
      { name: "QGIS (PyQGIS) & ArcGIS Pro Suite", level: 100 },
      { name: "Bases Espaciales (PostGIS / SQL Server)", level: 95 },
      { name: "Drones RPAS & Telemetría GNSS RTK (<0.05m)", level: 95 }
    ],
    logs: [
      "[INIT] Cargando entorno de ingeniería territorial DevGiz...",
      "[MODEL] Modelo conceptual y físico LADM_COL_V3_0 validado conforme a IGAC/SNR...",
      "[AUDIT] Verificación QA/QC de reconocimiento predial y consistencia topológica...",
      "[SURVEY] Conexión GNSS RTK submétrica establecida (< 0.05 m de tolerancia)...",
      "[VERIFIED] Credenciales institucionales ICDE, UC Davis y SENA autenticadas."
    ]
  },
  { 
    name: "Dirección Estratégica", 
    role: "Gestión Operativa & Normativa", 
    desc: "Líderes en la articulación de políticas nacionales de catastro multipropósito y cumplimiento de estándares internacionales ISO 19152. Expertos en viabilidad jurídica, planeación territorial y estructuración fiscal.",
    initials: "DE",
    icon: Shield,
    publicKey: "0xDGZ_DIR_12C4A...A21F",
    signatureHash: "f1a8e2cb9397f371190bc21cd38ea3fc2de08ab78b32d2011b98c9fcf82acde1",
    status: "SECURE",
    latency: "14ms",
    coordinates: "LAT: 4.598° N // LON: 74.076° W", // Bogotá, IGAC Geocentro
    capabilities: [
      { name: "Políticas Catastrales Nacionales", level: 96 },
      { name: "Cumplimiento Estándar ISO 19152", level: 98 },
      { name: "Estrategias de Financiamiento Territorial", level: 94 },
      { name: "Articulación IGAC / SNR / Catastros", level: 97 }
    ],
    logs: [
      "[AUTH] Validando firmas institucionales ICDE...",
      "[COMPLIANCE] Verificando correspondencia de folios inmobiliarios SNR...",
      "[AUDIT] Auditoría del Catastro del Valle: Sincronización completa aprobada.",
      "[OK] Articulación SNR e IGAC certificada bajo resolución nacional de tierras.",
      "[SUCCESS] Estructura jurídica validada para el despliegue del piloto."
    ]
  }
];

const TECH_STACK = [
  {
    name: "Polars & DuckDB",
    category: "Procesamiento Analítico Masivo",
    desc: "Motor in-memory para análisis geoespacial masivo sin base de datos tradicional, procesando millones de predios por segundo con mínima huella de memoria.",
    metric: "1.2M+ predios/seg",
    latency: "< 8.5ms query time",
    accent: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400 shadow-cyan-500/5",
    accentColor: "#06b6d4",
    icon: Database,
    snippet: `import polars as pl

# Ingesta y filtrado de parcelas catastrales
df = pl.scan_parquet("valle_predios.parquet")
result = df.filter(
    (pl.col("area_registrada") > 500) & 
    (pl.col("inconsistencias") == 0)
).select(["id_predial", "area_registrada", "geometry"]).collect()

print(f"Predios listos para exportación LADM-COL: {len(result)}")`
  },
  {
    name: "FastAPI & Python Geo",
    category: "Servicios Geoespaciales Async",
    desc: "Backends asíncronos ultrarrápidos para la automatización e ingesta de parcelas con validación topológica instantánea vía Shapely y Fiona.",
    metric: "100% Async pipeline",
    latency: "< 12ms API response",
    accent: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400 shadow-emerald-500/5",
    accentColor: "#10b981",
    icon: Cpu,
    snippet: `from fastapi import FastAPI
from shapely.geometry import Polygon
from pydantic import BaseModel

app = FastAPI(title="DevGiz GeoAPI")

class ParcelTopology(BaseModel):
    coordinates: list[list[float]]

@app.post("/verify/topology")
async def verify_topology(parcel: ParcelTopology):
    poly = Polygon(parcel.coordinates)
    return {
        "is_valid": poly.is_valid,
        "area_m2": poly.area,
        "centroid": list(poly.centroid.coords)
    }`
  },
  {
    name: "LADM-COL & INTERLIS",
    category: "Interoperabilidad Soberana",
    desc: "Alineación estricta al modelo de Catastro Multipropósito de Colombia (ISO 19152), generando archivos de transferencia GML estructurados nativos.",
    metric: "LADM-COL v3.1",
    latency: "100% ISO 19152",
    accent: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400 shadow-amber-500/5",
    accentColor: "#f59e0b",
    icon: Activity,
    snippet: `// INTERLIS Model LADM_COL_V3_1
MODEL LADM_COL_V3_1 (es) =
  TOPIC Catastro_Registro =
    CLASS CO_Predio = 
      Identificador: TEXT*30;
      Area_Registrada: MANDATORY 0.0 .. 999999999.9;
      Destino_Economico: TEXT*50;
    END CO_Predio;
    
    CLASS CO_Linderos =
      Geometria: MANDATORY Area;
      Precision: 0.00 .. 5.00;
    END CO_Linderos;
  END Catastro_Registro;
END LADM_COL_V3_1.`
  },
  {
    name: "QGIS & PyQt5 Plugins",
    category: "Sistemas de Escritorio de Élite",
    desc: "Desarrollo de complementos nativos en PyQt5 para digitalización avanzada, topología autocurativa y conexión directa a repositorios en la nube.",
    metric: "Qt5 / C++ Core",
    latency: "Zero UI Latency",
    accent: "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400 shadow-violet-500/5",
    accentColor: "#8b5cf6",
    icon: Code,
    snippet: `# Complemento PyQt5 / QGIS DevGiz
from qgis.core import QgsProject, QgsVectorLayer
from PyQt5.QtWidgets import QAction, QMessageBox

def load_validated_parcels(self, uri: str):
    layer = QgsVectorLayer(uri, "Linderos Validados LADM-COL", "ogr")
    if not layer.isValid():
        QMessageBox.critical(self.parent, "Error", "Capa inválida.")
        return
    QgsProject.instance().addMapLayer(layer)
    QMessageBox.information(self.parent, "Éxito", "Capa cargada de forma nativa.")`
  }
];

const SIMULATOR_SCENARIOS = [
  {
    id: "cartago",
    name: "Cartago (Valle)",
    context: "Desfase Topológico Multitemporal",
    normative: "Resolución Conjunta IGAC 1101 / SNR 11344",
    description: "Desplazamiento cartográfico y solapes en límites rurales debido a levantamientos de distintas épocas sin control geodésico común. Bloquea el registro de predios.",
    initialStats: { topologyError: "18.4% solapes", interlis: "Sin estructurar", snrStatus: "Rechazado por SNR", taxLeak: "-22.5% recaudo" },
    solvedStats: { topologyError: "0.00% (Sanado)", interlis: "LADM-COL v3.1 Válido", snrStatus: "Conciliado e Inscrito", taxLeak: "+18.2% incremento" },
    areaFisica: 1450.25,
    areaJuridica: 1250.00,
    toleranceThreshold: 15.0,
    polygon1: "30,30 170,40 190,140 40,130",
    polygon2Err: "180,135 290,140 260,250 160,240",
    polygon2Solved: "190,140 290,140 260,250 160,240",
    errorVertex: { x: 180, y: 135 },
    correctVertex: { x: 190, y: 140 },
    interlisCode: `MODEL LADM_COL_V3_1 (es) =
  TOPIC Catastro_Registro =
    CLASS CO_Predio =
      Identificador: TEXT*30;
      Area_Terreno: 0.0 .. 99999.9;
    END CO_Predio;
    CLASS CO_Linderos =
      Geometria: MANDATORY Area;
      Ajuste_Topologia: BOOLEAN;
    END CO_Linderos;
  END Catastro_Registro;
END LADM_COL_V3_1.`
  },
  {
    id: "yumbo",
    name: "Yumbo (Industrial)",
    context: "Traslape con Reserva Forestal",
    normative: "Ley 1955 de 2019 / Determinantes Ambientales",
    description: "Predio industrial con expansión sobre la ronda protectora del río y zona forestal nacional protegida. Requiere zonificación LADM-COL para regularización.",
    initialStats: { topologyError: "Alerta ambiental", interlis: "Sin relacionar", snrStatus: "FMI Bloqueado", taxLeak: "-15.0% sanciones" },
    solvedStats: { topologyError: "Servidumbre legal", interlis: "Restricción Ambiental", snrStatus: "Inscrito con Limitación", taxLeak: "Cumplimiento 100%" },
    areaFisica: 3200.50,
    areaJuridica: 3200.50,
    toleranceThreshold: 5.0,
    polygon1: "20,40 180,40 160,150 20,130",
    polygon2Err: "130,140 270,120 280,240 140,240",
    polygon2Solved: "160,150 270,120 280,240 140,240",
    errorVertex: { x: 130, y: 140 },
    correctVertex: { x: 160, y: 150 },
    interlisCode: `MODEL LADM_COL_V3_1 (es) =
  TOPIC Afectaciones_Ambientales =
    CLASS CO_Restriccion =
      Tipo: (Reserva_Forestal, Ronda_Rio);
      Area_Afectada: MANDATORY Area;
    END CO_Restriccion;
    ASSOCIATION Predio_Restriccion =
      Un_Predio -- CO_Predio;
      Una_Restriccion -- CO_Restriccion;
    END Predio_Restriccion;
  END Afectaciones_Ambientales;
END LADM_COL_V3_1.`
  },
  {
    id: "palmira",
    name: "Palmira (Agrícola)",
    context: "Discrepancia Catastro-Registro",
    normative: "Resolución Conjunta SNR-IGAC de Tolerancias",
    description: "Diferencia crítica de cabida (área medida en levantamiento físico vs escritura pública de 1974). Paraliza el crédito agropecuario y la transferencia del bien.",
    initialStats: { topologyError: "Desfase 28.5%", interlis: "Sin vincular", snrStatus: "Rechazado por Registro", taxLeak: "-10.0% avalúo" },
    solvedStats: { topologyError: "0.0% (Ajustado)", interlis: "Vinculado SNR", snrStatus: "Folio Actualizado", taxLeak: "+15.0% avalúo real" },
    areaFisica: 850.00,
    areaJuridica: 620.00,
    toleranceThreshold: 20.0,
    polygon1: "40,40 160,40 170,130 30,130",
    polygon2Err: "150,125 280,130 250,230 140,220",
    polygon2Solved: "170,130 280,130 250,230 140,220",
    errorVertex: { x: 150, y: 125 },
    correctVertex: { x: 170, y: 130 },
    interlisCode: `MODEL LADM_COL_V3_1 (es) =
  TOPIC Sincronizacion_Catastro_Registro =
    CLASS CO_Derecho =
      FMI: TEXT*20;
      Tipo_Derecho: (Propietario, Poseedor);
    END CO_Derecho;
    ASSOCIATION Relacion_SNR_IGAC =
      Datos_Fisicos -- CO_Predio;
      Datos_Juridicos -- CO_Derecho;
    END Relacion_SNR_IGAC;
  END Sincronizacion_Catastro_Registro;
END LADM_COL_V3_1.`
  }
];

function AnimatedCounter({ value, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  const displayValue = Number.isInteger(value) ? Math.floor(count) : count.toFixed(1);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function AboutPage() {
  const principlesRef = useRef(null);
  const principlesInView = useInView(principlesRef, { once: true, margin: "-80px" });
  const impactRef = useRef(null);
  const impactInView = useInView(impactRef, { once: true, margin: "-80px" });
  const leaderRef = useRef(null);
  const leaderInView = useInView(leaderRef, { once: true, margin: "-80px" });
  const techRef = useRef(null);
  const techInView = useInView(techRef, { once: true, margin: "-80px" });

  const simulatorRef = useRef(null);
  const simulatorInView = useInView(simulatorRef, { once: true, margin: "-80px" });

  // Interactive leadership states
  const [selectedDirector, setSelectedDirector] = useState(0);
  const [verifiedSignatures, setVerifiedSignatures] = useState({});
  const [verifyingDirector, setVerifyingDirector] = useState(null);

  // Tech stack states
  const [activeTechIndex, setActiveTechIndex] = useState(0);

  // LADM-COL Simulator states
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [step1Snapped, setStep1Snapped] = useState(false);
  const [step2Compiled, setStep2Compiled] = useState(false);
  const [step2Compiling, setStep2Compiling] = useState(false);
  const [step3Conciliated, setStep3Conciliated] = useState(false);
  const [step3Conciliating, setStep3Conciliating] = useState(false);
  const [step4Stamped, setStep4Stamped] = useState(false);
  const [step4Stamping, setStep4Stamping] = useState(false);
  
  const [simConsoleLogs, setSimConsoleLogs] = useState([
    "[SISTEMA] Consola LADM-COL v3.1 inicializada.",
    "[INFO] Seleccione un caso de estudio municipal para iniciar el diagnóstico."
  ]);

  const handleScenarioChange = (index) => {
    setSelectedScenarioIndex(index);
    setActiveStep(1);
    setStep1Snapped(false);
    setStep2Compiled(false);
    setStep2Compiling(false);
    setStep3Conciliated(false);
    setStep3Conciliating(false);
    setStep4Stamped(false);
    setStep4Stamping(false);
    
    const scenarioName = SIMULATOR_SCENARIOS[index].name;
    setSimConsoleLogs([
      `[SISTEMA] Cargando escenario para ${scenarioName}...`,
      `[DIAGNÓSTICO] Problema detectado: ${SIMULATOR_SCENARIOS[index].context}.`,
      `[REQUERIDO] Paso 1: Realizar depuración topológica de linderos.`
    ]);

    if (typeof window !== "undefined" && window.dgzSynth) {
      try { window.dgzSynth.playClick(); } catch (e){}
    }
  };

  const activeDirector = DIRECTORS[selectedDirector];

  const handleVerifySignature = (directorName) => {
    if (verifiedSignatures[directorName] || verifyingDirector) return;
    setVerifyingDirector(directorName);
    
    // Play sound from global synth if it exists
    if (typeof window !== "undefined" && window.dgzSynth) {
      try {
        window.dgzSynth.playScanAlert();
      } catch (e) {
        console.log("No se pudo reproducir sonido sintético");
      }
    }

    setTimeout(() => {
      setVerifiedSignatures(prev => ({ ...prev, [directorName]: true }));
      setVerifyingDirector(null);
      if (typeof window !== "undefined" && window.dgzSynth) {
        try {
          window.dgzSynth.playSuccess();
        } catch (e) {
          console.log("No se pudo reproducir sonido de éxito");
        }
      }
    }, 1600);
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] selection:bg-slate-200">
      
      {/* Editorial Header */}
      <section id="history" className="pt-24 md:pt-28 pb-12 md:pb-14 px-6 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <motion.div 
              className="space-y-8 lg:max-w-4xl"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="w-12 h-px bg-[#1a1a1a]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500 font-bold">About DevGiz // Engineering Manifesto</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.02] text-[#1a1a1a]">
                Soberanía Digital <br /> <span className="text-slate-400 italic font-light">del Territorio</span>
              </motion.h1>
            </motion.div>
            <motion.div 
              className="lg:max-w-sm pb-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                No construimos mapas. Diseñamos la infraestructura de datos que define el futuro jurídico y fiscal de las naciones.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Manifesto Section */}
      <section id="vision" className="py-14 md:py-16 px-6 section-deferred scroll-reveal" ref={principlesRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <motion.div 
              className="lg:col-span-5 space-y-10"
              initial="hidden"
              animate={principlesInView ? "visible" : "hidden"}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="text-4xl font-black tracking-tighter">
                Nuestros <span className="text-slate-400 italic font-light">Principios</span>
              </motion.h2>
              <div className="space-y-8">
                {[
                  { num: "01", title: "Rigor Técnico", desc: "Cada línea de código y cada polígono procesado cumple estrictamente con el estándar ISO 19152 y la normativa nacional LADM-COL.", icon: Shield },
                  { num: "02", title: "Independencia", desc: "Promovemos la autonomía de las entidades territoriales, eliminando la dependencia de licencias privativas y formatos cerrados.", icon: Globe },
                  { num: "03", title: "Innovación de Élite", desc: "Implementamos arquitecturas de alto rendimiento (Polars, DuckDB) para el procesamiento masivo de datos que otros sistemas no pueden manejar.", icon: Zap }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeUp}
                    className="group p-6 rounded-lg hover:bg-white hover:shadow-lg hover:border-slate-100 border border-transparent transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="w-4 h-4 text-slate-400 group-hover:text-[#1a1a1a] transition-colors" />
                      <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#1a1a1a] transition-colors">{item.num} / {item.title}</div>
                    </div>
                    <p className="text-slate-600 font-light leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="lg:col-span-7 bg-white border border-slate-100 p-6 lg:p-10 shadow-sm relative group hover:shadow-xl transition-shadow duration-500"
              initial={{ opacity: 0, y: 40 }}
              animate={principlesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                <Logo className="w-64 h-64" />
              </div>
              <h3 className="text-3xl font-black mb-8 tracking-tight">¿Por qué elegir DevGiz?</h3>
              <div className="space-y-6">
                {[
                  "Soluciones internacionales con presencia en toda América.",
                  "Dominio total de la normativa LADM-COL e interoperabilidad IGAC/SNR.",
                  "Arquitectura de alto rendimiento para procesamiento masivo.",
                  "Transparencia total mediante auditoría de datos geoespaciales."
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-4 items-center group/item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={principlesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-[#1a1a1a] rounded-full group-hover/item:scale-150 transition-transform"></div>
                    <p className="text-slate-500 font-light text-lg group-hover/item:text-[#1a1a1a] transition-colors">{item}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 pt-16 border-t border-slate-100">
                <blockquote className="text-2xl font-light italic text-slate-400 leading-relaxed">
                  &quot;Nuestra misión es convertir la complejidad geográfica en activos estratégicos de valor nacional.&quot;
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact in Figures - High End Grid */}
      <section className="py-14 md:py-16 bg-[#fafafa] border-y border-slate-200 section-deferred scroll-reveal" ref={impactRef}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-10 space-y-3"
            initial="hidden"
            animate={impactInView ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.28em]">Strategic Results // KPI Report</motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">Impacto en <span className="text-slate-400 italic font-light">Cifras</span></motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 shadow-2xl">
            {ACHIEVEMENTS.map((item, i) => (
              <motion.div 
                key={i} 
                className="bg-white p-6 md:p-8 space-y-4 hover:bg-slate-50 transition-colors group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                animate={impactInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-5xl font-black tracking-tighter group-hover:scale-105 transition-transform origin-left">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">{item.label}</div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LADM-COL Simulator Section */}
      <section className="py-14 md:py-16 bg-[#040814] text-white border-y border-slate-950 relative overflow-hidden section-deferred scroll-reveal" ref={simulatorRef}>
        {/* Neon lines background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold block">Interoperability & Legal Lab</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter leading-none">
                Simulador Catastral <br /> <span className="text-slate-400 font-light italic">LADM-COL v3.1</span>
              </h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed max-w-lg">
              La falta de interoperabilidad entre catastro y registro cuesta millones a los municipios colombianos. Nuestro motor automatiza la corrección física de predios y concilia su estado jurídico en segundos.
            </p>
          </div>

          {/* Selector de Municipios */}
          <div role="tablist" aria-label="Casos de estudio municipal" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {SIMULATOR_SCENARIOS.map((scen, idx) => {
              const isSelected = selectedScenarioIndex === idx;
              return (
                <button
                  type="button"
                  role="tab"
                  id={`scenario-tab-${idx}`}
                  aria-selected={isSelected}
                  key={scen.id}
                  onClick={() => handleScenarioChange(idx)}
                  className={`p-5 border rounded-xl font-mono text-xs uppercase tracking-wider text-left transition-all duration-300 cursor-pointer active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
                    isSelected 
                      ? "bg-slate-900/80 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      : "bg-[#080d1a]/40 border-slate-900/60 text-slate-500 hover:border-slate-800 hover:text-slate-300 hover:bg-[#080d1a]/80"
                  }`}
                >
                  <div className="font-bold text-[10px] text-slate-500 mb-1">CASO DE ESTUDIO 0{idx+1}</div>
                  <div className="text-sm font-black truncate">{scen.name}</div>
                  <div className="text-[10px] text-slate-500 mt-1 truncate">{scen.context}</div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Progress Checklist and details */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              
              {/* Scenario description card */}
              <div className="bg-[#080d1a]/60 border border-slate-900 p-6 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">{SIMULATOR_SCENARIOS[selectedScenarioIndex].context}</span>
                  <h3 className="text-xl font-black text-white">{SIMULATOR_SCENARIOS[selectedScenarioIndex].name}</h3>
                </div>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  {SIMULATOR_SCENARIOS[selectedScenarioIndex].description}
                </p>
                <div className="pt-4 border-t border-slate-900 grid grid-cols-2 gap-4 font-mono text-[10px]">
                  <div>
                    <span className="text-slate-500 uppercase block tracking-wider">Norma Aplicable</span>
                    <span className="text-slate-300 font-bold">{SIMULATOR_SCENARIOS[selectedScenarioIndex].normative}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block tracking-wider">Efecto Fiscal</span>
                    <span className="text-amber-400 font-bold animate-pulse">
                      {step4Stamped 
                        ? SIMULATOR_SCENARIOS[selectedScenarioIndex].solvedStats.taxLeak 
                        : SIMULATOR_SCENARIOS[selectedScenarioIndex].initialStats.taxLeak}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step Checklist */}
              <div className="bg-[#080d1a]/60 border border-slate-900 p-6 rounded-2xl flex-1 flex flex-col justify-between gap-4">
                {[
                  { num: 1, title: "Sanación Topológica", solved: step1Snapped, active: activeStep === 1 },
                  { num: 2, title: "Compilación INTERLIS (.XTF)", solved: step2Compiled, active: activeStep === 2 },
                  { num: 3, title: "Conciliación IGAC-SNR", solved: step3Conciliated, active: activeStep === 3 },
                  { num: 4, title: "Estampillado & Soberanía", solved: step4Stamped, active: activeStep === 4 }
                ].map((step) => {
                  let statusColor = "text-slate-500 border-slate-900/60 bg-[#080d1a]/20";
                  if (step.active) statusColor = "text-cyan-400 border-cyan-500/40 bg-cyan-500/5 shadow-[0_0_10px_rgba(6,182,212,0.05)]";
                  if (step.solved) statusColor = "text-emerald-400 border-emerald-500/40 bg-emerald-500/5";

                  return (
                    <div 
                      key={step.num}
                      className={`flex items-center gap-4 p-4 border rounded-xl transition-all duration-300 ${statusColor}`}
                    >
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono text-xs font-black transition-all ${
                        step.solved ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-slate-950"
                      }`}>
                        {step.solved ? <Check className="w-3.5 h-3.5" /> : step.num}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">PASO 0{step.num}</span>
                        <h4 className="text-xs font-bold truncate text-white">{step.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Visualizer panel & console */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-6">
              
              {/* Visualizer card */}
              <div className="bg-[#080d1a]/60 border border-slate-900 rounded-2xl p-8 flex-1 flex flex-col justify-center min-h-[360px] relative overflow-hidden">
                <span className="absolute top-4 left-4 font-mono text-[9.5px] text-slate-600 tracking-wider">INTERACTIVE GRAPHIC VIEWER // STEP_0{activeStep}</span>
                
                {/* Step 1 Content: Topo Snapping */}
                {activeStep === 1 && (
                  <div className="flex flex-col items-center justify-between h-full py-2">
                    <div className="w-full max-w-[320px] aspect-[4/3] bg-slate-950 rounded-xl border border-slate-900 relative p-4 flex items-center justify-center shadow-inner">
                      <svg width="240" height="180" viewBox="0 0 300 240" className="overflow-visible">
                        {/* Polygon 1 (Stable) */}
                        <polygon 
                          points={SIMULATOR_SCENARIOS[selectedScenarioIndex].polygon1}
                          fill="rgba(6, 182, 212, 0.05)"
                          stroke="#06b6d4"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                        <text x="50" y="80" fill="#06b6d4" className="font-mono text-[10px] font-bold" opacity="0.6">PREDIO_A (Fiel)</text>
                        
                        {/* Polygon 2 (Erroneous or Solved) */}
                        <polygon 
                          points={step1Snapped 
                            ? SIMULATOR_SCENARIOS[selectedScenarioIndex].polygon2Solved 
                            : SIMULATOR_SCENARIOS[selectedScenarioIndex].polygon2Err}
                          fill={step1Snapped ? "rgba(16, 182, 129, 0.05)" : "rgba(239, 68, 68, 0.05)"}
                          stroke={step1Snapped ? "#10b981" : "#ef4444"}
                          strokeWidth="2"
                          className="transition-all duration-700"
                        />
                        <text x="180" y="190" fill={step1Snapped ? "#10b981" : "#ef4444"} className="font-mono text-[10px] font-bold" opacity="0.6">PREDIO_B</text>

                        {/* Overlapping alert fill */}
                        {!step1Snapped && (
                          <polygon
                            points={`${SIMULATOR_SCENARIOS[selectedScenarioIndex].correctVertex.x},${SIMULATOR_SCENARIOS[selectedScenarioIndex].correctVertex.y} ${SIMULATOR_SCENARIOS[selectedScenarioIndex].errorVertex.x},${SIMULATOR_SCENARIOS[selectedScenarioIndex].errorVertex.y} 190,140`}
                            fill="rgba(239, 68, 68, 0.4)"
                            className="animate-pulse"
                          />
                        )}

                        {/* Interactive Snapping Node */}
                        <motion.circle
                          cx={step1Snapped ? SIMULATOR_SCENARIOS[selectedScenarioIndex].correctVertex.x : SIMULATOR_SCENARIOS[selectedScenarioIndex].errorVertex.x}
                          cy={step1Snapped ? SIMULATOR_SCENARIOS[selectedScenarioIndex].correctVertex.y : SIMULATOR_SCENARIOS[selectedScenarioIndex].errorVertex.y}
                          r="7"
                          fill={step1Snapped ? "#10b981" : "#ef4444"}
                          className={`cursor-pointer ${!step1Snapped ? "animate-pulse" : ""}`}
                          onClick={() => {
                            if (!step1Snapped) {
                              setStep1Snapped(true);
                              setSimConsoleLogs(prev => [
                                ...prev,
                                "[TOPOLOGÍA] Click en vértice desalineado detectado.",
                                "[TOPOLOGÍA] Executing snapping...",
                                "[OK] Vértice corregido. Solape de linderos a 0.00%.",
                                "[REQUERIDO] Paso 2: Generar y validar estructura INTERLIS (.XTF)."
                              ]);
                              setActiveStep(2);
                              if (typeof window !== "undefined" && window.dgzSynth) {
                                try { window.dgzSynth.playSuccess(); } catch(e){}
                              }
                            }
                          }}
                        />
                      </svg>

                      {/* Floating Indicator */}
                      {!step1Snapped && (
                        <div className="absolute top-3 right-3 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[9.5px] px-2.5 py-1 rounded-full animate-pulse tracking-wider font-black">
                          SOLAPE DETECTADO (15.4%)
                        </div>
                      )}
                      {step1Snapped && (
                        <div className="absolute top-3 right-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9.5px] px-2.5 py-1 rounded-full tracking-wider font-black">
                          TOPOLOGÍA DEPURADA (0.00%)
                        </div>
                      )}
                    </div>

                    <div className="text-center space-y-3 mt-6">
                      <p className="text-xs text-slate-400 font-light max-w-sm">
                        Haga clic en el vértice rojo que pulsa en el mapa para forzar el auto-snapping topológico del predio.
                      </p>
                      {!step1Snapped && (
                        <button
                          type="button"
                          onClick={() => {
                            setStep1Snapped(true);
                            setSimConsoleLogs(prev => [
                              ...prev,
                              "[TOPOLOGÍA] Ejecutando algoritmo de auto-snapping geoespacial...",
                              "[OK] Vértice corregido. Solape de linderos a 0.00%.",
                              "[REQUERIDO] Paso 2: Generar y validar estructura INTERLIS (.XTF)."
                            ]);
                            setActiveStep(2);
                            if (typeof window !== "undefined" && window.dgzSynth) {
                              try { window.dgzSynth.playSuccess(); } catch(e){}
                            }
                          }}
                          className="px-6 py-2.5 bg-red-500 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded border border-red-400 hover:bg-red-600 transition-all cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-red-400 focus:outline-none"
                        >
                          Auto-Depurar Linderos
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2 Content: INTERLIS Code Compilation */}
                {activeStep === 2 && (
                  <div className="flex flex-col items-center justify-between h-full py-2">
                    <div className="w-full max-w-[440px] h-[190px] bg-slate-950 rounded-xl border border-slate-900 p-5 font-mono text-[10px] text-cyan-300/80 overflow-y-auto relative shadow-inner">
                      {step2Compiling ? (
                        <div className="space-y-1">
                          <p className="text-amber-400 animate-pulse">[LOAD] Analizando parcelas catastrales corregidas...</p>
                          <p className="text-slate-500">[COMPILE] Generando clases LADM-COL v3.1...</p>
                          <p className="text-slate-500">[VALIDATE] Ejecutando compilador de esquemas INTERLIS...</p>
                        </div>
                      ) : step2Compiled ? (
                        <pre className="whitespace-pre text-emerald-400/90 leading-relaxed text-[10px] md:text-[10px]">
                          {SIMULATOR_SCENARIOS[selectedScenarioIndex].interlisCode}
                        </pre>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center space-y-2">
                          <Code className="w-8 h-8 text-slate-700 animate-pulse" />
                          <p className="max-w-xs text-xs font-light">Estructura de modelo de datos INTERLIS lista para validación catastral.</p>
                        </div>
                      )}
                    </div>

                    <div className="text-center space-y-3 mt-6">
                      <p className="text-xs text-slate-400 font-light max-w-sm">
                        Compile los datos topológicos limpios al formato de transferencia estandarizado LADM-COL (.XTF).
                      </p>
                      <button
                        type="button"
                        disabled={step2Compiling || step2Compiled}
                        onClick={() => {
                          setStep2Compiling(true);
                          if (typeof window !== "undefined" && window.dgzSynth) {
                            try { window.dgzSynth.playScanAlert(); } catch(e){}
                          }
                          setTimeout(() => {
                            setStep2Compiling(false);
                            setStep2Compiled(true);
                            setSimConsoleLogs(prev => [
                              ...prev,
                              "[INTERLIS] Iniciando compilación de modelo LADM_COL_V3_1...",
                              "[INTERLIS] Validando correspondencia de tipos y atributos...",
                              "[SUCCESS] Archivo .XTF compilado exitosamente. Cumplimiento ISO 19152 verificado.",
                              "[REQUERIDO] Paso 3: Conciliar áreas físicas (Catastro) vs jurídicas (Registro/SNR)."
                            ]);
                            setActiveStep(3);
                            if (typeof window !== "undefined" && window.dgzSynth) {
                              try { window.dgzSynth.playSuccess(); } catch(e){}
                            }
                          }, 1500);
                        }}
                        className={`px-6 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest rounded border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none active:scale-95 ${
                          step2Compiled
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : step2Compiling
                            ? "bg-cyan-500 text-white border-cyan-400 animate-pulse"
                            : "bg-white text-black border-white hover:bg-slate-200"
                        }`}
                      >
                        {step2Compiled ? "Modelo .XTF Compilado" : step2Compiling ? "Compilando..." : "Compilar LADM-COL (.XTF)"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 Content: IGAC-SNR Cross-Reconciliation */}
                {activeStep === 3 && (
                  <div className="flex flex-col items-center justify-between h-full py-2">
                    <div className="w-full max-w-[400px] space-y-5 bg-slate-950 p-5 rounded-xl border border-slate-900">
                      
                      {/* Metric Comparison rows */}
                      <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
                        <div className="bg-[#080d1a] p-3 rounded-lg border border-slate-900">
                          <span className="text-slate-500 block uppercase text-[9.5px] tracking-wider">Levantamiento Físico</span>
                          <span className="text-white font-black text-sm">{SIMULATOR_SCENARIOS[selectedScenarioIndex].areaFisica} m²</span>
                        </div>
                        <div className="bg-[#080d1a] p-3 rounded-lg border border-slate-900">
                          <span className="text-slate-500 block uppercase text-[9.5px] tracking-wider">Folio de Registro (SNR)</span>
                          <span className="text-white font-black text-sm">{SIMULATOR_SCENARIOS[selectedScenarioIndex].areaJuridica} m²</span>
                        </div>
                      </div>

                      {/* Tolerance Indicator bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[9.5px] font-mono text-slate-500 tracking-wider">
                          <span>DIFERENCIA REAL: {((Math.abs(SIMULATOR_SCENARIOS[selectedScenarioIndex].areaFisica - SIMULATOR_SCENARIOS[selectedScenarioIndex].areaJuridica) / SIMULATOR_SCENARIOS[selectedScenarioIndex].areaJuridica) * 100).toFixed(1)}%</span>
                          <span>TOLERANCIA LEY: {SIMULATOR_SCENARIOS[selectedScenarioIndex].toleranceThreshold}%</span>
                        </div>
                        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5 relative">
                          <motion.div 
                            className={`h-full rounded-full ${step3Conciliated ? "bg-emerald-500" : "bg-red-500"}`}
                            initial={{ width: "100%" }}
                            animate={{ width: step3Conciliated ? "70%" : "100%" }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[9.5px] font-mono text-slate-500 tracking-widest">ESTADO LEGAL</span>
                          {step3Conciliated ? (
                            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">CONCILIACIÓN APROBADA</span>
                          ) : (
                            <span className="text-[10px] font-mono text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded animate-pulse">RECHAZADO POR DISCREPANCIA</span>
                          )}
                        </div>
                      </div>

                    </div>

                    <div className="text-center space-y-3 mt-6">
                      <p className="text-xs text-slate-400 font-light max-w-sm">
                        Ejecute el motor de reconciliación aplicando las tolerancias de la Resolución Conjunta IGAC-SNR.
                      </p>
                      <button
                        type="button"
                        disabled={step3Conciliating || step3Conciliated}
                        onClick={() => {
                          setStep3Conciliating(true);
                          if (typeof window !== "undefined" && window.dgzSynth) {
                            try { window.dgzSynth.playScanAlert(); } catch(e){}
                          }
                          setTimeout(() => {
                            setStep3Conciliating(false);
                            setStep3Conciliated(true);
                            setSimConsoleLogs(prev => [
                              ...prev,
                              "[CONCILIADOR] Analizando tolerancia legal según Resolución Conjunta...",
                              `[INFO] Área Física: ${SIMULATOR_SCENARIOS[selectedScenarioIndex].areaFisica} m² | Área Jurídica: ${SIMULATOR_SCENARIOS[selectedScenarioIndex].areaJuridica} m²`,
                              `[SUCCESS] Discrepancia conciliada dentro del margen legal de tolerancia.`,
                              "[REQUERIDO] Paso 4: Realizar estampillado criptográfico para habilitar soberanía fiscal."
                            ]);
                            setActiveStep(4);
                            if (typeof window !== "undefined" && window.dgzSynth) {
                              try { window.dgzSynth.playSuccess(); } catch(e){}
                            }
                          }, 1500);
                        }}
                        className={`px-6 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest rounded border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none active:scale-95 ${
                          step3Conciliated
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : step3Conciliating
                            ? "bg-cyan-500 text-white border-cyan-400 animate-pulse"
                            : "bg-white text-black border-white hover:bg-slate-200"
                        }`}
                      >
                        {step3Conciliated ? "Cabida Conciliada" : step3Conciliating ? "Analizando..." : "Conciliar Catastro - Registro"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4 Content: Cryptographic Stamp & Certification */}
                {activeStep === 4 && (
                  <div className="flex flex-col items-center justify-between h-full py-2">
                    <div className="w-full max-w-[380px] bg-slate-950 p-6 rounded-xl border border-slate-900 text-center relative overflow-hidden">
                      {/* Decorative stamp circle */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-dashed border-cyan-500/10 animate-[spin_40s_linear_infinite]" />
                      
                      {step4Stamped ? (
                        <div className="space-y-4 relative z-10">
                          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,182,129,0.2)]">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-emerald-400 font-black uppercase tracking-widest block">CERTIFICATE_DEPLOYS_SUCCESSFULLY</span>
                            <h4 className="text-lg font-black text-white mt-1">Soberanía Fiscal Asegurada</h4>
                          </div>
                          <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                            El predio ha sido incorporado al catastro multipropósito y sincronizado con SNR. Se ha emitido la firma criptográfica para garantizar la seguridad jurídica.
                          </p>
                          <div className="bg-[#080d1a] p-3 rounded-lg border border-slate-900 inline-block">
                            <span className="text-[9.5px] font-mono text-slate-500 uppercase block">EFICIENCIA FISCAL ESTIMADA</span>
                            <span className="text-emerald-400 font-mono font-black text-sm">{SIMULATOR_SCENARIOS[selectedScenarioIndex].solvedStats.taxLeak}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 relative z-10 py-4">
                          <Fingerprint className="w-12 h-12 text-slate-700 mx-auto animate-pulse" />
                          <div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">STATUS // AWAITING FINAL SEAL</span>
                            <h4 className="text-lg font-black text-white mt-1">Listo para Firma Digital</h4>
                          </div>
                          <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                            Los datos geográficos y jurídicos se encuentran conciliados bajo estándares de la ICDE. Presione el botón para estampar.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-center space-y-3 mt-6">
                      <p className="text-xs text-slate-400 font-light max-w-sm">
                        Genere la firma criptográfica de seguridad catastral para certificar la base de datos municipal.
                      </p>
                      <button
                        type="button"
                        disabled={step4Stamping || step4Stamped}
                        onClick={() => {
                          setStep4Stamping(true);
                          if (typeof window !== "undefined" && window.dgzSynth) {
                            try { window.dgzSynth.playScanAlert(); } catch(e){}
                          }
                          setTimeout(() => {
                            setStep4Stamping(false);
                            setStep4Stamped(true);
                            setSimConsoleLogs(prev => [
                              ...prev,
                              "[ESTAMPILLADO] Generando hash criptográfico de seguridad territorial...",
                              `[HASH] SHA-256: 0x${Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join("")}`,
                              `[SUCCESS] ¡Municipio certificado bajo LADM-COL! Soberanía fiscal garantizada.`,
                              `[FINANZAS] Incremento proyectado de recaudo impuesto predial: ${SIMULATOR_SCENARIOS[selectedScenarioIndex].solvedStats.taxLeak}`,
                              "[SISTEMA] Simulador completado con éxito. Gracias por usar DevGiz Lab."
                            ]);
                            if (typeof window !== "undefined" && window.dgzSynth) {
                              try { window.dgzSynth.playSuccess(); } catch(e){}
                            }
                          }, 1500);
                        }}
                        className={`px-6 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest rounded border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none active:scale-95 ${
                          step4Stamped
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,182,129,0.05)]"
                            : step4Stamping
                            ? "bg-cyan-500 text-white border-cyan-400 animate-pulse"
                            : "bg-white text-black border-white hover:bg-slate-200"
                        }`}
                      >
                        {step4Stamped ? "Catastro Estampado" : step4Stamping ? "Estampando..." : "Estampar Catastro"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Console log box */}
              <div className="bg-[#020409] border border-slate-900 rounded-xl p-4 font-mono text-[10px] text-slate-400 space-y-1 relative h-[110px] overflow-y-auto shadow-inner">
                <div className="absolute top-3 right-3 bg-slate-900/80 text-slate-500 text-[9.5px] px-2 py-0.5 rounded border border-slate-800 uppercase tracking-widest font-bold">
                  TELEMETRÍA EN VIVO
                </div>
                {simConsoleLogs.map((log, lIdx) => {
                  let logColor = "text-slate-300";
                  if (log.includes("[OK]") || log.includes("[SUCCESS]")) logColor = "text-emerald-400";
                  if (log.includes("[REQUERIDO]") || log.includes("[DIAGNÓSTICO]")) logColor = "text-amber-400";
                  if (log.includes("[SISTEMA]")) logColor = "text-cyan-400";
                  if (log.includes("[ERROR]") || log.includes("[RECHAZADO]")) logColor = "text-red-400";

                  return (
                    <div key={lIdx} className={`${logColor} leading-relaxed flex items-start gap-1`}>
                      <span>{log}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Leadership - Tactical Command Center Deck */}
      <section id="team" className="py-14 md:py-16 px-6 overflow-hidden bg-[#03060f] text-white border-y border-slate-950 relative section-deferred scroll-reveal" ref={leaderRef}>
        
        {/* Subtle holographic grid lines */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}></div>

        {/* Ambient neon radial glows */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-slate-900 pb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 font-bold block">Management & Engineering Board</span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-white">
                Liderazgo <span className="text-slate-400 italic font-light">Estratégico</span>
              </h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed max-w-md text-sm">
              Arquitectura del territorio articulando ingeniería masiva, derecho catastral y excelencia tecnológica bajo estándares globales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left selector - vertical tab list */}
            <div role="tablist" aria-label="Directores de ingeniería" aria-orientation="vertical" className="lg:col-span-4 space-y-4">
              {DIRECTORS.map((director, i) => {
                const isSelected = selectedDirector === i;
                const DirIcon = director.icon;
                
                return (
                  <button
                    type="button"
                    role="tab"
                    id={`director-tab-${i}`}
                    aria-selected={isSelected}
                    key={i}
                    onClick={() => {
                      setSelectedDirector(i);
                      // Play click audio
                      if (typeof window !== "undefined" && window.dgzSynth) {
                        try { window.dgzSynth.playClick(); } catch (e){}
                      }
                    }}
                    className={`w-full text-left p-6 border rounded-xl relative overflow-hidden transition-all duration-300 cursor-pointer flex items-center gap-5 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
                      isSelected 
                        ? `bg-slate-900/80 border-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.4)] translate-x-2`
                        : "bg-[#070b15]/40 border-slate-900/60 hover:border-slate-800 hover:bg-[#0c1224]/60 text-slate-400"
                    }`}
                  >
                    {/* Active dynamic indicator bar */}
                    {isSelected && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Ring Avatar with status pulse */}
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-lg border font-mono font-black flex items-center justify-center text-xs tracking-wider transition-colors duration-300 ${
                        isSelected 
                          ? "bg-cyan-950 text-cyan-400 border-cyan-500/30"
                          : "bg-slate-950 text-slate-500 border-slate-900"
                      }`}>
                        {director.initials}
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#03060f] transition-colors ${
                        i === 0 ? "bg-cyan-500 animate-pulse" : "bg-emerald-500 animate-pulse"
                      }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`font-black text-sm transition-colors ${isSelected ? "text-white" : "text-slate-350 hover:text-white"}`}>{director.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider truncate block">{director.role.split("&")[0]}</span>
                        <span className="text-slate-700 font-mono text-[10px]">•</span>
                        <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest">{director.latency}</span>
                      </div>
                    </div>

                    <DirIcon className={`w-4 h-4 transition-colors ${
                      isSelected ? "text-cyan-400" : "text-slate-650"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right Display - Capability Dashboard HUD */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDirector}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-[#070b15]/60 backdrop-blur-xl border border-slate-900 rounded-2xl p-8 lg:p-10 relative overflow-hidden group/hud hover:border-slate-800 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  {/* Digital Crosshairs / Technical grid lines */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ 
                    backgroundImage: 'radial-gradient(rgb(255, 255, 255) 1.5px, transparent 1.5px)',
                    backgroundSize: '16px 16px'
                  }}></div>

                  <span className="absolute top-4 left-4 font-mono text-[9.5px] text-slate-500 tracking-wider">REF_ID: DGZ-00{selectedDirector + 1} {"//"} {activeDirector.coordinates}</span>
                  <span className="absolute bottom-4 right-4 font-mono text-[9.5px] text-slate-500 tracking-wider">DEVGIZ {"//"} CATASTRO MULTIPROPÓSITO</span>
                  
                  {/* Verification Banner */}
                  {verifiedSignatures[activeDirector.name] && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-8 right-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-full font-mono text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      SIGNATURE VERIFIED
                    </motion.div>
                  )}

                  {/* Laser Scan line on verifying */}
                  {verifyingDirector === activeDirector.name && (
                    <motion.div 
                      className="absolute left-0 right-0 h-0.5 bg-cyan-500 z-20 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 1.6, ease: "easeInOut", repeat: 0 }}
                    />
                  )}

                  {/* Title & Core Meta */}
                  <div className="mb-8 border-b border-slate-900 pb-6 relative z-10 mt-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">BOARD PROFILE TELEMETRY</span>
                    <h3 className="text-3xl font-black text-white tracking-tight">{activeDirector.name}</h3>
                    <p className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mt-1">{activeDirector.role}</p>
                    <p className="text-slate-350 text-sm font-light leading-relaxed mt-4 max-w-2xl">{activeDirector.desc}</p>
                  </div>

                  {/* Skills/Capabilities Area with Segmented LED Bars */}
                  <div className="mb-8 space-y-4 relative z-10">
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-bold">Capacidades & Especialidad</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeDirector.capabilities.map((cap, cIdx) => {
                        const numSegments = Math.round((cap.level / 100) * 15);
                        return (
                          <div key={cIdx} className="bg-slate-950/60 p-4 border border-slate-900 rounded-xl space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                              <span className="truncate pr-2">{cap.name}</span>
                              <span className="font-mono text-slate-400">{cap.level}%</span>
                            </div>
                            
                            {/* Segmented Progress Bar */}
                            <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden bg-slate-900">
                              {Array.from({ length: 15 }).map((_, idx) => {
                                const isActive = idx < numSegments;
                                return (
                                  <motion.div
                                    key={idx}
                                    className={`h-full flex-1 transition-all ${
                                      isActive 
                                        ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                                        : "bg-slate-800"
                                    }`}
                                    initial={{ opacity: 0.2 }}
                                    animate={isActive ? { opacity: 1 } : { opacity: 0.2 }}
                                    transition={{ duration: 0.3, delay: idx * 0.02 + cIdx * 0.05 }}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Simulated Operations Console Log with CRT sweep */}
                  <div className="mb-8 relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-bold flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        Registro de Operaciones Recientes
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-500 animate-pulse uppercase">● LIVE FEED</span>
                    </div>
                    <div tabIndex={0} role="region" aria-label="Registro de operaciones recientes" className="bg-slate-950 text-slate-300 p-6 rounded-xl font-mono text-[11px] leading-relaxed relative border border-slate-900 shadow-inner overflow-hidden max-h-[160px] overflow-y-auto space-y-1">
                      
                      {/* Sutil overlay de CRT lineas */}
                      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)]" style={{ backgroundSize: '100% 3px' }}></div>
                      
                      <div className="text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-900 pb-2 mb-2">DEVGIZ SECURE TELEMETRY FEED v1.1</div>
                      {activeDirector.logs.map((log, lIdx) => {
                        let colorClass = "text-slate-300";
                        if (log.includes("[INIT]") || log.includes("[LOAD]") || log.includes("[SCAN]")) colorClass = "text-cyan-400";
                        if (log.includes("[OK]") || log.includes("[SUCCESS]")) colorClass = "text-emerald-400";
                        if (log.includes("[SIGN]")) colorClass = "text-amber-400";
                        return (
                          <motion.div 
                            key={lIdx} 
                            className={`${colorClass}`}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + lIdx * 0.08 }}
                          >
                            {log}
                          </motion.div>
                        );
                      })}
                      {/* Cursor parpadeante terminal */}
                      <div className="text-slate-500 flex items-center mt-1">
                        <span>[READY] Awaiting new telemetry stack</span>
                        <span className="w-1.5 h-3 bg-cyan-400 inline-block ml-1 animate-[pulse_1s_infinite]"></span>
                      </div>
                    </div>
                  </div>

                  {/* Cryptographic Signature Module */}
                  <div className="bg-slate-950/40 rounded-xl p-5 border border-slate-900/60 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-4 h-4 text-cyan-500/60" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocolo de Firma Digital</span>
                      </div>
                      {verifiedSignatures[activeDirector.name] ? (
                        <div className="font-mono text-[10px] space-y-0.5 min-w-0">
                          <p className="text-cyan-400 font-bold truncate">CLAVE PÚBLICA: {activeDirector.publicKey}</p>
                          <p className="text-slate-500 truncate text-[10px]">SHA-256 HASH: {activeDirector.signatureHash}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 font-light">Valide el hash criptográfico SHA-256 de seguridad jurídica para este perfil.</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleVerifySignature(activeDirector.name)}
                      disabled={verifiedSignatures[activeDirector.name] || verifyingDirector !== null}
                      className={`px-6 py-3 rounded-lg font-mono text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 select-none shrink-0 border focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none ${
                        verifiedSignatures[activeDirector.name]
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 cursor-default"
                          : verifyingDirector === activeDirector.name
                          ? "bg-cyan-500 text-white border-cyan-400 animate-pulse cursor-not-allowed"
                          : "bg-white text-black border-white hover:bg-slate-200 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
                      }`}
                    >
                      {verifiedSignatures[activeDirector.name] ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Validada
                        </>
                      ) : verifyingDirector === activeDirector.name ? (
                        <>
                          <Activity className="w-3.5 h-3.5 animate-spin" />
                          Escaneando...
                        </>
                      ) : (
                        <>
                          <Shield className="w-3.5 h-3.5" />
                          Validar Firma
                        </>
                      )}
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Sovereign Tech Stack Section */}
      <section className="py-14 md:py-16 px-6 bg-[#02040a] text-white border-y border-slate-900 relative section-deferred scroll-reveal" ref={techRef}>
        
        {/* Ambient neon radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-px bg-cyan-500/50"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-400 font-bold">SOVEREIGN TECH PILLARS</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                Core de Ingeniería <br /> <span className="text-slate-400 font-light italic">Soberana</span>
              </h2>
            </div>
            <p className="text-slate-400 font-light leading-relaxed max-w-lg lg:pb-2">
              Infraestructura optimizada sin dependencias de licenciamiento privativo. Hemos modelado e integrado un pipeline analítico nativo de alta precisión para catastros modernos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Side: 4 Interactive tech grids */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {TECH_STACK.map((tech, idx) => {
                const isSelected = activeTechIndex === idx;
                const TechIcon = tech.icon;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => {
                      setActiveTechIndex(idx);
                      if (typeof window !== "undefined" && window.dgzSynth) {
                        try { window.dgzSynth.playClick(); } catch(e){}
                      }
                    }}
                    onClick={() => setActiveTechIndex(idx)}
                    className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group/card relative ${
                      isSelected
                        ? `bg-slate-900/60 border-slate-700 shadow-2xl`
                        : "bg-[#090d16]/40 border-slate-900 hover:border-slate-800 hover:bg-[#0c1220]/60"
                    }`}
                  >
                    {/* Active neon dot */}
                    {isSelected && (
                      <span 
                        className="absolute top-6 right-6 w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: tech.accentColor }}
                      />
                    )}

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center transition-transform group-hover/card:scale-105">
                          <TechIcon className="w-5 h-5 text-slate-400 group-hover/card:text-white transition-colors" style={{ color: isSelected ? tech.accentColor : undefined }} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{tech.category}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-black tracking-tight text-white group-hover/card:text-slate-100">{tech.name}</h3>
                        <p className="text-slate-400 text-xs font-light leading-relaxed">{tech.desc}</p>
                      </div>
                    </div>

                    {/* Telemetry info row */}
                    <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between font-mono text-[10px]">
                      <div className="space-y-1">
                        <span className="text-slate-500 uppercase block tracking-wider">RENDIMIENTO</span>
                        <span className="text-white font-bold">{tech.metric}</span>
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="text-slate-500 uppercase block tracking-wider">LATENCIA</span>
                        <span className="text-cyan-400 font-bold" style={{ color: tech.accentColor }}>{tech.latency}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Right Side: Shared Dynamic Command Console */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex-1 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-900 shadow-2xl p-6 font-mono text-[11px] text-slate-300 relative flex flex-col justify-between min-h-[380px] overflow-hidden group/console hover:border-slate-800 transition-colors">
                
                {/* Console header */}
                <div>
                  <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/20 flex items-center justify-center animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TECH_STACK[activeTechIndex].accentColor }}></div>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.25em] font-black text-slate-400">ENGINEERING SOURCE VIEW</span>
                    </div>
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">{TECH_STACK[activeTechIndex].name.replace("&", "_").replace(" ", "_").toLowerCase()}_core.py</span>
                  </div>

                  <p className="text-slate-500 leading-relaxed mb-6 font-sans font-light text-xs">
                    El siguiente bloque de código representa la implementación y llamada nativa optimizada en nuestros sistemas distribuidos de catastro:
                  </p>

                  {/* Code editor snippet container */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTechIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="bg-slate-950 p-5 rounded-xl border border-slate-900 overflow-x-auto max-w-full font-mono text-[10.5px] text-cyan-100/90 leading-relaxed shadow-inner"
                    >
                      <pre className="whitespace-pre">{TECH_STACK[activeTechIndex].snippet}</pre>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Console footer */}
                <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between text-slate-600 text-[10px] tracking-widest font-black uppercase">
                  <span>DEVGIZ ENGINEERING CORP</span>
                  <span className="animate-pulse" style={{ color: TECH_STACK[activeTechIndex].accentColor }}>STATUS // READY TO PIPELINE</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Institutional CTA */}
      <section className="py-16 md:py-20 bg-[#1a1a1a] text-white relative overflow-hidden scroll-reveal">
        {/* Subtle animated grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <motion.div 
          className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
            ¿Es DevGiz el aliado <br /> <span className="text-slate-500 font-light italic">que su proyecto necesita?</span>
          </h2>
          <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            En una reunión técnica analizamos sus desafíos territoriales y definimos cómo nuestra arquitectura puede aportar valor institucional.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link 
              href="/#contact"
              className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-200 transition-all shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] group flex items-center gap-3"
            >
              Agendar Sesión Técnica
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
