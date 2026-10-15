"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "../../components/Logo";
import {
  DollarSign,
  Clock,
  MapPin,
  ShieldAlert,
  Building2,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Users,
  Map,
  Layers,
  Globe,
  Database,
  Settings,
  Brain,
  Cpu
} from "lucide-react";

export default function BrochurePage() {
  // Calculator State
  const [projects, setProjects] = useState(3);
  const [delayDays, setDelayDays] = useState(30);
  const [dailyCost, setDailyCost] = useState(5000000); // 5 Millones COP default

  // Calculator Math
  const totalLoss = projects * delayDays * dailyCost;
  const devgizLoss = projects * 1.5 * dailyCost; // 1.5 days with DevGiz
  const totalSavings = totalLoss - devgizLoss;
  const percentageSaved = 95;

  // Format currency helper (COP)
  const formatCOP = (num) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Pre-filled WhatsApp message
  const whatsappNumber = "573106514707"; // Can be updated to actual
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola%20DevGiz%20Colombia,%20calcul%C3%A9%20mi%20ahorro%20en%20el%20brochure%20interactivo%20(%20${encodeURIComponent(formatCOP(totalSavings))}%20)%20y%20me%20gustar%C3%ADa%20agendar%20una%20demostraci%C3%B3n%20sin%20costo%20para%20mi%20empresa.`;

  return (
    <div className="min-h-screen text-slate-900 bg-slate-50 selection:bg-cyan-500/20 overflow-x-hidden relative font-sans">

      {/* Dynamic Background Light Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-cyan-500/10 to-transparent opacity-45 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-30 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Header / Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 py-8 px-6 backdrop-blur-md bg-white/40 border-b border-slate-200/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" aria-label="DevGiz, ir al inicio" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-slate-950 text-white hover:bg-cyan-500 hover:text-black text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center gap-2 shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hablar con un Experto</span>
          </a>
        </div>
      </header>

      {/* Hero Section - The Big Humanized Hook */}
      <section className="relative pt-28 md:pt-32 pb-8 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[10px] font-black tracking-[0.2em] text-cyan-700 uppercase">
            <Sparkles className="w-3 h-3 text-cyan-600 animate-pulse" />
            Soluciones Territoriales sin Complicaciones
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05] text-slate-950">
            Dile adiós a los retrasos geográficos. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 font-light italic">Protege tus terrenos y acelera tus proyectos.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            Hacemos simple lo que antes tardaba semanas. Validamos linderos, descartamos afectaciones ambientales y automatizamos tus estudios catastrales en 5 minutos, ahorrándote millones de pesos en nóminas y maquinaria quieta.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#calculator"
              className="px-8 py-4.5 bg-slate-950 text-white hover:bg-cyan-500 hover:text-black text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-sm shadow-xl"
            >
              Calcular Mi Ahorro
            </a>
            <Link
              href="/"
              className="px-8 py-4.5 border border-slate-200 hover:border-slate-355 bg-white/80 hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-sm"
            >
              Ver Mapa Interactivo
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator Component */}
      <section id="calculator" className="py-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <div className="flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-cyan-500/50"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-600 font-bold">HERRAMIENTA FINANCIERA</span>
              <span className="w-8 h-px bg-cyan-500/50"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
              ¿Cuánto dinero estás perdiendo por retrasos territoriales?
            </h2>
            <p className="text-slate-500 text-sm font-light max-w-xl mx-auto leading-relaxed">
              Mueve los controles según la operación de tu empresa y descubre el impacto oculto del desorden geográfico en tu balance anual.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left: Input Sliders */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-xl space-y-8 flex flex-col justify-between">

              {/* Slider 1 */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="roi-projects" className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-600" />
                    Proyectos activos al año
                  </label>
                  <span className="px-3 py-1 bg-slate-100 text-slate-900 font-mono text-xs font-bold rounded-full">
                    {projects} {projects === 1 ? "proyecto" : "proyectos"}
                  </span>
                </div>
                <input id="roi-projects" aria-valuetext={`${projects} ${projects === 1 ? "proyecto" : "proyectos"}`}
                  type="range"
                  min="1"
                  max="30"
                  value={projects}
                  onChange={(e) => setProjects(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 Proyecto</span>
                  <span>30 Proyectos</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="roi-delay" className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Retraso promedio (días esperando planos/POT)
                  </label>
                  <span className="px-3 py-1 bg-slate-100 text-slate-900 font-mono text-xs font-bold rounded-full tabular-nums">
                    {delayDays} días
                  </span>
                </div>
                <input id="roi-delay" aria-valuetext={`${delayDays} días`}
                  type="range"
                  min="5"
                  max="120"
                  value={delayDays}
                  onChange={(e) => setDelayDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5 días</span>
                  <span>120 días</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="roi-daily-cost" className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    Costo operativo diario de parálisis
                  </label>
                  <span className="px-3 py-1 bg-slate-100 text-slate-900 font-mono text-xs font-bold rounded-full tabular-nums">
                    {formatCOP(dailyCost)} / día
                  </span>
                </div>
                <input id="roi-daily-cost" aria-valuetext={`${formatCOP(dailyCost)} por día`}
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="500000"
                  value={dailyCost}
                  onChange={(e) => setDailyCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>$1M COP</span>
                  <span>$20M COP</span>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200/50 rounded-2xl flex gap-3 text-xs text-orange-800">
                <ShieldAlert className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <p className="leading-relaxed">
                  <strong>Nota catastral:</strong> Un retraso en linderos o problemas de POT suele mantener paradas cuadrillas de construcción y frenar la escrituración de predios, lo cual incrementa exponencialmente los costos fijos.
                </p>
              </div>

            </div>

            {/* Right: Savings Summary HUD */}
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden border border-slate-800">

              {/* Decorative Glow */}
              <div className="absolute -right-24 -bottom-24 w-60 h-60 bg-cyan-500/20 rounded-full blur-[70px] pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Pérdida Actual Estimada</span>
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold rounded">RETROCESO</span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-light text-slate-400">Tu costo oculto:</div>
                  <div className="text-3xl md:text-4xl font-black text-red-400 tracking-tight font-mono tabular-nums">
                    {formatCOP(totalLoss)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono tabular-nums">
                    ({projects} proy. × {delayDays} días × {formatCOP(dailyCost)})
                  </div>
                </div>

                <div className="h-px bg-white/10 my-4"></div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    Con DevGiz Spatial OS:
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tight font-mono tabular-nums">
                    {formatCOP(totalSavings)}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Ahorro neto garantizado de hasta un <span className="font-bold text-white">{percentageSaved}%</span> en tiempos de debida diligencia.
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-8 relative z-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-xl flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(6,182,212,0.3)] hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reclamar Mi Ahorro vía WhatsApp</span>
                </a>
                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Te enviaremos una propuesta formal y personalizada de forma inmediata en PDF basada en tu estimación actual.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* DevGiz Engineering Specialties - Bento Grid */}
      <section className="py-14 md:py-16 px-6 relative bg-slate-900 text-white overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">

          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-[10px] font-black tracking-widest text-cyan-400 uppercase">
              CAPACIDADES DE INGENIERÍA 360
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Nuestras Especialidades & Áreas de Acción
            </h2>
            <p className="text-slate-400 text-sm font-light max-w-xl mx-auto leading-relaxed">
              No solo hacemos mapas. Diseñamos e implementamos sistemas de datos espaciales complejos y automatizamos tu flujo completo de trabajo de inicio a fin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* 1. Automatización & DevOps */}
            <div className="bg-slate-955 border border-slate-800/80 rounded-3xl p-8 space-y-6 hover:border-cyan-500/40 transition-all group relative">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                <Settings className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-white">1. Automatización de Procesos & DevOps</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Eliminamos tareas repetitivas. Diseñamos pipelines automáticos, crons desatendidos y flujos CI/CD para automatizar backups, validaciones de código y sincronización de bases de datos territoriales de forma 100% autónoma.
                </p>
              </div>
            </div>

            {/* 2. Procesamiento Satelital & LiDAR */}
            <div className="bg-slate-955 border border-slate-800/80 rounded-3xl p-8 space-y-6 hover:border-cyan-500/40 transition-all group relative">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-all">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-white">2. Procesamiento de Imágenes Satelitales</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Análisis avanzado de sensores remotos. Procesamos ortofotografía, generamos índices de vegetación (NDVI) y optimizamos nubes de puntos LiDAR para modelar curvas de nivel y perfiles de elevación 3D con precisión de centímetros.
                </p>
              </div>
            </div>

            {/* 3. Planos & Digitalización */}
            <div className="bg-slate-955 border border-slate-800/80 rounded-3xl p-8 space-y-6 hover:border-cyan-500/40 transition-all group relative">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-black transition-all">
                <Map className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-white">3. Planos & Digitalización Cartográfica</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Trascendemos el papel. Vectorizamos planos analógicos históricos, aplicamos algoritmos de corrección topológica automáticos y los transformamos en bases de datos geográficas interoperables bajo normativas catastrales modernas.
                </p>
              </div>
            </div>

            {/* 4. Arquitectura de Bases de Datos */}
            <div className="bg-slate-955 border border-slate-800/80 rounded-3xl p-8 space-y-6 hover:border-cyan-500/40 transition-all group relative">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-white">4. Bases de Datos & Cruces Masivos</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Arquitectura Big Data. Desarrollamos bases de datos relacionales geográficas en PostGIS, Neon DB, DuckDB y Polars para cruzar millones de registros prediales en milisegundos sin latencia y con indexación espacial.
                </p>
              </div>
            </div>

            {/* 5. Desarrollo Web & Plataformas */}
            <div className="bg-slate-955 border border-slate-800/80 rounded-3xl p-8 space-y-6 hover:border-cyan-500/40 transition-all group relative">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-black transition-all">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-white">5. Desarrollo Web & Plataformas GIS</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Construimos visores interactivos del futuro. Desarrollamos aplicaciones en Next.js con mapas responsivos basados en Mapbox GL, dashboards de control táctico en tiempo real y gemelos digitales con animaciones aceleradas por GPU.
                </p>
              </div>
            </div>

            {/* 6. Inteligencia Geoespacial & GeoAI */}
            <div className="bg-slate-955 border border-slate-800/80 rounded-3xl p-8 space-y-6 hover:border-cyan-500/40 transition-all group relative">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-white">6. Inteligencia Geoespacial & GeoAI</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Inteligencia artificial con sentido de lugar. Creamos modelos predictivos de valoración catastral y agentes de IA (LLMs) especializados en leer escrituras y estructurar resúmenes legales de forma autónoma.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Humanized B2B Segmented Pitch Blocks */}
      <section className="py-14 md:py-16 px-6 relative bg-white border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto">

          <div className="text-center space-y-3 mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-600 font-bold">SOLUCIONES POR SECTOR</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
              ¿Cómo impulsamos el crecimiento de tu negocio?
            </h2>
            <p className="text-slate-500 text-sm font-light max-w-xl mx-auto leading-relaxed">
              Descubre la manera en que DevGiz se convierte en el socio más rentable para tus actividades específicas en Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Segment 1: Inmobiliarias */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-10 space-y-6 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pymes & Inmobiliarias</h3>
                <p className="text-slate-600 text-sm font-light leading-relaxed">
                  Automatiza tus consultas geográficas. Visualiza linderos en el móvil, elimina la digitalización manual de planos y genera reportes catastrales listos para notaría en segundos.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Automatización CAD-to-GIS:</strong> Cero reprocesos manuales de planos.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Visor Móvil Integrado:</strong> Acceso a datos catastrales desde el celular.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Reportes Express en PDF:</strong> Estudios de linderos listos en 5 minutos.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200/50">
                <span className="text-[10px] font-mono text-cyan-600 font-bold uppercase tracking-wider block">INVERSIÓN ESTIMADA</span>
                <span className="text-lg font-black text-slate-900">$249.000 COP / mes</span>
              </div>
            </div>

            {/* Segment 2: Constructoras */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-10 space-y-6 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Constructoras & Corporaciones</h3>
                <p className="text-slate-600 text-sm font-light leading-relaxed">
                  Cruza millones de registros territoriales en milisegundos con DuckDB + Polars. Unifica todos tus archivos Excel y planos sueltos en bases de datos geográficas seguras en la nube.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Cruces Masivos Ultra-Veloces:</strong> DuckDB + Polars para auditorías express.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Arquitectura de Datos PostGIS:</strong> Unificación de bases de datos dispersas.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Alertas de POT y Ley 2da:</strong> Detección automática de riesgos e invasiones.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200/50">
                <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block">INVERSIÓN ESTIMADA</span>
                <span className="text-lg font-black text-slate-900">$2.490.000 COP / mes</span>
              </div>
            </div>

            {/* Segment 3: Sector Público */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-10 space-y-6 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Gobierno & Mega-Infraestructura</h3>
                <p className="text-slate-600 text-sm font-light leading-relaxed">
                  Implementa Agentes Inteligentes GeoAI para procesar y auditar escrituras históricas automáticamente. Planifica tu territorio con Gemelos Digitales 3D interactivos de alto impacto.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Agentes Inteligentes GeoAI:</strong> Lectura automatizada de escrituras en PDF.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Gemelos Digitales 3D:</strong> Simulación de riesgos e impacto fiscal predial.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Sincronización Híbrida Offline:</strong> Operación en campo y catastro LADM-COL.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200/50">
                <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-wider block">INVERSIÓN ESTIMADA</span>
                <span className="text-lg font-black text-slate-900">Desde $45.000.000 COP</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Professional Call To Action Banner */}
      <section className="py-14 md:py-18 px-6 bg-slate-950 text-white relative overflow-hidden">

        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
            Comienza a ahorrar tiempo y dinero hoy mismo.
          </h2>
          <p className="text-slate-400 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Nuestros especialistas en ingeniería territorial están listos para analizar tu primer predio de forma 100% gratuita.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-sm shadow-xl text-center focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none"
            >
              Agendar Demo Gratuita de 15 Minutos
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto px-10 py-5 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-sm text-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              Conocer Más de la Plataforma
            </Link>
          </div>
          <div className="text-[10px] text-slate-500 flex justify-center items-center gap-4 font-mono">
            <span>✓ CERO COMPROMISO</span>
            <span>✓ ANÁLISIS DE PREDIO GRATIS</span>
            <span>✓ PROPUESTA EN COP</span>
          </div>
        </div>
      </section>
    </div>
  );
}
