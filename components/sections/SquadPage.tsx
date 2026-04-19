"use client";

import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { TerminalBackground } from "@/components/sections/TerminalBackground";

type SquadMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin: string;
  whatsapp?: string;
};

type SquadCategory = {
  title: string;
  members: SquadMember[];
};

const squadCategories: SquadCategory[] = [
  {
    title: "Fest Leads",
    members: [
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
      }
    ]
  },
  {
    title: "Event Leads",
    members: [
      {
        id: "member-11",
        name: "SAI SRIJA",
        role: "EVENTS LEAD",
        image: "/team/sai-srija.jpg",
        linkedin: "https://www.linkedin.com/in/sai-srija-chakramahanti-9a85a13a1/",
      },
      {
        id: "member-12",
        name: "JOTHIN KUMAR",
        role: "CP INDIVIDUALS",
        image: "/team/Jothin.jpeg",
        linkedin: "https://www.linkedin.com/in/jothin-kumar/",
        whatsapp: "https://chat.whatsapp.com/G23Ag9MTgzYLbkjE6m7uBF"
      },
      {
        id: "member-13",
        name: "Lay Shah",
        role: "RC RACING",
        image: "/team/LayShah.jpeg",
        linkedin: "https://www.linkedin.com/in/lay-shah-0a777a380/"
      },
      {
        id: "member-14",
        name: "PRANAV SINGH",
        role: "FF-MAX | BGMI",
        image: "/team/pranav-singh.jpg",
        linkedin: "https://www.linkedin.com/in/pranav-choudhary5112/"
      }
    ]
  },
  {
    title: "Tech Team",
    members: [
      {
        id: "member-8-tech",
        name: "RAAJ PATRE",
        role: "TECH LEAD",
        image: "/team/raaj-patre.jpg",
        linkedin: "https://www.linkedin.com/in/raaj-patre-ba5494271/"
      },
      {
        id: "member-9",
        name: "S K IZAZ AHMED",
        role: "TECH TEAM",
        image: "/team/sk-izaz-ahmed.jpeg",
        linkedin: "https://www.linkedin.com/in/sk-izaz-ahmed-2ba954378/"
      },
      {
        id: "member-10",
        name: "SHAAZ HEMANI",
        role: "TECH TEAM",
        image: "/team/shaaz-hemani.jpg",
        linkedin: "https://www.linkedin.com/in/shaaz-hemani-229150276/"
      }
    ]
  },
  {
    title: "Design Team",
    members: [
      {
        id: "member-5",
        name: "ARUNIKA CHANDA",
        role: "DESIGN LEAD",
        image: "/team/arunika-chanda.jpg",
        linkedin: "https://www.linkedin.com/in/arunika-chanda-4859272b9/"
      },
      {
        id: "member-6",
        name: "PAHELI CHOUDHURI",
        role: "DESIGN LEAD",
        image: "/team/paheli-choudhari.jpeg",
        linkedin: "https://www.linkedin.com/in/paheli-choudhuri-1025hsuya/"
      }
    ]
  },
  {
    title: "Marketing and Outreach Team",
    members: [
      {
        id: "member-8-marketing",
        name: "RAAJ PATRE",
        role: "MARKETING LEAD",
        image: "/team/raaj-patre.jpg",
        linkedin: "https://www.linkedin.com/in/raaj-patre-ba5494271/"
      },
      {
        id: "member-9-marketing",
        name: "Ashmita Kamat",
        role: "MARKETING TEAM",
        image: "/team/Ashmita.jpeg",
        linkedin: "https://www.linkedin.com/in/ashmita-kamath-5a06b02b6/"
      },
      {
        id: "member-10-marketing",
        name: "Krishna Chaurasia",
        role: "MARKETING TEAM",
        image: "/team/Krishna.jpeg",
        linkedin: "https://www.linkedin.com/in/krishna-chaurasia-118022381/"
      },
      {
        id: "member-11-marketing",
        name: "ARUNIKA CHANDA",
        role: "MARKETING TEAM",
        image: "/team/arunika-chanda.jpg",
        linkedin: "https://www.linkedin.com/in/arunika-chanda-4859272b9/"
      },
      {
        id: "member-12-marketing",
        name: "S K IZAZ AHMED",
        role: "MARKETING TEAM",
        image: "/team/sk-izaz-ahmed.jpeg",
        linkedin: "https://www.linkedin.com/in/sk-izaz-ahmed-2ba954378/"
      },
      {
        id: "member-13-marketing",
        name: "SAINY VERMA",
        role: "MARKETING TEAM",
        image: "/team/sainy-verma.jpg",
        linkedin: "https://www.linkedin.com/in/sainy-verma-/"
      },
      {
        id: "member-14-marketing",
        name: "Lay Shah",
        role: "MARKETING TEAM",
        image: "/team/LayShah.jpeg",
        linkedin: "https://www.linkedin.com/in/lay-shah-0a777a380/"
      }
    ]
  },
  {
    title: "Sponsorship Team",
    members: [
      {
        id: "member-3",
        name: "SAHITYA SINGH",
        role: "SPONSORSHIP TEAM",
        image: "/team/sahitya-singh.jpeg",
        linkedin: "https://www.linkedin.com/in/sahitya-singh-7012b137b/"
      },
      {
        id: "member-12",
        name: "PRANAV SINGH",
        role: "SPONSORSHIP TEAM",
        image: "/team/pranav-singh.jpg",
        linkedin: "https://www.linkedin.com/in/pranav-choudhary5112/"
      }
    ]
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

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.1 8.9c.2-.2.5-.2.7-.2h.4c.2 0 .4.2.5.4l.8 1.9c.1.2 0 .5-.1.7l-.6.6c-.1.1-.2.3-.1.5.3.6.8 1.1 1.4 1.4.2.1.4.1.5-.1l.6-.6c.2-.1.5-.2.7-.1l1.9.8c.2.1.4.3.4.5v.4c0 .4-.3.7-.7.7a7 7 0 0 1-6.6-6.6c0-.4.3-.7.7-.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

      <div className="relative z-10 mx-auto max-w-7xl space-y-24">
        {squadCategories.map((category) => (
          <section key={category.title}>
            <h2 className="mb-10 text-center font-mono text-3xl font-bold uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              [ {category.title} ]
            </h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {category.members.map((member) => (
                <div
                  key={member.id}
                  tabIndex={0}
                  className="group relative h-[400px] w-full max-w-sm flex-none cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-black/40 transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] focus:border-cyan-400/50 focus:shadow-[0_0_30px_rgba(34,211,238,0.15)] active:border-cyan-400/50 sm:w-[calc(50%-1.125rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)]"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.6] contrast-125 grayscale filter transition-all duration-700 group-hover:brightness-100 group-hover:grayscale-0 group-focus:brightness-100 group-focus:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.08)_36%,rgba(0,0,0,0.68)_100%)]" />

                  {/* Role Title (Visible by default, hides on hover) */}
                  <div className="absolute inset-x-0 top-8 z-10 flex flex-col items-center justify-center gap-1 opacity-100 transition-opacity duration-500 group-hover:opacity-0 group-focus:opacity-0">
                    {member.role.split("/").map((r, i) => (
                      <span
                        key={i}
                        className="font-mono text-lg font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      >
                        {r.trim()}
                      </span>
                    ))}
                  </div>

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

                      <div className="flex gap-2">
                        {member.whatsapp && (
                          <a
                            href={member.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded border border-white/20 bg-white/10 p-2 text-white transition-colors hover:border-green-400 hover:bg-green-500/20 hover:text-green-400"
                            aria-label={`${member.name} WhatsApp Group`}
                          >
                            <WhatsappIcon />
                          </a>
                        )}
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
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <HomeTerminalFooter lightLinks />
    </main>
  );
}
