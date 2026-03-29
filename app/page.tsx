"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedAboutStatsSection } from "@/components/sections/AnimatedAboutStatsSection";
import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { InitializeRegistrationCTA } from "@/components/sections/InitializeRegistrationCTA";
import { SponsorsPreviewSection } from "@/components/sections/SponsorsPreviewSection";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import Hyperspeed from "@/components/ui/Hyperspeed";
import { hyperspeedPresets } from "@/components/ui/HyperspeedPresets";
import { WarpSpeedIntro } from "@/components/ui/WarpSpeedIntro";

const glassCardClass =
  "border border-white/5 bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-lg shadow-[0_12px_40px_rgba(0,0,0,0.28),inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:border-fuchsia-500/50 hover:shadow-[0_18px_55px_rgba(0,0,0,0.38),0_0_24px_rgba(217,70,239,0.16),inset_0_1px_0_0_rgba(255,255,255,0.1)]";

const galaxyBackdropStyle = {
  backgroundColor: "#020308",
  backgroundImage: `
    radial-gradient(circle at 52% 50%, rgba(108, 68, 224, 0.34) 0%, rgba(108, 68, 224, 0.12) 16%, rgba(3, 7, 18, 0) 34%),
    radial-gradient(circle at 57% 46%, rgba(34, 211, 238, 0.18) 0%, rgba(34, 211, 238, 0.06) 12%, rgba(0, 0, 0, 0) 28%),
    radial-gradient(circle at 46% 60%, rgba(217, 70, 239, 0.2) 0%, rgba(217, 70, 239, 0.08) 14%, rgba(0, 0, 0, 0) 30%),
    radial-gradient(circle at 24% 24%, rgba(59, 130, 246, 0.14) 0%, rgba(59, 130, 246, 0.04) 10%, rgba(0, 0, 0, 0) 22%),
    radial-gradient(circle at 78% 18%, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.02) 8%, rgba(0, 0, 0, 0) 18%),
    linear-gradient(180deg, rgba(1, 4, 12, 0.7) 0%, rgba(1, 6, 16, 0.2) 42%, rgba(2, 4, 10, 0.75) 100%),
    radial-gradient(circle, rgba(255,255,255,0.9) 0.75px, transparent 1.2px),
    radial-gradient(circle, rgba(120,180,255,0.55) 0.6px, transparent 1.1px),
    radial-gradient(circle, rgba(255,255,255,0.65) 0.9px, transparent 1.4px)
  `,
  backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 180px 180px, 260px 260px, 340px 340px",
  backgroundPosition: "center center, center center, center center, center center, center center, center center, 0 0, 40px 60px, 120px 30px"
} as const;

const hyperspeedEffect = {
  ...hyperspeedPresets.six,
  length: 520,
  roadWidth: 22,
  lanesPerRoad: 4,
  speedUp: 4.4,
  fov: 96,
  fovSpeedUp: 168,
  totalSideLightSticks: 90,
  lightPairsPerRoadWay: 82,
  movingAwaySpeed: [84, 128],
  movingCloserSpeed: [-220, -320],
  carLightsLength: [520 * 0.08, 520 * 0.24],
  carLightsRadius: [0.05, 0.18],
  lightStickWidth: [0.18, 0.72],
  lightStickHeight: [1.8, 2.6],
  colors: {
    ...hyperspeedPresets.six.colors,
    leftCars: [0xff4fd8, 0xd653ff, 0xa855f7],
    rightCars: [0x64f5ff, 0x3b82f6, 0x6ee7ff],
    sticks: [0x64f5ff, 0xff6cf3, 0xc4b5fd]
  }
} as const;

const borderStreaks = [
  "left-[3%] top-[64%] h-[44vh] w-[2px] -rotate-[62deg] from-transparent via-cyan-300/85 to-transparent",
  "left-[10%] top-[58%] h-[34vh] w-[2px] -rotate-[61deg] from-transparent via-fuchsia-400/70 to-transparent",
  "right-[5%] top-[60%] h-[46vh] w-[2px] rotate-[65deg] from-transparent via-cyan-300/90 to-transparent",
  "right-[12%] top-[54%] h-[30vh] w-[2px] rotate-[66deg] from-transparent via-blue-400/65 to-transparent",
  "left-[2%] top-[20%] h-[24vh] w-[1px] -rotate-[72deg] from-transparent via-white/40 to-transparent",
  "right-[3%] top-[18%] h-[22vh] w-[1px] rotate-[74deg] from-transparent via-cyan-200/35 to-transparent"
] as const;

const INTRO_STORAGE_KEY = "aayam-intro-complete";

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
    setIntroComplete(hasSeenIntro);
    setIntroReady(true);
  }, []);

  const handleIntroComplete = () => {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    setIntroComplete(true);
  };

  return (
    <main className="relative min-h-screen">
      {introReady && !introComplete ? <WarpSpeedIntro onComplete={handleIntroComplete} /> : null}
      <div
        className={`transition-opacity duration-500 ${
          introReady && introComplete ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="fixed inset-0 -z-30 h-full w-full bg-black" />
        <div className="fixed inset-0 -z-20 h-full w-full bg-cover bg-center" style={galaxyBackdropStyle}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_50%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.35))]" />
        </div>
        <div className="fixed inset-0 -z-10 h-full w-full">
          <Hyperspeed effectOptions={hyperspeedEffect} />
        </div>
        <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
          {borderStreaks.map((streak) => (
            <div
              key={streak}
              className={`absolute bg-gradient-to-b blur-[1px] opacity-90 mix-blend-screen ${streak}`}
            />
          ))}
          <div className="absolute left-0 top-0 h-full w-32 bg-[radial-gradient(circle_at_left_center,rgba(34,211,238,0.12),transparent_62%)]" />
          <div className="absolute right-0 top-0 h-full w-32 bg-[radial-gradient(circle_at_right_center,rgba(217,70,239,0.12),transparent_62%)]" />
        </div>

        <div className="relative z-10 py-20 text-white">
        <section className="flex min-h-[calc(100vh-11rem)] items-start px-4 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 translate-y-8 scale-[1.03] opacity-35 blur-2xl">
                <div className="relative h-36 w-[400px] sm:h-44 sm:w-[560px] lg:h-64 lg:w-[860px]">
                  <Image
                    src="/aayam-logo.png"
                    alt="AAYAM Tech Fest official logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 400px, (max-width: 1024px) 560px, 860px"
                  />
                </div>
              </div>
              <div className="relative h-36 w-[400px] sm:h-44 sm:w-[560px] lg:h-64 lg:w-[860px]">
                <Image
                  src="/aayam-logo.png"
                  alt="AAYAM Tech Fest official logo"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 400px, (max-width: 1024px) 560px, 860px"
                />
              </div>
            </div>

            <div className="mt-10 w-full">
              <div className="mx-auto mb-8 max-w-3xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-300/80">
                Countdown Sequence
              </p>
              <h2 className="mt-4 text-2xl font-bold uppercase tracking-[0.08em] text-white [text-shadow:0_4px_18px_rgba(0,0,0,0.85)] sm:text-3xl">
                First signal on your descent into AAYAM
              </h2>
              </div>
              <CountdownTimer targetDate="2026-04-24T00:00:00" />
            </div>
          </div>
        </section>

        <section className="mt-4 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl lg:col-span-2">
            <AnimatedAboutStatsSection />
          </div>
        </section>

        <SponsorsPreviewSection />
        <InitializeRegistrationCTA />

        <HomeTerminalFooter />
        </div>
      </div>
    </main>
  );
}
