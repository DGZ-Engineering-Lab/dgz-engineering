"use client";
import { useState, useEffect } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, FileArchive, Server } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_QA_API_URL || "http://127.0.0.1:8000";

export default function ShapefileUploader() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState("IDLE"); // IDLE, UPLOADING, PROCESSING, COMPLETED, ERROR
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Manejar la selección del archivo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus("IDLE");
      setResult(null);
      setErrorMsg("");
      setJobId(null);
    }
  };

  // Subir el archivo y obtener el JobID
  const uploadFile = async () => {
    if (!file) return;
    setStatus("UPLOADING");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/v1/analyze-shapefile`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      if (data.job_id) {
        setJobId(data.job_id);
        setStatus("PROCESSING");
      } else {
        throw new Error("No se recibió un JobID");
      }
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
      setErrorMsg(error.message || "Error al subir el archivo.");
    }
  };

  // Polling para revisar el estado de la tarea en segundo plano
  useEffect(() => {
    let intervalId;

    if (status === "PROCESSING" && jobId) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(`${API_URL}/api/v1/jobs/${jobId}`);
          if (response.ok) {
            const data = await response.json();
            
            if (data.status === "Completed") {
              setStatus("COMPLETED");
              setResult(data.result);
              clearInterval(intervalId);
            } else if (data.status === "Failed") {
              setStatus("ERROR");
              setErrorMsg(data.error || "Falló el procesamiento en el servidor.");
              clearInterval(intervalId);
            }
            // Si es "Processing", seguimos esperando...
          }
        } catch (error) {
          console.error("Error durante el polling:", error);
          // No detenemos el polling por un fallo temporal de red
        }
      }, 2500); // Polling cada 2.5 segundos
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [status, jobId]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Fondo de ruido y luces */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none"></div>
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Server className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Auditoría Catastral LADM-COL</h3>
            <p className="text-xs text-slate-400 font-mono">Motor Asíncrono de Inteligencia Geoespacial</p>
          </div>
        </div>

        {/* Zona de Drop/Upload */}
        <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 transition-colors bg-black/40 rounded-2xl p-8 text-center relative group">
          <input 
            type="file" 
            accept=".zip,.geojson,.kml,.gpkg,.shp"
            onChange={handleFileChange}
            disabled={status === "UPLOADING" || status === "PROCESSING"}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="flex flex-col items-center gap-3 pointer-events-none">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <UploadCloud className="w-6 h-6 text-cyan-400" />
            </div>
            {file ? (
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <FileArchive className="w-4 h-4" /> {file.name}
              </div>
            ) : (
              <div className="text-sm text-slate-400">
                Arrastra tu archivo <span className="text-cyan-400 font-bold">.ZIP (Shapefile)</span> o haz clic para explorar.
              </div>
            )}
          </div>
        </div>

        {/* Botón de Acción */}
        <button
          onClick={uploadFile}
          disabled={!file || status === "UPLOADING" || status === "PROCESSING"}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold tracking-widest text-xs uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] disabled:shadow-none flex items-center justify-center gap-2"
        >
          {status === "IDLE" && "Iniciar Análisis Topológico"}
          {status === "UPLOADING" && <><Loader2 className="w-4 h-4 animate-spin" /> Subiendo archivo...</>}
          {status === "PROCESSING" && <><Loader2 className="w-4 h-4 animate-spin" /> Auditando geometrías en 2do plano...</>}
          {(status === "COMPLETED" || status === "ERROR") && "Subir otro archivo"}
        </button>

        {/* Mensaje de Error */}
        {status === "ERROR" && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div className="text-sm text-red-200">{errorMsg}</div>
          </div>
        )}

        {/* Resultados */}
        {status === "COMPLETED" && result && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div className="text-sm font-bold text-emerald-400">Análisis completado con éxito</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Total Predios</div>
                <div className="text-2xl font-black text-white">{result.qaqc_metrics?.total_features || 0}</div>
              </div>
              <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Errores (Slivers/Overlaps)</div>
                <div className="text-2xl font-black text-amber-400">
                  {(result.qaqc_metrics?.slivers_val?.slivers_count || 0) + (result.qaqc_metrics?.topology_val?.overlaps_count || 0)}
                </div>
              </div>
            </div>

            <div className="bg-black/50 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-[10px] text-cyan-400 uppercase font-mono tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                Reporte LLM de Inteligencia
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {result.geo_llm_intelligence_report}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
