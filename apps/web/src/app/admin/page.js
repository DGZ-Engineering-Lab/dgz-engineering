"use client";

import { useState, useEffect } from "react";
import { 
  Activity, 
  Lock, 
  Unlock, 
  Search, 
  Trash2, 
  RefreshCw, 
  Cpu, 
  CheckCircle, 
  ExternalLink,
  ShieldAlert,
  Inbox,
  Clock,
  Briefcase,
  Terminal,
  LogOut,
  Download,
  AlertTriangle
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

  // AI Response Draft States
  const [aiDraftMsg, setAiDraftMsg] = useState(null);
  const [aiDraftText, setAiDraftText] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load passcode from session storage on mount to preserve session
  useEffect(() => {
    const savedPasscode = sessionStorage.getItem("dgz_admin_passcode");
    if (savedPasscode) {
      verifyAndFetch(savedPasscode);
    }
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
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
        sessionStorage.setItem("dgz_admin_passcode", codeToVerify);
        showToast("Access Granted. Secure connection established.", "success");
      } else {
        setAuthError(data.error || "Incorrect Passcode.");
        sessionStorage.removeItem("dgz_admin_passcode");
      }
    } catch (err) {
      setAuthError("Gateway connection failed.");
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
      setAuthError("Please enter your passcode.");
      return;
    }
    verifyAndFetch(passcode);
  };

  const handleLogout = () => {
    setPasscode("");
    setIsAuthorized(false);
    setMessages([]);
    sessionStorage.removeItem("dgz_admin_passcode");
    showToast("Session safely terminated.", "info");
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm("Are you sure you want to permanently resolve and delete this inquiry?")) {
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
        showToast("Inquiry successfully resolved and deleted.", "success");
      } else {
        showToast(data.error || "Failed to delete inquiry.", "error");
      }
    } catch (err) {
      showToast("Connection error during deletion.", "error");
    }
  };

  const handleDeleteAll = async () => {
    const confirmation = prompt("To confirm a complete wipe of the database, type 'dgz-wipe-all':");
    if (confirmation !== "dgz-wipe-all") {
      showToast("Action cancelled. Incorrect security code.", "error");
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
        showToast("Database successfully wiped.", "success");
      } else {
        showToast(data.error || "Failed to wipe database.", "error");
      }
    } catch (err) {
      showToast("Gateway communication failed.", "error");
    }
  };

  const handleRefresh = () => {
    verifyAndFetch(passcode);
  };

  // CSV Exporter for Tabulated Catastral Dataset
  const handleExportCSV = () => {
    if (filteredMessages.length === 0) {
      showToast("No data available to export.", "error");
      return;
    }

    const headers = ["ID", "Fecha", "Remitente", "Email", "Compania", "Sector", "Mensaje"];
    const rows = filteredMessages.map(msg => [
      msg.id || "",
      msg.timestamp ? new Date(msg.timestamp).toISOString() : "",
      `"${(msg.name || "").replace(/"/g, '""')}"`,
      `"${(msg.email || "").replace(/"/g, '""')}"`,
      `"${(msg.company || "").replace(/"/g, '""')}"`,
      getSector(msg),
      `"${(msg.message || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Add UTF-8 BOM for perfect Excel compatibility with Spanish characters
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `devgiz_crm_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV dataset successfully downloaded.", "success");
  };

  // AI Response Draft Generation using Groq Llama-3.3
  const handleGenerateAIDraft = async (msg) => {
    setAiDraftMsg(msg);
    setAiDraftText("");
    setIsGeneratingAI(true);
    setIsModalOpen(true);

    try {
      const sector = getSector(msg);
      const promptText = `Genera un correo formal de respuesta para ${msg.name} de ${msg.company === "N/A" || !msg.company ? "su consulta independiente" : msg.company} (Sector: ${sector}), que nos escribió lo siguiente: "${msg.message}". 
      Firma profesionalmente como el "Equipo de Operaciones de DevGiz Engineering".
      Muestra disposición para agendar una sesión de demostración técnica (demo) sobre nuestra plataforma de catastro LADM-COL v3.0 e inteligencia espacial. 
      Mantén un tono muy profesional, corporativo y persuasivo. Escribe el correo listo para copiar y pegar (no agregues saludos o descripciones extras tuyas, solo el cuerpo del correo).`;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: promptText,
          context: {
            name: msg.name,
            email: msg.email,
            company: msg.company,
            sector: sector,
            message: msg.message
          }
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAiDraftText(data.text);
      } else {
        setAiDraftText(`[Error System] ${data.error || "The AI Engine failed to respond."}`);
      }
    } catch (err) {
      setAiDraftText(`[Network Error] Unable to connect to Groq Llama-3.3: ${err.message}`);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleCopyDraft = () => {
    if (!aiDraftText) return;
    navigator.clipboard.writeText(aiDraftText);
    showToast("Draft successfully copied to clipboard.", "success");
  };

  // Helper to categorize sector by email domain or company name
  const getSector = (msg) => {
    const email = (msg.email || "").toLowerCase();
    const comp = (msg.company || "").toLowerCase();
    
    if (email.endsWith(".gov.co") || email.endsWith(".gov") || comp.includes("alcaldia") || comp.includes("gobierno") || comp.includes("ministerio") || comp.includes("igac")) {
      return "GOV";
    }
    if (comp.includes("s.a.") || comp.includes("sas") || comp.includes("constructora") || comp.includes("engineering") || comp.includes("corporativo") || comp.includes("coporation") || (msg.company && msg.company !== "N/A")) {
      return "CORP";
    }
    return "PUBLIC";
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
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
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 font-sans relative overflow-hidden pb-12 selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* Background Soft Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Toast Alert */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl border flex items-center gap-3 shadow-2xl backdrop-blur-xl transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${
          toast.type === "success" 
            ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300"
            : toast.type === "error"
            ? "bg-red-950/80 border-red-500/30 text-red-300"
            : "bg-slate-900/80 border-slate-700 text-slate-300"
        }`}>
          {toast.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Lock Screen View */}
      {!isAuthorized ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-6 relative z-10">
          <div className="w-full max-w-sm p-8 rounded-[2rem] border border-slate-800/60 bg-slate-900/40 backdrop-blur-2xl shadow-2xl space-y-8 relative overflow-hidden">
            
            {/* Header */}
            <div className="text-center space-y-3 relative z-10">
              <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-cyan-950 to-slate-900 border border-slate-700/50 rounded-2xl flex items-center justify-center text-slate-300 shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">DevGiz Gateway</h1>
                <p className="text-sm text-slate-400 font-medium">Please authenticate to continue</p>
              </div>
            </div>

            {/* Input Dial Screen */}
            <form onSubmit={handleKeypadSubmit} className="space-y-6 relative z-10">
              <div className="relative">
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-center text-xl font-mono tracking-[0.2em] text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600 placeholder:tracking-normal placeholder:font-sans"
                />
                {isLoading && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <Activity className="w-5 h-5 text-slate-400 animate-spin" />
                  </div>
                )}
              </div>

              {authError && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium flex items-center justify-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  {authError}
                </div>
              )}

              {/* Tactical Numeric Keypad Matrix */}
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleKeypadPress(String(num))}
                    className="py-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-800/80 active:scale-95 rounded-xl font-medium text-lg text-slate-300 transition-all cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleKeypadClear}
                  className="py-4 bg-slate-800/30 hover:bg-red-500/20 border border-slate-800/80 active:scale-95 rounded-xl font-semibold text-xs text-slate-400 hover:text-red-400 transition-all cursor-pointer uppercase tracking-wider"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress("0")}
                  className="py-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-800/80 active:scale-95 rounded-xl font-medium text-lg text-slate-300 transition-all cursor-pointer"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleKeypadDelete}
                  className="py-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-800/80 active:scale-95 rounded-xl font-semibold text-xs text-slate-400 transition-all cursor-pointer uppercase tracking-wider"
                >
                  Del
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Unlock Dashboard
                  <Unlock className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Authorized Administration Console View */
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 space-y-8 relative z-10">
          
          {/* Header Panel */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                Command Center
                <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-xs font-semibold tracking-wide text-cyan-400">
                  ADMIN
                </span>
              </h1>
              <p className="text-slate-400 text-sm font-medium">Manage inquiries, operations, and territorial correspondence.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-medium">
                <span className={`w-2 h-2 rounded-full ${storageType.includes("Simulation") ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]" : "bg-emerald-400 shadow-[0_0_8px_#34d399]"}`} />
                <span className="text-slate-400">Database:</span>
                <span className="text-slate-200">{storageType.includes("Simulation") ? "Local Buffer" : "Vercel KV"}</span>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-white cursor-pointer transition-all shadow-sm"
                title="Refresh Data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>

              <button
                onClick={handleLogout}
                className="p-2.5 bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 rounded-xl text-slate-400 hover:text-red-400 cursor-pointer transition-all shadow-sm"
                title="Secure Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metrics Telemetry HUD (Bento Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-sm shadow-sm flex flex-col gap-4 group">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                  <Inbox className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold tracking-tight text-white mb-1">{totalCount}</div>
                <div className="text-sm text-slate-400 font-medium">Total Inquiries</div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-sm shadow-sm flex flex-col gap-4 group">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold tracking-tight text-white mb-1">{govCount}</div>
                <div className="text-sm text-slate-400 font-medium flex items-center gap-2">
                  Government <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">{totalCount > 0 ? Math.round((govCount / totalCount) * 100) : 0}%</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-sm shadow-sm flex flex-col gap-4 group">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold tracking-tight text-white mb-1">{corpCount}</div>
                <div className="text-sm text-slate-400 font-medium flex items-center gap-2">
                  Corporate <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">{totalCount > 0 ? Math.round((corpCount / totalCount) * 100) : 0}%</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-sm shadow-sm flex flex-col gap-4 group">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-colors">
                  <Terminal className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold tracking-tight text-white mb-1 flex items-baseline gap-1">
                  {avgMessageLen} <span className="text-base font-normal text-slate-500">chars</span>
                </div>
                <div className="text-sm text-slate-400 font-medium">Avg Request Depth</div>
              </div>
            </div>
          </div>

          {/* Refined SVG Allocation Charts */}
          {totalCount > 0 && (() => {
            const publicCount = totalCount - govCount - corpCount;
            const govPct = govCount / totalCount;
            const corpPct = corpCount / totalCount;
            const publicPct = publicCount / totalCount;

            const r = 40;
            const circ = 2 * Math.PI * r;
            const govStrokeDash = govPct * circ;
            const corpStrokeDash = corpPct * circ;
            const publicStrokeDash = publicPct * circ;

            const govStrokeOffset = 0;
            const corpStrokeOffset = -govStrokeDash;
            const publicStrokeOffset = -(govStrokeDash + corpStrokeDash);

            return (
              <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden backdrop-blur-md">
                
                {/* Donut Chart - 4 cols */}
                <div className="md:col-span-3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0 relative">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg width="160" height="160" viewBox="0 0 100 100" className="drop-shadow-lg">
                      <circle cx="50" cy="50" r={r} fill="transparent" stroke="#1e293b" strokeWidth="10" />
                      {govStrokeDash > 0 && (
                        <circle cx="50" cy="50" r={r} fill="transparent" stroke="#fbbf24" strokeWidth="10" strokeDasharray={`${govStrokeDash} ${circ}`} strokeDashoffset={govStrokeOffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                      )}
                      {corpStrokeDash > 0 && (
                        <circle cx="50" cy="50" r={r} fill="transparent" stroke="#34d399" strokeWidth="10" strokeDasharray={`${corpStrokeDash} ${circ}`} strokeDashoffset={corpStrokeOffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                      )}
                      {publicStrokeDash > 0 && (
                        <circle cx="50" cy="50" r={r} fill="transparent" stroke="#22d3ee" strokeWidth="10" strokeDasharray={`${publicStrokeDash} ${circ}`} strokeDashoffset={publicStrokeOffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                      )}
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-bold tracking-tight text-white block leading-none">{totalCount}</span>
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mt-1">Total</span>
                    </div>
                  </div>
                </div>

                {/* Bar Chart & Legends - 8 cols */}
                <div className="md:col-span-9 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-300">Sector Distribution</h3>
                    
                    {/* Stacked Bar Meter */}
                    <div className="h-3 rounded-full overflow-hidden flex bg-slate-800">
                      {govPct > 0 && (
                        <div className="h-full bg-amber-400 transition-all duration-1000 ease-out" style={{ width: `${govPct * 100}%` }} title={`Government: ${Math.round(govPct * 100)}%`} />
                      )}
                      {corpPct > 0 && (
                        <div className="h-full bg-emerald-400 transition-all duration-1000 ease-out" style={{ width: `${corpPct * 100}%` }} title={`Corporate: ${Math.round(corpPct * 100)}%`} />
                      )}
                      {publicPct > 0 && (
                        <div className="h-full bg-cyan-400 transition-all duration-1000 ease-out" style={{ width: `${publicPct * 100}%` }} title={`Public: ${Math.round(publicPct * 100)}%`} />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Gov */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-amber-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-400">Government</div>
                        <div className="text-lg font-bold text-white">{govCount} <span className="text-xs text-slate-500 font-medium">({Math.round(govPct * 100)}%)</span></div>
                      </div>
                    </div>
                    {/* Corp */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-400">Corporate</div>
                        <div className="text-lg font-bold text-white">{corpCount} <span className="text-xs text-slate-500 font-medium">({Math.round(corpPct * 100)}%)</span></div>
                      </div>
                    </div>
                    {/* Public */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-cyan-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-400">Public</div>
                        <div className="text-lg font-bold text-white">{publicCount} <span className="text-xs text-slate-500 font-medium">({Math.round(publicPct * 100)}%)</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Operations Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl text-sm text-slate-200 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all placeholder:text-slate-500"
                placeholder="Search by name, company, or keyword..."
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-slate-800 mr-2">
                {['ALL', 'GOV', 'CORP', 'PUBLIC'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSectorFilter(filter)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      sectorFilter === filter 
                      ? 'bg-slate-700 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {filteredMessages.length > 0 && (
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 border border-transparent rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
              )}
            </div>
          </div>

          {/* Premium CRM Table View */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Organization</th>
                    <th className="px-6 py-4 w-1/3">Inquiry Details</th>
                    <th className="px-6 py-4 text-right">Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredMessages.map((msg, index) => {
                    const sector = getSector(msg);
                    return (
                      <tr key={msg.id || index} className="hover:bg-slate-800/30 transition-colors group">
                        
                        {/* Contact Col */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-sm shadow-inner shrink-0">
                              {getInitials(msg.name)}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-slate-200 font-bold truncate block">{msg.name}</span>
                              <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-cyan-400 transition-colors">
                                <span className="text-xs truncate block">{msg.email}</span>
                                <a href={`mailto:${msg.email}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Org Col */}
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-2 items-start">
                            <span className="text-slate-300 font-medium truncate max-w-[200px]" title={msg.company}>
                              {msg.company === "N/A" || !msg.company ? "Independent" : msg.company}
                            </span>
                            {sector === "GOV" && <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">Government</span>}
                            {sector === "CORP" && <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">Corporate</span>}
                            {sector === "PUBLIC" && <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Public</span>}
                          </div>
                        </td>

                        {/* Message Col */}
                        <td className="px-6 py-5">
                          <p className="text-slate-400 text-sm line-clamp-2 pr-4 leading-relaxed font-normal" title={msg.message}>
                            {msg.message}
                          </p>
                        </td>

                        {/* Date Col */}
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                          <div className="text-slate-300 font-medium">
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                          </div>
                          <div className="text-xs font-mono text-slate-500 mt-0.5">
                            {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""}
                          </div>
                        </td>

                        {/* Actions Col */}
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleGenerateAIDraft(msg)}
                              className="px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-xl transition-all font-medium text-xs flex items-center gap-2 cursor-pointer"
                              title="Draft AI Response"
                            >
                              <Cpu className="w-4 h-4" />
                              <span className="hidden lg:inline">AI Draft</span>
                            </button>

                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredMessages.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">
                        <div className="max-w-xs mx-auto space-y-3">
                          <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto text-slate-600">
                            <Inbox className="w-6 h-6" />
                          </div>
                          <h3 className="text-slate-300 font-medium">No records found</h3>
                          <p className="text-sm text-slate-500">Try adjusting your search query or filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            {filteredMessages.length > 0 && (
              <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/40 text-xs font-medium text-slate-500 flex justify-between items-center">
                <span>Showing {filteredMessages.length} of {totalCount} records</span>
                <span className="flex items-center gap-2 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4] animate-pulse" />
                  Systems Operational
                </span>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          {messages.length > 0 && (
            <div className="flex justify-end pt-4">
              <button
                onClick={handleDeleteAll}
                className="text-xs font-medium text-slate-600 hover:text-red-400 underline decoration-slate-700 hover:decoration-red-500/50 transition-colors cursor-pointer"
              >
                Clear entire database
              </button>
            </div>
          )}

          {/* Premium Glassmorphic AI Response Modal */}
          {isModalOpen && aiDraftMsg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => !isGeneratingAI && setIsModalOpen(false)} />
              
              <div className="relative w-full max-w-2xl bg-[#0f1117] border border-slate-800 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="px-6 py-5 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-200">AI Response Assistant</h2>
                      <p className="text-xs text-slate-500 font-medium">Powered by Llama-3.3-70b-versatile</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    disabled={isGeneratingAI}
                    className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    Close
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                  {/* Context Block */}
                  <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800/50">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Replying To</div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-slate-300">{aiDraftMsg.name}</span>
                      <span className="text-sm text-slate-500">&lt;{aiDraftMsg.email}&gt;</span>
                    </div>
                    <p className="text-sm text-slate-400 italic border-l-2 border-slate-700 pl-3 mt-3 py-1">
                      "{aiDraftMsg.message}"
                    </p>
                  </div>

                  {/* Editor Block */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Draft Content</div>
                    <div className="relative">
                      {isGeneratingAI ? (
                        <div className="h-64 bg-[#0a0c10] rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4">
                          <div className="flex gap-2">
                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <p className="text-sm font-medium text-slate-400">Synthesizing professional response...</p>
                        </div>
                      ) : (
                        <textarea
                          readOnly
                          value={aiDraftText}
                          className="w-full h-64 p-5 bg-[#0a0c10] border border-slate-800 rounded-2xl text-sm text-slate-300 leading-relaxed focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all custom-scrollbar resize-none selection:bg-indigo-500/30"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-5 border-t border-slate-800/60 bg-slate-900/30 flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCopyDraft}
                    disabled={isGeneratingAI || !aiDraftText}
                    className="px-6 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-sm font-bold transition-all disabled:opacity-50 shadow-sm cursor-pointer"
                  >
                    Copy Draft
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
