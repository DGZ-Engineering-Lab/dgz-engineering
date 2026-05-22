"use client";

import { useState, useEffect } from "react";
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
  Info
} from "lucide-react";
import { SERVICES_DATA } from "../../../data/servicesData";

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
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-slate-800 hover:border-cyan-500/40",
    glow: "bg-cyan-500/5 group-hover:bg-cyan-500/15",
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    dot: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
    accentBg: "from-cyan-500/20 to-transparent",
    borderGlow: "group-hover:border-cyan-500/50",
    glowingText: "drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    primaryButton: "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]",
    textMuted: "text-cyan-400/80",
    scrollbar: "scrollbar-thumb-cyan-500/30",
    shimmer: "from-cyan-500/10 via-cyan-500/20 to-cyan-500/10"
  },
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-slate-800 hover:border-indigo-500/40",
    glow: "bg-indigo-500/5 group-hover:bg-indigo-500/15",
    badge: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    dot: "bg-indigo-400 shadow-[0_0_8px_#818cf8]",
    accentBg: "from-indigo-500/20 to-transparent",
    borderGlow: "group-hover:border-indigo-500/50",
    glowingText: "drop-shadow-[0_0_20px_rgba(129,140,248,0.2)]",
    primaryButton: "bg-indigo-500 text-white hover:bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.25)]",
    textMuted: "text-indigo-400/80",
    scrollbar: "scrollbar-thumb-indigo-500/30",
    shimmer: "from-indigo-500/10 via-indigo-500/20 to-indigo-500/10"
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-slate-800 hover:border-purple-500/40",
    glow: "bg-purple-500/5 group-hover:bg-purple-500/15",
    badge: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    dot: "bg-purple-400 shadow-[0_0_8px_#c084fc]",
    accentBg: "from-purple-500/20 to-transparent",
    borderGlow: "group-hover:border-purple-500/50",
    glowingText: "drop-shadow-[0_0_20px_rgba(192,132,252,0.2)]",
    primaryButton: "bg-purple-500 text-white hover:bg-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.25)]",
    textMuted: "text-purple-400/80",
    scrollbar: "scrollbar-thumb-purple-500/30",
    shimmer: "from-purple-500/10 via-purple-500/20 to-purple-500/10"
  },
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-slate-800 hover:border-blue-500/40",
    glow: "bg-blue-500/5 group-hover:bg-blue-500/15",
    badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-400 shadow-[0_0_8px_#60a5fa]",
    accentBg: "from-blue-500/20 to-transparent",
    borderGlow: "group-hover:border-blue-500/50",
    glowingText: "drop-shadow-[0_0_20px_rgba(96,165,250,0.2)]",
    primaryButton: "bg-blue-500 text-white hover:bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.25)]",
    textMuted: "text-blue-400/80",
    scrollbar: "scrollbar-thumb-blue-500/30",
    shimmer: "from-blue-500/10 via-blue-500/20 to-blue-500/10"
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-slate-800 hover:border-emerald-500/40",
    glow: "bg-emerald-500/5 group-hover:bg-emerald-500/15",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    accentBg: "from-emerald-500/20 to-transparent",
    borderGlow: "group-hover:border-emerald-500/50",
    glowingText: "drop-shadow-[0_0_20px_rgba(52,211,153,0.2)]",
    primaryButton: "bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)]",
    textMuted: "text-emerald-400/80",
    scrollbar: "scrollbar-thumb-emerald-500/30",
    shimmer: "from-emerald-500/10 via-emerald-500/20 to-emerald-500/10"
  },
  teal: {
    text: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-slate-800 hover:border-teal-500/40",
    glow: "bg-teal-500/5 group-hover:bg-teal-500/15",
    badge: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    dot: "bg-teal-400 shadow-[0_0_8px_#2dd4bf]",
    accentBg: "from-teal-500/20 to-transparent",
    borderGlow: "group-hover:border-teal-500/50",
    glowingText: "drop-shadow-[0_0_20px_rgba(45,212,191,0.2)]",
    primaryButton: "bg-teal-500 text-black hover:bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.25)]",
    textMuted: "text-teal-400/80",
    scrollbar: "scrollbar-thumb-teal-500/30",
    shimmer: "from-teal-500/10 via-teal-500/20 to-teal-500/10"
  },
  orange: {
    text: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-slate-800 hover:border-orange-500/40",
    glow: "bg-orange-500/5 group-hover:bg-orange-500/15",
    badge: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    dot: "bg-orange-400 shadow-[0_0_8px_#fb923c]",
    accentBg: "from-orange-500/20 to-transparent",
    borderGlow: "group-hover:border-orange-500/50",
    glowingText: "drop-shadow-[0_0_20px_rgba(251,146,60,0.2)]",
    primaryButton: "bg-orange-500 text-black hover:bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.25)]",
    textMuted: "text-orange-400/80",
    scrollbar: "scrollbar-thumb-orange-500/30",
    shimmer: "from-orange-500/10 via-orange-500/20 to-orange-500/10"
  },
  red: {
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-slate-800 hover:border-rose-500/40",
    glow: "bg-rose-500/5 group-hover:bg-rose-500/15",
    badge: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    dot: "bg-rose-400 shadow-[0_0_8px_#fb7185]",
    accentBg: "from-rose-500/20 to-transparent",
    borderGlow: "group-hover:border-rose-500/50",
    glowingText: "drop-shadow-[0_0_20px_rgba(251,113,133,0.2)]",
    primaryButton: "bg-rose-500 text-white hover:bg-rose-400 shadow-[0_0_20px_rgba(251,113,133,0.25)]",
    textMuted: "text-rose-400/80",
    scrollbar: "scrollbar-thumb-rose-500/30",
    shimmer: "from-rose-500/10 via-rose-500/20 to-rose-500/10"
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-slate-800 hover:border-pink-500/40",
    glow: "bg-pink-500/5 group-hover:bg-pink-500/15",
    badge: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    dot: "bg-pink-400 shadow-[0_0_8px_#f472b6]",
    accentBg: "from-pink-500/20 to-transparent",
    borderGlow: "group-hover:border-pink-500/50",
    glowingText: "drop-shadow-[0_0_20px_rgba(244,114,182,0.2)]",
    primaryButton: "bg-pink-500 text-white hover:bg-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.25)]",
    textMuted: "text-pink-400/80",
    scrollbar: "scrollbar-thumb-pink-500/30",
    shimmer: "from-pink-500/10 via-pink-500/20 to-pink-500/10"
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
  const [terminalLog, setTerminalLog] = useState([]);
  const [terminalTyping, setTerminalTyping] = useState(false);

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
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#020408] flex items-center justify-center px-6 py-32 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="text-center max-w-xl relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-rose-400 mb-8"
          >
            <AlertTriangle className="w-12 h-12" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            Servicio No Identificado
          </h1>
          <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
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
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 rounded-xl text-xs font-mono text-black uppercase tracking-widest font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
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

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 selection:bg-cyan-500/20 overflow-x-hidden relative">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-950 pointer-events-none z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.accentBg} opacity-20 rounded-full blur-[140px]`}></div>
      </div>
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-slate-950 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-10 rounded-full blur-[130px]"></div>
      </div>

      {/* Grid Overlay Fina */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#090d1a_1px,transparent_1px),linear-gradient(to_bottom,#090d1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Botón Volver & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16 border-b border-slate-900 pb-6">
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white uppercase tracking-widest transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a Soluciones</span>
          </Link>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <span>DEVGIZ</span>
            <ChevronRight className="w-3 h-3 text-slate-700" />
            <span className="uppercase text-slate-400">{service.capaLabel}</span>
            <ChevronRight className="w-3 h-3 text-slate-700" />
            <span className={`uppercase font-bold ${theme.text}`}>{service.title}</span>
          </div>
        </div>

        {/* HERO SECTION DE PRODUCTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          
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
              className={`text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] ${theme.glowingText}`}
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl"
            >
              {service.tagline}
            </motion.p>

            {/* Breve Concepto Destacado */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 bg-[#040813] border border-slate-900 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                {service.concept}
              </p>
            </motion.div>
          </div>

          {/* Columna Derecha: Telemetría / Métricas Destacadas */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Core Metrics // SLAs</span>
            
            <div className="grid grid-cols-1 gap-4">
              {service.metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="bg-[#03060c] border border-slate-900 rounded-2xl p-6 relative group overflow-hidden"
                >
                  {/* Hover background slide */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${theme.accentBg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${theme.accentBg} w-0 group-hover:w-full transition-all duration-500`}></div>

                  <span className="text-xs text-slate-500 block mb-2 font-mono uppercase">{metric.label}</span>
                  <div className={`text-3xl font-black tracking-tight text-white group-hover:${theme.text} transition-colors`}>
                    {metric.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* TAB INTERACTIVA: VALOR ESTRATÉGICO VS ESPECIFICACIONES DE INGENIERÍA */}
        <div className="mb-24">
          
          {/* Cabezote de Control de Pestañas */}
          <div className="flex border-b border-slate-900 mb-12 relative z-10">
            <button
              onClick={() => setActiveTab("strategy")}
              className={`flex-1 sm:flex-initial px-8 py-5 text-sm font-mono uppercase tracking-widest font-black transition-all duration-300 border-b-2 flex items-center justify-center gap-2 ${
                activeTab === "strategy"
                  ? `${theme.text} border-cyan-400 bg-cyan-950/5`
                  : "text-slate-500 border-transparent hover:text-slate-300"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Commercial Blueprint</span>
            </button>
            <button
              onClick={() => setActiveTab("technical")}
              className={`flex-1 sm:flex-initial px-8 py-5 text-sm font-mono uppercase tracking-widest font-black transition-all duration-300 border-b-2 flex items-center justify-center gap-2 ${
                activeTab === "technical"
                  ? `${theme.text} border-cyan-400 bg-cyan-950/5`
                  : "text-slate-500 border-transparent hover:text-slate-300"
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
                  <div className="bg-[#03060c] border border-slate-900 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-2xl rounded-full group-hover:bg-red-500/10 transition-colors"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-rose-400 rounded-xl">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-black text-white uppercase tracking-wider">El Problema de Negocio</h3>
                    </div>
                    <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                      {service.problemSolved}
                    </p>
                  </div>

                  {/* Solución */}
                  <div className="bg-[#03060c] border border-slate-900 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full group-hover:bg-emerald-500/10 transition-colors"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-black text-white uppercase tracking-wider">La Solución DevGiz</h3>
                    </div>
                    <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                      {service.solution}
                    </p>
                  </div>
                </div>

                {/* Casos de Uso del Servicio */}
                <div className="space-y-6">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Casos de Uso e Implantación</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {service.useCases.map((uc, ucIdx) => (
                      <div
                        key={ucIdx}
                        className="bg-[#04070f] border border-slate-900 hover:border-slate-800 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold mb-6">
                            0{ucIdx + 1}
                          </div>
                          <h4 className="text-base font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400">
                            {uc.title}
                          </h4>
                          <p className="text-slate-400 text-xs font-light leading-relaxed">
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
                  <div className="bg-[#03060c] border border-slate-900 rounded-[2rem] p-8">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-900 pb-4">
                      <Database className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">Formatos de Entrada Compatibles</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {service.specs.inputs.map((inp, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-[#050914] border border-slate-850 hover:border-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-colors cursor-default"
                        >
                          {inp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="bg-[#03060c] border border-slate-900 rounded-[2rem] p-8">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-900 pb-4">
                      <ExternalLink className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">Productos / Salidas Estándar</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {service.specs.outputs.map((out, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-[#050914] border border-slate-850 hover:border-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-colors cursor-default"
                        >
                          {out}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Normativas & Estándares */}
                <div className="bg-[#03060c] border border-slate-900 rounded-[2rem] p-8 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-900 pb-4">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">Cumplimiento Legal, Estándares & Certificaciones</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.specs.compliance.map((comp, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-4 bg-[#050914]/60 border border-slate-900 rounded-xl hover:border-slate-800 transition-colors">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                        <span className="text-xs text-slate-300 leading-snug">{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consola Interactiva de Arquitectura Técnica */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Interactive Architecture Terminal</span>
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                      SYSTEM OK
                    </span>
                  </div>

                  <div className="bg-[#03060d] border border-slate-900 rounded-2xl p-6 font-mono text-xs overflow-hidden shadow-2xl relative">
                    {/* Botones de ventana */}
                    <div className="flex gap-1.5 mb-6 border-b border-slate-900 pb-4">
                      <span className="w-3 h-3 rounded-full bg-rose-500/60 block"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500/60 block"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500/60 block"></span>
                    </div>

                    <div className="space-y-2 text-slate-400 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-950">
                      {terminalLog.map((log, idx) => (
                        <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                          {log}
                        </div>
                      ))}
                      {terminalTyping && (
                        <div className="text-cyan-400 animate-pulse">Running query...</div>
                      )}
                    </div>

                    {/* Línea de entrada interactiva */}
                    <div className="mt-8 border-t border-slate-900 pt-4 flex flex-wrap gap-2 items-center text-slate-500">
                      <span className="text-slate-400 text-xs">Queries disponibles:</span>
                      {["specs", "compliance", "system", "telemetry", "clear"].map((cmd) => (
                        <button
                          key={cmd}
                          onClick={() => runTerminalCommand(cmd)}
                          className="px-2 py-1 bg-[#060a13] hover:bg-[#0c1224] hover:text-white border border-slate-850 rounded text-[10px] font-mono text-cyan-400 transition-colors"
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
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-black block mb-4">Marketplace // Integration Plans</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Modelos de Despliegue e Integración</h2>
            <p className="text-slate-400 text-sm font-light mt-4 leading-relaxed">
              Selecciona el alcance tecnológico óptimo para tu organización. Todos nuestros planes integran automatización soberana y soporte prioritario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.marketplace?.map((tier, idx) => {
              const isPopular = idx === 1; // Hacer el del medio más premium
              
              return (
                <div
                  key={idx}
                  className={`bg-[#03060c] border rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-2xl ${
                    isPopular 
                      ? "border-cyan-500/40 ring-1 ring-cyan-500/20 bg-[#040814]" 
                      : "border-slate-900"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-cyan-500/10 border-b border-l border-cyan-500/20 rounded-bl-xl text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-black">
                      Recomendado
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px] uppercase tracking-wider mb-6">
                      {idx === 0 ? <Calendar className="w-3.5 h-3.5 text-cyan-400" /> : idx === 1 ? <Boxes className="w-3.5 h-3.5 text-cyan-400" /> : <Lock className="w-3.5 h-3.5 text-cyan-400" />}
                      <span>Fase // {tier.duration}</span>
                    </div>

                    <h3 className="text-xl font-black text-white tracking-tight mb-3">{tier.name}</h3>
                    
                    <div className="flex items-baseline gap-1.5 mb-8 border-b border-slate-900/60 pb-6">
                      <span className="text-xs text-slate-400 font-light font-mono">Inversión:</span>
                      <span className={`text-2xl font-black ${isPopular ? "text-cyan-400" : "text-white"}`}>{tier.price}</span>
                    </div>

                    <div className="space-y-3.5 mb-10">
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block mb-4">Entregables y Garantías</span>
                      {tier.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex gap-2.5 items-start text-[11px] text-slate-400 font-light leading-snug">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
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
                        ? "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                        : "bg-slate-900 hover:bg-[#070b15] border border-slate-800 hover:border-cyan-500/20 text-white"
                    }`}
                  >
                    <span>Adquirir Plan</span>
                    <ArrowRight className={`w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform ${isPopular ? "text-black" : "text-cyan-400"}`} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* FORMULARIO DE CONTACTO CONTEXTUAL */}
        <div id="contact-form" className="relative">
          <div className="bg-[#03060c] border border-slate-900 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-3xl">
            {/* Luces decorativas */}
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-b ${theme.accentBg} opacity-5 rounded-full blur-[100px] pointer-events-none`}></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
              
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">Cotización Exclusiva</span>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Iniciemos tu Proyecto Territorial</h2>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  Completa este formulario exclusivo de solicitud técnica. Nuestro equipo de ingenieros estructurará una propuesta formal y agenda técnica en menos de 24 horas.
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <div className="flex gap-3 items-center text-xs text-slate-400 font-mono">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>contacto@devgiz.com</span>
                  </div>
                  <div className="flex gap-3 items-center text-xs text-slate-400 font-mono">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>Operaciones Globales: Colombia</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  {submitSuccess ? (
                    <motion.div
                      key="success-form"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-[#050914] border border-cyan-500/20 p-8 rounded-3xl text-center space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8" />
                      </div>
                      
                      <h3 className="text-xl font-black text-white uppercase tracking-wider">¡Solicitud Registrada Exitosamente!</h3>
                      <p className="text-slate-400 text-xs font-light leading-relaxed max-w-md mx-auto">
                        Hemos catalogado tu ticket en el nodo de soporte para "{service.title}". Un ingeniero de soluciones se pondrá en contacto contigo para verificar viabilidad y requerimientos técnicos en las próximas horas.
                      </p>
                      
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-[10px] font-mono text-slate-300 uppercase tracking-widest transition-colors"
                      >
                        Enviar otra solicitud
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="active-form"
                      onSubmit={handleFormSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Tu Nombre *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ej. Ing. Carlos Mendoza"
                            className="w-full bg-[#050914] border border-slate-900 focus:border-cyan-500/40 hover:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Email Institucional *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="carlos.mendoza@organizacion.com"
                            className="w-full bg-[#050914] border border-slate-900 focus:border-cyan-500/40 hover:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Organización / Alcaldía *</label>
                          <input
                            type="text"
                            name="org"
                            required
                            value={formData.org}
                            onChange={handleInputChange}
                            placeholder="Ej. Alcaldía de Envigado"
                            className="w-full bg-[#050914] border border-slate-900 focus:border-cyan-500/40 hover:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Teléfono de Contacto</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+57 300 000 0000"
                            className="w-full bg-[#050914] border border-slate-900 focus:border-cyan-500/40 hover:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Plan / Alcance Seleccionado</label>
                        <select
                          name="scope"
                          value={formData.scope}
                          onChange={handleInputChange}
                          className="w-full bg-[#050914] border border-slate-900 focus:border-cyan-500/40 hover:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 appearance-none cursor-pointer"
                        >
                          {service.marketplace?.map((tier) => (
                            <option key={tier.name} value={tier.name} className="bg-[#03060c]">
                              {tier.name} ({tier.duration})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Especificaciones del Requerimiento *</label>
                        <textarea
                          name="msg"
                          rows={4}
                          required
                          value={formData.msg}
                          onChange={handleInputChange}
                          className="w-full bg-[#050914] border border-slate-900 focus:border-cyan-500/40 hover:border-slate-800 rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-xl text-[10px] font-mono uppercase tracking-[0.25em] font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 ${theme.primaryButton}`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
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
    </div>
  );
}
