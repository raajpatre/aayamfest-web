import type { ReactNode } from "react";
import { cn } from "@/lib/format";

export function FormField({
  label,
  children,
  className
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="system-label mb-3 block text-[10px] text-white/55">{label}</span>
      {children}
    </label>
  );
}

export function inputStyles() {
  return "terminal-input terminal-select text-sm";
}
