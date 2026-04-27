"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format";
import { AudioController } from "@/components/ui/AudioController";
import { HelpButton } from "@/components/ui/HelpButton";
import { usePerformance } from "@/lib/hooks/usePerformance";

const links: Array<{ href: string; label: string; external?: boolean; ariaLabel?: string }> = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Terminal", ariaLabel: "Events" },
  { href: "/sponsors", label: "Archive", ariaLabel: "Sponsors" },
  { href: "/team", label: "Squad", ariaLabel: "Team" },
  { href: "/contact", label: "Uplink", ariaLabel: "Contact" }
];

const dayPassLink = {
  href: "https://easebuzz.in/link/YQH9U",
  label: "Day Pass",
  external: true,
};

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLowPerf } = usePerformance();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-40 bg-black/20 opacity-0 backdrop-blur-none transition-all duration-300 md:hidden",
          mobileMenuOpen && (isLowPerf ? "pointer-events-auto opacity-100" : "pointer-events-auto opacity-100 backdrop-blur-md")
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
      <header className="fixed inset-x-0 top-4 z-50 sm:top-6">
        <div className="container-shell flex justify-center">
          <div
            className={cn(
              "flex w-full max-w-5xl items-center gap-4 rounded-full border border-white/10 bg-black/40 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:px-6",
              isHome
                ? "justify-end border-0 bg-transparent px-0 py-0 shadow-none backdrop-blur-0 md:justify-center md:rounded-full md:border md:border-white/10 md:bg-black/40 md:px-4 md:py-3 md:shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)] md:backdrop-blur-md"
                : "justify-between"
            )}
          >
          {!isHome && (
            <Link href="/" className="block">
              <div className="relative h-10 w-[264px] sm:h-12 sm:w-[320px]">
                <Image
                  src="/navbar-logo.png"
                  alt="AAYAM x Newton School of Technology"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 264px, 320px"
                />
              </div>
            </Link>
          )}

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "system-label group relative border-b border-transparent pb-1 text-[11px] text-white transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",
                    active &&
                      "border-cyan-400/60 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  )}
                >
                  <span className="pointer-events-none absolute inset-0 translate-y-[2px] scale-[1.04] blur-[6px] opacity-0 transition-opacity duration-300 group-hover:opacity-35">
                    {link.label}
                  </span>
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}

            {/* Day Pass — highlighted CTA */}
            <a
              href={dayPassLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-daypass group relative system-label pb-1 text-[11px] transition-all duration-300"
            >
              <span className="pointer-events-none absolute inset-0 translate-y-[2px] scale-[1.04] blur-[6px] opacity-40">
                {dayPassLink.label}
              </span>
              <span className="relative">{dayPassLink.label}</span>
              <span className="nav-daypass-badge">New</span>
            </a>
          </nav>

          <div className={cn("relative md:hidden", isHome && "absolute right-4")}>
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="list-none cursor-pointer rounded-full border border-white/10 bg-black p-3 text-cyanGlow backdrop-blur-md transition-all duration-300 hover:border-cyanGlow/40 hover:text-white"
            >
              <span className="sr-only">Open menu</span>
              <span className="flex h-5 w-5 flex-col items-center justify-center gap-[3px]">
                {[0, 1, 2].map((line) => (
                  <span key={line} className="block h-[1.5px] w-4 rounded-full bg-current" />
                ))}
              </span>
            </button>
            <div
              className={cn(
                "absolute right-0 mt-3 min-w-52 rounded-[28px] border border-white/15 bg-black p-3 shadow-[0_12px_44px_rgba(0,0,0,0.62),inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300",
                !isLowPerf && "backdrop-blur-xl",
                mobileMenuOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-2xl border border-white/8 bg-black px-3 py-2 text-sm uppercase tracking-[0.18em] text-white/92 transition-all duration-300 hover:border-cyan-400/35 hover:bg-black hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Day Pass — mobile CTA */}
                <a
                  href={dayPassLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-daypass-mobile relative block rounded-2xl px-3 py-2 text-sm uppercase tracking-[0.18em] transition-all duration-300"
                >
                  {dayPassLink.label}
                  <span className="nav-daypass-badge">New</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </header>

      {/* ── Announcement Marquee ── */}
      <div className="announcement-bar top-[90px] sm:top-[92px] md:top-[104px]" style={{ zIndex: 49 }}>
        <div className="announcement-marquee-track">
          {[0, 1].map((i) => (
            <div key={i} className="flex shrink-0 items-center gap-6 px-6 py-2">
              <span className="system-label whitespace-nowrap text-[10px] text-cyan-300/90 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)] sm:text-[11px]">
                🎵 Free Concert Passes on Paid Events Registrations
              </span>
              <span className="text-fuchsia-400/60">⬥</span>
              <span className="system-label whitespace-nowrap text-[10px] text-fuchsia-300/90 drop-shadow-[0_0_6px_rgba(217,70,239,0.5)] sm:text-[11px]">
                🎤 Artist reveal Soon
              </span>
              <span className="text-cyan-400/60">⬥</span>
              <span className="system-label whitespace-nowrap text-[10px] text-cyan-300/90 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)] sm:text-[11px]">
                📸 Stay tuned on IG: @aayamfest
              </span>
              <span className="text-fuchsia-400/60">⬥</span>
            </div>
          ))}
        </div>
      </div>

      <div className={isHome ? "pt-[126px] sm:pt-[140px]" : "pt-[140px]"}>{children}</div>
      <HelpButton />
      <AudioController />
    </>
  );
}
