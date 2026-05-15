"use client";

import React from 'react';

const EntityLogos = () => {
  return (
    <div className="mt-32 pt-16 relative">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* BOTTOM ROW: Governmental Entities */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
          
          {/* IGAC Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-3 bg-white border border-slate-800 rounded-2xl group-hover:border-emerald-500/50 transition-all overflow-hidden shadow-lg shadow-emerald-500/5 w-24 h-24 flex items-center justify-center">
                <img src="https://www.igac.gov.co/sites/default/files/2023-05/Logo%20IGAC%2003.svg" alt="IGAC" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-emerald-500 tracking-tighter">IGAC</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">AUTORIDAD CATASTRAL</span>
            </div>
          </div>

          {/* SNR Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-3 bg-white border border-slate-800 rounded-2xl group-hover:border-red-500/50 transition-all overflow-hidden shadow-lg shadow-red-500/5 w-24 h-24 flex items-center justify-center">
                <img src="https://www.vur.gov.co/portal/resources/images/LogoSNR.png" alt="SNR" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-red-500 tracking-tighter">SNR</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">REGISTRO INMOBILIARIO</span>
            </div>
          </div>

          {/* DNP Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-3 bg-white border border-slate-800 rounded-2xl group-hover:border-blue-500/50 transition-all overflow-hidden shadow-lg shadow-blue-500/5 w-24 h-24 flex items-center justify-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtFZUqE_-Syl04f9K4xSypL0WTaJZscWtrw&s" alt="DNP" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-blue-500 tracking-tighter">DNP</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">PLANEACIÓN NACIONAL</span>
            </div>
          </div>

          {/* ANT Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-green-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-3 bg-white border border-slate-800 rounded-2xl group-hover:border-green-500/50 transition-all overflow-hidden shadow-lg shadow-green-500/5 w-24 h-24 flex items-center justify-center">
                <img src="https://observatorio.ant.gov.co/sites/default/files/2025-02/imagenes/svgs/logo-agencia-nacional-de-tierras.svg" alt="ANT" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-green-500 tracking-tighter">ANT</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">AGENCIA DE TIERRAS</span>
            </div>
          </div>

          {/* UPRA Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-3 bg-white border border-slate-800 rounded-2xl group-hover:border-orange-500/50 transition-all overflow-hidden shadow-lg shadow-orange-500/5 w-24 h-24 flex items-center justify-center">
                <img src="https://www.icde.gov.co/sites/default/files/ides/logo%20upra.png" alt="UPRA" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-orange-500 tracking-tighter">UPRA</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">PLANIFICACIÓN RURAL</span>
            </div>
          </div>

          {/* DANE Logo */}
          <div className="group flex flex-col items-center gap-4 cursor-help transition-all duration-700 transform hover:scale-110 relative">
            <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 p-3 bg-white border border-slate-800 rounded-2xl group-hover:border-indigo-500/50 transition-all overflow-hidden shadow-lg shadow-indigo-500/5 w-24 h-24 flex items-center justify-center">
                <img src="https://www.dane.gov.co/images/logo-portal-dane.svg" alt="DANE" className="w-full h-full object-contain" />
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
