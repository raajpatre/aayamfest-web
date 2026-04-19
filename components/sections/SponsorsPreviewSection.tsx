"use client";

import Image from "next/image";
import { SponsorRecord } from "@/lib/types";

const previewSponsors: SponsorRecord[] = [
  {
    _id: "preview-f-community-india",
    name: "F Community India",
    category: "In-Kind",
    logo: "/sponsors/f-community-india.png",
    websiteLink: "#"
  },
  {
    _id: "preview-truscholar",
    name: "TruScholar",
    category: "In-Kind",
    logo: "/sponsors/truscholar.png",
    websiteLink: "https://truscholar.io/"
  },
  {
    _id: "preview-prera",
    name: "Prera",
    category: "In-Kind",
    logo: "/sponsors/prera.png",
    websiteLink: "https://prera.co.in/"
  },
  {
    _id: "preview-abhibus",
    name: "AbhiBus",
    category: "In-Kind",
    logo: "/sponsors/abhibus.png",
    websiteLink: "#"
  },
  {
    _id: "preview-unstop",
    name: "Unstop",
    category: "Concert",
    logo: "/sponsors/Unstop.jpg",
    websiteLink: "https://unstop.com/"
  }
];

const marqueeSponsors = [...previewSponsors, ...previewSponsors, ...previewSponsors];
const arcSponsors = [...previewSponsors, ...previewSponsors, ...previewSponsors, ...previewSponsors];

function isWideSponsor(name: string) {
  return name === "F Community India" || name === "AbhiBus" || name === "Unstop";
}

function getPreviewSlotClass(name: string) {
  if (name === "AbhiBus" || name === "Unstop") {
    return "w-72";
  }
  if (name === "F Community India") {
    return "w-64";
  }
  return "w-56";
}

function getPreviewLogoClass(name: string, isDesktop: boolean) {
  if (name === "AbhiBus" || name === "Unstop") {
    return isDesktop ? "max-h-36" : "max-h-32";
  }
  if (name === "F Community India") {
    return isDesktop ? "max-h-30" : "max-h-24";
  }
  return isDesktop ? "max-h-24" : "max-h-20";
}

export function SponsorsPreviewSection() {
  return (
    <section className="relative py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-sm tracking-widest text-orange-500">[ PARTNERS ]</span>
          <h2 className="mt-4 text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] sm:text-4xl">
            SPONSORS PREVIEW
          </h2>
        </div>

        <div className="relative mt-10">
          <div className="relative space-y-3 py-4 md:hidden">
            <div className="relative overflow-hidden">
              <div className="flex min-w-max animate-marquee items-center gap-8 px-2 py-3">
                {marqueeSponsors.map((sponsor, index) => (
                  <a
                    key={`${sponsor._id}-${index}`}
                    href={sponsor.websiteLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`${getPreviewSlotClass(sponsor.name)} flex h-20 shrink-0 items-center justify-center`}
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={160}
                      height={64}
                      className={`${getPreviewLogoClass(sponsor.name, false)} w-auto object-contain`}
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="flex min-w-max animate-marquee items-center gap-8 px-2 py-3 [animation-direction:reverse]">
                {marqueeSponsors.map((sponsor, index) => (
                  <a
                    key={`${sponsor._id}-reverse-${index}`}
                    href={sponsor.websiteLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`${getPreviewSlotClass(sponsor.name)} flex h-20 shrink-0 items-center justify-center`}
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={160}
                      height={64}
                      className={`${getPreviewLogoClass(sponsor.name, false)} w-auto object-contain`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden overflow-hidden py-6 md:block">
            <div className="sponsors-arc-track flex min-w-max items-center gap-14 px-6">
              {arcSponsors.map((sponsor, index) => (
                <a
                  key={`${sponsor._id}-arc-${index}`}
                  href={sponsor.websiteLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`${getPreviewSlotClass(sponsor.name)} sponsors-arc-item flex h-24 items-center justify-center`}
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={176}
                    height={72}
                    className={`${getPreviewLogoClass(sponsor.name, true)} w-auto object-contain`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
