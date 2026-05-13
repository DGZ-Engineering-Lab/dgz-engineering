export default function FooterSection() {
  return (
    <footer className="relative w-full border-t border-slate-800/50 bg-[#02040a] z-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-center">
        <div className="text-xs font-mono text-slate-500 tracking-widest uppercase flex items-center gap-3">
          <span className="text-cyan-500/50">©</span>
          <span className="text-slate-400">2026 DEVGIZ. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
