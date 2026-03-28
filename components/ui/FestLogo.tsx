import Image from "next/image";
import { cn } from "@/lib/format";

export function FestLogo({
  className,
  priority = false
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/aayam-logo.png"
        alt="AAYAM Tech Fest official logo"
        fill
        priority={priority}
        className="object-contain"
        sizes="(max-width: 768px) 220px, 420px"
      />
    </div>
  );
}
