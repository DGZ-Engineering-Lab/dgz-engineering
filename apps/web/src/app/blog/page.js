"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LEGAL_PATHS, POLICY_VERSION, RESPONSABLE } from "../../lib/legal";
import ConsentCheckbox from "../../components/ConsentCheckbox";

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
    image: "/assets/img/blog-cybersecurity.webp",
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
    image: "/assets/img/blog-ladm-col.webp",
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
    image: "/assets/img/geoai_after.webp",
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
    image: "/assets/img/topo-bg.webp",
    featured: false
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("idle"); // idle | sending | error
  // Autorización Ley 1581 para el boletín (nunca premarcada)
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [consentInvalid, setConsentInvalid] = useState(false);

  // Envío real por el pipeline de leads (antes solo se simulaba la confirmación y el correo se perdía)
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || subscribeStatus === "sending") return;
    if (!newsletterConsent) {
      setConsentInvalid(true);
      document.getElementById("blog-newsletter-consent")?.focus();
      return;
    }
    setSubscribeStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Suscripción boletín",
          email,
          company: "N/A",
          message: "[Suscripción al boletín DevGiz Journal desde /blog]",
          // Solo con la casilla marcada se da de alta en la lista de correo.
          consent: newsletterConsent === true,
          privacyConsent: true,
          policyVersion: POLICY_VERSION,
          consentSource: "newsletter-blog",
        }),
      });
      if (!response.ok) throw new Error("subscribe_failed");
      setSubscribed(true);
      setSubscribeStatus("idle");
    } catch {
      setSubscribeStatus("error");
    }
  };

  const filteredPosts = selectedCategory === "Todos"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);
  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const recentPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);


  return (
    <div className="flex flex-col w-full bg-[#fafafa] text-[#1a1a1a] min-h-screen pt-24 md:pt-28">
      
      {/* Editorial Header */}
      <section className="px-6 pb-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="w-12 h-px bg-[#1a1a1a]"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500 font-bold">Insights & Engineering</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-[#1a1a1a]">
                DevGiz <br /> <span className="text-slate-500 italic font-light">Journal</span>
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
          {/* Filtro por categoría: botones con aria-pressed (sin paneles, por lo que no aplica role="tablist") */}
          <div role="group" aria-label="Filtrar por categoría" className="flex overflow-x-auto gap-6 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative min-h-11 px-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none rounded ${
                  selectedCategory === cat ? 'text-[#1a1a1a]' : 'text-slate-600 hover:text-[#1a1a1a]'
                }`}
              >
                {cat}
                {selectedCategory === cat && <motion.div aria-hidden="true" layoutId="activeCat" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1a1a1a]" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          
          {/* Estado vacío: categoría sin artículos */}
          {filteredPosts.length === 0 && (
            <p role="status" className="py-16 text-center text-slate-600">
              Aún no hay artículos en esta categoría. Prueba con «Todos».
            </p>
          )}

          {/* Featured Entry */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.id}`} className="group block mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8 relative aspect-[16/9] overflow-hidden bg-slate-100 rounded-sm">
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="lg:col-span-4 space-y-8">
                  <div className="flex items-center gap-4 text-[11px] font-mono text-slate-600 uppercase tracking-widest">
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
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-600 uppercase tracking-widest">
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
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-600 pt-4 group-hover:text-[#1a1a1a] transition-colors">
                    Leer más
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Newsletter - Elegant Footer */}
      <section className="bg-[#1a1a1a] text-white py-14 md:py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none">
            Reciba nuestras <br /> <span className="text-slate-500 font-light italic">perspectivas.</span>
          </h2>
          <p className="text-slate-400 font-light text-lg">
            Análisis trimestrales exclusivos para líderes gubernamentales y técnicos.
          </p>
          {subscribed ? (
            <div role="status" className="py-4 text-emerald-300 font-mono text-sm">Solicitud recibida. Te escribiremos pronto con el DevGiz Journal.</div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4 text-left">
              <div className="flex flex-col sm:flex-row gap-0 border-b border-slate-500 pb-2">
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Correo institucional para el boletín"
                  aria-invalid={subscribeStatus === "error"}
                  aria-describedby={subscribeStatus === "error" ? "blog-newsletter-error" : undefined}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Correo institucional"
                  className="flex-1 bg-transparent px-2 py-4 text-white font-light text-lg focus:outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                />
                <button type="submit" disabled={subscribeStatus === "sending"} className="px-8 py-4 min-h-11 text-[11px] font-bold uppercase tracking-[0.3em] hover:text-slate-300 transition-all cursor-pointer disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none">
                  {subscribeStatus === "sending" ? "Enviando…" : "Suscribirse"}
                </button>
              </div>
              <ConsentCheckbox
                id="blog-newsletter-consent"
                finalidad="boletin"
                variant="dark"
                checked={newsletterConsent}
                onChange={(value) => {
                  setNewsletterConsent(value);
                  if (value) setConsentInvalid(false);
                }}
                invalid={consentInvalid}
              />
            </form>
          )}
          {subscribeStatus === "error" && !subscribed && (
            <p id="blog-newsletter-error" role="alert" className="text-sm text-red-300">
              No pudimos registrar tu correo. Intenta de nuevo en unos minutos.
            </p>
          )}
          <div className="space-y-1 text-[11px] text-slate-400 leading-snug break-words">
            <p>
              Sus datos se tratan conforme a nuestra{" "}
              <a href={LEGAL_PATHS.privacy} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                Política de Tratamiento de Datos
              </a>.
            </p>
            <p>
              Puede darse de baja en cualquier momento escribiendo a{" "}
              <a href={`mailto:${RESPONSABLE.email}`} className="underline underline-offset-2 hover:text-white">{RESPONSABLE.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
