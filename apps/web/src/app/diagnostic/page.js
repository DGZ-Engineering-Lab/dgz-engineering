"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Sliders, Shield, Zap, TrendingUp, Terminal, 
  FileText, Building2, AlertTriangle, CheckCircle2, 
  ArrowRight, Lock, RefreshCw, Layers, Check, Globe 
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import RtkSatelliteHud from "../../components/RtkSatelliteHud";

function BlueprintSkeleton() {
  return (
    <div className="w-full h-[450px] bg-[#050504] rounded-[2rem] border border-cyan-500/20 relative overflow-hidden p-6 flex flex-col justify-between select-none">
      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#091426_1px,transparent_1px),linear-gradient(to_bottom,#091426_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-45" />
      
      {/* Moving Laser Scanner */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(207,167,88,0.8)] z-10 pointer-events-none"
      />
      
      {/* Concentric blueprint lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-64 h-64 rounded-full border border-cyan-500/10 animate-pulse" />
        <div className="w-40 h-40 rounded-full border border-cyan-500/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="flex items-center justify-between z-10">
        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-black flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
          SYS // PARSING_BLUEPRINT
        </span>
        <span className="text-[10px] font-mono text-slate-500">EPSG:9377 COLOMBIA</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 z-10 text-center my-auto">
        <div className="text-xl font-mono tracking-[0.25em] text-cyan-400 font-bold uppercase animate-pulse">
          Cargando Catastro 3D...
        </div>
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider max-w-xs leading-normal">
          Ensamblando topología y descompilando capas de relieve vectorial
        </p>
      </div>

      <div className="border-t border-slate-900/60 pt-3 z-10 flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
        <span>SWARM CORE ACTIVE</span>
        <span>LATENCY: 0.12ms</span>
      </div>
    </div>
  );
}

const SpatialIntelligenceDashboard = dynamic(
  () => import("../../components/SpatialIntelligenceDashboard"),
  {
    ssr: false,
    loading: () => <BlueprintSkeleton />
  }
);

// Predefined mock municipal parcels
const INITIAL_PARCELS = [
  { id: "P-101", path: "M 20 20 L 120 20 L 120 120 L 20 120 Z", area: 1000, value: 85, status: "OK", baseClass: "LA_Predio" },
  // Overlapping parcel in TRASLAPES mode
  { id: "P-102", path: "M 110 30 L 220 30 L 220 130 L 110 130 Z", fixedPath: "M 120 30 L 220 30 L 220 130 L 120 130 Z", area: 1100, value: 95, status: "TRASLAPE", baseClass: "LA_Predio" },
  { id: "P-103", path: "M 20 130 L 120 130 L 120 230 L 20 230 Z", area: 1000, value: 78, status: "MEJORA_OCULTA", baseClass: "LA_Predio" },
  { id: "P-104", path: "M 130 140 L 240 140 L 240 240 L 130 240 Z", area: 1100, value: 110, status: "AMBIENTAL_INVASION", baseClass: "LA_RestriccionTerritorial" },
];

export default function DiagnosticPage() {
  // Page state
  const [activeTab, setActiveTab] = useState("sandbox"); // sandbox | roi | audit
  const [selectedPathology, setSelectedPathology] = useState(null); // null | TRASLAPES | MEJORAS | AMBIENTAL | REGISTRO
  const [engineExecuted, setEngineExecuted] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [viewAdvancedDashboard, setViewAdvancedDashboard] = useState(false);
  
  // Console logs
  const [consoleLogs, setConsoleLogs] = useState([
    "SYS // DevGiz Spatial Engine v2.1 initialized.",
    "SYS // Listo para escaneo catastral."
  ]);
  const consoleBottomRef = useRef(null);

  // Sliders for ROI
  const [numPredios, setNumPredios] = useState(45000);
  const [yearsOutdated, setYearsOutdated] = useState(7);
  const [avgTax, setAvgTax] = useState(650000); // Promedio COP

  // Lead Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cargo: "director_catastro",
    municipio: "",
    telefono: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [auditStep, setAuditStep] = useState(0); // 0: Form, 1: Scanning terminal, 2: Report
  const [auditTerminalLogs, setAuditTerminalLogs] = useState([]);
  
  // Scroll log console to bottom
  useEffect(() => {
    const container = consoleBottomRef.current?.closest(".overflow-y-auto");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [consoleLogs, auditTerminalLogs]);

  // Handle smart hash routing on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let targetTab = null;
      if (hash === "#validator") {
        targetTab = "sandbox";
      } else if (hash === "#remote") {
        targetTab = "audit";
      } else if (hash === "#rtk") {
        targetTab = "roi";
      }

      if (targetTab) {
        setActiveTab(targetTab);
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handle Pathology Click
  const selectPathology = (pathology) => {
    setSelectedPathology(pathology);
    setEngineExecuted(false);
    
    let newLogs = [];
    if (pathology === "TRASLAPES") {
      newLogs = [
        "ALERT // Error de topología detectado en frontera P-101 <-> P-102.",
        "ANALYSIS // Área de traslape geométrico: 120.45 m².",
        "ANALYSIS // Vulnerabilidad jurídica de los predios afectada.",
        "ADVICE // Ejecute el motor DevGiz para realizar el Snapping algorítmico."
      ];
    } else if (pathology === "MEJORAS") {
      newLogs = [
        "ALERT // Discrepancia detectada en predio P-103.",
        "ANALYSIS // Registro actual: Lote vacío (Avalúo catastral subestimado).",
        "ANALYSIS // Canal LiDAR detecta estructura residencial de 3 niveles.",
        "ANALYSIS // Fuga impositiva estimada: 64% del impuesto predial potencial."
      ];
    } else if (pathology === "AMBIENTAL") {
      newLogs = [
        "ALERT // Colisión de capa territorial detectada en P-104.",
        "ANALYSIS // Predio invade franja de conservación ambiental (Río Cauca).",
        "ANALYSIS // Inconsistencia legal grave con directrices de la CVC / CAR.",
        "ANALYSIS // Clasificación LADM-COL requerida: LA_RestriccionTerritorial."
      ];
    } else if (pathology === "REGISTRO") {
      newLogs = [
        "ALERT // Incoherencia registral en base de datos SNR vs Cartografía.",
        "ANALYSIS // Área en escritura (VUR): 850.00 m².",
        "ANALYSIS // Área medida geográficamente: 1,320.50 m² (Exceso del 55%).",
        "ADVICE // Conciliación de linderos mediante pipeline espacial recomendada."
      ];
    } else {
      newLogs = ["SYS // Listo para escaneo catastral."];
    }
    
    setConsoleLogs([
      "SYS // Inicializando diagnóstico de patología...",
      ...newLogs
    ]);
  };

  // Run DevGiz Engine Action
  const runDevGizEngine = () => {
    if (isScanning) return;
    setIsScanning(true);
    
    setConsoleLogs(prev => [
      ...prev,
      "SYS // Iniciando alineación espacial...",
      "ENGINE // Analizando nodos y tolerancias (Resolución 1040/2020)...",
      "ENGINE // Corriendo filtros de tolerancia topológica..."
    ]);

    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        "ENGINE // Ejecutando Snapping de vértices según Origen CTM12...",
        "ENGINE // Clasificando datos bajo estándar LADM-COL v3.0...",
        "ENGINE // Consolidando base de datos espacial..."
      ]);
    }, 1000);

    setTimeout(() => {
      setIsScanning(false);
      setEngineExecuted(true);
      
      let resolveLogs = [];
      if (selectedPathology === "TRASLAPES") {
        resolveLogs = [
          "RESOLVED // Traslape de polígonos corregido con éxito.",
          "RESOLVED // Área de traslape reducida a 0.00 m² (Precisión topológica < 2cm).",
          "RESOLVED // Límites de P-101 y P-102 conciliados bajo ISO 19152.",
          "STATUS // Topología limpia: 100% OK."
        ];
      } else if (selectedPathology === "MEJORAS") {
        resolveLogs = [
          "RESOLVED // Nueva construcción de 3 niveles modelada en base de datos.",
          "RESOLVED // Área física construida de 285 m² integrada a la ficha catastral.",
          "RESOLVED // Avalúo catastral actualizado: +210% de incremento proyectado.",
          "STATUS // Información predial sincronizada con éxito."
        ];
      } else if (selectedPathology === "AMBIENTAL") {
        resolveLogs = [
          "RESOLVED // Superposición ambiental delimitada.",
          "RESOLVED // Creada subzona LA_RestriccionTerritorial asociada al folio.",
          "RESOLVED // Alerta preventiva enviada automáticamente a planeación.",
          "STATUS // Conformidad ambiental validada."
        ];
      } else if (selectedPathology === "REGISTRO") {
        resolveLogs = [
          "RESOLVED // Diferencia SNR-Catastro conciliada automáticamente.",
          "RESOLVED // Generado archivo de intercambio XTF según Interlis.",
          "RESOLVED // Coordenadas y linderos visados digitalmente.",
          "STATUS // Consistencia jurídica alcanzada."
        ];
      }

      setConsoleLogs(prev => [
        ...prev,
        ...resolveLogs,
        "SYS // Proceso de auditoría de DevGiz finalizado con éxito."
      ]);
    }, 2200);
  };

  // ROI Calculator Calculations
  // Fuga estimada basada en predios, años de desactualización y tarifa predial promedio
  // Tasa de obsolescencia catastral promedio anual en Colombia oscila entre 15% y 30% del recaudo
  const annualTaxLeakage = Math.round(
    numPredios * avgTax * (0.022 * yearsOutdated)
  );

  const totalOutdatedLoss = annualTaxLeakage * Math.min(5, Math.ceil(yearsOutdated / 2));

  // Formatter for currency
  const formatCOP = (val) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(val);
  };

  // Submit express audit lead form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.municipio) return;

    setAuditStep(1); // Terminal step
    
    // Simulate complex audit process in terminal
    const terminalScripts = [
      `SYS // Inicializando Pre-Auditoría para el municipio de [${formData.municipio}]`,
      `SYS // Consultor solicitante: ${formData.name} (${formData.cargo})`,
      "VUR_API // Estableciendo túnel seguro con la Superintendencia de Notariado y Registro...",
      "VUR_API // Conexión exitosa. Extrayendo folios de matrícula inmobiliaria...",
      "IGAC_GEOPORTAL // Descargando cartografía histórica y modelo digital de terreno...",
      "AI_LIDAR // Procesando ortofotografía histórica mediante red convolucional espacial...",
      "AI_LIDAR // Detección de mejoras informales en curso. Procesando 1,400 hectáreas...",
      "TOPOLOGY_CHECK // Ejecutando validación de consistencia geométrica en CTM12...",
      "TOPOLOGY_CHECK // Detectadas 1,245 inconsistencias de linderos potenciales.",
      "FINANCIAL_ENGINE // Calculando vector de pérdida fiscal por desactualización catastral...",
      "LADM_XTF // Generando esquema de salida XTF LADM-COL v3.0...",
      "SYS // Informe compilado con éxito. Generando firma digital de auditoría...",
      "SYS // Reporte de Salud Territorial listo para descarga."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < terminalScripts.length) {
        setAuditTerminalLogs(prev => [...prev, terminalScripts[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setAuditStep(2); // Final custom report card
      }
    }, 600);
  };

  return (
    // La página está diseñada en oscuro: la superficie obsidiana le da el fondo
    // que le faltaba (antes el titular blanco quedaba sobre marfil).
    <div className="surface-obsidian w-full flex-grow">
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full relative z-10">
      
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,100%)] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header and Brand Presentation */}
      <div className="space-y-6 text-center max-w-4xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-cyan-500/50 shadow-[0_0_8px_#cfa758]"></span>
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-400 font-semibold">
            Interactive Diagnostics Portal
          </span>
          <span className="w-8 h-px bg-cyan-500/50 shadow-[0_0_8px_#cfa758]"></span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Centro de Diagnóstico <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-200 to-white italic font-light">
            Territorial e Inteligencia ROI
          </span>
        </h1>
        
        <p className="text-slate-400 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Descubra de forma didáctica los problemas invisibles en el catastro, simule la corrección automática bajo estándares <span className="text-cyan-400 font-mono text-xs border border-cyan-500/20 bg-cyan-500/5 px-2 py-0.5 rounded">LADM-COL v3.0</span> y estime el impacto financiero real en el recaudo predial de su municipio.
        </p>

        {/* Dynamic Navigation Tabs */}
        <div className="flex justify-center p-1 bg-slate-950/60 border border-slate-900 rounded-xl max-w-lg mx-auto backdrop-blur-md">
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-lg transition-all ${
              activeTab === "sandbox"
                ? "bg-slate-900 text-cyan-400 shadow-[0_0_15px_rgba(207,167,88,0.15)] border border-slate-800"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            1. Sandbox Catastral
          </button>
          <button
            onClick={() => setActiveTab("roi")}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-lg transition-all ${
              activeTab === "roi"
                ? "bg-slate-900 text-cyan-400 shadow-[0_0_15px_rgba(207,167,88,0.15)] border border-slate-800"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            2. Calculadora ROI
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-lg transition-all ${
              activeTab === "audit"
                ? "bg-slate-900 text-cyan-400 shadow-[0_0_15px_rgba(207,167,88,0.15)] border border-slate-800"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            3. Pre-Auditoría en Vivo
          </button>
        </div>
      </div>

      {/* Main Tab Render Grid */}
      <div className="relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: SANDBOX CATASTRAL */}
          {activeTab === "sandbox" && (
            <motion.div
              key="sandbox-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* Left Column: Interactive Map Canvas */}
              <div id="validator" className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 glass-card-premium rounded-[2rem] border-glow min-h-[500px] relative overflow-hidden bg-slate-950/40">
                <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
                      Interactive GIS Canvas
                    </span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">Visor de Patologías en Vivo</h3>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setViewAdvancedDashboard(!viewAdvancedDashboard);
                        if (window.dgzSynth) {
                          try { window.dgzSynth.playClick(); } catch (e) {}
                        }
                      }}
                      className="px-3 py-1 border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500 hover:text-black font-mono text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(207,167,88,0.1)]"
                    >
                      <Globe className="w-3 h-3 animate-pulse" />
                      {viewAdvancedDashboard ? "Consola Básica" : "Consola Avanzada 3D"}
                    </button>
                    <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] tracking-widest rounded-sm font-bold uppercase">
                      CTM12 Single Origin
                    </span>
                  </div>
                </div>

                {viewAdvancedDashboard ? (
                  <div className="flex-grow flex flex-col rounded-2xl overflow-hidden min-h-[400px] border border-slate-900/60 bg-[#050504]">
                    <SpatialIntelligenceDashboard forceSovereign={true} />
                  </div>
                ) : (
                  <>
                    {/* The SVG Sandbox Canvas */}
                    <div className="flex-grow flex items-center justify-center bg-slate-950/80 rounded-2xl border border-slate-900/60 relative overflow-hidden p-8 min-h-[280px]">
                      
                      {/* Grid Lines Overlay */}
                      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(221,190,122,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(221,190,122,0.2) 1px, transparent 1px)', backgroundSize: '25px 25px' }}></div>
                      </div>

                      {/* Laser Scan Beam */}
                      {isScanning && (
                        <motion.div
                          initial={{ y: "-100%" }}
                          animate={{ y: "100%" }}
                          transition={{ duration: 2.2, ease: "easeInOut", repeat: 0 }}
                          className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#cfa758] z-20 pointer-events-none"
                        />
                      )}

                      <svg viewBox="0 0 260 260" className="w-full max-w-[280px] h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
                        {/* Environmental River Protection Layer */}
                        <path
                          d="M -10 160 C 60 160, 110 200, 270 200 L 270 270 L -10 270 Z"
                          className={`transition-all duration-700 ${
                            selectedPathology === "AMBIENTAL" 
                              ? "fill-teal-500/10 stroke-teal-500/40 stroke-dasharray-[4_4] animate-pulse" 
                              : "fill-slate-800/10 stroke-slate-800/20"
                          }`}
                        />
                        
                        {/* Environmental Buffer limit label */}
                        {selectedPathology === "AMBIENTAL" && (
                          <text x="10" y="195" className="fill-teal-400 font-mono text-[10px] tracking-wider font-bold">
                            [LÍMITE DE CONSERVACIÓN CVC]
                          </text>
                        )}

                        {/* Parcel rendering */}
                        {INITIAL_PARCELS.map((parcel) => {
                          let fillClass = "fill-slate-900/60 stroke-slate-700/60 hover:fill-slate-800/80";
                          let strokeColor = "stroke-slate-700/60";
                          
                          // Highlight depending on active pathology
                          if (selectedPathology === "TRASLAPES" && parcel.id === "P-102") {
                            fillClass = engineExecuted 
                              ? "fill-cyan-950/40 stroke-cyan-500/80" 
                              : "fill-amber-950/40 stroke-amber-500/80 animate-pulse";
                          } else if (selectedPathology === "MEJORAS" && parcel.id === "P-103") {
                            fillClass = engineExecuted 
                              ? "fill-emerald-950/40 stroke-emerald-500/80" 
                              : "fill-slate-900/60 stroke-slate-700/60 border-dashed";
                          } else if (selectedPathology === "AMBIENTAL" && parcel.id === "P-104") {
                            fillClass = engineExecuted
                              ? "fill-teal-950/30 stroke-teal-500/80"
                              : "fill-rose-950/40 stroke-rose-500/80 animate-pulse";
                          } else if (selectedPathology === "REGISTRO" && parcel.id === "P-101") {
                            fillClass = engineExecuted
                              ? "fill-indigo-950/40 stroke-indigo-500/80"
                              : "fill-indigo-950/10 stroke-indigo-500/30";
                          }

                          // Snapping morph coordinates for TRASLAPES
                          const dPath = (selectedPathology === "TRASLAPES" && parcel.id === "P-102" && engineExecuted)
                            ? parcel.fixedPath 
                            : parcel.path;

                          return (
                            <g key={parcel.id} className="cursor-pointer transition-all duration-300">
                              <path
                                d={dPath}
                                className={`transition-all duration-700 stroke-2 ${fillClass}`}
                              />
                              
                              {/* Inner labels */}
                              <text 
                                x={parcel.id === "P-101" ? 50 : parcel.id === "P-102" ? 160 : parcel.id === "P-103" ? 50 : 170} 
                                y={parcel.id === "P-101" ? 70 : parcel.id === "P-102" ? 80 : parcel.id === "P-103" ? 180 : 190} 
                                className="fill-slate-400 font-mono text-[10px] tracking-widest font-black pointer-events-none select-none text-center"
                              >
                                {parcel.id}
                              </text>

                              {/* Overlap highlighted conflict area */}
                              {selectedPathology === "TRASLAPES" && parcel.id === "P-102" && !engineExecuted && (
                                <path
                                  d="M 110 30 L 120 30 L 120 120 L 110 120 Z"
                                  className="fill-rose-600/40 stroke-rose-600/80 stroke-1 stroke-dasharray-[2_2] animate-pulse"
                                />
                              )}

                              {/* LiDAR structure representation */}
                              {selectedPathology === "MEJORAS" && parcel.id === "P-103" && (
                                <g className="pointer-events-none">
                                  {/* 3D Structure shape overlays representing undetected building */}
                                  <rect
                                    x="40" y="150" width="40" height="40"
                                    className={`transition-all duration-700 stroke-1 ${
                                      engineExecuted 
                                        ? "fill-emerald-500/20 stroke-emerald-400/80" 
                                        : "fill-amber-500/10 stroke-amber-400/40 stroke-dasharray-[2_2] animate-pulse"
                                    }`}
                                  />
                                  <text x="43" y="162" className="fill-emerald-400 font-mono text-[10px] font-bold">
                                    {engineExecuted ? "LiDAR OK: +3 NIVELES" : "[LiDAR: EDIFICACIÓN]"}
                                  </text>
                                </g>
                              )}
                            </g>
                          );
                        })}
                      </svg>

                      {/* Absolute active alert labels overlay */}
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-1 rounded-sm uppercase tracking-widest">
                          Visualizador Dinámico
                        </span>
                      </div>

                      {selectedPathology && (
                        <div className="absolute bottom-4 right-4">
                          <span className={`text-[10px] font-mono px-2 py-1 rounded-sm font-bold uppercase tracking-wider shadow-md ${
                            engineExecuted 
                              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                              : "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                          }`}>
                            {engineExecuted ? "Estado: Topología Corregida" : "Estado: Conflicto Detectado"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Sub-terminal with active logs */}
                    <div className="mt-6 bg-[#030302] border border-slate-900 rounded-xl p-4 font-mono text-[10px] text-slate-400 space-y-1.5 relative overflow-hidden min-h-[110px] flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                        <span className="text-[10px] tracking-widest uppercase font-bold text-slate-500 flex items-center gap-1.5">
                          <Terminal className="w-3 h-3 text-cyan-400" />
                          Live Terminal // DevGiz Spatial Core
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                      
                      <div className="flex-grow space-y-1 max-h-[60px] overflow-y-auto pr-2 scrollbar-thin">
                        {consoleLogs.filter(Boolean).map((log, idx) => {
                          let color = "text-slate-400";
                          if (log.startsWith("ALERT")) color = "text-rose-400 font-bold";
                          if (log.startsWith("RESOLVED")) color = "text-emerald-400 font-bold font-black";
                          if (log.startsWith("SYS")) color = "text-cyan-400";
                          if (log.startsWith("ENGINE")) color = "text-slate-300";
                          return (
                            <p key={idx} className={color}>
                              &gt; {log}
                            </p>
                          );
                        })}
                        <div ref={consoleBottomRef} />
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Right Column: Pathologies & Actions */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                
                {/* Pathology selector glass card */}
                <div className="p-6 md:p-8 glass-card-premium rounded-[2rem] border-glow space-y-6 bg-slate-950/40 flex-grow">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Educational Sandbox</span>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Patologías Catastrales</h3>
                    <p className="text-xs text-slate-400 font-light">
                      Seleccione una patología común en catastros municipales desactualizados para conocer su impacto y ver el poder de resolución automatizada.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Path 1: Overlaps */}
                    <button
                      onClick={() => selectPathology("TRASLAPES")}
                      className={`w-full p-4 rounded-xl border transition-all text-left flex items-start gap-4 ${
                        selectedPathology === "TRASLAPES"
                          ? "bg-slate-900/80 border-cyan-500/50 shadow-[0_0_15px_rgba(207,167,88,0.08)]"
                          : "bg-slate-950/30 border-slate-900 hover:border-slate-800 hover:bg-slate-900/20"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${selectedPathology === "TRASLAPES" ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-900 text-slate-500"}`}>
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">1. Traslapes Geométricos</h4>
                          {!engineExecuted && selectedPathology === "TRASLAPES" && (
                            <span className="px-1.5 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] tracking-wider rounded font-bold uppercase">Litigio</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-light">
                          Polígonos superpuestos por mala digitalización histórica o diferentes orígenes de coordenadas. Afecta la certeza jurídica de linderos.
                        </p>
                      </div>
                    </button>

                    {/* Path 2: Undetected Buildings */}
                    <button
                      onClick={() => selectPathology("MEJORAS")}
                      className={`w-full p-4 rounded-xl border transition-all text-left flex items-start gap-4 ${
                        selectedPathology === "MEJORAS"
                          ? "bg-slate-900/80 border-cyan-500/50 shadow-[0_0_15px_rgba(207,167,88,0.08)]"
                          : "bg-slate-950/30 border-slate-900 hover:border-slate-800 hover:bg-slate-900/20"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${selectedPathology === "MEJORAS" ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-900 text-slate-500"}`}>
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">2. Omisión de Mejoras (LiDAR)</h4>
                          {!engineExecuted && selectedPathology === "MEJORAS" && (
                            <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] tracking-wider rounded font-bold uppercase">Fuga Recaudo</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-light">
                          Edificaciones levantadas físicamente que figuran como lotes vacíos en las escrituras, causando una enorme evasión del impuesto predial.
                        </p>
                      </div>
                    </button>

                    {/* Path 3: Environmental encroachment */}
                    <button
                      onClick={() => selectPathology("AMBIENTAL")}
                      className={`w-full p-4 rounded-xl border transition-all text-left flex items-start gap-4 ${
                        selectedPathology === "AMBIENTAL"
                          ? "bg-slate-900/80 border-cyan-500/50 shadow-[0_0_15px_rgba(207,167,88,0.08)]"
                          : "bg-slate-950/30 border-slate-900 hover:border-slate-800 hover:bg-slate-900/20"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${selectedPathology === "AMBIENTAL" ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-900 text-slate-500"}`}>
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">3. Invasión Ambiental</h4>
                          {!engineExecuted && selectedPathology === "AMBIENTAL" && (
                            <span className="px-1.5 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] tracking-wider rounded font-bold uppercase">Infracción</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-light">
                          Predios cuyos límites físicos invaden áreas forestales de protección de cuencas del río o páramos, violando ordenanzas municipales de la CAR.
                        </p>
                      </div>
                    </button>

                    {/* Path 4: Discrepancy */}
                    <button
                      onClick={() => selectPathology("REGISTRO")}
                      className={`w-full p-4 rounded-xl border transition-all text-left flex items-start gap-4 ${
                        selectedPathology === "REGISTRO"
                          ? "bg-slate-900/80 border-cyan-500/50 shadow-[0_0_15px_rgba(207,167,88,0.08)]"
                          : "bg-slate-950/30 border-slate-900 hover:border-slate-800 hover:bg-slate-900/20"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${selectedPathology === "REGISTRO" ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-900 text-slate-500"}`}>
                        <RefreshCw className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">4. Desfase SNR vs Catastro</h4>
                          {!engineExecuted && selectedPathology === "REGISTRO" && (
                            <span className="px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] tracking-wider rounded font-bold uppercase">Jurídico</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-light">
                          Diferencias entre el área reportada en los registros del VUR y la superficie geográfica real del predio, generando inconsistencias registrales.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Big interactive execution trigger card */}
                <div className="p-6 md:p-8 glass-card-premium rounded-[2rem] border-glow bg-slate-950/40 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Acción Tecnológica</h4>
                  
                  <button
                    onClick={runDevGizEngine}
                    disabled={!selectedPathology || isScanning}
                    className={`w-full py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 ${
                      !selectedPathology 
                        ? "bg-slate-900/20 border border-slate-900 text-slate-600 cursor-not-allowed"
                        : isScanning 
                        ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 cursor-wait animate-pulse"
                        : "bg-white text-black hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_25px_rgba(207,167,88,0.4)] shadow-[0_4px_20px_rgba(255,255,255,0.05)] cursor-pointer"
                    }`}
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Ejecutando Alineación...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Ejecutar DevGiz Engine</span>
                      </>
                    )}
                  </button>
                  
                  <div className="flex items-center gap-2 justify-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <Shield className="w-3 h-3 text-cyan-500/50" />
                    Auditoría Estricta LADM-COL v3.0 / ISO 19152
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 2: CALCULADORA FINANCIERA ROI */}
          {activeTab === "roi" && (
            <motion.div
              key="roi-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* Left Column: Config Sliders */}
              <div id="rtk" className="lg:col-span-6 p-6 md:p-8 glass-card-premium rounded-[2rem] border-glow bg-slate-950/40 space-y-8 flex flex-col justify-between">
                
                <div className="space-y-2 border-b border-slate-900 pb-4">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    Territorial Finance Simulator
                  </span>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">Simulador de Recaudo Municipal</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    Ajuste las características de su municipio para proyectar el impacto financiero de las mejoras ocultas y la desactualización catastral en la hacienda pública.
                  </p>
                </div>

                <div className="space-y-8 flex-grow py-4">
                  
                  {/* Slider 1: Predios */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold">
                      <span className="text-slate-300">Número de Predios del Municipio</span>
                      <span className="text-cyan-400 text-sm font-black">{numPredios.toLocaleString("es-CO")}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="150000"
                      step="5000"
                      value={numPredios}
                      onChange={(e) => setNumPredios(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>5.000 Predios</span>
                      <span>75.000 Predios (Medio)</span>
                      <span>150.000+ Predios</span>
                    </div>
                  </div>

                  {/* Slider 2: Años de Desactualización */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold">
                      <span className="text-slate-300">Años de Desactualización Catastral</span>
                      <span className="text-cyan-400 text-sm font-black">{yearsOutdated} Años</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={yearsOutdated}
                      onChange={(e) => setYearsOutdated(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>1 Año</span>
                      <span>5 Años (Límite Ley)</span>
                      <span>15 Años (Crítico)</span>
                    </div>
                  </div>

                  {/* Slider 3: Tarifa Promedio */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold">
                      <span className="text-slate-300">Impuesto Predial Promedio Anual</span>
                      <span className="text-cyan-400 text-sm font-black">{formatCOP(avgTax)} COP</span>
                    </div>
                    <input
                      type="range"
                      min="200000"
                      max="2000000"
                      step="50000"
                      value={avgTax}
                      onChange={(e) => setAvgTax(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>$200.000 COP</span>
                      <span>$1.100.000 COP</span>
                      <span>$2.000.000 COP</span>
                    </div>
                  </div>

                </div>

                <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-start gap-4">
                  <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-400 leading-normal font-light">
                    <strong>Normativa IGAC:</strong> La Ley colombiana estipula que los catastros deben actualizarse cada 5 años. Un retraso mayor desencadena una fuga fiscal severa por la desactualización del avalúo frente al valor comercial y las mejoras físicas.
                  </p>
                </div>

              </div>

              {/* Right Column: Calculations & Graphs */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                
                {/* Result Card: annual lost */}
                <div className="p-8 glass-card-premium rounded-[2rem] border-glow bg-slate-950/40 relative overflow-hidden flex flex-col justify-between flex-grow">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">
                      Impacto Fiscal Estimado (Pérdida)
                    </span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">Fuga de Recaudo Predial</h3>
                  </div>

                  <div className="my-8 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Fuga Tributaria Anual Estimada</span>
                      <div className="text-4xl md:text-5xl font-black text-rose-500 tracking-tight drop-shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        {formatCOP(annualTaxLeakage)}
                      </div>
                    </div>

                    <div className="space-y-1 pt-4 border-t border-slate-900">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Pérdida Acumulada Proyectada (Últimos Años)</span>
                      <div className="text-2xl md:text-3xl font-black text-amber-500 tracking-tight">
                        {formatCOP(totalOutdatedLoss)}
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 leading-normal font-light">
                    Esta fuga es causada por edificaciones no declaradas (mejoras informales), englobes desactualizados, subdivisiones fantasmas y avalúos desfasados con la dinámica del mercado territorial real.
                  </div>
                </div>

                {/* RTK GNSS Active Constellation HUD & Action */}
                <div className="space-y-6">
                  <RtkSatelliteHud />
                  
                  <button
                    onClick={() => {
                      setActiveTab("audit");
                      if (window.dgzSynth) {
                        try { window.dgzSynth.playClick(); } catch (e) {}
                      }
                    }}
                    className="w-full py-5 bg-white text-black hover:bg-cyan-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(207,167,88,0.3)] cursor-pointer"
                  >
                    <span>Solicitar Auditoría de Municipio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 3: PRE-AUDITORÍA EXPRESS LEAD GEN */}
          {activeTab === "audit" && (
            <motion.div
              key="audit-tab"
              id="remote"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <AnimatePresence mode="wait">
                
                {/* STEP 0: Lead Form */}
                {auditStep === 0 && (
                  <motion.div
                    key="step-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="p-8 md:p-12 glass-card-premium rounded-[2.5rem] border-glow bg-slate-950/40 space-y-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="space-y-2 border-b border-slate-900 pb-6 text-center md:text-left">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-bold block">
                        Elite Cadastral Diagnostics
                      </span>
                      <h3 className="text-2xl font-black text-white uppercase tracking-wider">Solicitar Pre-Auditoría Territorial</h3>
                      <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xl">
                        Ingrese los datos básicos de su municipio u organización. Nuestro motor de IA espacial realizará un cruce preliminar en línea simulando base de datos catastrales e inconsistencias de linderos.
                      </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Name input */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                            Nombre del Solicitante *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Ing. Carlos Restrepo"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-5 py-4 bg-slate-950/80 border border-slate-900 focus:border-cyan-500/60 rounded-xl text-slate-200 text-sm focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Email input */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                            Correo Electrónico *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="Ej. carlos.restrepo@valle.gov.co"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-5 py-4 bg-slate-950/80 border border-slate-900 focus:border-cyan-500/60 rounded-xl text-slate-200 text-sm focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Cargo Selector */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                            Cargo / Rol Administrativo
                          </label>
                          <select
                            value={formData.cargo}
                            onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                            className="w-full px-5 py-4 bg-slate-950/80 border border-slate-900 focus:border-cyan-500/60 rounded-xl text-slate-300 text-sm focus:outline-none transition-colors"
                          >
                            <option value="director_catastro">Director de Catastro / Planeación</option>
                            <option value="secretario_hacienda">Secretario de Hacienda Municipal</option>
                            <option value="operador_catastral">Operador Catastral Privado</option>
                            <option value="alcalde">Alcalde / Funcionario Público</option>
                            <option value="desarrollador_privado">Desarrollador Inmobiliario / Privado</option>
                            <option value="consultor">Consultor Territorial Externo</option>
                          </select>
                        </div>

                        {/* Municipio */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                            Municipio / Organización *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Cartago (Valle del Cauca)"
                            value={formData.municipio}
                            onChange={(e) => setFormData({...formData, municipio: e.target.value})}
                            className="w-full px-5 py-4 bg-slate-950/80 border border-slate-900 focus:border-cyan-500/60 rounded-xl text-slate-200 text-sm focus:outline-none transition-colors"
                          />
                        </div>

                      </div>

                      <div className="p-4 bg-slate-950/80 border border-slate-900 rounded-2xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Lock className="w-4 h-4 text-cyan-500" />
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                            Protección de datos conforme ley Habeas Data 1581
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-500 bg-cyan-500/5 px-2 py-0.5 border border-cyan-500/10 rounded uppercase">
                          Cifrado AES-256
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-5 bg-white text-black hover:bg-cyan-500 hover:text-black transition-all duration-300 text-[10px] font-black uppercase tracking-[0.25em] rounded-xl flex items-center justify-center gap-3 cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(207,167,88,0.3)]"
                      >
                        <span>Generar Pre-Auditoría Territorial en Vivo</span>
                        <Zap className="w-4 h-4" />
                      </button>

                    </form>
                  </motion.div>
                )}

                {/* STEP 1: Terminal simulation */}
                {auditStep === 1 && (
                  <motion.div
                    key="step-scanning"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="p-8 md:p-12 glass-card-premium rounded-[2.5rem] border-glow bg-[#060605] min-h-[420px] flex flex-col justify-between"
                  >
                    <div className="space-y-4 border-b border-slate-900 pb-6 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-bold block animate-pulse">
                          PROCESSING DATA MATRIX...
                        </span>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                          Ejecutando Pipeline de Diagnóstico Geográfico
                        </h3>
                      </div>
                      
                      <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                    </div>

                    <div className="bg-black/90 rounded-2xl border border-slate-900 p-6 flex-grow my-6 font-mono text-[10px] text-slate-300 space-y-1.5 overflow-y-auto max-h-[220px] scrollbar-thin">
                      {auditTerminalLogs.filter(Boolean).map((log, index) => {
                        let color = "text-slate-400";
                        if (log.includes("API") || log.includes("VUR")) color = "text-amber-400";
                        if (log.includes("AI") || log.includes("LiDAR")) color = "text-emerald-400 font-semibold";
                        if (log.includes("INCONSISTENCIAS")) color = "text-rose-400 font-bold";
                        if (log.startsWith("SYS")) color = "text-cyan-400";
                        return (
                          <p key={index} className={`${color} leading-relaxed`}>
                            &gt; {log}
                          </p>
                        );
                      })}
                      <div ref={consoleBottomRef} />
                    </div>

                    <div className="text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      DevGiz AI Espacial Engine // Orquestación en tiempo real (Polars & DuckDB)
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Custom Report Card */}
                {auditStep === 2 && (
                  <motion.div
                    key="step-report"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 md:p-12 glass-card-premium rounded-[2.5rem] border-glow bg-slate-950/40 space-y-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="flex flex-col items-center text-center space-y-4 border-b border-slate-900 pb-8">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] mb-2">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.3em] font-bold">
                          PRE-DIAGNÓSTICO CONSOLIDADO
                        </span>
                        <h3 className="text-3xl font-black text-white uppercase tracking-wider">
                          Informe de Salud Territorial
                        </h3>
                        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                          Municipio: {formData.municipio} // Consultor: {formData.name}
                        </p>
                      </div>
                    </div>

                    {/* Dashboard Metrics grid inside report */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                      
                      <div className="p-5 bg-slate-950/80 border border-slate-900 rounded-2xl space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Índice de Salud Catastral</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-rose-500">62 / 100</span>
                          <span className="text-[10px] font-mono text-rose-400 bg-rose-500/5 px-2 py-0.5 border border-rose-500/10 rounded uppercase font-bold">
                            Crítico
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-light">
                          Alta probabilidad de traslapes y aproximadamente un 18% de mejoras físicas sin incorporar en las bases tributarias.
                        </p>
                      </div>

                      <div className="p-5 bg-slate-950/80 border border-slate-900 rounded-2xl space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Fuga de Recaudo Estimada</span>
                        <div className="text-2xl font-black text-amber-500">
                          {formatCOP(numPredios * avgTax * 0.15)}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                          Anual (Proyección Mínima de Subvaluación)
                        </span>
                        <p className="text-[10px] text-slate-400 leading-normal font-light">
                          Ingresos evadidos por desactualización catastral que podrían recuperarse en el primer año.
                        </p>
                      </div>

                    </div>

                    {/* Standard details and certification */}
                    <div className="p-5 bg-cyan-950/10 border border-cyan-500/20 rounded-2xl space-y-3">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        Detalles de Normatividad del Informe
                      </div>
                      
                      <ul className="space-y-2 text-[10px] text-slate-300 font-light">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Estructurado bajo metadatos **LADM-COL v3.0** (ISO 19152).</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Comprobación conforme directrices de precisión **IGAC Resolución 1040/2020**.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Viabilidad de conservación dinámica conforme **Resolución 1149/2021**.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Conversion Call to Action */}
                    <div className="space-y-4 pt-4 border-t border-slate-900">
                      <div className="text-center text-xs text-slate-400 font-light">
                        ¿Desea validar estos resultados y estructurar un plan de contingencia territorial soberano para su municipio?
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <Link
                          href="/#contact"
                          className="w-full sm:flex-1 py-5 bg-white text-black hover:bg-cyan-500 hover:text-black text-center text-[10px] font-black uppercase tracking-[0.25em] rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-md cursor-pointer"
                        >
                          <Zap className="w-4 h-4" />
                          <span>Agendar Diagnóstico Técnico</span>
                        </Link>
                        
                        <button
                          onClick={() => setAuditStep(0)}
                          className="w-full sm:w-auto px-6 py-5 border border-slate-800 text-slate-400 hover:text-white text-center text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all"
                        >
                          Reiniciar Simulador
                        </button>
                      </div>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
    </div>
  );
}
