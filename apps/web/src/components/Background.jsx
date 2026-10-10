"use client";

import { useEffect, useRef } from "react";
import "./background.css";

export default function Background() {
  const gridRef = useRef(null);

  useEffect(() => {
    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastTime < 33) return; // Limit style updates to ~30 FPS
      lastTime = now;
      
      if (gridRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        gridRef.current.style.setProperty("--mouse-x", `${x}%`);
        gridRef.current.style.setProperty("--mouse-y", `${y}%`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div aria-hidden="true" className="enterprise-bg ph-no-capture sentry-block" data-sentry-block>
        <div className="scanline" />
      </div>
      <div aria-hidden="true" className="neural-grid ph-no-capture sentry-block" data-sentry-block ref={gridRef} />
    </>
  );
}
