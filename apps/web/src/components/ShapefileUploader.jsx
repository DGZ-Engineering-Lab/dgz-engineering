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
  const [isDragging, setIsDragging] = useState(false);

  // Helper para procesar y validar archivos
  const processFile = (selectedFile) => {
    setStatus("IDLE");
    setResult(null);
    setErrorMsg("");
    setJobId(null);

    if (!selectedFile) return;

    // Validación de límite de tamaño: 20MB
    const maxSize = 20 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setErrorMsg(`El archivo excede el límite de 20MB (Tamaño: ${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB). Por favor reduzca el dataset catastral o filtre por zona.`);
      setStatus("ERROR");
      setFile(null);
      return;
    }

    // Validación de extensiones permitidas
    const allowedExtensions = ["zip", "geojson", "kml", "gpkg", "shp"];
    const extension = selectedFile.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      setErrorMsg("Formato no soportado. Cargue un archivo .zip (Shapefile de predios), .geojson, .kml o .gpkg.");
      setStatus("ERROR");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // Manejar la selección del archivo por botón
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Manejadores de Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    if (status !== "UPLOADING" && status !== "PROCESSING") {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (status === "UPLOADING" || status === "PROCESSING") return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
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
            <p className="text-xs text-slate-300 font-mono">Motor Asíncrono de Inteligencia Geoespacial</p>
          </div>
        </div>

        {/* Zona de Drop/Upload */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed transition-all duration-300 bg-black/40 rounded-2xl p-8 text-center relative group ${
            isDragging 
              ? "border-cyan-400 bg-cyan-950/20 shadow-[0_0_30px_rgba(207,167,88,0.4)] scale-[1.02]" 
              : "border-slate-700 hover:border-cyan-500/50"
          }`}
        >
          <input 
            type="file" 
            accept=".zip,.geojson,.kml,.gpkg,.shp"
            onChange={handleFileChange}
            disabled={status === "UPLOADING" || status === "PROCESSING"}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="flex flex-col items-center gap-3 pointer-events-none">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDragging 
                ? "bg-cyan-500/20 scale-110 shadow-[0_0_15px_rgba(207,167,88,0.5)]" 
                : "bg-slate-800 group-hover:scale-110"
            }`}>
              <UploadCloud className={`w-6 h-6 ${isDragging ? "text-cyan-300 animate-bounce" : "text-cyan-400"}`} />
            </div>
            {file ? (
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <FileArchive className="w-4 h-4" /> {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </div>
            ) : (
              <div className="text-sm text-slate-300">
                Arrastra tu archivo <span className="text-cyan-400 font-bold">.ZIP (Shapefile)</span> o haz clic para explorar.
              </div>
            )}
          </div>
        </div>

        {/* Tarjeta Educativa para Shapefiles */}
        {file && file.name.endsWith(".zip") && (
          <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-2">
              <FileArchive className="w-4 h-4 text-cyan-400" />
              <div className="text-[10px] text-slate-300 uppercase tracking-widest font-mono font-bold">
                Estructura de Shapefile Detectada (.zip)
              </div>
            </div>
            <p className="text-xs text-slate-400 font-light">
              Nuestro motor catastral procesará este contenedor. Para cumplir con la normativa <strong>LADM-COL (ISO 19152)</strong> e <strong>INTERLIS</strong>, asegúrese de incluir los siguientes componentes obligatorios:
            </p>
            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="flex items-center gap-2 p-2 bg-slate-900/60 rounded border border-emerald-500/20 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>.shp (Geometría)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900/60 rounded border border-emerald-500/20 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>.dbf (Atributos)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900/60 rounded border border-emerald-500/20 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>.shx (Índices)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900/60 rounded border border-cyan-500/20 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>.prj (Proyección CTM12)</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 italic pl-1">
              * Nota: CTM12 (Origen Único Nacional, EPSG:9377) es el estándar de proyección oficial para Colombia.
            </div>
          </div>
        )}

        {/* Botón de Acción */}
        <button
          onClick={uploadFile}
          disabled={!file || status === "UPLOADING" || status === "PROCESSING"}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold tracking-widest text-xs uppercase rounded-xl transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] hover:brightness-110 active:brightness-95 shadow-[0_0_20px_rgba(207,167,88,0.3)] disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
        >
          {status === "IDLE" && "Iniciar Análisis Topológico"}
          {status === "UPLOADING" && <><Loader2 className="w-4 h-4 animate-spin" /> Subiendo archivo...</>}
          {status === "PROCESSING" && <><Loader2 className="w-4 h-4 animate-spin" /> Auditando geometrías en 2do plano...</>}
          {(status === "COMPLETED" || status === "ERROR") && "Subir otro archivo"}
        </button>

        {/* Mensaje de Error */}
        {status === "ERROR" && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 animate-in fade-in duration-300">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div className="text-sm text-red-100">{errorMsg}</div>
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
                <div className="text-[10px] text-slate-300 uppercase tracking-wider mb-1">Total Predios</div>
                <div className="text-2xl font-black text-white">{result.qaqc_metrics?.total_features || 0}</div>
              </div>
              <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-300 uppercase tracking-wider mb-1">Errores (Slivers/Overlaps)</div>
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
              <p className="text-sm text-slate-200 leading-relaxed">
                {result.geo_llm_intelligence_report}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
