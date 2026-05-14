"use client";

import React from "react";

const EntityLogos = () => {
  return (
    <div className="mt-32 pt-16 border-t border-slate-800/50 relative">
      {/* Header Label */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-[#02040a]">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] flex items-center gap-4">
          <span className="w-12 h-[1px] bg-slate-800"></span>
          Arquitectura de Interoperabilidad Global
          <span className="w-12 h-[1px] bg-slate-800"></span>
        </span>
      </div>

      {/* Tech Stack Grid (From User Snippet) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {/* Backend Card */}
        <div className="group relative flex flex-col items-center">
          <div className="relative z-20 w-full p-8 rounded-2xl bg-[#050810] border border-slate-800 group-hover:border-blue-500/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black font-mono text-blue-400">B</div>
              <div className="h-8 w-[1px] bg-slate-800"></div>
              <div className="text-xl font-bold text-white tracking-tight">Backend</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed opacity-80">Motor de procesamiento geoespacial asíncrono.</p>
          </div>
          <div className="w-full max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 overflow-hidden mt-4 space-y-2 px-2">
            {["FastAPI", "GeoPandas", "SQLAlchemy"].map((t, i) => (
              <div key={t} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-blue-500/10 transition-all">
                <span className="text-blue-400 text-xs font-bold">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frontend Card */}
        <div className="group relative flex flex-col items-center">
          <div className="relative z-20 w-full p-8 rounded-2xl bg-[#050810] border border-slate-800 group-hover:border-emerald-500/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(52,211,153,0.1)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black font-mono text-emerald-400">F</div>
              <div className="h-8 w-[1px] bg-slate-800"></div>
              <div className="text-xl font-bold text-white tracking-tight">Frontend</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed opacity-80">Experiencia de usuario inmersiva y reactiva.</p>
          </div>
          <div className="w-full max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 overflow-hidden mt-4 space-y-2 px-2">
            {["Next.js 15", "Anime.js", "Tailwind"].map((t, i) => (
              <div key={t} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-emerald-500/10 transition-all">
                <span className="text-emerald-400 text-xs font-bold">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Database Card */}
        <div className="group relative flex flex-col items-center">
          <div className="relative z-20 w-full p-8 rounded-2xl bg-[#050810] border border-slate-800 group-hover:border-amber-500/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.1)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black font-mono text-amber-400">D</div>
              <div className="h-8 w-[1px] bg-slate-800"></div>
              <div className="text-xl font-bold text-white tracking-tight">Database</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed opacity-80">Almacenamiento elástico con soporte espacial.</p>
          </div>
          <div className="w-full max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 overflow-hidden mt-4 space-y-2 px-2">
            {["PostGIS", "Neon DB", "DuckDB"].map((t, i) => (
              <div key={t} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-amber-500/10 transition-all">
                <span className="text-amber-400 text-xs font-bold">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Card */}
        <div className="group relative flex flex-col items-center">
          <div className="relative z-20 w-full p-8 rounded-2xl bg-[#050810] border border-slate-800 group-hover:border-cyan-500/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black font-mono text-cyan-400">A</div>
              <div className="h-8 w-[1px] bg-slate-800"></div>
              <div className="text-xl font-bold text-white tracking-tight">Analytics</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed opacity-80">Inteligencia territorial y ciencia de datos.</p>
          </div>
          <div className="w-full max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 overflow-hidden mt-4 space-y-2 px-2">
            {["PySAL", "Polars", "LADM-COL"].map((t, i) => (
              <div key={t} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-cyan-500/10 transition-all">
                <span className="text-cyan-400 text-xs font-bold">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW: Official Entities Logos Section (Pure Code SVGs) */}
      <div className="mt-24 pt-16 border-t border-slate-800/30">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] text-center mb-12">Nodos de Interoperabilidad Institucional</p>
               <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
          
          {/* IGAC Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-emerald-500/50 transition-all overflow-hidden shadow-lg shadow-emerald-500/5">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="48" stroke="#005A32" strokeWidth="2" fill="#005A32" fillOpacity="0.1"/>
                  <path d="M30 50C30 38.9543 38.9543 30 50 30C61.0457 30 70 38.9543 70 50C70 61.0457 61.0457 70 50 70" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M50 30L50 70M30 50L70 50" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 2"/>
                  <circle cx="50" cy="50" r="10" fill="#FFD700" className="animate-pulse" style={{ animationDuration: '3s' }}/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-emerald-500 tracking-tighter">IGAC</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">AUTORIDAD CATASTRAL</span>
            </div>
          </div>

          {/* SNR Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-red-500/50 transition-all overflow-hidden shadow-lg shadow-red-500/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="20" width="60" height="60" rx="8" stroke="#003366" strokeWidth="3" fill="#003366" fillOpacity="0.1"/>
                  <path d="M35 55L50 70L65 55" stroke="#CC0000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M50 30V70" stroke="#003366" strokeWidth="4" strokeLinecap="round"/>
                  <rect x="40" y="35" width="20" height="10" rx="2" fill="#CC0000"/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-red-500 tracking-tighter">SNR</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">REGISTRO INMOBILIARIO</span>
            </div>
          </div>

          {/* DNP Logo (NEW) */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-blue-500/50 transition-all overflow-hidden shadow-lg shadow-blue-500/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 30H80V70H20V30Z" stroke="#003087" strokeWidth="3" fill="#003087" fillOpacity="0.1"/>
                  <path d="M30 40V60M50 40V60M70 40V60" stroke="#003087" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="50" cy="50" r="5" fill="#FFD700"/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-blue-500 tracking-tighter">DNP</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">PLANEACIÓN NACIONAL</span>
            </div>
          </div>

          {/* ANT Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-green-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-green-500/50 transition-all overflow-hidden shadow-lg shadow-green-500/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10L85 30V70L50 90L15 70V30L50 10Z" stroke="#4CAF50" strokeWidth="3" fill="#4CAF50" fillOpacity="0.1"/>
                  <path d="M35 50C35 40 40 35 50 35C60 35 65 40 65 50C65 60 60 65 50 65C40 65 35 60 35 50Z" fill="#4CAF50"/>
                  <path d="M50 35V65M35 50H65" stroke="white" strokeWidth="2"/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-green-500 tracking-tighter">ANT</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">AGENCIA DE TIERRAS</span>
            </div>
          </div>

          {/* UPRA Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-amber-500/50 transition-all overflow-hidden shadow-lg shadow-amber-500/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 80L50 20L80 80H20Z" stroke="#8B4513" strokeWidth="3" fill="#8B4513" fillOpacity="0.1"/>
                  <circle cx="50" cy="55" r="15" stroke="#8B4513" strokeWidth="2"/>
                  <path d="M50 40V70" stroke="#D2691E" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-amber-600 tracking-tighter">UPRA</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">PLANIFICACIÓN RURAL</span>
            </div>
          </div>

          {/* DANE Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-indigo-500/50 transition-all overflow-hidden shadow-lg shadow-indigo-500/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="20" width="15" height="60" fill="#3F51B5"/>
                  <rect x="42" y="40" width="15" height="40" fill="#3F51B5" fillOpacity="0.7"/>
                  <rect x="65" y="60" width="15" height="20" fill="#3F51B5" fillOpacity="0.4"/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-indigo-500 tracking-tighter">DANE</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">INFORMACIÓN ESTADÍSTICA</span>
            </div>
          </div>
        </div>

        {/* Technical Standards Bar (Marketing/Authority) */}
        <div className="mt-20 flex flex-wrap justify-center gap-4 sm:gap-12">
            {[
                { id: "RES-1040", text: "Resolución 1040 de 2023 (IGAC)", color: "emerald" },
                { id: "RES-746", text: "Resolución 746 de 2024 (IGAC)", color: "blue" },
                { id: "ISO-19152", text: "Estándar LADM-COL V3.0", color: "amber" },
                { id: "SNR-SYNC", text: "Interoperabilidad SNR-IGAC", color: "red" }
            ].map((std) => (
                <div key={std.id} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${std.color}-500 animate-pulse`}></div>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors">{std.text}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EntityLogos;

