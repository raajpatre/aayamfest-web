"use client";

import DecryptedText from "@/components/DecryptedText";
import ScrollFloat from "@/components/ScrollFloat";
import { TerminalBackground } from "@/components/sections/TerminalBackground";

type CatalogEvent = {
  name: string;
  prize: string;
  poster?: string;
  registrationLink?: string;
};

type CatalogCategory = {
  title: string;
  label: string;
  accent: string;
  events: CatalogEvent[];
};

const EVENT_CATALOG: CatalogCategory[] = [
  {
    title: "Robotics",
    label: "01 // ROBOTICS",
    accent: "text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]",
    events: [
      {
        name: "Robosoccer",
        prize: "₹60,000",
        poster: "/events/robosoccer.jpg",
        registrationLink:
          "https://unstop.com/competitions/robo-striker-aayam-newton-school-of-technology-bengaluru-karnataka-1661801"
      },
      {
        name: "RC Racing",
        prize: "₹50,000",
        poster: "/events/rc-racing.png"
      },
      {
        name: "FPV drone",
        prize: "₹70,000",
        poster: "/events/fpv-drone-race.png",
        registrationLink:
          "https://unstop.com/competitions/fpv-drone-racing-challenge-aayam-newton-school-of-technology-bengaluru-karnataka-1661904"
      },
      {
        name: "Line Maze solver",
        prize: "₹15,000",
        poster: "/events/line-maze-solver.jpeg",
        registrationLink:
          "https://unstop.com/competitions/robo-maze-solver-aayam-newton-school-of-technology-bengaluru-karnataka-1662290"
      },
      {
        name: "Robocar building workshop cum competition",
        prize: "₹10,000",
        poster: "/events/robocar-building-workshop.png",
        registrationLink:
          "https://unstop.com/workshops-webinars/the-fast-the-furry-aayam-newton-school-of-technology-bengaluru-karnataka-1661911"
      },
      { name: "CAD modelling", prize: "₹5,000" }
    ]
  },
  {
    title: "Hackathons",
    label: "02 // HACKATHONS",
    accent: "text-fuchsia-300 drop-shadow-[0_0_18px_rgba(217,70,239,0.45)]",
    events: [
      { name: "BugBash (24 hr Hackathon)", prize: "₹65,000" },
      {
        name: "CodeStorm (12 hr women only hackathon)",
        prize: "₹30,000",
        poster: "/events/codestorm-shebuilds.png",
        registrationLink:
          "https://unstop.com/hackathons/code-storm-aayam-newton-school-of-technology-bengaluru-karnataka-1661210"
      }
    ]
  },
  {
    title: "Competitive Programming",
    label: "03 // COMPETITIVE PROGRAMMING",
    accent: "text-cyan-200 drop-shadow-[0_0_18px_rgba(103,232,249,0.42)]",
    events: [
      { name: "Next Turing CP Individuals", prize: "₹10,000" },
      { name: "Next Turing blindfolded CP Individuals", prize: "₹20,000" }
    ]
  },
  {
    title: "Gaming",
    label: "04 // GAMING",
    accent: "text-fuchsia-200 drop-shadow-[0_0_18px_rgba(244,114,182,0.42)]",
    events: [
      { name: "BGMI", prize: "₹50,000" },
      { name: "Free Fire", prize: "₹10,000" }
    ]
  },
  {
    title: "Non-tech",
    label: "05 // NON-TECH",
    accent: "text-orange-300 drop-shadow-[0_0_18px_rgba(251,146,60,0.4)]",
    events: [{ name: "Scripted Timelines (Reel making and photography)", prize: "₹5,000" }]
  }
];

const CATEGORY_DECRYPT_PROPS = {
  animateOn: "view" as const,
  sequential: true,
  speed: 62,
  maxIterations: 20,
  characters: "X@#$01&*!"
};

const BODY_DECRYPT_PROPS = {
  animateOn: "view" as const,
  sequential: true,
  speed: 20,
  maxIterations: 10,
  characters: "X@#$01&*!"
};

export function TerminalCatalogPage() {
  return (
    <div className="relative isolate pb-12 pt-10 text-white sm:pt-14">
      <TerminalBackground />

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
        <div className="text-center sm:border-l-4 sm:border-cyan-300/70 sm:pl-6 sm:text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-300/80">
            Terminal // Event Catalog
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Scan
            <span className="ml-2 text-cyan-300 sm:ml-3">Mission</span>
            <span className="ml-2 bg-gradient-to-r from-fuchsia-200 via-fuchsia-300 to-fuchsia-500 bg-clip-text text-transparent sm:ml-3">
              Streams
            </span>
          </h1>
          <div className="mt-6 max-w-3xl">
            <DecryptedText
              text="The category streams are actively rendering. Scroll deeper to decrypt individual mission cards, analyze the prize drops, and override the terminal gate to secure your slot."
              className="font-mono text-sm leading-8 text-cyan-50/90 sm:text-[1.05rem]"
              encryptedClassName="font-mono text-cyan-300/75"
              parentClassName="block rounded-[22px] border border-cyan-300/15 bg-black/35 px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.28),inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm"
              {...BODY_DECRYPT_PROPS}
            />
          </div>
        </div>
      </section>

      {EVENT_CATALOG.map((category) => (
        <section
          key={category.title}
          className="relative py-16 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="block w-full border-b border-white/10 pb-5 text-center font-mono text-[1.35rem] font-black uppercase tracking-[0.22em] sm:text-left sm:text-[2.1rem] sm:tracking-[0.28em] md:text-[2.8rem]">
                <DecryptedText
                  text={category.label}
                  className={category.accent}
                  encryptedClassName="text-cyan-400/70"
                  parentClassName="inline-block"
                  {...CATEGORY_DECRYPT_PROPS}
                />
              </h2>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 justify-items-center gap-8 px-0 sm:mt-12 sm:gap-10 sm:px-4 md:grid-cols-2">
              {category.events.map((event) => (
                <ScrollFloat
                  key={event.name}
                  as="div"
                  containerClassName="w-full max-w-sm md:max-w-none"
                  scrollStart="top bottom-=8%"
                  scrollEnd="center center+=18%"
                  animationDuration={0.95}
                  ease="power3.out"
                  stagger={0}
                >
                  <article className="group relative mx-auto flex aspect-[3/4] w-full max-w-sm flex-col overflow-hidden rounded-[28px] border border-white/20 bg-black/60 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.32),inset_0_1px_0_0_rgba(255,255,255,0.08)] md:max-w-none">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.14),transparent_30%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/8 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cyan-300/8 via-fuchsia-400/6 to-transparent" />
                    <div className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-cyan-300/55" />
                    <div className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-cyan-300/55" />
                    <div className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-fuchsia-400/45" />
                    <div className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-fuchsia-400/45" />

                    <div className="relative flex flex-1 flex-col p-6">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cyan-200/55">
                          {event.poster ? "Poster uplink active" : "Poster uplink pending"}
                        </p>
                        <h3 className="mt-5 max-w-[16ch] font-mono text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
                          {event.name}
                        </h3>
                      </div>

                      <div className="relative mt-8 flex-1 overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]">
                        {event.poster ? (
                          <img
                            src={event.poster}
                            alt={`${event.name} poster`}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.18),transparent_42%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,transparent_82%,rgba(255,255,255,0.04))]" />
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_4px)] opacity-20 mix-blend-screen" />
                        {!event.poster ? (
                          <>
                            <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.12),transparent)] opacity-60 blur-xl" />
                            <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
                          </>
                        ) : null}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                          <span>Signal Feed</span>
                          <span>CRT://ACTIVE</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative border-t border-white/10 px-6 pb-0 pt-5">
                      <div className="pb-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/35">
                          Prize pool
                        </p>
                        <div className="mt-3 font-mono text-3xl font-bold text-orange-400 drop-shadow-[0_0_18px_rgba(251,146,60,0.38)] sm:text-4xl">
                          {event.prize}
                        </div>
                      </div>

                      <a
                        href={event.registrationLink ?? "#"}
                        target={event.registrationLink ? "_blank" : undefined}
                        rel={event.registrationLink ? "noopener noreferrer" : undefined}
                        className="flex w-[calc(100%+3rem)] -translate-x-6 items-center justify-center border-t border-white/20 bg-transparent px-5 py-4 font-mono text-xs font-bold uppercase tracking-[0.24em] text-white/72 transition-all duration-300 hover:bg-white/10 hover:text-cyan-200"
                      >
                        [ REGISTER_VIA_TERMINAL ]
                      </a>
                    </div>
                  </article>
                </ScrollFloat>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
