"use client";

import { useState, useEffect } from "react";
import { 
  Activity, 
  Lock, 
  Unlock, 
  Search, 
  Trash2, 
  RefreshCw, 
  SlidersHorizontal, 
  Cpu, 
  CheckCircle, 
  ExternalLink,
  ShieldAlert,
  Inbox,
  Clock,
  Briefcase,
  Terminal,
  User,
  LogOut
} from "lucide-react";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL"); // ALL, GOV, CORP, PUBLIC
  const [storageType, setStorageType] = useState("Retrieving...");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Load passcode from local storage on mount to preserve session
  useEffect(() => {
    const savedPasscode = localStorage.getItem("dgz_admin_passcode");
    if (savedPasscode) {
      verifyAndFetch(savedPasscode);
    }
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const verifyAndFetch = async (codeToVerify) => {
    setIsLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/messages", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${codeToVerify}`
        }
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessages(data.messages);
        setStorageType(data.storage);
        setIsAuthorized(true);
        setPasscode(codeToVerify);
        localStorage.setItem("dgz_admin_passcode", codeToVerify);
        showToast("Acceso Concedido. Enlace táctico establecido.", "success");
      } else {
        setAuthError(data.error || "Código incorrecto.");
        localStorage.removeItem("dgz_admin_passcode");
      }
    } catch (err) {
      setAuthError("Fallo de conexión con la pasarela.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeypadPress = (val) => {
    setAuthError("");
    if (passcode.length < 12) {
      setPasscode(prev => prev + val);
    }
  };

  const handleKeypadClear = () => {
    setPasscode("");
    setAuthError("");
  };

  const handleKeypadDelete = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  const handleKeypadSubmit = (e) => {
    if (e) e.preventDefault();
    if (!passcode) {
      setAuthError("Ingrese el passcode de encriptación.");
      return;
    }
    verifyAndFetch(passcode);
  };

  const handleLogout = () => {
    setPasscode("");
    setIsAuthorized(false);
    setMessages([]);
    localStorage.removeItem("dgz_admin_passcode");
    showToast("Consola cerrada y encriptada.", "info");
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm("¿Está seguro de depurar/eliminar permanentemente este registro del log?")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${passcode}`
        }
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessages(prev => prev.filter(msg => msg.id !== id));
        showToast("Mensaje depurado con éxito.", "success");
      } else {
        showToast(data.error || "No se pudo depurar el mensaje.", "error");
      }
    } catch (err) {
      showToast("Error de conexión al depurar.", "error");
    }
  };

  const handleDeleteAll = async () => {
    const confirmation = prompt("Para confirmar la eliminación total de la base catastral temporal, escriba 'dgz-wipe-all':");
    if (confirmation !== "dgz-wipe-all") {
      showToast("Acción cancelada. Código incorrecto.", "error");
      return;
    }

    try {
      const res = await fetch(`/api/admin/messages?id=all`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${passcode}`
        }
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessages([]);
        showToast("Base de datos vaciada con éxito.", "success");
      } else {
        showToast(data.error || "Error al vaciar base de datos.", "error");
      }
    } catch (err) {
      showToast("Fallo de comunicación con la pasarela.", "error");
    }
  };

  const handleRefresh = () => {
    verifyAndFetch(passcode);
  };

  // Helper to categorize sector by email domain or company name
  const getSector = (msg) => {
    const email = (msg.email || "").toLowerCase();
    const comp = (msg.company || "").toLowerCase();
    
    if (email.endsWith(".gov.co") || email.endsWith(".gov") || comp.includes("alcaldia") || comp.includes("gobierno") || comp.includes("ministerio") || comp.includes("igac")) {
      return "GOV";
    }
    if (comp.includes("s.a.") || comp.includes("sas") || comp.includes("constructora") || comp.includes("engineering") || comp.includes("corporativo") || comp.includes("coporation") || msg.company !== "N/A" && msg.company !== "") {
      return "CORP";
    }
    return "PUBLIC";
  };

  // Filter and search logic
  const filteredMessages = messages.filter(msg => {
    const term = searchTerm.toLowerCase();
    const nameMatch = (msg.name || "").toLowerCase().includes(term);
    const emailMatch = (msg.email || "").toLowerCase().includes(term);
    const companyMatch = (msg.company || "").toLowerCase().includes(term);
    const messageMatch = (msg.message || "").toLowerCase().includes(term);
    const matchesSearch = nameMatch || emailMatch || companyMatch || messageMatch;

    if (sectorFilter === "ALL") return matchesSearch;
    return matchesSearch && getSector(msg) === sectorFilter;
  });

  // Calculate dynamic stats
  const totalCount = messages.length;
  const govCount = messages.filter(m => getSector(m) === "GOV").length;
  const corpCount = messages.filter(m => getSector(m) === "CORP").length;
  const avgMessageLen = totalCount > 0 
    ? Math.round(messages.reduce((acc, m) => acc + (m.message || "").length, 0) / totalCount)
    : 0;

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 flex flex-col font-sans relative overflow-hidden pb-12">
      {/* Background neon grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#091426_1px,transparent_1px),linear-gradient(to_bottom,#091426_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />
      
      {/* Toast Alert */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl border font-mono text-[10px] uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all ${
          toast.type === "success" 
            ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-400"
            : toast.type === "error"
            ? "bg-red-950/90 border-red-500/50 text-red-400"
            : "bg-cyan-950/90 border-cyan-500/50 text-cyan-400"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-ping ${toast.type === "success" ? "bg-emerald-400" : toast.type === "error" ? "bg-red-400" : "bg-cyan-400"}`} />
          {toast.message}
        </div>
      )}

      {/* Lock Screen View */}
      {!isAuthorized ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 min-h-[80vh]">
          <div className="w-full max-w-md p-6 rounded-[2rem] border border-slate-800/60 bg-slate-900/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6 relative overflow-hidden group">
            {/* Holographic light reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />
            
            {/* Sleek Top LED bar */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-cyan-950/50 border border-cyan-500/30 rounded-2xl flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Lock className="w-5 h-5 animate-pulse" />
              </div>
              <h1 className="text-lg font-mono font-black uppercase tracking-widest text-white">Console Lock System</h1>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">DevGiz Engineering // Protected Gate</p>
            </div>

            {/* Input Dial Screen */}
            <form onSubmit={handleKeypadSubmit} className="space-y-4">
              <div className="relative">
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-black/60 border border-slate-800 rounded-2xl text-center text-lg font-mono font-bold tracking-widest text-cyan-400 focus:outline-none focus:border-cyan-500 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                />
                {isLoading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
                  </div>
                )}
              </div>

              {authError && (
                <div className="p-2.5 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-[9px] font-mono text-center flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {authError.toUpperCase()}
                </div>
              )}

              {/* Tactical Numeric Keypad Matrix */}
              <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleKeypadPress(String(num))}
                    className="py-3 bg-slate-900/60 hover:bg-cyan-950/20 border border-slate-800/80 active:scale-95 rounded-xl font-mono font-bold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer text-xs"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleKeypadClear}
                  className="py-3 bg-red-950/10 hover:bg-red-950/30 border border-slate-800/80 active:scale-95 rounded-xl font-mono text-[9px] font-bold text-red-400 hover:border-red-500/40 transition-all cursor-pointer"
                >
                  CLEAR
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress("0")}
                  className="py-3 bg-slate-900/60 hover:bg-cyan-950/20 border border-slate-800/80 active:scale-95 rounded-xl font-mono font-bold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer text-xs"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleKeypadDelete}
                  className="py-3 bg-slate-900/60 hover:bg-cyan-950/20 border border-slate-800/80 active:scale-95 rounded-xl font-mono text-[9px] font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer"
                >
                  DEL
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] text-white font-bold font-mono tracking-widest text-[10px] uppercase rounded-xl transition-all cursor-pointer hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                >
                  ESTABLECER ENLACE
                </button>
              </div>
            </form>

            <div className="text-center pt-2">
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                Hint: passcode is defined in env (default: dgz2026)
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Authorized Administration Console View */
        <div className="flex-1 w-full max-w-[1500px] mx-auto px-6 py-8 space-y-6 relative z-10">
          
          {/* Header Panel */}
          <div className="p-4 bg-slate-900/30 backdrop-blur-md border border-slate-850 rounded-[2rem] flex flex-wrap justify-between items-center gap-4 shadow-2xl relative">
            <div className="absolute top-0 left-[10%] right-[10%] h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-950/40 border border-cyan-500/40 rounded-2xl flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <Unlock className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-lg font-black text-white tracking-tighter uppercase flex items-center gap-2">
                  Tactical Console Terminal
                  <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/25 rounded text-[8px] font-mono font-bold tracking-widest text-cyan-400 shrink-0">ADMIN PORTAL</span>
                </h1>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Gestión soberana de correspondencia territorial LADM-COL v3.0</p>
              </div>
            </div>

            {/* Database & Logout Actions */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-[9px]">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-black/60 border border-slate-800 rounded-xl backdrop-blur-md">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${storageType.includes("Simulation") ? "bg-amber-500 shadow-[0_0_8px_#f59e0b]" : "bg-emerald-500 shadow-[0_0_8px_#10b981]"}`} />
                <span className="text-slate-400">STATUS ALMACÉN:</span>
                <span className={`font-bold uppercase ${storageType.includes("Simulation") ? "text-amber-400" : "text-emerald-400"}`}>
                  {storageType}
                </span>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-cyan-400 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                SINC
              </button>

              <button
                onClick={handleLogout}
                className="p-2 bg-red-950/10 hover:bg-red-950/30 border border-red-500/30 hover:border-red-500/50 rounded-xl text-red-400 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                CERRAR
              </button>
            </div>
          </div>

          {/* Metrics Telemetry HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1: Total Messages */}
            <div className="p-4 bg-slate-900/20 border border-slate-850 rounded-2xl relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500/60" />
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black block">Total Inquiries</span>
                  <span className="text-3xl font-black font-mono text-white tracking-tighter block">{totalCount}</span>
                </div>
                <Inbox className="w-5 h-5 text-cyan-400/50" />
              </div>
              <div className="text-[8px] font-mono text-slate-400 mt-2">Peticiones registradas en el buffer de red.</div>
            </div>

            {/* Stat 2: Gov Sector count */}
            <div className="p-4 bg-slate-900/20 border border-slate-850 rounded-2xl relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500/60" />
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black block">Sector Gobierno</span>
                  <span className="text-3xl font-black font-mono text-white tracking-tighter block">{govCount}</span>
                </div>
                <Clock className="w-5 h-5 text-amber-400/50" />
              </div>
              <div className="text-[8px] font-mono text-slate-400 mt-2">Alcaldías, Ministerios y entes territoriales ({totalCount > 0 ? Math.round((govCount / totalCount) * 100) : 0}%).</div>
            </div>

            {/* Stat 3: Corporate sector count */}
            <div className="p-4 bg-[#091510]/10 border border-slate-850 rounded-2xl relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/60" />
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black block">Sector Corporativo</span>
                  <span className="text-3xl font-black font-mono text-white tracking-tighter block">{corpCount}</span>
                </div>
                <Briefcase className="w-5 h-5 text-emerald-400/50" />
              </div>
              <div className="text-[8px] font-mono text-slate-400 mt-2">Constructoras y consultoras privadas ({totalCount > 0 ? Math.round((corpCount / totalCount) * 100) : 0}%).</div>
            </div>

            {/* Stat 4: Avg Message Length */}
            <div className="p-4 bg-slate-900/20 border border-slate-850 rounded-2xl relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500/60" />
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black block">Prom. Longitud</span>
                  <span className="text-3xl font-black font-mono text-white tracking-tighter block">{avgMessageLen} <span className="text-slate-500 text-xs">letras</span></span>
                </div>
                <Terminal className="w-5 h-5 text-purple-400/50" />
              </div>
              <div className="text-[8px] font-mono text-slate-400 mt-2">Profundidad del requerimiento descriptivo promedio.</div>
            </div>
          </div>

          {/* Filtering and Search Controls */}
          <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-xl border border-slate-800 w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-500 shrink-0" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por cliente, email, compañía o palabra clave..." 
                className="w-full bg-transparent text-xs font-mono text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 font-mono text-[8px] uppercase font-bold shrink-0">
                <button
                  onClick={() => setSectorFilter("ALL")}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${sectorFilter === "ALL" ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400" : "text-slate-400 hover:text-white"}`}
                >
                  TODOS
                </button>
                <button
                  onClick={() => setSectorFilter("GOV")}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${sectorFilter === "GOV" ? "bg-amber-500/20 border border-amber-500/30 text-amber-400" : "text-slate-400 hover:text-white"}`}
                >
                  GOBIERNO
                </button>
                <button
                  onClick={() => setSectorFilter("CORP")}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${sectorFilter === "CORP" ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" : "text-slate-400 hover:text-white"}`}
                >
                  CORPORATIVO
                </button>
                <button
                  onClick={() => setSectorFilter("PUBLIC")}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${sectorFilter === "PUBLIC" ? "bg-slate-800 border border-slate-700 text-slate-300" : "text-slate-400 hover:text-white"}`}
                >
                  PÚBLICO
                </button>
              </div>

              {messages.length > 0 && (
                <button
                  onClick={handleDeleteAll}
                  className="px-3.5 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/30 hover:border-red-500/50 rounded-xl text-red-400 font-mono font-bold text-[8px] tracking-wider uppercase transition-all cursor-pointer"
                >
                  WIPE ALL
                </button>
              )}
            </div>
          </div>

          {/* Tactical Logs Table View */}
          <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-500 uppercase tracking-widest font-black text-[8px] border-b border-slate-850 sticky top-0 z-10">
                    <th className="p-4 w-1/4">CLIENTE / REMITENTE</th>
                    <th className="p-4 w-1/5">COMPAÑÍA / SECTOR</th>
                    <th className="p-4 w-2/5">MENSAJE REQUERIDO</th>
                    <th className="p-4 w-1/6 text-right">FECHA</th>
                    <th className="p-4 w-12 text-center">ACCIONES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredMessages.map((msg, index) => {
                    const sector = getSector(msg);
                    return (
                      <tr key={msg.id || index} className="hover:bg-slate-950/40 transition-all group/row border-b border-slate-850/50">
                        {/* Client details */}
                        <td className="p-4 space-y-1">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-500" />
                            {msg.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            {msg.email}
                            <a 
                              href={`mailto:${msg.email}`}
                              className="text-cyan-500 hover:text-cyan-400 p-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity"
                              title="Responder por correo"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </td>

                        {/* Company & Sector Badges */}
                        <td className="p-4 space-y-1.5">
                          <div className="text-white font-semibold truncate max-w-[160px]" title={msg.company}>
                            {msg.company === "N/A" || !msg.company ? "Persona Natural" : msg.company}
                          </div>
                          <div>
                            {sector === "GOV" ? (
                              <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/25 rounded text-[7px] font-bold text-amber-400 uppercase tracking-widest">
                                🏛️ Gobierno
                              </span>
                            ) : sector === "CORP" ? (
                              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/25 rounded text-[7px] font-bold text-emerald-400 uppercase tracking-widest">
                                💼 Corporación
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-slate-850 border border-slate-800 rounded text-[7px] font-bold text-slate-400 uppercase tracking-widest">
                                👤 Público
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Message Content */}
                        <td className="p-4">
                          <div className="text-slate-300 text-[10px] leading-relaxed break-words font-medium pr-4 select-text">
                            &quot;{msg.message}&quot;
                          </div>
                        </td>

                        {/* Relative / Formatted Timestamp */}
                        <td className="p-4 text-right">
                          <div className="text-slate-400 font-mono text-[10px] font-bold">
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleDateString("es-CO", {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            }) : "S/F"}
                          </div>
                          <div className="text-[9px] text-slate-500 font-mono">
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString("es-CO", {
                              hour: "2-digit",
                              minute: "2-digit"
                            }) : "S/H"}
                          </div>
                        </td>

                        {/* Row Actions */}
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                            title="Resolver e Inactivar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredMessages.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-12 text-center text-slate-500">
                        <div className="max-w-xs mx-auto space-y-2">
                          <Inbox className="w-8 h-8 mx-auto text-slate-700 animate-pulse" />
                          <div className="text-xs uppercase tracking-wider font-bold">No hay correspondencia</div>
                          <div className="text-[10px] text-slate-400 leading-relaxed font-medium">
                            No se encontraron peticiones de información catastral que coincidan con los filtros seleccionados.
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredMessages.length > 0 && (
              <div className="pt-4 border-t border-slate-850 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                <div>MOSTRANDO {filteredMessages.length} DE {totalCount} PETICIONES TOTALES</div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-500/70" />
                  <span>SISTEMA DE AUDITORÍA CATASTRAL SOBERANO OPERACIONAL</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
