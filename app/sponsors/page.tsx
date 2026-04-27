import type { Metadata } from "next";
import Image from "next/image";
import DecryptedText from "@/components/DecryptedText";
import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { SponsorWhySection } from "@/components/sections/SponsorWhySection";
import { TerminalBackground } from "@/components/sections/TerminalBackground";
import { SponsorMarquee } from "@/components/ui/SponsorMarquee";
import { getSponsors } from "@/lib/data";
import { SponsorRecord } from "@/lib/types";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Meet the sponsors powering Aayam 2026 — NST's national tech fest in Bengaluru. Partner with India's next-gen tech talent.",
};

const FEATURED_IN_KIND_SPONSORS: SponsorRecord[] = [
  {
    _id: "featured-inkind-f-community-india",
    name: "F Community India",
    category: "In-Kind",
    logo: "/sponsors/f-community-india.png",
    websiteLink: "#"
  },
  {
    _id: "featured-inkind-truscholar",
    name: "TruScholar",
    category: "In-Kind",
    logo: "/sponsors/truscholar.png",
    websiteLink: "https://truscholar.io/"
  },
  {
    _id: "featured-inkind-prera",
    name: "Prera",
    category: "In-Kind",
    logo: "/sponsors/prera.png",
    websiteLink: "https://prera.co.in/"
  },
  {
    _id: "featured-inkind-abhibus",
    name: "AbhiBus",
    category: "In-Kind",
    logo: "/sponsors/abhibus.png",
    websiteLink: "#"
  }
];

const FEATURED_GOLD_SPONSORS: SponsorRecord[] = [
  {
    _id: "featured-gold-unstop",
    name: "Unstop",
    category: "Concert",
    logo: "/sponsors/Unstop.jpg",
    websiteLink: "https://unstop.com/"
  }
];

const framedCardClass =
  "bg-black/40 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-cyan-400/50 hover:bg-black/60 relative overflow-hidden group";

const framelessCardClass =
  "relative flex items-center justify-center transition-all duration-300 group";

function SponsorCard({
  sponsor,
  heightClass,
  logoClass,
  showName = true,
  framed = true
}: {
  sponsor: { _id: string; name: string; logo: string; websiteLink: string; category: string };
  heightClass: string;
  logoClass: string;
  showName?: boolean;
  framed?: boolean;
}) {
  const isFeaturedInKindSponsor = FEATURED_IN_KIND_SPONSORS.some(
    (featuredSponsor) => featuredSponsor._id === sponsor._id
  );

  return (
    <a
      href={sponsor.websiteLink}
      target="_blank"
      rel="noreferrer"
      className={`${framed ? framedCardClass : framelessCardClass} ${heightClass}`}
    >
      {framed ? (
        <>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.08),transparent_30%)]" />
        </>
      ) : null}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-8 text-center">
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={320}
            height={160}
            className={`${logoClass} ${isFeaturedInKindSponsor ? "max-h-16 md:max-h-20" : ""} h-auto max-w-full object-contain`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        {showName ? (
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.22em] text-white/80">{sponsor.name}</p>
        ) : null}
      </div>
    </a>
  );
}

function TierSection({
  title,
  sponsors,
  containerClassName,
  cardHeightClass,
  emptyLabel,
  logoClass,
  showName = true,
  framed = true
}: {
  title: string;
  sponsors: { _id: string; name: string; logo: string; websiteLink: string; category: string }[];
  containerClassName: string;
  cardHeightClass: string;
  emptyLabel: string;
  logoClass: string;
  showName?: boolean;
  framed?: boolean;
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-center font-mono text-orange-500 mb-6 tracking-[0.34em] uppercase">{title}</h2>
      {sponsors.length ? (
        <div className={containerClassName}>
          {sponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor._id}
              sponsor={sponsor}
              heightClass={cardHeightClass}
              logoClass={logoClass}
              showName={showName}
              framed={framed}
            />
          ))}
        </div>
      ) : (
        <div className={`${framedCardClass} mx-auto min-h-[140px] max-w-3xl px-8 text-center font-mono text-sm uppercase tracking-[0.22em] text-white/55`}>
          {emptyLabel}
        </div>
      )}
    </section>
  );
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors().catch(() => []);
  const titleSponsors = sponsors.filter((sponsor) => sponsor.category === "Title");
  const goldSponsors = [
    ...FEATURED_GOLD_SPONSORS,
    ...sponsors.filter((sponsor) => sponsor.category === "Concert")
  ];
  const silverSponsors = sponsors.filter((sponsor) => sponsor.category === "Associate");
  const communityPartners = [
    ...FEATURED_IN_KIND_SPONSORS,
    ...sponsors.filter((sponsor) => sponsor.category === "In-Kind")
  ];

  return (
    <main className="relative isolate min-h-screen overflow-hidden text-white">
      <TerminalBackground />

      <section className="container-shell relative z-10 py-16">
        <div className="max-w-5xl text-left">
          <span className="font-mono text-sm tracking-[0.34em] text-cyan-400">
            [ STRATEGIC ALLIANCE NETWORK ]
          </span>
          <h1 className="mt-5 text-4xl font-black uppercase tracking-[-0.04em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.08)] sm:text-5xl lg:text-6xl">
            Partnership Protocols
          </h1>
          <div className="mt-6 max-w-3xl text-lg leading-8 sm:text-[1.27rem]">
            <DecryptedText
              text="System backers online. Scanning the strategic alliances and entities keeping our servers running at max capacity."
              animateOn="view"
              sequential
              speed={20}
              maxIterations={10}
              characters="X@#$01&*!"
              className="font-mono text-white/88"
              encryptedClassName="font-mono text-cyan-300/75"
              parentClassName="block"
            />
          </div>
        </div>
      </section>

      <div className="container-shell relative z-10 space-y-20 pb-20">
        <TierSection
          title="[ TITLE SPONSOR ]"
          sponsors={titleSponsors}
          containerClassName="mx-auto w-full max-w-4xl"
          cardHeightClass="h-64 w-full"
          emptyLabel="TITLE SPONSOR CHANNEL OFFLINE"
          logoClass="max-h-32 w-auto object-contain"
        />

        <TierSection
          title="[ POWERED BY ]"
          sponsors={goldSponsors}
          containerClassName="mx-auto flex flex-wrap items-center justify-center gap-12"
          cardHeightClass="h-48 w-full max-w-sm"
          emptyLabel="POWERED BY CHANNELS OFFLINE"
          logoClass="max-h-32 w-auto object-contain"
          framed={false}
          showName={false}
        />

        <TierSection
          title="[ SILVER SPONSORS ]"
          sponsors={silverSponsors}
          containerClassName="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
          cardHeightClass="h-32 w-full"
          emptyLabel="SILVER TIER CHANNELS OFFLINE"
          logoClass="max-h-14 w-auto object-contain"
        />

        <section className="space-y-6">
          <h2 className="mb-6 text-center font-mono uppercase tracking-[0.34em] text-orange-500">
            [ BRONZE SPONSORS ]
          </h2>
          <div className="mx-auto w-full max-w-6xl">
            <SponsorMarquee sponsors={communityPartners} />
          </div>
        </section>

        <SponsorWhySection />

        <section className="max-w-3xl mx-auto px-4 py-24 text-center">
          <p className="mb-4 font-mono text-sm tracking-widest text-cyan-400 animate-pulse">
            {"> SYSTEM.READY // SPONSOR_GATEWAY_OPEN"}
          </p>
          <h2 className="mb-6 font-mono text-4xl font-bold text-white md:text-5xl">
            INITIATE HANDSHAKE
          </h2>
          <p className="mb-10 font-mono text-lg text-gray-400">
            Ready to inject resources into the grid? Establish a secure uplink to submit your
            partnership proposal.
          </p>
          <a
            href="https://forms.gle/zNV1WHNpBuxStDcF9"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
          >
            <span className="relative inline-flex overflow-hidden rounded-lg border-2 border-amber-300 bg-amber-400/10 px-10 py-5 font-mono text-lg font-bold uppercase tracking-[0.2em] text-amber-300 transition-all duration-300 hover:bg-amber-300 hover:text-black hover:shadow-[0_0_30px_rgba(252,211,77,0.6)]">
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-35deg] transition-transform duration-700 group-hover:translate-x-[180%]" />
              <span className="relative z-10 inline-flex items-center gap-3">
                [ ESTABLISH SECURE UPLINK ]
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </span>
            </span>
          </a>
        </section>
      </div>

      <HomeTerminalFooter lightLinks />
    </main>
  );
}
