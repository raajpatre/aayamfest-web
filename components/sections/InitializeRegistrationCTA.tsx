import Link from "next/link";
import Magnet from "@/components/Magnet";

export function InitializeRegistrationCTA() {
  return (
    <section className="pb-20 pt-8 sm:pb-24 sm:pt-10">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 font-mono text-[11px] text-cyan-400 animate-pulse sm:mb-6 sm:text-sm">
          &gt; SYSTEM.READY // SECURE_CONNECTION_ESTABLISHED
        </div>

        <div className="relative mt-6 sm:mt-10">
          <div className="pointer-events-none absolute -left-12 -top-10 hidden h-12 w-12 border-l border-t border-cyan-400/45 sm:block" />
          <div className="pointer-events-none absolute -right-12 -top-10 hidden h-12 w-12 border-r border-t border-cyan-400/45 sm:block" />
          <div className="pointer-events-none absolute -bottom-10 -left-12 hidden h-12 w-12 border-b border-l border-fuchsia-400/40 sm:block" />
          <div className="pointer-events-none absolute -bottom-10 -right-12 hidden h-12 w-12 border-b border-r border-fuchsia-400/40 sm:block" />
          <div className="pointer-events-none absolute left-1/2 top-[-12px] h-px w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent sm:top-[-22px] sm:w-28" />
          <div className="pointer-events-none absolute bottom-[-12px] left-1/2 h-px w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/65 to-transparent sm:bottom-[-22px] sm:w-28" />

          <Magnet
            padding={100}
            disabled={false}
            magnetStrength={4}
            wrapperClassName="inline-block"
            innerClassName="group"
          >
            <Link
              href="https://unstop.com/college-fests/aayam-newton-school-of-technology-bengaluru-karnataka-450770"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center overflow-hidden rounded-[22px] border-2 border-cyan-300/80 bg-black/80 px-5 py-4 font-mono text-sm font-bold tracking-[0.16em] text-white shadow-[0_0_24px_rgba(34,211,238,0.22),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:bg-cyan-300 hover:text-[#03161c] hover:shadow-[0_0_42px_rgba(34,211,238,0.65),0_0_82px_rgba(34,211,238,0.34)] sm:rounded-[28px] sm:px-12 sm:py-7 sm:text-2xl sm:tracking-[0.2em]"
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:animate-[cta-glitch_0.18s_linear_2] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />
              <span className="relative z-10 [text-shadow:0_0_20px_rgba(255,255,255,0.25)] transition-colors duration-300 group-hover:text-[#03161c]">
                [ INITIALIZE_REGISTRATION ]
              </span>
            </Link>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
