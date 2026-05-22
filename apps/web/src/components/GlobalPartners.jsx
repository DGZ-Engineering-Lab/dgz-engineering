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
  CheckCircle, 
  Wifi, 
  Compass, 
  Fingerprint,
  Grid
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
  { name: "CINTELI GROUP", logo: "https://cinteligroup.com/images/LOGOCINTELICIUDADES-removebg-preview.png", type: "client", isWhite: false },
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
    // Calculate rotation (-10 to 10 degrees)
    const rotateX = -(mouseY / (height / 2)) * 12;
    const rotateY = (mouseX / (width / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Color specific border glowing highlights based on active partners
  const borderGlowClass = isActive 
    ? "border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.35)] scale-105 z-10" 
    : "border-slate-200/80 hover:border-cyan-500/40 hover:shadow-[0_12px_24px_rgba(6,182,212,0.15)]";

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
      className="flex flex-col items-center gap-3 group cursor-pointer inline-flex shrink-0 select-none pb-2"
    >
      <div 
        className={`h-16 w-32 md:h-20 md:w-36 flex items-center justify-center p-3.5 bg-white/95 rounded-2xl border backdrop-blur-md transition-all duration-300 relative overflow-hidden ${borderGlowClass}`}
      >
        {/* Holographic scanner effect line inside hovered cards */}
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent -translate-y-full group-hover:animate-scanner pointer-events-none" />
        
        {/* Ambient interior glow */}
        <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isActive ? 'from-cyan-500/5 to-cyan-500/5 opacity-100' : ''}`} />

        {imgFailed || !partner.logo ? (
          <div className="w-full h-full flex flex-col items-center justify-center relative rounded-xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/70 overflow-hidden">
            {/* Miniature grid map mesh */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]"></div>
            <span className="text-[11px] font-black tracking-widest text-slate-800 font-mono relative z-10">
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
        <span className={`text-[10px] font-black tracking-tight transition-colors duration-300 ${isActive ? 'text-cyan-600' : 'text-slate-800 opacity-80 group-hover:opacity-100 group-hover:text-slate-900'}`}>
          {partner.name}
        </span>
        <span className={`text-[7px] font-bold uppercase tracking-widest mt-0.5 transition-colors duration-300 ${isActive ? 'text-cyan-500' : 'text-slate-400 group-hover:text-cyan-500'}`}>
          {partner.type === "institution" ? "GOV · INSTITUCIONAL" : "CLIENTE SOCIO"}
        </span>
      </div>
    </motion.div>
  );
}

export default function GlobalPartners() {
  const [activePartnerName, setActivePartnerName] = useState("IGAC");
  const [filter, setFilter] = useState("all"); // 'all', 'institution', 'client'
  
  // Dynamic tick for simulated metrics
  const [timeCode, setTimeCode] = useState("GPS-UTC LOCK: 15:09:22.42");
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTimeCode(`GPS-UTC LOCK: ${d.toTimeString().split(' ')[0]}.${Math.floor(Math.random() * 99)}`);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  // Filter partners dynamically
  const filteredRow1 = ROW1.filter(p => filter === "all" || p.type === filter);
  const filteredRow2 = ROW2.filter(p => filter === "all" || p.type === filter);

  // Fallback to avoid empty rows
  const displayRow1 = filteredRow1.length > 0 ? filteredRow1 : ROW1;
  const displayRow2 = filteredRow2.length > 0 ? filteredRow2 : ROW2;

  // Duplicate elements for infinite scroll loop
  const row1Extended = [...displayRow1, ...displayRow1, ...displayRow1];
  const row2Extended = [...displayRow2, ...displayRow2, ...displayRow2];

  const currentMetadata = INTEGRATIONS_METADATA[activePartnerName] || INTEGRATIONS_METADATA["IGAC"];

  // Neon gradient themes for dynamic coloring in the HUD Control Center
  const activeColorTheme = currentMetadata.color || "cyan";
  const glowBorderClass = {
    cyan: "border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)]",
    blue: "border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    emerald: "border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    amber: "border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)]",
    indigo: "border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)]",
    orange: "border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
  }[activeColorTheme];

  const badgeTextTheme = {
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-500/20",
    blue: "text-blue-400 bg-blue-400/10 border-blue-500/20",
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-400/10 border-amber-500/20",
    indigo: "text-indigo-400 bg-indigo-400/10 border-indigo-500/20",
    orange: "text-orange-400 bg-orange-400/10 border-orange-500/20"
  }[activeColorTheme];

  const ledDotTheme = {
    cyan: "bg-cyan-400 shadow-[0_0_10px_#22d3ee]",
    blue: "bg-blue-400 shadow-[0_0_10px_#60a5fa]",
    emerald: "bg-emerald-400 shadow-[0_0_10px_#34d399]",
    amber: "bg-amber-400 shadow-[0_0_10px_#fbbf24]",
    indigo: "bg-indigo-400 shadow-[0_0_10px_#818cf8]",
    orange: "bg-orange-400 shadow-[0_0_10px_#fb923c]"
  }[activeColorTheme];

  return (
    <section className="py-28 bg-transparent border-t border-slate-100 overflow-hidden relative">
      {/* Dynamic Keyframes inject */}
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
          gap: 2rem;
          width: max-content;
          animation: marquee-forward 48s linear infinite;
        }
        .animate-marquee-backward {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee-backward 48s linear infinite;
        }
        .marquee-container:hover .animate-marquee-forward,
        .marquee-container:hover .animate-marquee-backward {
          animation-play-state: paused;
        }
        .animate-scanner {
          animation: scanner 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />

      {/* Decorative Blueprint Light Mesh */}
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

          {/* Filter System Deck */}
          <div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-full border border-slate-200/50 self-start lg:self-auto">
            <button 
              onClick={() => setFilter("all")}
              className={`px-5 py-2 text-[9px] font-black uppercase tracking-wider rounded-full transition-all duration-300 ${filter === "all" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            >
              Todos ({ROW1.length + ROW2.length})
            </button>
            <button 
              onClick={() => setFilter("institution")}
              className={`px-5 py-2 text-[9px] font-black uppercase tracking-wider rounded-full transition-all duration-300 ${filter === "institution" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            >
              Gobierno (GOV)
            </button>
            <button 
              onClick={() => setFilter("client")}
              className={`px-5 py-2 text-[9px] font-black uppercase tracking-wider rounded-full transition-all duration-300 ${filter === "client" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            >
              Sector Privado
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Banner Alert */}
        <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-4 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <span className="font-light text-slate-600">
              Haz clic sobre el logotipo de cualquier entidad para sincronizar el **Centro de Control Técnico e Interoperabilidad** en tiempo real.
            </span>
          </div>
          <span className="font-mono text-[9px] text-cyan-600 bg-cyan-500/10 px-2.5 py-1 rounded-md self-start sm:self-auto font-black tracking-widest uppercase">
            SISTEMA HOLOGRÁFICO CONECTADO
          </span>
        </div>

      </div>

      {/* Infinite Horizontal Dual Marquee with Soft Edge Vignettes */}
      <div className="relative z-10 w-full overflow-hidden marquee-container space-y-12 mb-16 py-6">
        
        {/* Soft edge gradient fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none"></div>

        {/* Row 1 - Forward Scroll */}
        <div className="overflow-hidden flex w-full">
          <div className="animate-marquee-forward">
            {row1Extended.map((partner, i) => (
              <PartnerCard 
                key={`row1-${partner.name}-${i}`} 
                partner={partner} 
                activePartner={activePartnerName} 
                onSelect={(name) => setActivePartnerName(name)} 
              />
            ))}
          </div>
        </div>

        {/* Row 2 - Backward Scroll */}
        <div className="overflow-hidden flex w-full">
          <div className="animate-marquee-backward">
            {row2Extended.map((partner, i) => (
              <PartnerCard 
                key={`row2-${partner.name}-${i}`} 
                partner={partner} 
                activePartner={activePartnerName} 
                onSelect={(name) => setActivePartnerName(name)} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TECHNICAL CONTROL CENTER HUD BOARD (COMMAND TELEMETRY)   */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePartnerName}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full bg-slate-950/95 border rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden backdrop-blur-2xl ring-1 ring-white/10 ${glowBorderClass}`}
          >
            {/* Technical grid overlay on background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:20px_20px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Top telemetry bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${ledDotTheme} animate-pulse`} />
                <div>
                  <div className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">INTEROPERABILITY STATUS</div>
                  <div className="text-[9px] font-mono text-slate-500 mt-0.5">{timeCode}</div>
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
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest">SOCIOS DE INTEGRACIÓN COLOMBIA</span>
                  <h3 className="text-3xl font-black text-white tracking-tight mt-1 mb-3">
                    {activePartnerName}
                  </h3>
                  <p className="text-slate-350 text-sm font-light leading-relaxed">
                    {currentMetadata.desc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-[9px] font-black uppercase tracking-widest">
                    <Activity className="w-3.5 h-3.5" />
                    Impacto Técnico de Operación
                  </div>
                  <p className="text-slate-400 text-xs font-light leading-relaxed">
                    {currentMetadata.impact}
                  </p>
                </div>
              </div>

              {/* Right Column: Telemetry metrics */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 w-full">
                
                {/* Metric 1: Latency */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/10">
                      <Wifi className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">LATENCIA LINK</div>
                      <div className="font-mono text-sm font-bold text-white mt-0.5">{currentMetadata.latency}</div>
                    </div>
                  </div>
                  <span className="text-[7px] font-mono text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">FAST</span>
                </div>

                {/* Metric 2: Data Rate */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/10">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">TASA DE DATOS</div>
                      <div className="font-mono text-sm font-bold text-white mt-0.5">{currentMetadata.rate}</div>
                    </div>
                  </div>
                  <span className="text-[7px] font-mono text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">STREAM</span>
                </div>

                {/* Metric 3: Sync Status */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/10">
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">CALIDAD SYNC</div>
                      <div className="font-mono text-xs font-bold text-white mt-0.5 tracking-tighter truncate max-w-[120px]">{currentMetadata.quality}</div>
                    </div>
                  </div>
                  <span className="text-[7px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">LOCK</span>
                </div>

              </div>

            </div>

            {/* Bottom HUD grid coordinate indicators */}
            <div className="flex justify-between items-center border-t border-white/5 pt-5 mt-8 text-[8px] font-mono text-slate-500 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Grid className="w-3.5 h-3.5" /> GRID REF CTM12: X 4.552.122 · Y 1.933.411</span>
              <span className="hidden sm:inline">DEVGIZ CO-OPS MULTIPURPOSE PROTOCOLS v3.1</span>
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
              <span className="text-[10px] font-mono text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider font-bold">
                {std.text}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
