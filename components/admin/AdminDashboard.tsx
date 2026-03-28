"use client";

import { useEffect, useState, useTransition } from "react";
import { AdminSection } from "@/components/admin/AdminSection";
import { AdminShell } from "@/components/admin/AdminShell";
import { AssetUploader } from "@/components/admin/AssetUploader";
import { FormField, inputStyles } from "@/components/admin/FormField";
import {
  EventCategory,
  EventRecord,
  SiteConfigRecord,
  SponsorCategory,
  SponsorRecord,
  TeamMemberRecord
} from "@/lib/types";

const eventCategories: EventCategory[] = ["Robotics", "Hackathon", "CP", "Non-Tech"];
const sponsorCategories: SponsorCategory[] = ["Title", "Concert", "Associate", "In-Kind"];

type EmptyEventForm = Omit<EventRecord, "_id">;
type EmptySponsorForm = Omit<SponsorRecord, "_id">;
type EmptyTeamForm = Omit<TeamMemberRecord, "_id">;

const emptyEvent: EmptyEventForm = {
  title: "",
  category: "Hackathon",
  description: "",
  prizePool: "",
  teamSize: "",
  posterImage: "",
  registrationLink: "",
  isFeatured: false
};

const emptySponsor: EmptySponsorForm = {
  name: "",
  category: "Associate",
  logo: "",
  websiteLink: ""
};

const emptyTeamMember: EmptyTeamForm = {
  name: "",
  role: "",
  image: "",
  linkedin: ""
};

const emptySettings: Omit<SiteConfigRecord, "_id"> = {
  festName: "AAYAM Tech Fest",
  festDate: "",
  totalPrizePool: "",
  contactDetails: {
    email: "",
    phone: "",
    address: "",
    sponsorFormLink: ""
  },
  socialLinks: {
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: ""
  }
};

async function parseResponse(response: Response) {
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Something went wrong");
  }
  return result.data;
}

export function AdminDashboard() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [sponsors, setSponsors] = useState<SponsorRecord[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberRecord[]>([]);
  const [settings, setSettings] = useState<SiteConfigRecord | null>(null);
  const [eventForm, setEventForm] = useState<EmptyEventForm>(emptyEvent);
  const [sponsorForm, setSponsorForm] = useState<EmptySponsorForm>(emptySponsor);
  const [teamForm, setTeamForm] = useState<EmptyTeamForm>(emptyTeamMember);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      setError("");
      const [eventsData, sponsorsData, settingsData, teamData] = await Promise.all([
        fetch("/api/events").then(parseResponse),
        fetch("/api/sponsors").then(parseResponse),
        fetch("/api/site-config").then(parseResponse),
        fetch("/api/team").then(parseResponse)
      ]);

      setEvents(eventsData);
      setSponsors(sponsorsData);
      setSettings(settingsData);
      setTeamMembers(teamData);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load dashboard data");
    }
  }

  function saveMessage(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function renderBanner() {
    if (error) {
      return <div className="mb-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>;
    }
    if (notice) {
      return <div className="mb-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</div>;
    }
    return null;
  }

  async function saveEvent() {
    const method = editingEventId ? "PATCH" : "POST";
    const url = editingEventId ? `/api/events/${editingEventId}` : "/api/events";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventForm)
    }).then(parseResponse);
    saveMessage(editingEventId ? "Event updated" : "Event created");
    setEventForm(emptyEvent);
    setEditingEventId(null);
    await loadAll();
  }

  async function saveSponsor() {
    const method = editingSponsorId ? "PATCH" : "POST";
    const url = editingSponsorId ? `/api/sponsors/${editingSponsorId}` : "/api/sponsors";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sponsorForm)
    }).then(parseResponse);
    saveMessage(editingSponsorId ? "Sponsor updated" : "Sponsor created");
    setSponsorForm(emptySponsor);
    setEditingSponsorId(null);
    await loadAll();
  }

  async function saveTeamMember() {
    const method = editingTeamId ? "PATCH" : "POST";
    const url = editingTeamId ? `/api/team/${editingTeamId}` : "/api/team";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teamForm)
    }).then(parseResponse);
    saveMessage(editingTeamId ? "Team member updated" : "Team member created");
    setTeamForm(emptyTeamMember);
    setEditingTeamId(null);
    await loadAll();
  }

  async function removeItem(path: string, successMessage: string) {
    await fetch(path, { method: "DELETE" }).then(parseResponse);
    saveMessage(successMessage);
    await loadAll();
  }

  async function saveSettings() {
    await fetch("/api/site-config", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    }).then(parseResponse);
    saveMessage("Site settings updated");
    await loadAll();
  }

  return (
    <AdminShell
      title="Manage AAYAM Tech Fest"
      description="Everything on the public website is controlled here: hero data, countdown timing, prize pool, sponsors, events, and team members."
    >
      {renderBanner()}
      <div className="grid gap-6">
        <AdminSection
          title="Site Settings"
          description="Update core site information used across the home page, contact page, countdown, and sponsor CTA."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Fest Name">
              <input
                value={settings?.festName || ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...(current || { ...emptySettings, _id: "draft" }),
                    festName: event.target.value
                  }))
                }
                className={inputStyles()}
              />
            </FormField>
            <FormField label="Fest Date">
              <input
                type="datetime-local"
                value={settings?.festDate ? settings.festDate.slice(0, 16) : ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...(current || { ...emptySettings, _id: "draft" }),
                    festDate: event.target.value
                  }))
                }
                className={inputStyles()}
              />
            </FormField>
            <FormField label="Total Prize Pool">
              <input
                value={settings?.totalPrizePool || ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...(current || { ...emptySettings, _id: "draft" }),
                    totalPrizePool: event.target.value
                  }))
                }
                placeholder="₹4,00,000+"
                className={inputStyles()}
              />
            </FormField>
            <FormField label="Sponsor Form Link">
              <input
                value={settings?.contactDetails?.sponsorFormLink || ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...(current || { ...emptySettings, _id: "draft" }),
                    contactDetails: {
                      ...((current || emptySettings).contactDetails || emptySettings.contactDetails),
                      sponsorFormLink: event.target.value
                    }
                  }))
                }
                className={inputStyles()}
              />
            </FormField>
            <FormField label="Email">
              <input
                value={settings?.contactDetails?.email || ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...(current || { ...emptySettings, _id: "draft" }),
                    contactDetails: {
                      ...((current || emptySettings).contactDetails || emptySettings.contactDetails),
                      email: event.target.value
                    }
                  }))
                }
                className={inputStyles()}
              />
            </FormField>
            <FormField label="Phone">
              <input
                value={settings?.contactDetails?.phone || ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...(current || { ...emptySettings, _id: "draft" }),
                    contactDetails: {
                      ...((current || emptySettings).contactDetails || emptySettings.contactDetails),
                      phone: event.target.value
                    }
                  }))
                }
                className={inputStyles()}
              />
            </FormField>
            <FormField label="Address" className="md:col-span-2">
              <textarea
                value={settings?.contactDetails?.address || ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...(current || { ...emptySettings, _id: "draft" }),
                    contactDetails: {
                      ...((current || emptySettings).contactDetails || emptySettings.contactDetails),
                      address: event.target.value
                    }
                  }))
                }
                rows={3}
                className={inputStyles()}
              />
            </FormField>
            {(["instagram", "linkedin", "twitter", "youtube"] as const).map((key) => (
              <FormField key={key} label={`${key[0].toUpperCase()}${key.slice(1)} Link`}>
                <input
                  value={settings?.socialLinks?.[key] || ""}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...(current || { ...emptySettings, _id: "draft" }),
                      socialLinks: {
                        ...((current || emptySettings).socialLinks || emptySettings.socialLinks),
                        [key]: event.target.value
                      }
                    }))
                  }
                  className={inputStyles()}
                />
              </FormField>
            ))}
          </div>
          <button
            type="button"
            onClick={() => startTransition(() => void saveSettings())}
            className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {isPending ? "Saving..." : "Save Site Settings"}
          </button>
        </AdminSection>

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection
            title="Manage Events"
            description="Create, update, delete, and feature public event cards."
          >
            <div className="grid gap-4">
              <FormField label="Title">
                <input
                  value={eventForm.title}
                  onChange={(event) => setEventForm((current) => ({ ...current, title: event.target.value }))}
                  className={inputStyles()}
                />
              </FormField>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Category">
                  <select
                    value={eventForm.category}
                    onChange={(event) =>
                      setEventForm((current) => ({ ...current, category: event.target.value as EventCategory }))
                    }
                    className={inputStyles()}
                  >
                    {eventCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Team Size">
                  <input
                    value={eventForm.teamSize}
                    onChange={(event) =>
                      setEventForm((current) => ({ ...current, teamSize: event.target.value }))
                    }
                    className={inputStyles()}
                  />
                </FormField>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Prize Pool">
                  <input
                    value={eventForm.prizePool}
                    onChange={(event) =>
                      setEventForm((current) => ({ ...current, prizePool: event.target.value }))
                    }
                    className={inputStyles()}
                  />
                </FormField>
                <FormField label="Registration Link">
                  <input
                    value={eventForm.registrationLink}
                    onChange={(event) =>
                      setEventForm((current) => ({ ...current, registrationLink: event.target.value }))
                    }
                    className={inputStyles()}
                  />
                </FormField>
              </div>
              <FormField label="Description">
                <textarea
                  rows={4}
                  value={eventForm.description}
                  onChange={(event) =>
                    setEventForm((current) => ({ ...current, description: event.target.value }))
                  }
                  className={inputStyles()}
                />
              </FormField>
              <FormField label="Poster Image">
                <AssetUploader
                  label="Poster"
                  value={eventForm.posterImage}
                  onChange={(value) => setEventForm((current) => ({ ...current, posterImage: value }))}
                  folder="aayam/events"
                />
              </FormField>
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={eventForm.isFeatured}
                  onChange={(event) =>
                    setEventForm((current) => ({ ...current, isFeatured: event.target.checked }))
                  }
                />
                Mark as featured for homepage
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => startTransition(() => void saveEvent())}
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {editingEventId ? "Update Event" : "Create Event"}
                </button>
                {editingEventId ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingEventId(null);
                      setEventForm(emptyEvent);
                    }}
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700"
                  >
                    Cancel Edit
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {events.map((event) => (
                <div key={event._id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-950">{event.title}</p>
                      <p className="text-sm text-slate-500">
                        {event.category} • {event.prizePool} • {event.teamSize}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEventId(event._id);
                          setEventForm({
                            title: event.title,
                            category: event.category,
                            description: event.description,
                            prizePool: event.prizePool,
                            teamSize: event.teamSize,
                            posterImage: event.posterImage,
                            registrationLink: event.registrationLink,
                            isFeatured: event.isFeatured
                          });
                        }}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => startTransition(() => void removeItem(`/api/events/${event._id}`, "Event deleted"))}
                        className="rounded-full bg-rose-600 px-4 py-2 text-sm text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminSection>

          <AdminSection
            title="Manage Sponsors"
            description="Upload sponsor logos and assign hierarchy categories for the public sponsor page."
          >
            <div className="grid gap-4">
              <FormField label="Name">
                <input
                  value={sponsorForm.name}
                  onChange={(event) => setSponsorForm((current) => ({ ...current, name: event.target.value }))}
                  className={inputStyles()}
                />
              </FormField>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Category">
                  <select
                    value={sponsorForm.category}
                    onChange={(event) =>
                      setSponsorForm((current) => ({
                        ...current,
                        category: event.target.value as SponsorCategory
                      }))
                    }
                    className={inputStyles()}
                  >
                    {sponsorCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Website Link">
                  <input
                    value={sponsorForm.websiteLink}
                    onChange={(event) =>
                      setSponsorForm((current) => ({ ...current, websiteLink: event.target.value }))
                    }
                    className={inputStyles()}
                  />
                </FormField>
              </div>
              <FormField label="Logo">
                <AssetUploader
                  label="Logo"
                  value={sponsorForm.logo}
                  onChange={(value) => setSponsorForm((current) => ({ ...current, logo: value }))}
                  folder="aayam/sponsors"
                />
              </FormField>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => startTransition(() => void saveSponsor())}
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {editingSponsorId ? "Update Sponsor" : "Create Sponsor"}
                </button>
                {editingSponsorId ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSponsorId(null);
                      setSponsorForm(emptySponsor);
                    }}
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700"
                  >
                    Cancel Edit
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {sponsors.map((sponsor) => (
                <div key={sponsor._id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-950">{sponsor.name}</p>
                      <p className="text-sm text-slate-500">{sponsor.category}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSponsorId(sponsor._id);
                          setSponsorForm({
                            name: sponsor.name,
                            category: sponsor.category,
                            logo: sponsor.logo,
                            websiteLink: sponsor.websiteLink
                          });
                        }}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          startTransition(() =>
                            void removeItem(`/api/sponsors/${sponsor._id}`, "Sponsor deleted")
                          )
                        }
                        className="rounded-full bg-rose-600 px-4 py-2 text-sm text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminSection>
        </div>

        <AdminSection
          title="Manage Team"
          description="Update core team members and keep the public team page in sync with the latest leadership."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Name">
              <input
                value={teamForm.name}
                onChange={(event) => setTeamForm((current) => ({ ...current, name: event.target.value }))}
                className={inputStyles()}
              />
            </FormField>
            <FormField label="Role">
              <input
                value={teamForm.role}
                onChange={(event) => setTeamForm((current) => ({ ...current, role: event.target.value }))}
                className={inputStyles()}
              />
            </FormField>
            <FormField label="LinkedIn">
              <input
                value={teamForm.linkedin}
                onChange={(event) =>
                  setTeamForm((current) => ({ ...current, linkedin: event.target.value }))
                }
                className={inputStyles()}
              />
            </FormField>
            <FormField label="Image">
              <AssetUploader
                label="Image"
                value={teamForm.image}
                onChange={(value) => setTeamForm((current) => ({ ...current, image: value }))}
                folder="aayam/team"
              />
            </FormField>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => startTransition(() => void saveTeamMember())}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {editingTeamId ? "Update Member" : "Create Member"}
            </button>
            {editingTeamId ? (
              <button
                type="button"
                onClick={() => {
                  setEditingTeamId(null);
                  setTeamForm(emptyTeamMember);
                }}
                className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member._id} className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-950">{member.name}</p>
                <p className="mt-1 text-sm text-slate-500">{member.role}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTeamId(member._id);
                      setTeamForm({
                        name: member.name,
                        role: member.role,
                        image: member.image,
                        linkedin: member.linkedin
                      });
                    }}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      startTransition(() => void removeItem(`/api/team/${member._id}`, "Team member deleted"))
                    }
                    className="rounded-full bg-rose-600 px-4 py-2 text-sm text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>
    </AdminShell>
  );
}
