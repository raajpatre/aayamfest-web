import Link from "next/link";
import { SiteConfigRecord } from "@/lib/types";
import { FestLogo } from "@/components/ui/FestLogo";

const socialMap = [
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "twitter", label: "Twitter" },
  { key: "youtube", label: "YouTube" }
] as const;

export function Footer({ siteConfig }: { siteConfig: SiteConfigRecord | null }) {
  return (
    <footer className="relative overflow-hidden border-t border-pinkGlow/15 py-14">
      <div className="container-shell">
        <div className="terminal-panel p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="data-line">Strategic Alliance Network</p>
              <div className="mt-5">
                <FestLogo className="h-16 w-[238px] sm:h-20 sm:w-[298px]" />
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-textDim">
                System online for coders, builders, robotics crews, and campus operators stepping
                beyond the known.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-textDim sm:grid-cols-2">
              <div>
                <p className="system-label text-[10px] text-cyanGlow">Email</p>
                <p className="mt-2 text-white">{siteConfig?.contactDetails?.email || "Pending uplink"}</p>
              </div>
              <div>
                <p className="system-label text-[10px] text-cyanGlow">Phone</p>
                <p className="mt-2 text-white">{siteConfig?.contactDetails?.phone || "Pending uplink"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="system-label text-[10px] text-cyanGlow">Address</p>
                <p className="mt-2 text-white/85">
                  {siteConfig?.contactDetails?.address || "Campus coordinates awaiting sync"}
                </p>
              </div>
            </div>
          </div>
          <div className="neon-divider my-8" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {socialMap.map((item) => {
                const link = siteConfig?.socialLinks?.[item.key];
                if (!link) return null;
                return (
                  <Link
                    key={item.key}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="command-btn border border-outlineSoft/35 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:border-cyanGlow/45 hover:text-cyanGlow"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <p className="system-label text-[10px] text-white/40">Build: Stable v4.2</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
