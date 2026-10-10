// Plantilla de imagen social (1200x630) para next/og, en la paleta Obsidian & Gold.
const GOLD = "#d4b26a";
const GOLD_SOFT = "#a8874a";
const IVORY = "#f5f1e8";
const MUTED = "#9a9182";

export const SOCIAL_SIZE = { width: 1200, height: 630 };

function Mark({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1d898" />
          <stop offset="100%" stopColor={GOLD_SOFT} />
        </linearGradient>
      </defs>
      <path d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 L50 5Z" fill="#0a0907" stroke="#2a251c" strokeWidth="2" />
      <path d="M50 12 L82 30 V70 L50 88 C50 88 22 72 22 50 C22 28 50 12 50 12Z" stroke="url(#gold)" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function SocialCard({ eyebrow, title, subtitle }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 80px",
        background: "radial-gradient(circle at 85% 15%, #2a2216 0%, #0d0b08 45%, #060504 100%)",
        color: IVORY,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mark />
          <div style={{ display: "flex", fontSize: 38, letterSpacing: -0.5 }}>DevGiz</div>
        </div>
        {eyebrow && (
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: GOLD, textTransform: "uppercase" }}>{eyebrow}</div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", width: 120, height: 2, background: GOLD }} />
        <div style={{ display: "flex", fontSize: title.length > 40 ? 60 : 72, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1040 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ display: "flex", fontSize: 30, color: MUTED, maxWidth: 1000, lineHeight: 1.3 }}>{subtitle}</div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, color: MUTED }}>
        <div style={{ display: "flex" }}>Ingeniería Geoespacial · Medellín, Colombia</div>
        <div style={{ display: "flex", color: GOLD }}>devgiz</div>
      </div>
    </div>
  );
}
