"use client";

import Image from "next/image";
import { SponsorRecord } from "@/lib/types";

export function SponsorMarquee({ sponsors }: { sponsors: SponsorRecord[] }) {
  if (!sponsors.length) {
    return (
      <div className="glass-panel rounded-[1.75rem] p-6 text-textDim">
        Sponsors will appear here as soon as they are added from admin.
      </div>
    );
  }

  const duplicated = [...sponsors, ...sponsors];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
      <div className="flex min-w-max animate-marquee gap-4 px-4 py-4">
        {duplicated.map((sponsor, index) => (
          <a
            key={`${sponsor._id}-${index}`}
            href={sponsor.websiteLink}
            target="_blank"
            rel="noreferrer"
            className="glass-panel flex h-24 w-44 shrink-0 items-center justify-center rounded-[1.25rem] p-4 grayscale transition hover:grayscale-0"
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={128}
              height={64}
              className="max-h-12 w-auto object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
