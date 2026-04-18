import type { Metadata } from "next";
import Galaxy from "@/components/Galaxy";
import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { ActionButton } from "@/components/ui/ActionButton";

export const metadata: Metadata = {
  title: "Campus Ambassador Program",
  description:
    "Become the face of Aayam 2026 on your campus. Drive registrations, unlock rewards, and represent NST's national tech fest.",
};

const responsibilities = [
  "Promote AAYAM events across your college networks.",
  "Drive registrations for competitions, showcases, and live experiences.",
  "Act as the official bridge between AAYAM and your campus community."
];

const perks = [
  "Official AAYAM swag, gear, and priority updates.",
  "Exclusive access to organizers, mentors, and sponsor interactions.",
  "Performance-based rewards including bonus credits and special status.",
  "A direct line into the festival ecosystem before everyone else."
];

const programSteps = [
  {
    id: "01",
    label: "Responsibilities",
    title: "Operate The Relay",
    accent: "text-cyan-400/80",
    node:
      "border-cyan-400/35 bg-cyan-400/10 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.18)]",
    line: "from-cyan-400/70 via-cyan-400/20 to-white/10",
    content: "list" as const,
    items: responsibilities
  },
  {
    id: "02",
    label: "Perks",
    title: "Unlock Rewards",
    accent: "text-orange-300/80",
    node:
      "border-orange-300/35 bg-orange-300/10 text-orange-200 shadow-[0_0_20px_rgba(253,186,116,0.16)]",
    line: "from-orange-300/70 via-orange-300/20 to-white/10",
    content: "list" as const,
    items: perks
  },
  {
    id: "03",
    label: "Access",
    title: "Why It Matters",
    accent: "text-fuchsia-300/80",
    node:
      "border-fuchsia-300/35 bg-fuchsia-300/10 text-fuchsia-200 shadow-[0_0_20px_rgba(244,114,182,0.16)]",
    line: "from-fuchsia-300/70 via-fuchsia-300/20 to-white/10",
    content: "copy" as const,
    paragraphs: [
      "Representing AAYAM puts you at the center of the fest's outreach engine, not at the edge of it.",
      "You help shape who joins the experience and get recognised as part of the launch path that brings the wider community in."
    ]
  }
] as const;

const tiers = [
  {
    name: "Bronze",
    target: "10-25 registrations",
    rewards: ["Tactical certification", "Insignia pack"],
    eyebrow: "text-[#f0c7a6]/72",
    badge: "border-[#8f5a34]/45 bg-[#2b1a12]/85 text-[#f3c59b]",
    title:
      "bg-gradient-to-r from-[#f6d0ae] via-[#c98a54] to-[#8d5633] bg-clip-text text-transparent",
    border: "border-[#8f5a34]/26 hover:border-[#c98a54]/52",
    shadow: "shadow-[0_18px_60px_rgba(0,0,0,0.34),0_0_32px_rgba(201,138,84,0.10)]",
    glow: "bg-[radial-gradient(circle_at_top,rgba(201,138,84,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(122,62,20,0.18),transparent_34%)]",
    bullet: "text-[#f0bf94]",
    hoverGlow:
      "bg-[linear-gradient(115deg,transparent_14%,rgba(246,208,174,0.14)_30%,rgba(201,138,84,0.95)_49%,rgba(246,208,174,0.18)_68%,transparent_84%)]"
  },
  {
    name: "Silver",
    target: "25-50 registrations",
    rewards: ["Priority clearance", "Nodal badge"],
    eyebrow: "text-slate-200/70",
    badge: "border-slate-300/24 bg-slate-100/6 text-slate-200",
    title:
      "bg-gradient-to-r from-white via-slate-200 to-[#8f98ac] bg-clip-text text-transparent",
    border: "border-slate-300/18 hover:border-slate-200/42",
    shadow: "shadow-[0_18px_60px_rgba(0,0,0,0.34),0_0_34px_rgba(203,213,225,0.08)]",
    glow: "bg-[radial-gradient(circle_at_top,rgba(226,232,240,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.14),transparent_34%)]",
    bullet: "text-slate-200",
    hoverGlow:
      "bg-[linear-gradient(115deg,transparent_14%,rgba(255,255,255,0.12)_30%,rgba(226,232,240,0.95)_49%,rgba(203,213,225,0.16)_68%,transparent_84%)]"
  },
  {
    name: "Gold",
    target: "50-100 registrations",
    rewards: ["Executive access", "Recommendation log", "Nexus session"],
    eyebrow: "text-[#f7ddb0]/76",
    badge: "border-[#d3a54f]/28 bg-[#2d220a]/88 text-[#f3cd75]",
    title:
      "bg-gradient-to-r from-[#fff0b8] via-[#f3c84d] to-[#b57d10] bg-clip-text text-transparent",
    border: "border-[#d3a54f]/20 hover:border-[#f3c84d]/50",
    shadow: "shadow-[0_18px_60px_rgba(0,0,0,0.34),0_0_34px_rgba(243,200,77,0.11)]",
    glow: "bg-[radial-gradient(circle_at_top,rgba(243,200,77,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(181,125,16,0.18),transparent_34%)]",
    bullet: "text-[#ffd970]",
    hoverGlow:
      "bg-[linear-gradient(115deg,transparent_14%,rgba(255,240,184,0.14)_30%,rgba(243,200,77,0.95)_49%,rgba(255,217,112,0.18)_68%,transparent_84%)]"
  },
  {
    name: "Platinum",
    target: "100+ registrations",
    rewards: ["Concert pass", "LOR", "Core team priority", "Organizer meet"],
    eyebrow: "text-[#e9e8ff]/76",
    badge: "border-[#9fa7d8]/28 bg-[#16182a]/86 text-[#d9ddff]",
    title:
      "bg-gradient-to-r from-[#ffffff] via-[#dfe4ff] to-[#8b95c7] bg-clip-text text-transparent",
    border: "border-[#9fa7d8]/20 hover:border-[#dfe4ff]/48",
    shadow: "shadow-[0_18px_60px_rgba(0,0,0,0.34),0_0_36px_rgba(191,200,255,0.10)]",
    glow: "bg-[radial-gradient(circle_at_top,rgba(223,228,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,149,199,0.16),transparent_34%)]",
    bullet: "text-[#d8dcff]",
    hoverGlow:
      "bg-[linear-gradient(115deg,transparent_14%,rgba(255,255,255,0.14)_30%,rgba(223,228,255,0.95)_49%,rgba(184,194,240,0.18)_68%,transparent_84%)]"
  }
];

const faqs = [
  {
    question: "Who can become an ambassador?",
    answer:
      "Any college or university student who wants to lead outreach for AAYAM can apply. Prior experience is helpful, but not required."
  },
  {
    question: "What does the role actually involve?",
    answer:
      "You spread the word, drive registrations, and become the point person connecting your campus community with the festival."
  },
  {
    question: "How is performance tracked?",
    answer:
      "The original ambassador microsite includes a dedicated portal flow. For now, use the contact route to get onboarded and we can wire the full portal next."
  },
  {
    question: "When are rewards unlocked?",
    answer:
      "Rewards unlock as you cross tier thresholds, with higher-performing ambassadors getting deeper access and stronger recognition."
  }
];

function TerminalList({ items, accent = "cyan" }: { items: string[]; accent?: "cyan" | "orange" }) {
  const colorClass = accent === "orange" ? "text-orange-300/90" : "text-cyan-200/90";

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <span className={`mt-1 font-mono text-xs ${colorClass}`}>{">"}</span>
          <p className="font-mono text-sm leading-6 text-white/80">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function AmbassadorPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden text-white">
      <div className="fixed inset-0 z-[-50] bg-black">
        <Galaxy
          hueShift={215}
          density={0.95}
          glowIntensity={0.36}
          saturation={0.28}
          mouseRepulsion={false}
          speed={0.7}
          transparent
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[-40] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.58)_56%,rgba(0,0,0,0.92)_100%)]" />

      <section className="container-shell relative z-10 py-14 sm:py-18">
        <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.85fr] lg:gap-10">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.36em] text-cyan-400 sm:text-sm">
              [ AMBASSADOR_PROTOCOL // CAMPUS_UPLINK ]
            </p>
            <div className="space-y-4">
              <h1 className="font-mono text-4xl font-black uppercase tracking-[-0.04em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.12)] sm:text-5xl lg:text-7xl">
                Become The
                <span className="block bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                  Face Of AAYAM
                </span>
              </h1>
              <p className="max-w-2xl bg-gradient-to-r from-cyan-200 via-cyan-100 to-fuchsia-200 bg-clip-text font-mono text-base leading-8 text-transparent drop-shadow-[0_0_12px_rgba(34,211,238,0.16)] sm:text-lg">
                Lead the techfest signal on your campus, drive registrations, unlock rewards, and
                represent AAYAM at the front line of our outreach network.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <ActionButton href="/ambassador/apply" variant="primary" className="min-w-[220px]">
                [ INITIATE_APPLICATION ]
              </ActionButton>
              <ActionButton href="/ambassador/portal" variant="ghost" className="min-w-[220px]">
                [ OPEN_CA_PORTAL ]
              </ActionButton>
              <ActionButton href="#clearance-levels" variant="secondary" className="min-w-[220px]">
                [ VIEW_CLEARANCE_LEVELS ]
              </ActionButton>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "role", value: "campus ambassador" },
                { label: "mission", value: "growth + outreach" },
                { label: "channel", value: "student network" }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/45 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.32),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-400/80">
                    {item.label}
                  </p>
                  <p className="mt-3 font-mono text-sm uppercase tracking-[0.18em] text-white/85">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[28px] border border-cyan-400/20 bg-black/55 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45),0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_36%)]" />
            <div className="relative space-y-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-orange-300/80">
                  [ OVERVIEW ]
                </p>
                <h2 className="mt-3 font-mono text-2xl font-bold uppercase tracking-[0.04em] text-white">
                  Your Mission Node
                </h2>
                <p className="mt-4 font-mono text-sm leading-7 text-white/78">
                  The imported ambassador microsite positions this program as a student-led campus
                  relay. This rebuild keeps that structure, but brings it into the same terminal
                  interface language as the rest of AAYAM.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/45 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300/78">
                    [ SIGNAL ]
                  </p>
                  <p className="mt-3 font-mono text-3xl font-bold text-white">3000+</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                    developers, engineers, and students
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/45 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fuchsia-300/78">
                    [ STATUS ]
                  </p>
                  <p className="mt-3 font-mono text-3xl font-bold text-white">LIVE</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                    ambassador pipeline online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell relative z-10 py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.44fr_1fr] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] border border-white/10 bg-black/45 p-6 backdrop-blur-md">
              <p className="font-mono text-xs uppercase tracking-[0.36em] text-cyan-400 sm:text-sm">
                [ STEP_FLOW ]
              </p>
              <h2 className="mt-4 font-mono text-3xl font-black uppercase tracking-[0.02em] text-white">
                Ambassador Path
              </h2>
              <p className="mt-4 font-mono text-sm leading-7 text-white/68">
                A connected progression inspired by the stepper structure, reframed into the AAYAM terminal language.
              </p>

              <div className="relative mt-8 space-y-5">
                <div className="pointer-events-none absolute bottom-6 left-[1.05rem] top-6 w-px bg-gradient-to-b from-cyan-400/50 via-white/10 to-fuchsia-400/30" />
                {programSteps.map((step) => (
                  <div key={step.id} className="relative flex items-start gap-4">
                    <div
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border font-mono text-xs ${step.node}`}
                    >
                      {step.id}
                    </div>
                    <div>
                      <p className={`font-mono text-[10px] uppercase tracking-[0.34em] ${step.accent}`}>
                        [ {step.label} ]
                      </p>
                      <p className="mt-2 font-mono text-sm uppercase tracking-[0.18em] text-white/86">
                        {step.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {programSteps.map((step, index) => (
              <div key={step.id} className="grid gap-4 lg:grid-cols-[88px_1fr] lg:gap-6">
                <div className="hidden lg:flex">
                  <div className="relative flex w-full justify-center">
                    <div
                      className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border font-mono text-sm ${step.node}`}
                    >
                      {step.id}
                    </div>
                    {index < programSteps.length - 1 ? (
                      <div className={`absolute left-1/2 top-14 h-[calc(100%+1.5rem)] w-px -translate-x-1/2 bg-gradient-to-b ${step.line}`} />
                    ) : null}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-black/45 p-6 backdrop-blur-md">
                  <p className={`font-mono text-[10px] uppercase tracking-[0.34em] ${step.accent}`}>
                    [ {step.label.toUpperCase()} ]
                  </p>
                  <h2 className="mt-3 font-mono text-2xl font-bold uppercase text-white">{step.title}</h2>
                  <div className="mt-5">
                    {step.content === "list" ? (
                      <TerminalList items={step.items} accent={step.id === "02" ? "orange" : "cyan"} />
                    ) : (
                      <div className="space-y-4 font-mono text-sm leading-7 text-white/78">
                        {step.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clearance-levels" className="container-shell relative z-10 py-12 sm:py-16">
        <div className="mb-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.36em] text-cyan-400 sm:text-sm">
            [ CLEARANCE_LEVELS ]
          </p>
          <h2 className="mt-4 font-mono text-3xl font-black uppercase tracking-[0.02em] text-white sm:text-5xl">
            Performance Tiers
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`group relative rounded-[28px] bg-black/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${tier.border} ${tier.shadow}`}
            >
              <div className={`pointer-events-none absolute inset-0 rounded-[28px] opacity-100 ${tier.glow}`} />
              <div
                className={`pointer-events-none absolute inset-0 rounded-[28px] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 ${tier.hoverGlow}`}
              />
              <div
                className={`pointer-events-none absolute -inset-px rounded-[28px] opacity-0 blur-[2px] transition-all duration-300 group-hover:opacity-100 ${tier.hoverGlow}`}
              />
              <div className="pointer-events-none absolute inset-[1px] rounded-[27px] bg-black/88" />
              <div className="relative z-10 flex items-center justify-between">
                <p className={`font-mono text-xs uppercase tracking-[0.28em] ${tier.eyebrow}`}>
                  tier_0{index + 1}
                </p>
                <span
                  className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${tier.badge}`}
                >
                  {tier.target}
                </span>
              </div>
              <h3 className={`relative z-10 mt-5 font-mono text-3xl font-bold uppercase ${tier.title}`}>{tier.name}</h3>
              <div className="relative z-10 mt-5 space-y-3">
                {tier.rewards.map((reward) => (
                  <div key={reward} className="flex items-start gap-3">
                    <span className={`mt-1 font-mono text-xs ${tier.bullet}`}>+</span>
                    <p className="font-mono text-sm leading-6 text-white/78">{reward}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell relative z-10 py-12 sm:py-16">
        <div className="mb-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.36em] text-orange-300 sm:text-sm">
            [ FAQ_CHANNEL ]
          </p>
          <h2 className="mt-4 font-mono text-3xl font-black uppercase tracking-[0.02em] text-white sm:text-5xl">
            Quick Answers
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-[28px] border border-white/10 bg-black/45 p-6 backdrop-blur-md"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300/76">
                q_0{index + 1}
              </p>
              <h3 className="mt-3 font-mono text-xl font-bold uppercase text-white">{faq.question}</h3>
              <p className="mt-4 font-mono text-sm leading-7 text-white/76">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell relative z-10 py-12 pb-20 sm:py-16 sm:pb-24">
        <div className="rounded-[32px] border border-cyan-400/15 bg-black/55 px-6 py-10 text-center shadow-[0_18px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.36em] text-cyan-300/88 sm:text-sm">
            {"> CAMPUS_HANDSHAKE // READY"}
          </p>
          <h2 className="mt-4 font-mono text-3xl font-black uppercase tracking-[0.02em] text-white sm:text-5xl">
            Step Into The Ambassador Network
          </h2>
          <p className="mx-auto mt-5 max-w-3xl bg-gradient-to-r from-cyan-200 via-cyan-100 to-fuchsia-200 bg-clip-text font-mono text-sm leading-7 text-transparent drop-shadow-[0_0_12px_rgba(34,211,238,0.16)] sm:text-base sm:leading-8">
            The original `Aayamfest` folder is now represented inside the main product experience.
            If you want, I can next convert the registration form and CA portal into native routes
            too.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ActionButton href="/ambassador/apply" variant="primary" className="min-w-[220px]">
              [ CONTACT_FOR_ONBOARDING ]
            </ActionButton>
            <ActionButton href="/ambassador/portal" variant="secondary" className="min-w-[220px]">
              [ CA_PORTAL_LOGIN ]
            </ActionButton>
            <ActionButton href="https://www.instagram.com/aayamfest/" external variant="ghost" className="min-w-[220px]">
              [ OPEN_INSTAGRAM_CHANNEL ]
            </ActionButton>
          </div>
        </div>
      </section>

      <HomeTerminalFooter lightLinks />
    </main>
  );
}
