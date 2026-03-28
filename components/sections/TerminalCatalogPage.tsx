"use client";

import ScrollFloat from "@/components/ScrollFloat";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

const EVENT_CATALOG = [
  {
    title: "Robotics",
    label: "01 // ROBOTICS",
    accent: "text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]",
    events: [
      { name: "Robosoccer", prize: "₹60,000" },
      { name: "RC Racing", prize: "₹50,000" },
      { name: "FPV drone", prize: "₹70,000" },
      { name: "Line Maze solver", prize: "₹15,000" },
      { name: "Robocar building workshop cum competition", prize: "₹10,000" },
      { name: "CAD modelling", prize: "₹5,000" }
    ]
  },
  {
    title: "Hackathons",
    label: "02 // HACKATHONS",
    accent: "text-fuchsia-300 drop-shadow-[0_0_18px_rgba(217,70,239,0.45)]",
    events: [
      { name: "BugBash (24 hr Hackathon)", prize: "₹65,000" },
      { name: "CodeStorm (12 hr women only hackathon)", prize: "₹30,000" }
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
] as const;

export function TerminalCatalogPage() {
  return (
    <div className="pb-12 pt-14 text-white">
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="border-l-4 border-cyan-300/70 pl-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-300/80">
            Terminal // Event Catalog
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Scroll Through
            <span className="ml-3 bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
              Mission Streams
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
            Each category unfolds as a live terminal stream. Scroll deeper to pin, stack, and
            inspect every mission module in sequence before locking into registration.
          </p>
        </div>
      </section>

      {EVENT_CATALOG.map((category) => (
        <section
          key={category.title}
          className="relative min-h-screen py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <ScrollFloat
                containerClassName="terminal-category-float"
                textClassName={`font-mono uppercase ${category.accent}`}
                scrollStart="top bottom-=10%"
                scrollEnd="bottom center+=10%"
                stagger={0.018}
                animationDuration={1.15}
              >
                {category.label}
              </ScrollFloat>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            </div>

            <ScrollStack
              useWindowScroll
              className="terminal-scroll-stack !h-auto !overflow-visible"
              itemDistance={90}
              itemScale={0.04}
              itemStackDistance={26}
              stackPosition="18%"
              scaleEndPosition="12%"
              baseScale={0.9}
              rotationAmount={-0.6}
              blurAmount={0}
            >
              {category.events.map((event) => (
                <ScrollStackItem
                  key={event.name}
                  itemClassName="terminal-scroll-card !mx-auto !h-auto !w-full !max-w-md !bg-transparent !p-0 !shadow-none"
                >
                  <article className="relative mx-auto flex aspect-[3/4] w-full max-w-md flex-col justify-between overflow-hidden rounded-[28px] border border-white/20 bg-black/60 p-6 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.32),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/8 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cyan-300/8 via-fuchsia-400/6 to-transparent" />
                    <div className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-cyan-300/55" />
                    <div className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-cyan-300/55" />
                    <div className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-fuchsia-400/45" />
                    <div className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-fuchsia-400/45" />

                    <div className="relative">
                      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/35">
                        Poster uplink pending
                      </p>
                      <h3 className="mt-5 max-w-[16ch] font-mono text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
                        {event.name}
                      </h3>
                    </div>

                    <div className="relative space-y-4">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                      <div className="font-mono text-3xl font-bold text-orange-400 drop-shadow-[0_0_18px_rgba(251,146,60,0.32)] sm:text-4xl">
                        {event.prize}
                      </div>
                      <button
                        type="button"
                        className="w-full rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-white/70 transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-200"
                      >
                        [ REGISTER_VIA_TERMINAL ]
                      </button>
                    </div>
                  </article>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </section>
      ))}
    </div>
  );
}
