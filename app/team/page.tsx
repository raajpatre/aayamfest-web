import Image from "next/image";
import { EmptyState } from "@/components/sections/EmptyState";
import { Footer } from "@/components/sections/Footer";
import { ActionButton } from "@/components/ui/ActionButton";
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
    <main>
      <section className="container-shell py-16">
        <FadeIn>
          <SectionHeading
            eyebrow="Operator Roster"
            title="The people behind the signal"
            description="Team profiles stay dynamic while the presentation shifts to a more cinematic dossier style."
          />
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.length ? (
            teamMembers.map((member, index) => (
              <FadeIn key={member._id} delay={index * 0.05}>
                <GlassCard className="group overflow-hidden p-1">
                  <div className="noise-mask relative h-80 overflow-hidden border border-outlineSoft/25">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-base/15 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="system-label text-[10px] text-cyanGlow">{member.role}</p>
                    <h3 className="terminal-heading mt-3 text-2xl font-black text-white">{member.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-textDim">
                      Linked operator profile routed through the fest network.
                    </p>
                    <ActionButton href={member.linkedin} external variant="ghost" className="mt-6 w-full">
                      Open LinkedIn
                    </ActionButton>
                  </div>
                </GlassCard>
              </FadeIn>
            ))
          ) : (
            <EmptyState
              title="Operator roster is offline"
              description="Add team members from admin to broadcast their profiles here."
            />
          )}
        </div>
      </section>
      <Footer siteConfig={siteConfig} />
    </main>
  );
}
