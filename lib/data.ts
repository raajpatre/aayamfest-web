import { unstable_noStore as noStore } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Event from "@/models/Event";
import SiteConfig from "@/models/SiteConfig";
import Sponsor from "@/models/Sponsor";
import TeamMember from "@/models/TeamMember";
import {
  EventRecord,
  SiteConfigRecord,
  SponsorRecord,
  TeamMemberRecord
} from "@/lib/types";

export async function getSiteConfig() {
  noStore();
  await connectToDatabase();
  const config = await SiteConfig.findOne().lean<SiteConfigRecord | null>();
  return config;
}

export async function getEvents() {
  noStore();
  await connectToDatabase();
  return Event.find().sort({ createdAt: -1 }).lean<EventRecord[]>();
}

export async function getFeaturedEvents() {
  noStore();
  await connectToDatabase();
  return Event.find({ isFeatured: true })
    .sort({ updatedAt: -1 })
    .limit(4)
    .lean<EventRecord[]>();
}

export async function getSponsors() {
  noStore();
  await connectToDatabase();
  return Sponsor.find().sort({ createdAt: -1 }).lean<SponsorRecord[]>();
}

export async function getTeamMembers() {
  noStore();
  await connectToDatabase();
  return TeamMember.find().sort({ createdAt: -1 }).lean<TeamMemberRecord[]>();
}
