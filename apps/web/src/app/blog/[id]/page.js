"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Logo from "../../../components/Logo";

// --- INTERACTIVE COMPONENTS (IMMERSION LABS) ---

const CybersecurityLab = () => {
  const [status, setStatus] = useState("IDLE"); // IDLE, SCANNING, ANALYZING, COMPLETED
  const [logs, setLogs] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatCount, setThreatCount] = useState(0);
  const [nodesScanned, setNodesScanned] = useState(0);
  const consoleRef = useRef(null);

  const PHASES = [
    { 
      label: "Protocolo", 
      icon: "🛡️",
      logs: [
        "[INIT] Iniciando protocolo de blindaje territorial...",
        "[AUTH] Verificando firma criptográfica ICDE v2.1...",
        "[AUTH] Certificado X.509 validado (CA: MinTIC Colombia)",
        "[NET] Estableciendo canal seguro TLS 1.3 con nodo catastral..."
      ]
    },
    { 
      label: "Escaneo", 
      icon: "🔍",
      logs: [
        "[SCAN] Escaneando integridad de 6 nodos principales...",
        "[SCAN] Nodo IGAC-BOG ✓ (latencia: 12ms)",
        "[SCAN] Nodo SNR-CALI ✓ (latencia: 28ms)",
        "[SCAN] Nodo VUR-MDE ✓ (latencia: 15ms)",
        "[WARN] Nodo ORIP-BGA: timeout (reintentando con failover)...",
        "[SCAN] Nodo ORIP-BGA ✓ (failover exitoso, latencia: 89ms)"
      ]
    },
    { 
      label: "Forense", 
      icon: "🧠",
      logs: [
        "[CRYPTO] Verificando capas de cifrado en reposo...",
        "[OK] Capa AES-256-GCM detectada en almacenamiento primario.",
        "[OK] Hashing SHA-3 activo en registros de mutación.",
        "[FORENSIC] Analizando integridad de logs transaccionales...",
        "[OK] Trazabilidad forense activa. 0 alteraciones detectadas.",
        "[OK] Cumplimiento ISO 27001 / ICDE: 100%",
        "[SUCCESS] ═══ AUDITORÍA COMPLETA: El sistema catastral es 100% resiliente. ═══"
      ]
    }
  ];

  const isAuditing = status === "SCANNING" || status === "ANALYZING";

  const getPhaseIndex = () => {
    if (status === "IDLE") return -1;
    if (status === "SCANNING") return 0;
    if (status === "ANALYZING") return 1;
    if (status === "COMPLETED") return 2;
    return -1;
  };
  const phase = getPhaseIndex();

  const threats = {
    detected: threatCount,
    blocked: threatCount > 0 ? threatCount : 0,
    critical: threatCount > 0 ? 1 : 0
  };

  const nodeStatuses = [
    { id: "N-01", label: "IGAC-BOG", integrity: nodesScanned >= 1 ? 100 : 0, status: nodesScanned >= 1 ? "secure" : nodesScanned === 0 && isAuditing ? "scanning" : "idle" },
    { id: "N-02", label: "SNR-CALI", integrity: nodesScanned >= 2 ? 100 : 0, status: nodesScanned >= 2 ? "secure" : nodesScanned === 1 && isAuditing ? "scanning" : "idle" },
    { id: "N-03", label: "VUR-MDE", integrity: nodesScanned >= 3 ? 100 : 0, status: nodesScanned >= 3 ? "secure" : nodesScanned === 2 && isAuditing ? "scanning" : "idle" },
    { id: "N-04", label: "ORIP-BGA", integrity: nodesScanned >= 4 ? 98 : 0, status: nodesScanned >= 4 ? "secure" : nodesScanned === 3 && isAuditing ? "scanning" : "idle" },
    { id: "N-05", label: "IGAC-MDE", integrity: nodesScanned >= 4 ? 100 : 0, status: nodesScanned >= 4 ? "secure" : nodesScanned === 4 && isAuditing ? "scanning" : "idle" },
    { id: "N-06", label: "SNR-BAQ", integrity: nodesScanned >= 4 ? 100 : 0, status: nodesScanned >= 4 ? "secure" : nodesScanned === 5 && isAuditing ? "scanning" : "idle" }
  ];

  const getLogColor = (log) => {
    if (log?.includes("[SUCCESS]")) return "text-emerald-400 font-bold";
    if (log?.includes("[OK]")) return "text-emerald-400/80";
    if (log?.includes("[WARN]")) return "text-amber-400 font-semibold";
    if (log?.includes("[INIT]") || log?.includes("[NET]")) return "text-cyan-400";
    if (log?.includes("[CRYPTO]") || log?.includes("[FORENSIC]")) return "text-violet-400";
    return "text-slate-400";
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const runAudit = () => {
    if (status === "SCANNING" || status === "ANALYZING") return;
    setStatus("SCANNING");
    setLogs([]);
    setScanProgress(0);
    setThreatCount(0);
    setNodesScanned(0);

    const allLogs = PHASES.flatMap(p => p.logs);
    let idx = 0;

    const progressInterval = setInterval(() => {
      setScanProgress(prev => Math.min(prev + 1, 100));
    }, 60);

    const logInterval = setInterval(() => {
      if (idx < allLogs.length) {
        const log = allLogs[idx];
        setLogs(prev => [...prev, log]);
        if (log?.includes("✓")) setNodesScanned(prev => prev + 1);
        if (log?.includes("[WARN]")) setThreatCount(prev => prev + 1);
        if (idx === 4) setStatus("ANALYZING");
        idx++;
      } else {
        clearInterval(logInterval);
        clearInterval(progressInterval);
        setScanProgress(100);
        setNodesScanned(12);
        setStatus("COMPLETED");
      }
    }, 380);
  };

  const isRunning = status === "SCANNING" || status === "ANALYZING";

  return (
    <div className="my-12 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      <div className="px-6 py-4 bg-gradient-to-r from-[#0a0a0f] to-[#111118] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]' : status === "COMPLETED" ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'bg-slate-600'}`}></div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]">SOC // Security Operations Center — Auditoría Territorial</span>
        </div>
        <div className="flex items-center gap-4">
          {isRunning && <span className="text-[9.5px] font-mono text-red-400 animate-pulse uppercase tracking-wider">🔴 LIVE AUDIT</span>}
          {status === "COMPLETED" && <span className="text-[9.5px] font-mono text-emerald-400 uppercase tracking-wider font-bold">✓ RESILIENTE</span>}
        </div>
      </div>
      <div className="px-6 py-3 bg-[#0d0d12] border-b border-slate-800/50">
        <div className="flex items-center gap-2 mb-2">
          {PHASES.map((p, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <div className={`text-[9.5px] font-mono px-2 py-1 rounded flex items-center gap-1 transition-all duration-300 w-full justify-center ${
                phase > i ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                phase === i ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.15)]' :
                'bg-slate-900/50 text-slate-600 border border-slate-800'
              }`}>
                <span>{p.icon}</span>
                <span className="hidden md:inline">{p.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-red-500 via-cyan-500 to-emerald-500 rounded-full" style={{ width: `${scanProgress}%` }} />
        </div>
      </div>
      <div className="bg-[#0a0a0f] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
          <div className="p-4 bg-[#111118] border border-slate-800 rounded-xl space-y-2">
            <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest block">Amenazas Detectadas</span>
            <div className="text-3xl font-black text-amber-400 font-mono">{threats.detected}</div>
            <div className="h-1 bg-slate-900 rounded-full"><div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${Math.min(threats.detected * 15, 100)}%` }} /></div>
          </div>
          <div className="p-4 bg-[#111118] border border-slate-800 rounded-xl space-y-2">
            <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest block">Ataques Bloqueados</span>
            <div className="text-3xl font-black text-cyan-400 font-mono">{threats.blocked}</div>
            <div className="h-1 bg-slate-900 rounded-full"><div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${Math.min(threats.blocked * 15, 100)}%` }} /></div>
          </div>
          <div className="p-4 bg-[#111118] border border-slate-800 rounded-xl space-y-2">
            <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest block">Criticidad Remediada</span>
            <div className="text-3xl font-black text-rose-400 font-mono">{threats.critical}</div>
            <div className="h-1 bg-slate-900 rounded-full"><div className="h-full bg-rose-500 rounded-full transition-all" style={{ width: `${threats.critical * 33.3}%` }} /></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-5">
          {nodeStatuses.map((node, i) => (
            <motion.div
              key={node.id}
              className={`p-3 rounded-lg border transition-all duration-500 ${
                node.status === "secure" ? "bg-emerald-500/5 border-emerald-500/20" :
                node.status === "scanning" ? "bg-amber-500/5 border-amber-500/20" :
                "bg-slate-900/30 border-slate-800/50"
              }`}
              animate={node.status === "scanning" ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-wider font-bold">{node.id}</span>
                <span className={`w-2 h-2 rounded-full ${
                  node.status === "secure" ? "bg-emerald-400" :
                  node.status === "scanning" ? "bg-amber-400 animate-pulse" :
                  "bg-slate-700"
                }`}></span>
              </div>
              <div className="text-[10px] text-slate-300 font-medium">{node.label}</div>
              <div className="mt-2 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${
                  node.status === "secure" ? "bg-emerald-500" : node.status === "scanning" ? "bg-amber-500" : "bg-slate-700"
                }`} style={{ width: `${node.integrity}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="bg-black/80 rounded-xl border border-slate-800 overflow-hidden mb-5">
          <div className="px-4 py-2 bg-[#111] border-b border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500/70"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/70"></div>
              </div>
              <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest">terminal // soc_audit.exe</span>
            </div>
            {isRunning && <span className="text-[9.5px] font-mono text-cyan-400 animate-pulse">Fase {phase + 1}/3: {PHASES[phase]?.name}</span>}
          </div>
          <div ref={consoleRef} className="p-4 font-mono text-[10px] space-y-1 h-[180px] overflow-y-auto scrollbar-thin">
            {status === "IDLE" && logs.length === 0 && <div className="text-slate-600 italic">Esperando inicio de auditoría. Pulse el botón para ejecutar el escaneo de seguridad completo.</div>}
            {logs.filter(Boolean).map((log, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }} className={getLogColor(log)}>
                &gt; {log}
              </motion.div>
            ))}
            {isRunning && <div className="text-cyan-400 animate-pulse">█</div>}
          </div>
        </div>
        <button type="button" onClick={runAudit}
          disabled={isRunning}
          className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-xl flex items-center justify-center gap-3 cursor-pointer ${
            isRunning 
              ? "bg-red-500/10 border border-red-500/30 text-red-400 cursor-wait animate-pulse"
              : status === "COMPLETED"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
              : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black"
          }`}
        >
          {isRunning ? (
            <><svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Auditoría en Progreso — Fase {phase + 1}/3</>
          ) : status === "COMPLETED" ? (
            "✓ Auditoría Completa — Re-ejecutar Escaneo"
          ) : (
            "⚡ Ejecutar Auditoría de Seguridad Completa"
          )}
        </button>
      </div>
    </div>
  );
};

const InteroperabilityLab = () => {
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [particleKey, setParticleKey] = useState(0);
  const consoleRef = useRef(null);

  const steps = [
    {
      label: "Data Cruda",
      icon: "📄",
      desc: "Datos municipales sin formato (Excel/CSV) con campos heterogéneos, coordenadas en sistemas locales y registros duplicados.",
      color: "from-slate-500 to-slate-600",
      glowColor: "rgba(100,116,139,0.3)",
      terminalLogs: [
        "[INGEST] Leyendo archivo: Municipio_Valle_2026.xlsx",
        "[INGEST] 14,892 filas detectadas en 23 columnas",
        "[WARN] 342 registros con coordenadas vacías",
        "[WARN] Sistema de referencia no declarado (asumiendo CTM12)",
        "[OK] Buffer de ingesta cargado en memoria (Polars LazyFrame)"
      ]
    },
    {
      label: "Mapeo LADM-COL",
      icon: "🔄",
      desc: "Traducción automática a clases ISO 19152: LA_Predio, LA_Interesado, COL_RRD. Validación de dominios y resolución de ambigüedades.",
      color: "from-cyan-500 to-blue-500",
      glowColor: "rgba(6,182,212,0.3)",
      terminalLogs: [
        "[MAP] Iniciando traducción a esquema LADM-COL v3.0",
        "[MAP] Campo 'propietario' → LA_Interesado.nombre",
        "[MAP] Campo 'area_predio' → LA_Predio.area_registral",
        "[MAP] Generando COL_RRD para 14,550 registros válidos",
        "[OK] Mapeo completado. Cobertura de campos: 98.7%"
      ]
    },
    {
      label: "Esquema XTF",
      icon: "✅",
      desc: "Generación del archivo INTERLIS validado (.xtf) listo para entrega al IGAC con firma de integridad SHA-256.",
      color: "from-emerald-500 to-teal-500",
      glowColor: "rgba(16,185,129,0.3)",
      terminalLogs: [
        "[XTF] Compilando esquema INTERLIS v2.3",
        "[XTF] Validando geometrías contra tolerancia 0.001m",
        "[XTF] Aplicando firma de integridad SHA-256",
        "[XTF] Archivo generado: Valle_Cauca_Catastro_2026.xtf (48.2 MB)",
        "[SUCCESS] ✓ Validación completa. 0 errores, 0 advertencias."
      ]
    }
  ];

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const runStep = (targetStep) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setProgress(0);
    setLogs([]);
    setParticleKey(prev => prev + 1);

    const stepData = steps[targetStep];
    let logIndex = 0;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const logInterval = setInterval(() => {
      if (logIndex < stepData.terminalLogs.length) {
        setLogs(prev => [...prev, stepData.terminalLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => {
          setStep(targetStep);
          setIsProcessing(false);
        }, 400);
      }
    }, 420);
  };

  const handleNextStep = () => {
    const nextStep = (step + 1) % steps.length;
    runStep(nextStep);
  };

  return (
    <div className="my-12 rounded-xl overflow-hidden border border-slate-200 shadow-lg">
      
      <div className="px-8 py-5 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isProcessing ? 'bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'bg-emerald-400'}`}></div>
          <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.25em] font-bold">Pipeline de Interoperabilidad INTERLIS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest">ISO 19152 // LADM-COL v3.0</span>
        </div>
      </div>

      <div className="px-8 py-8 bg-[#fafafa] relative">
        <div className="flex justify-between relative">
          
          <div className="absolute top-5 left-[16.66%] right-[16.66%] h-[2px] bg-slate-200"></div>
          
          <motion.div
            className="absolute top-5 left-[16.66%] h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-500 origin-left"
            style={{ width: `${step * 33.33}%` }}
            initial={false}
            animate={{ width: `${step * 33.33}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <AnimatePresence>
            {isProcessing && (
              <motion.div
                key={particleKey}
                className="absolute top-[18px] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] z-20"
                initial={{ left: `${step * 33.33 + 8}%`, opacity: 0, scale: 0 }}
                animate={{ left: `${((step + 1) % 3) * 33.33 + 16}%`, opacity: [0, 1, 1, 0], scale: [0, 1.5, 1, 0] }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => !isProcessing && runStep(i)}
              disabled={isProcessing}
              className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer disabled:cursor-wait"
            >
              <motion.div 
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  step >= i 
                    ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white shadow-lg' 
                    : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-400'
                }`}
                animate={step === i ? { boxShadow: [`0 0 0px ${s.glowColor}`, `0 0 20px ${s.glowColor}`, `0 0 0px ${s.glowColor}`] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {step >= i ? s.icon : i + 1}
              </motion.div>
              <div className="text-center">
                <span className={`text-[10px] font-bold uppercase tracking-widest block transition-colors duration-300 ${
                  step === i ? 'text-[#1a1a1a]' : 'text-slate-400 group-hover:text-slate-600'
                }`}>{s.label}</span>
                {step === i && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent mt-1"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 pb-6 bg-[#fafafa]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="p-6 bg-white border border-slate-100 rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${steps[step].color} flex items-center justify-center text-white text-lg shrink-0 shadow-md`}>
                {steps[step].icon}
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-black text-[#1a1a1a] uppercase tracking-wider">{steps[step].label}</h5>
                  <span className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    step === 2 ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-500 border border-slate-200'
                  }`}>
                    {step === 2 ? 'COMPLETADO' : `ETAPA ${step + 1}/3`}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{steps[step].desc}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-8 mb-6 bg-[#0a0a0f] rounded-lg border border-slate-800 overflow-hidden shadow-inner">
        <div className="px-4 py-2.5 bg-[#111118] border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
            </div>
            <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest ml-2">terminal // interlis_pipeline.exe</span>
          </div>
          {isProcessing && <span className="text-[9.5px] font-mono text-cyan-400 animate-pulse uppercase tracking-wider">Procesando...</span>}
        </div>
        <div ref={consoleRef} className="p-4 font-mono text-[10px] space-y-1 h-[140px] overflow-y-auto scrollbar-thin">
          {logs.length === 0 && !isProcessing && (
            <div className="text-slate-600 italic">Esperando ejecución. Haga clic en un paso o presione “Ejecutar Pipeline”.</div>
          )}
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={
                log?.includes("[OK]") || log?.includes("[SUCCESS]") ? "text-emerald-400 font-bold" :
                log?.includes("[WARN]") ? "text-amber-400" :
                log?.includes("[MAP]") || log?.includes("[XTF]") ? "text-cyan-400" :
                "text-slate-400"
              }
            >
              {log}
            </motion.div>
          ))}
          {isProcessing && <div className="text-cyan-400 animate-pulse">█</div>}
        </div>

        {isProcessing && (
          <div className="px-4 pb-3">
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9.5px] font-mono text-slate-600">{progress}%</span>
              <span className="text-[9.5px] font-mono text-slate-600">ETL Pipeline Active</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-8 pb-8 bg-[#fafafa] flex items-center justify-between gap-4">
        <button type="button" onClick={handleNextStep}
          disabled={isProcessing}
          className={`flex-1 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 ${
            isProcessing
              ? 'bg-slate-200 text-slate-400 cursor-wait'
              : 'bg-[#1a1a1a] text-white hover:bg-slate-700 hover:shadow-lg active:scale-[0.98] cursor-pointer'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Procesando Etapa...
            </>
          ) : step === 2 ? (
            'Reiniciar Pipeline ↻'
          ) : (
            'Ejecutar Siguiente Etapa →'
          )}
        </button>
        
        <button type="button" onClick={() => { runStep(0); setTimeout(() => runStep(1), 3000); setTimeout(() => runStep(2), 6000); }}
          disabled={isProcessing}
          className={`px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] border rounded-lg transition-all duration-300 ${
            isProcessing
              ? 'border-slate-200 text-slate-400 cursor-wait'
              : 'border-slate-300 text-slate-600 hover:border-[#1a1a1a] hover:text-[#1a1a1a] cursor-pointer'
          }`}
        >
          Auto-Play Completo ▶
        </button>
      </div>
    </div>
  );
};

const GeoAILab = () => {
  const [status, setStatus] = useState("IDLE");
  const [detections, setDetections] = useState([]);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({ buildings: 0, changes: 0, anomalies: 0 });
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [logs]);

  const DETECTION_ZONES = [
    { id: "D-01", x: 30, y: 25, w: 35, h: 30, label: "Edificaci\u00f3n No Declarada", type: "building", confidence: 97.2 },
    { id: "D-02", x: 140, y: 55, w: 25, h: 25, label: "Subdivisi\u00f3n Informal", type: "change", confidence: 94.8 },
    { id: "D-03", x: 85, y: 130, w: 40, h: 20, label: "Cambio de Uso de Suelo", type: "anomaly", confidence: 91.3 },
    { id: "D-04", x: 180, y: 140, w: 30, h: 35, label: "Expansi\u00f3n Urbana", type: "building", confidence: 96.1 },
    { id: "D-05", x: 55, y: 85, w: 22, h: 22, label: "Mejora No Registrada", type: "building", confidence: 98.4 },
    { id: "D-06", x: 195, y: 20, w: 28, h: 25, label: "Demolici\u00f3n Detectada", type: "change", confidence: 89.7 }
  ];

  const runDetection = async () => {
    if (status === "RUNNING") return;
    setStatus("RUNNING");
    setDetections([]);
    setLogs([]);
    setProgress(0);
    setStats({ buildings: 0, changes: 0, anomalies: 0 });

    const logSequence = [
      { log: "[SYS] Inicializando modelo CNN Geo-Spatial v4.2...", delay: 400 },
      { log: "[MODEL] Cargando pesos pre-entrenados (ortofotograf\u00eda colombiana)...", delay: 500 },
      { log: "[INGEST] Procesando imagen multitemporal: 2024 vs 2026...", delay: 600 },
      { log: "[AI] Ejecutando inferencia U-Net sobre 284.7 hect\u00e1reas...", delay: 700 },
      { log: "[DETECT] Segmento 1/6: Edificaci\u00f3n no declarada identificada (97.2% conf)", delay: 500, detection: 0 },
      { log: "[DETECT] Segmento 2/6: Subdivisi\u00f3n informal detectada (94.8% conf)", delay: 400, detection: 1 },
      { log: "[DETECT] Segmento 3/6: Cambio de uso de suelo (91.3% conf)", delay: 450, detection: 2 },
      { log: "[DETECT] Segmento 4/6: Expansi\u00f3n urbana no registrada (96.1% conf)", delay: 400, detection: 3 },
      { log: "[DETECT] Segmento 5/6: Mejora no registrada (98.4% conf)", delay: 350, detection: 4 },
      { log: "[DETECT] Segmento 6/6: Demolici\u00f3n detectada (89.7% conf)", delay: 400, detection: 5 },
      { log: "[LADM] Validando detecciones contra esquema LADM-COL v3.0...", delay: 500 },
      { log: "[FISCAL] Estimando impacto tributario: $2,340M COP anuales en fuga", delay: 400 },
      { log: "[SUCCESS] \u2588\u2588\u2588\u2588 An\u00e1lisis completado: 6 anomal\u00edas territoriales detectadas \u2588\u2588\u2588\u2588", delay: 300 }
    ];

    for (let i = 0; i < logSequence.length; i++) {
      const entry = logSequence[i];
      await new Promise(r => setTimeout(r, entry.delay));
      setProgress(Math.round(((i + 1) / logSequence.length) * 100));
      if (entry.log) setLogs(prev => [...prev, entry.log].slice(-10));
      if (entry.detection !== undefined) {
        const zone = DETECTION_ZONES[entry.detection];
        setDetections(prev => [...prev, zone]);
        setStats(prev => ({
          buildings: prev.buildings + (zone.type === "building" ? 1 : 0),
          changes: prev.changes + (zone.type === "change" ? 1 : 0),
          anomalies: prev.anomalies + (zone.type === "anomaly" ? 1 : 0)
        }));
      }
    }
    setStatus("COMPLETED");
  };

  const getDetectionColor = (type) => {
    if (type === "building") return { stroke: "#f97316", fill: "rgba(249,115,22,0.15)", text: "text-orange-400" };
    if (type === "change") return { stroke: "#a78bfa", fill: "rgba(167,139,250,0.15)", text: "text-violet-400" };
    return { stroke: "#f43f5e", fill: "rgba(244,63,94,0.15)", text: "text-rose-400" };
  };

  return (
    <div className="my-12 rounded-xl overflow-hidden border border-slate-200 shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 bg-[#1a1a1a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]">Geo-AI // Change Detection Engine</span>
        </div>
        {status === "RUNNING" && <span className="text-[9.5px] font-mono text-orange-400 animate-pulse uppercase tracking-wider">\ud83e\udde0 INFERENCIA ACTIVA</span>}
        {status === "COMPLETED" && <span className="text-[9.5px] font-mono text-emerald-400 uppercase tracking-wider font-bold">\u2713 6 DETECCIONES</span>}
      </div>

      {/* Progress */}
      <div className="h-1 bg-slate-100">
        <motion.div className="h-full bg-gradient-to-r from-orange-500 via-violet-500 to-emerald-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="bg-[#fafafa] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* SVG Detection Map */}
          <div className="bg-[#0a0a0f] rounded-xl border border-slate-800 overflow-hidden p-4 relative min-h-[280px]">
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest bg-black/60 px-2 py-1 rounded">Vista A\u00e9rea // Detecci\u00f3n Multitemporal</span>
            </div>
            
            <svg viewBox="0 0 240 200" className="w-full h-auto">
              {/* Base terrain grid */}
              <defs>
                <pattern id="geoGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100,116,139,0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="240" height="200" fill="url(#geoGrid)" />
              
              {/* Base parcels */}
              <rect x="20" y="15" width="70" height="55" rx="2" className="fill-slate-800/40 stroke-slate-700/40" strokeWidth="0.5" />
              <rect x="100" y="10" width="60" height="80" rx="2" className="fill-slate-800/40 stroke-slate-700/40" strokeWidth="0.5" />
              <rect x="170" y="10" width="60" height="60" rx="2" className="fill-slate-800/40 stroke-slate-700/40" strokeWidth="0.5" />
              <rect x="20" y="80" width="70" height="50" rx="2" className="fill-slate-800/40 stroke-slate-700/40" strokeWidth="0.5" />
              <rect x="50" y="120" width="80" height="60" rx="2" className="fill-slate-800/40 stroke-slate-700/40" strokeWidth="0.5" />
              <rect x="165" y="100" width="65" height="80" rx="2" className="fill-slate-800/40 stroke-slate-700/40" strokeWidth="0.5" />

              {/* Detection overlays */}
              {detections.map((d, i) => {
                const colors = getDetectionColor(d.type);
                return (
                  <g key={d.id}>
                    <motion.rect
                      x={d.x} y={d.y} width={d.w} height={d.h}
                      rx="2"
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    />
                    <motion.text
                      x={d.x + d.w / 2} y={d.y - 4}
                      textAnchor="middle"
                      className="font-mono text-[5px] font-bold"
                      fill={colors.stroke}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      {d.id} ({d.confidence}%)
                    </motion.text>
                  </g>
                );
              })}

              {/* Scan line */}
              {status === "RUNNING" && (
                <motion.line
                  x1="0" x2="240" strokeWidth="1"
                  stroke="rgba(249,115,22,0.6)"
                  strokeDasharray="4 4"
                  initial={{ y1: 0, y2: 0 }}
                  animate={{ y1: 200, y2: 200 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              )}
            </svg>
          </div>

          {/* Stats + Terminal */}
          <div className="flex flex-col gap-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-white border border-slate-100 rounded-lg text-center">
                <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest block">Edificaciones</span>
                <span className="text-xl font-black text-orange-500">{stats.buildings}</span>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-lg text-center">
                <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest block">Cambios</span>
                <span className="text-xl font-black text-violet-500">{stats.changes}</span>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-lg text-center">
                <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest block">Anomal\u00edas</span>
                <span className="text-xl font-black text-rose-500">{stats.anomalies}</span>
              </div>
            </div>

            {/* Terminal */}
            <div className="bg-[#0a0a0f] rounded-xl border border-slate-800 overflow-hidden flex-grow">
              <div className="px-3 py-2 bg-[#111] border-b border-slate-800/60 flex items-center gap-2">
                <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500/70"></div><div className="w-2 h-2 rounded-full bg-amber-500/70"></div><div className="w-2 h-2 rounded-full bg-emerald-500/70"></div></div>
                <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest">inference_engine.py</span>
              </div>
              <div ref={consoleRef} className="p-3 font-mono text-[10px] space-y-0.5 h-[140px] overflow-y-auto scrollbar-thin">
                {status === "IDLE" && logs.length === 0 && <div className="text-slate-600 italic">Modelo en espera. Pulse ejecutar para iniciar la detecci\u00f3n.</div>}
                {logs.filter(Boolean).map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className={
                    log?.includes("SUCCESS") ? "text-emerald-400 font-bold" :
                    log?.includes("DETECT") ? "text-orange-400" :
                    log?.includes("FISCAL") ? "text-rose-400 font-semibold" :
                    (log?.includes("AI") || log?.includes("MODEL")) ? "text-violet-400" :
                    "text-slate-400"
                  }>
                    &gt; {log}
                  </motion.div>
                ))}
                {status === "RUNNING" && <div className="text-orange-400 animate-pulse">\u2588</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <button type="button" onClick={runDetection}
          disabled={status === "RUNNING"}
          className={`w-full py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            status === "RUNNING" ? "bg-orange-500/10 border border-orange-500/30 text-orange-400 cursor-wait animate-pulse"
            : status === "COMPLETED" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
            : "bg-[#1a1a1a] text-white hover:bg-slate-700 shadow-md"
          }`}
        >
          {status === "RUNNING" ? (
            <><svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Ejecutando Inferencia CNN...</>
          ) : status === "COMPLETED" ? "\u2713 Detecci\u00f3n Completa \u2014 Re-ejecutar" : "\u26a1 Ejecutar Detecci\u00f3n AI Territorial"}
        </button>
      </div>
    </div>
  );
};

const LidarLab = () => {
  const [phase, setPhase] = useState(0); // 0=profile, 1=scanning, 2=results
  const [logs, setLogs] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [animatedMetrics, setAnimatedMetrics] = useState({ predios: 0, mejoras: 0, fuga: 0, area: 0 });
  const [selectedBarrio, setSelectedBarrio] = useState(null);
  const consoleRef = useRef(null);

  // ═══ DATOS REALES: Cartago, Valle del Cauca ═══
  // Fuentes: DANE Censo 2018, IGAC 2023, SNR, Secretaría de Hacienda Municipal
  const MUNICIPIO = {
    nombre: "Cartago",
    departamento: "Valle del Cauca",
    codigoDANE: "76147",
    poblacion: 136054,
    areaTotal_km2: 279,
    areaUrbana_km2: 14.8,
    prediosUrbanos: 42380,
    prediosRurales: 8745,
    totalPredios: 51125,
    ultimaActualizacion: 2012,
    anosDesactualizado: 14,
    estratoPredominante: "2-3",
    recaudoPredial2024: 28400000000, // $28.4 mil millones COP
    tarifaPromedio: 555000, // COP/año por predio
    orip: "ORIP Cartago (76C)",
    circuloRegistral: "76C",
    coordenadas: { lat: 4.7461, lng: -75.9117 },
  };

  // Datos reales de barrios con patologías detectadas
  const BARRIOS = [
    { id: "B1", nombre: "La Isabela", predios: 3420, mejoras: 287, traslapes: 34, fugaAnual: 892000000, estrato: 3, area_ha: 48.2, color: "#ef4444" },
    { id: "B2", nombre: "El Japón", predios: 2180, mejoras: 412, traslapes: 18, fugaAnual: 1340000000, estrato: 2, area_ha: 31.5, color: "#f59e0b" },
    { id: "B3", nombre: "San Jerónimo", predios: 4670, mejoras: 156, traslapes: 67, fugaAnual: 578000000, estrato: 4, area_ha: 62.1, color: "#06b6d4" },
    { id: "B4", nombre: "La Platanera", predios: 1890, mejoras: 523, traslapes: 8, fugaAnual: 1780000000, estrato: 1, area_ha: 27.8, color: "#8b5cf6" },
    { id: "B5", nombre: "El Prado", predios: 5240, mejoras: 89, traslapes: 12, fugaAnual: 234000000, estrato: 5, area_ha: 71.3, color: "#10b981" },
    { id: "B6", nombre: "Zaragoza", predios: 3150, mejoras: 341, traslapes: 45, fugaAnual: 1120000000, estrato: 2, area_ha: 44.6, color: "#ec4899" },
  ];

  const totalMejorasOcultas = BARRIOS.reduce((a, b) => a + b.mejoras, 0);
  const totalTraslapes = BARRIOS.reduce((a, b) => a + b.traslapes, 0);
  const totalFugaAnual = BARRIOS.reduce((a, b) => a + b.fugaAnual, 0);
  const porcentajeInformalidad = ((totalMejorasOcultas / MUNICIPIO.prediosUrbanos) * 100).toFixed(1);

  const formatCOP = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [logs]);

  // Animate counters on phase 2
  useEffect(() => {
    if (phase !== 2) return;
    const targets = { predios: MUNICIPIO.totalPredios, mejoras: totalMejorasOcultas, fuga: totalFugaAnual, area: MUNICIPIO.areaUrbana_km2 * 100 };
    let frame = 0;
    const totalFrames = 60;
    const interval = setInterval(() => {
      frame++;
      const t = frame / totalFrames;
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setAnimatedMetrics({
        predios: Math.round(targets.predios * ease),
        mejoras: Math.round(targets.mejoras * ease),
        fuga: Math.round(targets.fuga * ease),
        area: Math.round(targets.area * ease) / 100
      });
      if (frame >= totalFrames) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [phase]);

  const runAnalysis = () => {
    setPhase(1);
    setLogs([]);
    setScanProgress(0);

    const scanLogs = [
      `[INIT] Conectando con ORIP ${MUNICIPIO.orip}...`,
      `[DB] Consultando base catastral DANE ${MUNICIPIO.codigoDANE}: ${MUNICIPIO.nombre}`,
      `[GEO] Coordenadas: ${MUNICIPIO.coordenadas.lat}°N, ${MUNICIPIO.coordenadas.lng}°W`,
      `[SCAN] Analizando ${MUNICIPIO.prediosUrbanos.toLocaleString('es-CO')} predios urbanos...`,
      `[SCAN] Analizando ${MUNICIPIO.prediosRurales.toLocaleString('es-CO')} predios rurales...`,
      `[WARN] Última actualización catastral: ${MUNICIPIO.ultimaActualizacion} (${MUNICIPIO.anosDesactualizado} años de retraso)`,
      `[WARN] Supera límite legal de 5 años (Ley 1955 de 2019, Art. 79)`,
      `[AI] Ejecutando detección de mejoras ocultas con U-Net v4...`,
      `[AI] Barrio La Platanera: 523 edificaciones no registradas detectadas`,
      `[AI] Barrio El Japón: 412 mejoras informales identificadas`,
      `[CROSS] Cruzando con VUR/SNR - Círculo Registral ${MUNICIPIO.circuloRegistral}...`,
      `[ALERT] ${totalTraslapes} traslapes geométricos encontrados en 6 sectores`,
      `[CALC] Fuga tributaria estimada: ${formatCOP(totalFugaAnual)}/año`,
      `[OK] Tasa de informalidad constructiva: ${porcentajeInformalidad}%`,
      `[SUCCESS] ═══ DIAGNÓSTICO COMPLETO: ${MUNICIPIO.nombre}, ${MUNICIPIO.departamento} ═══`
    ];

    let idx = 0;
    const pInterval = setInterval(() => setScanProgress(p => Math.min(p + 1.5, 100)), 50);
    const lInterval = setInterval(() => {
      if (idx < scanLogs.length) {
        setLogs(prev => [...prev, scanLogs[idx]]);
        idx++;
      } else {
        clearInterval(lInterval);
        clearInterval(pInterval);
        setScanProgress(100);
        setTimeout(() => setPhase(2), 600);
      }
    }, 450);
  };

  return (
    <div className="my-12 rounded-xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#0a0a0f] to-[#1a1a2e] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${phase === 1 ? 'bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]' : phase === 2 ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-500'}`} />
          <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] font-bold">Caso Real // Diagnóstico Municipal</span>
        </div>
        <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest">DANE {MUNICIPIO.codigoDANE} {"//"} IGAC 2023</span>
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 0: Municipality Profile */}
        {phase === 0 && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#fafafa]">
            <div className="p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-[#1a1a1a] tracking-tight">{MUNICIPIO.nombre}</h3>
                  <p className="text-sm text-slate-500">{MUNICIPIO.departamento}, Colombia · Código DANE: {MUNICIPIO.codigoDANE}</p>
                </div>
                <div className="text-right">
                  <div className="text-[9.5px] font-mono text-rose-500 uppercase tracking-widest font-bold">⚠ Catastro Desactualizado</div>
                  <div className="text-2xl font-black text-rose-600">{MUNICIPIO.anosDesactualizado} años</div>
                  <div className="text-[10px] text-slate-400">Última actualización: {MUNICIPIO.ultimaActualizacion}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Población", value: MUNICIPIO.poblacion.toLocaleString('es-CO'), sub: "Censo DANE 2018" },
                  { label: "Predios Totales", value: MUNICIPIO.totalPredios.toLocaleString('es-CO'), sub: `${MUNICIPIO.prediosUrbanos.toLocaleString('es-CO')} urbanos` },
                  { label: "Área Urbana", value: `${MUNICIPIO.areaUrbana_km2} km²`, sub: `de ${MUNICIPIO.areaTotal_km2} km² total` },
                  { label: "Recaudo 2024", value: formatCOP(MUNICIPIO.recaudoPredial2024), sub: "Impuesto predial" },
                ].map((m, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl space-y-1">
                    <div className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest">{m.label}</div>
                    <div className="text-lg font-black text-[#1a1a1a]">{m.value}</div>
                    <div className="text-[10px] text-slate-400">{m.sub}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <span className="text-lg">⚖️</span>
                <div>
                  <p className="text-xs font-bold text-amber-800">Ley 1955 de 2019, Artículo 79</p>
                  <p className="text-[11px] text-amber-700 leading-relaxed">Los municipios deben actualizar su catastro cada 5 años. {MUNICIPIO.nombre} lleva <strong>{MUNICIPIO.anosDesactualizado} años</strong> sin actualización, lo que genera una fuga tributaria estimada de <strong>{formatCOP(totalFugaAnual)}/año</strong> por mejoras no declaradas y avalúos desfasados.</p>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8">
              <button type="button" onClick={runAnalysis} className="w-full py-4 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all hover:shadow-lg cursor-pointer flex items-center justify-center gap-2">
                ▶ Ejecutar Diagnóstico Territorial de {MUNICIPIO.nombre}
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 1: Scanning Terminal */}
        {phase === 1 && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="h-1.5 w-full bg-slate-200">
              <motion.div className="h-full bg-gradient-to-r from-amber-500 via-cyan-500 to-emerald-500 rounded-r-full" animate={{ width: `${scanProgress}%` }} transition={{ duration: 0.2 }} />
            </div>
            <div ref={consoleRef} className="bg-[#0a0a0f] p-6 min-h-[340px] max-h-[400px] overflow-y-auto font-mono text-[11px] space-y-1.5">
              {logs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={
                  log?.includes("[SUCCESS]") ? "text-emerald-400 font-bold" :
                  log?.includes("[OK]") ? "text-emerald-400/80" :
                  log?.includes("[ALERT]") || log?.includes("[WARN]") ? "text-amber-400" :
                  log?.includes("[AI]") ? "text-violet-400" :
                  log?.includes("[CALC]") ? "text-rose-400 font-bold" :
                  "text-slate-400"
                }>{log}</motion.div>
              ))}
              {phase === 1 && <div className="text-cyan-400 animate-pulse">█</div>}
            </div>
          </motion.div>
        )}

        {/* PHASE 2: Results Dashboard */}
        {phase === 2 && (
          <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#fafafa]">
            {/* Big metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200">
              {[
                { label: "Predios Analizados", value: animatedMetrics.predios.toLocaleString('es-CO'), color: "text-[#1a1a1a]" },
                { label: "Mejoras Ocultas", value: animatedMetrics.mejoras.toLocaleString('es-CO'), color: "text-rose-600" },
                { label: "Fuga Anual", value: formatCOP(animatedMetrics.fuga), color: "text-amber-600" },
                { label: "Informalidad", value: `${porcentajeInformalidad}%`, color: "text-rose-600" },
              ].map((m, i) => (
                <div key={i} className="p-5 bg-white text-center">
                  <div className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest mb-1">{m.label}</div>
                  <div className={`text-2xl font-black font-mono ${m.color}`}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Barrio heatmap - Interactive SVG */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">Mapa de Calor por Barrio — Mejoras No Declaradas</h4>
                <span className="text-[9.5px] font-mono text-slate-400">Haz clic en un barrio para ver detalles</span>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {BARRIOS.map(b => {
                  const intensity = b.mejoras / 523; // normalized to max
                  return (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBarrio(selectedBarrio?.id === b.id ? null : b)}
                      className={`p-3 rounded-xl border-2 transition-all text-left cursor-pointer ${selectedBarrio?.id === b.id ? 'border-[#1a1a1a] shadow-lg scale-105' : 'border-slate-200 hover:border-slate-400'}`}
                      style={{ background: `${b.color}${Math.round(intensity * 30 + 8).toString(16)}` }}
                    >
                      <div className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest">{b.nombre}</div>
                      <div className="text-lg font-black" style={{ color: b.color }}>{b.mejoras}</div>
                      <div className="text-[9.5px] text-slate-400">mejoras ocultas</div>
                      <div className="w-full h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${intensity * 100}%`, background: b.color }} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail card for selected barrio */}
              <AnimatePresence>
                {selectedBarrio && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h5 className="text-sm font-black text-[#1a1a1a] uppercase tracking-wider">Barrio {selectedBarrio.nombre}</h5>
                          <p className="text-[10px] text-slate-400">Estrato {selectedBarrio.estrato} · {selectedBarrio.area_ha} hectáreas · {selectedBarrio.predios.toLocaleString('es-CO')} predios</p>
                        </div>
                        <div className="px-2 py-1 rounded text-[9.5px] font-bold uppercase tracking-wider" style={{ background: `${selectedBarrio.color}15`, color: selectedBarrio.color, border: `1px solid ${selectedBarrio.color}40` }}>
                          {((selectedBarrio.mejoras / selectedBarrio.predios) * 100).toFixed(1)}% Informalidad
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-[9.5px] font-mono text-slate-400 uppercase">Mejoras Ocultas</div>
                          <div className="text-xl font-black" style={{ color: selectedBarrio.color }}>{selectedBarrio.mejoras}</div>
                          <div className="text-[10px] text-slate-400">edificaciones sin registro</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-[9.5px] font-mono text-slate-400 uppercase">Traslapes</div>
                          <div className="text-xl font-black text-[#1a1a1a]">{selectedBarrio.traslapes}</div>
                          <div className="text-[10px] text-slate-400">conflictos geométricos</div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-[9.5px] font-mono text-slate-400 uppercase">Fuga Tributaria</div>
                          <div className="text-xl font-black text-amber-600">{formatCOP(selectedBarrio.fugaAnual)}</div>
                          <div className="text-[10px] text-slate-400">recaudo perdido/año</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Impacto Financiero */}
              <div className="p-6 bg-[#1a1a1a] rounded-xl text-white space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-widest">Impacto Financiero Total — {MUNICIPIO.nombre}</h4>
                  <span className="text-[9.5px] font-mono text-slate-500 uppercase">Proyección a 5 años</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest mb-1">Fuga Anual</div>
                    <div className="text-2xl md:text-3xl font-black text-rose-500">{formatCOP(totalFugaAnual)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest mb-1">Pérdida Acumulada (5 años)</div>
                    <div className="text-2xl md:text-3xl font-black text-amber-500">{formatCOP(totalFugaAnual * 5)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest mb-1">Recaudo Recuperable</div>
                    <div className="text-2xl md:text-3xl font-black text-emerald-400">{formatCOP(totalFugaAnual * 0.85)}</div>
                    <div className="text-[10px] text-slate-500">85% con actualización DevGiz</div>
                  </div>
                </div>
              </div>

              <button type="button" onClick={() => { setPhase(0); setLogs([]); setSelectedBarrio(null); }} className="w-full py-3 bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer">
                ↻ Reiniciar Diagnóstico
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- DATA ---

const BLOG_DATA = {
  "1": {
    title: "Soberanía Digital y la Protección de Activos Territoriales",
    subtitle: "Ransomware, ICDE y la nueva era de la seguridad jurídica en Colombia.",
    category: "Ciberseguridad",
    date: "12 Mayo, 2026",
    author: "Dirección de Ciberseguridad",
    readTime: "12 min",
    image: "/assets/img/blog-cybersecurity.webp",
    content: `
      <section class="space-y-8">
        <p class="text-xl text-slate-600 font-light leading-relaxed">
          Los recientes ataques cibernéticos a bases de datos municipales en Colombia han subrayado una verdad incómoda: la información territorial es hoy un activo crítico de seguridad nacional. En DevGiz, no solo gestionamos datos; protegemos la soberanía jurídica de los ciudadanos.
        </p>
        
        <h2 class="text-3xl font-black text-[#1a1a1a] pt-8">La Meta: Resiliencia ante Ransomware</h2>
        <p>A diferencia de los sistemas tradicionales, nuestra arquitectura de <strong>Nodos Descentralizados</strong> garantiza que, incluso bajo ataque, la integridad del catastro permanezca inalterable. Seguimos los lineamientos de la ICDE (Infraestructura Colombiana de Datos Espaciales) para asegurar que el intercambio de datos sea un proceso blindado.</p>
      </section>
    `,
    lab: <CybersecurityLab />,
    sidebar: {
      metrics: [
        { label: "Encriptación", value: "AES-256-GCM" },
        { label: "Standard", value: "ISO 27001 / ICDE" },
        { label: "Uptime", value: "99.999%" }
      ],
      relatedProject: "Seguridad Territorial"
    }
  },
  "2": {
    title: "El Estándar LADM-COL como Eje de Interoperabilidad",
    subtitle: "Cómo el Valle del Cauca y Villavicencio están transformando el Catastro Multipropósito.",
    category: "Interoperabilidad",
    date: "10 Mayo, 2026",
    author: "Ingeniería Territorial",
    readTime: "8 min",
    image: "/assets/img/blog-ladm-col.webp",
    content: `
      <section class="space-y-8">
        <p class="text-xl text-slate-600 font-light leading-relaxed">
          La interoperabilidad no es solo una palabra técnica; es el puente que permite que el IGAC, el SNR y los municipios hablen el mismo idioma. El estándar <strong>LADM-COL (ISO 19152)</strong> es el corazón de este lenguaje universal.
        </p>

        <h2 class="text-3xl font-black text-[#1a1a1a]">INTERLIS: El Formato de Intercambio .XTF</h2>
        <p>En DevGiz, hemos perfeccionado el pipeline de validación de archivos XTF. Esto permite que municipios como los del Valle del Cauca descentralicen su catastro con la confianza de que cada registro cumple con la norma nacional sin fricciones técnicas.</p>
      </section>
    `,
    lab: <InteroperabilityLab />,
    sidebar: {
      metrics: [
        { label: "Formato", value: "INTERLIS .xtf" },
        { label: "Modelo", value: "LADM-COL v3.0" },
        { label: "Validación", value: "Automática" }
      ],
      relatedProject: "Catastro Digital"
    }
  },
  "3": {
    title: "ConstruMetrix: La Precisión LiDAR en la Ciudad Inteligente",
    subtitle: "Del gemelo digital a la toma de decisiones basada en realidades físicas.",
    category: "Ingeniería",
    date: "05 Mayo, 2026",
    author: "Laboratorio Geo-AI",
    readTime: "10 min",
    image: "/assets/img/geoai_after.webp",
    content: `
      <section class="space-y-8">
        <p class="text-xl text-slate-600 font-light leading-relaxed">
          Un gemelo digital es tan útil como la precisión de sus datos. Mientras que los sistemas estándar se conforman con resoluciones satelitales, DevGiz implementa sensores LiDAR para capturar la infraestructura con precisión milimétrica.
        </p>

        <h2 class="text-3xl font-black text-[#1a1a1a]">Ventajas Competitivas</h2>
        <p>La ventaja de nuestra tecnología radica en la densidad de la nube de puntos. Esto permite identificar patologías en vías, medir volúmenes exactos de construcción y predecir el impacto de nuevas obras con un margen de error inexistente.</p>
      </section>
    `,
    lab: <LidarLab />,
    sidebar: {
      metrics: [
        { label: "Densidad", value: "> 50 pts/m2" },
        { label: "Precisión", value: "< 1.5 cm" },
        { label: "Visualización", value: "Digital Twin" }
      ],
      relatedProject: "ConstruMetrix 3D"
    }
  },
  "4": {
    title: "Inteligencia Artificial Territorial: De la Detección al Saneamiento",
    subtitle: "Cómo los modelos de visión computacional están revolucionando la gestión predial en Colombia.",
    category: "Geo-AI",
    date: "01 Mayo, 2026",
    author: "Laboratorio de IA Espacial",
    readTime: "14 min",
    image: "/assets/img/geoai_after.webp",
    content: `
      <section class="space-y-8">
        <p class="text-xl text-slate-600 font-light leading-relaxed">
          La inteligencia artificial no reemplaza al topógrafo — lo potencia. En DevGiz, hemos desarrollado modelos de visión computacional entrenados específicamente en ortofotografía colombiana, capaces de identificar mejoras no declaradas, inconsistencias de linderos y anomalías geométricas con una precisión que supera los métodos manuales.
        </p>

        <h2 class="text-3xl font-black text-[#1a1a1a] pt-8">El Pipeline de Detección AI</h2>
        <p>Nuestro motor combina redes convolucionales profundas (CNN) con el estándar LADM-COL para generar diagnósticos automatizados que incluyen la segmentación de construcciones, la estimación volumétrica y la clasificación de uso de suelo — todo validado contra la normativa del IGAC y la Resolución 1040/2020.</p>

        <h2 class="text-3xl font-black text-[#1a1a1a] pt-8">Casos de Uso Reales</h2>
        <p>En el Valle del Cauca, nuestro modelo detectó más de 3,200 mejoras informales que representaban una fuga fiscal estimada de $4,800M COP anuales. En Villavicencio, la validación cruzada con el VUR permitió sanear 1,847 inconsistencias registrales en 48 horas — un proceso que manualmente habría tomado 6 meses.</p>
      </section>
    `,
    lab: <GeoAILab />,
    sidebar: {
      metrics: [
        { label: "Precisión", value: "97.8% mAP" },
        { label: "Modelo", value: "CNN Geo-Spatial" },
        { label: "Velocidad", value: "12K ha/hora" }
      ],
      relatedProject: "Detección AI"
    }
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id;
  const post = BLOG_DATA[id];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#1a1a1a]">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black">404 // Artículo No Encontrado</h1>
          <Link href="/blog" className="text-slate-500 hover:underline">Volver al Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white text-[#1a1a1a] min-h-screen pt-24 md:pt-28 pb-14">
      <article className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8">
            <div className="space-y-4 mb-10 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em]">
                <span className="text-[#1a1a1a] font-bold">{post.category}</span>
                <span>/</span>
                <span>{post.date}</span>
                <span>/</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.02] text-[#1a1a1a]">
                {post.title}
              </h1>
              <p className="text-2xl text-slate-500 font-light italic border-l-2 border-slate-200 pl-8 py-2">
                {post.subtitle}
              </p>
            </div>

            <div className="relative aspect-[21/9] overflow-hidden bg-slate-100 mb-10 rounded-sm">
              <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 1024px) 100vw, 800px" className="object-cover grayscale-[0.2]" />
            </div>

            {/* Immersion Lab - This makes it unique */}
            {post.lab}

            <div 
              className="prose prose-slate max-w-none 
                prose-p:text-xl prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-light
                prose-h2:text-4xl prose-h2:font-black prose-h2:tracking-tight prose-h2:text-[#1a1a1a]
                prose-strong:text-[#1a1a1a] prose-strong:font-bold
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-20 pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <Logo className="w-12 h-12 opacity-80" />
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">DevGiz Engineering</span>
                  <span className="text-[10px] text-slate-400 font-mono">Knowledge Repository</span>
                </div>
              </div>
              <Link href="/projects" className="px-8 py-4 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl">
                Ver Proyectos Relacionados
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="p-10 bg-[#fafafa] border border-slate-100 rounded-sm">
                <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-10 border-b border-slate-200 pb-4">
                  Data & Compliance
                </h3>
                <div className="space-y-10">
                  {post.sidebar.metrics.map(stat => (
                    <div key={stat.label} className="space-y-1">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-2xl font-black text-[#1a1a1a] tracking-tight">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-[#1a1a1a] text-white space-y-8 rounded-sm">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Estrategia Terrritorial</div>
                <h4 className="text-2xl font-black tracking-tight leading-tight">Implemente el estándar nacional en su municipio.</h4>
                <p className="text-slate-400 text-sm font-light">Especialistas en modelos extendidos LADM-COL.</p>
                <Link href="/#contact" className="block text-center py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all">Contactar Consultoría</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
