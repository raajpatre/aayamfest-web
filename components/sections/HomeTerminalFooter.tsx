import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://www.instagram.com/aayamfest?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    label: "> connect --instagram",
    accent: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
  },
  {
    href: "https://www.linkedin.com/company/aayam-tech-fest/",
    label: "> connect --linkedin",
    accent: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
  },
  {
    href: "https://x.com/aayamfest",
    label: "> connect --X",
    accent: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
  }
];

export function HomeTerminalFooter({ lightLinks = false }: { lightLinks?: boolean }) {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/80 sm:mt-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[minmax(260px,1.2fr)_minmax(260px,1fr)_minmax(240px,0.9fr)_minmax(180px,0.7fr)] lg:items-center lg:gap-8 lg:px-8">
        <div className="flex justify-center lg:justify-start">
          <div className="relative h-8 w-[190px] sm:h-12 sm:w-[300px]">
            <Image
              src="/navbar-logo.png"
              alt="AAYAM x Newton School of Technology"
              fill
              className="object-contain object-left"
              sizes="(max-width: 640px) 190px, 300px"
            />
          </div>
        </div>

        <p
          className={`text-center font-mono text-xs leading-6 lg:text-left lg:text-sm ${lightLinks
            ? "text-cyan-100/95 drop-shadow-[0_0_12px_rgba(34,211,238,0.22)]"
            : "text-white/75"
            }`}
        >
          AAYAM 2026 // Step into the unknown.
        </p>

        <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-300/90 lg:justify-center lg:text-sm lg:tracking-[0.2em]">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.85)] animate-pulse sm:h-2.5 sm:w-2.5" />
          <span className="drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">SYSTEM ONLINE_</span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs lg:justify-end lg:text-sm">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 ${lightLinks
                ? "text-cyan-200/95 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                : "text-white/65"
                } ${link.accent}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
