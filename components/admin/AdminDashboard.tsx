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

function panelButton(kind: "primary" | "ghost" | "danger" = "primary") {
  if (kind === "danger") {
    return "command-btn bg-rose-500/90 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white";
  }
  if (kind === "ghost") {
    return "command-btn border border-outlineSoft/35 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white";
  }
  return "command-btn bg-pinkGlow px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#510051]";
}

function formatListLabel(primary: string, secondary: string) {
  return (
    <div>
      <p className="terminal-heading text-lg font-black text-white">{primary}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">{secondary}</p>
    </div>
  );
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
      title="Event Registration"
      description="Manage every dynamic feed powering the public AAYAM experience: countdown, prize pool, event modules, sponsor hierarchy, and operator roster."
    >
      {(error || notice) && (
        <div
          className={`mb-6 border px-4 py-3 text-sm ${
            error
              ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
              : "border-cyanGlow/25 bg-cyanGlow/10 text-cyanGlow"
          }`}
        >
          {error || notice}
        </div>
      )}

      <div className="mb-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <AdminSection
          title="System Settings"
          description="Update the main public signals broadcast across hero, contact, countdown, and sponsor call-to-action modules."
        >
          <div className="grid gap-6 md:grid-cols-2">
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
            <FormField label="Prize Pool">
              <input
                value={settings?.totalPrizePool || ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...(current || { ...emptySettings, _id: "draft" }),
                    totalPrizePool: event.target.value
                  }))
                }
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
                rows={3}
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
                className={inputStyles()}
              />
            </FormField>
            {(["instagram", "linkedin", "twitter", "youtube"] as const).map((key) => (
              <FormField key={key} label={`${key} Link`}>
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
          <button type="button" onClick={() => startTransition(() => void saveSettings())} className={`mt-8 ${panelButton()}`}>
            {isPending ? "Saving..." : "Save Site Settings"}
          </button>
        </AdminSection>

        <div className="space-y-6">
          <div className="terminal-panel p-6">
            <p className="system-label text-[10px] text-amberGlow">System Logs</p>
            <div className="mt-4 space-y-3 text-xs uppercase tracking-[0.18em] text-white/45">
              <p>&gt; Initializing operator dashboard...</p>
              <p>&gt; Syncing event registry...</p>
              <p>&gt; Sponsors online: {sponsors.length}</p>
              <p>&gt; Team dossiers active: {teamMembers.length}</p>
            </div>
          </div>
          <div className="terminal-panel terminal-grid p-6">
            <p className="system-label text-[10px] text-cyanGlow">Live Counts</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="terminal-heading text-4xl font-black text-white">{events.length}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">Events</p>
              </div>
              <div>
                <p className="terminal-heading text-4xl font-black text-pinkGlow">{sponsors.length}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">Sponsors</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminSection title="Event Registry" description="Create, update, delete, and feature public event modules.">
          <div className="grid gap-6">
            <FormField label="Title">
              <input value={eventForm.title} onChange={(event) => setEventForm((current) => ({ ...current, title: event.target.value }))} className={inputStyles()} />
            </FormField>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Category">
                <select value={eventForm.category} onChange={(event) => setEventForm((current) => ({ ...current, category: event.target.value as EventCategory }))} className={inputStyles()}>
                  {eventCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Team Size">
                <input value={eventForm.teamSize} onChange={(event) => setEventForm((current) => ({ ...current, teamSize: event.target.value }))} className={inputStyles()} />
              </FormField>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Prize Pool">
                <input value={eventForm.prizePool} onChange={(event) => setEventForm((current) => ({ ...current, prizePool: event.target.value }))} className={inputStyles()} />
              </FormField>
              <FormField label="Registration Link">
                <input value={eventForm.registrationLink} onChange={(event) => setEventForm((current) => ({ ...current, registrationLink: event.target.value }))} className={inputStyles()} />
              </FormField>
            </div>
            <FormField label="Description">
              <textarea rows={4} value={eventForm.description} onChange={(event) => setEventForm((current) => ({ ...current, description: event.target.value }))} className={inputStyles()} />
            </FormField>
            <FormField label="Poster Image">
              <AssetUploader label="Poster" value={eventForm.posterImage} onChange={(value) => setEventForm((current) => ({ ...current, posterImage: value }))} folder="aayam/events" />
            </FormField>
            <label className="flex items-center gap-3 border border-outlineSoft/25 px-4 py-3 text-sm text-white/70">
              <input type="checkbox" checked={eventForm.isFeatured} onChange={(event) => setEventForm((current) => ({ ...current, isFeatured: event.target.checked }))} />
              Mark as featured on homepage
            </label>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => startTransition(() => void saveEvent())} className={panelButton()}>
                {editingEventId ? "Update Event" : "Create Event"}
              </button>
              {editingEventId ? (
                <button type="button" onClick={() => { setEditingEventId(null); setEventForm(emptyEvent); }} className={panelButton("ghost")}>
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-10 space-y-3">
            {events.map((event) => (
              <div key={event._id} className="border border-outlineSoft/25 bg-[#151518] px-4 py-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {formatListLabel(event.title, `${event.category} • ${event.prizePool} • ${event.teamSize}`)}
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => { setEditingEventId(event._id); setEventForm({ title: event.title, category: event.category, description: event.description, prizePool: event.prizePool, teamSize: event.teamSize, posterImage: event.posterImage, registrationLink: event.registrationLink, isFeatured: event.isFeatured }); }} className={panelButton("ghost")}>Edit</button>
                    <button type="button" onClick={() => startTransition(() => void removeItem(`/api/events/${event._id}`, "Event deleted"))} className={panelButton("danger")}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="Sponsor Network" description="Upload logos, assign hierarchy, and keep the sponsor architecture in sync.">
          <div className="grid gap-6">
            <FormField label="Name">
              <input value={sponsorForm.name} onChange={(event) => setSponsorForm((current) => ({ ...current, name: event.target.value }))} className={inputStyles()} />
            </FormField>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Category">
                <select value={sponsorForm.category} onChange={(event) => setSponsorForm((current) => ({ ...current, category: event.target.value as SponsorCategory }))} className={inputStyles()}>
                  {sponsorCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Website Link">
                <input value={sponsorForm.websiteLink} onChange={(event) => setSponsorForm((current) => ({ ...current, websiteLink: event.target.value }))} className={inputStyles()} />
              </FormField>
            </div>
            <FormField label="Logo">
              <AssetUploader label="Logo" value={sponsorForm.logo} onChange={(value) => setSponsorForm((current) => ({ ...current, logo: value }))} folder="aayam/sponsors" />
            </FormField>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => startTransition(() => void saveSponsor())} className={panelButton()}>
                {editingSponsorId ? "Update Sponsor" : "Create Sponsor"}
              </button>
              {editingSponsorId ? (
                <button type="button" onClick={() => { setEditingSponsorId(null); setSponsorForm(emptySponsor); }} className={panelButton("ghost")}>
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-10 space-y-3">
            {sponsors.map((sponsor) => (
              <div key={sponsor._id} className="border border-outlineSoft/25 bg-[#151518] px-4 py-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {formatListLabel(sponsor.name, sponsor.category)}
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => { setEditingSponsorId(sponsor._id); setSponsorForm({ name: sponsor.name, category: sponsor.category, logo: sponsor.logo, websiteLink: sponsor.websiteLink }); }} className={panelButton("ghost")}>Edit</button>
                    <button type="button" onClick={() => startTransition(() => void removeItem(`/api/sponsors/${sponsor._id}`, "Sponsor deleted"))} className={panelButton("danger")}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>

      <div className="mt-6">
        <AdminSection title="Operator Roster" description="Keep the team page in sync with live members and LinkedIn endpoints.">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField label="Name">
              <input value={teamForm.name} onChange={(event) => setTeamForm((current) => ({ ...current, name: event.target.value }))} className={inputStyles()} />
            </FormField>
            <FormField label="Role">
              <input value={teamForm.role} onChange={(event) => setTeamForm((current) => ({ ...current, role: event.target.value }))} className={inputStyles()} />
            </FormField>
            <FormField label="LinkedIn">
              <input value={teamForm.linkedin} onChange={(event) => setTeamForm((current) => ({ ...current, linkedin: event.target.value }))} className={inputStyles()} />
            </FormField>
            <FormField label="Image">
              <AssetUploader label="Image" value={teamForm.image} onChange={(value) => setTeamForm((current) => ({ ...current, image: value }))} folder="aayam/team" />
            </FormField>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => startTransition(() => void saveTeamMember())} className={panelButton()}>
              {editingTeamId ? "Update Member" : "Create Member"}
            </button>
            {editingTeamId ? (
              <button type="button" onClick={() => { setEditingTeamId(null); setTeamForm(emptyTeamMember); }} className={panelButton("ghost")}>
                Cancel Edit
              </button>
            ) : null}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member._id} className="border border-outlineSoft/25 bg-[#151518] p-5">
                {formatListLabel(member.name, member.role)}
                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" onClick={() => { setEditingTeamId(member._id); setTeamForm({ name: member.name, role: member.role, image: member.image, linkedin: member.linkedin }); }} className={panelButton("ghost")}>Edit</button>
                  <button type="button" onClick={() => startTransition(() => void removeItem(`/api/team/${member._id}`, "Team member deleted"))} className={panelButton("danger")}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>
    </AdminShell>
  );
}
