"use client";

export default function InfrastructureSection() {
  const stack = [
    {
      name: "Cloudflare",
      url: "https://dash.cloudflare.com/",
      tooltip: "Edge Computing & Security",
      logo: (
        <svg className="w-8 h-8 text-[#F38020]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.945 11.233c.01-.184.015-.369.015-.556 0-3.32-2.83-6.012-6.321-6.012-2.923 0-5.385 1.838-6.108 4.341a4.264 4.264 0 00-1.895-.446c-2.4 0-4.347 1.905-4.347 4.256 0 2.35 1.947 4.255 4.347 4.255h13.91c2.473 0 4.478-1.961 4.478-4.38 0-2.316-1.84-4.214-4.148-4.364v-.004a.972.972 0 00-.03-.004l.099-.086zM4.686 15.65H2.636a.541.541 0 010-1.08h2.05a.541.541 0 010 1.08zm11.758 0h-9.28a.541.541 0 010-1.08h9.28a.541.541 0 010 1.08zm4.92 0h-2.443a.541.541 0 010-1.08h2.444a.541.541 0 010 1.08z" />
        </svg>
      )
    },
    {
      name: "Render",
      url: "https://dashboard.render.com/",
      tooltip: "Zero-Downtime Deployment",
      img: "https://skillicons.dev/icons?i=render"
    },
    {
      name: "Vercel",
      url: "https://vercel.com/",
      tooltip: "Frontend Edge Computing",
      img: "https://skillicons.dev/icons?i=vercel"
    },
    {
      name: "Neon DB",
      url: "https://neon.tech/",
      tooltip: "Serverless Postgres / PostGIS",
      logo: (
        <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14h-2V8h2v8zm3 0h-2v-2h2v2zm0-4h-2V8h2v4z" /></svg>
      )
    },
    {
      name: "Supabase",
      url: "https://supabase.com/",
      tooltip: "Open Source Firebase Alt",
      img: "https://skillicons.dev/icons?i=supabase"
    }
  ];

  return (
    <section id="infrastructure" className="relative w-full py-24 z-10 bg-black/40">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
              Cloud Architecture
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-blue-500 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Cloud Stack</span>
          </h2>
          <p className="text-lg text-slate-400 font-light mt-4 max-w-2xl">
            Infraestructura de alto rendimiento para el despliegue de sistemas
            territoriales soberanos y microservicios geoespaciales.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
          {stack.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-[#0a0f16] border border-slate-800 hover:border-blue-500/50 hover:bg-[#0d1420] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all relative overflow-hidden"
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-10 group-hover:top-2 opacity-0 group-hover:opacity-100 transition-all text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 text-center pointer-events-none">
                {item.tooltip}
              </div>

              <div className="h-12 flex items-center justify-center mt-2 group-hover:scale-110 transition-transform">
                {item.img ? (
                  <img src={item.img} alt={item.name} className="w-10 h-10 object-contain" />
                ) : (
                  item.logo
                )}
              </div>
              <span className="text-sm font-semibold text-slate-300 font-mono tracking-wider group-hover:text-white transition-colors">
                {item.name}
              </span>
            </a>
          ))}
        </div>

        {/* Callout PRO-TIP */}
        <div className="relative p-1 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500">
          <div className="bg-[#05070a] p-8 md:p-10 rounded-xl relative overflow-hidden">
            {/* Background texture for callout */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded text-xs font-mono text-cyan-400 font-bold tracking-widest mb-4">
                PRO-TIP // ARCHITECTURE
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Repotencialización Scalable (Free Tier)</h3>
              <p className="text-slate-300 leading-relaxed text-lg max-w-4xl">
                Para proyectos de alto impacto con presupuesto inicial optimizado, recomendamos la combinación
                de <strong className="text-emerald-400">Neon DB</strong> (PostgreSQL + PostGIS serverless) y <strong className="text-emerald-400">Supabase</strong> para
                autenticación y almacenamiento. Despliegue en <strong className="text-cyan-400">Vercel</strong> para un frontend
                ultrarrápido y use <strong className="text-[#F38020]">Cloudflare</strong> para protección de borde. Todo disponible en
                capas gratuitas generosas para potenciar su MVP GIS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
