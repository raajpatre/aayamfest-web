import type { ReactNode } from "react";
import { FestLogo } from "@/components/ui/FestLogo";

export function AdminShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="admin-bg min-h-screen text-white">
      <div className="fixed inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "radial-gradient(#00dddd 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <aside className="hidden xl:flex fixed inset-y-0 left-0 z-40 w-72 flex-col border-r border-white/5 bg-[#1c1b1e]/92 px-6 py-8 backdrop-blur-xl">
        <div className="mt-16">
          <FestLogo className="h-16 w-[180px]" />
          <p className="terminal-heading mt-5 text-xl font-black text-cyanGlow">Operator_01</p>
          <p className="system-label mt-2 text-[10px] text-white/40">Status: Encrypted</p>
        </div>

        <div className="mt-10 space-y-2">
          {["Dashboard", "Uplink", "Network", "Encryption"].map((item, index) => (
            <div
              key={item}
              className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.24em] ${index === 0 ? "border-l-4 border-cyanGlow bg-cyanGlow/10 text-cyanGlow" : "text-white/35"}`}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-5">
          <div className="terminal-panel p-4">
            <p className="system-label text-[10px] text-amberGlow">Critical Alert</p>
            <p className="mt-3 text-xs text-white/65">Unauthorized access detected node_04</p>
          </div>
          <button className="command-btn bg-cyanGlow px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-[#002020]">
            Initiate Sync
          </button>
        </div>
      </aside>

      <div className="xl:pl-72">
        <header className="sticky top-0 z-30 border-b border-pinkGlow/15 bg-[#131315]/95 px-4 py-4 backdrop-blur-xl sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="system-label text-[10px] text-cyanGlow">Module_v08 // Registration Interface</p>
              <h1 className="terminal-heading glitch-text mt-2 text-4xl font-black text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-textDim">{description}</p>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <div className="border border-outlineSoft/30 bg-panel px-4 py-3">
                <span className="system-label text-[10px] text-white/35">Query_System...</span>
              </div>
            </div>
          </div>
          <div className="neon-divider mt-4" />
        </header>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>
      </div>
    </main>
  );
}
