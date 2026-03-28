import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "AAYAM Tech Fest",
  description: "Modern futuristic college fest website with dynamic admin dashboard."
};

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040816]/70 backdrop-blur-xl">
          <div className="container-shell flex items-center justify-between gap-4 py-4">
            <Link href="/" className="font-display text-lg font-semibold tracking-[0.28em] text-white">
              AAYAM
            </Link>
            <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-200 transition",
                    "hover:border-cyanGlow/40 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
