import type { Metadata } from "next";
import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { TerminalCatalogPage } from "@/components/sections/TerminalCatalogPage";

export const metadata: Metadata = {
  title: "Events & Competitions",
  description:
    "Explore 13+ competitions at Aayam 2026 — Robosoccer, FPV Drone Racing, BugBash Hackathon, BGMI, CP contests & more. ₹4,00,000+ prize pool. April 24–25, Bengaluru.",
};

export default function EventsPage() {
  return (
    <main>
      <TerminalCatalogPage />
      <HomeTerminalFooter lightLinks />
    </main>
  );
}
