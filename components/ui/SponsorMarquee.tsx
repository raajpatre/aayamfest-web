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
    <div className="overflow-hidden border border-outlineSoft/25 bg-panel/55">
      <div className="flex min-w-max animate-marquee gap-4 px-4 py-4">
        {duplicated.map((sponsor, index) => (
          <a
            key={`${sponsor._id}-${index}`}
            href={sponsor.websiteLink}
            target="_blank"
            rel="noreferrer"
            className="terminal-panel flex h-24 w-44 shrink-0 items-center justify-center p-5 grayscale transition hover:border-pinkGlow/35 hover:grayscale-0"
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={124}
              height={52}
              className="max-h-11 w-auto object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
