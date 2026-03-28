import Link from "next/link";

const terminalReadouts = ["> SYS.SCAN: EVENTS[3]", "> SIGNAL_LOCK_ON", "> ENCRYPT_V3_ACTIVE"] as const;

const events = [
  {
    title: "Robo Striker",
    description: "Build, battle, and outmaneuver rival machines inside a precision combat arena.",
    prize: "₹14,000+",
    accent: "from-cyan-300 via-white to-fuchsia-400",
    ring: "border-cyan-300/45 shadow-[0_0_24px_rgba(34,211,238,0.2)]",
    icon: (
      <svg viewBox="0 0 120 120" className="h-24 w-24" fill="none" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="url(#robo-bg)" opacity="0.16" />
        <rect x="34" y="34" width="52" height="42" rx="12" stroke="#EAFBFF" strokeWidth="5" />
        <path d="M48 28L54 16M72 28L78 16" stroke="#67E8F9" strokeWidth="5" strokeLinecap="round" />
        <circle cx="50" cy="52" r="5" fill="#67E8F9" />
        <circle cx="70" cy="52" r="5" fill="#F472B6" />
        <path d="M46 66H74" stroke="#EAFBFF" strokeWidth="5" strokeLinecap="round" />
        <path d="M28 52H34M86 52H92M44 78L38 96M76 78L82 96" stroke="#C4B5FD" strokeWidth="5" strokeLinecap="round" />
        <defs>
          <linearGradient id="robo-bg" x1="10" x2="110" y1="10" y2="110">
            <stop stopColor="#22D3EE" />
            <stop offset="1" stopColor="#F472B6" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: "FPV Drone Racing",
    description: "Pilot at full throttle through gate runs, sharp turns, and high-speed aerial laps.",
    prize: "₹30,000",
    accent: "from-fuchsia-300 via-white to-cyan-300",
    ring: "border-fuchsia-300/45 shadow-[0_0_24px_rgba(244,114,182,0.2)]",
    icon: (
      <svg viewBox="0 0 120 120" className="h-24 w-24" fill="none" aria-hidden="true">
        <circle cx="26" cy="44" r="14" stroke="#67E8F9" strokeWidth="5" />
        <circle cx="94" cy="44" r="14" stroke="#F472B6" strokeWidth="5" />
        <circle cx="34" cy="84" r="14" stroke="#C4B5FD" strokeWidth="5" />
        <circle cx="86" cy="84" r="14" stroke="#67E8F9" strokeWidth="5" />
        <rect x="42" y="48" width="36" height="24" rx="8" stroke="#EAFBFF" strokeWidth="5" />
        <path d="M40 52L26 44M80 52L94 44M44 72L34 84M76 72L86 84" stroke="#EAFBFF" strokeWidth="5" strokeLinecap="round" />
        <path d="M50 60H70" stroke="#EAFBFF" strokeWidth="5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Free Fire MAX",
    description: "Drop with your squad, control the zone, and survive the final blazing showdown.",
    prize: "₹5,000+",
    accent: "from-orange-300 via-white to-fuchsia-300",
    ring: "border-orange-300/45 shadow-[0_0_24px_rgba(251,146,60,0.22)]",
    icon: (
      <svg viewBox="0 0 120 120" className="h-24 w-24" fill="none" aria-hidden="true">
        <path d="M60 18L76 30L72 52H48L44 30L60 18Z" stroke="#EAFBFF" strokeWidth="5" strokeLinejoin="round" />
        <path d="M44 56L34 96M76 56L86 96" stroke="#67E8F9" strokeWidth="5" strokeLinecap="round" />
        <path d="M36 64L24 82M84 64L96 82" stroke="#F472B6" strokeWidth="5" strokeLinecap="round" />
        <path d="M48 74H72" stroke="#EAFBFF" strokeWidth="5" strokeLinecap="round" />
        <circle cx="52" cy="38" r="4" fill="#67E8F9" />
        <circle cx="68" cy="38" r="4" fill="#F472B6" />
      </svg>
    )
  }
] as const;

export function FeaturedEventsSection() {
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {terminalReadouts.map((line, index) => (
          <div
            key={line}
            className="absolute font-mono text-[11px] uppercase tracking-[0.28em] text-white/22"
            style={{
              top: `${12 + index * 9}%`,
              left: index % 2 === 0 ? "8%" : "unset",
              right: index % 2 === 1 ? "10%" : "unset"
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-mono text-2xl font-bold uppercase tracking-[0.24em] text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            Featured Events
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.title}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-7 backdrop-blur-md shadow-[0_24px_54px_rgba(0,0,0,0.28),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
            >
              <div className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-cyan-300/55" />
              <div className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-cyan-300/55" />
              <div className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-fuchsia-400/45" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-fuchsia-400/45" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className={`mx-auto flex h-32 w-32 items-center justify-center rounded-full border bg-black/45 backdrop-blur-sm ${event.ring}`}>
                {event.icon}
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-mono text-lg font-bold text-white">{event.title}</h3>
                <p className="mt-3 font-mono text-sm leading-7 text-white/70">{event.description}</p>
                <div className={`mt-6 bg-gradient-to-r ${event.accent} bg-clip-text text-3xl font-black text-transparent drop-shadow-[0_0_22px_rgba(34,211,238,0.22)]`}>
                  {event.prize}
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/events"
                  className="rounded-xl border border-orange-400/30 bg-orange-600 px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_18px_rgba(234,88,12,0.18)] transition-all duration-300 hover:border-orange-300/70 hover:shadow-[0_0_30px_rgba(251,146,60,0.3)]"
                >
                  Register
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
