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
    <div
      className={cn(
        "flex items-center gap-4 sm:gap-5 lg:gap-6",
        className
      )}
    >
      <div className="relative h-full w-[41%]">
        <Image
          src="/aayam-logo.png"
          alt="AAYAM Tech Fest official logo"
          fill
          priority={priority}
          className="object-contain object-left"
          sizes="(max-width: 768px) 150px, 280px"
        />
      </div>
      <span className="shrink-0 text-lg font-black tracking-[0.2em] text-white/90 sm:text-2xl lg:text-[2.1rem]">
        X
      </span>
      <div className="relative h-full flex-1 scale-[1.35] sm:scale-[1.42]">
        <Image
          src="/newton-school-logo.png"
          alt="Newton School of Technology logo"
          fill
          priority={priority}
          className="object-contain object-left"
          sizes="(max-width: 768px) 170px, 320px"
        />
      </div>
    </div>
  );
}
