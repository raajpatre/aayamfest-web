import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/format";

export function ActionButton({
  href,
  children,
  variant = "primary",
  external = false,
  className
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-pinkGlow text-[#510051] shadow-[0_0_20px_rgba(255,0,255,0.35)] hover:brightness-110"
      : variant === "secondary"
        ? "border border-cyanGlow/35 bg-transparent text-cyanGlow hover:bg-cyanGlow hover:text-[#002020]"
        : "border border-outlineSoft/35 bg-[#1c1b1e]/75 text-white hover:border-pinkGlow/45 hover:text-pinkGlow";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "command-btn inline-flex items-center justify-center px-6 py-3",
        "terminal-heading text-xs font-black uppercase tracking-[0.24em] transition-all duration-150",
        styles,
        className
      )}
    >
      {children}
    </Link>
  );
}
