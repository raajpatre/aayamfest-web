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
    <main>
      <section className="container-shell py-16">
        <FadeIn>
          <div className="border-l-4 border-cyanGlow pl-6">
            <p className="system-label text-[10px] text-cyanGlow">Tech Ecosystem</p>
            <h1 className="terminal-heading mt-3 text-6xl font-black text-white sm:text-7xl">
              Event <span className="text-pinkGlow">Catalog</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-textDim">
              Every event is still fully dynamic, but the layout now presents them as curated
              technical modules instead of a uniform brochure grid.
            </p>
          </div>
        </FadeIn>
      </section>

      <div className="container-shell space-y-16 pb-16">
        {categories.map((category, categoryIndex) => {
          const categoryEvents = events.filter((event) => event.category === category);

          return (
            <section key={category}>
              <FadeIn delay={categoryIndex * 0.04}>
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <SectionHeading
                    eyebrow={`Category // ${String(categoryIndex + 1).padStart(2, "0")}`}
                    title={category}
                    description={`Dynamic entries in the ${category} stream.`}
                  />
                  <span className="system-label text-[10px] text-white/45">{categoryEvents.length} modules</span>
                </div>
              </FadeIn>
              {categoryEvents.length ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {categoryEvents.map((event, index) => (
                    <FadeIn key={event._id} delay={index * 0.04}>
                      <EventCard event={event} />
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title={`No ${category} modules found`}
                  description="This channel will populate automatically when events are added or updated from admin."
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
