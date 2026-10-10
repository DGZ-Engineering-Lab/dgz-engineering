"use client";
import { useEffect, useState } from "react";

// Gemelo digital del hero: aislado para que el tick de telemetría
// solo re-renderice este SVG y no toda la página.
export default function HeroDigitalTwin() {
  const [telemetry, setTelemetry] = useState({
    lat: "N 4°35'12.45''",
    lng: "W 75°23'41.08''",
    alt: "45.22 m",
    ping: "12 ms"
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tick = () => {
      if (document.hidden) return;
      setTelemetry({
        lat: `N 4°35'${(12.45 + Math.random() * 0.25).toFixed(2)}''`,
        lng: `W 75°23'${(41.08 + Math.random() * 0.25).toFixed(2)}''`,
        alt: `${(45.10 + Math.random() * 0.3).toFixed(2)} m`,
        ping: `${Math.floor(8 + Math.random() * 10)} ms`
      });
    };
    const interval = setInterval(tick, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* 3D ambient space back-glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-orange-500/5 blur-3xl animate-pulse-soft" aria-hidden="true"></div>
      
      {/* Premium Glassmorphic CAD Frame */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_35px_90px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl ring-1 ring-white/20">
        
        {/* Outer Glass Shine Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-40 mix-blend-overlay"></div>
        
        {/* Top status bar (System HUD) */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(207,167,88,0.95)] animate-pulse"></span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300 font-bold">SOVEREIGN GRAPH CORE v3.1</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 ring-1 ring-cyan-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers text-cyan-400 animate-pulse">
              <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
              <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
              <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
            </svg>
            <span className="text-[9px] font-black text-cyan-200 uppercase tracking-widest">4K DWIN</span>
          </div>
        </div>

        {/* Real-time Dynamic Status Tag */}
        <div className="pointer-events-none absolute left-1/2 top-14 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-500/20 bg-slate-900/90 px-4 py-1.5 text-[9px] font-black text-cyan-400 shadow-xl backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity text-orange-400 animate-pulse">
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
          LIDAR SCANNING ACTIVE
        </div>

        {/* SVG CAD Space Engine */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Advanced drop shadows for realistic depth emission */}
            <filter id="neonGlowCyan" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neonGlowOrange" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neonGlowEmerald" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Interactive CSS Stylesheet embedded for hardware GPU acceleration */}
            <style>{`
              .building-group {
                transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                transform-origin: 200px 220px;
                cursor: pointer;
              }
              .building-group:hover {
                transform: translateY(-10px) scale(1.035);
                filter: drop-shadow(0 20px 40px rgba(207,167,88, 0.45));
              }
              .building-group:hover .facade-front {
                filter: brightness(1.4) contrast(1.15);
              }
              .building-group:hover .facade-side {
                filter: brightness(1.3) contrast(1.15);
              }
              .building-group:hover .neon-edge {
                stroke-width: 2px;
                stroke: #ffffff;
                filter: drop-shadow(0 0 8px #e9d5a6);
              }
              .cad-parcel {
                transition: fill-opacity 0.4s ease, stroke-width 0.4s ease, stroke 0.4s ease;
                cursor: crosshair;
              }
              .cad-parcel:hover {
                fill-opacity: 0.4;
                stroke-width: 1.8px;
                stroke: #ffffff;
              }
              .hud-callout {
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
              }
              .hud-callout:hover {
                transform: scale(1.05) translateY(-2px);
                opacity: 1;
              }
              .wind-blade {
                transform-origin: 0px 0px;
              }
            `}</style>

            {/* Multi-stop atmospheric ground radial gradient */}
            <radialGradient id="cityGlow" cx="50%" cy="55%" r="70%">
              <stop offset="0%" stopColor="#e07a1f" stopOpacity="0.48"></stop>
              <stop offset="45%" stopColor="#8a6825" stopOpacity="0.22"></stop>
              <stop offset="100%" stopColor="#0d0c0a" stopOpacity="0"></stop>
            </radialGradient>

            {/* Tectonic metallic structural gradients */}
            <linearGradient id="bldOrange" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFC88E" stopOpacity="0.95"></stop>
              <stop offset="40%" stopColor="#E07A1F" stopOpacity="0.85"></stop>
              <stop offset="100%" stopColor="#662200" stopOpacity="0.75"></stop>
            </linearGradient>
            
            <linearGradient id="bldOrangeWire" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFDDB6" stopOpacity="0.9"></stop>
              <stop offset="100%" stopColor="#FF7700" stopOpacity="0.4"></stop>
            </linearGradient>

            <linearGradient id="bldCyan" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f4ead2" stopOpacity="0.95"></stop>
              <stop offset="50%" stopColor="#8a6825" stopOpacity="0.85"></stop>
              <stop offset="100%" stopColor="#1b1914" stopOpacity="0.75"></stop>
            </linearGradient>
            
            <linearGradient id="bldCyanWire" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fbf7ee" stopOpacity="0.9"></stop>
              <stop offset="100%" stopColor="#cfa758" stopOpacity="0.4"></stop>
            </linearGradient>

            <linearGradient id="bldWhite" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95"></stop>
              <stop offset="60%" stopColor="#e2ded4" stopOpacity="0.80"></stop>
              <stop offset="100%" stopColor="#57534c" stopOpacity="0.55"></stop>
            </linearGradient>
            
            <linearGradient id="bldWhiteWire" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95"></stop>
              <stop offset="100%" stopColor="#9c968a" stopOpacity="0.5"></stop>
            </linearGradient>

            <linearGradient id="cyberGreen" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.95"></stop>
              <stop offset="100%" stopColor="#1b1915" stopOpacity="0.75"></stop>
            </linearGradient>

            <linearGradient id="coneGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#e9d5a6" stopOpacity="0.65"></stop>
              <stop offset="100%" stopColor="#e9d5a6" stopOpacity="0"></stop>
            </linearGradient>
            
            <linearGradient id="bridgeGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#e9d5a6" stopOpacity="0.8"></stop>
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95"></stop>
              <stop offset="100%" stopColor="#f59e4b" stopOpacity="0.8"></stop>
            </linearGradient>

            {/* Real-time scanning mask for laser sweeps */}
            <mask id="scanMask">
              <rect x="0" y="0" width="400" height="400" fill="black" />
              <rect x="0" y="0" width="400" height="60" fill="white">
                <animate attributeName="y" values="-60;410;-60" dur="7.5s" repeatCount="indefinite" />
              </rect>
            </mask>
          </defs>

          {/* Ambient Digital Core Glow */}
          <circle cx="200" cy="230" r="195" fill="url(#cityGlow)"></circle>

          {/* Ground Plane (Primary Cadastral Matrix) */}
          <polygon points="30,200 200,115 370,200 200,285" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2"></polygon>

          {/* High-Fidelity Isometric CAD Grid System */}
          <g stroke="rgba(255,255,255,0.03)" strokeWidth="0.5">
            {/* Grid Lines Direction 1 (\) */}
            <line x1="51" y1="189" x2="221" y2="104"></line>
            <line x1="72" y1="179" x2="242" y2="94"></line>
            <line x1="93" y1="169" x2="263" y2="84"></line>
            <line x1="114" y1="159" x2="284" y2="74"></line>
            <line x1="135" y1="149" x2="305" y2="64"></line>
            <line x1="156" y1="139" x2="326" y2="54"></line>
            
            <line x1="93" y1="231" x2="263" y2="146"></line>
            <line x1="114" y1="221" x2="284" y2="136"></line>
            <line x1="135" y1="211" x2="305" y2="126"></line>
            <line x1="156" y1="201" x2="326" y2="116"></line>
            <line x1="177" y1="191" x2="347" y2="106"></line>
            
            <line x1="135" y1="252" x2="305" y2="167"></line>
            <line x1="156" y1="242" x2="326" y2="157"></line>
            <line x1="177" y1="232" x2="347" y2="147"></line>
            <line x1="198" y1="222" x2="368" y2="137"></line>
            
            {/* Grid Lines Direction 2 (/) */}
            <line x1="51" y1="211" x2="221" y2="296"></line>
            <line x1="72" y1="221" x2="242" y2="306"></line>
            <line x1="93" y1="231" x2="263" y2="316"></line>
            <line x1="114" y1="241" x2="284" y2="326"></line>
            
            <line x1="93" y1="169" x2="263" y2="254"></line>
            <line x1="114" y1="159" x2="284" y2="244"></line>
            <line x1="135" y1="149" x2="305" y2="234"></line>
            <line x1="156" y1="139" x2="326" y2="224"></line>
            <line x1="177" y1="129" x2="347" y2="214"></line>
            
            <line x1="135" y1="107" x2="305" y2="192"></line>
            <line x1="156" y1="97" x2="326" y2="182"></line>
            <line x1="177" y1="87" x2="347" y2="172"></line>
            <line x1="198" y1="77" x2="368" y2="162"></line>
          </g>

          {/* Cadastral Coordinate Point Marks (+) */}
          <g stroke="rgba(255,255,255,0.3)" strokeWidth="0.8">
            {/* Cross 1 */}
            <line x1="93" y1="166" x2="93" y2="172"></line>
            <line x1="90" y1="169" x2="96" y2="169"></line>
            {/* Cross 2 */}
            <line x1="305" y1="123" x2="305" y2="129"></line>
            <line x1="302" y1="126" x2="308" y2="126"></line>
            {/* Cross 3 */}
            <line x1="305" y1="272" x2="305" y2="278"></line>
            <line x1="302" y1="275" x2="308" y2="275"></line>
            {/* Cross 4 */}
            <line x1="93" y1="228" x2="93" y2="234"></line>
            <line x1="90" y1="231" x2="96" y2="231"></line>
          </g>

          {/* Cyber Data Highways / Ground Road Infrastructure */}
          <g opacity="0.5">
            <path id="highwayA" d="M93,169 L305,275" fill="none" stroke="rgba(207,167,88,0.12)" strokeWidth="3" strokeLinecap="round" />
            <path id="highwayB" d="M305,126 L93,231" fill="none" stroke="rgba(245,158,11,0.12)" strokeWidth="3" strokeLinecap="round" />
            
            {/* Active glowing data packets flowing in 3D perspective along highways */}
            <circle r="1.8" fill="#e9d5a6" filter="url(#neonGlowCyan)">
              <animateMotion dur="4.2s" repeatCount="indefinite">
                <mpath href="#highwayA" />
              </animateMotion>
            </circle>
            <circle r="1.8" fill="#f59e4b" filter="url(#neonGlowOrange)">
              <animateMotion dur="5.5s" repeatCount="indefinite" begin="1.8s">
                <mpath href="#highwayB" />
              </animateMotion>
            </circle>
            <circle r="1.4" fill="#34d399" filter="url(#neonGlowEmerald)">
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
                <mpath href="#highwayA" />
              </animateMotion>
            </circle>
          </g>

          {/* Geographic Bounding Real-time Info Ticks on Grid Edge */}
          <g fill="rgba(255,255,255,0.4)" fontFamily="monospace" fontSize="5.5" textAnchor="middle">
            <text x="32" y="196" transform="rotate(-26.5 32 196)">{telemetry.lng}</text>
            <text x="200" y="110">{telemetry.lat}</text>
            <text x="368" y="196" transform="rotate(26.5 368 196)">W 75°23&apos;41.55&apos;&apos;</text>
            <text x="200" y="294">S 4°35&apos;58.20&apos;&apos;</text>
          </g>

          {/* Radar Scanning Sweep Reticle */}
          <g>
            {/* Solid central coordinate mark */}
            <circle cx="151" cy="199" r="3.5" fill="#F59E4B" filter="url(#neonGlowOrange)"></circle>
            
            {/* Pulsing Sonar Sweep Circles */}
            <ellipse cx="151" cy="199" rx="35" ry="17.5" fill="none" stroke="#F59E4B" strokeWidth="0.8" opacity="0.8">
              <animate attributeName="rx" values="10;75;10" dur="4.5s" repeatCount="indefinite" />
              <animate attributeName="ry" values="5;37.5;5" dur="4.5s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.85;0;0.85" dur="4.5s" repeatCount="indefinite" />
            </ellipse>
            
            <ellipse cx="151" cy="199" rx="18" ry="9" fill="none" stroke="#e9d5a6" strokeWidth="0.8" opacity="0.6">
              <animate attributeName="rx" values="5;50;5" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="ry" values="2.5;25;2.5" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.75;0;0.75" dur="3.2s" repeatCount="indefinite" />
            </ellipse>
            
            {/* 360-degree rotating radar scan sector */}
            <g transform="translate(151, 199)">
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
                <line x1="0" y1="0" x2="50" y2="0" stroke="rgba(207,167,88,0.8)" strokeWidth="1" filter="url(#neonGlowCyan)" />
                <polygon points="0,0 50,0 48,-12 0,0" fill="rgba(207,167,88,0.15)" />
              </g>
            </g>
          </g>

          {/* Cadastral Parcels Outlines */}
          <g>
            {/* Parcel A (Amber / Active scan zone) */}
            <polygon points="104,208 168,176 198,191 134,223" fill="rgba(224,122,31,0.14)" stroke="#F59E4B" strokeWidth="0.9" className="cad-parcel" />
            {/* Parcel B (Cyan / High density commercial) */}
            <polygon points="198,239 262,207 292,222 228,254" fill="rgba(125,217,255,0.11)" stroke="#e9d5a6" strokeWidth="0.8" className="cad-parcel" />
            {/* Parcel C (Emerald / Eco preserve) */}
            <polygon points="168,269 232,237 262,252 198,284" fill="rgba(16,185,129,0.08)" stroke="#34D399" strokeWidth="0.8" className="cad-parcel" />
          </g>

          {/* Geodesic Laser Inter-links between structural nodes */}
          <g opacity="0.7">
            <path d="M130,114 Q180,85 230,120" stroke="url(#bridgeGrad)" strokeWidth="1.2" fill="none" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" values="40;0" dur="3.5s" repeatCount="indefinite" />
            </path>
            <path d="M230,120 Q208,172 195,225" stroke="#e9d5a6" strokeWidth="1.2" fill="none" strokeDasharray="4 6">
              <animate attributeName="stroke-dashoffset" values="0;40" dur="2.8s" repeatCount="indefinite" />
            </path>
          </g>


          {/* ========================================================= */}
          {/* STANDARD RENDER LAYER (NORMAL PHYSICAL ARCHITECTURE)      */}
          {/* ========================================================= */}

          <g opacity="0.9">
            
            {/* --- TOWER 1: The Bioclimatic Core (Base center 130, 190) --- */}
            <g className="building-group">
              {/* Facade Front-Left */}
              <polygon points="102,204 130,218 130,136 102,102" fill="url(#bldOrange)" stroke="#F59E4B" strokeWidth="0.4" className="facade-front"></polygon>
              {/* Facade Front-Right */}
              <polygon points="130,218 158,204 158,122 130,136" fill="rgba(194,97,26,0.8)" stroke="#F59E4B" strokeWidth="0.4" className="facade-side"></polygon>
              {/* Slanted Wedge Roof */}
              <polygon points="130,95 102,102 130,136 158,122" fill="#F59E4B" stroke="#F59E4B" strokeWidth="0.4"></polygon>
              
              {/* External Diagonal Structural Bracings */}
              <g stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" opacity="0.55">
                <line x1="102" y1="204" x2="130" y2="136"></line>
                <line x1="102" y1="102" x2="130" y2="218"></line>
                <line x1="102" y1="153" x2="130" y2="177"></line>
                <line x1="130" y1="218" x2="158" y2="122"></line>
                <line x1="130" y1="136" x2="158" y2="204"></line>
                <line x1="130" y1="177" x2="158" y2="163"></line>
              </g>

              {/* High-density window matrix */}
              <g stroke="#FFAD5A" strokeWidth="1.6" strokeDasharray="3.5 2" opacity="0.8">
                <line x1="111" y1="190" x2="111" y2="120" />
                <line x1="121" y1="195" x2="121" y2="125" />
              </g>
              <g stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeDasharray="3.5 2" opacity="0.7">
                <line x1="139" y1="195" x2="139" y2="133" />
                <line x1="149" y1="190" x2="149" y2="128" />
              </g>

              {/* Hanging Vertical Green Atriums */}
              <polygon points="113,165 125,159 125,166 113,172" fill="url(#cyberGreen)" stroke="#10b981" strokeWidth="0.4" />
              <circle cx="119" cy="164" r="1" fill="#10B981" filter="url(#neonGlowCyan)" />
              <circle cx="122" cy="162.5" r="0.8" fill="#10B981" />

              {/* Structural Helipad on roof deck */}
              <g>
                <ellipse cx="130" cy="114" rx="13" ry="6.5" fill="rgba(18,17,14, 0.9)" stroke="#FFE0B2" strokeWidth="0.8" />
                <ellipse cx="130" cy="114" rx="9" ry="4.5" fill="none" stroke="#FFE0B2" strokeWidth="0.6" strokeDasharray="2 1.5" />
                <text x="130" y="116.5" textAnchor="middle" fill="#FFE0B2" fontFamily="monospace" fontSize="8" fontWeight="black">H</text>
              </g>
            </g>

            {/* --- TOWER 2: Quantum Spire (Base center 230, 220) --- */}
            <g className="building-group">
              
              {/* MODULE 1 (BASE TIER) */}
              <polygon points="198,236 230,252 230,197 198,181" fill="url(#bldCyan)" stroke="#e9d5a6" strokeWidth="0.4" className="facade-front"></polygon>
              <polygon points="230,252 262,236 262,181 230,197" fill="rgba(138,104,37,0.7)" stroke="#e9d5a6" strokeWidth="0.4" className="facade-side"></polygon>
              <polygon points="230,165 198,181 230,197 262,181" fill="#8a6825" stroke="#e9d5a6" strokeWidth="0.4"></polygon>
              
              <g stroke="#e9d5a6" strokeWidth="1.8" strokeDasharray="3 1.5" opacity="0.65">
                <line x1="206" y1="225" x2="206" y2="190" />
                <line x1="214" y1="230" x2="214" y2="195" />
                <line x1="222" y1="235" x2="222" y2="200" />
              </g>
              <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeDasharray="3 1.5" opacity="0.65">
                <line x1="238" y1="200" x2="238" y2="235" />
                <line x1="246" y1="195" x2="246" y2="230" />
                <line x1="254" y1="190" x2="254" y2="225" />
              </g>

              {/* MODULE 2 (MIDDLE TIER) */}
              <polygon points="206,177 230,189 230,144 206,132" fill="url(#bldCyan)" stroke="#e9d5a6" strokeWidth="0.4" className="facade-front"></polygon>
              <polygon points="230,189 254,177 254,132 230,144" fill="rgba(138,104,37,0.75)" stroke="#e9d5a6" strokeWidth="0.4" className="facade-side"></polygon>
              <polygon points="230,120 206,132 230,144 254,132" fill="#8a6825" stroke="#e9d5a6" strokeWidth="0.4"></polygon>

              <g stroke="#e9d5a6" strokeWidth="1.6" strokeDasharray="3 1" opacity="0.7">
                <line x1="212" y1="168" x2="212" y2="138" />
                <line x1="218" y1="172" x2="218" y2="142" />
                <line x1="224" y1="176" x2="224" y2="146" />
              </g>
              <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.6" strokeDasharray="3 1" opacity="0.7">
                <line x1="236" y1="146" x2="236" y2="176" />
                <line x1="242" y1="142" x2="242" y2="172" />
                <line x1="248" y1="138" x2="248" y2="168" />
              </g>

              {/* MODULE 3 (SPIRE TIER) */}
              <polygon points="214,128 230,136 230,96 214,88" fill="url(#bldCyan)" stroke="#e9d5a6" strokeWidth="0.4" className="facade-front"></polygon>
              <polygon points="230,136 246,128 246,88 230,96" fill="rgba(138,104,37,0.8)" stroke="#e9d5a6" strokeWidth="0.4" className="facade-side"></polygon>
              <polygon points="230,80 214,88 230,96 246,88" fill="#8a6825" stroke="#e9d5a6" strokeWidth="0.4"></polygon>

              <g stroke="#e9d5a6" strokeWidth="1.4" strokeDasharray="2 1" opacity="0.75">
                <line x1="220" y1="120" x2="220" y2="92" />
                <line x1="226" y1="123" x2="226" y2="95" />
              </g>
              <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.4" strokeDasharray="2 1" opacity="0.75">
                <line x1="234" y1="95" x2="234" y2="123" />
                <line x1="240" y1="92" x2="240" y2="120" />
              </g>

              {/* Spire, Antenna and Beacon Warning strobe */}
              <line x1="230" y1="80" x2="230" y2="35" stroke="#e9d5a6" strokeWidth="1.2" />
              <line x1="226" y1="65" x2="234" y2="65" stroke="#e9d5a6" strokeWidth="0.8" />
              <line x1="228" y1="50" x2="232" y2="50" stroke="#e9d5a6" strokeWidth="0.8" />
              
              <circle cx="230" cy="35" r="2.5" fill="#ff3b30" filter="url(#neonGlowOrange)" />
              <circle cx="230" cy="35" r="9" fill="none" stroke="#ff3b30" strokeWidth="0.8" opacity="0.8">
                <animate attributeName="r" values="2.5;13;2.5" dur="2s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* --- TOWER 3: Sustainable Twin Pillars (Base center 180, 270) --- */}
            <g className="building-group">
              
              {/* LEFT COLUMN PILLAR */}
              <polygon points="162,279 170,283 170,228 162,224" fill="url(#bldWhite)" stroke="rgba(255,255,255,0.75)" strokeWidth="0.4" className="facade-front"></polygon>
              <polygon points="170,283 178,279 178,224 170,228" fill="rgba(202,196,183,0.65)" stroke="rgba(255,255,255,0.75)" strokeWidth="0.4" className="facade-side"></polygon>
              {/* Left Roof Green Garden */}
              <polygon points="170,220 162,224 170,228 178,224" fill="url(#cyberGreen)" stroke="#10b981" strokeWidth="0.5"></polygon>
              
              {/* RIGHT COLUMN PILLAR */}
              <polygon points="187,266 195,270 195,215 187,211" fill="url(#bldWhite)" stroke="rgba(255,255,255,0.75)" strokeWidth="0.4" className="facade-front"></polygon>
              <polygon points="195,270 203,266 203,211 195,215" fill="rgba(202,196,183,0.65)" stroke="rgba(255,255,255,0.75)" strokeWidth="0.4" className="facade-side"></polygon>
              {/* Right Roof Green Garden */}
              <polygon points="195,207 187,211 195,215 203,211" fill="url(#cyberGreen)" stroke="#10b981" strokeWidth="0.5"></polygon>

              {/* INTER-PILLAR DOUBLE-LEVEL SKYBRIDGE */}
              <polygon points="178,235 187,230 187,234 178,239" fill="rgba(255,255,255,0.85)" stroke="rgba(255,255,255,0.9)" strokeWidth="0.4"></polygon>
              <line x1="178" y1="235" x2="187" y2="230" stroke="#e9d5a6" strokeWidth="0.8" filter="url(#neonGlowCyan)" />
              <line x1="178" y1="239" x2="187" y2="234" stroke="#e9d5a6" strokeWidth="0.8" filter="url(#neonGlowCyan)" />

              {/* Shading Louver Details */}
              <g stroke="rgba(18,17,14,0.22)" strokeWidth="0.5">
                <line x1="163" y1="236" x2="169" y2="239"></line>
                <line x1="163" y1="244" x2="169" y2="247"></line>
                <line x1="163" y1="252" x2="169" y2="255"></line>
                <line x1="163" y1="260" x2="169" y2="263"></line>
                <line x1="188" y1="223" x2="194" y2="226"></line>
                <line x1="188" y1="231" x2="194" y2="234"></line>
                <line x1="188" y1="239" x2="194" y2="242"></line>
                <line x1="188" y1="247" x2="194" y2="250"></line>
              </g>

              {/* Integrated Micro Wind Turbines slots */}
              <g stroke="rgba(207,167,88,0.3)" strokeWidth="0.4">
                <circle cx="178" cy="250" r="2.5" fill="none" />
                <circle cx="178" cy="258" r="2.5" fill="none" />
              </g>
              {/* Spinning Turbine Assemblies */}
              <g transform="translate(178, 250)">
                <circle cx="0" cy="0" r="0.6" fill="#e9d5a6" />
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.25s" repeatCount="indefinite" />
                  <line x1="0" y1="0" x2="0" y2="-2.2" stroke="#e9d5a6" strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="1.9" y2="1.1" stroke="#e9d5a6" strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="-1.9" y2="1.1" stroke="#e9d5a6" strokeWidth="0.5" />
                </g>
              </g>
              <g transform="translate(178, 258)">
                <circle cx="0" cy="0" r="0.6" fill="#e9d5a6" />
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.2s" repeatCount="indefinite" />
                  <line x1="0" y1="0" x2="0" y2="-2.2" stroke="#e9d5a6" strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="1.9" y2="1.1" stroke="#e9d5a6" strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="-1.9" y2="1.1" stroke="#e9d5a6" strokeWidth="0.5" />
                </g>
              </g>
            </g>
          </g>


          {/* ========================================================= */}
          {/* HOLOGRAPHIC SCANNER LAYER (MASKED DUAL-RENDER HIGH-GLOW)  */}
          {/* ========================================================= */}

          <g mask="url(#scanMask)">
            
            {/* --- TOWER 1: The Bioclimatic Core --- */}
            <g className="building-group">
              <polygon points="102,204 130,218 130,136 102,102" fill="rgba(245,158,11,0.18)" stroke="#FFB054" strokeWidth="1.2" filter="url(#neonGlowOrange)"></polygon>
              <polygon points="130,218 158,204 158,122 130,136" fill="rgba(245,158,11,0.18)" stroke="#FFB054" strokeWidth="1.2" filter="url(#neonGlowOrange)"></polygon>
              <polygon points="130,95 102,102 130,136 158,122" fill="rgba(245,158,11,0.3)" stroke="#FFB054" strokeWidth="1.2"></polygon>
              <g stroke="#ffffff" strokeWidth="1.8" strokeDasharray="3 3">
                <line x1="102" y1="204" x2="130" y2="136"></line>
                <line x1="102" y1="102" x2="130" y2="218"></line>
              </g>
            </g>

            {/* --- TOWER 2: Quantum Spire --- */}
            <g className="building-group">
              <polygon points="198,236 230,252 230,197 198,181" fill="rgba(207,167,88,0.18)" stroke="#e9d5a6" strokeWidth="1.2" filter="url(#neonGlowCyan)"></polygon>
              <polygon points="230,252 262,236 262,181 230,197" fill="rgba(207,167,88,0.18)" stroke="#e9d5a6" strokeWidth="1.2" filter="url(#neonGlowCyan)"></polygon>
              <polygon points="230,165 198,181 230,197 262,181" fill="rgba(207,167,88,0.3)" stroke="#e9d5a6" strokeWidth="1.2"></polygon>
              <line x1="230" y1="252" x2="230" y2="197" stroke="#ffffff" strokeWidth="2.5" filter="url(#neonGlowCyan)" />
              
              <polygon points="206,177 230,189 230,144 206,132" fill="rgba(207,167,88,0.18)" stroke="#e9d5a6" strokeWidth="1.2" filter="url(#neonGlowCyan)"></polygon>
              <polygon points="230,189 254,177 254,132 230,144" fill="rgba(207,167,88,0.18)" stroke="#e9d5a6" strokeWidth="1.2" filter="url(#neonGlowCyan)"></polygon>
              <polygon points="230,120 206,132 230,144 254,132" fill="rgba(207,167,88,0.3)" stroke="#e9d5a6" strokeWidth="1.2"></polygon>
              <line x1="230" y1="189" x2="230" y2="144" stroke="#ffffff" strokeWidth="2.5" filter="url(#neonGlowCyan)" />

              <polygon points="214,128 230,136 230,96 214,88" fill="rgba(207,167,88,0.18)" stroke="#e9d5a6" strokeWidth="1.2" filter="url(#neonGlowCyan)"></polygon>
              <polygon points="230,136 246,128 246,88 230,96" fill="rgba(207,167,88,0.18)" stroke="#e9d5a6" strokeWidth="1.2" filter="url(#neonGlowCyan)"></polygon>
              <polygon points="230,80 214,88 230,96 246,88" fill="rgba(207,167,88,0.3)" stroke="#e9d5a6" strokeWidth="1.2"></polygon>
              <line x1="230" y1="136" x2="230" y2="96" stroke="#ffffff" strokeWidth="2.5" filter="url(#neonGlowCyan)" />
            </g>

            {/* --- TOWER 3: Sustainable Twin Pillars --- */}
            <g className="building-group">
              <polygon points="162,279 170,283 170,228 162,224" fill="rgba(16,185,129,0.18)" stroke="#34D399" strokeWidth="1.2" filter="url(#neonGlowEmerald)"></polygon>
              <polygon points="170,283 178,279 178,224 170,228" fill="rgba(16,185,129,0.18)" stroke="#34D399" strokeWidth="1.2" filter="url(#neonGlowEmerald)"></polygon>
              <polygon points="187,266 195,270 195,215 187,211" fill="rgba(16,185,129,0.18)" stroke="#34D399" strokeWidth="1.2" filter="url(#neonGlowEmerald)"></polygon>
              <polygon points="195,270 203,266 203,211 195,215" fill="rgba(16,185,129,0.18)" stroke="#34D399" strokeWidth="1.2" filter="url(#neonGlowEmerald)"></polygon>
            </g>
          </g>


          {/* ========================================================= */}
          {/* DYNAMIC SCANNERS, DRONES, AND ATMOSPHERIC EFFECT LABELS   */}
          {/* ========================================================= */}

          {/* Sweeping LiDAR scan laser line (Visual bar crawling up & down) */}
          <line x1="30" y1="125" x2="370" y2="125" stroke="#e9d5a6" strokeWidth="1.6" filter="url(#neonGlowCyan)">
            <animate attributeName="y1" values="120;300;120" dur="7.5s" repeatCount="indefinite"></animate>
            <animate attributeName="y2" values="120;300;120" dur="7.5s" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" values="0;0.95;0.95;0" keyTimes="0;0.12;0.88;1" dur="7.5s" repeatCount="indefinite"></animate>
          </line>

          {/* LiDAR Point-Cloud scanning returns (Drifting volumetric coordinate nodes) */}
          <g opacity="0.9">
            <circle cx="150" cy="180" r="1.3" fill="#e9d5a6" filter="url(#neonGlowCyan)"><animate attributeName="cy" values="180;145;180" dur="3.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;1;0.3" dur="3.2s" repeatCount="indefinite" /></circle>
            <circle cx="185" cy="172" r="1.1" fill="#f59e4b" filter="url(#neonGlowOrange)"><animate attributeName="cy" values="172;135;172" dur="2.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" /></circle>
            <circle cx="215" cy="195" r="1.4" fill="#34d399" filter="url(#neonGlowEmerald)"><animate attributeName="cy" values="195;160;195" dur="3.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.2;0.95;0.2" dur="3.8s" repeatCount="indefinite" /></circle>
            <circle cx="255" cy="160" r="1.1" fill="#ffffff"><animate attributeName="cy" values="160;130;160" dur="4.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.1;0.9;0.1" dur="4.2s" repeatCount="indefinite" /></circle>
            <circle cx="120" cy="150" r="1.3" fill="#e9d5a6" filter="url(#neonGlowCyan)"><animate attributeName="cy" values="150;125;150" dur="2.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.9s" repeatCount="indefinite" /></circle>
            <circle cx="275" cy="190" r="1.2" fill="#f59e4b"><animate attributeName="cy" values="190;155;190" dur="3.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.2;0.95;0.2" dur="3.3s" repeatCount="indefinite" /></circle>
            <circle cx="145" cy="225" r="1.1" fill="#34d399"><animate attributeName="cy" values="225;195;225" dur="3.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.85;0.15;0.85" dur="3.6s" repeatCount="indefinite" /></circle>
            <circle cx="235" cy="235" r="1.3" fill="#ffffff" filter="url(#neonGlowCyan)"><animate attributeName="cy" values="235;205;235" dur="4.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.2;0.9;0.2" dur="4.5s" repeatCount="indefinite" /></circle>
          </g>

          {/* Sensor Drone Autonomous Flight Unit (Floating at 90, 75) */}
          <g>
            {/* Hovering physical micro-oscillation */}
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="3s" repeatCount="indefinite" />
            
            {/* Tapering LiDAR Laser Scan Cone projection down to ground targets */}
            <polygon points="90,75 104,208 198,191 90,75" fill="url(#coneGrad)" opacity="0.35"></polygon>

            {/* Drone core chassis */}
            <ellipse cx="90" cy="75" rx="7.5" ry="3.8" fill="rgba(18,17,14, 0.95)" stroke="#e9d5a6" strokeWidth="0.8" />
            <circle cx="90" cy="76.5" r="1.8" fill="#e9d5a6" filter="url(#neonGlowCyan)">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="84" cy="74.5" r="1" fill="#ff3b30" />

            {/* 4 Carbon fiber rotor rods */}
            <line x1="84" y1="73" x2="74" y2="68.5" stroke="#9c968a" strokeWidth="1" />
            <line x1="96" y1="73" x2="106" y2="68.5" stroke="#9c968a" strokeWidth="1" />
            <line x1="85.5" y1="77" x2="76" y2="81.5" stroke="#9c968a" strokeWidth="1" />
            <line x1="94.5" y1="77" x2="104" y2="81.5" stroke="#9c968a" strokeWidth="1" />

            {/* Quad Spinning Propeller assemblies */}
            <g transform="translate(74, 68.5)">
              <ellipse cx="0" cy="0" rx="7.5" ry="2.2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.12s" repeatCount="indefinite" />
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="0.6" />
              </g>
            </g>
            <g transform="translate(106, 68.5)">
              <ellipse cx="0" cy="0" rx="7.5" ry="2.2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.1s" repeatCount="indefinite" />
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="0.6" />
              </g>
            </g>
            <g transform="translate(76, 81.5)">
              <ellipse cx="0" cy="0" rx="7.5" ry="2.2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.15s" repeatCount="indefinite" />
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="0.6" />
              </g>
            </g>
            <g transform="translate(104, 81.5)">
              <ellipse cx="0" cy="0" rx="7.5" ry="2.2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.13s" repeatCount="indefinite" />
                <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="0.6" />
              </g>
            </g>
          </g>


          {/* ========================================================= */}
          {/* FUTURISTIC HUD SCHEMATIC GRAPHICS OVERLAY AND TELEMETRY   */}
          {/* ========================================================= */}

          {/* HUD Callout Panel Left: LiDAR telemetry node */}
          <g transform="translate(15, 38)" className="hud-callout" opacity="0.85">
            <rect x="-5" y="-5" width="84" height="34" fill="rgba(13,12,10, 0.9)" stroke="rgba(207,167,88,0.3)" strokeWidth="0.8" rx="5" />
            <text x="3" y="6" fill="#e9d5a6" fontFamily="monospace" fontSize="6.5" fontWeight="bold">DRONE TELEM</text>
            <text x="3" y="14" fill="#ffffff" fontFamily="monospace" fontSize="5">ALT: {telemetry.alt}</text>
            <text x="3" y="22" fill="rgba(255,255,255,0.5)" fontFamily="monospace" fontSize="4.5">GPS: 3D_DGPS LOCK</text>
            
            {/* Animated mini green radar dot inside tag */}
            <circle cx="70" cy="6" r="1.5" fill="#10B981" filter="url(#neonGlowCyan)">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* HUD Callout Panel Right: ISO 19152 (LADM-COL v3.0) Cadastre */}
          <g transform="translate(305, 45)" className="hud-callout" opacity="0.85">
            {/* Pinned dotted connector leader line */}
            <path d="M-60,0 L-5,-15 L0,-15" stroke="rgba(207,167,88,0.6)" strokeWidth="0.7" fill="none" strokeDasharray="2 2" />
            <rect x="0" y="-27" width="80" height="28" fill="rgba(13,12,10, 0.9)" stroke="#e9d5a6" strokeWidth="0.8" rx="4" />
            <text x="5" y="-17" fill="#e9d5a6" fontFamily="monospace" fontSize="6.5" fontWeight="black">LADM-COL v3.0</text>
            <text x="5" y="-9" fill="rgba(255,255,255,0.5)" fontFamily="monospace" fontSize="5">ISO 19152 CORE</text>
          </g>

          {/* HUD Callout Panel Left-Bottom: Survey coordinates data */}
          <g transform="translate(15, 245)" className="hud-callout" opacity="0.85">
            {/* Pinned leader path */}
            <path d="M120,-30 L75,-10 L55,-10" stroke="rgba(245,158,11,0.6)" strokeWidth="0.7" fill="none" strokeDasharray="2 2" />
            <rect x="-5" y="-22" width="68" height="26" fill="rgba(13,12,10, 0.9)" stroke="#f59e4b" strokeWidth="0.8" rx="4" />
            <text x="2" y="-12" fill="#f59e4b" fontFamily="monospace" fontSize="6.5" fontWeight="bold">PRECISION GPS</text>
            <text x="2" y="-4" fill="rgba(255,255,255,0.6)" fontFamily="monospace" fontSize="5">ACC: &lt; 0.05 METROS</text>
          </g>

          {/* Real-time Oscilloscope Telemetry Waveform Graphic */}
          <g transform="translate(15, 78)">
            <rect x="-5" y="-4" width="84" height="16" fill="rgba(13,12,10, 0.7)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" rx="3" />
            
            {/* Oscillating oscilloscope path */}
            <path d="M 0,4 Q 5,0 10,4 T 20,4 T 30,4 T 40,4 T 50,4 T 60,4 T 70,4" fill="none" stroke="#e9d5a6" strokeWidth="0.8" opacity="0.85">
              <animate attributeName="d" values="M 0,4 Q 5,-2 10,4 T 20,4 T 30,10 T 40,4 T 50,0 T 60,4 T 70,4; M 0,4 Q 5,10 10,4 T 20,-2 T 30,4 T 40,8 T 50,4 T 60,-2 T 70,4; M 0,4 Q 5,-2 10,4 T 20,4 T 30,10 T 40,4 T 50,0 T 60,4 T 70,4" dur="2.4s" repeatCount="indefinite" />
            </path>
            
            <text x="50" y="8" fill="#e9d5a6" fontFamily="monospace" fontSize="4.5" textAnchor="middle">PING: {telemetry.ping}</text>
          </g>

        </svg>

        {/* Bottom HUD: Dynamic land metrics & cadastral coordinates */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent px-5 py-3.5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="font-mono text-[11px] md:text-sm font-bold text-white tracking-tight">1.245.310</div>
              <div className="mt-0.5 text-[8px] uppercase tracking-wider text-slate-400 font-semibold">PREDIOS</div>
            </div>
            <div className="border-x border-white/10">
              <div className="font-mono text-[11px] md:text-sm font-bold text-cyan-400 tracking-tight">5 cm/px</div>
              <div className="mt-0.5 text-[8px] uppercase tracking-wider text-slate-400 font-semibold">RESOLUCIÓN</div>
            </div>
            <div>
              <div className="font-mono text-[11px] md:text-sm font-bold text-white tracking-tight">EPSG:9377</div>
              <div className="mt-0.5 text-[8px] uppercase tracking-wider text-slate-400 font-semibold">CTM12</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
