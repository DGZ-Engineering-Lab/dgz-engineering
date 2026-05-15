"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  { name: "QGIS", sub: "SIG" }, { name: "ArcGIS", sub: "SIG" }, { name: "PostGIS", sub: "GEO DB" },
  { name: "GeoServer", sub: "OGC" }, { name: "GDAL", sub: "GEO" }, { name: "Leaflet", sub: "MAPAS" },
  { name: "MapBox", sub: "MAPAS" }, { name: "OpenLayers", sub: "MAPAS" }, { name: "Python", sub: "IA/ML" },
  { name: "Django", sub: "API" }, { name: "Java", sub: "ENTERPRISE" }, { name: "Node.js", sub: "BACKEND" },
  { name: "React", sub: "FRONT" }, { name: "Next.js", sub: "FRONT" }, { name: "TypeScript", sub: "LANG" },
  { name: "Flutter", sub: "MOBILE" }, { name: "Kotlin", sub: "ANDROID" }, { name: "PostgreSQL", sub: "DB" },
  { name: "Oracle", sub: "DB" }, { name: "MongoDB", sub: "NOSQL" }, { name: "Redis", sub: "CACHE" },
  { name: "Elasticsearch", sub: "SEARCH" }, { name: "TensorFlow", sub: "ML" }, { name: "Scikit-learn", sub: "ML" },
  { name: "OpenAI", sub: "LLM" }, { name: "Claude", sub: "LLM" }, { name: "Gemini", sub: "LLM" },
  { name: "LLaMA", sub: "OPEN LLM" }, { name: "AWS", sub: "CLOUD" }, { name: "Azure", sub: "CLOUD" },
  { name: "GCloud", sub: "CLOUD" }, { name: "Docker", sub: "CONTAINERS" }, { name: "Kubernetes", sub: "ORQUESTACIÓN" },
  { name: "Terraform", sub: "IAC" }, { name: "Git", sub: "VCS" }
];

export default function TechTicker() {
  return (
    <div className="w-full bg-[#02040a] py-6 overflow-hidden border-y border-slate-800/30 relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#02040a] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#02040a] to-transparent z-10"></div>
      
      <motion.div 
        className="flex gap-12 items-center whitespace-nowrap"
        animate={{ x: [0, -2000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
          <div key={i} className="flex flex-col items-start group">
            <span className="text-sm font-black text-slate-300 group-hover:text-cyan-400 transition-colors tracking-tighter">
              {tech.name}
            </span>
            <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
              {tech.sub}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
