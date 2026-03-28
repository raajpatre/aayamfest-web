import Image from "next/image";
import { EmptyState } from "@/components/sections/EmptyState";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteConfig, getSponsors } from "@/lib/data";

const sponsorCategories = [
  { title: "Title Sponsor", key: "Title", size: "xl:col-span-3 min-h-[300px]" },
  { title: "Concert Sponsors", key: "Concert", size: "md:min-h-[220px]" },
  { title: "Associate Sponsors", key: "Associate", size: "min-h-[180px]" },
  { title: "In-Kind Sponsors", key: "In-Kind", size: "min-h-[140px]" }
] as const;

export default async function SponsorsPage() {
  const [sponsors, siteConfig] = await Promise.all([
    getSponsors().catch(() => []),
    getSiteConfig().catch(() => null)
  ]);

  return (
    <main>
      <section className="container-shell py-16">
        <FadeIn>
          <SectionHeading
            eyebrow="Strategic Alliance Network"
            title="Sponsor hierarchy in full signal"
            description="Each sponsor category holds a distinct amount of space and visual energy so the partnership hierarchy is obvious at a glance."
          />
        </FadeIn>
      </section>

      <div className="container-shell space-y-16 pb-16">
        {sponsorCategories.map((category, categoryIndex) => {
          const items = sponsors.filter((sponsor) => sponsor.category === category.key);

          return (
            <section key={category.key}>
              <FadeIn delay={categoryIndex * 0.04}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-pinkGlow" />
                  <h2 className="terminal-heading text-3xl font-black text-white">{category.title}</h2>
                </div>
              </FadeIn>
              {items.length ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((sponsor, index) => (
                    <FadeIn key={sponsor._id} delay={index * 0.05}>
                      <a href={sponsor.websiteLink} target="_blank" rel="noreferrer" className="block h-full">
                        <GlassCard
                          className={`flex h-full flex-col justify-center p-8 text-center transition-colors hover:border-pinkGlow/35 ${category.size}`}
                        >
                          <div className="relative mx-auto h-24 w-full max-w-[320px]">
                            <Image
                              src={sponsor.logo}
                              alt={sponsor.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                          <p className="terminal-heading mt-6 text-2xl font-black text-white">{sponsor.name}</p>
                          <p className="system-label mt-3 text-[10px] text-cyanGlow">{sponsor.category}</p>
                        </GlassCard>
                      </a>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title={`No ${category.title.toLowerCase()} in network`}
                  description="Assign sponsors to this category from the admin dashboard to light up this section."
                />
              )}
            </section>
          );
        })}
      </div>

      <Footer siteConfig={siteConfig} />
    </main>
  );
}
