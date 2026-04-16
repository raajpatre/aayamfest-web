"use client";

import { type CSSProperties, useEffect, useState } from "react";
import DecryptedText from "@/components/DecryptedText";
import ScrollFloat from "@/components/ScrollFloat";
import { TerminalBackground } from "@/components/sections/TerminalBackground";

type CatalogEvent = {
  name: string;
  prize: string;
  date?: string;
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
        date: "25 Apr 2026",
        poster: "/events/robosoccer.jpg",
        registrationLink:
          "https://unstop.com/competitions/robo-striker-aayam-newton-school-of-technology-bengaluru-karnataka-1661801"
      },
      {
        name: "RC Racing",
        prize: "₹50,000",
        date: "25 Apr 2026",
        poster: "/events/rc-racing.png",
        registrationLink:
          "https://unstop.com/competitions/rc-racing-aayam-newton-school-of-technology-bengaluru-karnataka-1667510"
      },
      {
        name: "FPV drone",
        prize: "₹70,000",
        date: "25 Apr 2026 | 10 AM to 9 PM",
        poster: "/events/fpv-drone-race.png",
        registrationLink:
          "https://unstop.com/competitions/fpv-drone-racing-challenge-aayam-newton-school-of-technology-bengaluru-karnataka-1661904"
      },
      {
        name: "Line Maze solver",
        prize: "₹15,000",
        date: "25 Apr 2026",
        poster: "/events/line-maze-solver.jpeg",
        registrationLink:
          "https://unstop.com/competitions/robo-maze-solver-aayam-newton-school-of-technology-bengaluru-karnataka-1662290"
      },
      {
        name: "Robocar building workshop cum competition",
        prize: "₹10,000",
        date: "Workshop: 22 Apr 2026 | Main event: 24-25 Apr 2026",
        poster: "/events/robocar-building-workshop.png",
        registrationLink:
          "https://unstop.com/workshops-webinars/the-fast-the-furry-aayam-newton-school-of-technology-bengaluru-karnataka-1661911"
      },
      {
        name: "CAD modelling",
        prize: "₹5,000",
        poster: "/events/cad-modeling.png",
        registrationLink:
          "https://unstop.com/competitions/cad-design-aayam-newton-school-of-technology-bengaluru-karnataka-1662293"
      }
    ]
  },
  {
    title: "Hackathons",
    label: "02 // HACKATHONS",
    accent: "text-fuchsia-300 drop-shadow-[0_0_18px_rgba(217,70,239,0.45)]",
    events: [
      {
        name: "BugBash (24 hr Hackathon)",
        prize: "₹65,000",
        date: "24 Apr 2026",
        poster: "/events/bugbash.jpeg",
        registrationLink:
          "https://unstop.com/hackathons/bugbash-aayam-newton-school-of-technology-bengaluru-karnataka-1658793"
      },
      {
        name: "She builds (12 hr hackathon)",
        prize: "₹30,000",
        date: "24 Apr 2026",
        poster: "/events/codestorm-shebuilds.png",
        registrationLink:
          "https://unstop.com/hackathons/shebuilds-aayam-newton-school-of-technology-bengaluru-karnataka-1667183"
      }
    ]
  },
  {
    title: "Competitive Programming",
    label: "03 // COMPETITIVE PROGRAMMING",
    accent: "text-cyan-200 drop-shadow-[0_0_18px_rgba(103,232,249,0.42)]",
    events: [
      {
        name: "Next Turing CP Individuals",
        prize: "₹23,000",
        date: "Qualifiers: 15 Apr 2026 | Finals: 24 Apr 2026",
        poster: "/events/next-turing-cp-individuals.jpeg",
        registrationLink:
          "https://unstop.com/hackathons/nextturing-aayam-newton-school-of-technology-bengaluru-karnataka-1661493"
      },
      {
        name: "Next Turing blindfolded CP Individuals",
        prize: "₹7,000",
        date: "Qualifiers: 15 Apr 2026 | Finals: 24 Apr 2026",
        poster: "/events/next-turing-blindfolded-cp-individuals.png",
        registrationLink:
          "https://unstop.com/hackathons/nextturing-blindfolded-aayam-newton-school-of-technology-bengaluru-karnataka-1667199"
      }
    ]
  },
  {
    title: "Gaming",
    label: "04 // GAMING",
    accent: "text-fuchsia-200 drop-shadow-[0_0_18px_rgba(244,114,182,0.42)]",
    events: [
      {
        name: "BGMI",
        prize: "₹50,000",
        date: "24 Apr 2026",
        poster: "/events/bgmi.png",
        registrationLink:
          "https://unstop.com/events/bgmi-esports-tournament-aayam-newton-school-of-technology-bengaluru-karnataka-1662088"
      },
      {
        name: "Free Fire",
        prize: "₹15,000 + Goodies",
        date: "25 Apr 2026",
        poster: "/events/free-fire.jpeg",
        registrationLink:
          "https://unstop.com/events/free-fire-max-esports-tournament-aayam-newton-school-of-technology-bengaluru-karnataka-1661948"
      }
    ]
  },
  {
    title: "Non-tech",
    label: "05 // NON-TECH",
    accent: "text-orange-300 drop-shadow-[0_0_18px_rgba(251,146,60,0.4)]",
    events: [
      {
        name: "Scripted Timelines (Reel making and photography)",
        prize: "₹5,000",
        date: "24 Apr 2026",
        poster: "/events/scripted-timelines.jpg",
        registrationLink:
          "https://unstop.com/events/chronocapture-aayam-newton-school-of-technology-bengaluru-karnataka-1661017"
      }
    ]
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

const PIXEL_CELL_STYLES = Array.from({ length: 96 }, (_, index) => {
  const delay = (index * 17) % 220;
  const duration = 180 + (index % 5) * 24;
  const colors = [
    "rgba(2, 6, 23, 0.96)",
    "rgba(7, 18, 35, 0.92)",
    "rgba(18, 24, 38, 0.88)",
    "rgba(34, 211, 238, 0.14)",
    "rgba(217, 70, 239, 0.12)"
  ] as const;

  return {
    background: colors[index % colors.length],
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`
  } satisfies CSSProperties;
});

function EventPosterCard({ event }: { event: CatalogEvent }) {
  const isInteractive = Boolean(event.registrationLink);
  const [touchRevealActive, setTouchRevealActive] = useState(false);
  const sharedClassName =
    "group relative block aspect-[10/16] w-full overflow-hidden rounded-[30px] border border-white/14 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.04),0_0_36px_rgba(34,211,238,0.08)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(0,0,0,0.52),0_0_0_1px_rgba(255,255,255,0.08),0_0_44px_rgba(217,70,239,0.14)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:shadow-[0_28px_90px_rgba(0,0,0,0.52),0_0_0_1px_rgba(255,255,255,0.08),0_0_44px_rgba(217,70,239,0.14)]";

  useEffect(() => {
    if (!touchRevealActive) {
      return;
    }

    const handlePointerDown = (eventTarget: PointerEvent) => {
      const target = eventTarget.target;
      if (target instanceof Element && target.closest(`[data-event-card="${event.name}"]`)) {
        return;
      }
      setTouchRevealActive(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [event.name, touchRevealActive]);

  const cardContent = (
    <>
      {event.poster ? (
        <img
          src={event.poster}
          alt={`${event.name} poster`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.18),transparent_32%),linear-gradient(160deg,rgba(5,10,18,0.96),rgba(14,22,36,0.94))]" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),transparent_22%,transparent_65%,rgba(0,0,0,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.18),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)] opacity-15 mix-blend-screen" />
      <div className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-cyan-300/65" />
      <div className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-cyan-300/65" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-fuchsia-400/55" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-fuchsia-400/55" />

      <div className="pointer-events-none absolute inset-0 z-10 grid grid-cols-8 grid-rows-12 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[touch-reveal=true]:opacity-100">
        {PIXEL_CELL_STYLES.map((style, index) => (
          <span
            key={`${event.name}-${index}`}
            style={style}
            className="scale-0 opacity-0 transition-all ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 group-data-[touch-reveal=true]:scale-100 group-data-[touch-reveal=true]:opacity-100"
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[15] overflow-hidden opacity-0 transition-opacity duration-200 delay-75 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[touch-reveal=true]:opacity-100">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,4,12,0.18)_0%,rgba(1,6,18,0.62)_40%,rgba(1,4,12,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.07),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.1),transparent_34%)]" />
        <div className="absolute inset-0 opacity-45 mix-blend-screen [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_3px)]" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.9)_0_1px,transparent_1.5px),radial-gradient(circle_at_72%_52%,rgba(255,255,255,0.6)_0_1px,transparent_1.5px),radial-gradient(circle_at_44%_78%,rgba(255,255,255,0.7)_0_1px,transparent_1.5px),radial-gradient(circle_at_86%_18%,rgba(255,255,255,0.5)_0_1px,transparent_1.5px)]" />
        <div className="absolute inset-y-0 left-[-20%] w-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] opacity-0 blur-sm transition-all duration-500 group-hover:left-[100%] group-hover:opacity-35 group-focus-visible:left-[100%] group-focus-visible:opacity-35 group-data-[touch-reveal=true]:left-[100%] group-data-[touch-reveal=true]:opacity-35" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_10px,rgba(34,211,238,0.1)_10px,rgba(34,211,238,0.1)_11px,transparent_11px,transparent_24px)] opacity-35" />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-end bg-[linear-gradient(180deg,rgba(2,6,23,0.05)_0%,rgba(2,6,23,0.42)_36%,rgba(2,6,23,0.98)_100%)] px-5 pb-5 pt-10 opacity-0 transition-all duration-300 delay-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[touch-reveal=true]:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.14),transparent_34%)] opacity-75" />
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-300/84">
            [ MISSION_POSTER // ACTIVE ]
          </p>
          <h3 className="mt-3 max-w-[14ch] font-mono text-2xl font-black uppercase leading-tight text-white sm:text-[2rem]">
            {event.name}
          </h3>
          {event.date ? (
            <div className="mt-4 rounded-2xl border border-cyan-200/14 bg-black/35 px-3 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-100/42">
                Event Date
              </p>
              <p className="mt-2 font-mono text-xs uppercase leading-5 tracking-[0.18em] text-cyan-50/90">
                {event.date}
              </p>
            </div>
          ) : null}
          <div className="mt-4 flex items-end justify-between gap-4 border-t border-cyan-200/14 pt-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-100/42">
                Prize Pool
              </p>
              <p className="mt-2 font-mono text-3xl font-bold text-orange-300 drop-shadow-[0_0_16px_rgba(253,186,116,0.35)]">
                {event.prize}
              </p>
            </div>
            <p className="max-w-[12ch] text-right font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-100/78">
              {isInteractive ? "[ OPEN_LINK ]" : "[ LINK_PENDING ]"}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  if (!isInteractive) {
    return (
      <article
        className={sharedClassName}
        aria-label={`${event.name} poster card`}
        data-event-card={event.name}
        data-touch-reveal={touchRevealActive}
        onClick={() => setTouchRevealActive((current) => !current)}
      >
        {cardContent}
      </article>
    );
  }

  return (
    <a
      href={event.registrationLink}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClassName}
      aria-label={`Open registration for ${event.name}`}
      data-event-card={event.name}
      data-touch-reveal={touchRevealActive}
      onClick={(eventClick) => {
        if (eventClick.detail !== 0) {
          const coarsePointer =
            typeof window !== "undefined" &&
            window.matchMedia("(hover: none), (pointer: coarse)").matches;

          if (coarsePointer && !touchRevealActive) {
            eventClick.preventDefault();
            setTouchRevealActive(true);
            return;
          }
        }

        setTouchRevealActive(false);
      }}
    >
      {cardContent}
    </a>
  );
}

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
                  <EventPosterCard event={event} />
                </ScrollFloat>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
