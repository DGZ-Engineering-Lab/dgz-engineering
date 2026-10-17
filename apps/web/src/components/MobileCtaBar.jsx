"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { CONTACT } from "../lib/seo";

// Barra de contacto fija en móvil: aparece tras el hero para que WhatsApp y
// precios estén siempre a un toque, sin tapar el primer pantallazo.
const HIDDEN_ROUTES = ["/admin", "/lab"];

export default function MobileCtaBar() {
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 900;
      setVisible(window.scrollY > 560 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg shadow-[0_-12px_30px_-18px_rgba(15,23,42,0.35)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
          <MessageCircle aria-hidden="true" /> WhatsApp
        </a>
        <Link href="/#ofertas" prefetch={false} className="btn btn-primary btn-sm">
          Ver precios <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
