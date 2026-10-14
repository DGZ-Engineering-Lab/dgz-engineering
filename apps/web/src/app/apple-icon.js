import { ImageResponse } from "next/og";

// Icono PNG (iOS y logotipo raster para datos estructurados de Organization).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0a08" }}>
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ddbe7a" />
              <stop offset="100%" stopColor="#94653a" />
            </linearGradient>
          </defs>
          <path d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 L50 5Z" fill="#0b0a08" stroke="#2a251c" strokeWidth="2" />
          <path d="M50 12 L82 30 V70 L50 88 C50 88 22 72 22 50 C22 28 50 12 50 12Z" stroke="url(#g)" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size
  );
}
