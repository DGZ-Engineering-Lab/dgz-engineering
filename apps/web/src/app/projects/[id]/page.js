"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Logo from "../../../components/Logo";
import { 
  Database, Play, Pause, RefreshCw, Send, Sparkles, CheckCircle2, 
  AlertTriangle, Layers, Terminal, Search, FileText, Check, Cpu, 
  TrendingUp, Activity, User, Zap
} from "lucide-react";

// --- PROJECT DEFINITIONS ---

const PROJECTS_DATA = {
  "catastro-valle": {
    title: "Catastro Multipropósito Valle del Cauca",
    category: "Infraestructura Territorial",
    tagline: "Soberanía fiscal y seguridad jurídica predial mediante la implementación nativa del estándar LADM-COL e INTERLIS.",
    image: "/assets/img/blog-ladm-col.png",
    description: "Esta iniciativa lidera la vanguardia en administración y gobernanza de tierras en Colombia. Implementamos un ecosistema digital completo basado en la norma internacional ISO 19152 (LADM-COL) para descentralizar la gestión catastral del departamento, garantizando interoperabilidad transaccional absoluta con el Instituto Geográfico Agustín Codazzi (IGAC) y la Superintendencia de Notariado y Registro (SNR).",
    goals: [
      "Armonización de datos alfanuméricos y geográficos bajo modelos INTERLIS.",
      "Cumplimiento del 100% en la validación y exportación de archivos XTF catastrales.",
      "Habilitación de trámites ciudadanos digitales de alta precisión territorial en tiempo real."
    ],
    challenges: "La disparidad histórica de información de linderos entre el registro y el catastro fue superada mediante el desarrollo de algoritmos propietarios para la conciliación automática de geometría jurídica de predios.",
    impact: [
      { label: "Área Mapeada", value: "22,140 km2" },
      { label: "Precisión Legal", value: "Grado 1" },
      { label: "Interoperabilidad", value: "VUR / SNR" }
    ],
    lab: "CADASTRE_VIEWER"
  },
  "qgis-plugin": {
    title: "Validador LADM-COL QGIS Plugin",
    category: "Software de Ingeniería",
    tagline: "Control de calidad topológico nativo y verificación estructurada de consistencia parcelaria en tiempo real.",
    image: "/assets/img/geoai_before.png",
    description: "Herramienta de software industrial y de código abierto diseñada para la validación espacial instantánea de bases de datos territoriales bajo el estándar LADM-COL. Optimiza los flujos de trabajo de los operadores catastrales eliminando errores manuales en la digitalización cartográfica.",
    goals: [
      "Detección automática de traslapes, slivers y microvacíos topológicos.",
      "Sincronización segura y transaccional con bases de datos PostGIS.",
      "Generación instantánea de reportes de conformidad técnica para radicación oficial."
    ],
    challenges: "El procesamiento de millones de geometrías vectoriales complejas en el cliente inicialmente presentaba latencias. Lo optimizamos reescribiendo el motor en PyQGIS acoplado a indexación espacial R-Tree.",
    impact: [
      { label: "Error Humano", value: "-95%" },
      { label: "Velocidad", value: "10x Faster" },
      { label: "Soporte", value: "QGIS 3.x" }
    ],
    lab: "PLUGIN_SIMULATOR"
  },
  "automation-systems": {
    title: "Territorial ETL & Data Pipelines",
    category: "Infraestructura de Datos",
    tagline: "Ingeniería de datos geoespaciales masivos para gobernaciones, alcaldías y gestores catastrales habilitados.",
    image: "/assets/img/topo-bg.png",
    description: "Sistemas de orquestación de datos masivos para la migración, transformación y validación automática de archivos GML, GeoJSON, KML e INTERLIS (XTF). Diseñados bajo esquemas de tolerancia a fallos para entornos corporativos y públicos de alta escala.",
    goals: [
      "Orquestación de carga masiva desatendida mediante contenedores y motores GDAL/OGR.",
      "Validación sintáctica y semántica estricta contra esquemas de modelos de datos catastrales.",
      "Trazabilidad histórica completa y auditoría de cambios prediales en bases distribuidas."
    ],
    challenges: "La heterogeneidad de fuentes de datos heredadas impedía una consistencia limpia. Diseñamos un motor ETL inteligente con reglas de mapeo dinámico y depuración topológica automática.",
    impact: [
      { label: "Registros/Día", value: "500k+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Seguridad", value: "AES-256" }
    ],
    lab: "PIPELINE_MONITOR"
  },
  "geo-llm": {
    title: "Inteligencia GeoAI & Geo-LLM",
    category: "Inteligencia Artificial",
    tagline: "Modelos híbridos de procesamiento de lenguaje natural y motores GIS para análisis territorial estratégico de alta escala.",
    image: "/assets/img/blog-cybersecurity.png",
    description: "Arquitectura avanzada de inteligencia artificial generativa aplicada al territorio que permite interactuar con bases de datos catastrales complejas y capas geográficas mediante lenguaje natural en español. Traduce instrucciones complejas a operaciones de análisis espacial geoespacial.",
    goals: [
      "Traducción precisa de consultas coloquiales en español a sentencias Spatial SQL robustas.",
      "Modelado predictivo del mercado inmobiliario y patrones de expansión urbana.",
      "Generación en segundos de informes, resoluciones y memorias técnicas territoriales conformes."
    ],
    challenges: "La ambigüedad inherente al lenguaje natural al tratar con relaciones espaciales estrictas. Implementamos un compilador semántico que traduce y valida las consultas contra el esquema de PostGIS antes de su ejecución.",
    impact: [
      { label: "Accesibilidad", value: "User-Centric" },
      { label: "Motor", value: "LLM-Hybrid" },
      { label: "Data", value: "Real-Time SQL" }
    ],
    lab: "AI_CHAT_LAB"
  }
};
// --- INTERACTIVE IMMERSION LAB COMPONENTS ---

function CadastreViewer() {
  const [parcelsState, setParcelsState] = useState([
    {
      id: "P-76001-A01",
      name: "Predio La Esmeralda",
      interesado: "Sonia Giraldo - CC 31.420.912",
      derecho: "Propiedad / Dominio Pleno",
      lidarArea: "1,245.82 m²",
      ladmClass: "LA_Predio (Terreno)",
      status: "CONFORME (.xtf verificado)",
      variance: "-0.15% (Dentro de tolerancia)",
      path: "M 20 20 L 100 20 L 90 90 L 15 80 Z",
      vertices: [[20,20], [100,20], [90,90], [15,80]]
    },
    {
      id: "P-76001-B02",
      name: "Hacienda El Vergel",
      interesado: "Agro-Valle S.A.S. - NIT 900.240.111-2",
      derecho: "Servidumbre de Paso (Restricción)",
      lidarArea: "8,942.10 m²",
      ladmClass: "LA_ServidumbrePaso",
      status: "CONFORME (.xtf verificado)",
      variance: "+0.04% (Óptimo)",
      path: "M 100 20 L 220 30 L 200 110 L 90 90 Z",
      vertices: [[100,20], [220,30], [200,110], [90,90]]
    },
    {
      id: "P-76001-C03",
      name: "Lote Urbanización Versalles",
      interesado: "Alcaldía de Cali - NIT 800.124.901-0",
      derecho: "Bien de Uso Público",
      lidarArea: "4,120.35 m²",
      ladmClass: "LA_Predio (Espacio Público)",
      status: "VERIFICACIÓN PENDIENTE (Esquema v3.0.1)",
      variance: "+1.85% (Requiere Ajuste)",
      path: "M 15 80 L 90 90 L 120 180 L 30 170 Z",
      vertices: [[15,80], [90,90], [120,180], [30,170]]
    },
    {
      id: "P-76001-D04",
      name: "Finca El Porvenir",
      interesado: "Manuel Tiberio Ocampo - CC 16.290.114",
      derecho: "Derecho de Ocupación Registrada",
      lidarArea: "5,302.50 m²",
      ladmClass: "LA_Predio (Terreno)",
      status: "CONFORME (.xtf verificado)",
      variance: "-0.08% (Dentro de tolerancia)",
      path: "M 90 90 L 200 110 L 180 190 L 120 180 Z",
      vertices: [[90,90], [200,110], [180,190], [120,180]]
    },
    {
      id: "P-76001-E05",
      name: "Parcela La Aurora",
      interesado: "Cooperativa de Cafeteros - NIT 890.340.231-1",
      derecho: "Derecho de Ocupación Registrada",
      lidarArea: "3,110.15 m²",
      ladmClass: "LA_Predio (Terreno)",
      status: "CONFORME (.xtf verificado)",
      variance: "+0.12% (Óptimo)",
      path: "M 220 30 L 320 20 L 300 120 L 200 110 Z",
      vertices: [[220,30], [320,20], [300,120], [200,110]]
    },
    {
      id: "P-76001-F06",
      name: "Reserva Forestal Farallones",
      interesado: "CVC Corporación Autónoma - NIT 890.399.001-3",
      derecho: "Restricción Ambiental Completa",
      lidarArea: "15,820.40 m²",
      ladmClass: "LA_RestriccionTerritorial",
      status: "REQUIERE ACCIÓN (Fuera de Límite)",
      variance: "+3.22% (Superposición Detectada)",
      path: "M 200 110 L 300 120 L 280 200 L 180 190 Z",
      vertices: [[200,110], [300,120], [280,200], [180,190]]
    }
  ]);

  const [selectedId, setSelectedId] = useState("P-76001-A01");
  const [isLidarActive, setIsLidarActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([
    "SYS // Visor LADM-COL listo.",
    "SYS // Seleccione un predio para análisis de linderos."
  ]);

  const selectedParcel = parcelsState.find(p => p.id === selectedId) || parcelsState[0];

  // Action: Repair topological issue or process LiDAR
  const executeDevGizAction = (parcelId, type) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const logMessages = {
      repair: [
        `[SYS] Iniciando reparación de inconsistencia para ${parcelId}...`,
        `[SHAPELY] Calculando tolerancia geométrica con Resol. 1040/2020...`,
        `[SHAPELY] Alineando vértices (Snapping a CTM12)...`,
        `[XTF] Validando conformidad del esquema INTERLIS...`,
        `[STATUS] Saneamiento completo. Predio conforme.`
      ],
      lidar: [
        `[SYS] Activando barrido de nube de puntos LiDAR en ${parcelId}...`,
        `[LiDAR] Cargando cota de terreno y retículas volumétricas...`,
        `[AI_VISION] Segmentando construcciones del predio...`,
        `[STATUS] Escaneo LiDAR exitoso. Área física verificada.`
      ]
    };

    const activeLogs = logMessages[type] || logMessages.repair;
    setConsoleLogs(prev => [...prev, `--- EJECUTANDO ACCIÓN: ${type.toUpperCase()} ---`]);

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < activeLogs.length) {
        setConsoleLogs(prev => [...prev, activeLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        
        // Mutate target parcel state to represent the "magic" correction!
        setParcelsState(prev => prev.map(p => {
          if (p.id === parcelId) {
            if (type === "repair") {
              return {
                ...p,
                status: "CONFORME (.xtf verificado)",
                variance: "0.00% (Saneado por DevGiz)",
                ladmClass: p.id === "P-76001-F06" ? "LA_RestriccionTerritorial (Colindancia Ajustada)" : p.ladmClass
              };
            } else if (type === "lidar") {
              return {
                ...p,
                variance: "0.00% (Verificado con LiDAR de 50pt/m²)"
              };
            }
          }
          return p;
        }));
      }
    }, 450);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-200">
      
      {/* Visual Canvas Block */}
      <div className="md:col-span-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Visor Predial Geográfico
          </h4>
          
          <button
            onClick={() => setIsLidarActive(!isLidarActive)}
            className={`px-2.5 py-1 text-[8px] font-mono tracking-widest uppercase rounded border transition-all ${
              isLidarActive
                ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
            }`}
          >
            {isLidarActive ? "LiDAR: ACTIVO" : "Visualización LiDAR"}
          </button>
        </div>

        <div className="relative aspect-square md:aspect-auto md:h-64 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center p-4">
          
          {/* Neon spatial grid backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

          {/* Active scan beam */}
          {isProcessing && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#06b6d4] z-10 pointer-events-none"
            />
          )}

          <svg className="w-full h-full max-w-[280px] max-h-[200px]" viewBox="0 0 340 220">
            {parcelsState.map(p => {
              const isSelected = p.id === selectedId;
              const isError = p.status.includes("REQUIERE") || p.status.includes("VERIFICACIÓN");
              
              return (
                <g key={p.id}>
                  <motion.path
                    d={p.path}
                    fill={isSelected ? (isError ? "rgba(239, 68, 68, 0.25)" : "rgba(6, 182, 212, 0.25)") : "rgba(30, 41, 59, 0.25)"}
                    stroke={isSelected ? (isError ? "#ef4444" : "#06b6d4") : "#475569"}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    onClick={() => {
                      setSelectedId(p.id);
                      setConsoleLogs(prev => [...prev, `[INFO] Inspección de predio: ${p.id}`]);
                    }}
                    className="cursor-pointer transition-all duration-300 hover:fill-slate-700/40"
                    whileHover={{ scale: 1.01 }}
                  />

                  {/* Draw LiDAR node vertices if LiDAR mode is enabled */}
                  {isLidarActive && isSelected && p.vertices.map((v, i) => (
                    <circle
                      key={i}
                      cx={v[0]}
                      cy={v[1]}
                      r="3"
                      className="fill-cyan-400 stroke-slate-900 stroke-1 animate-pulse"
                    />
                  ))}
                </g>
              );
            })}
          </svg>

          {/* Interactive Legends */}
          <div className="absolute bottom-2 left-2 flex flex-col gap-1 text-[8px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-cyan-500/25 border border-cyan-500 rounded-sm" />
              <span>Seleccionado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-slate-800/40 border border-slate-650 rounded-sm" />
              <span>Predio Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-500/25 border border-red-500 rounded-sm animate-pulse" />
              <span>Inconsistencia Activa</span>
            </div>
          </div>
        </div>

        {/* Local Console logs representing active engineering work */}
        <div className="bg-black/80 border border-slate-900 rounded-lg p-3 font-mono text-[8px] text-slate-500 space-y-1 h-20 overflow-y-auto">
          <div className="text-[7px] text-slate-600 font-bold uppercase tracking-widest border-b border-slate-900 pb-1 mb-1 flex items-center justify-between">
            <span>Terminal // DevGiz GIS Engine</span>
            <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></span>
          </div>
          {consoleLogs.filter(Boolean).slice(-4).map((log, i) => (
            <p key={i} className={log?.includes("STATUS") ? "text-emerald-400" : log?.includes("SYS") ? "text-cyan-500" : "text-slate-400"}>
              &gt; {log}
            </p>
          ))}
        </div>
      </div>

      {/* Control Panel Block */}
      <div className="md:col-span-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 font-bold">{selectedParcel.id}</span>
            <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all ${
              selectedParcel.status.includes("CONFORME") 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                : selectedParcel.status.includes("VERIFICACIÓN")
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse"
            }`}>
              {selectedParcel.status}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Predio (Clase LADM-COL)</div>
              <div className="text-sm font-bold text-white tracking-tight">{selectedParcel.name}</div>
              <div className="text-[10px] text-slate-400 font-mono italic">{selectedParcel.ladmClass}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-3">
              <div>
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <User className="w-2.5 h-2.5 text-slate-500" />
                  Sujeto de Interés
                </div>
                <div className="text-[11px] font-bold text-slate-300 line-clamp-1">{selectedParcel.interesado}</div>
              </div>
              <div>
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 text-slate-500" />
                  Derecho / RRD
                </div>
                <div className="text-[11px] font-bold text-slate-300 line-clamp-1">{selectedParcel.derecho}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-3">
              <div>
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Área Física (LiDAR)</div>
                <div className="text-xs font-bold font-mono text-cyan-400">{selectedParcel.lidarArea}</div>
              </div>
              <div>
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Varianza de Registro</div>
                <div className={`text-xs font-bold font-mono transition-all ${
                  selectedParcel.variance.includes("Ajuste") || selectedParcel.variance.includes("Superposición") 
                    ? "text-rose-400 animate-pulse font-bold" 
                    : "text-emerald-400"
                }`}>
                  {selectedParcel.variance}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Action Buttons illustrating the "magic" of DevGiz */}
        <div className="pt-4 border-t border-slate-900 mt-4 space-y-3">
          
          <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
            Herramientas DevGiz Engine en Vivo
          </div>

          <div className="flex gap-2">
            {/* Contextual actions depend on selected parcel status */}
            {(selectedParcel.id === "P-76001-C03" || selectedParcel.id === "P-76001-F06") && !selectedParcel.status.includes("CONFORME") ? (
              <button
                onClick={() => executeDevGizAction(selectedParcel.id, "repair")}
                disabled={isProcessing}
                className="flex-1 py-2.5 bg-white text-black hover:bg-cyan-500 hover:text-black font-black uppercase text-[9px] tracking-wider rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Saneamiento Topológico</span>
              </button>
            ) : (
              <button
                onClick={() => executeDevGizAction(selectedParcel.id, "lidar")}
                disabled={isProcessing}
                className="flex-1 py-2.5 bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 font-bold uppercase text-[9px] tracking-wider rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Auditar Nube LiDAR</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 pt-1">
            <span>Sincronizado con Nodo IGAC</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

function PluginSimulator() {
  const [isRepaired, setIsRepaired] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [logStep, setLogStep] = useState(0);

  const startRepair = () => {
    setIsAnimating(true);
    setLogStep(1);
    
    setTimeout(() => {
      setLogStep(2);
    }, 1200);

    setTimeout(() => {
      setLogStep(3);
    }, 2400);

    setTimeout(() => {
      setIsRepaired(true);
      setIsAnimating(false);
      setLogStep(4);
    }, 3600);
  };

  const resetSimulator = () => {
    setIsRepaired(false);
    setIsAnimating(false);
    setLogStep(0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-200">
      <div className="md:col-span-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Topología Shapely (QGIS Plugin)
          </h4>
          <span className="text-[9px] font-mono text-slate-500 uppercase">Spatial Engine Canvas</span>
        </div>

        <div className="relative h-64 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
          
          <svg className="w-full h-full max-w-[280px] max-h-[200px]" viewBox="0 0 300 200">
            <path
              d="M 40 40 L 160 30 L 150 160 L 30 150 Z"
              fill="rgba(6, 182, 212, 0.15)"
              stroke="#06b6d4"
              strokeWidth="2"
            />
            
            <motion.path
              animate={isRepaired 
                ? { d: "M 160 30 L 260 40 L 250 170 L 150 160 Z", fill: "rgba(16, 185, 129, 0.15)", stroke: "#10b981" } 
                : { d: "M 130 30 L 260 40 L 250 170 L 125 160 Z", fill: "rgba(239, 68, 68, 0.15)", stroke: "#ef4444" }
              }
              transition={{ duration: 1.5, ease: "easeInOut" }}
              strokeWidth="2"
            />

            <AnimatePresence>
              {!isRepaired && (
                <motion.path
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  d="M 130 30 L 160 30 L 150 160 L 125 160 Z"
                  fill="rgba(239, 68, 68, 0.4)"
                  stroke="#ef4444"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
              )}
            </AnimatePresence>
          </svg>

          <div className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-[8px] font-mono">
            {isRepaired ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                CONFORME (0.00 m² Overlap)
              </span>
            ) : isAnimating ? (
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <RefreshCw className="w-2.5 h-2.5 text-cyan-400 animate-spin" />
                PROCESANDO RECONCILIACIÓN...
              </span>
            ) : (
              <span className="text-red-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-400 animate-pulse" />
                ERROR: TRASLAPE DETECTADO (42.15 m²)
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="md:col-span-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Procedimiento Topológico</span>
            <h5 className="text-xs font-bold text-white">Algoritmo de Snapping Vectorial LADM-COL</h5>
            <p className="text-[10px] text-slate-400 font-light leading-relaxed">
              Resuelve traslapes topológicos de linderos prediales bajo la regla de no-superposición oficial mediante geometría computacional.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800/80 rounded p-3 font-mono text-[9px] text-slate-300 space-y-1.5 h-32 overflow-y-auto">
            {logStep >= 0 && (
              <div className="text-slate-400">
                &gt;&gt;&gt; import shapely.ops, shapely.geometry
              </div>
            )}
            {logStep >= 0 && (
              <div className="text-slate-500 font-bold flex items-center gap-1">
                <span>[INFO] Iniciando Shapely Topological Check...</span>
                <span className="text-red-400">[ERR: Overlap 42.15m²]</span>
              </div>
            )}
            {logStep >= 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-400 font-bold">
                [PROCESS] Executing snapping on common vertices...
              </motion.div>
            )}
            {logStep >= 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-400">
                [PROCESS] Tolerance threshold: 0.05 meters.
              </motion.div>
            )}
            {logStep >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-400">
                [PROCESS] Running topological integrity audit...
              </motion.div>
            )}
            {logStep >= 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 font-bold">
                [SUCCESS] No overlaps or gaps detected! Status updated.
              </motion.div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-900 mt-4 flex gap-3">
          {!isRepaired && !isAnimating ? (
            <button
              onClick={startRepair}
              className="flex-1 py-2 px-3 bg-cyan-500 text-slate-950 font-bold text-[9px] font-mono tracking-wider uppercase rounded hover:bg-cyan-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <Zap className="w-3 h-3 text-slate-950 fill-slate-950" />
              Reparar Topología
            </button>
          ) : (
            <button
              onClick={resetSimulator}
              disabled={isAnimating}
              className="flex-1 py-2 px-3 bg-slate-800 text-slate-200 font-bold text-[9px] font-mono tracking-wider uppercase rounded hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-slate-200" />
              Restablecer Simulación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PipelineMonitor() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recordsCount, setRecordsCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const consoleEndRef = useRef(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            setLogs(l => [...l, `[${new Date().toLocaleTimeString()}] [SUCCESS] Pipeline finished. 142,912 records written to Parquet.`]);
            return 100;
          }
          const next = prev + 5;
          setRecordsCount(Math.floor(next * 1429.12));
          
          if (next === 10) {
            setLogs(l => [...l, `[${new Date().toLocaleTimeString()}] [INFO] Reading Valle_Del_Cauca_Parcels_2026.xtf...`]);
          } else if (next === 25) {
            setLogs(l => [...l, `[${new Date().toLocaleTimeString()}] [INFO] Parsing INTERLIS v3 XML Schema...`]);
          } else if (next === 45) {
            setLogs(l => [...l, `[${new Date().toLocaleTimeString()}] [DB] Initialized local DuckDB file database.`]);
          } else if (next === 60) {
            setLogs(l => [...l, `[${new Date().toLocaleTimeString()}] [OP] Executing parallel anti-joins using Polars lazy frames.`]);
          } else if (next === 80) {
            setLogs(l => [...l, `[${new Date().toLocaleTimeString()}] [OP] Hashing records and partitioning indices...`]);
          }

          return next;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startPipeline = () => {
    setIsRunning(true);
    setProgress(0);
    setRecordsCount(0);
    setLogs([
      `[${new Date().toLocaleTimeString()}] [SYSTEM] Initializing high-speed ETL workflow...`,
      `[${new Date().toLocaleTimeString()}] [SYSTEM] Thread pool optimized: 8 logic cores allocated.`
    ]);
  };

  const pausePipeline = () => {
    setIsRunning(false);
    setLogs(l => [...l, `[${new Date().toLocaleTimeString()}] [WARNING] Workflow paused by user command.`]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-200">
      <div className="md:col-span-7 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Consola ETL en Vivo (Polars & DuckDB)
          </h4>
          <span className="text-[9px] font-mono text-slate-500 uppercase">Live Pipeline Execution</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded p-4 font-mono text-[9px] text-slate-300 space-y-1.5 h-64 overflow-y-auto flex flex-col justify-end">
          <div className="flex-1 overflow-y-auto space-y-1">
            {logs.length === 0 ? (
              <div className="text-slate-500 italic">
                Esperando comando de ejecución. Presione &quot;Iniciar Orquestación&quot; para arrancar el pipeline de alto rendimiento.
              </div>
            ) : (
              logs.filter(Boolean).map((log, i) => {
                let colorClass = "text-slate-400";
                if (log?.includes("[SUCCESS]")) colorClass = "text-emerald-400 font-bold";
                if (log?.includes("[WARNING]")) colorClass = "text-amber-400 font-bold";
                if (log?.includes("[DB]")) colorClass = "text-cyan-400";
                if (log?.includes("[OP]")) colorClass = "text-indigo-400";
                return (
                  <div key={i} className={colorClass}>
                    {log}
                  </div>
                );
              })
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>
      </div>

      <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Métricas de Rendimiento</span>
            <h5 className="text-xs font-bold text-white">Consistencia Temporal & Ingesta</h5>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-mono">
                <span className="text-slate-400">Progreso Total</span>
                <span className="text-white font-bold">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 border border-slate-850 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-3">
              <div>
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Filas Procesadas</div>
                <div className="text-sm font-bold font-mono text-white">
                  {recordsCount.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Velocidad Ingesta</div>
                <div className="text-sm font-bold font-mono text-cyan-400">
                  {isRunning ? "124,500/s" : "0/s"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-3">
              <div>
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Engine Footprint</div>
                <div className="text-[11px] font-bold font-mono text-slate-300">
                  {isRunning ? "1.42 GB RAM" : "Idle"}
                </div>
              </div>
              <div>
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Cores Activos</div>
                <div className="text-[11px] font-bold font-mono text-indigo-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  {isRunning ? "8/8 Threads" : "0 threads"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 mt-6 flex gap-2">
          {isRunning ? (
            <button
              onClick={pausePipeline}
              className="flex-1 py-2 px-3 bg-amber-500 text-slate-950 font-bold text-[9px] font-mono tracking-wider uppercase rounded hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              Pausar
            </button>
          ) : (
            <button
              onClick={startPipeline}
              className="flex-1 py-2 px-3 bg-cyan-500 text-slate-950 font-bold text-[9px] font-mono tracking-wider uppercase rounded hover:bg-cyan-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <Play className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              {progress > 0 ? "Reanudar Ingesta" : "Iniciar Orquestación"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AiChatLab() {
  const queries = useMemo(() => [
    {
      q: "¿Cuáles predios se traslapan con la ronda de río de 30m?",
      answer: "Analizando capas catastrales y de rondas hídricas en Valle del Cauca. Se identificaron 12 predios con traslapes superiores al límite de tolerancia legal. A continuación, el reporte y código de consulta espacial:",
      sql: `SELECT p.identificador, p.area_escrita, 
       ST_Area(ST_Intersection(p.geom, r.geom)) AS area_traslape
FROM dgz_catastro.la_predio p, dgz_ambiental.col_ronda r
WHERE ST_Intersects(p.geom, ST_Buffer(r.geom, 30))
ORDER BY area_traslape DESC
LIMIT 5;`,
      metrics: { "Predios Afectados": "12", "Área de Conflicto": "842.15 m²", "Costo Fiscal": "$45.2M COP" }
    },
    {
      q: "Calcular la superficie total de bosque reservado afectada por minería.",
      answer: "Cruzando la base de datos de concesiones mineras activas ANM con las zonas protegidas registradas RUNAP. La superposición de geometrías da el siguiente resultado:",
      sql: `SELECT m.concesionario, SUM(ST_Area(ST_Intersection(m.geom, b.geom)))/10000 AS hectareas_afectadas
FROM dgz_mineria.concesion m, dgz_ambiental.bosque_reservado b
WHERE ST_Intersects(m.geom, b.geom)
GROUP BY m.concesionario
LIMIT 3;`,
      metrics: { "Hectáreas Impactadas": "142.8 Ha", "Concesiones Activas": "4", "Nivel de Alerta": "CRÍTICO" }
    },
    {
      q: "Verificar inconsistencias de área registrada vs área física > 10%.",
      answer: "Ejecutando auditoría cruzada entre el área reportada en los títulos alfanuméricos de la Oficina de Registro (SNR) y el polígono geométrico calculado por LiDAR de alta precisión:",
      sql: `SELECT p.identificador, p.area_registro, ST_Area(p.geom) AS area_lidar,
       ABS(p.area_registro - ST_Area(p.geom)) / p.area_registro * 100 AS porcentaje_desviacion
FROM dgz_catastro.la_predio p
WHERE ABS(p.area_registro - ST_Area(p.geom)) / p.area_registro > 0.10
LIMIT 5;`,
      metrics: { "Predios con Desviación": "1,412", "Porcentaje Máximo": "42.15%", "Confianza LiDAR": "99.8%" }
    }
  ], []);

  const [activeQueryIndex, setActiveQueryIndex] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Estados del Modo en Vivo con Groq
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [customQuery, setCustomQuery] = useState("");
  const [liveResponse, setLiveResponse] = useState(null);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [liveLogs, setLiveLogs] = useState([]);
  const [liveError, setLiveError] = useState(null);

  const selectQuery = (index) => {
    setIsLiveMode(false);
    setLiveResponse(null);
    setActiveQueryIndex(index);
    setTypedText("");
    setIsTyping(true);
  };

  useEffect(() => {
    if (activeQueryIndex === null || isLiveMode) return;
    const fullText = queries[activeQueryIndex].answer;
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(prev => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [activeQueryIndex, queries, isLiveMode]);

  // Simulador de logs de telemetría táctica
  const simulateLogs = () => {
    setLiveLogs([]);
    const logsList = [
      "📡 Conectando al nodo seguro de Groq en el Edge...",
      "🔑 Validando credenciales y headers de DGZ Engineering...",
      "🤖 Enrutando petición a Llama-3.3-70b-versatile...",
      "🧭 Analizando el diccionario territorial y capas del catastro...",
      "📊 Compilando sentencias SQL espacial avanzadas (PostGIS)...",
      "📝 Estructurando respuesta semántica en español..."
    ];
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logsList.length) {
        setLiveLogs(prev => [...prev, logsList[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 380);
    return logInterval;
  };

  // Función principal para enviar consultas en vivo a /api/ai
  const handleLiveQuery = async (queryText) => {
    if (!queryText.trim()) return;
    setIsLiveMode(true);
    setIsSearchingLive(true);
    setLiveError(null);
    setLiveResponse(null);

    const logInterval = simulateLogs();
    const startTime = performance.now();

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: queryText,
          context: {
            project: "geo-llm",
            clientLocation: "Colombia"
          }
        })
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Límite de peticiones de análisis espacial excedido. Por favor, espera un momento antes de volver a consultar.");
        }
        throw new Error(`Error en el servidor de IA (Código ${res.status}). Verifica tus variables de entorno.`);
      }

      const data = await res.json();
      const endTime = performance.now();
      const latency = ((endTime - startTime) / 1000).toFixed(2);

      clearInterval(logInterval);
      setLiveLogs(prev => [
        ...prev,
        "✅ Inferencia completada con éxito.",
        `⏱️ Latencia del servicio de Groq: ${latency}s`
      ]);

      setLiveResponse({
        text: data.text,
        model: data.model || "llama-3.3-70b-versatile",
        simulated: !!data.simulated,
        latency: latency,
        tokens: Math.round(queryText.length * 0.45 + data.text.length * 0.35)
      });
    } catch (err) {
      clearInterval(logInterval);
      setLiveError(err.message);
    } finally {
      setIsSearchingLive(false);
    }
  };

  // Renderizador robusto de markdown básico (bloques de código SQL)
  const renderLiveResponseContent = (text) => {
    if (!text) return null;
    const parts = text.split("```");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const lines = part.split("\n");
        let language = "sql";
        let code = part;
        if (lines[0] === "sql" || lines[0] === "javascript" || lines[0] === "json" || lines[0] === "bash") {
          language = lines[0];
          code = lines.slice(1).join("\n");
        }
        return (
          <div key={index} className="my-3 space-y-1.5">
            <div className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest pl-1">Código Generado ({language})</div>
            <div className="bg-[#030712] border border-slate-800/80 rounded-lg p-3.5 font-mono text-[9px] text-emerald-400 overflow-x-auto whitespace-pre-wrap select-all">
              {code.trim()}
            </div>
          </div>
        );
      }
      return (
        <p key={index} className="text-[10px] text-slate-300 leading-relaxed font-light whitespace-pre-line my-2">
          {part}
        </p>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-200">
      {/* Columna Izquierda: Presets y Entrada Personalizada */}
      <div className="md:col-span-5 flex flex-col justify-between gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Preguntas Geoespaciales
            </h4>
            <span className="text-[8px] font-mono text-slate-500">Geo-LLM Core v2</span>
          </div>

          <div className="flex flex-col gap-2">
            {queries.map((q, i) => (
              <button
                key={i}
                onClick={() => selectQuery(i)}
                disabled={isTyping || isSearchingLive}
                className={`text-left p-3 text-[10px] font-bold rounded-lg border leading-tight transition-all active:scale-95 cursor-pointer ${
                  !isLiveMode && activeQueryIndex === i
                    ? "bg-cyan-500/10 border-cyan-500/80 text-cyan-400"
                    : "bg-slate-900 border-slate-800/60 text-slate-300 hover:border-slate-700"
                }`}
              >
                {q.q}
              </button>
            ))}
          </div>
        </div>

        {/* Campo de Consulta Personalizada (Llama 3.3) */}
        <div className="border-t border-slate-900 pt-4">
          <label className="text-[9px] font-mono text-slate-400 block mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Consola Libre (Llama 3.3)
          </label>
          <div className="relative">
            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Haz una pregunta catastral o de SQL espacial libre..."
              disabled={isSearchingLive || isTyping}
              className="w-full bg-[#030712] border border-slate-800 rounded-lg p-3 pr-10 text-[10px] text-slate-200 placeholder-slate-650 focus:outline-none focus:border-cyan-500/80 transition-all font-mono resize-none h-20 leading-relaxed"
            />
            <button
              onClick={() => handleLiveQuery(customQuery)}
              disabled={isSearchingLive || isTyping || !customQuery.trim()}
              className="absolute right-2.5 bottom-3.5 p-1.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all disabled:opacity-30 disabled:hover:bg-cyan-500 flex items-center justify-center cursor-pointer shadow-lg shadow-cyan-500/10"
              title="Preguntar a Llama 3.3"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Consola de Diagnóstico / Respuestas */}
      <div className="md:col-span-7 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-h-[340px]">
        {/* Caso A: Cargando Inferencia con Telemetría Animada */}
        {isSearchingLive ? (
          <div className="flex-1 flex flex-col justify-center space-y-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
              <div className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase animate-pulse">
                Ejecutando Inferencia en Vivo
              </div>
            </div>
            <div className="bg-[#030712] border border-slate-900 rounded-lg p-4 font-mono text-[9px] text-cyan-500/80 min-h-[160px] flex flex-col justify-end space-y-1.5 shadow-inner">
              {liveLogs.map((log, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="text-[7px] text-slate-600">[{index * 0.4}s]</span>
                  <span>{log}</span>
                </div>
              ))}
              <div className="inline-block w-1 h-3 bg-cyan-400 animate-pulse ml-1" />
            </div>
          </div>
        ) : isLiveMode ? (
          /* Caso B: Modo en Vivo (Con Respuesta o Error) */
          <div className="flex-1 flex flex-col justify-between space-y-4">
            {liveError ? (
              <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-3 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-rose-500 animate-bounce" />
                <div className="text-[11px] font-bold text-rose-400 font-mono uppercase">Error de Conexión</div>
                <p className="text-[10px] text-slate-400 max-w-[280px] leading-relaxed">
                  {liveError}
                </p>
                <button
                  onClick={() => handleLiveQuery(customQuery || queries[activeQueryIndex]?.q)}
                  className="px-4 py-1.5 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/25 rounded-md text-[9px] font-mono text-rose-400 cursor-pointer transition-all"
                >
                  Reintentar Operación
                </button>
              </div>
            ) : liveResponse ? (
              <div className="flex-1 flex flex-col justify-between space-y-4">
                {/* Badge de Diagnóstico según estado real de API */}
                {liveResponse.simulated ? (
                  <div className="bg-amber-500/5 border border-amber-500/20 text-amber-400 rounded-lg p-3 text-[9px] flex items-start gap-2.5 shadow-md">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold uppercase tracking-wide">Modo Simulación Activo</div>
                      <div className="text-[8.5px] text-amber-400/70 leading-normal mt-0.5">
                        GROQ_API_KEY no detectada en la variable local. Mostrando respuesta inteligente simulada.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 rounded-lg p-3 text-[9px] flex items-start gap-2.5 shadow-md shadow-emerald-950/20">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <div className="font-bold uppercase tracking-wide flex items-center gap-1.5">
                        Llama 3.3 Conectado
                        <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                      </div>
                      <div className="text-[8.5px] text-emerald-400/70 leading-normal mt-0.5">
                        Inferencia espacial real ejecutada con éxito en el clúster de cómputo ultraveloz de Groq.
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[8px] font-mono text-cyan-400">
                    <Terminal className="w-3.5 h-3.5" />
                    RESPUESTA GEO-AI EN VIVO
                  </div>
                  <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-900 max-h-[220px] overflow-y-auto custom-scrollbar">
                    {renderLiveResponseContent(liveResponse.text)}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 text-[8px] font-mono text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-2.5 h-2.5 text-slate-600" />
                    Modelo: {liveResponse.model}
                  </span>
                  <span>Latencia: {liveResponse.latency}s</span>
                  <span>Tokens: ~{liveResponse.tokens}</span>
                </div>
              </div>
            ) : null}

            <button
              onClick={() => {
                setIsLiveMode(false);
                setLiveResponse(null);
                setLiveError(null);
              }}
              className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-slate-800 rounded-lg py-2 text-[9px] font-mono text-slate-400 hover:text-slate-200 transition-all text-center cursor-pointer uppercase tracking-wider"
            >
              ← Volver al Centro de Demostración
            </button>
          </div>
        ) : activeQueryIndex === null ? (
          /* Caso C: Estado Inicial Sin Pregunta Seleccionada */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 text-xs font-mono shadow-inner">
              GEO
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 tracking-wide">Geo-LLM Intelligence Lab</div>
              <div className="text-[10px] text-slate-500 leading-normal max-w-[220px] mx-auto mt-1">
                Selecciona una pregunta de demostración catastral o redacta una libre en la consola para ver el análisis de Spatial SQL.
              </div>
            </div>
          </div>
        ) : (
          /* Caso D: Vista de Presets Estáticos (Con Opción de Inferencia en Vivo) */
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[8px] font-mono text-cyan-400">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                DEMO PRE-RENDERIZADA
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed font-light">
                {typedText}
                {isTyping && <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-0.5 animate-pulse" />}
              </p>
            </div>

            {!isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="bg-slate-900 border border-slate-800/80 rounded p-3 font-mono text-[8px] text-emerald-400 overflow-x-auto whitespace-pre">
                  {queries[activeQueryIndex].sql}
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-slate-900 pt-2.5">
                  {Object.entries(queries[activeQueryIndex].metrics).map(([key, val]) => (
                    <div key={key} className="bg-slate-900/60 p-2 rounded border border-slate-900 text-center shadow-inner">
                      <div className="text-[7px] text-slate-500 uppercase tracking-widest leading-none">{key}</div>
                      <div className="text-[10px] font-bold text-white mt-1 leading-none">{val}</div>
                    </div>
                  ))}
                </div>

                {/* Botón táctico para re-ejecutar en vivo contra Groq */}
                <button
                  onClick={() => {
                    setCustomQuery(queries[activeQueryIndex].q);
                    handleLiveQuery(queries[activeQueryIndex].q);
                  }}
                  className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg py-2 text-[9px] font-mono text-cyan-400 hover:text-cyan-300 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Ejecutar Análisis en Vivo con Groq Llama-3.3
                </button>
              </motion.div>
            )}

            <div className="pt-3 border-t border-slate-900 text-[8px] font-mono text-slate-500 flex items-center justify-between">
              <span>Token Cost: ~210 Spatial Tokens</span>
              <span>Model latency: 0.12s</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}

function ProjectLabComponent({ labType }) {
  if (labType === "CADASTRE_VIEWER") {
    return <CadastreViewer />;
  }
  if (labType === "PLUGIN_SIMULATOR") {
    return <PluginSimulator />;
  }
  if (labType === "PIPELINE_MONITOR") {
    return <PipelineMonitor />;
  }
  if (labType === "AI_CHAT_LAB") {
    return <AiChatLab />;
  }
  return (
    <div className="h-64 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
      <span className="text-slate-500 font-mono text-xs">MÓDULO DE LABORATORIO NO DISPONIBLE</span>
    </div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id;
  const project = PROJECTS_DATA[id];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#1a1a1a]">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black text-slate-200">404 // Proyecto No Encontrado</h1>
          <Link href="/projects" className="text-slate-400 hover:underline">Volver al Portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white text-[#1a1a1a] min-h-screen pt-32 pb-20">
      <article className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8">
            <div className="space-y-8 mb-20 border-b border-slate-100 pb-16">
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em]">
                <span className="text-[#1a1a1a] font-bold">{project.category}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>Engineering Case Study</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-[#1a1a1a]">
                {project.title}
              </h1>
              <p className="text-2xl text-slate-500 font-light italic border-l-2 border-slate-200 pl-8 py-2">
                {project.tagline}
              </p>
            </div>

            <div className="aspect-[21/9] overflow-hidden bg-slate-100 mb-20 rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[0.2]" />
            </div>

            <div className="space-y-16">
              <section className="space-y-6">
                <h2 className="text-4xl font-black tracking-tight text-[#1a1a1a]">Resumen de Entrega</h2>
                <p className="text-xl text-slate-600 font-light leading-relaxed">{project.description}</p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight">Objetivos Estratégicos</h3>
                  <ul className="space-y-4">
                    {project.goals.map(goal => (
                      <li key={goal} className="flex gap-4 items-start text-slate-500 font-light">
                        <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full mt-2.5 flex-shrink-0"></span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight">Desafíos Superados</h3>
                  <p className="text-slate-500 font-light leading-relaxed">{project.challenges}</p>
                </div>
              </section>

              {/* Dynamic Lab Viewer Based on Project Type */}
              <div className="p-6 md:p-12 bg-[#fafafa] border border-slate-100 rounded-xl space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Immersion Lab // Interactive Viewer</div>
                    <div className="text-sm font-bold text-[#1a1a1a]">Módulo de Visualización e Interacción Premium</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 text-xs font-mono animate-pulse">
                    LIVE
                  </div>
                </div>
                <ProjectLabComponent labType={project.lab} />
              </div>
            </div>

            <div className="mt-32 pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <Logo className="w-12 h-12 opacity-80" />
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">DevGiz Engineering</span>
                  <span className="text-[10px] text-slate-400 font-mono">Territorial Infrastructure Lab</span>
                </div>
              </div>
              <Link href="/projects" className="px-8 py-4 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl">
                Volver al Portfolio de Ingeniería
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="p-10 bg-[#fafafa] border border-slate-100 rounded-sm">
                <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-10 border-b border-slate-200 pb-4">
                  Especificaciones Técnicas
                </h3>
                <div className="space-y-10">
                  {project.impact.map(stat => (
                    <div key={stat.label} className="space-y-1">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-2xl font-black text-[#1a1a1a] tracking-tight">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-[#1a1a1a] text-white space-y-8 rounded-sm shadow-2xl">
                <h4 className="text-2xl font-black tracking-tight leading-tight">¿Requiere una solución a medida?</h4>
                <p className="text-slate-400 text-sm font-light">Diseñamos arquitecturas de datos espaciales adaptadas a la normativa vigente.</p>
                <Link href="/#contact" className="block text-center py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all">Consultoría Técnica</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
