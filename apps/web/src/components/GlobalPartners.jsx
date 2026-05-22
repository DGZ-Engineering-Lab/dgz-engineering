"use client";

/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";

const INSTITUTIONS = [
  { name: "IGAC", sub: "AUTORIDAD CATASTRAL", color: "emerald", logo: "https://www.igac.gov.co/sites/default/files/2023-05/Logo%20IGAC%2003.svg" },
  { name: "SNR", sub: "REGISTRO INMOBILIARIO", color: "red", logo: "https://www.vur.gov.co/portal/resources/images/LogoSNR.png" },
  { name: "DNP", sub: "PLANEACIÓN NACIONAL", color: "blue", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtFZUqE_-Syl04f9K4xSypL0WTaJZscWtrw&s" },
  { name: "ANT", sub: "AGENCIA DE TIERRAS", color: "emerald", logo: "https://observatorio.ant.gov.co/sites/default/files/2025-02/imagenes/svgs/logo-agencia-nacional-de-tierras.svg" },
  { name: "UPRA", sub: "PLANIFICACIÓN RURAL", color: "orange", logo: "https://www.icde.gov.co/sites/default/files/ides/logo%20upra.png" },
  { name: "DANE", sub: "INFORMACIÓN ESTADÍSTICA", color: "indigo", logo: "https://www.dane.gov.co/images/logo-portal-dane.svg" }
];

const CLIENTS = [
  { name: "CINTELI GROUP", url: "https://cinteligroup.com/", logo: "https://cinteligroup.com/images/LOGOCINTELICIUDADES-removebg-preview.png" },
  { name: "IGGA", url: "https://igga.com.co/", logo: "https://igga.com.co/wp-content/uploads/2022/08/Logo_IGGA_Blanco.png" },
  { name: "ISA INTERCOLOMBIA", url: "https://colombia.isaenergia.com/isaintercolombia/", logo: "https://scontent.fctg2-1.fna.fbcdn.net/v/t39.30808-1/615885389_1200345768979649_674260997731668748_n.jpg?stp=c130.0.1588.1588a_cp0_dst-jpg_s50x50_tt6&_nc_cat=105&ccb=1-7&_nc_sid=f907e8&_nc_ohc=2igW9t3rngUQ7kNvwGJijto&_nc_oc=AdodqoL5Ag5qaFfkQfPFj3wIq0Rxlvg_Bya6wZKdNZkesBw_QzMcaVK63Tq34IU42GZiPlZx5AjSHAxXaPWGN-sP&_nc_zt=24&_nc_ht=scontent.fctg2-1.fna&edm=ADwHzz8EAAAA&_nc_gid=_kclQmZY59UpDsdXchelCQ&oh=00_Af41NrBUXh1UogerT1GMsFsHNOL7Rks592MY8A6HjowtRg&oe=6A0C5156" },
  { name: "ARBITRIUM", url: "https://www.arbitrium.com.co/", logo: "https://www.arbitrium.com.co/assets/img/grande.png" },
  { name: "GEOSAT", url: "https://geosat.com.co/es", logo: "https://geosat.com.co/logos/lockup-black-tight.svg" },
  { name: "DEER", url: "https://deer.com.co/", logo: "https://cdn-ileimge.nitrocdn.com/fpXuxNvpGBHXdUXQieHOZUiZoJRvuprb/assets/images/optimized/rev-e4713a4/deer.com.co/wp-content/uploads/2024/09/DEER-OD-BLANCO.webp" },
  { name: "FNA", url: "https://www.fna.gov.co/", logo: "https://www.fna.gov.co/Style%20Library/fna/img/logo-fna.png" },
  { name: "SICARARE (COSARGO)", url: "https://extractorasicarare.com/cosargo/", logo: "https://extractorasicarare.com/wp-content/uploads/2021/04/Logo-Sicarare-01.png" }
];

const STANDARDS = [
  { text: "Resolución 1040 de 2023 (IGAC)", color: "emerald" },
  { text: "Resolución 746 de 2024 (IGAC)", color: "blue" },
  { text: "Estándar LADM-COL V3.0", color: "amber" },
  { text: "Interoperabilidad SNR-IGAC", color: "red" }
];

export default function GlobalPartners() {
  // Combinar listas para dar volumen al carrusel infinito
  const fullPartnerList = [...INSTITUTIONS, ...CLIENTS, ...INSTITUTIONS, ...CLIENTS];

  return (
    <section className="py-24 bg-transparent border-t border-slate-100 overflow-hidden relative">
      {/* Glow sutil en el fondo claro */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/5 to-indigo-500/5 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
         <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Nuestros Clientes & <span className="text-slate-400 font-light italic">Aliados Estratégicos</span>
         </h2>
         <p className="text-slate-500 text-sm font-light leading-relaxed max-w-2xl">
            Interoperabilidad técnica, regulatoria y operativa con los líderes públicos y corporativos del desarrollo territorial en Colombia.
         </p>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative mb-20 z-10 w-full overflow-hidden">
        <motion.div 
          className="flex gap-8 items-center whitespace-nowrap"
          animate={{ x: [0, -2000] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ width: "fit-content" }}
        >
          {fullPartnerList.map((partner, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center gap-3 group cursor-pointer inline-flex shrink-0 transition-all duration-300"
            >
               <div className="h-20 w-36 flex items-center justify-center p-3 bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(15,23,42,0.12)] hover:border-cyan-500/30 group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  {/* Para logos de fondo oscuro (como IGGA) colocamos un overlay oscuro translúcido o los mostramos normales */}
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 contrast-125 group-hover:contrast-100 transition-all duration-500" 
                    onError={(e) => {
                      // Fallback en caso de link roto
                      e.target.style.display = 'none';
                    }}
                  />
               </div>
               <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-black text-slate-800 tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
                    {partner.name}
                  </span>
                  {partner.sub ? (
                    <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      {partner.sub}
                    </span>
                  ) : (
                    <span className="text-[7px] font-bold text-cyan-600 uppercase tracking-widest mt-0.5">
                      Socio Corporativo
                    </span>
                  )}
               </div>
            </div>
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
