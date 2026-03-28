import Link from "next/link";

const socialLinks = [
  { href: "#", label: "> connect --ig", accent: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]" },
  { href: "#", label: "> connect --x", accent: "hover:text-fuchsia-400 hover:drop-shadow-[0_0_10px_rgba(217,70,239,0.7)]" },
  {
    href: "#",
    label: "> connect --linkedin",
    accent: "hover:text-cyan-300 hover:drop-shadow-[0_0_10px_rgba(103,232,249,0.7)]"
  }
];

export function HomeTerminalFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="font-mono text-sm text-white/75">AAYAM 2026 // Step into the unknown.</p>

        <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-300/90">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.85)] animate-pulse" />
          <span className="drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">SYSTEM ONLINE_</span>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm text-white/65">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-all duration-300 ${link.accent}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
