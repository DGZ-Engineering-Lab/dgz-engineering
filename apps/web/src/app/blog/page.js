"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const CATEGORIES = [
  "Todos", "Ciberseguridad", "Interoperabilidad", "Casos de Éxito", "Ingeniería", "Gobernanza"
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Soberanía Digital y la Protección de Activos Territoriales",
    excerpt: "Un análisis sobre la importancia de la ciberseguridad en la gestión de datos catastrales y cómo las infraestructuras resilientes definen el futuro de las naciones modernas.",
    category: "Ciberseguridad",
    date: "12 Mayo, 2026",
    readTime: "12 min",
    complexity: "Nivel Institucional",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    featured: true
  },
  {
    id: 2,
    title: "El Estándar LADM-COL como Eje de Interoperabilidad",
    excerpt: "Exploramos los retos técnicos y operativos de implementar la ISO 19152 en el contexto colombiano, y cómo la armonización de datos impulsa la eficiencia administrativa.",
    category: "Interoperabilidad",
    date: "10 Mayo, 2026",
    readTime: "8 min",
    complexity: "Técnico Avanzado",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    featured: false
  },
  {
    id: 3,
    title: "ConstruMetrix: La Digitalización del Entorno Construido",
    excerpt: "Desde el levantamiento con sensores remotos hasta el gemelo digital: cómo la precisión milimétrica transforma la gestión de infraestructura crítica.",
    category: "Ingeniería",
    date: "05 Mayo, 2026",
    readTime: "10 min",
    complexity: "Reporte de Ingeniería",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800",
    featured: false
  },
  {
    id: 4,
    title: "Trazabilidad y Control en la Gestión de Tierras",
    excerpt: "El papel de la auditoría digital y el control de la información en la construcción de sistemas territoriales transparentes y confiables.",
    category: "Gobernanza",
    date: "28 Abril, 2026",
    readTime: "7 min",
    complexity: "Estratégico",
    image: "https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800",
    featured: false
  }
];

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const recentPosts = BLOG_POSTS.filter(post => !post.featured);

  return (
    <div className="flex flex-col w-full bg-[#fafafa] text-[#1a1a1a] min-h-screen pt-32">
      
      {/* Editorial Header */}
      <section className="px-6 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="w-12 h-px bg-[#1a1a1a]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold">Insights & Engineering</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-[#1a1a1a]">
                DevGiz <br /> <span className="text-slate-400 italic font-light">Journal</span>
              </h1>
            </div>
            <p className="max-w-sm text-slate-500 text-sm font-light leading-relaxed border-l border-slate-200 pl-6 py-2">
              Análisis rigurosos sobre infraestructura digital, ciberseguridad geoespacial y la evolución del estándar territorial en América Latina.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Bar - Minimalist */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex overflow-x-auto gap-8 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat, idx) => (
              <button 
                key={cat}
                className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-2 ${
                  idx === 0 ? 'text-[#1a1a1a]' : 'text-slate-400 hover:text-[#1a1a1a]'
                }`}
              >
                {cat}
                {idx === 0 && <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1a1a1a]" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          
          {/* Featured Entry */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.id}`} className="group block mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8 relative aspect-[16/9] overflow-hidden bg-slate-100 rounded-sm">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="lg:col-span-4 space-y-8">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    <span>{featuredPost.category}</span>
                    <span>/</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black leading-tight text-[#1a1a1a] tracking-tight group-hover:text-slate-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-500 font-light leading-relaxed text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="pt-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                    Continuar leyendo
                    <span className="w-8 h-px bg-[#1a1a1a] transition-all group-hover:w-16"></span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 border-t border-slate-100 pt-20">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col space-y-8">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 rounded-sm">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#1a1a1a] tracking-tight leading-tight group-hover:text-slate-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pt-4 group-hover:text-[#1a1a1a] transition-colors">
                    Leer más
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Newsletter - Elegant Footer */}
      <section className="bg-[#1a1a1a] text-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            Reciba nuestras <br /> <span className="text-slate-500 font-light italic">perspectivas.</span>
          </h2>
          <p className="text-slate-400 font-light text-lg">
            Análisis trimestrales exclusivos para líderes gubernamentales y técnicos.
          </p>
          <div className="flex flex-col sm:flex-row gap-0 border-b border-slate-700 pb-2">
            <input 
              type="email" 
              placeholder="Correo institucional"
              className="flex-1 bg-transparent px-2 py-4 text-white font-light text-lg focus:outline-none placeholder:text-slate-700"
            />
            <button className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-slate-300 transition-all">
              Suscribirse
            </button>
          </div>
          <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            Privacidad garantizada // Repositorio DevGiz
          </p>
        </div>
      </section>
    </div>
  );
}
