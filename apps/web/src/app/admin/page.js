"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  AlertTriangle,
  Shield,
  Eye,
  EyeOff,
  Timer,
  Fingerprint,
  Mail,
  ChevronRight,
  X
} from "lucide-react";

// ─── SECURITY CONSTANTS (mirror backend) ────────────────────────────────────────
const MAX_ATTEMPTS = 5;
const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // Check session every 5 min
const INACTIVITY_TIMEOUT = 30 * 60 * 1000;    // Auto-logout after 30 min idle

export default function AdminPage() {
  // Auth state
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [attemptsRemaining, setAttemptsRemaining] = useState(MAX_ATTEMPTS);
  const [isLocked, setIsLocked] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(0);

  // Data state
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [storageType, setStorageType] = useState("Connecting...");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // AI Draft state
  const [aiDraftMsg, setAiDraftMsg] = useState(null);
  const [aiDraftText, setAiDraftText] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mobile detail drawer
  const [selectedMsg, setSelectedMsg] = useState(null);

  // Inactivity tracking
  const lastActivityRef = useRef(Date.now());
  const inactivityTimerRef = useRef(null);

  // Escape cierra el modal de IA o el panel de detalle móvil
  useEffect(() => {
    if (!isModalOpen && !selectedMsg) return;
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (isModalOpen && !isGeneratingAI) setIsModalOpen(false);
      else if (selectedMsg) setSelectedMsg(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, selectedMsg, isGeneratingAI]);

  // ─── SESSION MANAGEMENT ─────────────────────────────────────────────────────

  // Restore session on mount — silently clear if expired
  useEffect(() => {
    const token = sessionStorage.getItem("dgz_session_token");
    if (token) {
      // Try restoring the session; if 401, silently clear without penalizing
      (async () => {
        try {
          const res = await fetch("/api/admin/messages", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok && data.success) {
            setSessionToken(token);
            setMessages(data.messages);
            setStorageType(data.storage);
            setIsAuthorized(true);
          } else {
            // Session expired — silently clear, show login screen
            sessionStorage.removeItem("dgz_session_token");
          }
        } catch (e) {
          sessionStorage.removeItem("dgz_session_token");
        }
      })();
    }
  }, []);

  // Inactivity auto-logout
  useEffect(() => {
    if (!isAuthorized) return;

    const resetActivity = () => { lastActivityRef.current = Date.now(); };
    const events = ["mousedown", "keydown", "touchstart", "scroll"];
    events.forEach(e => window.addEventListener(e, resetActivity, { passive: true }));

    inactivityTimerRef.current = setInterval(() => {
      if (Date.now() - lastActivityRef.current > INACTIVITY_TIMEOUT) {
        handleLogout("Session expired due to inactivity.");
      }
    }, 60_000);

    return () => {
      events.forEach(e => window.removeEventListener(e, resetActivity));
      clearInterval(inactivityTimerRef.current);
    };
  }, [isAuthorized]);

  // Lockout countdown timer
  useEffect(() => {
    if (!isLocked || lockCountdown <= 0) return;
    const timer = setInterval(() => {
      setLockCountdown(prev => {
        if (prev <= 1) {
          setIsLocked(false);
          setAttemptsRemaining(MAX_ATTEMPTS);
          setAuthError("");
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isLocked, lockCountdown]);

  // ─── TOAST ──────────────────────────────────────────────────────────────────

  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  }, []);

  // ─── AUTH: Login via POST (issues session token) ────────────────────────────

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!passcode.trim()) {
      setAuthError("Please enter your passcode.");
      return;
    }
    if (isLocked) return;

    setIsLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() })
      });
      const data = await res.json();

      if (data.locked) {
        setIsLocked(true);
        setLockCountdown(15 * 60);
        setAuthError("Too many failed attempts. Account locked for 15 minutes.");
        setAttemptsRemaining(0);
        return;
      }

      if (res.ok && data.success && data.sessionToken) {
        setSessionToken(data.sessionToken);
        sessionStorage.setItem("dgz_session_token", data.sessionToken);
        setIsAuthorized(true);
        setPasscode("");
        setAttemptsRemaining(MAX_ATTEMPTS);
        showToast("Secure session established.", "success");
        fetchMessages(data.sessionToken);
      } else {
        const remaining = data.remaining ?? (attemptsRemaining - 1);
        setAttemptsRemaining(remaining);
        setAuthError(data.error || "Invalid passcode.");
        if (remaining <= 0) {
          setIsLocked(true);
          setLockCountdown(15 * 60);
        }
      }
    } catch (err) {
      setAuthError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── FETCH MESSAGES ─────────────────────────────────────────────────────────

  const fetchMessages = async (token) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessages(data.messages);
        setStorageType(data.storage);
        setIsAuthorized(true);
      } else if (res.status === 401) {
        handleLogout("Session expired. Please log in again.");
      }
    } catch (err) {
      showToast("Failed to fetch data.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── LOGOUT ─────────────────────────────────────────────────────────────────

  const handleLogout = useCallback((reason) => {
    setPasscode("");
    setIsAuthorized(false);
    setSessionToken(null);
    setMessages([]);
    sessionStorage.removeItem("dgz_session_token");
    if (reason) showToast(reason, "info");
  }, [showToast]);

  // ─── DELETE MESSAGE ─────────────────────────────────────────────────────────

  const handleDeleteMessage = async (id) => {
    if (!confirm("Permanently delete this record?")) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${sessionToken}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages(prev => prev.filter(msg => msg.id !== id));
        setSelectedMsg(null);
        showToast("Record deleted.", "success");
      } else {
        showToast(data.error || "Delete failed.", "error");
      }
    } catch (err) {
      showToast("Connection error.", "error");
    }
  };

  // ─── DELETE ALL ─────────────────────────────────────────────────────────────

  const handleDeleteAll = async () => {
    const code = prompt("Type 'dgz-wipe-all' to confirm total database wipe:");
    if (code !== "dgz-wipe-all") {
      showToast("Action cancelled.", "error");
      return;
    }
    try {
      const res = await fetch("/api/admin/messages?id=all", {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${sessionToken}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages([]);
        showToast("Database wiped.", "success");
      }
    } catch (err) {
      showToast("Network error.", "error");
    }
  };

  // ─── CSV EXPORT ─────────────────────────────────────────────────────────────

  const handleExportCSV = () => {
    if (filteredMessages.length === 0) return;
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
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devgiz_crm_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("CSV exported.", "success");
  };

  // ─── AI DRAFT ───────────────────────────────────────────────────────────────

  const handleGenerateAIDraft = async (msg) => {
    setAiDraftMsg(msg);
    setAiDraftText("");
    setIsGeneratingAI(true);
    setIsModalOpen(true);
    try {
      const sector = getSector(msg);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Genera un correo formal de respuesta para ${msg.name} de ${!msg.company || msg.company === "N/A" ? "su consulta" : msg.company} (Sector: ${sector}), que nos escribió: "${msg.message}". Firma como "Equipo de Operaciones de DevGiz Engineering". Ofrece agendar una demo de catastro LADM-COL v3.0. Tono profesional y persuasivo. Solo el cuerpo del correo.`,
          context: { name: msg.name, email: msg.email, company: msg.company, sector, message: msg.message }
        })
      });
      const data = await res.json();
      setAiDraftText(res.ok && data.success ? data.text : `[Error] ${data.error || "AI failed."}`);
    } catch (err) {
      setAiDraftText(`[Network Error] ${err.message}`);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleCopyDraft = () => {
    if (!aiDraftText) return;
    navigator.clipboard.writeText(aiDraftText);
    showToast("Copied to clipboard.", "success");
  };

  // ─── HELPERS ────────────────────────────────────────────────────────────────

  const getSector = (msg) => {
    const email = (msg.email || "").toLowerCase();
    const comp = (msg.company || "").toLowerCase();
    if (email.endsWith(".gov.co") || email.endsWith(".gov") || comp.includes("alcaldia") || comp.includes("gobierno") || comp.includes("ministerio") || comp.includes("igac"))
      return "GOV";
    if (comp.includes("s.a.") || comp.includes("sas") || comp.includes("constructora") || comp.includes("engineering") || comp.includes("corporativo") || (msg.company && msg.company !== "N/A"))
      return "CORP";
    return "PUBLIC";
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const formatLockTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const filteredMessages = messages.filter(msg => {
    const term = searchTerm.toLowerCase();
    const match = [msg.name, msg.email, msg.company, msg.message].some(f => (f || "").toLowerCase().includes(term));
    return sectorFilter === "ALL" ? match : match && getSector(msg) === sectorFilter;
  });

  const totalCount = messages.length;
  const govCount = messages.filter(m => getSector(m) === "GOV").length;
  const corpCount = messages.filter(m => getSector(m) === "CORP").length;
  const publicCount = totalCount - govCount - corpCount;

  // Keypad handler
  const handleKeypadPress = (val) => {
    setAuthError("");
    if (passcode.length < 24) setPasscode(prev => prev + val);
  };

  // ─── SECTOR BADGE ──────────────────────────────────────────────────────────

  const SectorBadge = ({ sector }) => {
    const styles = {
      GOV: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      CORP: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      PUBLIC: "bg-slate-800 text-slate-300 border-slate-700"
    };
    const labels = { GOV: "Government", CORP: "Corporate", PUBLIC: "Public" };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[sector] || styles.PUBLIC}`}>
        {labels[sector] || "Public"}
      </span>
    );
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 font-sans relative overflow-hidden selection:bg-cyan-500/30">

      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Toast */}
      {toast.show && (
        <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[60] px-4 py-3 rounded-2xl border flex items-center gap-3 shadow-2xl backdrop-blur-xl ${
          toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-300"
          : toast.type === "error" ? "bg-red-950/90 border-red-500/30 text-red-300"
          : "bg-slate-900/90 border-slate-700 text-slate-300"
        }`}>
          {toast.type === "success" ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
          <span className="text-sm font-medium flex-1">{toast.message}</span>
        </div>
      )}

      {/* ═══════ LOCK SCREEN ═══════ */}
      {!isAuthorized ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 relative z-10">
          <div className="w-full max-w-sm space-y-6">

            {/* Security Shield Header */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-3xl flex items-center justify-center shadow-lg">
                {isLocked ? (
                  <Timer className="w-7 h-7 text-red-400 animate-pulse" />
                ) : (
                  <Shield className="w-7 h-7 text-slate-300" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">DevGiz Admin</h1>
                <p className="text-sm text-slate-500 mt-1">Secure Enterprise Gateway</p>
              </div>
            </div>

            {/* Auth Card */}
            <div className="rounded-[2rem] border border-slate-800/60 bg-slate-900/40 backdrop-blur-2xl shadow-2xl overflow-hidden">
              <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">

                {/* Lockout Banner */}
                {isLocked && (
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-red-400">
                      <ShieldAlert className="w-5 h-5" />
                      <span className="text-sm font-bold">Security Lockout Active</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-red-300 tracking-wider">
                      {formatLockTime(lockCountdown)}
                    </div>
                    <p className="text-xs text-red-400/60">Too many failed attempts. Please wait.</p>
                  </div>
                )}

                {/* Passcode Input */}
                <div className="relative">
                  <input
                    type={showPasscode ? "text" : "password"}
                    value={passcode}
                    onChange={(e) => { setPasscode(e.target.value); setAuthError(""); }}
                    placeholder={isLocked ? "Locked" : "Enter passcode"}
                    aria-label="Admin passcode"
                    disabled={isLocked}
                    maxLength={24}
                    autoComplete="off"
                    className="w-full px-5 py-4 bg-slate-950/60 border border-slate-800 rounded-2xl text-center text-lg font-mono tracking-[0.15em] text-white focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-slate-600 placeholder:tracking-normal placeholder:font-sans disabled:opacity-40 pr-20"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
                      aria-pressed={showPasscode}
                      className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
                      tabIndex={-1}
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    {isLoading && <Activity className="w-4 h-4 text-slate-400 animate-spin" />}
                  </div>
                </div>

                {/* Error */}
                {authError && !isLocked && (
                  <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-red-400">{authError}</p>
                      {attemptsRemaining < MAX_ATTEMPTS && attemptsRemaining > 0 && (
                        <p className="text-xs text-red-400/60 mt-0.5">{attemptsRemaining} attempt{attemptsRemaining !== 1 ? 's' : ''} remaining</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Numeric Keypad */}
                <div className="grid grid-cols-3 gap-2.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                    <button key={n} type="button" onClick={() => handleKeypadPress(String(n))} disabled={isLocked}
                      className="py-3.5 sm:py-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-800/80 active:scale-95 rounded-xl font-medium text-lg text-slate-300 transition-all cursor-pointer disabled:opacity-30"
                    >{n}</button>
                  ))}
                  <button type="button" onClick={() => { setPasscode(""); setAuthError(""); }} disabled={isLocked}
                    className="py-3.5 sm:py-4 bg-slate-800/30 hover:bg-red-500/15 border border-slate-800/80 active:scale-95 rounded-xl font-semibold text-xs text-slate-400 hover:text-red-400 transition-all cursor-pointer uppercase tracking-wider disabled:opacity-30"
                  >Clear</button>
                  <button type="button" onClick={() => handleKeypadPress("0")} disabled={isLocked}
                    className="py-3.5 sm:py-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-800/80 active:scale-95 rounded-xl font-medium text-lg text-slate-300 transition-all cursor-pointer disabled:opacity-30"
                  >0</button>
                  <button type="button" onClick={() => setPasscode(p => p.slice(0, -1))} disabled={isLocked}
                    className="py-3.5 sm:py-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-800/80 active:scale-95 rounded-xl font-semibold text-xs text-slate-400 transition-all cursor-pointer uppercase tracking-wider disabled:opacity-30"
                  >Del</button>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoading || isLocked}
                  className="w-full py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl transition-all cursor-pointer active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                >
                  <Unlock className="w-4 h-4" />
                  Authenticate
                </button>
              </form>

              {/* Security Footer */}
              <div className="px-6 sm:px-8 py-4 border-t border-slate-800/40 bg-slate-950/30">
                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Encrypted</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="flex items-center gap-1"><Fingerprint className="w-3 h-3" /> Fingerprinted</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> Rate Limited</span>
                </div>
              </div>
            </div>

            {/* Attempts Indicator */}
            {!isLocked && (
              <div className="flex justify-center gap-1.5">
                {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < attemptsRemaining ? "bg-emerald-500/40" : "bg-red-500/60"}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ═══════ DASHBOARD ═══════ */
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8 relative z-10 pb-20 sm:pb-12">

          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-800">
            <div className="space-y-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3 flex-wrap">
                Command Center
                <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-[10px] font-bold tracking-wider text-cyan-400">ADMIN</span>
              </h1>
              <p className="text-slate-500 text-sm">Manage inquiries, operations, and correspondence.</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium">
                <span className={`w-2 h-2 rounded-full ${storageType.includes("Simulation") ? "bg-amber-400" : "bg-emerald-400"}`} />
                <span className="text-slate-400">{storageType.includes("Simulation") ? "Local" : "KV"}</span>
              </div>
              <button onClick={() => fetchMessages(sessionToken)} disabled={isLoading} title="Refresh" aria-label="Refresh messages"
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-white cursor-pointer transition-all">
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>
              <button onClick={() => handleLogout("Session ended.")} title="Logout" aria-label="Log out"
                className="p-2.5 bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 rounded-xl text-slate-400 hover:text-red-400 cursor-pointer transition-all">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metrics (Bento Grid) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Total", value: totalCount, icon: Inbox, color: "cyan" },
              { label: "Government", value: govCount, icon: Clock, color: "amber", pct: totalCount > 0 ? Math.round((govCount / totalCount) * 100) : 0 },
              { label: "Corporate", value: corpCount, icon: Briefcase, color: "emerald", pct: totalCount > 0 ? Math.round((corpCount / totalCount) * 100) : 0 },
              { label: "Avg Depth", value: totalCount > 0 ? Math.round(messages.reduce((a, m) => a + (m.message || "").length, 0) / totalCount) : 0, icon: Terminal, color: "purple", suffix: "ch" }
            ].map(({ label, value, icon: Icon, color, pct, suffix }) => (
              <div key={label} className="p-4 sm:p-6 bg-slate-900/50 border border-slate-800 rounded-2xl sm:rounded-3xl backdrop-blur-sm group">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-${color}-500/10 group-hover:text-${color}-400 transition-colors mb-3 sm:mb-4`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  {value}{suffix && <span className="text-sm sm:text-base font-normal text-slate-500 ml-1">{suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
                  {label}
                  {pct !== undefined && <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded-full">{pct}%</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Sector Distribution Bar */}
          {totalCount > 0 && (
            <div className="p-4 sm:p-6 bg-slate-900/40 border border-slate-800 rounded-2xl sm:rounded-3xl space-y-3">
              <h3 className="text-sm font-semibold text-slate-300">Sector Distribution</h3>
              <div className="h-2.5 sm:h-3 rounded-full overflow-hidden flex bg-slate-800">
                {govCount > 0 && <div className="h-full bg-amber-400 transition-all duration-700" style={{ width: `${(govCount / totalCount) * 100}%` }} />}
                {corpCount > 0 && <div className="h-full bg-emerald-400 transition-all duration-700" style={{ width: `${(corpCount / totalCount) * 100}%` }} />}
                {publicCount > 0 && <div className="h-full bg-cyan-400 transition-all duration-700" style={{ width: `${(publicCount / totalCount) * 100}%` }} />}
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 text-xs">
                {[
                  { label: "Government", count: govCount, color: "bg-amber-400" },
                  { label: "Corporate", count: corpCount, color: "bg-emerald-400" },
                  { label: "Public", count: publicCount, color: "bg-cyan-400" }
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                    <span className="text-slate-400">{s.label}</span>
                    <span className="font-bold text-slate-200">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="search" aria-label="Search messages" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl text-sm text-slate-200 focus:outline-none focus:border-slate-600 transition-all placeholder:text-slate-500"
                placeholder="Search..."
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800">
                {["ALL", "GOV", "CORP", "PUBLIC"].map(f => (
                  <button key={f} type="button" aria-pressed={sectorFilter === f} onClick={() => setSectorFilter(f)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap ${sectorFilter === f ? "bg-slate-700 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
                  >{f === "ALL" ? "All" : f === "GOV" ? "Gov" : f === "CORP" ? "Corp" : "Public"}</button>
                ))}
              </div>
              {filteredMessages.length > 0 && (
                <button onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold shadow-sm shrink-0 cursor-pointer">
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              )}
            </div>
          </div>

          {/* ═══ DESKTOP TABLE (hidden on mobile) ═══ */}
          <div className="hidden md:block bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold text-xs">
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Organization</th>
                    <th className="px-6 py-4 w-1/3">Inquiry</th>
                    <th className="px-6 py-4 text-right">Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredMessages.map((msg, i) => {
                    const sector = getSector(msg);
                    return (
                      <tr key={msg.id || i} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-sm shrink-0">
                              {getInitials(msg.name)}
                            </div>
                            <div className="min-w-0">
                              <div className="text-slate-200 font-bold truncate">{msg.name}</div>
                              <div className="text-xs text-slate-500 truncate flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                                {msg.email}
                                <a href={`mailto:${msg.email}`} aria-label={`Escribir a ${msg.email}`} className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"><ExternalLink className="w-3 h-3" /></a>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="space-y-1.5">
                            <div className="text-slate-300 font-medium truncate max-w-[180px]">{!msg.company || msg.company === "N/A" ? "Independent" : msg.company}</div>
                            <SectorBadge sector={sector} />
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{msg.message}</p>
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                          <div className="text-slate-300 font-medium text-sm">{msg.timestamp ? new Date(msg.timestamp).toLocaleDateString("es-CO", { month: "short", day: "numeric" }) : "N/A"}</div>
                          <div className="text-xs font-mono text-slate-500">{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }) : ""}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                            <button onClick={() => handleGenerateAIDraft(msg)} title="AI Draft" aria-label={`AI draft reply to ${msg.name}`}
                              className="px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all">
                              <Cpu className="w-3.5 h-3.5" /><span className="hidden lg:inline">AI Draft</span>
                            </button>
                            <button onClick={() => handleDeleteMessage(msg.id)} title="Delete" aria-label={`Delete message from ${msg.name}`}
                              className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl cursor-pointer transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredMessages.length === 0 && (
                    <tr><td colSpan="5" className="px-6 py-16 text-center">
                      <Inbox className="w-8 h-8 mx-auto text-slate-700 mb-3" />
                      <h3 className="text-slate-300 font-medium">No records found</h3>
                      <p className="text-sm text-slate-500 mt-1">Adjust your search or filters.</p>
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {filteredMessages.length > 0 && (
              <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/40 text-xs text-slate-500 flex justify-between items-center">
                <span>{filteredMessages.length} of {totalCount} records</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" /> Operational</span>
              </div>
            )}
          </div>

          {/* ═══ MOBILE CARD LIST (hidden on desktop) ═══ */}
          <div className="md:hidden space-y-3">
            {filteredMessages.length === 0 && (
              <div className="py-12 text-center">
                <Inbox className="w-8 h-8 mx-auto text-slate-700 mb-3" />
                <h3 className="text-slate-300 font-medium">No records</h3>
              </div>
            )}
            {filteredMessages.map((msg, i) => {
              const sector = getSector(msg);
              return (
                <button key={msg.id || i} onClick={() => setSelectedMsg(msg)}
                  className="w-full text-left p-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-800/40 transition-colors active:scale-[0.99] cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-sm shrink-0">
                      {getInitials(msg.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-200 font-bold text-sm truncate">{msg.name}</span>
                        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <SectorBadge sector={sector} />
                        <span className="text-[10px] text-slate-500">{msg.timestamp ? new Date(msg.timestamp).toLocaleDateString("es-CO", { month: "short", day: "numeric" }) : ""}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </button>
              );
            })}
            {filteredMessages.length > 0 && (
              <div className="text-center text-xs text-slate-600 pt-2">{filteredMessages.length} of {totalCount} records</div>
            )}
          </div>

          {/* ═══ MOBILE DETAIL DRAWER ═══ */}
          {selectedMsg && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div aria-hidden="true" className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedMsg(null)} />
              <div role="dialog" aria-modal="true" aria-label={`Message from ${selectedMsg.name}`} className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-[#0f1117] border-t border-slate-800 rounded-t-[2rem] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                {/* Handle */}
                <div className="flex justify-center py-3"><div className="w-10 h-1 bg-slate-700 rounded-full" /></div>
                <div className="px-5 pb-8 space-y-5">
                  {/* Contact Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-lg">
                      {getInitials(selectedMsg.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">{selectedMsg.name}</h3>
                      <p className="text-sm text-slate-400 truncate">{selectedMsg.email}</p>
                      <div className="mt-1.5"><SectorBadge sector={getSector(selectedMsg)} /></div>
                    </div>
                  </div>

                  {/* Company */}
                  {selectedMsg.company && selectedMsg.company !== "N/A" && (
                    <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/50">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Organization</div>
                      <div className="text-sm text-slate-200 font-medium">{selectedMsg.company}</div>
                    </div>
                  )}

                  {/* Message */}
                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800/50">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-2">Message</div>
                    <p className="text-sm text-slate-300 leading-relaxed">{selectedMsg.message}</p>
                  </div>

                  {/* Date */}
                  <div className="text-xs text-slate-500">
                    {selectedMsg.timestamp ? new Date(selectedMsg.timestamp).toLocaleString("es-CO", { dateStyle: "long", timeStyle: "short" }) : "No date"}
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <a href={`mailto:${selectedMsg.email}`}
                      className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-medium text-slate-200 transition-all">
                      <Mail className="w-4 h-4" /> Reply
                    </a>
                    <button onClick={() => { setSelectedMsg(null); handleGenerateAIDraft(selectedMsg); }}
                      className="flex items-center justify-center gap-2 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-xl text-sm font-medium text-indigo-400 cursor-pointer transition-all">
                      <Cpu className="w-4 h-4" /> AI Draft
                    </button>
                  </div>
                  <button onClick={() => { handleDeleteMessage(selectedMsg.id); }}
                    className="w-full py-3 text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer">
                    Delete Record
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone */}
          {messages.length > 0 && (
            <div className="flex justify-end">
              <button onClick={handleDeleteAll}
                className="text-xs text-slate-600 hover:text-red-400 underline decoration-slate-700 hover:decoration-red-500/50 cursor-pointer transition-colors">
                Clear entire database
              </button>
            </div>
          )}

          {/* ═══ AI MODAL ═══ */}
          {isModalOpen && aiDraftMsg && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
              <div aria-hidden="true" className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => !isGeneratingAI && setIsModalOpen(false)} />
              <div role="dialog" aria-modal="true" aria-labelledby="ai-modal-title" className="relative w-full sm:max-w-2xl bg-[#0f1117] border border-slate-800 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[80vh]">
                {/* Header */}
                <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-800/60 bg-slate-900/30 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 id="ai-modal-title" className="text-sm sm:text-base font-bold text-slate-200">AI Response</h2>
                      <p className="text-[10px] sm:text-xs text-slate-500">Llama-3.3-70b</p>
                    </div>
                  </div>
                  <button type="button" aria-label="Close" autoFocus onClick={() => setIsModalOpen(false)} disabled={isGeneratingAI}
                    className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-xl cursor-pointer disabled:opacity-50 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 overflow-y-auto">
                  <div className="bg-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-800/50">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5">Replying To</div>
                    <div className="text-sm font-bold text-slate-300">{aiDraftMsg.name} <span className="font-normal text-slate-500">&lt;{aiDraftMsg.email}&gt;</span></div>
                    <p className="text-xs sm:text-sm text-slate-400 italic border-l-2 border-slate-700 pl-3 mt-2 line-clamp-3">"{aiDraftMsg.message}"</p>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-2">Draft</div>
                    {isGeneratingAI ? (
                      <div className="h-48 sm:h-64 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-3">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                        <p className="text-sm text-slate-400">Generating response...</p>
                      </div>
                    ) : (
                      <textarea readOnly aria-label="AI draft reply" value={aiDraftText}
                        className="w-full h-48 sm:h-64 p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-300 leading-relaxed focus:outline-none resize-none" />
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 sm:px-6 py-4 border-t border-slate-800/60 bg-slate-900/30 flex justify-end gap-3 shrink-0">
                  <button onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl cursor-pointer transition-all">Cancel</button>
                  <button onClick={handleCopyDraft} disabled={isGeneratingAI || !aiDraftText}
                    className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-sm font-bold disabled:opacity-40 shadow-sm cursor-pointer transition-all">
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
