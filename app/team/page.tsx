import Image from "next/image";
import { EmptyState } from "@/components/sections/EmptyState";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteConfig, getTeamMembers } from "@/lib/data";

export default async function TeamPage() {
  const [teamMembers, siteConfig] = await Promise.all([
    getTeamMembers().catch(() => []),
    getSiteConfig().catch(() => null)
  ]);

  return (
    <main className="pb-10">
      <section className="container-shell py-14 sm:py-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Team"
            title="The people behind the signal"
            description="Team members, roles, and LinkedIn profiles are all controlled from the admin dashboard."
          />
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.length ? (
            teamMembers.map((member, index) => (
              <FadeIn key={member._id} delay={index * 0.05}>
                <GlassCard className="overflow-hidden">
                  <div className="relative h-72">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                    <p className="mt-2 text-textDim">{member.role}</p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-cyanGlow/40"
                    >
                      LinkedIn
                    </a>
                  </div>
                </GlassCard>
              </FadeIn>
            ))
          ) : (
            <EmptyState
              title="Team members will appear here"
              description="Add members from admin to populate this page with names, roles, photos, and LinkedIn links."
            />
          )}
        </div>
      </section>
      <Footer siteConfig={siteConfig} />
    </main>
  );
}
