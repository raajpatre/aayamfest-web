"use client";

import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { TerminalBackground } from "@/components/sections/TerminalBackground";

const squadMembers = [
  {
    id: "member-1",
    name: "SAINY VERMA",
    role: "FEST LEAD",
    image: "/team/sainy-verma.jpg",
    linkedin: "https://www.linkedin.com/in/sainy-verma-/"
  },
  {
    id: "member-2",
    name: "GEETANSH GOYAL",
    role: "FEST LEAD",
    image: "/team/geetansh-goyal.jpg",
    linkedin: "https://www.linkedin.com/in/geetanshgoyal/"
  },
  {
    id: "member-3",
    name: "SAHITYA SINGH",
    role: "SPONSORSHIP TEAM",
    image: "/team/sahitya-singh.jpeg",
    linkedin: "https://www.linkedin.com/in/sahitya-singh-7012b137b/"
  },
  {
    id: "member-5",
    name: "ARUNIKA CHANDA",
    role: "DESIGN TEAM",
    image: "/team/arunika-chanda.jpg",
    linkedin: "https://www.linkedin.com/in/arunika-chanda-4859272b9/"
  },
  {
    id: "member-6",
    name: "PAHELI CHOUDHARI",
    role: "DESIGN TEAM",
    image: "/team/paheli-choudhari.jpeg",
    linkedin: "https://www.linkedin.com/in/paheli-choudhuri-1025hsuya/"
  },
  {
    id: "member-7",
    name: "RACHANA ADHIKARY",
    role: "SPONSORSHIP TEAM",
    image: "/team/rachana-adhikary.jpg",
    linkedin: "https://www.linkedin.com/in/rachana-adhikary-133a3b36b/"
  },
  {
    id: "member-9",
    name: "RAAJ PATRE",
    role: "MARKETING LEAD / TECH TEAM",
    image: "/team/raaj-patre.jpg",
    linkedin: "https://www.linkedin.com/in/raaj-patre-ba5494271/"
  },
  {
    id: "member-10",
    name: "S K IZAZ AHMED",
    role: "TECH TEAM",
    image: "/team/sk-izaz-ahmed.jpeg",
    linkedin: "https://www.linkedin.com/in/sk-izaz-ahmed-2ba954378/"
  },
  {
    id: "member-11",
    name: "SHAAZ HEMANI",
    role: "TECH TEAM",
    image: "/team/shaaz-hemani.jpg",
    linkedin: "https://www.linkedin.com/in/shaaz-hemani-229150276/"
  }
];

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="7.5" r="1" fill="currentColor" />
      <path
        d="M12 16V12.8C12 11.81 12.81 11 13.8 11C14.79 11 15.6 11.81 15.6 12.8V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 11V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SquadPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden px-6 pb-20 pt-32 text-white">
      <TerminalBackground />

      <div className="relative z-10 mx-auto mb-16 max-w-7xl text-center">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-cyan-500">
          {"> DECRYPTING_CORE_NETWORK"}
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] md:text-7xl font-mono">
          THE SQUAD
        </h1>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 md:grid-cols-3">
        {squadMembers.map((member) => (
          <div
            key={member.id}
            tabIndex={0}
            className="group relative h-[400px] cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-black/40 transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] focus:border-cyan-400/50 focus:shadow-[0_0_30px_rgba(34,211,238,0.15)] active:border-cyan-400/50"
          >
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover brightness-[0.3] contrast-125 grayscale filter transition-all duration-700 group-hover:brightness-100 group-hover:grayscale-0 group-focus:brightness-100 group-focus:grayscale-0"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.08)_36%,rgba(0,0,0,0.68)_100%)]" />

            <div className="absolute left-0 top-0 z-10 h-1 w-full bg-cyan-400 opacity-0 shadow-[0_0_20px_#22d3ee] transition-all duration-[1500ms] ease-in-out group-hover:top-full group-hover:opacity-100 group-focus:top-full group-focus:opacity-100" />

            <div className="absolute bottom-0 left-0 flex w-full translate-y-8 flex-col bg-gradient-to-t from-black via-black/90 to-transparent p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-green-400">
                  Access Granted
                </span>
              </div>

              <div className="flex w-full items-end justify-between">
                <div>
                  <h3 className="mb-1 font-mono text-xl font-bold uppercase tracking-wider text-white">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs tracking-widest text-cyan-400">{member.role}</p>
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-white/20 bg-white/10 p-2 text-white transition-colors hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-400"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <HomeTerminalFooter lightLinks />
    </main>
  );
}
