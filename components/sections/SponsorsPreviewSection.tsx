"use client";

import { motion } from "framer-motion";

const sponsorLine = "???  •  ???  •  ???  •  ???  •  ???  •  ???";

const sponsorStream = `${sponsorLine}  •  ${sponsorLine}  •  ${sponsorLine}`;

export function SponsorsPreviewSection() {
  return (
    <section className="relative py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-sm tracking-widest text-orange-500">[ PARTNERS ]</span>
          <h2 className="mt-4 text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] sm:text-4xl">
            SPONSORS PREVIEW
          </h2>
        </div>

        <div className="relative mt-8">
          <div className="relative space-y-2 py-4 md:hidden">
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0a0b12] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0a0b12] to-transparent" />
              <div className="flex min-w-max animate-marquee whitespace-nowrap font-mono text-lg font-semibold uppercase tracking-[0.22em] text-white/70 [text-shadow:0_0_12px_rgba(255,255,255,0.12)]">
                <span className="px-6">{sponsorStream}</span>
                <span className="px-6">{sponsorStream}</span>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0a0b12] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0a0b12] to-transparent" />
              <div className="flex min-w-max animate-marquee whitespace-nowrap font-mono text-lg font-semibold uppercase tracking-[0.22em] text-white/55 [animation-direction:reverse] [text-shadow:0_0_12px_rgba(255,255,255,0.08)]">
                <span className="px-6">{sponsorStream}</span>
                <span className="px-6">{sponsorStream}</span>
              </div>
            </div>
          </div>

          <div className="relative hidden overflow-hidden py-6 md:block">
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
      </div>
    </section>
  );
}
