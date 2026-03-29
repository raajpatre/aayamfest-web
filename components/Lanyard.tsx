"use client";

export default function Lanyard() {
  return (
    <div className="relative w-[220px] rotate-[-6deg] transition-transform duration-300 hover:rotate-[-2deg]">
      <div className="absolute left-1/2 top-[-56px] h-20 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/80 via-cyan-300/35 to-transparent" />
      <div className="absolute left-1/2 top-[-16px] h-5 w-5 -translate-x-1/2 rounded-full border border-cyan-300/60 bg-black shadow-[0_0_18px_rgba(34,211,238,0.4)]" />

      <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/30 bg-black/45 p-4 shadow-[0_0_30px_rgba(34,211,238,0.18)] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_34%)]" />
        <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-cyan-300/60" />
        <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-cyan-300/60" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-fuchsia-400/40" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-fuchsia-400/40" />

        <div className="relative z-10 rounded-[22px] border border-white/10 bg-black/55 px-4 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-300/70">
            Access Badge
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.16)]">
              <span className="font-mono text-xl font-bold text-cyan-200">A</span>
            </div>
            <div>
              <p className="font-mono text-lg font-bold text-white">AAYAM GRID</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
                Operator Uplink
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
            <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2">NODE // LIVE</div>
            <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2">ID // 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}
