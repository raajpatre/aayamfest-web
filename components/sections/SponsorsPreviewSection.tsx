"use client";

import { motion } from "framer-motion";

const sponsorLine =
  "NST  •  SVYASA  •  VAJRA-X  •  SILVER SCREEN SYNDICATE  •  DJI  •  ASYNC API";

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
          <div className="relative overflow-hidden py-6">
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
