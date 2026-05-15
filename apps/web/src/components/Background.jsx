"use client";

import { useEffect, useRef } from "react";
import "./background.css";

export default function Background() {
  const gridRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gridRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        gridRef.current.style.setProperty("--mouse-x", `${x}%`);
        gridRef.current.style.setProperty("--mouse-y", `${y}%`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="enterprise-bg">
        <div className="scanline" />
      </div>
      <div className="neural-grid" ref={gridRef} />
    </>
  );
}
