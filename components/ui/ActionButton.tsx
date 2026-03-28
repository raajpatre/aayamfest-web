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
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-cyanGlow/85 via-violetGlow/85 to-pinkGlow/85 text-slate-950"
      : "border border-white/15 bg-white/5 text-white";

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition hover:scale-[1.02]",
        styles,
        className
      )}
    >
      {children}
    </Link>
  );
}
