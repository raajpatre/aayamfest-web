"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sponsorLine =
  "NST  •  SVYASA  •  VAJRA-X  •  SILVER SCREEN SYNDICATE  •  DJI  •  ASYNC API";

const sponsorStream = `${sponsorLine}  •  ${sponsorLine}  •  ${sponsorLine}`;

export function SponsorsPreviewSection() {
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[36%] h-48 w-[68%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),rgba(34,211,238,0.08)_24%,rgba(217,70,239,0.08)_45%,transparent_72%)] blur-3xl" />
        <div className="absolute left-1/2 top-[42%] h-20 w-[44%] -translate-x-1/2 rounded-[999px] border border-cyan-300/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-sm tracking-widest text-orange-500">[ PARTNERS ]</span>
          <h2 className="mt-4 text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] sm:text-4xl">
            SPONSORS PREVIEW
          </h2>
        </div>

        <div className="relative mt-8">
          <div className="pointer-events-none absolute inset-x-[4%] top-[55%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative overflow-hidden bg-black/10 py-6">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(8,12,20,0)_0%,rgba(8,12,20,0)_48%,rgba(8,12,20,0.14)_78%,rgba(8,12,20,0.42)_100%)]" />

            <svg
              viewBox="0 0 1000 220"
              className="relative z-10 h-[210px] w-full overflow-visible"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <path id="sponsor-curve" d="M 0 190 Q 500 -10 1000 190" fill="transparent" />
                <filter id="sponsor-glow" x="-20%" y="-80%" width="140%" height="260%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ffffff" floodOpacity="0.18" />
                  <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#22d3ee" floodOpacity="0.22" />
                  <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#d946ef" floodOpacity="0.14" />
                </filter>
              </defs>

              <path
                d="M 0 190 Q 500 -10 1000 190"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                strokeDasharray="3 10"
              />

              <text
                className="font-mono text-[31px] font-bold uppercase tracking-[0.28em]"
                fill="rgba(255,255,255,0.5)"
                filter="url(#sponsor-glow)"
                style={{ letterSpacing: "0.28em" }}
              >
                <motion.textPath
                  href="#sponsor-curve"
                  startOffset="0%"
                  animate={{ startOffset: ["0%", "-50%"] }}
                  transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                >
                  {sponsorStream}
                </motion.textPath>
              </text>
            </svg>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Link
            href="/sponsors"
            className="rounded-xl border border-orange-500 bg-transparent px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.24em] text-orange-500 transition-all duration-300 hover:bg-orange-500/10 hover:shadow-[0_0_24px_rgba(249,115,22,0.24)]"
          >
            ALL SPONSORS
          </Link>
        </div>
      </div>
    </section>
  );
}
