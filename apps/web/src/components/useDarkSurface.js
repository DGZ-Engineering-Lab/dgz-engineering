"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Rutas diseñadas sobre lienzo oscuro. Una vista también puede declararse oscura
// con data-nav-theme="dark" (p. ej. la página 404, que no tiene ruta propia).
const DARK_ROUTES = ["/lab", "/diagnostic", "/docs"];

export default function useDarkSurface() {
  const pathname = usePathname() || "/";
  const [domDark, setDomDark] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setDomDark(!!document.querySelector('[data-nav-theme="dark"]')));
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return DARK_ROUTES.some((r) => pathname.startsWith(r)) || domDark;
}
