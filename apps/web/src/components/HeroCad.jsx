"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// El SVG pesa ~60 KB y el panel solo se ve en lg+: no se descarga en móvil ni
// bloquea la hidratación inicial. El marco ya está en el HTML (sin CLS).
const HeroCadSvg = dynamic(() => import("./HeroCadSvg"), { ssr: false });

export default function HeroCad() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let idle;
    const cancel = () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
    const arm = () => {
      cancel();
      if (!mq.matches) return setShow(false);
      // Espera a que el navegador esté libre para no competir con el LCP
      const run = () => setShow(true);
      idle = "requestIdleCallback" in window ? window.requestIdleCallback(run, { timeout: 1500 }) : setTimeout(run, 300);
    };
    arm();
    mq.addEventListener("change", arm);
    return () => {
      mq.removeEventListener("change", arm);
      cancel();
    };
  }, []);

  return show ? <HeroCadSvg /> : null;
}
