import Link from "next/link";
import { SiteConfigRecord } from "@/lib/types";

const socialMap = [
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "twitter", label: "Twitter" },
  { key: "youtube", label: "YouTube" }
] as const;

export function Footer({ siteConfig }: { siteConfig: SiteConfigRecord | null }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-shell grid gap-6 md:grid-cols-2 md:items-end">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.28em] text-white">
            {siteConfig?.festName || "AAYAM Tech Fest"}
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-textDim">
            A premium tech festival experience built for innovation, competition, and unforgettable
            stage energy.
          </p>
        </div>
        <div className="text-sm text-textDim md:text-right">
          <p>{siteConfig?.contactDetails?.email || "Email coming soon"}</p>
          <p className="mt-2">{siteConfig?.contactDetails?.phone || "Phone coming soon"}</p>
          <div className="mt-4 flex flex-wrap gap-3 md:justify-end">
            {socialMap.map((item) => {
              const link = siteConfig?.socialLinks?.[item.key];
              if (!link) return null;
              return (
                <Link
                  key={item.key}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-cyanGlow/40 hover:text-white"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
