"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  ArrowLeft,
  Check,
  CheckCircle2,
  Cpu,
  Layers,
  FileText,
  AlertTriangle,
  BadgeAlert,
  ArrowRight,
  TrendingUp,
  Workflow,
  Sparkles,
  HelpCircle,
  Mail,
  Send,
  Terminal,
  Activity,
  Award,
  ChevronRight,
  ExternalLink,
  DollarSign,
  Calendar,
  Lock,
  Boxes,
  Database,
  Search,
  CheckCircle,
  Info,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck
} from "lucide-react";
import { SERVICES_DATA } from "../../../data/servicesData";
import GlobalPartners from "../../../components/GlobalPartners";

const ICON_MAP = {
  Globe,
  BarChart3,
  Brain,
  Building,
  Route,
  Sprout,
  Wind,
  Cloud,
  Plane,
  Code
};

const COLOR_THEMES = {
  cyan: {
    text: "text-cyan-600",
    bg: "bg-cyan-50/70",
    border: "border-slate-200 hover:border-cyan-400/40",
    glow: "bg-cyan-500/5 group-hover:bg-cyan-500/10",
    badge: "text-cyan-600 bg-cyan-50 border-cyan-200",
    dot: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]",
    accentBg: "from-cyan-500/10 to-transparent",
    borderGlow: "group-hover:border-cyan-500/30",
    glowingText: "text-slate-900",
    primaryButton: "bg-cyan-600 text-white hover:bg-cyan-500 shadow-[0_4px_20px_rgba(6,182,212,0.2)]",
    textMuted: "text-slate-500",
    scrollbar: "scrollbar-thumb-cyan-500/20",
    shimmer: "from-cyan-500/5 via-cyan-500/10 to-cyan-500/5"
  },
  indigo: {
    text: "text-indigo-600",
    bg: "bg-indigo-50/70",
    border: "border-slate-200 hover:border-indigo-400/40",
    glow: "bg-indigo-500/5 group-hover:bg-indigo-500/10",
    badge: "text-indigo-600 bg-indigo-50 border-indigo-200",
    dot: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]",
    accentBg: "from-indigo-500/10 to-transparent",
    borderGlow: "group-hover:border-indigo-500/30",
    glowingText: "text-slate-900",
    primaryButton: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_4px_20px_rgba(99,102,241,0.2)]",
    textMuted: "text-slate-500",
    scrollbar: "scrollbar-thumb-indigo-500/20",
    shimmer: "from-indigo-500/5 via-indigo-500/10 to-indigo-500/5"
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-50/70",
    border: "border-slate-200 hover:border-purple-400/40",
    glow: "bg-purple-500/5 group-hover:bg-purple-500/10",
    badge: "text-purple-600 bg-purple-50 border-purple-200",
    dot: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.3)]",
    accentBg: "from-purple-500/10 to-transparent",
    borderGlow: "group-hover:border-purple-500/30",
    glowingText: "text-slate-900",
    primaryButton: "bg-purple-600 text-white hover:bg-purple-500 shadow-[0_4px_20px_rgba(168,85,247,0.2)]",
    textMuted: "text-slate-500",
    scrollbar: "scrollbar-thumb-purple-500/20",
    shimmer: "from-purple-500/5 via-purple-500/10 to-purple-500/5"
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-50/70",
    border: "border-slate-200 hover:border-blue-400/40",
    glow: "bg-blue-500/5 group-hover:bg-blue-500/10",
    badge: "text-blue-600 bg-blue-50 border-blue-200",
    dot: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]",
    accentBg: "from-blue-500/10 to-transparent",
    borderGlow: "group-hover:border-blue-500/30",
    glowingText: "text-slate-900",
    primaryButton: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_20px_rgba(59,130,246,0.2)]",
    textMuted: "text-slate-500",
    scrollbar: "scrollbar-thumb-blue-500/20",
    shimmer: "from-blue-500/5 via-blue-500/10 to-blue-500/5"
  },
  emerald: {
    text: "text-emerald-600",
    bg: "bg-emerald-50/70",
    border: "border-slate-200 hover:border-emerald-400/40",
    glow: "bg-emerald-500/5 group-hover:bg-emerald-500/10",
    badge: "text-emerald-600 bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
    accentBg: "from-emerald-500/10 to-transparent",
    borderGlow: "group-hover:border-emerald-500/30",
    glowingText: "text-slate-900",
    primaryButton: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.2)]",
    textMuted: "text-slate-500",
    scrollbar: "scrollbar-thumb-emerald-500/20",
    shimmer: "from-emerald-500/5 via-emerald-500/10 to-emerald-500/5"
  },
  teal: {
    text: "text-teal-600",
    bg: "bg-teal-50/70",
    border: "border-slate-200 hover:border-teal-400/40",
    glow: "bg-teal-500/5 group-hover:bg-teal-500/10",
    badge: "text-teal-600 bg-teal-50 border-teal-200",
    dot: "bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.3)]",
    accentBg: "from-teal-500/10 to-transparent",
    borderGlow: "group-hover:border-teal-500/30",
    glowingText: "text-slate-900",
    primaryButton: "bg-teal-600 text-white hover:bg-teal-500 shadow-[0_4px_20px_rgba(20,184,166,0.2)]",
    textMuted: "text-slate-500",
    scrollbar: "scrollbar-thumb-teal-500/20",
    shimmer: "from-teal-500/5 via-teal-500/10 to-teal-500/5"
  },
  orange: {
    text: "text-orange-600",
    bg: "bg-orange-50/70",
    border: "border-slate-200 hover:border-orange-400/40",
    glow: "bg-orange-500/5 group-hover:bg-orange-500/10",
    badge: "text-orange-600 bg-orange-50 border-orange-200",
    dot: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.3)]",
    accentBg: "from-orange-500/10 to-transparent",
    borderGlow: "group-hover:border-orange-500/30",
    glowingText: "text-slate-900",
    primaryButton: "bg-orange-600 text-white hover:bg-orange-500 shadow-[0_4px_20px_rgba(249,115,22,0.2)]",
    textMuted: "text-slate-500",
    scrollbar: "scrollbar-thumb-orange-500/20",
    shimmer: "from-orange-500/5 via-orange-500/10 to-orange-500/5"
  },
  red: {
    text: "text-rose-600",
    bg: "bg-rose-50/70",
    border: "border-slate-200 hover:border-rose-400/40",
    glow: "bg-rose-500/5 group-hover:bg-rose-500/10",
    badge: "text-rose-600 bg-rose-50 border-rose-200",
    dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]",
    accentBg: "from-rose-500/10 to-transparent",
    borderGlow: "group-hover:border-rose-500/30",
    glowingText: "text-slate-900",
    primaryButton: "bg-rose-600 text-white hover:bg-rose-500 shadow-[0_4px_20px_rgba(244,63,94,0.2)]",
    textMuted: "text-slate-500",
    scrollbar: "scrollbar-thumb-rose-500/20",
    shimmer: "from-rose-500/5 via-rose-500/10 to-rose-500/5"
  },
  pink: {
    text: "text-pink-600",
    bg: "bg-pink-50/70",
    border: "border-slate-200 hover:border-pink-400/40",
    glow: "bg-pink-500/5 group-hover:bg-pink-500/10",
    badge: "text-pink-600 bg-pink-50 border-pink-200",
    dot: "bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.3)]",
    accentBg: "from-pink-500/10 to-transparent",
    borderGlow: "group-hover:border-pink-500/30",
    glowingText: "text-slate-900",
    primaryButton: "bg-pink-600 text-white hover:bg-pink-500 shadow-[0_4px_20px_rgba(236,72,153,0.2)]",
    textMuted: "text-slate-500",
    scrollbar: "scrollbar-thumb-pink-500/20",
    shimmer: "from-pink-500/5 via-pink-500/10 to-pink-500/5"
  }
};

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [activeTab, setActiveTab] = useState("strategy"); // "strategy" | "technical"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    phone: "",
    scope: "Pilot",
    msg: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Terminal simple properties
  const [terminalLog, setTerminalLog] = useState([]);
  const [terminalTyping, setTerminalTyping] = useState(false);

  // SIMULADOR AVANZADO GEOESPACIAL PROPERTIES
  const [simStatus, setSimStatus] = useState("inactive"); // "inactive" | "running" | "paused" | "completed"
  const [simProgress, setSimProgress] = useState(0);
  const [simSpeed, setSimSpeed] = useState(1); // multiplicador de velocidad
  const [simLogs, setSimLogs] = useState([]);
  const [simMetrics, setSimMetrics] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null); // Para interactivos de mapa/grid
  const simInterval = useRef(null);

  const service = SERVICES_DATA[slug];

  // Configuración de formulario prellenado basado en el servicio
  useEffect(() => {
    if (service) {
      setFormData(prev => ({
        ...prev,
        msg: `Hola equipo de DevGiz. Estoy sumamente interesado en su servicio de "${service.title}" para nuestra organización. Nos gustaría explorar una propuesta/piloto enfocada en ${service.useCases[0]?.title || "optimización técnica"}. Quedo atento a su contacto.`
      }));

      // Iniciar log de terminal interactivo técnico
      setTerminalLog([
        `INITIALIZING DGZ TELEMETRY SYSTEM [SVC-ID: ${service.id}]`,
        `CONNECTING TO HOST dgz-engineering.local...`,
        `STATUS: CONNECTED // ACCESSIBILITY COMPLIANT`,
        `SECURE ENVELOPE: ACTIVE (ZERO-TRUST)`,
        `READY FOR SPECIFICATION SHUTTLE`
      ]);

      // Inicializar métricas del simulador
      if (service.simulation) {
        setSimMetrics(
          service.simulation.metrics.map(m => ({
            ...m,
            current: m.start
          }))
        );
        setSimLogs([`[INFO] Laboratorio de Simulación iniciado para: ${service.title}`, `[INFO] Estado: LISTO. Haz clic en 'INICIAR SIMULACIÓN' para arrancar.`]);
      }
    }
  }, [service]);

  // Loop del Simulador
  useEffect(() => {
    if (simStatus === "running") {
      const logsToFeed = service.simulation?.logs || [];
      const tickRate = 800 / simSpeed;

      simInterval.current = setInterval(() => {
        setSimProgress(prev => {
          const next = prev + 4;
          if (next >= 100) {
            setSimStatus("completed");
            clearInterval(simInterval.current);
            setSimLogs(prevLogs => [
              ...prevLogs,
              `[SUCCESS] Simulación completada con éxito. Todos los datos geoespaciales han sido verificados.`,
              `[SUCCESS] ARCHIVO DE SALIDA PUBLICADO: ${service.specs.outputs[0] || "GeoData.geojson"}`
            ]);
            return 100;
          }

          // Inyectar logs a intervalos basados en el progreso
          const logIdx = Math.floor((next / 100) * logsToFeed.length);
          if (logIdx < logsToFeed.length && logsToFeed[logIdx]) {
            setSimLogs(prevLogs => {
              const fullMsg = `[RUNNING] ${logsToFeed[logIdx]}`;
              if (!prevLogs.includes(fullMsg)) {
                return [...prevLogs, fullMsg];
              }
              return prevLogs;
            });
          }

          // Variar métricas live
          setSimMetrics(prevMetrics => 
            prevMetrics.map(m => {
              const range = m.end - m.start;
              const currentDelta = range * (next / 100);
              let value = m.start + currentDelta;
              
              // Agregar micro-fluctuación de ruido
              if (next < 100) {
                const noise = (Math.random() - 0.5) * (range * 0.05);
                value += noise;
              } else {
                value = m.end;
              }

              // Mantener float o int
              const parsedValue = typeof m.start === "number" && m.start % 1 !== 0 
                ? parseFloat(value.toFixed(2)) 
                : Math.round(value);

              return { ...m, current: parsedValue };
            })
          );

          return next;
        });
      }, tickRate);
    } else {
      clearInterval(simInterval.current);
    }

    return () => clearInterval(simInterval.current);
  }, [simStatus, simSpeed, service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-32 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="text-center max-w-xl relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-5 rounded-2xl bg-red-50 text-rose-600 border border-red-200 mb-8"
          >
            <AlertTriangle className="w-12 h-12" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight mb-4 uppercase">
            Servicio No Identificado
          </h1>
          <p className="text-slate-600 text-sm font-light leading-relaxed mb-8">
            Lo sentimos, el servicio comercial o técnico que estás intentando consultar no existe en nuestra arquitectura actual. Por favor verifica el identificador o navega entre nuestras soluciones disponibles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-white uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Home</span>
            </Link>
            <Link
              href="/#services"
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 rounded-xl text-xs font-mono text-white uppercase tracking-widest font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
            >
              <span>Explorar Servicios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const theme = COLOR_THEMES[service.theme] || COLOR_THEMES.cyan;
  const IconComponent = ICON_MAP[service.iconName] || Globe;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de leads premium con micro-animación de carga
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1800);
  };

  const runTerminalCommand = (cmd) => {
    if (terminalTyping) return;
    setTerminalTyping(true);
    
    const newLogs = [...terminalLog, `dgz-user@terminal:~$ ${cmd}`];
    setTerminalLog(newLogs);

    let response = "";
    if (cmd === "help") {
      response = "Available queries: `specs`, `compliance`, `system`, `clear`, `telemetry`";
    } else if (cmd === "specs") {
      response = `INPUTS: ${service.specs.inputs.join(", ")}\nOUTPUTS: ${service.specs.outputs.join(", ")}`;
    } else if (cmd === "compliance") {
      response = `NORMATIVAS REGULADAS:\n${service.specs.compliance.map(c => ` - ${c}`).join("\n")}`;
    } else if (cmd === "system") {
      response = `SISTEMA DE ARQUITECTURA:\n${service.specs.architecture}`;
    } else if (cmd === "telemetry") {
      response = `TELEMETRY OK [LATENCY: 12ms] [DATA_LOSS: 0.00%] [UPTIME: 99.998%]\nNODE: ${service.id}\nSTATUS: OPERATIONAL`;
    } else if (cmd === "clear") {
      setTerminalLog([]);
      setTerminalTyping(false);
      return;
    } else {
      response = `dgztsh: command not found: '${cmd}'. Type 'help' for support.`;
    }

    setTimeout(() => {
      setTerminalLog(prev => [...prev, response]);
      setTerminalTyping(false);
    }, 600);
  };

  const startSimulation = () => {
    setSimStatus("running");
    if (simProgress >= 100) {
      setSimProgress(0);
      setSimLogs([`[INFO] Reiniciando simulación...`, `[INFO] Conectando flujos de datos reales...`]);
    } else {
      setSimLogs(prev => [...prev, `[INFO] Reanudando simulación de servicio...`]);
    }
  };

  const pauseSimulation = () => {
    setSimStatus("paused");
    setSimLogs(prev => [...prev, `[WARNING] Simulación PAUSADA por el operador.`]);
  };

  const resetSimulation = () => {
    setSimStatus("inactive");
    setSimProgress(0);
    setSelectedCell(null);
    setSimMetrics(
      service.simulation.metrics.map(m => ({
        ...m,
        current: m.start
      }))
    );
    setSimLogs([
      `[INFO] Simulación REINICIADA al estado inicial.`,
      `[INFO] Todos los buffers y cachés han sido vaciados.`
    ]);
  };

  // RENDERIZADOR DE GRAFICOS SVG INTERACTIVOS PARA EL SIMULADOR
  const renderSimGraphic = () => {
    const isAct = simStatus === "running";
    
    switch (service.simulation?.type) {
      case "map": // GIS MAP PARCELS
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Grid de fondo */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,23,42,0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Parcelas vectoriales catastrales */}
            <g className="transition-all duration-700">
              {[
                { id: 1, d: "M 40 40 L 150 50 L 120 160 L 50 140 Z", label: "Predio A (Rural)", val: "05001002" },
                { id: 2, d: "M 150 50 L 280 40 L 250 150 L 120 160 Z", label: "Predio B (Urbano)", val: "05001003" },
                { id: 3, d: "M 50 140 L 120 160 L 90 260 L 30 220 Z", label: "Predio C (Rural)", val: "05001004" },
                { id: 4, d: "M 120 160 L 250 150 L 230 270 L 90 260 Z", label: "Predio D (Residencial)", val: "05001005" },
                { id: 5, d: "M 280 40 L 360 60 L 330 200 L 250 150 Z", label: "Predio E (Comercial)", val: "05001006" }
              ].map((p) => {
                const isSelected = selectedCell?.id === p.id;
                return (
                  <path
                    key={p.id}
                    d={p.d}
                    fill={isSelected ? "rgba(6,182,212,0.15)" : isAct && p.id === Math.floor(simProgress / 20) + 1 ? "rgba(6,182,212,0.08)" : "rgba(255,255,255,0.7)"}
                    stroke={isSelected ? "#0891b2" : isAct && p.id === Math.floor(simProgress / 20) + 1 ? "#06b6d4" : "#cbd5e1"}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    className="cursor-pointer transition-all duration-300 hover:fill-cyan-50/50"
                    onClick={() => setSelectedCell(p)}
                  />
                );
              })}
            </g>

            {/* Marcadores de vértices georreferenciados */}
            {isAct && (
              <g>
                <circle cx="120" cy="160" r="4" fill="#0891b2" className="animate-ping" />
                <circle cx="120" cy="160" r="2.5" fill="#0891b2" />
                <circle cx="250" cy="150" r="2.5" fill="#0891b2" />
                <circle cx="150" cy="50" r="2.5" fill="#0891b2" />
              </g>
            )}

            {/* Escáner de barrido */}
            {isAct && (
              <line 
                x1="0" 
                y1={(simProgress / 100) * 300} 
                x2="400" 
                y2={(simProgress / 100) * 300} 
                stroke="rgba(8,145,178,0.3)" 
                strokeWidth="2" 
                strokeDasharray="4,4"
              />
            )}

            {/* HUD de información en el gráfico */}
            {selectedCell && (
              <g className="translate-y-[210] translate-x-4">
                <rect width="220" height="75" rx="8" fill="rgba(15,23,42,0.95)" />
                <text x="12" y="24" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">LADM-COL REGISTRY</text>
                <text x="12" y="42" fill="white" fontSize="11" fontFamily="sans-serif">{selectedCell.label}</text>
                <text x="12" y="58" fill="#94a3b8" fontSize="9" fontFamily="monospace">Código: {selectedCell.val}</text>
              </g>
            )}
          </svg>
        );

      case "charts": // BUSINESS INTELLIGENCE CHARTS
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="100%" height="100%" fill="rgba(248,250,252,0.5)" />
            
            {/* Ejes */}
            <line x1="50" y1="250" x2="350" y2="250" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="50" y1="50" x2="50" y2="250" stroke="#cbd5e1" strokeWidth="2" />

            {/* Barras animadas */}
            {[140, 190, 80, 220, 160, 200].map((h, i) => {
              const currentH = isAct ? h * (simProgress / 100) : h * 0.3;
              return (
                <rect
                  key={i}
                  x={75 + i * 45}
                  y={250 - currentH}
                  width="25"
                  height={currentH}
                  rx="4"
                  fill="url(#barGradient)"
                  className="transition-all duration-300"
                />
              );
            })}
            
            {/* Gradiente para las barras */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>

            {/* Línea de tendencia */}
            {isAct && (
              <path
                d={`M 75 180 Q 140 ${180 - simProgress * 0.8} 210 ${200 - simProgress * 0.4} T 325 ${250 - simProgress * 1.5}`}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-pulse"
              />
            )}
          </svg>
        );

      case "network": // DEEP LEARNING NEURAL NETWORK
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
            <rect width="100%" height="100%" fill="rgba(248,250,252,0.5)" />
            {/* Conexiones */}
            <g stroke="rgba(139,92,246,0.15)" strokeWidth="1.5">
              {/* Capa 1 a Capa 2 */}
              {[60, 140, 220].map((y1) => 
                [50, 110, 170, 230].map((y2) => (
                  <line key={`c-${y1}-${y2}`} x1="80" y1={y1} x2="200" y2={y2} />
                ))
              )}
              {/* Capa 2 a Capa 3 */}
              {[50, 110, 170, 230].map((y1) => 
                [100, 180].map((y2) => (
                  <line key={`c2-${y1}-${y2}`} x1="200" y1={y1} x2="320" y2={y2} />
                ))
              )}
            </g>

            {/* Señales eléctricas fluyendo */}
            {isAct && (
              <g>
                <circle r="4" fill="#a855f7" className="transition-all duration-1000">
                  <animateMotion 
                    path="M 80 140 L 200 110 L 320 180" 
                    dur="1.5s" 
                    repeatCount="indefinite" 
                  />
                </circle>
                <circle r="4" fill="#a855f7">
                  <animateMotion 
                    path="M 80 60 L 200 170 L 320 100" 
                    dur="1.2s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </g>
            )}

            {/* Nodos de neuronas */}
            {/* Capa de entrada */}
            {[60, 140, 220].map((y, idx) => (
              <circle key={`n1-${idx}`} cx="80" cy={y} r="10" fill="#e9d5ff" stroke="#a855f7" strokeWidth="2" className={isAct ? "animate-pulse" : ""} />
            ))}
            {/* Capa oculta */}
            {[50, 110, 170, 230].map((y, idx) => (
              <circle key={`n2-${idx}`} cx="200" cy={y} r="10" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="2" />
            ))}
            {/* Capa de salida */}
            {[100, 180].map((y, idx) => (
              <circle key={`n3-${idx}`} cx="320" cy={y} r="10" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" className={isAct ? "animate-pulse" : ""} />
            ))}
          </svg>
        );

      case "wireframe": // BIM ISOMETRIC WIREFRAME
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" stroke="#2563eb" fill="none">
            <rect width="100%" height="100%" fill="rgba(248,250,252,0.5)" />
            {/* Rejilla estructural */}
            <g stroke="rgba(37,99,235,0.06)" strokeWidth="1">
              <path d="M 50 150 L 200 70 L 350 150 L 200 230 Z" />
              <path d="M 50 200 L 200 120 L 350 200 L 200 280 Z" />
            </g>
            
            {/* Estructura 3D del Edificio */}
            <g strokeWidth={isAct ? "2" : "1.5"} className="transition-all">
              {/* Columnas base */}
              <line x1="120" y1="210" x2="120" y2="90" stroke={isAct ? "#2563eb" : "#93c5fd"} />
              <line x1="200" y1="250" x2="200" y2="130" stroke={isAct ? "#1d4ed8" : "#60a5fa"} />
              <line x1="280" y1="210" x2="280" y2="90" stroke={isAct ? "#2563eb" : "#93c5fd"} />
              <line x1="200" y1="170" x2="200" y2="50" stroke="rgba(37,99,235,0.4)" strokeDasharray="3,3" />

              {/* Anillos de vigas horizontales */}
              {/* Nivel inferior */}
              <path d="M 120 210 L 200 250 L 280 210 L 200 170 Z" stroke="#3b82f6" />
              
              {/* Nivel medio */}
              <path d="M 120 150 L 200 190 L 280 150 L 200 110 Z" stroke="#2563eb" className={isAct ? "animate-pulse" : ""} />

              {/* Nivel superior */}
              <path d="M 120 90 L 200 130 L 280 90 L 200 50 Z" stroke="#1d4ed8" />
            </g>

            {/* Puntos de cargas estructurales */}
            {isAct && (
              <g fill="#ef4444">
                <circle cx="200" cy="130" r="4" />
                <circle cx="120" cy="150" r="4" />
                <circle cx="280" cy="150" r="4" />
              </g>
            )}
          </svg>
        );

      case "road": // ROAD GEOMETRIC CROSS-SECTION
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="100%" height="100%" fill="rgba(248,250,252,0.5)" />
            {/* Terreno natural original */}
            <path d="M 20 240 Q 120 200 200 180 T 380 90" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />

            {/* Rasante / Vía implantada */}
            <g className="transition-all duration-500">
              {/* Capas asfálticas */}
              <polygon points="120,160 280,160 270,175 130,175" fill="#475569" stroke="#334155" strokeWidth="1.5" />
              {/* Capa de subbase */}
              <polygon points="130,175 270,175 260,190 140,190" fill="#94a3b8" />
              
              {/* Taludes de corte y terraplén */}
              <line x1="120" y1="160" x2="60" y2="230" stroke="#10b981" strokeWidth="2.5" />
              <line x1="280" y1="160" x2="340" y2="105" stroke="#10b981" strokeWidth="2.5" />
            </g>

            {/* Drenajes longitudinales (Cunetas) */}
            <path d="M 60 230 L 45 235 L 30 220" fill="none" stroke="#2563eb" strokeWidth="2" />

            {/* Mira láser de precisión */}
            {isAct && (
              <g stroke="#ef4444" strokeWidth="1">
                <line x1="200" y1="0" x2="200" y2="300" strokeDasharray="3,3" />
                <circle cx="200" cy="160" r="6" fill="none" strokeWidth="1.5" className="animate-ping" />
                <circle cx="200" cy="160" r="2" fill="#ef4444" />
                <text x="210" y="155" fill="#ef4444" fontSize="9" fontFamily="monospace">RTK GNSS: OK</text>
              </g>
            )}
          </svg>
        );

      case "grid": // MULTI-SPECTRAL NDVI GRID
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="100%" height="100%" fill="rgba(248,250,252,0.5)" />
            {/* Grid 8x6 */}
            <g>
              {Array.from({ length: 6 }).map((_, r) => 
                Array.from({ length: 8 }).map((_, c) => {
                  const id = r * 8 + c;
                  const isScanned = simProgress > (id / 48) * 100;
                  
                  // Generar colores espectrales: saludables (verdes), estresados (amarillos/rojos)
                  let color = "#e2e8f0"; // Inactivo
                  if (isScanned) {
                    if (id === 12 || id === 13 || id === 20 || id === 21) {
                      color = "#fca5a5"; // Estrés hídrico (rojo suave)
                    } else if (id === 18 || id === 34 || id === 35) {
                      color = "#fef08a"; // Clorosis media (amarillo)
                    } else {
                      color = "#86efac"; // Altamente saludable (verde)
                    }
                  }

                  const isSelected = selectedCell === id;

                  return (
                    <rect
                      key={id}
                      x={30 + c * 42}
                      y={30 + r * 38}
                      width="38"
                      height="34"
                      rx="3"
                      fill={color}
                      stroke={isSelected ? "#0d9488" : "#ffffff"}
                      strokeWidth={isSelected ? "2" : "1"}
                      className="cursor-pointer transition-all duration-300 hover:opacity-85"
                      onClick={() => setSelectedCell(isSelected ? null : id)}
                    />
                  );
                })
              )}
            </g>

            {/* Escáner de dron multiespectral */}
            {isAct && (
              <rect
                x="25"
                y="20"
                width="350"
                height="10"
                fill="rgba(20,184,166,0.1)"
                stroke="#14b8a6"
                strokeWidth="1"
                style={{
                  transform: `translateY(${(simProgress / 100) * 230}px)`,
                  transition: "transform 0.1s linear"
                }}
              />
            )}
            
            {/* Ventana flotante de celda NDVI */}
            {selectedCell !== null && (
              <g className="translate-y-[220] translate-x-24">
                <rect width="180" height="60" rx="8" fill="rgba(13,148,136,0.95)" />
                <text x="12" y="20" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">SATELLITE TELEMETRY</text>
                <text x="12" y="36" fill="#ccfbf1" fontSize="10" fontFamily="sans-serif">NDVI Index: {selectedCell === 12 || selectedCell === 13 || selectedCell === 20 || selectedCell === 21 ? "0.24 (Crítico)" : selectedCell === 18 || selectedCell === 34 || selectedCell === 35 ? "0.48 (Estrés)" : "0.82 (Óptimo)"}</text>
                <text x="12" y="48" fill="#99f6e4" fontSize="8" fontFamily="monospace">Lote: {Math.floor(selectedCell / 8) + 1} - Surco: {(selectedCell % 8) + 1}</text>
              </g>
            )}
          </svg>
        );

      case "basin": // BASIN WATER RUNOFF
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
            <rect width="100%" height="100%" fill="rgba(248,250,252,0.5)" />
            {/* Contornos del relieve */}
            <path d="M 50 80 Q 200 40 350 80 M 50 150 Q 200 110 350 150 M 50 220 Q 200 180 350 220" stroke="#cbd5e1" strokeWidth="1" />

            {/* Red Hídrica (Ríos vectoriales) */}
            <g stroke="#3b82f6" strokeLinecap="round">
              <path d="M 80 70 Q 150 120 200 150" strokeWidth="1.5" />
              <path d="M 320 60 Q 250 110 200 150" strokeWidth="1.5" />
              <path d="M 200 150 Q 210 210 200 280" strokeWidth="3" />
            </g>

            {/* Partículas de lluvia simuladas descendiendo */}
            {isAct && (
              <g fill="#2563eb">
                <circle cx="100" cy="80" r="2.5"><animate attributeName="cy" values="80;110" dur="1s" repeatCount="indefinite" /></circle>
                <circle cx="130" cy="90" r="2"><animate attributeName="cy" values="90;125" dur="1.4s" repeatCount="indefinite" /></circle>
                <circle cx="280" cy="70" r="2.5"><animate attributeName="cy" values="70;115" dur="0.9s" repeatCount="indefinite" /></circle>
                
                {/* Flujo en el cauce principal */}
                <circle r="3.5" fill="#3b82f6">
                  <animateMotion path="M 200 150 Q 210 210 200 280" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            )}

            {/* Zona de Inundación de Alerta */}
            {isAct && simProgress > 50 && (
              <path d="M 180 200 Q 210 210 230 200 T 210 260 Z" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
            )}
          </svg>
        );

      case "pods": // KUBERNETES DEVOPS PODS
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="100%" height="100%" fill="rgba(248,250,252,0.5)" />
            {/* Clúster Virtual Box */}
            <rect x="30" y="30" width="340" height="240" rx="16" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
            <text x="45" y="52" fill="#64748b" fontSize="9" fontFamily="monospace" fontWeight="bold">K8S CLUSTER: EKS-GEO-PROD</text>

            {/* Pods que escalan dinámicamente con el progreso */}
            <g>
              {[
                { cx: 80, cy: 110, id: 1 },
                { cx: 160, cy: 110, id: 2 },
                { cx: 240, cy: 110, id: 3 },
                { cx: 320, cy: 110, id: 4 },
                { cx: 80, cy: 200, id: 5 },
                { cx: 160, cy: 200, id: 6 },
                { cx: 240, cy: 200, id: 7 },
                { cx: 320, cy: 200, id: 8 }
              ].map((pod) => {
                // Escalar pods basados en el progreso de simulación
                const isActivated = isAct ? simProgress > (pod.id / 8) * 100 : pod.id <= 3;
                return (
                  <g key={pod.id} className="transition-all duration-500">
                    <rect
                      x={pod.cx - 24}
                      y={pod.cy - 24}
                      width="48"
                      height="48"
                      rx="10"
                      fill={isActivated ? "#ffedd5" : "#f1f5f9"}
                      stroke={isActivated ? "#f97316" : "#cbd5e1"}
                      strokeWidth="2"
                    />
                    <circle cx={pod.cx} cy={pod.cy - 6} r="5" fill={isActivated ? "#10b981" : "#94a3b8"} className={isActivated ? "animate-pulse" : ""} />
                    <text x={pod.cx} y={pod.cy + 12} textAnchor="middle" fill="#475569" fontSize="7" fontFamily="monospace">pod-0{pod.id}</text>
                  </g>
                );
              })}
            </g>
          </svg>
        );

      case "cloud": // DRONE LIDAR POINT CLOUD
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="100%" height="100%" fill="rgba(248,250,252,0.5)" />
            {/* Nube de puntos simulada con pequeños círculos */}
            <g fill="#f43f5e" opacity="0.6">
              {Array.from({ length: 15 }).map((_, r) => 
                Array.from({ length: 20 }).map((_, c) => {
                  const id = r * 20 + c;
                  const isLit = isAct && Math.abs((simProgress / 100) * 400 - (c * 20)) < 40;
                  
                  // Ola senoidal para dar sensación 3D del relieve
                  const yOffset = Math.sin(c * 0.4) * 20 + Math.cos(r * 0.5) * 10;

                  return (
                    <circle
                      key={id}
                      cx={20 + c * 18}
                      cy={150 + r * 6 + yOffset}
                      r={isLit ? "2.5" : "1.2"}
                      fill={isLit ? "#e11d48" : "#fda4af"}
                      className="transition-all duration-300"
                    />
                  );
                })
              )}
            </g>

            {/* Dron volando horizontalmente */}
            {isAct && (
              <g 
                style={{
                  transform: `translateX(${(simProgress / 100) * 360}px)`,
                  transition: "transform 0.1s linear"
                }}
              >
                {/* Cono láser del sensor LiDAR */}
                <polygon points="20,50 60,50 10,130 70,130" fill="rgba(225,29,72,0.06)" />
                {/* Cuerpo del Dron */}
                <rect x="25" y="38" width="30" height="12" rx="4" fill="#1e293b" />
                <line x1="15" y1="44" x2="65" y2="44" stroke="#475569" strokeWidth="2.5" />
                <circle cx="15" cy="44" r="3" fill="#e11d48" />
                <circle cx="65" cy="44" r="3" fill="#e11d48" />
              </g>
            )}
          </svg>
        );

      case "api": // API GATEWAY REQUEST PIPELINE
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
            <rect width="100%" height="100%" fill="rgba(248,250,252,0.5)" />
            {/* Nodos de arquitectura */}
            <g stroke="#cbd5e1" strokeWidth="2">
              {/* Cliente */}
              <rect x="40" y="110" width="60" height="80" rx="8" fill="white" stroke="#db2777" />
              <text x="70" y="155" textAnchor="middle" fill="#db2777" fontSize="9" fontFamily="monospace" fontWeight="bold">CLIENT</text>
              
              {/* API Gateway */}
              <rect x="170" y="110" width="60" height="80" rx="8" fill="white" stroke="#2563eb" />
              <text x="200" y="155" textAnchor="middle" fill="#2563eb" fontSize="9" fontFamily="monospace" fontWeight="bold">API GW</text>

              {/* Database Relacional */}
              <rect x="300" y="110" width="60" height="80" rx="8" fill="white" stroke="#16a34a" />
              <text x="330" y="155" textAnchor="middle" fill="#16a34a" fontSize="9" fontFamily="monospace" fontWeight="bold">POSTGIS</text>
            </g>

            {/* Vectores de conexión */}
            <g stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
              <path d="M 100 150 L 170 150" />
              <path d="M 230 150 L 300 150" />
            </g>

            {/* Paquetes de datos flotantes */}
            {isAct && (
              <g>
                <circle r="4.5" fill="#f472b6">
                  <animateMotion path="M 100 150 L 170 150" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle r="4.5" fill="#4ade80">
                  <animateMotion path="M 230 150 L 300 150" dur="0.8s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-slate-400 font-mono text-xs">
            Sin gráfico de simulación.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen text-slate-900 selection:bg-cyan-500/20 overflow-x-hidden relative bg-transparent">
      
      {/* Background Decorativo Superior */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-transparent pointer-events-none z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.accentBg} opacity-20 rounded-full blur-[140px]`}></div>
      </div>
      <div className="absolute top-[30%] left-0 w-[500px] h-[500px] bg-transparent pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent opacity-10 rounded-full blur-[130px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Botón Volver & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16 border-b border-slate-200/60 pb-6">
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-950 uppercase tracking-widest transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-600 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a Soluciones</span>
          </Link>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span>DEVGIZ</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="uppercase text-slate-500">{service.capaLabel}</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className={`uppercase font-bold ${theme.text}`}>{service.title}</span>
          </div>
        </div>

        {/* HERO SECTION DE PRODUCTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
          
          <div className="lg:col-span-8 space-y-8">
            {/* Capa Estratégica Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex"
            >
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black tracking-widest uppercase ${theme.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
                {service.capaLabel} // {service.id}
              </div>
            </motion.div>

            {/* Title & Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.05] ${theme.glowingText}`}
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-3xl"
            >
              {service.tagline}
            </motion.p>

            {/* Breve Concepto Destacado */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 bg-white border border-slate-200/80 rounded-3xl relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
              <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
                {service.concept}
              </p>
            </motion.div>
          </div>

          {/* Columna Derecha: Telemetría / Métricas Destacadas */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Core Metrics // SLAs</span>
            
            <div className="grid grid-cols-1 gap-4">
              {service.metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 relative group overflow-hidden shadow-sm"
                >
                  {/* Hover background slide */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${theme.accentBg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${theme.accentBg} w-0 group-hover:w-full transition-all duration-500`}></div>

                  <span className="text-[10px] text-slate-400 block mb-2 font-mono uppercase font-bold">{metric.label}</span>
                  <div className={`text-3xl font-black tracking-tight text-slate-800 group-hover:${theme.text} transition-colors`}>
                    {metric.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* GRAND INTERACTIVE SPATIAL SANDBOX SIMULATOR SECTION */}
        {/* ---------------------------------------------------- */}
        {service.simulation && (
          <section className="mb-24 relative">
            <div className="text-left mb-8">
              <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.3em] font-black block mb-3">Spatial Sandbox // Demostración Técnica</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <Activity className="w-6 h-6 text-cyan-600" />
                Laboratorio de Simulación Geoespacial
              </h2>
              <p className="text-slate-500 text-xs font-light mt-1 max-w-3xl">
                Prueba en tiempo real una simulación funcional cargando conjuntos de datos de campo y validando topologías con estándares oficiales.
              </p>
            </div>

            {/* Contenedor Principal del Simulador */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-[2.5rem] p-6 lg:p-8 shadow-xl relative overflow-hidden">
              
              {/* Columna de Controles y Métricas (HUD) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                
                {/* Control Deck */}
                <div className="space-y-4">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold block">Operator Control Deck</span>
                  
                  <div className="flex flex-wrap gap-3">
                    {simStatus !== "running" ? (
                      <button
                        onClick={startSimulation}
                        className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[10px] font-black uppercase tracking-wider transition-all shadow-md hover:shadow-cyan-500/20 flex items-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{simStatus === "paused" ? "Reanudar" : "Iniciar Simulación"}</span>
                      </button>
                    ) : (
                      <button
                        onClick={pauseSimulation}
                        className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-mono text-[10px] font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pausar</span>
                      </button>
                    )}

                    <button
                      onClick={resetSimulation}
                      className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reiniciar</span>
                    </button>
                  </div>

                  {/* Regulador de Frecuencia/Velocidad */}
                  <div className="pt-2">
                    <label htmlFor="sim-speed" className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">
                      Frecuencia de Muestreo / Velocidad: {simSpeed}x
                    </label>
                    <input id="sim-speed" aria-valuetext={`${simSpeed}x`}
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.5"
                      value={simSpeed}
                      onChange={(e) => setSimSpeed(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                    />
                  </div>
                </div>

                {/* Barra de Progreso */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400 uppercase">
                    <span>Avance de Simulación</span>
                    <span className="text-cyan-600">{simProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 border border-slate-200/50 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyan-600 rounded-full"
                      animate={{ width: `${simProgress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* HUD Live Metrics */}
                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold block">Live Telemetry Metrics</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                    {simMetrics.map((met, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col justify-between">
                        <span className="text-[8px] font-mono text-slate-400 uppercase font-bold">{met.label}</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-xl font-black text-slate-800 font-mono">
                            {met.current.toLocaleString()}
                          </span>
                          {met.suffix && (
                            <span className="text-[10px] font-bold text-slate-400 font-mono">{met.suffix}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estado del Sistema */}
                <div className="p-4 rounded-2xl border flex items-center justify-between text-xs font-mono font-bold shadow-sm bg-slate-50 border-slate-200">
                  <span className="text-slate-500 uppercase text-[9px]">Simulator Engine Status:</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] ${
                    simStatus === "running" ? "bg-emerald-50 text-emerald-600 border border-emerald-200 animate-pulse" :
                    simStatus === "paused" ? "bg-amber-50 text-amber-600 border border-amber-200" :
                    simStatus === "completed" ? "bg-cyan-50 text-cyan-600 border border-cyan-200" :
                    "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}>
                    {simStatus === "running" ? "EJECUTANDO" :
                     simStatus === "paused" ? "PAUSADO" :
                     simStatus === "completed" ? "VERIFICADO" :
                     "LISTO / INACTIVO"}
                  </span>
                </div>

              </div>

              {/* Columna de Pantalla Gráfica & Consola */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                
                {/* Pantalla Gráfica (Viewport) */}
                <div className="h-[280px] bg-slate-50/70 border border-slate-200 rounded-[1.8rem] overflow-hidden relative shadow-inner flex items-center justify-center">
                  <div className="absolute top-4 left-4 p-2 bg-white/90 border border-slate-200/80 rounded-lg text-[8px] font-mono text-slate-500 font-bold z-10 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${simStatus === "running" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}></span>
                    Viewport: {service.simulation.type.toUpperCase()}_STAGE
                  </div>
                  
                  {renderSimGraphic()}
                </div>

                {/* Terminal Stream (Consola de Ingesta) */}
                <div className="bg-slate-950 border border-slate-900 rounded-[1.8rem] p-5 font-mono text-[10px] text-slate-300 relative shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                      Live Data Logger Stream
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-950 text-left">
                    {simLogs.map((log, idx) => {
                      const isErr = log.includes("[WARNING]") || log.includes("Error");
                      const isSucc = log.includes("[SUCCESS]");
                      const isRun = log.includes("[RUNNING]");
                      let colorClass = "text-slate-400";
                      if (isErr) colorClass = "text-amber-400";
                      if (isSucc) colorClass = "text-emerald-400 font-bold";
                      if (isRun) colorClass = "text-cyan-400";

                      return (
                        <div key={idx} className={`${colorClass} leading-relaxed whitespace-pre-wrap`}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* ---------------------------------------------------- */}
        {/* ENGINEERED SOFTWARE STACK CAROUSEL SECTION */}
        {/* ---------------------------------------------------- */}
        {service.software && (
          <section className="mb-24 relative overflow-hidden">
            <div className="text-left mb-8">
              <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.3em] font-black block mb-3">Software Stack // Tecnologías Utilizadas</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <Boxes className="w-6 h-6 text-cyan-600" />
                Tecnologías e Ingeniería de Precisión
              </h2>
              <p className="text-slate-500 text-xs font-light mt-1 max-w-3xl">
                Utilizamos el stack líder de la industria y motores abiertos soberanos para garantizar compatibilidad jurídica, velocidad y escalabilidad.
              </p>
            </div>

            {/* Software Carousel container */}
            <div className="relative w-full py-6 border-y border-slate-100 bg-white/50 backdrop-blur-md overflow-hidden">
              <motion.div
                className="flex gap-6 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                style={{ width: "fit-content" }}
              >
                {[...service.software, ...service.software, ...service.software].map((soft, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col justify-between p-5 w-[250px] bg-white border border-slate-200/80 rounded-2xl shadow-sm inline-flex shrink-0 select-none hover:border-cyan-500/20 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-600"></div>
                        <span className="text-xs font-black font-mono text-slate-800 tracking-tight">{soft.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-light whitespace-normal text-left">
                        {soft.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* TAB INTERACTIVA: VALOR ESTRATÉGICO VS ESPECIFICACIONES DE INGENIERÍA */}
        <div className="mb-24">
          
          {/* Cabezote de Control de Pestañas */}
          <div className="flex border-b border-slate-200 mb-12 relative z-10">
            <button
              onClick={() => setActiveTab("strategy")}
              className={`flex-1 sm:flex-initial px-8 py-5 text-sm font-mono uppercase tracking-widest font-black transition-all duration-300 border-b-2 flex items-center justify-center gap-2 ${
                activeTab === "strategy"
                  ? `${theme.text} border-cyan-500 bg-cyan-50/40`
                  : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Commercial Blueprint</span>
            </button>
            <button
              onClick={() => setActiveTab("technical")}
              className={`flex-1 sm:flex-initial px-8 py-5 text-sm font-mono uppercase tracking-widest font-black transition-all duration-300 border-b-2 flex items-center justify-center gap-2 ${
                activeTab === "technical"
                  ? `${theme.text} border-cyan-500 bg-cyan-50/40`
                  : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Technical Blueprint</span>
            </button>
          </div>

          {/* Contenedor de Contenidos Anidados */}
          <AnimatePresence mode="wait">
            {activeTab === "strategy" ? (
              <motion.div
                key="strategy-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Matriz Problema vs Solución */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Problema */}
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full group-hover:bg-rose-500/10 transition-colors"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-red-50 border border-red-200 text-rose-600 rounded-xl">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider">El Problema de Negocio</h3>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed text-left">
                      {service.problemSolved}
                    </p>
                  </div>

                  {/* Solución */}
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full group-hover:bg-emerald-500/10 transition-colors"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider">La Solución DevGiz</h3>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed text-left">
                      {service.solution}
                    </p>
                  </div>
                </div>

                {/* Casos de Uso del Servicio */}
                <div className="space-y-6">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold text-left">Casos de Uso e Implantación</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {service.useCases.map((uc, ucIdx) => (
                      <div
                        key={ucIdx}
                        className="bg-white border border-slate-200 hover:border-slate-350 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm"
                      >
                        <div className="text-left">
                          <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center font-mono text-xs font-bold mb-6">
                            0{ucIdx + 1}
                          </div>
                          <h4 className="text-base font-bold text-slate-800 mb-3 tracking-tight group-hover:text-cyan-600">
                            {uc.title}
                          </h4>
                          <p className="text-slate-500 text-xs font-light leading-relaxed">
                            {uc.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="technical-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Formatos de Entrada y Salida (Pipelines) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Inputs */}
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4 justify-start">
                      <Database className="w-5 h-5 text-cyan-650" />
                      <h3 className="text-sm font-mono font-black text-slate-800 uppercase tracking-wider">Formatos de Entrada Compatibles</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5 justify-start">
                      {service.specs.inputs.map((inp, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-650 text-xs font-mono rounded-lg transition-colors cursor-default"
                        >
                          {inp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4 justify-start">
                      <ExternalLink className="w-5 h-5 text-cyan-650" />
                      <h3 className="text-sm font-mono font-black text-slate-800 uppercase tracking-wider">Productos / Salidas Estándar</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5 justify-start">
                      {service.specs.outputs.map((out, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-650 text-xs font-mono rounded-lg transition-colors cursor-default"
                        >
                          {out}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Normativas & Estándares */}
                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 relative overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4 justify-start">
                    <Award className="w-5 h-5 text-cyan-600" />
                    <h3 className="text-sm font-mono font-black text-slate-800 uppercase tracking-wider">Cumplimiento Legal, Estándares & Certificaciones</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.specs.compliance.map((comp, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors justify-start">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-cyan-600 flex-shrink-0" />
                        <span className="text-xs text-slate-600 leading-snug text-left">{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consola Interactiva de Arquitectura Técnica */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Interactive Architecture Terminal</span>
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      SYSTEM OK
                    </span>
                  </div>

                  <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 font-mono text-xs overflow-hidden shadow-2xl relative">
                    {/* Botones de ventana */}
                    <div className="flex gap-1.5 mb-6 border-b border-slate-900 pb-4">
                      <span className="w-3 h-3 rounded-full bg-rose-500/60 block"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500/60 block"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500/60 block"></span>
                    </div>

                    <div className="space-y-2 text-slate-400 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-950 text-left">
                      {terminalLog.map((log, idx) => (
                        <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                          {log}
                        </div>
                      ))}
                      {terminalTyping && (
                        <div role="status" className="text-cyan-400 animate-pulse">Running query...</div>
                      )}
                    </div>

                    {/* Línea de entrada interactiva */}
                    <div className="mt-8 border-t border-slate-900 pt-4 flex flex-wrap gap-2 items-center text-slate-500 text-left">
                      <span className="text-slate-400 text-xs">Queries disponibles:</span>
                      {["specs", "compliance", "system", "telemetry", "clear"].map((cmd) => (
                        <button
                          key={cmd}
                          onClick={() => runTerminalCommand(cmd)}
                          className="px-2 py-1 bg-[#060a13] hover:bg-[#0c1224] hover:text-white border border-slate-850 rounded text-[10px] font-mono text-cyan-400 transition-colors cursor-pointer"
                        >
                          {cmd}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* MARKETPLACE & INTEGRATION TIERS */}
        <div className="mb-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.3em] font-black block mb-4">Marketplace // Integration Plans</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Modelos de Despliegue e Integración</h2>
            <p className="text-slate-500 text-sm font-light mt-4 leading-relaxed">
              Selecciona el alcance tecnológico óptimo para tu organización. Todos nuestros planes integran automatización soberana y soporte prioritario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.marketplace?.map((tier, idx) => {
              const isPopular = idx === 1; // Hacer el del medio más premium
              
              return (
                <div
                  key={idx}
                  className={`bg-white border rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-lg ${
                    isPopular 
                      ? "border-cyan-500/40 ring-1 ring-cyan-500/20 bg-white" 
                      : "border-slate-200"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-cyan-50 border-b border-l border-cyan-200 rounded-bl-xl text-[9px] font-mono text-cyan-600 uppercase tracking-widest font-black">
                      Recomendado
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px] uppercase tracking-wider mb-6 justify-start">
                      {idx === 0 ? <Calendar className="w-3.5 h-3.5 text-cyan-600" /> : idx === 1 ? <Boxes className="w-3.5 h-3.5 text-cyan-600" /> : <Lock className="w-3.5 h-3.5 text-cyan-600" />}
                      <span>Fase // {tier.duration}</span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 tracking-tight mb-3 text-left">{tier.name}</h3>
                    
                    <div className="flex items-baseline gap-1.5 mb-8 border-b border-slate-100 pb-6 justify-start">
                      <span className="text-xs text-slate-400 font-light font-mono">Inversión:</span>
                      <span className={`text-2xl font-black ${isPopular ? "text-cyan-600" : "text-slate-800"}`}>{tier.price}</span>
                    </div>

                    <div className="space-y-3.5 mb-10">
                      <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-4 font-bold text-left">Entregables y Garantías</span>
                      {tier.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex gap-2.5 items-start text-[11px] text-slate-600 font-light leading-snug text-left">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-cyan-600 flex-shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#contact-form"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData(prev => ({
                        ...prev,
                        scope: tier.name,
                        msg: `Hola equipo de DevGiz. Nos gustaría formalizar una solicitud de cotización/estudio para el plan "${tier.name}" del servicio "${service.title}". Agradecemos coordinar una llamada técnica preliminar.`
                      }));
                      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full py-4 rounded-xl text-[9px] font-mono uppercase tracking-[0.2em] font-black transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md ${
                      isPopular
                        ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_4px_20px_rgba(6,182,212,0.15)]"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    <span>Adquirir Plan</span>
                    <ArrowRight className={`w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform ${isPopular ? "text-white" : "text-cyan-400"}`} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* FORMULARIO DE CONTACTO CONTEXTUAL */}
        <div id="contact-form" className="relative">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-xl">
            {/* Luces decorativas */}
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-b ${theme.accentBg} opacity-5 rounded-full blur-[100px] pointer-events-none`}></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
              
              <div className="lg:col-span-5 space-y-6 text-left">
                <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest block font-bold">Cotización Exclusiva</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Iniciemos tu Proyecto Territorial</h2>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  Completa este formulario exclusivo de solicitud técnica. Nuestro equipo de ingenieros estructurará una propuesta formal y agenda técnica en menos de 24 horas.
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex gap-3 items-center text-xs text-slate-500 font-mono">
                    <Mail className="w-4 h-4 text-cyan-600" />
                    <span>contacto@devgiz.com</span>
                  </div>
                  <div className="flex gap-3 items-center text-xs text-slate-500 font-mono">
                    <Activity className="w-4 h-4 text-cyan-600" />
                    <span>Operaciones Globales: Colombia</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  {submitSuccess ? (
                    <motion.div
                      key="success-form"
                      role="status"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-slate-50 border border-cyan-500/20 p-8 rounded-3xl text-center space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center mx-auto shadow-sm">
                        <Check className="w-8 h-8" />
                      </div>
                      
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">¡Solicitud Registrada Exitosamente!</h3>
                      <p className="text-slate-500 text-xs font-light leading-relaxed max-w-md mx-auto">
                        Hemos catalogado tu ticket en el nodo de soporte para "{service.title}". Un ingeniero de soluciones se pondrá en contacto contigo para verificar viabilidad y requerimientos técnicos en las próximas horas.
                      </p>
                      
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl text-[10px] font-mono text-white uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Enviar otra solicitud
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="active-form"
                      onSubmit={handleFormSubmit}
                      className="space-y-6 text-left"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="quote-name" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Tu Nombre *</label>
                          <input id="quote-name" autoComplete="name"
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ej. Ing. Carlos Mendoza"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500/40 hover:border-slate-300 rounded-xl px-4 py-3.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="quote-email" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Email Institucional *</label>
                          <input id="quote-email" autoComplete="email"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="carlos.mendoza@organizacion.com"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500/40 hover:border-slate-300 rounded-xl px-4 py-3.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="quote-org" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Organización / Alcaldía *</label>
                          <input id="quote-org" autoComplete="organization"
                            type="text"
                            name="org"
                            required
                            value={formData.org}
                            onChange={handleInputChange}
                            placeholder="Ej. Alcaldía de Envigado"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500/40 hover:border-slate-300 rounded-xl px-4 py-3.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="quote-phone" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Teléfono de Contacto</label>
                          <input id="quote-phone" autoComplete="tel"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+57 300 000 0000"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500/40 hover:border-slate-300 rounded-xl px-4 py-3.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="quote-scope" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Plan / Alcance Seleccionado</label>
                        <div className="relative">
                          <select id="quote-scope"
                            name="scope"
                            value={formData.scope}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500/40 hover:border-slate-300 rounded-xl px-4 py-3.5 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 cursor-pointer appearance-none"
                          >
                            {service.marketplace?.map((tier) => (
                              <option key={tier.name} value={tier.name} className="bg-white">
                                {tier.name} ({tier.duration})
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                            <ChevronRight className="w-4 h-4 transform rotate-90" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="quote-msg" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Especificaciones del Requerimiento *</label>
                        <textarea id="quote-msg"
                          name="msg"
                          rows={4}
                          required
                          value={formData.msg}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500/40 hover:border-slate-300 rounded-xl px-4 py-3.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-xl text-[10px] font-mono uppercase tracking-[0.25em] font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer ${theme.primaryButton}`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Procesando Solicitud...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Solicitar Cotización Técnica</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Ecosistema de Alianzas y Clientes al pie de página */}
      <GlobalPartners />

    </div>
  );
}
