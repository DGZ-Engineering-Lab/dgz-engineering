"use client";

import React from 'react';

const EntityLogos = () => {
  return (
    <div className="mt-32 pt-16 border-t border-slate-800/50 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-[#02040a] border border-slate-800/50 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <span className="text-[10px] sm:text-xs font-mono text-cyan-500 uppercase tracking-[0.4em] flex items-center gap-4 py-2 font-bold shadow-cyan-500/20">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500"></span>
          Arquitectura de Interoperabilidad Global
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500"></span>
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-16">
        
        {/* TOP ROW: Tech Stack (Backend, Frontend, Database, Analytics) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 mb-20">
          
          {/* Frontend (Next.js) */}
          <div className="group relative flex flex-col items-center gap-4 cursor-help transition-all duration-700 hover:-translate-y-2">
            <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 w-full p-8 rounded-[2rem] bg-[#050810]/90 backdrop-blur-xl border border-slate-800 group-hover:border-slate-500/50 transition-all duration-500 overflow-hidden shadow-xl group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex justify-center items-center h-32">
              <svg className="w-16 h-16 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.18 13.91L10.3 8.35H8.72v7.3h1.37v-4.8l5.06 6.55c-1 .6-2.18.9-3.15.9-4.04 0-7.3-3.26-7.3-7.3s3.26-7.3 7.3-7.3 7.3 3.26 7.3 7.3c0 1.25-.33 2.41-.89 3.41z"/>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[13px] font-black text-white tracking-widest">FRONTEND</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">NEXT.JS / REACT</span>
            </div>
          </div>

          {/* Backend (FastAPI) */}
          <div className="group relative flex flex-col items-center gap-4 cursor-help transition-all duration-700 hover:-translate-y-2">
            <div className="absolute inset-0 bg-teal-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 w-full p-8 rounded-[2rem] bg-[#050810]/90 backdrop-blur-xl border border-slate-800 group-hover:border-teal-500/50 transition-all duration-500 overflow-hidden shadow-xl group-hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] flex justify-center items-center h-32">
              <svg className="w-16 h-16 text-teal-500 drop-shadow-[0_0_15px_rgba(20,184,166,0.5)] group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-4H7l6-7v4h4l-6 7z"/>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[13px] font-black text-teal-400 tracking-widest">BACKEND</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">FASTAPI / PYTHON</span>
            </div>
          </div>

          {/* Database (PostGIS) */}
          <div className="group relative flex flex-col items-center gap-4 cursor-help transition-all duration-700 hover:-translate-y-2">
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 w-full p-8 rounded-[2rem] bg-[#050810]/90 backdrop-blur-xl border border-slate-800 group-hover:border-blue-500/50 transition-all duration-500 overflow-hidden shadow-xl group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] flex justify-center items-center h-32">
              <svg className="w-16 h-16 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h-2zm0 6h2v2h-2z"/>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[13px] font-black text-blue-400 tracking-widest">DATABASE</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">POSTGIS / NEON</span>
            </div>
          </div>

          {/* Analytics (DuckDB / Polars) */}
          <div className="group relative flex flex-col items-center gap-4 cursor-help transition-all duration-700 hover:-translate-y-2">
            <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 w-full p-8 rounded-[2rem] bg-[#050810]/90 backdrop-blur-xl border border-slate-800 group-hover:border-amber-500/50 transition-all duration-500 overflow-hidden shadow-xl group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] flex justify-center items-center h-32">
              <svg className="w-16 h-16 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[13px] font-black text-amber-400 tracking-widest">ANALYTICS</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">DUCKDB / POLARS</span>
            </div>
          </div>
        </div>

        {/* Divider / Connector */}
        <div className="w-full flex justify-center items-center mb-20 relative">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          <div className="relative bg-[#02040a] px-4">
            <svg className="w-8 h-8 text-slate-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* BOTTOM ROW: Governmental Entities */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
          
          {/* IGAC Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-emerald-500/50 transition-all overflow-hidden shadow-lg shadow-emerald-500/5 w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="#10B981" strokeWidth="4" fill="#10B981" fillOpacity="0.1"/>
                  <path d="M50 10V90M10 50H90" stroke="#10B981" strokeWidth="2" strokeOpacity="0.5"/>
                  <path d="M20 50C20 30 80 30 80 50C80 70 20 70 20 50Z" stroke="#10B981" strokeWidth="2"/>
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
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-red-500/50 transition-all overflow-hidden shadow-lg shadow-red-500/5 w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="20" width="60" height="60" rx="8" stroke="#EF4444" strokeWidth="4" fill="#EF4444" fillOpacity="0.1"/>
                  <path d="M35 55L50 70L65 55" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M50 30V70" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
                  <rect x="40" y="35" width="20" height="10" rx="2" fill="#EF4444"/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-red-500 tracking-tighter">SNR</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">REGISTRO INMOBILIARIO</span>
            </div>
          </div>

          {/* DNP Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-blue-500/50 transition-all overflow-hidden shadow-lg shadow-blue-500/5 w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 30H80V70H20V30Z" stroke="#3B82F6" strokeWidth="4" fill="#3B82F6" fillOpacity="0.1"/>
                  <path d="M30 40V60M50 40V60M70 40V60" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
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
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-green-500/50 transition-all overflow-hidden shadow-lg shadow-green-500/5 w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10L85 30V70L50 90L15 70V30L50 10Z" stroke="#22C55E" strokeWidth="4" fill="#22C55E" fillOpacity="0.1"/>
                  <path d="M35 50C35 40 40 35 50 35C60 35 65 40 65 50C65 60 60 65 50 65C40 65 35 60 35 50Z" fill="#22C55E"/>
                  <path d="M50 35V65M35 50H65" stroke="#050810" strokeWidth="3"/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-green-500 tracking-tighter">ANT</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">AGENCIA DE TIERRAS</span>
            </div>
          </div>

          {/* UPRA Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-orange-500/50 transition-all overflow-hidden shadow-lg shadow-orange-500/5 w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 80L50 20L80 80H20Z" stroke="#F97316" strokeWidth="4" fill="#F97316" fillOpacity="0.1"/>
                  <circle cx="50" cy="55" r="15" stroke="#F97316" strokeWidth="3"/>
                  <path d="M50 40V70" stroke="#F97316" strokeWidth="4" strokeLinecap="round"/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-orange-500 tracking-tighter">UPRA</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">PLANIFICACIÓN RURAL</span>
            </div>
          </div>

          {/* DANE Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-5 bg-[#050810]/80 border border-slate-800 rounded-2xl group-hover:border-indigo-500/50 transition-all overflow-hidden shadow-lg shadow-indigo-500/5 w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="20" width="15" height="60" fill="#6366F1"/>
                  <rect x="42" y="40" width="15" height="40" fill="#6366F1" fillOpacity="0.7"/>
                  <rect x="65" y="60" width="15" height="20" fill="#6366F1" fillOpacity="0.4"/>
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-indigo-500 tracking-tighter">DANE</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">INFORMACIÓN ESTADÍSTICA</span>
            </div>
          </div>
        </div>

        {/* Technical Standards Bar (Marketing/Authority) */}
        <div className="mt-20 flex flex-wrap justify-center gap-4 sm:gap-8">
            {[
                { id: "RES-1040", text: "Resolución 1040 de 2023 (IGAC)", color: "emerald" },
                { id: "RES-746", text: "Resolución 746 de 2024 (IGAC)", color: "blue" },
                { id: "ISO-19152", text: "Estándar LADM-COL V3.0", color: "amber" },
                { id: "SNR-SYNC", text: "Interoperabilidad SNR-IGAC", color: "red" }
            ].map((std) => (
                <div key={std.id} className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-all duration-300 group shadow-lg backdrop-blur-md cursor-default">
                    <div className={`w-2 h-2 rounded-full bg-${std.color}-500 animate-pulse shadow-[0_0_8px_currentColor] text-${std.color}-500`}></div>
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">{std.text}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EntityLogos;

