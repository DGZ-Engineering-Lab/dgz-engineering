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
  { name: "ARBITRIUM", logo: "https://www.arbitrium.com.co/assets/img/grande.png", type: "client", isWhite: true },
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

// Reloj GPS aislado: antes forzaba un re-render de toda la sección cada 450 ms.
function GpsTimeCode() {
  const [timeCode, setTimeCode] = useState("GPS-UTC LOCK: --:--:--");
  useEffect(() => {
    const tick = () => {
      if (document.hidden) return;
      const d = new Date();
      setTimeCode(`GPS-UTC LOCK: ${d.toTimeString().split(' ')[0]}.${String(Math.floor(Math.random() * 99)).padStart(2, "0")}`);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wider">{timeCode}</div>;
}

function PartnerCard({ partner, activePartner, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false);
  const imgRef = useRef(null);

  // Si el logo remoto falló antes de hidratar, onError nunca se dispara:
  // lo detectamos al montar para mostrar el distintivo de respaldo.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setImgFailed(true);
  }, []);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isActive = activePartner === partner.name;

  const partnerMeta = INTEGRATIONS_METADATA[partner.name] || { color: "cyan", quality: "LOCK" };
  const pColor = partnerMeta.color || "cyan";

  const theme = {
    cyan: {
      border: "border-cyan-500/30",
      borderActive: "border-cyan-500",
      glow: "shadow-[0_0_25px_rgba(207,167,88,0.3)]",
      hover: "hover:border-cyan-500/50 hover:shadow-[0_12px_24px_rgba(207,167,88,0.12)]",
      scanner: "via-cyan-400/50",
      bg: "from-cyan-500/[0.02] to-cyan-500/[0.08]",
      text: "text-cyan-600 font-black",
      textClass: "text-cyan-600",
      pulseDot: "bg-cyan-500",
      ambientShadow: "shadow-[0_4px_15px_rgba(207,167,88,0.03)]"
    },
    blue: {
      border: "border-blue-500/30",
      borderActive: "border-blue-500",
      glow: "shadow-[0_0_25px_rgba(169,122,60,0.3)]",
      hover: "hover:border-blue-500/50 hover:shadow-[0_12px_24px_rgba(169,122,60,0.12)]",
      scanner: "via-blue-400/50",
      bg: "from-blue-500/[0.02] to-blue-500/[0.08]",
      text: "text-blue-600 font-black",
      textClass: "text-blue-600",
      pulseDot: "bg-blue-500",
      ambientShadow: "shadow-[0_4px_15px_rgba(169,122,60,0.03)]"
    },
    emerald: {
      border: "border-emerald-500/30",
      borderActive: "border-emerald-500",
      glow: "shadow-[0_0_25px_rgba(16,185,129,0.3)]",
      hover: "hover:border-emerald-500/50 hover:shadow-[0_12px_24px_rgba(16,185,129,0.12)]",
      scanner: "via-emerald-400/50",
      bg: "from-emerald-500/[0.02] to-emerald-500/[0.08]",
      text: "text-emerald-600 font-black",
      textClass: "text-emerald-600",
      pulseDot: "bg-emerald-500",
      ambientShadow: "shadow-[0_4px_15px_rgba(16,185,129,0.03)]"
    },
    amber: {
      border: "border-amber-500/30",
      borderActive: "border-amber-500",
      glow: "shadow-[0_0_25px_rgba(245,158,11,0.3)]",
      hover: "hover:border-amber-500/50 hover:shadow-[0_12px_24px_rgba(245,158,11,0.12)]",
      scanner: "via-amber-400/50",
      bg: "from-amber-500/[0.02] to-amber-500/[0.08]",
      text: "text-amber-600 font-black",
      textClass: "text-amber-600",
      pulseDot: "bg-amber-500",
      ambientShadow: "shadow-[0_4px_15px_rgba(245,158,11,0.03)]"
    },
    indigo: {
      border: "border-indigo-500/30",
      borderActive: "border-indigo-500",
      glow: "shadow-[0_0_25px_rgba(148,101,58,0.3)]",
      hover: "hover:border-indigo-500/50 hover:shadow-[0_12px_24px_rgba(148,101,58,0.12)]",
      scanner: "via-indigo-400/50",
      bg: "from-indigo-500/[0.02] to-indigo-500/[0.08]",
      text: "text-indigo-600 font-black",
      textClass: "text-indigo-600",
      pulseDot: "bg-indigo-500",
      ambientShadow: "shadow-[0_4px_15px_rgba(148,101,58,0.03)]"
    },
    orange: {
      border: "border-orange-500/30",
      borderActive: "border-orange-500",
      glow: "shadow-[0_0_25px_rgba(249,115,22,0.3)]",
      hover: "hover:border-orange-500/50 hover:shadow-[0_12px_24px_rgba(249,115,22,0.12)]",
      scanner: "via-orange-400/50",
      bg: "from-orange-500/[0.02] to-orange-500/[0.08]",
      text: "text-orange-600 font-black",
      textClass: "text-orange-600",
      pulseDot: "bg-orange-500",
      ambientShadow: "shadow-[0_4px_15px_rgba(249,115,22,0.03)]"
    }
  }[pColor] || {
    border: "border-cyan-500/30",
    borderActive: "border-cyan-500",
    glow: "shadow-[0_0_25px_rgba(207,167,88,0.3)]",
    hover: "hover:border-cyan-500/50 hover:shadow-[0_12px_24px_rgba(207,167,88,0.12)]",
    scanner: "via-cyan-400/50",
    bg: "from-cyan-500/[0.02] to-cyan-500/[0.08]",
    text: "text-cyan-600 font-black",
    textClass: "text-cyan-600",
    pulseDot: "bg-cyan-500",
    ambientShadow: "shadow-[0_4px_15px_rgba(207,167,88,0.03)]"
  };

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
    const rotateX = -(mouseY / (height / 2)) * 14;
    const rotateY = (mouseX / (width / 2)) * 14;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const borderGlowClass = isActive 
    ? `${theme.borderActive} ${theme.glow} scale-105 z-10 bg-slate-50/20 backdrop-blur-xl` 
    : `border-slate-200/80 ${theme.border} ${theme.ambientShadow} ${theme.hover} hover:scale-102 hover:bg-slate-50/40`;

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(partner.name)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
      }}
      className="flex flex-col items-center gap-2 group cursor-pointer inline-flex shrink-0 select-none pb-1 relative"
    >
      {/* Hover Status indicator Tag */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-35 scale-90 group-hover:scale-100">
        <span className="text-[10px] font-mono bg-slate-950 text-white px-2 py-0.5 rounded-full border border-slate-800 tracking-[0.15em] font-black uppercase shadow-md truncate">
          {partnerMeta.quality.split(" ")[0]}
        </span>
      </div>

      <div 
        className={`h-16 w-32 md:h-18 md:w-34 flex items-center justify-center p-3 bg-white/90 rounded-2xl border backdrop-blur-md transition-all duration-300 relative overflow-hidden ${borderGlowClass}`}
      >
        {/* Holographic scanner swept */}
        <div className={`absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent ${theme.scanner} to-transparent -translate-y-full group-hover:animate-scanner pointer-events-none`} />
        
        {/* Custom Radial Ambient Glow overlay inside card */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-100' : ''}`} />

        {/* Micro HUD technical bracket markings */}
        <div className={`absolute top-1 left-1 w-1.5 h-1.5 border-t border-l transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100 border-current' : 'border-slate-300/40'} ${theme.textClass}`} />
        <div className={`absolute top-1 right-1 w-1.5 h-1.5 border-t border-r transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100 border-current' : 'border-slate-300/40'} ${theme.textClass}`} />
        <div className={`absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100 border-current' : 'border-slate-300/40'} ${theme.textClass}`} />
        <div className={`absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100 border-current' : 'border-slate-300/40'} ${theme.textClass}`} />

        {imgFailed || !partner.logo ? (
          /* ========================================================= */
          /* HIGH-TECH AUTOMATED GENERATED BADGE FOR INCOMPLETE LOGOS  */
          /* ========================================================= */
          <div className="w-full h-full flex flex-col items-center justify-center relative rounded-xl border border-slate-200/40 bg-gradient-to-br from-slate-50/70 via-slate-100/40 to-slate-200/10 overflow-hidden transition-all duration-350">
            {/* Blueprint Grid background in tiny badge */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />
            
            {/* Futuristic vector radar meshes */}
            <div className="absolute w-12 h-12 rounded-full border border-dashed border-slate-300/20 animate-spin-slow pointer-events-none" />
            <div className="absolute w-7 h-7 rounded-full border border-slate-300/10 pointer-events-none" />

            <span className="text-[10px] font-mono font-black tracking-widest text-slate-800 relative z-10 transition-colors duration-300 group-hover:text-slate-950">
              {getInitials(partner.name)}
            </span>

            {/* Micro active LED node status indicator */}
            <div className={`absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${theme.pulseDot} animate-pulse shadow-[0_0_6px_currentColor]`} />
          </div>
        ) : (
          <img 
            ref={imgRef}
            src={partner.logo} 
            alt={partner.name} 
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className={`max-h-full max-w-full object-contain transition-all duration-500 select-none z-10
              ${partner.isWhite 
                ? 'brightness-0 opacity-40 group-hover:brightness-100 group-hover:opacity-100' 
                : 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100'
              }
              ${isActive ? 'grayscale-0 opacity-100 brightness-100' : ''}
              group-hover:scale-105 group-hover:translate-y-[-2px]
            `}
            onError={() => setImgFailed(true)}
          />
        )}

        {/* Technical active laser baseline flare */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 transition-all duration-500 rounded-full ${isActive ? 'w-10 bg-current shadow-[0_0_8px_currentColor]' : 'group-hover:w-6 bg-slate-350'} ${theme.textClass}`} />
      </div>

      <div className="flex flex-col items-center text-center mt-1 z-10">
        <span className={`text-[10px] font-mono font-bold tracking-tight transition-colors duration-300 ${isActive ? theme.text : 'text-slate-700 opacity-80 group-hover:opacity-100 group-hover:text-slate-900 font-semibold'}`}>
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
  
  const consoleEndRef = useRef(null);

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
    const container = consoleEndRef.current?.closest(".overflow-y-auto");
    if (container) {
      container.scrollTop = container.scrollHeight;
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
    cyan: "border-cyan-200/80 shadow-[0_20px_50px_rgba(207,167,88,0.08)]",
    blue: "border-blue-200/80 shadow-[0_20px_50px_rgba(169,122,60,0.08)]",
    emerald: "border-emerald-200/80 shadow-[0_20px_50px_rgba(16,185,129,0.08)]",
    amber: "border-amber-200/80 shadow-[0_20px_50px_rgba(245,158,11,0.08)]",
    indigo: "border-indigo-200/80 shadow-[0_20px_50px_rgba(148,101,58,0.08)]",
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
    cyan: "bg-cyan-500 shadow-[0_0_8px_#cfa758]",
    blue: "bg-blue-500 shadow-[0_0_8px_#a97a3c]",
    emerald: "bg-emerald-500 shadow-[0_0_8px_#10b981]",
    amber: "bg-amber-500 shadow-[0_0_8px_#f59e0b]",
    indigo: "bg-indigo-500 shadow-[0_0_8px_#94653a]",
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
    cyan: "#cfa758",
    blue: "#a97a3c",
    emerald: "#10b981",
    amber: "#f59e0b",
    indigo: "#94653a",
    orange: "#f97316"
  }[activeColorTheme];

  return (
    <section className="py-32 bg-transparent border-t border-slate-100 overflow-hidden relative min-h-[900px]">
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
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes corner-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-marquee-forward {
          display: flex;
          gap: 1.75rem;
          width: max-content;
          animation: marquee-forward 50s linear infinite;
        }
        .animate-marquee-backward {
          display: flex;
          gap: 1.75rem;
          width: max-content;
          animation: marquee-backward 50s linear infinite;
        }
        .marquee-container:hover .animate-marquee-forward,
        .marquee-container:hover .animate-marquee-backward {
          animation-play-state: paused;
        }
        .animate-scanner {
          animation: scanner 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-radar-sweep {
          animation: radar-sweep 6s linear infinite;
        }
        .animate-corner-pulse {
          animation: corner-pulse 2s infinite ease-in-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(18,17,14, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(207,167,88, 0.3);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(207,167,88, 0.5);
        }
      `}} />

      {/* Cybernetic HUD Blueprint Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Decorative Technical Crosshairs / Corners */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-slate-300/40 pointer-events-none animate-corner-pulse hidden lg:block" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-slate-300/40 pointer-events-none animate-corner-pulse hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-slate-300/40 pointer-events-none animate-corner-pulse hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-slate-300/40 pointer-events-none animate-corner-pulse hidden lg:block" />
      
      <div className="absolute top-8 left-16 text-[10px] font-mono text-slate-400 tracking-[0.25em] pointer-events-none hidden lg:block">SYS_LINK_FRAME // LATENCY_MODULE: ON</div>
      <div className="absolute top-8 right-16 text-[10px] font-mono text-slate-400 tracking-[0.25em] pointer-events-none hidden lg:block">LOCAL_LOC // 06.2442° N, 75.5750° W</div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-18">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-cyan-600 font-extrabold">INTEGRACIÓN MULTIPROPÓSITO</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-[0.95]">
              Clientes que han <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-650 to-slate-950 font-light italic">confiado en nosotros</span>
            </h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed max-w-2xl">
              Interoperabilidad técnica, regulatoria y operativa con los líderes públicos y corporativos del desarrollo territorial en Colombia. Sincronización transparente de información geográfica y catastral.
            </p>
          </div>

          {/* High-Tech Controls Control Panel */}
          <div className="flex flex-wrap items-center gap-4 self-start lg:self-auto bg-slate-50/80 p-2.5 rounded-2xl border border-slate-200/60 backdrop-blur-md shadow-sm">
            
            {/* View Switcher Toggle */}
            <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-300/30">
              <button 
                onClick={() => setViewMode("marquee")}
                className={`px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-2 ${viewMode === "marquee" ? "bg-white text-slate-950 shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-cyan-500" />
                Flujo Continuo
              </button>
              <button 
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-2 ${viewMode === "grid" ? "bg-white text-slate-950 shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
              >
                <Grid className="w-3.5 h-3.5 text-blue-500" />
                Buscador de Red
              </button>
            </div>

            {/* Category Selectors */}
            <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-300/30">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${filter === "all" ? "bg-white text-slate-950 shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
              >
                Todos ({ALL_PARTNERS.length})
              </button>
              <button 
                onClick={() => setFilter("institution")}
                className={`px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${filter === "institution" ? "bg-white text-slate-950 shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
              >
                Gobierno
              </button>
              <button 
                onClick={() => setFilter("client")}
                className={`px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${filter === "client" ? "bg-white text-slate-950 shadow-[0_3px_10px_rgba(0,0,0,0.06)] border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
              >
                Sector Privado
              </button>
            </div>

          </div>
        </div>

        {/* Dynamic Search Bar in Grid view */}
        <AnimatePresence>
          {viewMode === "grid" && (
            <motion.div 
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="mb-10 w-full max-w-xl relative"
            >
              <div className="relative">
                <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500" />
                <input 
                  type="text"
                  placeholder="Buscar socio estratégico por nombre (ej. IGAC, SNR, ISA, EPM)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-16 py-4 bg-white/70 border border-slate-200/80 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 backdrop-blur-md shadow-sm transition-all"
                />
                <span className="absolute right-4.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 tracking-wider bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  {filteredPartners.length} COINCIDENCIAS
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tactical Advisory Alert Banner */}
        <div className="bg-gradient-to-r from-cyan-500/[0.03] to-blue-500/[0.03] border border-cyan-500/15 rounded-3xl p-5 mb-14 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-xs shadow-[0_4px_20px_rgba(207,167,88,0.02)] backdrop-blur-[2px]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 relative overflow-hidden shrink-0">
              <div className="absolute inset-1 border border-cyan-400/20 rounded-xl animate-pulse" />
              <Compass className="w-5 h-5 animate-spin-slow text-cyan-500" />
            </div>
            <span className="font-light text-slate-650 leading-relaxed">
              Haz clic sobre el logotipo de cualquier entidad para sincronizar la telemetría del <strong className="text-slate-900 font-semibold">Centro de Control Técnico e Interoperabilidad</strong> en tiempo real con su protocolo.
            </span>
          </div>
          <span className="font-mono text-[10px] text-cyan-500 bg-cyan-500/10 px-3.5 py-1.5 rounded-lg self-start sm:self-auto font-black tracking-[0.15em] uppercase border border-cyan-500/20 shrink-0">
            SISTEMA HOLOGRÁFICO CONECTADO
          </span>
        </div>

      </div>

      {/* Main Partners Display Panel Container */}
      <div className="relative z-10 w-full mb-20">
        
        {/* Horizontal glowing lasers enclosing marquee */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {viewMode === "marquee" ? (
            /* ========================================== */
            /* VIEW: INFINITE SCROLL MARQUEE              */
            /* ========================================== */
            <motion.div 
              key="marquee-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="marquee-container space-y-12 py-6 relative"
            >
              {/* Vignettes gradient fades on sides */}
              <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent z-25 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-slate-50 via-slate-50/70 to-transparent z-25 pointer-events-none"></div>

              {/* Row 1 - Forward */}
              <div className="overflow-hidden flex w-full">
                <div className="animate-marquee-forward py-2">
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
                <div className="animate-marquee-backward py-2">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="max-w-7xl mx-auto px-6 py-4"
            >
              {filteredPartners.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
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
                <div className="w-full py-20 text-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 backdrop-blur-sm">
                  <Sliders className="w-10 h-10 text-slate-350 mx-auto mb-3 animate-pulse" />
                  <h4 className="text-slate-800 text-sm font-semibold mb-1">Sin Resultados de Sincronización</h4>
                  <p className="text-slate-450 text-xs max-w-sm mx-auto">No se encontraron entidades que coincidan con la búsqueda “{searchQuery}” bajo el filtro seleccionado.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================= */}
      {/* TECHNICAL CONTROL CENTER HUD BOARD (LIGHT DESIGN SYSTEM) */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePartnerName}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full bg-white/85 backdrop-blur-2xl border rounded-[3rem] p-8 md:p-12 relative overflow-hidden ring-1 ring-slate-200/50 shadow-2xl transition-all duration-500 ${glowBorderClass}`}
          >
            {/* Blueprint Grid mesh pattern on card background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-slate-100/50 via-slate-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Glowing Corner Accents for HUD Detail */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-slate-200 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-200 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-200 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-slate-200 pointer-events-none" />

            {/* Top telemetry bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/60 pb-7 mb-9 gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${ledDotTheme} animate-pulse shadow-[0_0_12px_currentColor]`} />
                <div>
                  <div className="text-[10px] font-mono font-black text-slate-800 tracking-[0.2em] uppercase">CENTRO DE CONTROL E INTEROPERABILIDAD TÉCNICA</div>
                  <GpsTimeCode />
                </div>
              </div>

              {/* Protocol Badge tag */}
              <div className={`px-4.5 py-2 rounded-xl border text-[10px] font-mono font-black uppercase tracking-[0.15em] ${badgeTextTheme} shadow-sm`}>
                {currentMetadata.protocol}
              </div>
            </div>

            {/* Control Panel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              
              {/* Left Column: Descriptions */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className={`text-[10px] font-mono font-black uppercase tracking-[0.2em] ${textHighlightTheme} border-b-2 border-current/25 pb-1`}>
                    SOCIO DE INTEGRACIÓN TERRITORIAL
                  </span>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight mt-4 mb-4">
                    {activePartnerName}
                  </h3>
                  <p className="text-slate-650 text-sm font-light leading-relaxed">
                    {currentMetadata.desc}
                  </p>
                </div>

                <div className="p-6 rounded-[2rem] bg-slate-50/80 border border-slate-200/50 space-y-3 backdrop-blur-sm relative">
                  {/* Decorative L corner in nested box */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-slate-350 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-slate-350 pointer-events-none" />
                  
                  <div className={`flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest ${textHighlightTheme}`}>
                    <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
                    Impacto Técnico de Operación
                  </div>
                  <p className="text-slate-650 text-xs font-light leading-relaxed">
                    {currentMetadata.impact}
                  </p>
                </div>

                {/* Control Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={handlePingTest}
                    disabled={pingState === "pinging"}
                    className={`px-7 py-4 rounded-2xl text-[10px] font-mono font-black uppercase tracking-[0.15em] transition-all duration-350 flex items-center gap-2.5 shadow-md hover:shadow-lg
                      ${pingState === "pinging"
                        ? "bg-slate-100 text-slate-405 border border-slate-250 cursor-not-allowed"
                        : "bg-slate-950 text-white hover:bg-slate-850 border border-slate-950 hover:scale-[1.02] active:scale-[0.98]"
                      }
                    `}
                  >
                    {pingState === "pinging" ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                        Comprobando Enlace...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 text-cyan-400" />
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
                    className="px-7 py-4 bg-white border border-slate-205 rounded-2xl text-[10px] font-mono font-black text-slate-700 hover:text-slate-950 hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
                  >
                    Descargar Esquema XML
                  </a>
                </div>
              </div>

              {/* Right Column: Telemetry metrics, Graph & Live CLI */}
              <div className="lg:col-span-5 space-y-7">
                
                {/* Visual Interconnection Network Node Graph */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-5 flex flex-col items-center justify-between relative overflow-hidden h-[135px]">
                  <div className="absolute top-3 left-4 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    DIAGRAMA DE ENLACE ACTIVO
                  </div>
                  
                  {/* SVG Network Graph */}
                  <svg className="w-full h-full pt-5" viewBox="0 0 320 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      stroke={pingState === "pinging" ? "#f97316" : "rgba(226,222,212, 1)"} 
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
                    <circle cx="40" cy="30" r="12" fill="#181714" />
                    <circle cx="40" cy="30" r="16" stroke="#b88f3e" strokeWidth="1" strokeDasharray="3 3" className="animate-spin-slow" />
                    <circle cx="40" cy="30" r="8" fill="#ddbe7a" />
                    <text x="40" y="54" fill="#716c63" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">DEVGIZ CORE</text>

                    {/* Node B: Remote Entity */}
                    <circle cx="280" cy="30" r="12" fill="#3d3a35" />
                    <circle cx="280" cy="30" r="16" stroke={svgParticleColor} strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="280" cy="30" r="7.5" fill={svgParticleColor} />
                    <text x="280" y="54" fill="#716c63" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{activePartnerName}</text>
                  </svg>
                </div>

                {/* Developer CLI Console Logs */}
                <div className="bg-slate-950 rounded-3xl border border-slate-900 p-5 font-mono text-[10px] leading-relaxed text-cyan-400/90 shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 blur-xl pointer-events-none rounded-full" />
                  
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-slate-500 animate-pulse" />
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.1em]">SALIDA DE CONSOLA DE SINCRONIZACIÓN</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-black tracking-widest border border-emerald-500/20">LIVE</span>
                  </div>

                  <div className="h-[135px] overflow-y-auto space-y-1.5 custom-scrollbar text-left relative z-10">
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
                <div className="grid grid-cols-3 gap-3.5">
                  <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-3.5 text-center">
                    <div className="text-[10px] font-mono text-slate-450 uppercase tracking-wider">LATENCIA</div>
                    <div className={`font-mono text-xs font-black mt-1 ${textHighlightTheme}`}>{pingLatency}</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-3.5 text-center">
                    <div className="text-[10px] font-mono text-slate-450 uppercase tracking-wider">VELOCIDAD</div>
                    <div className={`font-mono text-xs font-black mt-1 ${textHighlightTheme}`}>{currentMetadata.rate}</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-3.5 text-center">
                    <div className="text-[10px] font-mono text-slate-450 uppercase tracking-wider">CANAL</div>
                    <div className="font-mono text-[10px] font-black text-emerald-600 mt-1.5 uppercase truncate">{currentMetadata.quality.split(" ")[0]}</div>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Standards Compliance Badges */}
      <div className="flex flex-wrap justify-center gap-3.5 px-6 relative z-10">
        {STANDARDS.map((std, i) => {
          let badgeDotColor = "bg-cyan-500";
          if (std.color === "emerald") badgeDotColor = "bg-emerald-500";
          if (std.color === "blue") badgeDotColor = "bg-blue-500";
          if (std.color === "amber") badgeDotColor = "bg-amber-500";
          if (std.color === "red") badgeDotColor = "bg-red-500";

          return (
            <div 
              key={i} 
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm hover:border-cyan-500/30 hover:shadow-md transition-all duration-300 cursor-default group"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${badgeDotColor} animate-pulse`}></div>
              <span className="text-[10px] font-mono text-slate-650 group-hover:text-slate-900 transition-colors uppercase tracking-wider font-extrabold">
                {std.text}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
