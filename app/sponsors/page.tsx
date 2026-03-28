import Image from "next/image";
import { EmptyState } from "@/components/sections/EmptyState";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteConfig, getSponsors } from "@/lib/data";

const sponsorCategories = [
  {
    title: "Title Sponsor",
    key: "Title",
    cardClass: "min-h-[320px] items-center justify-center text-center"
  },
  {
    title: "Concert Sponsors",
    key: "Concert",
    cardClass: "min-h-[220px]"
  },
  {
    title: "Associate Sponsors",
    key: "Associate",
    cardClass: "min-h-[180px]"
  },
  {
    title: "In-Kind Sponsors",
    key: "In-Kind",
    cardClass: "min-h-[140px]"
  }
] as const;

export default async function SponsorsPage() {
  const [sponsors, siteConfig] = await Promise.all([
    getSponsors().catch(() => []),
    getSiteConfig().catch(() => null)
  ]);

  return (
    <main className="pb-10">
      <section className="container-shell py-14 sm:py-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Sponsors"
            title="A sponsor hierarchy with presence"
            description="Sponsor visibility is structured by category so premium partners feel clearly distinguished."
          />
        </FadeIn>
      </section>

      <div className="container-shell space-y-14 pb-16">
        {sponsorCategories.map((category, categoryIndex) => {
          const items = sponsors.filter((sponsor) => sponsor.category === category.key);

          return (
            <section key={category.key}>
              <FadeIn delay={categoryIndex * 0.04}>
                <h2 className="font-display text-2xl uppercase tracking-[0.16em] text-white">
                  {category.title}
                </h2>
              </FadeIn>
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.length ? (
                  items.map((sponsor, index) => (
                    <FadeIn key={sponsor._id} delay={index * 0.05}>
                      <a href={sponsor.websiteLink} target="_blank" rel="noreferrer" className="block">
                        <GlassCard
                          className={`flex p-8 ${category.cardClass} ${
                            category.key === "Title"
                              ? "border-cyanGlow/25 shadow-glow xl:col-span-3"
                              : category.key === "Concert"
                                ? "shadow-neon md:min-h-[240px]"
                                : ""
                          }`}
                        >
                          <div className="relative h-24 w-full">
                            <Image
                              src={sponsor.logo}
                              alt={sponsor.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                          <p className="mt-5 text-lg font-semibold text-white">{sponsor.name}</p>
                        </GlassCard>
                      </a>
                    </FadeIn>
                  ))
                ) : (
                  <EmptyState
                    title={`No ${category.title.toLowerCase()} added yet`}
                    description="Add sponsors from admin and assign the correct category to control layout hierarchy here."
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>

      <Footer siteConfig={siteConfig} />
    </main>
  );
}
