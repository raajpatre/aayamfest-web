import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteConfig } from "@/lib/data";

export default async function ContactPage() {
  const siteConfig = await getSiteConfig().catch(() => null);

  return (
    <main className="pb-10">
      <section className="container-shell py-14 sm:py-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Contact"
            title="Reach the fest crew"
            description="A lightweight contact surface powered entirely by the editable site settings."
          />
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10">
          <GlassCard className="grid gap-6 p-8 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyanGlow">Email</p>
              <p className="mt-3 text-lg text-white">
                {siteConfig?.contactDetails?.email || "Update email from admin"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyanGlow">Phone</p>
              <p className="mt-3 text-lg text-white">
                {siteConfig?.contactDetails?.phone || "Update phone from admin"}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.28em] text-cyanGlow">Address</p>
              <p className="mt-3 text-lg text-white">
                {siteConfig?.contactDetails?.address || "Update address from admin"}
              </p>
            </div>
          </GlassCard>
        </FadeIn>
      </section>
      <Footer siteConfig={siteConfig} />
    </main>
  );
}
