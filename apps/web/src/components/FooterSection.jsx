"use client";
import Link from "next/link";
import Logo from "./Logo";
import { Globe, Mail, MapPin, ExternalLink } from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    empresa: [
      { name: "Nuestro Manifiesto", href: "/about" },
      { name: "Estándares Técnicos", href: "/standards" },
      { name: "Talento de Élite", href: "/careers" },
    ],
    ecosistema: [
      { name: "Casos de Ingeniería", href: "/projects" },
      { name: "Engineering Journal", href: "/blog" },
      { name: "Centro de Conocimiento", href: "/faq" },
    ],
    legal: [
      { name: "Privacidad de Datos", href: "/privacy" },
      { name: "Términos de Servicio", href: "/terms" },
      { name: "Soberanía Digital", href: "/manifesto" },
    ]
  };

  return (
    <footer className="relative w-full border-t border-slate-100 bg-white text-[#1a1a1a] z-10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter">DevGiz</span>
                <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-slate-400 font-bold">Engineering Lab</span>
              </div>
            </Link>
            <p className="text-slate-500 font-light leading-relaxed text-sm max-w-xs">
              Líderes en infraestructura de datos territoriales y soberanía digital para el sector público y privado en Colombia.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-[#1a1a1a] transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#1a1a1a] transition-colors"><ExternalLink className="w-5 h-5" /></a>
              <a href="mailto:info@devgiz.com" className="text-slate-400 hover:text-[#1a1a1a] transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-8">Firma</h4>
              <ul className="space-y-4">
                {footerLinks.empresa.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-slate-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-8">Ecosistema</h4>
              <ul className="space-y-4">
                {footerLinks.ecosistema.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-slate-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:block">
              <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-8">Oficinas</h4>
              <div className="space-y-4">
                <div className="flex gap-3 text-slate-500 font-light text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Sede Principal, <br /> Colombia</span>
                </div>
                <div className="flex gap-3 text-slate-500 font-light text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>contact@devgiz.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            © {currentYear} DevGiz Engineering Lab // All Rights Reserved.
          </div>
          <div className="flex gap-8">
            <Link href="/terms" className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#1a1a1a]">Terms</Link>
            <Link href="/privacy" className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#1a1a1a]">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
