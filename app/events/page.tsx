import { EmptyState } from "@/components/sections/EmptyState";
import { Footer } from "@/components/sections/Footer";
import { EventCard } from "@/components/ui/EventCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getEvents, getSiteConfig } from "@/lib/data";

const categories = ["Robotics", "Hackathon", "CP", "Non-Tech"] as const;

export default async function EventsPage() {
  const [events, siteConfig] = await Promise.all([
    getEvents().catch(() => []),
    getSiteConfig().catch(() => null)
  ]);

  return (
    <main className="pb-10">
      <section className="container-shell py-14 sm:py-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Events"
            title="Challenge zones by category"
            description="Every event card below is powered by the admin-managed event collection."
          />
        </FadeIn>
      </section>

      <div className="container-shell space-y-14 pb-16">
        {categories.map((category, categoryIndex) => {
          const categoryEvents = events.filter((event) => event.category === category);
          return (
            <section key={category}>
              <FadeIn delay={categoryIndex * 0.04}>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-display text-2xl uppercase tracking-[0.18em] text-white sm:text-3xl">
                    {category}
                  </h2>
                  <span className="text-sm uppercase tracking-[0.24em] text-textDim">
                    {categoryEvents.length} events
                  </span>
                </div>
              </FadeIn>
              {categoryEvents.length ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {categoryEvents.map((event, index) => (
                    <FadeIn key={event._id} delay={index * 0.05}>
                      <EventCard event={event} />
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title={`No ${category} events yet`}
                  description="This category will populate automatically when events are added from admin."
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
