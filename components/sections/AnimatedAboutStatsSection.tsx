"use client";

import DecryptedText from "@/components/DecryptedText";

const GLYPHS = "X@#$01&*!";
const ABOUT_LABEL = "[ SYSTEM.INFO // ABOUT THE FEST ]";
const ABOUT_HEADING = "NST's Apex Tech Convergence";
const ABOUT_BODY =
  "AAYAM is the ultimate nexus where code, hardware, and digital storytelling collide. Hosted by Newton School of Technology, this is a high-octane battleground for the brightest minds. Jack into the grid, push beyond the known limits, and build the future. The system is waiting for your input.";
const PRIZE_AMOUNT = "₹4,00,000+";
const PRIZE_LABEL = "> [ ALLOCATED CREDITS ]";
const MISSION_COUNT = "12+ CORE DIRECTIVES";
const MISSION_LABEL = "[ Syntax // Mecha-Bots // Web-Grid // Digital Media ]";

export function AnimatedAboutStatsSection() {
  const decryptProps = {
    animateOn: "view" as const,
    sequential: true,
    speed: 40,
    maxIterations: 15,
    characters: GLYPHS
  };

  const slowHeadingDecryptProps = {
    ...decryptProps,
    speed: 68,
    maxIterations: 22
  };

  const fastParagraphDecryptProps = {
    ...decryptProps,
    speed: 24,
    maxIterations: 9
  };

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/35 p-8 backdrop-blur-lg shadow-[0_24px_60px_rgba(0,0,0,0.28),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-orange-500/10 to-transparent blur-xl" />
        <div className="relative">
          <div className="font-mono text-sm tracking-[0.32em]">
            <DecryptedText
              text={ABOUT_LABEL}
              className="text-orange-500"
              encryptedClassName="text-cyan-400 opacity-70"
              parentClassName="inline-block"
              {...decryptProps}
            />
          </div>
          <h2 className="mt-5 text-4xl font-black text-white [text-shadow:0_6px_20px_rgba(255,255,255,0.08),0_8px_28px_rgba(0,0,0,0.75)] sm:text-5xl">
            <DecryptedText
              text={ABOUT_HEADING}
              className="text-white"
              encryptedClassName="text-cyan-400 opacity-70"
              parentClassName="inline-block"
              {...slowHeadingDecryptProps}
            />
          </h2>
          <div className="mt-6 max-w-2xl text-base leading-8 sm:text-lg">
            <DecryptedText
              text={ABOUT_BODY}
              className="text-gray-300"
              encryptedClassName="text-cyan-400 opacity-70"
              parentClassName="block"
              {...fastParagraphDecryptProps}
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/40 p-8 backdrop-blur-lg shadow-[0_24px_60px_rgba(0,0,0,0.28),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cyan-400/10 via-fuchsia-500/10 to-transparent blur-2xl" />
        <div className="relative">
          <div className="bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-5xl font-black text-transparent drop-shadow-[0_0_24px_rgba(34,211,238,0.35)] [text-shadow:0_0_14px_rgba(34,211,238,0.35)] sm:text-6xl">
            <DecryptedText
              text={PRIZE_AMOUNT}
              className="text-transparent"
              encryptedClassName="text-cyan-400 opacity-70"
              parentClassName="inline-block"
              {...decryptProps}
            />
          </div>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan-500">
            {PRIZE_LABEL}
          </p>
          <div className="my-6 border-b border-white/10" />
          <div className="mt-6 text-2xl font-bold font-mono text-white [text-shadow:0_4px_18px_rgba(0,0,0,0.72)]">
            <DecryptedText
              text={MISSION_COUNT}
              className="text-white"
              encryptedClassName="text-cyan-400 opacity-70"
              parentClassName="inline-block"
              {...decryptProps}
            />
          </div>
          <p className="mt-2 font-mono text-sm tracking-widest text-gray-400">{MISSION_LABEL}</p>
        </div>
      </div>
    </section>
  );
}
