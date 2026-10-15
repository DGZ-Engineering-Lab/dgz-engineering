"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Database } from "lucide-react";

export default function SystemMonitor() {
  const [apiStatus, setApiStatus] = useState("CONNECTING...");
  const [dbStatus, setDbStatus] = useState("PENDING");
  const [dbVersion, setDbVersion] = useState("");

  useEffect(() => {
    const API_URL = "https://devgiz-api.onrender.com";

    const checkSystem = async () => {
      try {
        const apiRes = await fetch(`${API_URL}/`);
        if (apiRes.ok) setApiStatus("ONLINE_NOMINAL");

        const dbRes = await fetch(`${API_URL}/health/db`);
        const dbData = await dbRes.json();
        
        if (dbData.status === "success") {
          setDbStatus("CONNECTED");
          setDbVersion(dbData.database_version.split(" on ")[0]);
        } else {
          setDbStatus("OFFLINE");
        }
      } catch (error) {
        setApiStatus("OFFLINE_CRITICAL");
        setDbStatus("OFFLINE_CRITICAL");
      }
    };

    checkSystem();
    const interval = setInterval(checkSystem, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="w-full max-w-md mx-auto mt-12 p-6 rounded-2xl border border-slate-800/60 bg-[#07070c]/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500"
    >
      {/* Patrón de Rejilla de Fondo Táctico */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none rounded-2xl" />
      
      {/* Brillo de Luz Diagonal (Refraction Sweep) */}
      <div className="absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      
      {/* Esquinas Tácticas Militares */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-md group-hover:border-cyan-400 transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40 rounded-br-md group-hover:border-cyan-400 transition-colors duration-500" />

      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800/60 relative z-10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h3 className="text-slate-200 font-mono text-xs tracking-widest font-black uppercase">SYSTEM_TELEMETRY</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9.5px] font-mono text-cyan-400/60 uppercase">Live link</span>
          <div className={`w-2 h-2 rounded-full ${apiStatus.includes("ONLINE") ? "bg-cyan-400 animate-ping" : "bg-red-500 animate-pulse"} shadow-[0_0_10px_rgba(6,182,212,0.5)]`} />
        </div>
      </div>
      
      <div className="space-y-4 font-mono text-[10px] relative z-10">
        <div className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-slate-900 group-hover:border-slate-800 transition-colors duration-300">
          <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-500" /> RENDER_API_STATUS:
          </span>
          <span className={`font-black tracking-widest ${apiStatus.includes("ONLINE") ? "text-cyan-400" : "text-red-400"}`}>
            {apiStatus}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-slate-900 group-hover:border-slate-800 transition-colors duration-300">
          <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-slate-500" /> NEON_DB_LINK:
          </span>
          <span className={`font-black tracking-widest ${dbStatus === "CONNECTED" ? "text-purple-400" : "text-amber-400"}`}>
            {dbStatus}
          </span>
        </div>

        {dbVersion && (
          <div className="flex justify-between items-center p-3 rounded-xl bg-black/20 border border-dashed border-slate-800/50">
            <span className="text-slate-500 uppercase tracking-wider">DB_KERNEL:</span>
            <span className="text-slate-300 truncate max-w-[220px] font-bold" title={dbVersion}>
              {dbVersion}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
