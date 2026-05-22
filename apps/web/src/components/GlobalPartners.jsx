"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Globe, 
  Database, 
  Network, 
  Server, 
  ArrowRightLeft, 
  Radio, 
  CheckCircle2, 
  Wifi, 
  Compass, 
  Fingerprint,
  Grid,
  Search,
  Terminal,
  Play,
  Check,
  RefreshCw,
  Sliders,
  Maximize2
} from "lucide-react";

// Full catalog of integration metadata for real-world entities in Colombia
const INTEGRATIONS_METADATA = {
  "IGAC": {
    protocol: "Resolución 1040/2023 · LADM-COL v3.0",
    desc: "Interoperabilidad geoespacial directa con la autoridad catastral nacional colombiana.",
    impact: "Validación topológica desatendida y sincronización de bases de datos geográficas oficiales.",
    latency: "14 ms",
    rate: "4.8 MB/s",
    quality: "RTK GNSS LOCK",
    color: "cyan"
  },
  "SNR": {
    protocol: "FMI Match · ISO 19152 CORE Link",
    desc: "Cotejo registral y saneamiento inmobiliario mediante folios de matrícula inmobiliaria.",
    impact: "Mitigación del desfase jurídico-catastral en procesos de titulación formal e infraestructura.",
    latency: "28 ms",
    rate: "1.2 MB/s",
    quality: "DGPS SECURE LOCK",
    color: "blue"
  },
  "ANT": {
    protocol: "Baldíos Hub · PostGIS Remote Mirror",
    desc: "Soporte integral en formalización de baldíos, ordenamiento social y administración de tierras.",
    impact: "Cruce geográfico automatizado con áreas de protección, ley segunda y resguardos indígenas.",
    latency: "35 ms",
    rate: "8.5 MB/s",
    quality: "MULTI-POLYGON VALID",
    color: "emerald"
  },
  "DANE": {
    protocol: "Census Geo-Link · API REST JSON-LD",
    desc: "Modelado predictivo y cruce de datos demográficos oficiales con capas prediales nacionales.",
    impact: "Estimación geoespacial de impacto socioeconómico y plusvalías prediales urbanas.",
    latency: "19 ms",
    rate: "12.4 MB/s",
    quality: "GEO-DEMOGRAPHIC LOCK",
    color: "amber"
  },
  "AMVA": {
    protocol: "WebGIS Node · Vector Tiles CDN",
    desc: "Monitoreo del crecimiento metropolitano y expansión territorial en el Valle de Aburrá.",
    impact: "Modelación hidrológica de cuencas urbanas y conectividad ecológica metropolitana.",
    latency: "12 ms",
    rate: "22.1 MB/s",
    quality: "DYNAMIC MESH OK",
    color: "cyan"
  },
  "DNP": {
    protocol: "MGA Geo-Link · PostgreSQL Core",
    desc: "Planificación territorial y priorización de inversiones bajo regalías nacionales.",
    impact: "Catastro multipropósito integrado a planes de ordenamiento territorial (POT) modernos.",
    latency: "45 ms",
    rate: "3.2 MB/s",
    quality: "PLAN-SYS COMPLIANT",
    color: "indigo"
  },
  "UPRA": {
    protocol: "Edafo-Raster API · GDAL Pipeline",
    desc: "Planificación sectorial agropecuaria e identificación de áreas de aptitud productiva nacional.",
    impact: "Frontera agrícola interactiva e idoneidad edafoclimática mediante sensores multiespectrales.",
    latency: "52 ms",
    rate: "16.7 MB/s",
    quality: "RASTER COMPATIBLE",
    color: "emerald"
  },
  "CINTELI GROUP": {
    protocol: "MQTT Broker · IoT Smart Cities API",
    desc: "Visualización interactiva y gemelos digitales de infraestructura inteligente.",
    impact: "Análisis de tráfico vehicular, sensores ambientales y flujos demográficos.",
    latency: "8 ms",
    rate: "95.4 kB/s",
    quality: "MQTT LIVE STREAM",
    color: "cyan"
  },
  "ISA ENERGÍA": {
    protocol: "IFC BIM Integration · Laser Scanner Cloud",
    desc: "Gestión de servidumbres de transmisión eléctrica terrestre y análisis de vegetación.",
    impact: "Inspección tridimensional mediante LiDAR aéreo para prevención de fallas.",
    latency: "15 ms",
    rate: "45.2 MB/s",
    quality: "3D POINT CLOUD OK",
    color: "orange"
  },
  "GEOSAT": {
    protocol: "LAS/LAZ Web Stream · COG Geotiff API",
    desc: "Procesamiento y visualización de ortomosaicos aéreos centimétricos y modelos digitales de elevación.",
    impact: "Soporte de precisión para levantamiento catastral y diseño geométrico de vías.",
    latency: "11 ms",
    rate: "118.5 MB/s",
    quality: "CENTIMETRIC DTM LOCK",
    color: "blue"
  },
  "FNA": {
    protocol: "Secure Valuation Node · Postgres Link",
    desc: "Cálculo analítico y valoración masiva automatizada de garantías habitacionales.",
    impact: "Georreferenciación de solicitudes crediticias e indexación del riesgo territorial.",
    latency: "30 ms",
    rate: "2.1 MB/s",
    quality: "FISCAL SAFE LINK",
    color: "indigo"
  },
  "ADR": {
    protocol: "HEC-RAS Sync · QGIS Integration Node",
    desc: "Diseño geográfico de distritos de adecuación de tierras y riego tecnificado agrícola.",
    impact: "Modelación de caudales superficiales para optimización del recurso hídrico campesino.",
    latency: "22 ms",
    rate: "5.4 MB/s",
    quality: "HYDRO-GRID COMPLIANT",
    color: "emerald"
  },
  "ANI": {
    protocol: "WMS/WFS Layer Map · GeoNode Hub",
    desc: "Supervisión geoespacial de concesiones de transporte de cuarta y quinta generación (4G/5G).",
    impact: "Modelación geomorfológica de taludes, movimientos de masa y áreas de reserva ambiental.",
    latency: "18 ms",
    rate: "28.3 MB/s",
    quality: "INFRASTRUCTURE SYNC",
    color: "cyan"
  },
  "VALOR+": {
    protocol: "SOA Web Service · REST XML/JSON Node",
    desc: "Modernización y fiscalización del recaudo tributario del impuesto predial unificado.",
    impact: "Soberanía fiscal y aumento de recursos públicos mediante cruces catastrales precisos.",
    latency: "25 ms",
    rate: "3.7 MB/s",
    quality: "SECURE CRYPTO LINK",
    color: "orange"
  },
  "GEB": {
    protocol: "Esri Portal Link · ArcPy Automated Script",
    desc: "Estructuración geográfica de licencias ambientales para líneas de alta tensión y gasoductos.",
    impact: "Superposiciones con reservas forestales y consulta previa comunitaria en tiempo real.",
    latency: "20 ms",
    rate: "14.1 MB/s",
    quality: "ESRI COMPATIBLE",
    color: "orange"
  },
  "METRO DE BOGOTÁ": {
    protocol: "BIM Collaborate Pro · PostGIS Sync",
    desc: "Modelado BIM digital del trazado de estaciones ferroviarias y afectaciones de predios.",
    impact: "Auditoría de gestión predial, expropiaciones y liberación de suelo de obra civil.",
    latency: "14 ms",
    rate: "82.5 MB/s",
    quality: "BIM 3D DIGITAL TWIN",
    color: "blue"
  },
  "ALCALDÍA DE YOPAL": {
    protocol: "PostgreSQL Engine · WebGIS Server Host",
    desc: "Actualización digital del Plan de Ordenamiento Territorial (POT) y catastro multipropósito.",
    impact: "Formalización masiva de barrios periféricos e inclusión en las bases tributarias municipales.",
    latency: "16 ms",
    rate: "1.9 MB/s",
    quality: "POT DIGITAL VALID",
    color: "cyan"
  },
  "IGGA": {
    protocol: "RTK GNSS Dual Sync · GeoJSON Streamer",
    desc: "Planimetría masiva en campo para proyectos de restitución y formalización de tierras.",
    impact: "Generación de linderos digitales georreferenciados con precisión sub-decimétrica.",
    latency: "9 ms",
    rate: "320 kB/s",
    quality: "FIXED DGPS LOCK",
    color: "cyan"
  },
  "ARBITRIUM": {
    protocol: "FastAPI Node · Scikit-Learn Model API",
    desc: "Modelos predictivos inteligentes para la tasación inmobiliaria comercial masiva (AVM).",
    impact: "Estimación matemática de precios urbanos basada en variables de localización espacial.",
    latency: "32 ms",
    rate: "890 kB/s",
    quality: "ML PREDICTOR OK",
    color: "indigo"
  },
  "DEER": {
    protocol: "Remote Support Tunnel · Software Licensing Node",
    desc: "Integración de licenciamiento GIS y soporte geoespacial corporativo.",
    impact: "Capacitación técnica y transferencia tecnológica a personal operativo público.",
    latency: "12 ms",
    rate: "1.1 MB/s",
    quality: "SECURE SSH LINK",
    color: "amber"
  },
  "SICARARE (COSARGO)": {
    protocol: "NDVI Pix4Dfields API · Sentinel Hub",
    desc: "Gestión fitosanitaria de cultivos agroindustriales mediante imágenes satelitales multiespectrales.",
    impact: "Monitoreo temprano de estrés foliar, sanidad de cultivos y vigor vegetativo en palma.",
    latency: "40 ms",
    rate: "41.8 MB/s",
    quality: "RASTER SENTINEL COMPLIANT",
    color: "emerald"
  },
  "AMB": {
    protocol: "IoT Water Sensor · WMS Map Server",
    desc: "Monitoreo geoespacial hídrico superficial y vertimientos industriales regionales.",
    impact: "Mapas oficiales de calidad de agua y alertas tempranas de contaminación fluvial.",
    latency: "24 ms",
    rate: "7.1 MB/s",
    quality: "HYDRO-TELEMETRY SYNC",
    color: "blue"
  },
  "CEIBAS": {
    protocol: "EPANET Model Node · Spatial Database",
    desc: "Automatización cartográfica para el inventario de redes de acueducto y alcantarillado.",
    impact: "Detección de pérdidas comerciales y fugas de presión física en la red urbana.",
    latency: "21 ms",
    rate: "4.3 MB/s",
    quality: "GEODATABASE LOCK",
    color: "cyan"
  },
  "EPM": {
    protocol: "LiDAR Batymetry Node · Portal Connect",
    desc: "Gestión geoespacial de cuencas de embalses generadores y áreas de protección ambiental.",
    impact: "Cálculo de sedimentación física del vaso del embalse mediante batimetrías LiDAR.",
    latency: "17 ms",
    rate: "64.9 MB/s",
    quality: "ESRI PORTAL COMPATIBLE",
    color: "cyan"
  },
  "INCODER": {
    protocol: "Legacy DB Mirror · SQL Connector Node",
    desc: "Archivo histórico de títulos baldíos adjudicados para reforma agraria colombiana.",
    impact: "Consulta de antecedentes geográficos en litigios de propiedad rural histórica.",
    latency: "38 ms",
    rate: "940 kB/s",
    quality: "LEGACY COMPRESSED OK",
    color: "amber"
  },
  "GOBERNACIÓN DEL ATLÁNTICO": {
    protocol: "IoT Alert Gateway · Node-RED Server",
    desc: "Plataforma departamental de alertas tempranas e inundación por el Canal del Dique.",
    impact: "Simulación de rotura de diques y cálculo de afectación de predios agrícolas en tiempo real.",
    latency: "10 ms",
    rate: "120 kB/s",
    quality: "LIVE TELEMETRY HUB",
    color: "cyan"
  },
  "ALCALDÍA DE SABANALARGA": {
    protocol: "WebGIS Server Node · PostGIS DB Client",
    desc: "Cartografía temática oficial y zonificación agropecuaria del territorio rural.",
    impact: "Suministro de mapas catastrales a escala de detalle 1:10.000 para catastro multipropósito.",
    latency: "19 ms",
    rate: "2.5 MB/s",
    quality: "POSTGIS COMPACTED",
    color: "cyan"
  }
};

const ROW1 = [
  { name: "IGAC", logo: "https://www.igac.gov.co/sites/default/files/2023-05/Logo%20IGAC%2003.svg", type: "institution", isWhite: false },
  { name: "SNR", logo: "https://www.vur.gov.co/portal/resources/images/LogoSNR.png", type: "institution", isWhite: false },
  { name: "ANT", logo: "https://observatorio.ant.gov.co/sites/default/files/2025-02/imagenes/svgs/logo-agencia-nacional-de-tierras.svg", type: "institution", isWhite: false },
  { name: "DANE", logo: "https://www.dane.gov.co/images/logo-portal-dane.svg", type: "institution", isWhite: false },
  { name: "CINTELI GROUP", logo: null, type: "client", isWhite: false },
  { name: "ISA ENERGÍA", logo: "https://colombia.isaenergia.com/wp-content/uploads/2025/12/Logo-ISA-Energia-1.svg", type: "client", isWhite: false },
  { name: "GEOSAT", logo: "https://geosat.com.co/logos/lockup-black-tight.svg", type: "client", isWhite: false },
  { name: "FNA", logo: "https://www.fna.gov.co/Style%20Library/fna/img/logo-fna.png", type: "client", isWhite: false },
  { name: "ADR", logo: null, type: "client", isWhite: true },
  { name: "ANI", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_ANI.svg", type: "client", isWhite: false },
  { name: "VALOR+", logo: null, type: "client", isWhite: false },
  { name: "GEB", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Logo_Grupo_Energ%C3%ADa_Bogot%C3%A1.svg", type: "client", isWhite: false },
  { name: "METRO DE BOGOTÁ", logo: null, type: "client", isWhite: true },
  { name: "ALCALDÍA DE YOPAL", logo: null, type: "client", isWhite: false }
];

const ROW2 = [
  { name: "AMVA", logo: "https://www.metropol.gov.co/Style%20Library/images/logo.png", type: "institution", isWhite: false },
  { name: "DNP", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtFZUqE_-Syl04f9K4xSypL0WTaJZscWtrw&s", type: "institution", isWhite: false },
  { name: "UPRA", logo: "https://www.icde.gov.co/sites/default/files/ides/logo%20upra.png", type: "institution", isWhite: false },
  { name: "IGGA", logo: "https://igga.com.co/wp-content/uploads/2022/08/Logo_IGGA_Blanco.png", type: "client", isWhite: true },
  { name: "ARBITRIUM", logo: "https://www.arbitrium.com.co/assets/img/grande.png", type: "client", isWhite: false },
  { name: "DEER", logo: "https://cdn-ileimge.nitrocdn.com/fpXuxNvpGBHXdUXQieHOZUiZoJRvuprb/assets/images/optimized/rev-3050f1c/deer.com.co/wp-content/uploads/2024/09/DEER-OD-BLANCO.webp", type: "client", isWhite: true },
  { name: "SICARARE (COSARGO)", logo: "https://extractorasicarare.com/wp-content/uploads/2018/11/logo-ppal.png", type: "client", isWhite: false },
  { name: "AMB", logo: null, type: "client", isWhite: true },
  { name: "CEIBAS", logo: null, type: "client", isWhite: true },
  { name: "EPM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Logo_EPM.svg", type: "client", isWhite: false },
  { name: "INCODER", logo: null, type: "client", isWhite: true },
  { name: "GOBERNACIÓN DEL ATLÁNTICO", logo: "https://www.atlantico.gov.co/images/gob-atl-2024.png", type: "client", isWhite: false },
  { name: "ALCALDÍA DE SABANALARGA", logo: "https://www.sabanalarga-atlantico.gov.co/sites/sabanalargaatlantico/content/files/000394/19651_7395_escudo300_200x200_200x200.png", type: "client", isWhite: false }
];

const ALL_PARTNERS = [...ROW1, ...ROW2];

const STANDARDS = [
  { text: "Resolución 1040 de 2023 (IGAC)", color: "emerald" },
  { text: "Resolución 746 de 2024 (IGAC)", color: "blue" },
  { text: "Estándar LADM-COL V3.0", color: "amber" },
  { text: "Interoperabilidad SNR-IGAC", color: "red" }
];

function PartnerCard({ partner, activePartner, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isActive = activePartner === partner.name;

  const getInitials = (name) => {
    return name
      .split(/[\s·-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rotateX = -(mouseY / (height / 2)) * 12;
    const rotateY = (mouseX / (width / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const borderGlowClass = isActive 
    ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105 z-10" 
    : "border-slate-200/80 hover:border-cyan-500/40 hover:shadow-[0_10px_20px_rgba(6,182,212,0.08)]";

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(partner.name)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease" : "none"
      }}
      className="flex flex-col items-center gap-2 group cursor-pointer inline-flex shrink-0 select-none pb-1"
    >
      <div 
        className={`h-16 w-32 md:h-18 md:w-34 flex items-center justify-center p-3 bg-white/95 rounded-2xl border backdrop-blur-md transition-all duration-300 relative overflow-hidden ${borderGlowClass}`}
      >
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent -translate-y-full group-hover:animate-scanner pointer-events-none" />
        <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isActive ? 'from-cyan-500/5 to-cyan-500/5 opacity-100' : ''}`} />

        {imgFailed || !partner.logo ? (
          <div className="w-full h-full flex flex-col items-center justify-center relative rounded-xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/70 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]"></div>
            <span className="text-[10px] font-black tracking-widest text-slate-800 font-mono relative z-10">
              {getInitials(partner.name)}
            </span>
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse"></div>
          </div>
        ) : (
          <img 
            src={partner.logo} 
            alt={partner.name} 
            className={`max-h-full max-w-full object-contain transition-all duration-500 select-none
              ${partner.isWhite 
                ? 'brightness-0 opacity-40 group-hover:brightness-100 group-hover:opacity-100' 
                : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'
              }
              ${isActive ? 'grayscale-0 opacity-100 brightness-100' : ''}
            `}
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className="flex flex-col items-center text-center">
        <span className={`text-[9px] font-black tracking-tight transition-colors duration-300 ${isActive ? 'text-cyan-600 font-extrabold' : 'text-slate-700 opacity-80 group-hover:opacity-100 group-hover:text-slate-900'}`}>
          {partner.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function GlobalPartners() {
  const [activePartnerName, setActivePartnerName] = useState("IGAC");
  const [filter, setFilter] = useState("all"); // 'all', 'institution', 'client'
  const [viewMode, setViewMode] = useState("marquee"); // 'marquee', 'grid'
  const [searchQuery, setSearchQuery] = useState("");
  const [pingState, setPingState] = useState("connected"); // 'connected', 'pinging', 'success'
  const [pingLatency, setPingLatency] = useState("14 ms");
  const [logs, setLogs] = useState([]);
  
  // Dynamic tick for simulated metrics
  const [timeCode, setTimeCode] = useState("GPS-UTC LOCK: 15:09:22.42");
  const consoleEndRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTimeCode(`GPS-UTC LOCK: ${d.toTimeString().split(' ')[0]}.${Math.floor(Math.random() * 99)}`);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  // Set up logs streaming based on selected partner
  useEffect(() => {
    const metadata = INTEGRATIONS_METADATA[activePartnerName] || INTEGRATIONS_METADATA["IGAC"];
    setPingLatency(metadata.latency);
    
    const initialLogs = [
      `[SYSTEM] NODO LOCAL: CARGANDO PROTOCOLOS DE COMUNICACIÓN...`,
      `[SECURITY] NODO REMOTO: ESTABLECIENDO TUNEL SEGURO TLS v1.3...`,
      `[CONNECT] ASOCIANDO CANAL CON ${activePartnerName} [OK]`,
      `[PROTOCOL] ${metadata.protocol} · CARGADO CORRECTAMENTE`,
      `[METRIC] LATENCIA: ${metadata.latency} | VELOCIDAD: ${metadata.rate}`,
      `[SYNC] CONEXIÓN CATASTRAL SINCRONIZADA. EN ESPERA DE TELEMETRÍA...`
    ];
    setLogs(initialLogs);

    // Periodic simulation log additions
    const logInterval = setInterval(() => {
      const randomTaps = [
        `[SYNC] Sincronizando capas vectoriales prediales... [OK]`,
        `[GEO-JSON] Descargando geometría LADM-COL v3.0...`,
        `[SECURITY] Verificación hash sha256 aprobada en nodo remoto`,
        `[TELEMETRY] Latencia canal: ${(parseInt(metadata.latency) + Math.floor(Math.random() * 5 - 2))} ms`,
        `[DATABASE] Postgres Mirror: Actualizando tablas de linderos oficiales`,
        `[RTK-GPS] Lock de precisión catastral: ${metadata.quality}`
      ];
      const randomLine = randomTaps[Math.floor(Math.random() * randomTaps.length)];
      const timestamp = new Date().toTimeString().split(' ')[0];
      setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${randomLine}`]);
    }, 3800);

    return () => clearInterval(logInterval);
  }, [activePartnerName]);

  // Scroll to bottom of developer console logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Triggering the custom Ping Test simulation
  const handlePingTest = () => {
    if (pingState === "pinging") return;
    
    setPingState("pinging");
    const currentMetadata = INTEGRATIONS_METADATA[activePartnerName] || INTEGRATIONS_METADATA["IGAC"];
    const timestamp = new Date().toTimeString().split(' ')[0];
    
    setLogs(prev => [
      ...prev,
      `[${timestamp}] [PING] INICIANDO DIAGNÓSTICO DE CANAL DE DATOS CON ${activePartnerName}...`,
      `[${timestamp}] [PING] ENVIANDO RÁFAGA DE 4 PAQUETES ICMP DE 32 BYTES...`
    ]);

    setTimeout(() => {
      const simulatedLatencies = [
        parseInt(currentMetadata.latency) - 1,
        parseInt(currentMetadata.latency) + 2,
        parseInt(currentMetadata.latency),
        parseInt(currentMetadata.latency) - 2
      ].map(v => Math.max(2, v));

      const avgLatency = Math.round(simulatedLatencies.reduce((a, b) => a + b, 0) / 4);
      setPingLatency(`${avgLatency} ms`);
      
      const newTimestamp = new Date().toTimeString().split(' ')[0];
      setLogs(prev => [
        ...prev,
        `[${newTimestamp}] [PING] RESPUESTA DESDE ${activePartnerName}: bytes=32 tiempo=${simulatedLatencies[0]}ms TTL=64`,
        `[${newTimestamp}] [PING] RESPUESTA DESDE ${activePartnerName}: bytes=32 tiempo=${simulatedLatencies[1]}ms TTL=64`,
        `[${newTimestamp}] [PING] RESPUESTA DESDE ${activePartnerName}: bytes=32 tiempo=${simulatedLatencies[2]}ms TTL=64`,
        `[${newTimestamp}] [PING] RESPUESTA DESDE ${activePartnerName}: bytes=32 tiempo=${simulatedLatencies[3]}ms TTL=64`,
        `[${newTimestamp}] [PING] PING COMPLETADO. PAQUETES: ENVIADOS=4, RECIBIDOS=4, PERDIDOS=0 (0% PERDIDA).`,
        `[${newTimestamp}] [PING] TIEMPO MEDIO DE IDA Y VUELTA (RTT) = ${avgLatency}ms [DIAGNÓSTICO: EXCELENTE]`
      ]);
      setPingState("success");
      
      setTimeout(() => {
        setPingState("connected");
      }, 1500);
    }, 1200);
  };

  // Filter and search logic
  const filteredPartners = ALL_PARTNERS.filter(p => {
    const matchesFilter = filter === "all" || p.type === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const currentMetadata = INTEGRATIONS_METADATA[activePartnerName] || INTEGRATIONS_METADATA["IGAC"];
  const activeColorTheme = currentMetadata.color || "cyan";

  const glowBorderClass = {
    cyan: "border-cyan-200/80 shadow-[0_20px_50px_rgba(6,182,212,0.08)]",
    blue: "border-blue-200/80 shadow-[0_20px_50px_rgba(59,130,246,0.08)]",
    emerald: "border-emerald-200/80 shadow-[0_20px_50px_rgba(16,185,129,0.08)]",
    amber: "border-amber-200/80 shadow-[0_20px_50px_rgba(245,158,11,0.08)]",
    indigo: "border-indigo-200/80 shadow-[0_20px_50px_rgba(99,102,241,0.08)]",
    orange: "border-orange-200/80 shadow-[0_20px_50px_rgba(249,115,22,0.08)]"
  }[activeColorTheme];

  const badgeTextTheme = {
    cyan: "text-cyan-700 bg-cyan-50 border-cyan-200",
    blue: "text-blue-700 bg-blue-50 border-blue-200",
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-200",
    amber: "text-amber-700 bg-amber-50 border-amber-200",
    indigo: "text-indigo-700 bg-indigo-50 border-indigo-200",
    orange: "text-orange-700 bg-orange-50 border-orange-200"
  }[activeColorTheme];

  const ledDotTheme = {
    cyan: "bg-cyan-500 shadow-[0_0_8px_#06b6d4]",
    blue: "bg-blue-500 shadow-[0_0_8px_#3b82f6]",
    emerald: "bg-emerald-500 shadow-[0_0_8px_#10b981]",
    amber: "bg-amber-500 shadow-[0_0_8px_#f59e0b]",
    indigo: "bg-indigo-500 shadow-[0_0_8px_#6366f1]",
    orange: "bg-orange-500 shadow-[0_0_8px_#f97316]"
  }[activeColorTheme];

  const textHighlightTheme = {
    cyan: "text-cyan-600",
    blue: "text-blue-600",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    indigo: "text-indigo-600",
    orange: "text-orange-600"
  }[activeColorTheme];

  const bgHighlightTheme = {
    cyan: "bg-cyan-500/10",
    blue: "bg-blue-500/10",
    emerald: "bg-emerald-500/10",
    amber: "bg-amber-500/10",
    indigo: "bg-indigo-500/10",
    orange: "bg-orange-500/10"
  }[activeColorTheme];

  const svgParticleColor = {
    cyan: "#06b6d4",
    blue: "#3b82f6",
    emerald: "#10b981",
    amber: "#f59e0b",
    indigo: "#6366f1",
    orange: "#f97316"
  }[activeColorTheme];

  return (
    <section className="py-28 bg-transparent border-t border-slate-100 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-forward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-backward {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        @keyframes scanner {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        .animate-marquee-forward {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee-forward 55s linear infinite;
        }
        .animate-marquee-backward {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee-backward 55s linear infinite;
        }
        .marquee-container:hover .animate-marquee-forward,
        .marquee-container:hover .animate-marquee-backward {
          animation-play-state: paused;
        }
        .animate-scanner {
          animation: scanner 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />

      {/* Blueprint background grid visual glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-cyan-500/50"></span>
              <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-cyan-600 font-bold">INTEGRACIÓN MULTIPROPÓSITO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Clientes que han <span className="text-slate-400 font-light italic">confiado en nosotros</span>
            </h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed max-w-2xl">
              Interoperabilidad técnica, regulatoria y operativa con los líderes públicos y corporativos del desarrollo territorial en Colombia.
            </p>
          </div>

          {/* Controls Panel */}
          <div className="flex flex-wrap items-center gap-4 self-start lg:self-auto">
            {/* View Switcher Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
              <button 
                onClick={() => setViewMode("marquee")}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-1.5 ${viewMode === "marquee" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                <RefreshCw className="w-3 h-3 animate-spin-slow" />
                Flujo Continuo
              </button>
              <button 
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-1.5 ${viewMode === "grid" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                <Grid className="w-3 h-3" />
                Buscador de Red
              </button>
            </div>

            {/* Category Selectors */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all duration-300 ${filter === "all" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                Todos ({ALL_PARTNERS.length})
              </button>
              <button 
                onClick={() => setFilter("institution")}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all duration-300 ${filter === "institution" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                Gobierno
              </button>
              <button 
                onClick={() => setFilter("client")}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all duration-300 ${filter === "client" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                Sector Privado
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Search Bar (Only visible or prominent in Grid view but helpful in both) */}
        <AnimatePresence>
          {viewMode === "grid" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 w-full max-w-md relative"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Buscar entidad (ej. SNR, IGAC, ISA)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-450 hover:text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded"
                  >
                    limpiar
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alert Banner Indicator */}
        <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-4 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <span className="font-light text-slate-650">
              Haz clic sobre el logotipo de cualquier entidad para sincronizar el **Centro de Control Técnico e Interoperabilidad** en tiempo real.
            </span>
          </div>
          <span className="font-mono text-[9px] text-cyan-600 bg-cyan-500/10 px-2.5 py-1 rounded-md self-start sm:self-auto font-black tracking-widest uppercase">
            SISTEMA HOLOGRÁFICO CONECTADO
          </span>
        </div>

      </div>

      {/* Main Partners Display Panel Container */}
      <div className="relative z-10 w-full mb-16">
        
        <AnimatePresence mode="wait">
          {viewMode === "marquee" ? (
            /* ========================================== */
            /* VIEW: INFINITE SCROLL MARQUEE              */
            /* ========================================== */
            <motion.div 
              key="marquee-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="marquee-container space-y-10 py-4 relative"
            >
              {/* Vignettes gradient fades on sides */}
              <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none"></div>

              {/* Row 1 - Forward */}
              <div className="overflow-hidden flex w-full">
                <div className="animate-marquee-forward">
                  {[...ROW1, ...ROW1, ...ROW1].map((partner, i) => (
                    <PartnerCard 
                      key={`marquee1-${partner.name}-${i}`} 
                      partner={partner} 
                      activePartner={activePartnerName} 
                      onSelect={(name) => setActivePartnerName(name)} 
                    />
                  ))}
                </div>
              </div>

              {/* Row 2 - Backward */}
              <div className="overflow-hidden flex w-full">
                <div className="animate-marquee-backward">
                  {[...ROW2, ...ROW2, ...ROW2].map((partner, i) => (
                    <PartnerCard 
                      key={`marquee2-${partner.name}-${i}`} 
                      partner={partner} 
                      activePartner={activePartnerName} 
                      onSelect={(name) => setActivePartnerName(name)} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================== */
            /* VIEW: INTERACTIVE FILTERABLE GRID          */
            /* ========================================== */
            <motion.div 
              key="grid-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-6 py-2"
            >
              {filteredPartners.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                  {filteredPartners.map((partner) => (
                    <div 
                      key={`grid-${partner.name}`}
                      className="flex justify-center"
                    >
                      <PartnerCard 
                        partner={partner} 
                        activePartner={activePartnerName} 
                        onSelect={(name) => setActivePartnerName(name)} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full py-12 text-center border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                  <Sliders className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-xs">No se encontraron entidades con los filtros actuales.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================= */}
      {/* TECHNICAL CONTROL CENTER HUD BOARD (LIGHT DESIGN SYSTEM) */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePartnerName}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full bg-white/70 backdrop-blur-xl border rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden ring-1 ring-slate-200/50 transition-all duration-500 ${glowBorderClass}`}
          >
            {/* Blueprint Grid mesh pattern on card background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-100 via-slate-50 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Top telemetry bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/50 pb-6 mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${ledDotTheme} animate-pulse`} />
                <div>
                  <div className="text-[9px] font-mono font-bold text-slate-800 tracking-widest uppercase">ESTADO DE INTEROPERABILIDAD</div>
                  <div className="text-[8px] font-mono text-slate-400 mt-0.5">{timeCode}</div>
                </div>
              </div>

              {/* Protocol Badge tag */}
              <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest font-mono ${badgeTextTheme}`}>
                {currentMetadata.protocol}
              </div>
            </div>

            {/* Control Panel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Descriptions */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${textHighlightTheme}`}>
                    SOCIO DE INTEGRACIÓN TERRITORIAL
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1 mb-3">
                    {activePartnerName}
                  </h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">
                    {currentMetadata.desc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/50 space-y-2">
                  <div className={`flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-widest ${textHighlightTheme}`}>
                    <Activity className="w-3.5 h-3.5" />
                    Impacto Técnico de Operación
                  </div>
                  <p className="text-slate-600 text-xs font-light leading-relaxed">
                    {currentMetadata.impact}
                  </p>
                </div>

                {/* Control Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={handlePingTest}
                    disabled={pingState === "pinging"}
                    className={`px-6 py-3.5 rounded-xl text-[9px] font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-sm
                      ${pingState === "pinging"
                        ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                        : "bg-slate-900 text-white hover:bg-slate-800 border border-slate-900 hover:scale-102"
                      }
                    `}
                  >
                    {pingState === "pinging" ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Comprobando...
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        Ejecutar Ping Test
                      </>
                    )}
                  </button>
                  <a 
                    href="#download-schema"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Esquema LADM-COL v3.0 para ${activePartnerName} descargado virtualmente.`);
                    }}
                    className="px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-[9px] font-mono font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                  >
                    Descargar Esquema XML
                  </a>
                </div>
              </div>

              {/* Right Column: Telemetry metrics, Graph & Live CLI */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual Interconnection Network Node Graph */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center justify-between relative overflow-hidden h-[120px]">
                  <div className="absolute top-2 left-3 text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    DIAGRAMA DE ENLACE ACTIVO
                  </div>
                  
                  {/* SVG Network Graph */}
                  <svg className="w-full h-full pt-4" viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" />
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Laser Link Line */}
                    <path 
                      id="nodeLaserPath" 
                      d="M 40 30 C 100 10, 220 50, 280 30" 
                      fill="none" 
                      stroke={pingState === "pinging" ? "#f97316" : "rgba(226, 232, 240, 1)"} 
                      strokeWidth="2.5" 
                      strokeDasharray={pingState === "pinging" ? "4 4" : "none"}
                      className="transition-colors duration-300"
                    />

                    {/* Data Packets flowing */}
                    <circle r="4.5" fill={svgParticleColor} filter="url(#svgGlow)">
                      <animateMotion 
                        dur={pingState === "pinging" ? "0.6s" : "3.5s"} 
                        repeatCount="indefinite" 
                        path="M 40 30 C 100 10, 220 50, 280 30" 
                      />
                    </circle>
                    <circle r="3" fill="#ffffff">
                      <animateMotion 
                        dur={pingState === "pinging" ? "0.6s" : "3.5s"} 
                        repeatCount="indefinite" 
                        path="M 40 30 C 100 10, 220 50, 280 30" 
                      />
                    </circle>

                    {/* Node A: DevGiz Core */}
                    <circle cx="40" cy="30" r="12" fill="#0f172a" />
                    <circle cx="40" cy="30" r="16" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" className="animate-spin-slow" />
                    <circle cx="40" cy="30" r="8" fill="#38bdf8" />
                    <text x="40" y="52" fill="#64748b" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">DEVGIZ CORE</text>

                    {/* Node B: Remote Entity */}
                    <circle cx="280" cy="30" r="12" fill="#334155" />
                    <circle cx="280" cy="30" r="16" stroke={svgParticleColor} strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="280" cy="30" r="7.5" fill={svgParticleColor} />
                    <text x="280" y="52" fill="#64748b" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{activePartnerName}</text>
                  </svg>
                </div>

                {/* Developer CLI Console Logs */}
                <div className="bg-slate-950 rounded-2xl border border-slate-900 p-4 font-mono text-[9px] leading-relaxed text-cyan-400/90 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">SALIDA DE CONSOLA DE SINCRONIZACIÓN</span>
                    </div>
                    <span className="text-[7px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-black tracking-widest">LIVE</span>
                  </div>

                  <div className="h-[125px] overflow-y-auto space-y-1.5 custom-scrollbar text-left">
                    {logs.map((log, index) => {
                      let colorClass = "text-slate-400";
                      if (log.includes("[SYSTEM]")) colorClass = "text-amber-400/90";
                      else if (log.includes("[SECURITY]")) colorClass = "text-purple-400";
                      else if (log.includes("[PING]")) colorClass = "text-cyan-300 font-semibold";
                      else if (log.includes("[CONNECT]")) colorClass = "text-emerald-400 font-semibold";
                      else if (log.includes("[PROTOCOL]")) colorClass = "text-blue-400";
                      
                      return (
                        <div key={index} className={`break-all ${colorClass}`}>
                          {log}
                        </div>
                      );
                    })}
                    <div ref={consoleEndRef} />
                  </div>
                </div>

                {/* Micro metrics underneath */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 text-center">
                    <div className="text-[7px] font-mono text-slate-400 uppercase tracking-wider">LATENCIA</div>
                    <div className="font-mono text-[10px] font-bold text-slate-800 mt-0.5">{pingLatency}</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 text-center">
                    <div className="text-[7px] font-mono text-slate-400 uppercase tracking-wider">VELOCIDAD</div>
                    <div className="font-mono text-[10px] font-bold text-slate-800 mt-0.5">{currentMetadata.rate}</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 text-center">
                    <div className="text-[7px] font-mono text-slate-400 uppercase tracking-wider">CANAL</div>
                    <div className="font-mono text-[9px] font-bold text-emerald-600 mt-0.5 uppercase truncate">{currentMetadata.quality.split(" ")[0]}</div>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Standards Compliance Badges */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-6 relative z-10">
        {STANDARDS.map((std, i) => {
          let badgeDotColor = "bg-cyan-500";
          if (std.color === "emerald") badgeDotColor = "bg-emerald-500";
          if (std.color === "blue") badgeDotColor = "bg-blue-500";
          if (std.color === "amber") badgeDotColor = "bg-amber-500";
          if (std.color === "red") badgeDotColor = "bg-red-500";

          return (
            <div 
              key={i} 
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:border-cyan-500/30 hover:shadow-md transition-all duration-300 cursor-default group"
            >
              <div className={`w-2 h-2 rounded-full ${badgeDotColor} animate-pulse`}></div>
              <span className="text-[10px] font-mono text-slate-650 group-hover:text-slate-900 transition-colors uppercase tracking-wider font-bold">
                {std.text}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
