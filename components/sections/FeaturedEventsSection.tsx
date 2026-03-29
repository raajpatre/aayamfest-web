import Link from "next/link";
import { FestLogo } from "@/components/ui/FestLogo";

const featuredEvents = [
  {
    title: "Robo Striker",
    description: "Build, battle, and outmaneuver rival machines inside a precision combat arena.",
    prize: "₹14,000+",
    accent: "from-cyan-300/25 via-transparent to-fuchsia-400/20",
    badge: "ROBOTICS // PRIME",
    theme: "cyan"
  },
  {
    title: "FPV Drone Racing",
    description: "Pilot at full throttle through gate runs, sharp turns, and high-speed aerial laps.",
    prize: "₹30,000",
    accent: "from-fuchsia-300/20 via-transparent to-cyan-300/25",
    badge: "AERIAL // LIVE",
    theme: "magenta"
  }
] as const;

function EventBlueprintCard({
  title,
  description,
  prize,
  accent,
  badge,
  theme
}: (typeof featuredEvents)[number]) {
  const glow =
    theme === "cyan"
      ? "shadow-[0_0_24px_rgba(34,211,238,0.14)]"
      : "shadow-[0_0_24px_rgba(217,70,239,0.14)]";

  return (
    <article className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-black/55 p-4 backdrop-blur-xl ${glow}`}>
      <div className="relative z-0 overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(34,211,238,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.14)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.08),transparent_16%),radial-gradient(circle_at_26%_78%,rgba(255,255,255,0.05),transparent_14%)]" />
        <div className="absolute left-[12%] top-[18%] h-20 w-20 rounded-full border border-white/80" />
        <div className="absolute right-[12%] top-[22%] h-10 w-10 border border-cyan-300/70 bg-cyan-300/10" />
        <div className="absolute left-[18%] top-[42%] h-[2px] w-[58%] bg-gradient-to-r from-cyan-300/0 via-cyan-300/80 to-cyan-300/0" />
        <div className="absolute right-[20%] top-[48%] h-[2px] w-[34%] bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400/80 to-fuchsia-400/0" />
        <div className="absolute bottom-[26%] left-[12%] h-14 w-14 border border-fuchsia-400/70 bg-fuchsia-400/10" />
        <div className="absolute bottom-[18%] right-[15%] h-16 w-16 rounded-full border border-white/70" />

        <div className="relative z-0 flex min-h-[420px] flex-col justify-between p-8">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.32em] text-white/58">
            <span>{badge}</span>
            <span>PACKET // READY</span>
          </div>

          <div>
            <h3 className="max-w-[10ch] font-mono text-4xl font-bold uppercase leading-[0.92] text-white sm:text-5xl">
              {title}
            </h3>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-sm leading-7 text-white/74">{description}</p>
            <div className="mt-6 font-mono text-3xl font-black text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]">
              {prize}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 opacity-20">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_4px)] mix-blend-screen" />
          <div className="absolute inset-0 animate-[sweep_4.5s_linear_infinite] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_18%,transparent_34%,transparent_60%,rgba(255,255,255,0.05)_72%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.14),transparent_18%,transparent_78%,rgba(217,70,239,0.14))] mix-blend-screen" />
          <div className="absolute inset-x-0 top-[33%] h-6 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />
          <div className="absolute inset-x-0 top-[62%] h-4 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
        </div>
      </div>
    </article>
  );
}

export function FeaturedEventsSection() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="flex justify-center">
            <FestLogo className="h-20 w-[300px] sm:h-24 sm:w-[360px]" />
          </div>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.34em] text-cyan-300/82">
            Featured Event Matrix
          </p>
          <h2 className="mx-auto mt-4 max-w-5xl text-4xl font-black uppercase tracking-[-0.04em] text-white [text-shadow:0_12px_36px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-7xl">
            NST&apos;S APEX TECH CONVERGENCE
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
            It&apos;s the ultimate nexus where code, hardware, and digital storytelling collide.
            AAYAM is where the brightest minds lock into the grid and build the future in real
            time.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {featuredEvents.map((event) => (
            <EventBlueprintCard key={event.title} {...event} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/events"
            className="rounded-xl border border-orange-400/30 bg-orange-600 px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_18px_rgba(234,88,12,0.18)] transition-all duration-300 hover:border-orange-300/70 hover:shadow-[0_0_30px_rgba(251,146,60,0.3)]"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
