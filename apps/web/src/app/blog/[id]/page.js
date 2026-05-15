"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Logo from "../../../components/Logo";

// --- INTERACTIVE COMPONENTS (IMMERSION LABS) ---

const CybersecurityLab = () => {
  const [status, setStatus] = useState("IDLE");
  const [logs, setLogs] = useState([]);
  
  const runAudit = () => {
    setStatus("RUNNING");
    setLogs(["[INIT] Iniciando protocolo de blindaje...", "[AUTH] Verificando firma ICDE...", "[SCAN] Escaneando integridad de nodos distribuidos..."]);
    
    setTimeout(() => setLogs(prev => [...prev, "[OK] Capa AES-256-GCM detectada.", "[OK] Trazabilidad forense activa."]), 1500);
    setTimeout(() => {
      setStatus("COMPLETED");
      setLogs(prev => [...prev, "[SUCCESS] El nodo catastral es 100% resiliente."]);
    }, 3000);
  };

  return (
    <div className="my-12 p-8 bg-[#1a1a1a] rounded-sm border border-slate-800 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Immersion Lab // Security Audit Simulator</span>
      </div>
      <div className="min-h-[200px] font-mono text-xs space-y-2 mb-8 overflow-y-auto max-h-[300px] text-cyan-500/80">
        {logs.map((log, i) => <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i}>{log}</motion.div>)}
        {status === "IDLE" && <div className="text-slate-600">Esperando ejecución del operador...</div>}
      </div>
      <button 
        onClick={runAudit}
        disabled={status === "RUNNING"}
        className="w-full py-4 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
      >
        {status === "RUNNING" ? "PROCESANDO..." : "EJECUTAR ESCANEO DE INTEGRIDAD"}
      </button>
    </div>
  );
};

const InteroperabilityLab = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Data Cruda", desc: "Datos municipales sin formato (Excel/CSV)." },
    { label: "Mapeo LADM-COL", desc: "Traducción a clases de la ISO 19152." },
    { label: "Esquema XTF", desc: "Generación de archivo INTERLIS validado." }
  ];

  return (
    <div className="my-12 p-8 bg-[#fafafa] border border-slate-200 rounded-sm">
      <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-8">Pipeline de Interoperabilidad INTERLIS</h4>
      <div className="flex justify-between relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -translate-y-1/2"></div>
        {steps.map((s, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${step >= i ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
              {i + 1}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${step === i ? 'text-[#1a1a1a]' : 'text-slate-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="p-6 bg-white border border-slate-100 rounded-sm mb-6 min-h-[80px]">
        <p className="text-xs text-slate-500 leading-relaxed italic">{steps[step].desc}</p>
      </div>
      <button 
        onClick={() => setStep((step + 1) % steps.length)}
        className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] hover:underline"
      >
        Siguiente Paso del Proceso →
      </button>
    </div>
  );
};

const LidarLab = () => {
  const [slider, setSlider] = useState(50);
  return (
    <div className="my-12 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Visualizador de Precisión DevGiz</span>
        <span className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest">LiDAR vs Satélite</span>
      </div>
      <div className="relative h-[400px] bg-slate-100 overflow-hidden rounded-sm border border-slate-200">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="LiDAR View"
        />
        <div 
          className="absolute inset-0 w-full h-full object-cover bg-black/40 backdrop-blur-[2px]" 
          style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover grayscale brightness-50" 
            alt="Satellite View"
          />
        </div>
        <div 
          className="absolute top-0 bottom-0 w-px bg-white z-20 cursor-ew-resize"
          style={{ left: `${slider}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl border border-slate-200">
            <span className="text-[10px]">↔</span>
          </div>
        </div>
        <input 
          type="range" min="0" max="100" value={slider} 
          onChange={(e) => setSlider(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        />
      </div>
      <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest italic">Desliza para comparar la densidad de puntos LiDAR contra el estándar satelital.</p>
    </div>
  );
};

// --- DATA ---

const BLOG_DATA = {
  "1": {
    title: "Soberanía Digital y la Protección de Activos Territoriales",
    subtitle: "Ransomware, ICDE y la nueva era de la seguridad jurídica en Colombia.",
    category: "Ciberseguridad",
    date: "12 Mayo, 2026",
    author: "Dirección de Ciberseguridad",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    content: `
      <section class="space-y-8">
        <p class="text-xl text-slate-600 font-light leading-relaxed">
          Los recientes ataques cibernéticos a bases de datos municipales en Colombia han subrayado una verdad incómoda: la información territorial es hoy un activo crítico de seguridad nacional. En DevGiz, no solo gestionamos datos; protegemos la soberanía jurídica de los ciudadanos.
        </p>
        
        <h2 class="text-3xl font-black text-[#1a1a1a] pt-8">La Meta: Resiliencia ante Ransomware</h2>
        <p>A diferencia de los sistemas tradicionales, nuestra arquitectura de <strong>Nodos Descentralizados</strong> garantiza que, incluso bajo ataque, la integridad del catastro permanezca inalterable. Seguimos los lineamientos de la ICDE (Infraestructura Colombiana de Datos Espaciales) para asegurar que el intercambio de datos sea un proceso blindado.</p>
      </section>
    `,
    lab: <CybersecurityLab />,
    sidebar: {
      metrics: [
        { label: "Encriptación", value: "AES-256-GCM" },
        { label: "Standard", value: "ISO 27001 / ICDE" },
        { label: "Uptime", value: "99.999%" }
      ],
      relatedProject: "Seguridad Territorial"
    }
  },
  "2": {
    title: "El Estándar LADM-COL como Eje de Interoperabilidad",
    subtitle: "Cómo el Valle del Cauca y Villavicencio están transformando el Catastro Multipropósito.",
    category: "Interoperabilidad",
    date: "10 Mayo, 2026",
    author: "Ingeniería Territorial",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    content: `
      <section class="space-y-8">
        <p class="text-xl text-slate-600 font-light leading-relaxed">
          La interoperabilidad no es solo una palabra técnica; es el puente que permite que el IGAC, el SNR y los municipios hablen el mismo idioma. El estándar <strong>LADM-COL (ISO 19152)</strong> es el corazón de este lenguaje universal.
        </p>

        <h2 class="text-3xl font-black text-[#1a1a1a]">INTERLIS: El Formato de Intercambio .XTF</h2>
        <p>En DevGiz, hemos perfeccionado el pipeline de validación de archivos XTF. Esto permite que municipios como los del Valle del Cauca descentralicen su catastro con la confianza de que cada registro cumple con la norma nacional sin fricciones técnicas.</p>
      </section>
    `,
    lab: <InteroperabilityLab />,
    sidebar: {
      metrics: [
        { label: "Formato", value: "INTERLIS .xtf" },
        { label: "Modelo", value: "LADM-COL v3.0" },
        { label: "Validación", value: "Automática" }
      ],
      relatedProject: "Catastro Digital"
    }
  },
  "3": {
    title: "ConstruMetrix: La Precisión LiDAR en la Ciudad Inteligente",
    subtitle: "Del gemelo digital a la toma de decisiones basada en realidades físicas.",
    category: "Ingeniería",
    date: "05 Mayo, 2026",
    author: "Laboratorio Geo-AI",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200",
    content: `
      <section class="space-y-8">
        <p class="text-xl text-slate-600 font-light leading-relaxed">
          Un gemelo digital es tan útil como la precisión de sus datos. Mientras que los sistemas estándar se conforman con resoluciones satelitales, DevGiz implementa sensores LiDAR para capturar la infraestructura con precisión milimétrica.
        </p>

        <h2 class="text-3xl font-black text-[#1a1a1a]">Ventajas Competitivas</h2>
        <p>La ventaja de nuestra tecnología radica en la densidad de la nube de puntos. Esto permite identificar patologías en vías, medir volúmenes exactos de construcción y predecir el impacto de nuevas obras con un margen de error inexistente.</p>
      </section>
    `,
    lab: <LidarLab />,
    sidebar: {
      metrics: [
        { label: "Densidad", value: "> 50 pts/m2" },
        { label: "Precisión", value: "< 1.5 cm" },
        { label: "Visualización", value: "Digital Twin" }
      ],
      relatedProject: "ConstruMetrix 3D"
    }
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id;
  const post = BLOG_DATA[id];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#1a1a1a]">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black">404 // Artículo No Encontrado</h1>
          <Link href="/blog" className="text-slate-500 hover:underline">Volver al Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white text-[#1a1a1a] min-h-screen pt-32 pb-20">
      <article className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8">
            <div className="space-y-8 mb-20 border-b border-slate-100 pb-16">
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em]">
                <span className="text-[#1a1a1a] font-bold">{post.category}</span>
                <span>/</span>
                <span>{post.date}</span>
                <span>/</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-[#1a1a1a]">
                {post.title}
              </h1>
              <p className="text-2xl text-slate-500 font-light italic border-l-2 border-slate-200 pl-8 py-2">
                {post.subtitle}
              </p>
            </div>

            <div className="aspect-[21/9] overflow-hidden bg-slate-100 mb-20 rounded-sm">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale-[0.2]" />
            </div>

            {/* Immersion Lab - This makes it unique */}
            {post.lab}

            <div 
              className="prose prose-slate max-w-none 
                prose-p:text-xl prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-light
                prose-h2:text-4xl prose-h2:font-black prose-h2:tracking-tight prose-h2:text-[#1a1a1a]
                prose-strong:text-[#1a1a1a] prose-strong:font-bold
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-20 pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <Logo className="w-12 h-12 opacity-80" />
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">DevGiz Engineering</span>
                  <span className="text-[10px] text-slate-400 font-mono">Knowledge Repository</span>
                </div>
              </div>
              <Link href="/projects" className="px-8 py-4 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl">
                Ver Proyectos Relacionados
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="p-10 bg-[#fafafa] border border-slate-100 rounded-sm">
                <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-10 border-b border-slate-200 pb-4">
                  Data & Compliance
                </h3>
                <div className="space-y-10">
                  {post.sidebar.metrics.map(stat => (
                    <div key={stat.label} className="space-y-1">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-2xl font-black text-[#1a1a1a] tracking-tight">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-[#1a1a1a] text-white space-y-8 rounded-sm">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Estrategia Terrritorial</div>
                <h4 className="text-2xl font-black tracking-tight leading-tight">Implemente el estándar nacional en su municipio.</h4>
                <p className="text-slate-400 text-sm font-light">Especialistas en modelos extendidos LADM-COL.</p>
                <Link href="/#contact" className="block text-center py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all">Contactar Consultoría</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
