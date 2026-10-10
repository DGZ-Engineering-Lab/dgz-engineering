"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Key, Database, FileCheck, RefreshCw, Layers, ShieldCheck, Cpu, ArrowLeft, Play, Copy, Check } from "lucide-react";
import Logo from "../../components/Logo";

// API Endpoints Definition
const ENDPOINTS = {
  introduction: {
    title: "Introduction",
    icon: Cpu,
    desc: "La API de DevGiz es una puerta de enlace de alto rendimiento diseñada para la automatización, validación y gestión catastral de escala nacional. Permite integrar la potencia de nuestros motores paralelos directos sobre sus sistemas preexistentes.",
    details: "Nuestra infraestructura utiliza un pipeline híbrido orquestado en Rust y Python que procesa geometrías complejas, transformaciones cartográficas a CTM12, validación conceptual LADM-COL v3.0 e interoperabilidad directa con el IGAC."
  },
  authentication: {
    title: "Authentication",
    icon: Key,
    desc: "Todas las solicitudes de API deben autenticarse mediante un Bearer Token en las cabeceras HTTP. Mantenga sus credenciales seguras y encriptadas en sus variables de entorno.",
    headers: {
      "Authorization": "Bearer $DEVGIZ_TOKEN",
      "Content-Type": "application/json"
    },
    codeSnippets: {
      curl: `curl -X POST https://api.devgiz.com/v1/auth/validate \\
  -H "Authorization: Bearer $DEVGIZ_TOKEN" \\
  -H "Content-Type: application/json"`,
      python: `import requests

url = "https://api.devgiz.com/v1/auth/validate"
headers = {
    "Authorization": "Bearer $DEVGIZ_TOKEN",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())`,
      js: `const response = await fetch("https://api.devgiz.com/v1/auth/validate", {
  method: "POST",
  headers: {
    "Authorization": "Bearer $DEVGIZ_TOKEN",
    "Content-Type": "application/json"
  }
});
const data = await response.json();`
    }
  },
  spatial: {
    title: "Spatial Queries",
    icon: Database,
    desc: "Ejecute consultas de inteligencia espacial vectoriales directas sobre nuestros nodos distribuidos de PostGIS de alta tasa de transferencia.",
    codeSnippets: {
      curl: `curl -X POST https://api.devgiz.com/v1/spatial/query \\
  -H "Authorization: Bearer $DEVGIZ_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "SELECT id, ST_AsGeoJSON(geom) FROM parcels WHERE ST_Area(geom) > 5000 LIMIT 5",
    "format": "GeoJSON"
  }'`,
      python: `import requests

url = "https://api.devgiz.com/v1/spatial/query"
headers = { "Authorization": "Bearer $DEVGIZ_TOKEN", "Content-Type": "application/json" }
data = {
    "query": "SELECT id, ST_AsGeoJSON(geom) FROM parcels WHERE ST_Area(geom) > 5000 LIMIT 5",
    "format": "GeoJSON"
}

res = requests.post(url, headers=headers, json=data)
print(res.json())`,
      js: `const res = await fetch("https://api.devgiz.com/v1/spatial/query", {
  method: "POST",
  headers: {
    "Authorization": "Bearer $DEVGIZ_TOKEN",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: "SELECT id, ST_AsGeoJSON(geom) FROM parcels WHERE ST_Area(geom) > 5000 LIMIT 5",
    format: "GeoJSON"
  })
});
const result = await res.json();`
    }
  },
  ladm: {
    title: "LADM-COL Validation",
    icon: FileCheck,
    desc: "Valide la integridad topológica, semántica y conceptual de sus modelos catastrales multipropósito contra el perfil LADM-COL v3.0 oficial.",
    codeSnippets: {
      curl: `curl -X POST https://api.devgiz.com/v1/validation/ladm-col \\
  -H "Authorization: Bearer $DEVGIZ_TOKEN" \\
  -F "file=@municipio_sogamoso.xtf" \\
  -F "model=LADM_COL_v3_0"`,
      python: `import requests

url = "https://api.devgiz.com/v1/validation/ladm-col"
headers = { "Authorization": "Bearer $DEVGIZ_TOKEN" }
files = {
    "file": open("municipio_sogamoso.xtf", "rb")
}
data = { "model": "LADM_COL_v3_0" }

res = requests.post(url, headers=headers, files=files, data=data)
print(res.json())`,
      js: `const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("model", "LADM_COL_v3_0");

const res = await fetch("https://api.devgiz.com/v1/validation/ladm-col", {
  method: "POST",
  headers: {
    "Authorization": "Bearer $DEVGIZ_TOKEN"
  },
  body: formData
});
const result = await res.json();`
    }
  },
  webhooks: {
    title: "Webhooks",
    icon: RefreshCw,
    desc: "Escuche eventos territoriales masivos y actualizaciones de procesamiento en segundo plano asíncronos mediante webhooks seguros firmados criptográficamente.",
    codeSnippets: {
      curl: `curl -X POST https://api.devgiz.com/v1/webhooks/register \\
  -H "Authorization: Bearer $DEVGIZ_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://su-servidor.gov.co/callbacks/devgiz",
    "events": ["validation.completed", "etl.finished"]
  }'`,
      python: `import requests

url = "https://api.devgiz.com/v1/webhooks/register"
headers = { "Authorization": "Bearer $DEVGIZ_TOKEN", "Content-Type": "application/json" }
payload = {
    "url": "https://su-servidor.gov.co/callbacks/devgiz",
    "events": ["validation.completed", "etl.finished"]
}

res = requests.post(url, headers=headers, json=payload)
print(res.json())`,
      js: `const res = await fetch("https://api.devgiz.com/v1/webhooks/register", {
  method: "POST",
  headers: {
    "Authorization": "Bearer $DEVGIZ_TOKEN",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "https://su-servidor.gov.co/callbacks/devgiz",
    events: ["validation.completed", "etl.finished"]
  })
});
const data = await res.json();`
    }
  },
  limits: {
    title: "Rate Limits",
    icon: Layers,
    desc: "Límites y cuotas de API optimizados para cargas de trabajo críticas e integraciones institucionales.",
    details: "El límite predeterminado es de 500 solicitudes por minuto para cuentas Standard, y hasta 10,000 solicitudes por minuto para cuentas Enterprise. Se devuelven cabeceras estándar en las respuestas para controlar su cuota restante:\n- `X-RateLimit-Limit`: Cuota total por ventana.\n- `X-RateLimit-Remaining`: Solicitudes restantes.\n- `X-RateLimit-Reset`: Tiempo Unix en el que se reinicia la ventana."
  }
};

// Simulated Interactive Playground Responses
const PLAYGROUND_PLANS = {
  auth: {
    endpoint: "POST /v1/auth/validate",
    logs: [
      "🛡️  [Shield] Iniciando ciclo de autenticación...",
      "🔒  [Crypto] Descifrando Bearer Token del cliente...",
      "🔐  [RBAC] Permisos de acceso territorial verificados.",
      "🟢  [Gateway] Token verificado. Sesión de API activa."
    ],
    response: {
      status: "authenticated",
      scope: "read_write",
      jurisdiction: "Colombia_Nacional",
      expires_at: "2026-06-20T14:00:00Z"
    }
  },
  query: {
    endpoint: "POST /v1/spatial/query",
    logs: [
      "🖥️  [PostGIS] Recibida consulta SQL espacial.",
      "📊  [Optimizer] Indexando geometrías con GIST index...",
      "📈  [DuckDB] Ejecutando escaneo paralelo (4 workers)...",
      "✅  [Format] Conversión de geometrías a GeoJSON completada."
    ],
    response: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { id: "PREDIO_110010101", area_m2: 5240.5 },
          geometry: { type: "Polygon", coordinates: [[[-73.1, 4.6], [-73.1, 4.7], [-73.2, 4.7], [-73.1, 4.6]]] }
        }
      ],
      total_records: 1,
      execution_time_ms: 12.4
    }
  },
  validate: {
    endpoint: "POST /v1/validation/ladm-col",
    logs: [
      "📁  [Ingest] Leyendo archivo catastral .xtf...",
      "⚙️  [INTERLIS] Analizando semántica de clases...",
      "📐  [Topology] Evaluando traslapes y huecos prediales...",
      "✨  [LADM-COL] Verificación contra modelo oficial v3.0 finalizada."
    ],
    response: {
      valid: true,
      file_name: "municipio_sogamoso.xtf",
      model: "LADM_COL_v3_0",
      diagnostics: {
        total_parcels_evaluated: 4820,
        overlaps_detected: 0,
        gap_anomalies: 0,
        unconnected_boundaries: 0
      },
      quality_score: "100/100"
    }
  }
};

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("introduction");
  const [activeLang, setActiveLang] = useState("curl");
  const [copied, setCopied] = useState(false);

  // Playground Console State
  const [playgroundType, setPlaygroundType] = useState("query");
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [consoleResult, setConsoleResult] = useState(null);
  const [consoleLoading, setConsoleLoading] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runPlayground = () => {
    setConsoleLoading(true);
    setConsoleLogs([]);
    setConsoleResult(null);

    const plan = PLAYGROUND_PLANS[playgroundType];
    let logIndex = 0;

    const interval = setInterval(() => {
      if (logIndex < plan.logs.length) {
        setConsoleLogs(prev => [...prev, plan.logs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setConsoleResult(plan.response);
        setConsoleLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#080706] text-white pt-32 pb-20 selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      {/* HUD Background Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(221,190,122,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(221,190,122,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
           <div className="space-y-4">
              <Link href="/" className="text-slate-500 hover:text-cyan-400 transition-colors font-mono text-[10px] uppercase tracking-[0.4em] flex items-center gap-2">
                 <ArrowLeft className="w-3.5 h-3.5" /> System Kernel
              </Link>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                Node <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic font-light">Documentation</span>
              </h1>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">Developer Access // API Endpoint v1.3.0-BETA</p>
           </div>
           
           <div className="flex items-center gap-4 px-6 py-3 bg-slate-900/30 border border-slate-800 rounded-2xl backdrop-blur-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Gateway Active</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Sidebar Navigation */}
           <div className="lg:col-span-3 space-y-8 sticky top-32 h-fit">
              <div className="space-y-2">
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Core Sections</div>
                 <nav className="flex flex-col gap-1.5">
                    {Object.keys(ENDPOINTS).map((key) => {
                       const Icon = ENDPOINTS[key].icon;
                       return (
                          <button 
                            key={key} 
                            onClick={() => { setActiveTab(key); }}
                            className={`text-left px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3.5 transition-all duration-300 border cursor-pointer ${
                              activeTab === key 
                                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_20px_rgba(207,167,88,0.15)]' 
                                : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
                            }`}
                          >
                             <Icon className={`w-4 h-4 ${activeTab === key ? 'text-cyan-400' : 'text-slate-500'}`} />
                             {ENDPOINTS[key].title}
                          </button>
                       );
                    })}
                 </nav>
              </div>

              {/* Quick Status Stats */}
              <div className="p-6 bg-slate-950 border border-slate-900 rounded-2xl space-y-4">
                 <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">System Health</div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Latencia API:</span>
                    <span className="font-mono text-cyan-400 font-bold">12ms avg</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Disponibilidad:</span>
                    <span className="font-mono text-emerald-400 font-bold">99.99%</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Validaciones / Día:</span>
                    <span className="font-mono text-slate-300">42,401</span>
                 </div>
              </div>
           </div>

           {/* Main Content */}
           <div className="lg:col-span-9 space-y-12">
              
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, y: 15 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -15 }}
                   transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                   className="space-y-10"
                 >
                    {/* Header Details */}
                    <div className="space-y-4">
                       <h2 className="text-4xl font-black tracking-tight uppercase flex items-center gap-4">
                          {ENDPOINTS[activeTab].title}
                       </h2>
                       <p className="text-slate-400 text-lg font-light leading-relaxed">
                          {ENDPOINTS[activeTab].desc}
                       </p>
                       {ENDPOINTS[activeTab].details && (
                          <p className="text-slate-500 text-sm font-light leading-relaxed">
                             {ENDPOINTS[activeTab].details}
                          </p>
                       )}
                    </div>

                    {/* Language Switcher and Code Block */}
                    {ENDPOINTS[activeTab].codeSnippets && (
                       <div className="space-y-4">
                          <div className="flex justify-between items-center bg-slate-950 px-6 py-3 border border-slate-900 rounded-t-2xl">
                             <div className="flex items-center gap-3">
                                {["curl", "python", "js"].map((lang) => (
                                   <button
                                     key={lang}
                                     onClick={() => setActiveLang(lang)}
                                     className={`text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded transition-all cursor-pointer ${
                                       activeLang === lang 
                                         ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20' 
                                         : 'text-slate-500 hover:text-slate-300'
                                     }`}
                                   >
                                      {lang === "js" ? "Node.js" : lang}
                                   </button>
                                ))}
                             </div>
                             <button
                               onClick={() => handleCopy(ENDPOINTS[activeTab].codeSnippets[activeLang])}
                               className="text-slate-500 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest"
                             >
                                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copiado!" : "Copiar"}
                             </button>
                          </div>
                          
                          <div className="relative group">
                             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
                             <pre className="relative bg-[#0c0b09] p-8 rounded-b-2xl border-x border-b border-slate-900 overflow-x-auto">
                                <code className="text-xs font-mono leading-relaxed text-slate-300">
                                   {ENDPOINTS[activeTab].codeSnippets[activeLang]}
                                </code>
                             </pre>
                          </div>
                       </div>
                    )}
                 </motion.div>
              </AnimatePresence>

              {/* Interactive Live Playground Terminal Console (Business Plus Feature) */}
              <div className="border border-slate-900 rounded-[2rem] bg-slate-950/40 backdrop-blur-md p-8 lg:p-12 space-y-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
                 
                 <div className="space-y-4">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.4em] flex items-center gap-2">
                       <Terminal className="w-3.5 h-3.5 animate-pulse" />
                       Interactive Sandbox Console
                    </div>
                    <h2 className="text-3xl font-black tracking-tight uppercase">
                       Consola de <span className="text-slate-400 font-light italic">Pruebas en Vivo</span>
                    </h2>
                    <p className="text-slate-500 text-sm font-light">
                       Seleccione un endpoint de API para simular la ingesta de datos y el flujo completo del pipeline de validación catastral.
                    </p>
                 </div>

                 {/* Console Actions Selector */}
                 <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => { setPlaygroundType("auth"); setConsoleLogs([]); setConsoleResult(null); }}
                      className={`px-4 py-2.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                        playgroundType === "auth" 
                          ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' 
                          : 'border-slate-900 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                       POST /auth/validate
                    </button>
                    <button 
                      onClick={() => { setPlaygroundType("query"); setConsoleLogs([]); setConsoleResult(null); }}
                      className={`px-4 py-2.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                        playgroundType === "query" 
                          ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' 
                          : 'border-slate-900 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                       POST /spatial/query
                    </button>
                    <button 
                      onClick={() => { setPlaygroundType("validate"); setConsoleLogs([]); setConsoleResult(null); }}
                      className={`px-4 py-2.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                        playgroundType === "validate" 
                          ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' 
                          : 'border-slate-900 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                       POST /validation/ladm-col
                    </button>
                 </div>

                 {/* Interactive Screen Grid */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Console Live Shell */}
                    <div className="flex flex-col bg-black border border-slate-900 p-6 rounded-2xl min-h-[280px]">
                       <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">DevGiz Shell Client</span>
                          <div className="flex gap-1.5">
                             <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                             <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                             <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                          </div>
                       </div>
                       
                       <div className="flex-1 font-mono text-xs text-slate-400 space-y-2 overflow-y-auto max-h-[200px] selection:bg-cyan-500/30">
                          <div>$ execute --endpoint={PLAYGROUND_PLANS[playgroundType].endpoint}</div>
                          {consoleLogs.map((log, i) => (
                             <div key={i} className="text-cyan-400/90 font-light">{log}</div>
                          ))}
                          {consoleLoading && (
                             <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                                <span className="w-3.5 h-3.5 border-2 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></span>
                                Ejecutando consultas...
                             </div>
                          )}
                          {!consoleLoading && consoleLogs.length === 0 && (
                             <div className="text-slate-600 italic">Listo para ejecutar proceso catastral. Presione 'PROCESAR SOLICITUD'.</div>
                          )}
                       </div>

                       <div className="pt-4 border-t border-slate-900 mt-4 flex justify-between items-center">
                          <span className="text-[8px] font-mono text-slate-600">JURISDICTION: COLOMBIA</span>
                          <button
                            onClick={runPlayground}
                            disabled={consoleLoading}
                            className="px-6 py-2.5 bg-white hover:bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
                          >
                             <Play className="w-3 h-3 fill-black" /> Procesar Solicitud
                          </button>
                       </div>
                    </div>

                    {/* Result JSON Window */}
                    <div className="flex flex-col bg-[#0c0b09] border border-slate-900 p-6 rounded-2xl min-h-[280px]">
                       <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">HTTP Response Payload</span>
                          <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold rounded">200 OK</span>
                       </div>
                       
                       <div className="flex-1 font-mono text-xs overflow-y-auto max-h-[220px]">
                          {consoleResult ? (
                             <pre className="text-emerald-400 font-light leading-relaxed select-text">
                                {JSON.stringify(consoleResult, null, 2)}
                             </pre>
                          ) : (
                             <div className="text-slate-600 italic flex h-full items-center justify-center">Esperando respuesta de la API...</div>
                          )}
                       </div>
                    </div>

                 </div>

              </div>

           </div>
        </div>

        {/* Footer */}
        <div className="mt-40 pt-16 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
           <Logo className="w-12 h-12 opacity-30" />
           <div className="flex gap-12 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              <span>Privacy Kernel</span>
              <span>Security Protocols</span>
              <span>&copy; 2026 DevGiz Hub</span>
           </div>
        </div>
      </div>
    </div>
  );
}
