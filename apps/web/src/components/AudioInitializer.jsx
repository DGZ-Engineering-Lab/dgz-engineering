"use client";

import { useEffect } from "react";
import DgzSynth from "./DgzSynth";

export default function AudioInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Instanciar el objeto global mockeado silenciosamente para evitar errores de referencia "undefined"
    if (!window.dgzSynth) {
      window.dgzSynth = new DgzSynth();
    }
  }, []);

  return null;
}
