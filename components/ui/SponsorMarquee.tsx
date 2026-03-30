"use client";

import Image from "next/image";
import { SponsorRecord } from "@/lib/types";

export function SponsorMarquee({ sponsors }: { sponsors: SponsorRecord[] }) {
  if (!sponsors.length) {
    return (
      <div className="terminal-panel p-6 text-sm uppercase tracking-[0.18em] text-textDim">
        Strategic alliance network awaiting uplink
      </div>
    );
  }

  const duplicated = [...sponsors, ...sponsors];

  return (
    <div className="overflow-hidden">
      <div className="flex min-w-max animate-marquee items-center gap-8 px-2 py-3">
        {duplicated.map((sponsor, index) => (
          <a
            key={`${sponsor._id}-${index}`}
            href={sponsor.websiteLink}
            target="_blank"
            rel="noreferrer"
            className="flex h-24 w-44 shrink-0 items-center justify-center p-4 transition duration-300"
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={124}
              height={52}
              className={`${sponsor.name === "Canva" ? "max-h-16" : "max-h-12"} w-auto object-contain`}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
