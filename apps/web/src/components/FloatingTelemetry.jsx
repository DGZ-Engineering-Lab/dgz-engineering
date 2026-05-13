"use client";

import { useEffect, useState } from "react";

export default function FloatingTelemetry() {
  const [time, setTime] = useState("");
  const [load, setLoad] = useState(12);
  const [activeNodes, setActiveNodes] = useState(1240);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/telemetry");
        const data = await res.json();
        if (data.activeNodes) setActiveNodes(data.activeNodes);
      } catch (e) {
        console.error("Telemetry fetch failed");
      }
    };

    fetchData();
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
      setLoad(Math.floor(Math.random() * (25 - 10) + 10));
      if (now.getSeconds() % 10 === 0) fetchData();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none hidden md:block">
      <div className="flex flex-col gap-1 p-4 rounded-lg bg-black/60 border border-cyan-500/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-cyan-400 tracking-[0.2em]">SYSTEM_LIVE</span>
        </div>
        
        <div className="mt-2 space-y-1">
          <div className="flex justify-between gap-8 text-[9px] font-mono text-slate-500 uppercase">
            <span>Uplink_Time</span>
            <span className="text-white">{time}</span>
          </div>
          <div className="flex justify-between gap-8 text-[9px] font-mono text-slate-500 uppercase">
            <span>Local_Node</span>
            <span className="text-white">MEDELLÍN_HQ</span>
          </div>
          <div className="flex justify-between gap-8 text-[9px] font-mono text-slate-500 uppercase">
            <span>Core_Load</span>
            <span className="text-white">{load}%</span>
          </div>
          <div className="flex justify-between gap-8 text-[9px] font-mono text-slate-500 uppercase">
            <span>Encryption</span>
            <span className="text-emerald-400">DGZ_SECURE</span>
          </div>
          <div className="flex justify-between gap-8 text-[9px] font-mono text-slate-500 uppercase border-t border-slate-800 pt-1 mt-1">
            <span>Active_Nodes</span>
            <span className="text-cyan-400 font-bold">{activeNodes}</span>
          </div>
        </div>

        <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 transition-all duration-1000 ease-out"
            style={{ width: `${load * 2}%` }}
          />
        </div>
      </div>
    </div>
  );
}
