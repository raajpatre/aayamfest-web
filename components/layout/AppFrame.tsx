"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format";
import { FestLogo } from "@/components/ui/FestLogo";
import { AudioController } from "@/components/ui/AudioController";

const links = [
  { href: "/", label: "Program" },
  { href: "/events", label: "Terminal" },
  { href: "/sponsors", label: "Archive" },
  { href: "/team", label: "Squad" },
  { href: "/contact", label: "Uplink" },
  { href: "/admin", label: "Admin" }
];

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isHome = pathname === "/";

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="fixed inset-x-0 top-6 z-50">
        <div className="container-shell flex justify-center">
          <div
            className={cn(
              "flex w-full max-w-5xl items-center gap-4 rounded-full border border-white/10 bg-black/40 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:px-6",
              isHome ? "justify-center" : "justify-between"
            )}
          >
          {!isHome && (
            <Link href="/" className="block">
              <FestLogo className="h-10 w-[152px] sm:h-12 sm:w-[188px]" priority />
            </Link>
          )}

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "system-label group relative border-b border-transparent pb-1 text-[11px] text-white/65 transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",
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
          </nav>

          <details className={cn("relative md:hidden", isHome && "absolute right-6")}>
            <summary className="list-none cursor-pointer rounded-full border border-white/10 bg-black/35 px-4 py-2 text-cyanGlow backdrop-blur-md transition-all duration-300 hover:border-cyanGlow/40 hover:text-white">
              <span className="system-label text-[10px]">Menu</span>
            </summary>
            <div className="absolute right-0 mt-3 min-w-52 rounded-[28px] border border-white/10 bg-black/55 p-3 shadow-[0_12px_44px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-lg">
              <div className="space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-2xl border border-transparent px-3 py-2 text-sm uppercase tracking-[0.18em] text-white/75 transition-all duration-300 hover:border-cyan-400/35 hover:bg-white/5 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </details>
        </div>
        </div>
      </header>
      <div className="pt-[104px]">{children}</div>
      {isHome && <AudioController />}
    </>
  );
}
