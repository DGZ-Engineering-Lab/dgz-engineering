"use client";

import { MotionConfig } from "framer-motion";

// Respeta la preferencia del sistema "reducir movimiento" (WCAG 2.3.3):
// Framer Motion omite transformaciones y desplazamientos cuando el usuario la activa.
export default function MotionPreferences({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
