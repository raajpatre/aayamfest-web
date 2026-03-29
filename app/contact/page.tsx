import Galaxy from "@/components/Galaxy";
import DecryptedText from "@/components/DecryptedText";
import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="fixed inset-0 z-[-50] bg-black">
        <Galaxy
          hueShift={205}
          density={0.9}
          glowIntensity={0.32}
          saturation={0.2}
          mouseRepulsion={false}
          speed={0.7}
          transparent
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[-40] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_58%,rgba(0,0,0,0.92)_100%)]" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 min-h-[85vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div className="relative z-20 flex h-full flex-col justify-center gap-8 lg:-translate-y-6">
            <h1 className="font-mono text-5xl font-bold tracking-tight text-white md:text-7xl">
              CONTACT US
            </h1>

            <div className="max-w-xl rounded-[28px] border border-white/10 bg-black/35 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-md">
              <h3 className="mb-2 font-mono text-sm uppercase tracking-widest text-cyan-400">
                Email Us
              </h3>
              <a
                href="mailto:aayam.fest@newtonschool.co"
                className="font-mono text-xl text-white transition-colors hover:text-cyan-400"
              >
                aayam.fest@newtonschool.co
              </a>

              <div className="mt-8">
                <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-cyan-400">
                  Call Us
                </h3>
                <span className="block font-mono text-white">Sainy Verma</span>
                <span className="mb-4 block text-gray-400">+91 8968949795 (Fest Lead)</span>
                <span className="block font-mono text-white">Sahitya Singh</span>
                <span className="block text-gray-400">+91 7569319430 (Sponsorship Head)</span>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-cyan-400">
                  Socials
                </h3>
                <a
                  href="https://www.instagram.com/aayamfest?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/40 p-3 text-white transition-all hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex h-[500px] w-full flex-col items-center justify-center lg:h-[600px] lg:-translate-y-6">
            <div className="relative z-10 mx-auto w-full max-w-[450px] aspect-square">
              <GlobePulse markers={[{ id: "blr", location: [12.9716, 77.5946], delay: 0 }]} />
            </div>
            <div className="mt-5 max-w-[420px] text-center text-sm leading-7 sm:text-base">
              <DecryptedText
                text={`"> MANUAL_OVERRIDE: Drag to orbit. Click to initiate landing."`}
                animateOn="view"
                sequential
                speed={20}
                maxIterations={10}
                characters="X@#$01&*!"
                className="font-mono text-cyan-200/90 drop-shadow-[0_0_12px_rgba(34,211,238,0.28)]"
                encryptedClassName="font-mono text-fuchsia-300/65"
                parentClassName="block"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeTerminalFooter lightLinks />
    </main>
  );
}
