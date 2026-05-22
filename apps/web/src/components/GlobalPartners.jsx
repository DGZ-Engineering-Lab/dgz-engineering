"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { motion } from "framer-motion";

const INSTITUTIONS = [
  { 
    name: "IGAC", 
    sub: "GOV · CATASTRO NACIONAL", 
    logo: "https://www.igac.gov.co/sites/default/files/2023-05/Logo%20IGAC%2003.svg",
    isWhite: false 
  },
  { 
    name: "AMVA", 
    sub: "GOV · ÁREA METROPOLITANA", 
    logo: "https://www.metropol.gov.co/Style%20Library/images/logo.png",
    isWhite: false 
  },
  { 
    name: "SNR", 
    sub: "REGISTRO INMOBILIARIO", 
    logo: "https://www.vur.gov.co/portal/resources/images/LogoSNR.png",
    isWhite: false 
  },
  { 
    name: "DNP", 
    sub: "PLANEACIÓN NACIONAL", 
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtFZUqE_-Syl04f9K4xSypL0WTaJZscWtrw&s",
    isWhite: false 
  },
  { 
    name: "ANT", 
    sub: "AGENCIA DE TIERRAS", 
    logo: "https://observatorio.ant.gov.co/sites/default/files/2025-02/imagenes/svgs/logo-agencia-nacional-de-tierras.svg",
    isWhite: false 
  },
  { 
    name: "UPRA", 
    sub: "PLANIFICACIÓN RURAL", 
    logo: "https://www.icde.gov.co/sites/default/files/ides/logo%20upra.png",
    isWhite: false 
  },
  { 
    name: "DANE", 
    sub: "INFORMACIÓN ESTADÍSTICA", 
    logo: "https://www.dane.gov.co/images/logo-portal-dane.svg",
    isWhite: false 
  }
];

const CLIENTS = [
  { 
    name: "CINTELI GROUP", 
    sub: "CLIENTE · TECNOLOGÍA URBANA", 
    logo: "https://cinteligroup.com/images/LOGOCINTELICIUDADES-removebg-preview.png",
    isWhite: false 
  },
  { 
    name: "IGGA", 
    sub: "CLIENTE · INGENIERÍA & GIS", 
    logo: "https://igga.com.co/wp-content/uploads/2022/08/Logo_IGGA_Blanco.png",
    isWhite: true 
  },
  { 
    name: "ISA ENERGÍA", 
    sub: "CLIENTE · OPERACIÓN Y MANTENIMIENTO", 
    logo: "https://colombia.isaenergia.com/wp-content/uploads/2025/12/Logo-ISA-Energia-1.svg",
    isWhite: false 
  },
  { 
    name: "ARBITRIUM", 
    sub: "CLIENTE · VALORACIÓN INMOBILIARIA", 
    logo: "https://www.arbitrium.com.co/assets/img/grande.png",
    isWhite: false 
  },
  { 
    name: "GEOSAT", 
    sub: "CLIENTE · CARTOGRAFÍA & DRONES", 
    logo: "https://geosat.com.co/logos/lockup-black-tight.svg",
    isWhite: false 
  },
  { 
    name: "DEER", 
    sub: "CLIENTE · SOLUCIONES GEOESPACIALES", 
    logo: "https://cdn-ileimge.nitrocdn.com/fpXuxNvpGBHXdUXQieHOZUiZoJRvuprb/assets/images/optimized/rev-3050f1c/deer.com.co/wp-content/uploads/2024/09/DEER-OD-BLANCO.webp",
    isWhite: true 
  },
  { 
    name: "FNA", 
    sub: "CLIENTE · SECTOR FINANCIERO", 
    logo: "https://www.fna.gov.co/Style%20Library/fna/img/logo-fna.png",
    isWhite: false 
  },
  { 
    name: "SICARARE (COSARGO)", 
    sub: "CLIENTE · AGROINDUSTRIA", 
    logo: "https://extractorasicarare.com/wp-content/uploads/2018/11/logo-ppal.png",
    isWhite: false 
  },
  { 
    name: "ADR", 
    sub: "CLIENTE · DESARROLLO RURAL", 
    logo: "/assets/img/clientes/ADR_BLANCO.png",
    isWhite: true 
  },
  { 
    name: "AMB", 
    sub: "CLIENTE · GESTIÓN AMBIENTAL", 
    logo: "/assets/img/clientes/AMB_BLANCO.png",
    isWhite: true 
  },
  { 
    name: "ANI", 
    sub: "CLIENTE · INFRAESTRUCTURA", 
    logo: "/assets/img/clientes/ANI_BLANCO.png",
    isWhite: true 
  },
  { 
    name: "CEIBAS", 
    sub: "CLIENTE · SERVICIOS PÚBLICOS", 
    logo: "/assets/img/clientes/CEIBAS_BLANCO.png",
    isWhite: true 
  },
  { 
    name: "VALOR+", 
    sub: "CLIENTE · GESTIÓN DIGITAL", 
    logo: "/assets/img/clientes/valormas.png",
    isWhite: false 
  },
  { 
    name: "EPM", 
    sub: "CLIENTE · SERVICIOS PÚBLICOS", 
    logo: "/assets/img/clientes/EPM_BLANCO.png",
    isWhite: true 
  },
  { 
    name: "GEB", 
    sub: "CLIENTE · ENERGÍA", 
    logo: "/assets/img/clientes/GEB_BLANCO.png",
    isWhite: true 
  },
  { 
    name: "INCODER", 
    sub: "CLIENTE · DESARROLLO RURAL", 
    logo: "/assets/img/clientes/INCODER_BLANCO.png",
    isWhite: true 
  },
  { 
    name: "METRO DE BOGOTÁ", 
    sub: "CLIENTE · MOVILIDAD URBANA", 
    logo: "/assets/img/clientes/METRO_BOGOTA_BLANCO.png",
    isWhite: true 
  },
  { 
    name: "GOBERNACIÓN DEL ATLÁNTICO", 
    sub: "CLIENTE · GOBIERNO TERRITORIAL", 
    logo: "https://www.atlantico.gov.co/images/gob-atl-2024.png",
    isWhite: false 
  },
  { 
    name: "ALCALDÍA DE YOPAL", 
    sub: "CLIENTE · GOBIERNO MUNICIPAL", 
    logo: "/assets/img/clientes/logo_municipio_Yopal.png",
    isWhite: false 
  },
  { 
    name: "ALCALDÍA DE SABANALARGA", 
    sub: "CLIENTE · GOBIERNO MUNICIPAL", 
    logo: "https://www.sabanalarga-atlantico.gov.co/sites/sabanalargaatlantico/content/files/000394/19651_7395_escudo300_200x200_200x200.png",
    isWhite: false 
  }
];

const STANDARDS = [
  { text: "Resolución 1040 de 2023 (IGAC)", color: "emerald" },
  { text: "Resolución 746 de 2024 (IGAC)", color: "blue" },
  { text: "Estándar LADM-COL V3.0", color: "amber" },
  { text: "Interoperabilidad SNR-IGAC", color: "red" }
];

function PartnerCard({ partner, type }) {
  const [imgFailed, setImgFailed] = useState(false);

  // Obtener iniciales en caso de fallo de imagen
  const getInitials = (name) => {
    return name
      .split(/[\s·-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer inline-flex shrink-0 transition-all duration-300">
      <div 
        className="h-16 w-32 md:h-20 md:w-36 flex items-center justify-center p-3 bg-white hover:bg-slate-900 border border-slate-200/80 hover:border-slate-800 rounded-2xl shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(15,23,42,0.15)] group-hover:scale-105 transition-all duration-300 relative overflow-hidden"
      >
        {imgFailed || !partner.logo ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-slate-800 group-hover:to-slate-800 rounded-xl border border-slate-100 group-hover:border-slate-700 transition-colors">
            <span className="text-sm font-black tracking-wider text-slate-800 group-hover:text-slate-200 transition-colors">
              {getInitials(partner.name)}
            </span>
          </div>
        ) : (
          <img 
            src={partner.logo} 
            alt={partner.name} 
            className={`max-h-full max-w-full object-contain transition-all duration-500
              ${partner.isWhite 
                ? 'brightness-0 opacity-40 group-hover:brightness-100 group-hover:opacity-100' 
                : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'
              }
            `}
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="text-[10px] font-black text-slate-800 tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
          {partner.name}
        </span>
        <span className="text-[7px] font-bold text-slate-400 group-hover:text-cyan-600 uppercase tracking-widest mt-0.5 transition-colors">
          {type === "institution" ? partner.sub : "Cliente de Confianza"}
        </span>
      </div>
    </div>
  );
}

export default function GlobalPartners() {
  // Combinar listas para dar volumen al carrusel infinito
  // Se marcan los elementos con su tipo correspondiente
  const mappedInstitutions = INSTITUTIONS.map(p => ({ ...p, type: "institution" }));
  const mappedClients = CLIENTS.map(p => ({ ...p, type: "client" }));
  
  const fullPartnerList = [
    ...mappedInstitutions, 
    ...mappedClients, 
    ...mappedInstitutions, 
    ...mappedClients
  ];

  return (
    <section className="py-24 bg-transparent border-t border-slate-100 overflow-hidden relative">
      {/* Glow sutil en el fondo claro */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/5 to-indigo-500/5 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
         <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Clientes que han <span className="text-slate-400 font-light italic">confiado en nosotros</span>
         </h2>
         <p className="text-slate-500 text-sm font-light leading-relaxed max-w-2xl">
            Interoperabilidad técnica, regulatoria y operativa con los líderes públicos y corporativos del desarrollo territorial en Colombia.
         </p>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative mb-20 z-10 w-full overflow-hidden">
        <motion.div 
          className="flex gap-8 items-center whitespace-nowrap"
          animate={{ x: [0, -3500] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ width: "fit-content" }}
        >
          {fullPartnerList.map((partner, i) => (
            <PartnerCard key={i} partner={partner} type={partner.type} />
          ))}
        </motion.div>
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
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:border-cyan-500/30 transition-all duration-300 cursor-default group"
            >
              <div className={`w-2 h-2 rounded-full ${badgeDotColor} animate-pulse`}></div>
              <span className="text-[10px] font-mono text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider">
                {std.text}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
