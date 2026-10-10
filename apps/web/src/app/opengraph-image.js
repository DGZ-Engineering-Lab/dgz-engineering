import { ImageResponse } from "next/og";

export const alt = "DevGiz · Ingeniería Geoespacial, Catastro Multipropósito y DevOps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #02040a 0%, #0b1324 55%, #111a35 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <path d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 L50 5Z" fill="#02040a" stroke="#1e293b" strokeWidth="2" />
            <path d="M50 12 L82 30 V70 L50 88 C50 88 22 72 22 50 C22 28 50 12 50 12Z" stroke="url(#g)" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>DevGiz</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            Arquitectura Territorial Inteligente
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#94a3b8", maxWidth: 1000, lineHeight: 1.3 }}>
            Catastro LADM-COL · Automatización GIS · GeoAI · DevOps
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, color: "#64748b" }}>
          <div style={{ display: "flex" }}>Medellín, Colombia</div>
          <div style={{ display: "flex", height: 6, width: 320, background: "linear-gradient(90deg, #38BDF8, #8B5CF6)", borderRadius: 3 }} />
        </div>
      </div>
    ),
    size
  );
}
