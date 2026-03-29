"use client";

import { FormEvent, useState } from "react";
import Galaxy from "@/components/Galaxy";
import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { ActionButton } from "@/components/ui/ActionButton";

const fieldShell =
  "w-full rounded-2xl border border-white/10 bg-black/45 px-4 py-3 font-mono text-sm text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-cyan-400/45 focus:bg-black/65 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_0_24px_rgba(34,211,238,0.14)]";

const labelClass = "mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/84";

type FormState = {
  fullname: string;
  email: string;
  phone: string;
  gender: string;
  college: string;
  course: string;
  year: string;
  city: string;
  linkedin: string;
  instagram: string;
  why: string;
  experience: string;
  agree: boolean;
};

const initialFormState: FormState = {
  fullname: "",
  email: "",
  phone: "",
  gender: "",
  college: "",
  course: "",
  year: "",
  city: "",
  linkedin: "",
  instagram: "",
  why: "",
  experience: "",
  agree: false
};

export default function AmbassadorApplyPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.agree) {
      setError("Please confirm the declaration before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/ambassador/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullname: form.fullname,
          email: form.email,
          phone: form.phone,
          gender: form.gender,
          college: form.college,
          course: form.course,
          year: form.year,
          city: form.city,
          linkedin: form.linkedin,
          instagram: form.instagram,
          why: form.why,
          experience: form.experience
        })
      });

      const result = (await response.json()) as { success: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Submission failed");
      }

      setSubmitted(true);
      setForm(initialFormState);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while submitting your application."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="fixed inset-0 z-[-50] bg-black">
        <Galaxy
          hueShift={218}
          density={0.92}
          glowIntensity={0.34}
          saturation={0.3}
          mouseRepulsion={false}
          speed={0.72}
          transparent
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[-40] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_58%,rgba(0,0,0,0.92)_100%)]" />

      <section className="container-shell relative z-10 py-14 sm:py-18">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.36em] text-cyan-400 sm:text-sm">
            [ AMBASSADOR_APPLICATION // OPEN ]
          </p>
          <h1 className="mt-4 font-mono text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
            Initiate
            <span className="block bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
              Ambassador Uplink
            </span>
          </h1>
          <p className="mt-5 max-w-3xl bg-gradient-to-r from-cyan-200 via-cyan-100 to-fuchsia-200 bg-clip-text font-mono text-base leading-8 text-transparent sm:text-lg">
            Submit your details to enter the AAYAM campus ambassador network. Once reviewed, approved candidates receive their CA code and portal access instructions by email.
          </p>
        </div>
      </section>

      <section className="container-shell relative z-10 pb-20">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-black/48 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-8">
          {submitted ? (
            <div className="rounded-[28px] border border-cyan-400/20 bg-black/42 p-8 text-center shadow-[0_0_36px_rgba(34,211,238,0.12)]">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-400">
                [ APPLICATION_RECEIVED ]
              </p>
              <h2 className="mt-4 bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text font-mono text-3xl font-black uppercase text-transparent sm:text-4xl">
                Signal Captured
              </h2>
              <p className="mx-auto mt-5 max-w-2xl bg-gradient-to-r from-cyan-200 via-cyan-100 to-fuchsia-200 bg-clip-text font-mono text-sm leading-8 text-transparent sm:text-base">
                Your ambassador application has been submitted successfully. Watch your inbox for the confirmation mail and next-step instructions from Team AAYAM.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <ActionButton href="/ambassador" variant="secondary" className="min-w-[220px]">
                  [ RETURN_TO_OVERVIEW ]
                </ActionButton>
                <ActionButton href="/ambassador/apply" variant="primary" className="min-w-[220px]">
                  [ SUBMIT_ANOTHER_ENTRY ]
                </ActionButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/36 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300/80">
                    [ PERSONAL_INFO ]
                  </p>
                  <p className="mt-2 font-mono text-sm leading-7 text-white/72">
                    Start with your core identity and contact data.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/36 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fuchsia-300/80">
                    [ CAMPUS_CONTEXT ]
                  </p>
                  <p className="mt-2 font-mono text-sm leading-7 text-white/72">
                    Help us understand your campus footprint and motivation.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullname" className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    id="fullname"
                    className={fieldShell}
                    required
                    value={form.fullname}
                    onChange={(event) => setForm({ ...form, fullname: event.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={fieldShell}
                    required
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    className={fieldShell}
                    required
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className={labelClass}>
                    Gender
                  </label>
                  <select
                    id="gender"
                    className={fieldShell}
                    value={form.gender}
                    onChange={(event) => setForm({ ...form, gender: event.target.value })}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="college" className={labelClass}>
                    College / University *
                  </label>
                  <input
                    id="college"
                    className={fieldShell}
                    required
                    value={form.college}
                    onChange={(event) => setForm({ ...form, college: event.target.value })}
                    placeholder="Name of your institution"
                  />
                </div>
                <div>
                  <label htmlFor="course" className={labelClass}>
                    Course / Branch *
                  </label>
                  <input
                    id="course"
                    className={fieldShell}
                    required
                    value={form.course}
                    onChange={(event) => setForm({ ...form, course: event.target.value })}
                    placeholder="e.g. B.Tech CSE"
                  />
                </div>
                <div>
                  <label htmlFor="year" className={labelClass}>
                    Year of Study *
                  </label>
                  <select
                    id="year"
                    className={fieldShell}
                    required
                    value={form.year}
                    onChange={(event) => setForm({ ...form, year: event.target.value })}
                  >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City *
                  </label>
                  <input
                    id="city"
                    className={fieldShell}
                    required
                    value={form.city}
                    onChange={(event) => setForm({ ...form, city: event.target.value })}
                    placeholder="Your college city"
                  />
                </div>
                <div>
                  <label htmlFor="linkedin" className={labelClass}>
                    LinkedIn Profile
                  </label>
                  <input
                    id="linkedin"
                    type="url"
                    className={fieldShell}
                    value={form.linkedin}
                    onChange={(event) => setForm({ ...form, linkedin: event.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <label htmlFor="instagram" className={labelClass}>
                    Instagram Handle
                  </label>
                  <input
                    id="instagram"
                    className={fieldShell}
                    value={form.instagram}
                    onChange={(event) => setForm({ ...form, instagram: event.target.value })}
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="why" className={labelClass}>
                  Why do you want to be a Campus Ambassador? *
                </label>
                <textarea
                  id="why"
                  rows={5}
                  className={fieldShell}
                  required
                  value={form.why}
                  onChange={(event) => setForm({ ...form, why: event.target.value })}
                  placeholder="Tell us your motivation and what you can bring to the programme..."
                />
              </div>

              <div>
                <label htmlFor="experience" className={labelClass}>
                  Prior event, outreach, or marketing experience
                </label>
                <textarea
                  id="experience"
                  rows={4}
                  className={fieldShell}
                  value={form.experience}
                  onChange={(event) => setForm({ ...form, experience: event.target.value })}
                  placeholder="Briefly describe any relevant experience..."
                />
              </div>

              <label className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/36 p-4">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(event) => setForm({ ...form, agree: event.target.checked })}
                  className="mt-1 h-4 w-4 accent-cyan-400"
                />
                <span className="font-mono text-sm leading-7 text-white/76">
                  I agree to be contacted by Team AAYAM and confirm that the information provided
                  here is accurate.
                </span>
              </label>

              {error ? (
                <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="command-btn inline-flex min-w-[240px] items-center justify-center bg-pinkGlow px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.24em] text-[#510051] shadow-[0_0_20px_rgba(255,0,255,0.35)] transition-all duration-150 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "[ SUBMITTING_SIGNAL ]" : "[ SUBMIT_APPLICATION ]"}
                </button>
                <ActionButton href="/ambassador" variant="secondary" className="min-w-[240px]">
                  [ RETURN_TO_OVERVIEW ]
                </ActionButton>
              </div>
            </form>
          )}
        </div>
      </section>

      <HomeTerminalFooter lightLinks />
    </main>
  );
}
