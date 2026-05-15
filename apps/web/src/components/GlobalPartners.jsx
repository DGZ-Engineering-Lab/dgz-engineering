"use client";

import { motion } from "framer-motion";

const INSTITUTIONS = [
  { name: "IGAC", sub: "AUTORIDAD CATASTRAL", color: "emerald", logo: "https://www.igac.gov.co/sites/default/files/2023-05/Logo%20IGAC%2003.svg" },
  { name: "SNR", sub: "REGISTRO INMOBILIARIO", color: "red", logo: "https://www.vur.gov.co/portal/resources/images/LogoSNR.png" },
  { name: "DNP", sub: "PLANEACIÓN NACIONAL", color: "blue", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtFZUqE_-Syl04f9K4xSypL0WTaJZscWtrw&s" },
  { name: "ANT", sub: "AGENCIA DE TIERRAS", color: "green", logo: "https://observatorio.ant.gov.co/sites/default/files/2025-02/imagenes/svgs/logo-agencia-nacional-de-tierras.svg" },
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
  return (
    <section className="py-24 bg-[#02040a] border-t border-slate-900 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-16">
         <h2 className="text-3xl font-black text-white tracking-tighter mb-2">
            Alianzas & <span className="text-slate-500 italic">Ecosistema</span>
         </h2>
         <p className="text-slate-500 text-sm font-light">Interoperabilidad técnica y estratégica con los líderes del sector.</p>
      </div>

      {/* Institutional Ticker */}
      <div className="relative mb-20">
        <motion.div 
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: [0, -1500] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...INSTITUTIONS, ...CLIENTS, ...INSTITUTIONS, ...CLIENTS].map((partner, i) => (
            <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer grayscale hover:grayscale-0 transition-all duration-700">
               <div className="h-16 w-32 flex items-center justify-center p-2 bg-white/5 border border-white/10 rounded-2xl group-hover:border-cyan-500/50 group-hover:bg-white/10 transition-all">
                  <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-white tracking-tighter opacity-50 group-hover:opacity-100">{partner.name}</span>
                  {partner.sub && <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">{partner.sub}</span>}
               </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Standards Bar */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-6">
        {STANDARDS.map((std, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-all shadow-lg backdrop-blur-md cursor-default group">
            <div className={`w-1.5 h-1.5 rounded-full bg-${std.color}-500 animate-pulse`}></div>
            <span className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors uppercase tracking-wider">{std.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
