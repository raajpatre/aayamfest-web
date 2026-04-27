"use client";

import { useState } from "react";
import Image from "next/image";
import CardSwap, { Card } from "@/components/CardSwap";
import DecryptedText from "@/components/DecryptedText";

const sponsorReasons = [
  {
    profileType: "ATTENDEE_BASE",
    decryptStatus: "OK",
    logTimestamp: "2026.03.29",
    title: "3000+ Attendees",
    description: "DIRECT ACCESS TO DEVELOPERS, ENGINEERS, AND TECH-SAVVY STUDENTS"
  },
  {
    profileType: "BRAND_REACH",
    decryptStatus: "OK",
    logTimestamp: "2026.03.29",
    title: "BRAND VISIBILITY",
    description: "LOGO PLACEMENT ACROSS WEBSITE, VENUE, SWAG, AND ALL DIGITAL COMMUNICATIONS"
  },
  {
    profileType: "TALENT_PIPELINE",
    decryptStatus: "OK",
    logTimestamp: "2026.03.29",
    title: "TALENT PIPELINE",
    description: "CONNECT WITH TOP ENGINEERING TALENT FOR INTERNSHIPS AND HIRING"
  },
  {
    profileType: "INNOVATION_PRESENCE",
    decryptStatus: "OK",
    logTimestamp: "2026.03.29",
    title: "INNOVATION PRESENCE",
    description: "ASSOCIATE YOUR BRAND WITH CUTTING-EDGE TECH AND STUDENT INNOVATION"
  }
] as const;

function LogoBadge({ tint = "cyan" }: { tint?: "cyan" | "orange" }) {
  return (
    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-black/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      <div
        className={`absolute inset-3 rounded-full ${
          tint === "cyan"
            ? "bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.18)]"
            : "bg-orange-400/10 shadow-[0_0_40px_rgba(251,146,60,0.18)]"
        }`}
      />
      <div className="relative z-10 h-16 w-16 drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
        <Image
          src="/aayam-mark.png"
          alt="AAYAM logo mark"
          fill
          className="object-contain"
          sizes="64px"
        />
      </div>
    </div>
  );
}

function BenefitBadge({ title }: { title: string }) {
  const tint = title === "3000+ ATTENDEES" ? "orange" : "cyan";

  return (
    <>
      <div
        className={`flex min-h-28 w-full items-center rounded-2xl border px-4 py-4 font-mono text-lg font-extrabold uppercase leading-tight tracking-[0.14em] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] sm:hidden ${
          tint === "orange"
            ? "border-orange-300/20 bg-orange-400/10 text-orange-200"
            : "border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
        }`}
      >
        {title}
      </div>
      <div className="hidden sm:block">
        <LogoBadge tint={tint} />
      </div>
    </>
  );
}

function chunkDescription(text: string) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 24) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

export function SponsorWhySection() {
  const [swapTick, setSwapTick] = useState(0);

  return (
    <section className="mx-auto max-w-7xl py-16 sm:py-24">
      <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2">
        <div className="lg:pt-8">
          <DecryptedText
            text="WHY SPONSOR AAYAM?"
            animateOn="view"
            sequential
            speed={40}
            className="text-4xl font-bold font-mono tracking-tight text-white sm:text-5xl md:text-7xl"
            encryptedClassName="text-cyan-300/70"
            parentClassName="block"
          />
          <p className="mt-4 font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-gray-400 sm:mt-6 sm:text-sm sm:tracking-[0.28em]">
            REACH 3000+ DEVELOPERS, ENGINEERS, AND STUDENTS AT NEWTON SCHOOL OF TECHNOLOGY
          </p>
          <button
            type="button"
            onClick={() => setSwapTick((current) => current + 1)}
            className="mt-6 rounded-xl border border-cyan-400/30 bg-black/65 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.16),inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-cyan-300/55 hover:bg-black/80 hover:text-white sm:mt-8 sm:px-6 sm:text-sm sm:tracking-[0.22em]"
          >
            [ INITIALIZE_SWAP ]
          </button>
        </div>

        <div className="relative flex min-h-[320px] flex-col items-center justify-start gap-6 sm:min-h-[560px] sm:gap-8">
          <div className="card-swap-sponsor-shell relative mt-8 h-[260px] w-full max-w-[320px] sm:mt-0 sm:h-[450px] sm:max-w-[520px]">
            <CardSwap
              width={520}
              height={450}
              cardDistance={22}
              verticalDistance={26}
              delay={2800}
              pauseOnHover
              externalTriggerKey={swapTick}
              skewAmount={2}
              easing="soft"
            >
              {sponsorReasons.map((item, index) => (
                <Card
                  key={item.title}
                  customClass="!absolute !h-full !w-full !rounded-2xl !border !border-cyan-500/20 !bg-black/70 !backdrop-blur-md"
                  className="overflow-hidden p-10 shadow-[0_0_25px_rgba(34,211,238,0.2),0_24px_60px_rgba(0,0,0,0.32),inset_0_1px_0_0_rgba(255,255,255,0.06)] group"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                  <div className="pointer-events-none absolute left-5 top-5 h-6 w-6 border-l border-t border-cyan-300/60" />
                  <div className="pointer-events-none absolute right-5 top-5 h-6 w-6 border-r border-t border-cyan-300/60" />
                  <div className="pointer-events-none absolute bottom-5 left-5 h-6 w-6 border-b border-l border-fuchsia-400/45" />
                  <div className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b border-r border-fuchsia-400/45" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.08),transparent_32%)]" />
                  <div className="pointer-events-none absolute inset-0 opacity-15 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_4px)] mix-blend-screen" />

                  <div className="relative z-10 grid h-full grid-cols-1 gap-6 sm:grid-cols-[160px_1fr] sm:gap-8">
                    <div className="flex flex-col items-start justify-between">
                      <BenefitBadge title={item.title} />
                      <div className="space-y-3 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/60">
                        <p>&gt;DECRYPT_STATUS: {item.decryptStatus}</p>
                        <p>&gt;PROFILE_TYPE: {item.profileType}</p>
                        <p className="text-fuchsia-300/60">&gt;LOG_TIMESTAMP: {item.logTimestamp}</p>
                      </div>
                    </div>

                    <div className="flex h-full flex-col items-start justify-between">
                      <div>
                        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.32em] text-white/45">
                          {index === 0
                            ? "MEMORY CHIP // ATTENDEE MAP"
                            : index === 1
                              ? "MEMORY CHIP // SIGNAL REACH"
                              : index === 2
                                ? "MEMORY CHIP // TALENT PIPE"
                                : "MEMORY CHIP // INNOVATION"}
                        </div>
                        <h3 className="mb-6 hidden font-mono text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] sm:block">
                          {item.title}
                        </h3>
                        <div className="space-y-2">
                          {chunkDescription(item.description).map((line) => (
                            <p key={line} className="font-mono text-base font-medium leading-relaxed text-gray-300">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="grid w-full grid-cols-2 gap-4">
                        <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300/65">
                            Sync Layer
                          </p>
                          <p className="mt-2 font-mono text-sm text-white/80">
                            {index === 0
                              ? "DIRECT CAMPUS REACH"
                              : index === 1
                                ? "MULTI-CHANNEL UPLINK"
                                : index === 2
                                  ? "HIRING VECTOR LIVE"
                                  : "CATEGORY SIGNAL LOCK"}
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fuchsia-300/65">
                            Status
                          </p>
                          <p className="mt-2 font-mono text-sm text-white/80">CHANNEL OPEN</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
