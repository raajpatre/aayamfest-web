import type { Metadata } from "next";
import { SquadPage } from "@/components/sections/SquadPage";

export const metadata: Metadata = {
  title: "The Squad",
  description:
    "Meet the core team behind Aayam 2026 — the organizers, designers, and engineers powering NST's national tech fest.",
};

export default function TeamPage() {
  return <SquadPage />;
}
