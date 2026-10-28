"use client";

import React, { useState } from "react";
import { animate } from "animejs";

const VurQuery = () => {
  const [matricula, setMatricula] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = matricula.trim();
    if (!query) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Attempt real-time API call to the backend (matrícula codificada para evitar inyección de parámetros)
      const response = await fetch(`${process.env.NEXT_PUBLIC_GEOAPI_URL || 'https://devgiz-api.onrender.com'}/api/vur/query?matricula=${encodeURIComponent(query)}`);
      
      if (response.ok) {
        const apiData = await response.json();
        // Nunca se muestran nombre ni documento del titular (Ley 1581 de 2012):
        // se descartan owner/owner_name/cedula aunque la API los enviara.
        // eslint-disable-next-line no-unused-vars
        const { owner, owner_name, cedula, raw_data, ...safeData } = apiData || {};
        const isMock = apiData?.simulated === true || safeData.source !== "SNR_VUR_OFFICIAL";
        // Los valores de relleno solo se usan en la demostración; en una respuesta real
        // no se inventan datos: se muestra "NO DISPONIBLE".
        const fill = (demoValue) => (isMock ? demoValue : "NO DISPONIBLE");
        setResult({
            ...safeData,
            matricula: safeData.matricula || query,
            isMock,
            area_registrada: safeData.area_registrada || (safeData.area_snr_m2 ? `${safeData.area_snr_m2} m2` : fill("1,250.45 m2")),
            gravamenes: safeData.gravamenes || safeData.legal_incumbrances || fill("SIN GRAVÁMENES VIGENTES (DATO FICTICIO)"),
            ultima_actuacion: safeData.ultima_actuacion || fill("2024-03-12 (COMPRAVENTA DE EJEMPLO)"),
            ubicacion: safeData.ubicacion || fill("MUNICIPIO DE EJEMPLO - SECTOR DE EJEMPLO"),
            timestamp: new Date().toLocaleString()
        });
      } else {
        // Fallback to high-fidelity mock if API is down during demo
        const mockData = {
          source: "DEMO_DATOS_FICTICIOS",
          matricula: query,
          isMock: true,
          status: "ACTIVO",
          area_registrada: "1,250.45 m2",
          gravamenes: "SIN GRAVÁMENES VIGENTES (DATO FICTICIO)",
          ultima_actuacion: "2024-03-12 (COMPRAVENTA DE EJEMPLO)",
          ubicacion: "MUNICIPIO DE EJEMPLO - SECTOR DE EJEMPLO",
          timestamp: new Date().toLocaleString()
        };
        setResult(mockData);
      }
      
      // Animation for the result
      setTimeout(() => {
        animate(".vur-result-card", {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
          easing: "outExpo"
        });
      }, 50);

    } catch (err) {
      console.error("VUR_QUERY_ERR:", err);
      setError("No fue posible completar la consulta de demostración. Intente de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="bg-[#050810] border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="flex-1 space-y-4">
            <h4 className="text-2xl font-bold text-white flex items-center gap-3">
              <span aria-hidden="true" className="p-2 bg-red-500/20 text-red-500 rounded-lg text-xl">🔍</span>
              Consulta Registral (demostración)
            </h4>
            <p className="inline-block px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-200 text-xs font-bold">
              Demostración con datos ficticios
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ejemplo de cómo DevGiz presenta el estado físico-jurídico de un folio de matrícula. DevGiz no es la Superintendencia de Notariado y Registro (SNR) ni tiene convenio, aval o conexión oficial con ella; para información registral oficial consulte directamente en la SNR.
            </p>
          </div>

          <form onSubmit={handleSearch} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <label htmlFor="vur-matricula" className="sr-only">Número de matrícula inmobiliaria</label>
            <input
              id="vur-matricula"
              name="matricula"
              type="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={30}
              required
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              placeholder="N° Matrícula (Ej: 050N-12345)"
              className="px-6 py-4 bg-slate-900 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/60 transition-all w-full sm:min-w-[280px]"
            />
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  PROCESANDO...
                </>
              ) : (
                "CONSULTAR"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Result Area */}
      <div className="mt-8 min-h-[300px] flex items-center justify-center relative">
        {!result && !loading && !error && (
          <div className="text-center space-y-4">
            <div aria-hidden="true" className="text-6xl grayscale opacity-40">📄</div>
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Esperando parámetro de búsqueda...</p>
          </div>
        )}

        {loading && (
          <div role="status" className="flex flex-col items-center gap-6">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-red-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-red-500 rounded-full animate-spin"></div>
            </div>
            <div className="space-y-2 text-center">
                <p className="text-red-500 font-bold tracking-widest text-xs animate-pulse uppercase">Generando consulta de demostración...</p>
            </div>
          </div>
        )}

        {error && (
          <div role="alert" className="p-8 bg-red-500/10 border border-red-500/50 rounded-3xl text-red-300 text-center max-w-md">
            <p className="font-bold mb-2">Error en la consulta</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}

        {result && (
          <div role="region" aria-label="Resultado de la consulta registral" className="vur-result-card w-full opacity-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <p role="note" className="md:col-span-2 lg:col-span-3 px-4 py-2 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-200 text-xs">
              {result.isMock
                ? "Demostración con datos ficticios: se muestra un registro simulado, no información real de la SNR."
                : "Resultado informativo sin valor oficial: no reemplaza el certificado de tradición y libertad expedido por la SNR."}
            </p>
            {/* Main Info Card */}
            <div className="lg:col-span-2 p-8 bg-[#0a0f18] border border-slate-800 rounded-3xl space-y-6 shadow-xl hover:border-red-500/30 transition-colors group">
              <div className="flex justify-between items-start">
                <div>
                   <h5 className="text-xs font-mono text-red-400 uppercase tracking-widest mb-1">TITULAR</h5>
                   <p className="text-lg font-bold text-white">Titular: dato reservado (Ley 1581) — consulte directamente en la SNR</p>
                </div>
                <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">{result.isMock ? "DEMO" : "INFORMATIVO"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-800/50">
                 <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Área en Escritura</span>
                    <span className="text-lg font-bold text-white">{result.area_registrada}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Matrícula Inmobiliaria</span>
                    <span className="text-lg font-bold text-red-400">{result.matricula}</span>
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-800/50">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">Ubicación Registrada</span>
                <p className="text-slate-300 flex items-center gap-2">
                   <span className="text-red-500">📍</span> {result.ubicacion}
                </p>
              </div>
            </div>

            {/* Legal Status Card */}
            <div className="p-8 bg-[#0a0f18] border border-slate-800 rounded-3xl flex flex-col justify-between shadow-xl hover:border-blue-500/30 transition-colors">
              <div>
                <h5 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">ESTADO JURÍDICO</h5>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-slate-300">{result.gravamenes}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-slate-300">Última Act: {result.ultima_actuacion}</span>
                   </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                   </svg>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Aviso</span>
                <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                  Esta vista es ilustrativa. Para trámites y decisiones use el certificado de tradición y libertad oficial de la SNR.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Institutional Handshake Footer */}
      {result && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
           <div className="flex items-center gap-6 opacity-60">
              <span className="text-[9.5px] font-mono text-amber-300 uppercase tracking-[0.28em]">Demostración con datos ficticios · sin conexión oficial con la SNR</span>
           </div>
           <div className="text-[10px] font-mono text-slate-600">
              TIMESTAMP: {result.timestamp} | NODE_VER: 1.2.0-STABLE
           </div>
        </div>
      )}
    </div>
  );
};

export default VurQuery;
