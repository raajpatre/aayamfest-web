import type { ReactNode } from "react";
import { cn } from "@/lib/format";

export function GlassCard({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("glass-panel reveal-border rounded-[1.75rem]", className)}>
      {children}
    </div>
  );
}
