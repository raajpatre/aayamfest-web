import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { EmptyState } from "@/components/sections/EmptyState";
import { ActionButton } from "@/components/ui/ActionButton";
import { AnimatedPrizeValue } from "@/components/ui/AnimatedPrizeValue";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { EventCard } from "@/components/ui/EventCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SponsorMarquee } from "@/components/ui/SponsorMarquee";
import { getFeaturedEvents, getSiteConfig, getSponsors } from "@/lib/data";

export default async function HomePage() {
  const [siteConfig, featuredEvents, sponsors] = await Promise.all([
    getSiteConfig().catch(() => null),
    getFeaturedEvents().catch(() => []),
    getSponsors().catch(() => [])
  ]);

  return (
    <main>
      <HeroSection />

      <section className="container-shell py-10">
        <FadeIn>
          <SectionHeading
            eyebrow="Countdown"
            title="The gateway opens soon"
            description="The timer is synced to the fest date from your admin settings."
          />
        </FadeIn>
        <div className="mt-8">
          <CountdownTimer targetDate={siteConfig?.festDate} />
        </div>
      </section>

      <section className="container-shell py-10">
        <FadeIn>
          <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.32em] text-pinkGlow">Prize Pool</p>
            <div className="mt-5 font-display text-5xl uppercase text-white sm:text-7xl">
              <AnimatedPrizeValue value={siteConfig?.totalPrizePool} />
            </div>
            <p className="mt-4 max-w-2xl text-base leading-7 text-textDim">
              Big stakes, premium competition, and a stage built to spotlight the most ambitious
              teams on campus.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="container-shell py-10">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured Events"
              title="High-impact challenges"
              description="Featured events are dynamically picked from the admin dashboard."
            />
            <ActionButton href="/events" variant="secondary">
              Explore Events
            </ActionButton>
          </div>
        </FadeIn>
        <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {featuredEvents.length
            ? featuredEvents.map((event, index) => (
                <FadeIn key={event._id} delay={index * 0.08}>
                  <EventCard event={event} />
                </FadeIn>
              ))
            : (
              <EmptyState
                title="Featured events will appear here"
                description="Add events and toggle Featured from the admin dashboard to populate this section."
              />
              )}
        </div>
      </section>

      <section className="container-shell py-10">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Sponsors"
              title="Backed by the bold"
              description="Sponsor logos loop here automatically as they are added and categorized."
            />
            <div className="flex flex-wrap gap-3">
              <ActionButton
                href={siteConfig?.contactDetails?.sponsorFormLink || "#"}
                external={Boolean(siteConfig?.contactDetails?.sponsorFormLink)}
              >
                Become a Sponsor
              </ActionButton>
              <ActionButton href="/sponsors" variant="secondary">
                View All Sponsors
              </ActionButton>
            </div>
          </div>
        </FadeIn>
        <div className="mt-8">
          <SponsorMarquee sponsors={sponsors} />
        </div>
      </section>

      <Footer siteConfig={siteConfig} />
    </main>
  );
}
