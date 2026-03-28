import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteConfig } from "@/lib/data";

export default async function ContactPage() {
  const siteConfig = await getSiteConfig().catch(() => null);

  return (
    <main>
      <section className="container-shell py-16">
        <FadeIn>
          <SectionHeading
            eyebrow="Uplink Node"
            title="Reach the operator network"
            description="A clean terminal contact page driven directly from the editable site settings collection."
          />
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <GlassCard className="p-8">
              <p className="data-line">Primary Channels</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="system-label text-[10px] text-cyanGlow">Email</p>
                  <p className="mt-3 text-lg text-white">{siteConfig?.contactDetails?.email || "Pending uplink"}</p>
                </div>
                <div>
                  <p className="system-label text-[10px] text-cyanGlow">Phone</p>
                  <p className="mt-3 text-lg text-white">{siteConfig?.contactDetails?.phone || "Pending uplink"}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="system-label text-[10px] text-cyanGlow">Address</p>
                  <p className="mt-3 text-lg text-white/90">
                    {siteConfig?.contactDetails?.address || "Campus coordinates pending sync"}
                  </p>
                </div>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.06}>
            <GlassCard className="terminal-grid p-8">
              <p className="system-label text-[10px] text-pinkGlow">Status Board</p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="terminal-heading text-2xl font-black text-white">Response Window</p>
                  <p className="mt-2 text-sm leading-7 text-textDim">
                    Use the published channels for registrations, partnerships, and operational
                    queries.
                  </p>
                </div>
                <div className="border border-outlineSoft/25 p-4">
                  <p className="system-label text-[10px] text-amberGlow">Social Uplinks</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/70">
                    {Object.entries(siteConfig?.socialLinks || {})
                      .filter(([, value]) => Boolean(value))
                      .map(([key, value]) => (
                        <a key={key} href={value} target="_blank" rel="noreferrer" className="border border-outlineSoft/35 px-3 py-2 hover:border-cyanGlow/35 hover:text-cyanGlow">
                          {key}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>
      <Footer siteConfig={siteConfig} />
    </main>
  );
}
