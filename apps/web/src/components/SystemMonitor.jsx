"use client";

import { useEffect, useState } from "react";

export default function SystemMonitor() {
  const [apiStatus, setApiStatus] = useState("CONNECTING...");
  const [dbStatus, setDbStatus] = useState("PENDING");
  const [dbVersion, setDbVersion] = useState("");

  useEffect(() => {
    // Definimos la URL de nuestra API alojada en Render
    const API_URL = "https://devgiz-api.onrender.com";

    const checkSystem = async () => {
      try {
        // Chequeo de salud general de la API
        const apiRes = await fetch(`${API_URL}/`);
        if (apiRes.ok) setApiStatus("ONLINE_NOMINAL");

        // Chequeo de conexión con Neon DB
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
    // Re-check cada 30 segundos (opcional para mantener viva la instancia gratuita de Render)
    const interval = setInterval(checkSystem, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-12 p-6 rounded-xl border border-slate-800 bg-black/40 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
        <h3 className="text-slate-300 font-mono text-sm">SYSTEM_TELEMETRY</h3>
        <div className={`w-2 h-2 rounded-full ${apiStatus.includes("ONLINE") ? "bg-cyan-400 animate-pulse" : "bg-red-500"}`} />
      </div>
      
      <div className="space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">RENDER_API_STATUS:</span>
          <span className={apiStatus.includes("ONLINE") ? "text-cyan-400" : "text-red-400"}>
            [{apiStatus}]
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-500">NEON_DB_LINK:</span>
          <span className={dbStatus === "CONNECTED" ? "text-purple-400" : "text-amber-400"}>
            [{dbStatus}]
          </span>
        </div>

        {dbVersion && (
          <div className="flex justify-between items-center">
            <span className="text-slate-500">DB_KERNEL:</span>
            <span className="text-slate-300 truncate max-w-[200px]" title={dbVersion}>
              {dbVersion}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
