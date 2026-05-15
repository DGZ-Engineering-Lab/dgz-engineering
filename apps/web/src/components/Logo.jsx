"use client";

export default function Logo({ className = "w-10 h-10", animated = true }) {
  return (
    <div className={`relative group ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Definitions for gradients and filters */}
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagon (The "D" Base) */}
        <path
          d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 L50 5Z"
          className="stroke-slate-800 fill-[#0B0F19]"
          strokeWidth="2"
        />

        {/* Hex Indexing / Spatial Grid Overlay */}
        <path
          d="M50 5 V95 M11 27.5 L89 72.5 M11 72.5 L89 27.5"
          className="stroke-slate-800/30"
          strokeWidth="1"
        />

        {/* The "D" Outer Geometry (Vector Tile/Path aesthetic) */}
        <path
          d="M50 12 L82 30 V70 L50 88 C50 88 22 72 22 50 C22 28 50 12 50 12Z"
          stroke="url(#logo-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          className={animated ? "animate-[dash_3s_ease-in-out_infinite]" : ""}
          style={{ strokeDasharray: "300", strokeDashoffset: "300" }}
        />

        {/* The "G" Inner Geometry (Spatial Routing / Terminal Cursor Cursor aesthetic) */}
        <path
          d="M45 35 H65 V65 H35 V50 H58"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80 group-hover:opacity-100 transition-opacity"
        />

        {/* Central AI/GeoCore Node */}
        <circle
          cx="55"
          cy="50"
          r="4"
          fill="#38BDF8"
          filter="url(#glow)"
          className={animated ? "animate-pulse" : ""}
        />

        {/* Terminal Cursor (>_) representation as a small diagonal cut */}
        <path
          d="M75 75 L85 85 M70 85 H85"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-0 group-hover:opacity-100 transition-all duration-500"
        />

        {/* Grid Nodes (GIS detail) */}
        <circle cx="50" cy="5" r="1.5" fill="#38BDF8" className="opacity-40" />
        <circle cx="89" cy="27.5" r="1.5" fill="#38BDF8" className="opacity-40" />
        <circle cx="89" cy="72.5" r="1.5" fill="#38BDF8" className="opacity-40" />
        <circle cx="50" cy="95" r="1.5" fill="#38BDF8" className="opacity-40" />
        <circle cx="11" cy="72.5" r="1.5" fill="#38BDF8" className="opacity-40" />
        <circle cx="11" cy="27.5" r="1.5" fill="#38BDF8" className="opacity-40" />
      </svg>
      
      {/* CSS for custom animations if not using Tailwind's standard ones */}
      <style jsx>{`
        @keyframes dash {
          0% {
            stroke-dashoffset: 300;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -300;
          }
        }
      `}</style>
    </div>
  );
}
