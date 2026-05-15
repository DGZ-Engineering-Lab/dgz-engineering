"use client";
import Logo from "./Logo";

export default function SimpleValueSection() {
  const points = [
    {
      title: "Traductor Universal",
      meta: "Eliminamos la confusión técnica",
      desc: "Convertimos miles de archivos técnicos difíciles de entender en información clara y sencilla que cualquier persona puede usar para tomar decisiones.",
      icon: "🗣️"
    },
    {
      title: "Auditor Infalible",
      meta: "Cero errores, máxima seguridad",
      desc: "Nuestros sistemas revisan automáticamente cada detalle de sus datos territoriales, encontrando errores que a un humano le tomaría meses detectar.",
      icon: "⚖️"
    },
    {
      title: "Mapa con Memoria",
      meta: "Información siempre disponible",
      desc: "Guardamos y organizamos toda la historia de su territorio, para que nunca pierda un solo registro y siempre sepa qué pasó en cada metro cuadrado.",
      icon: "🧠"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-white text-black relative overflow-hidden">
      {/* Decorative Light Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#02040a] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-12">
           <div className="flex justify-center mb-6">
              <Logo className="w-16 h-16 text-black opacity-20" />
           </div>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none text-slate-900">
             Entendiendo <span className="text-blue-600 italic">DevGiz</span>
           </h2>
           <p className="text-base lg:text-lg text-slate-500 font-light max-w-2xl mx-auto">
             No necesita ser un ingeniero experto para aprovechar el poder de los datos geográficos. Así es como ayudamos a su organización:
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
           {points.map((p, i) => (
              <div key={i} className="group p-6 lg:p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                 <div className="text-4xl lg:text-5xl mb-5 group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
                 <div className="space-y-4">
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{p.meta}</div>
                    <h3 className="text-2xl font-black tracking-tight text-slate-900">{p.title}</h3>
                    <p className="text-slate-600 font-light leading-relaxed">{p.desc}</p>
                 </div>
              </div>
           ))}
        </div>

        <div className="mt-12 p-8 lg:p-10 bg-slate-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl lg:text-3xl font-black tracking-tight">¿Listo para modernizarse?</h3>
              <p className="text-slate-400 font-light text-base">Hacemos que lo complejo se vuelva invisible para que usted se enfoque en los resultados.</p>
           </div>
           <a href="#contact" className="px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-xl">
              Agendar Demo Gratuito
           </a>
        </div>
      </div>
    </section>
  );
}
