"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Galaxy from "@/components/Galaxy";
import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { ActionButton } from "@/components/ui/ActionButton";
import { getFirebaseClientAuth, getFirebaseClientStorage } from "@/lib/firebase-client";

type Profile = {
  id: string;
  fullname: string;
  caCode: string;
  totalPoints?: number;
  totalReferrals?: number;
};

type Submission = {
  id: string;
  taskType: string;
  points?: number;
  pointsAwarded?: number;
  status: "pending" | "approved" | "rejected";
  adminNote?: string;
  submittedAt: string;
};

type LeaderboardEntry = {
  rank: number;
  name: string;
  college: string;
  tier: string;
  totalPoints: number;
  caCode: string;
};

type TaskConfig = {
  title: string;
  points: number;
  inputType: "url" | "file";
  placeholder: string;
  storageLabel: string;
};

const tasks: TaskConfig[] = [
  { title: "Instagram Reel", points: 50, inputType: "url", placeholder: "https://instagram.com/reel/...", storageLabel: "Paste reel link" },
  { title: "Instagram Story", points: 20, inputType: "file", placeholder: "", storageLabel: "Upload screenshot" },
  { title: "LinkedIn Post", points: 30, inputType: "url", placeholder: "https://linkedin.com/posts/...", storageLabel: "Paste post link" },
  { title: "Twitter/X Post", points: 20, inputType: "url", placeholder: "https://x.com/status/...", storageLabel: "Paste post link" },
  { title: "Campus Poster", points: 25, inputType: "file", placeholder: "", storageLabel: "Upload photo" },
  { title: "WhatsApp Promo", points: 15, inputType: "file", placeholder: "", storageLabel: "Upload screenshot" }
];

const fieldShell =
  "w-full rounded-2xl border border-white/10 bg-black/45 px-4 py-3 font-mono text-sm text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-cyan-400/45 focus:bg-black/65 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_0_24px_rgba(34,211,238,0.14)]";

function getTierMeta(totalPoints: number) {
  if (totalPoints >= 500) {
    return { label: "PLATINUM", nextMilestone: 500, nextLabel: "MAX", progress: 100, accent: "text-slate-100" };
  }
  if (totalPoints >= 250) {
    return {
      label: "GOLD",
      nextMilestone: 500,
      nextLabel: "Platinum",
      progress: (totalPoints / 500) * 100,
      accent: "text-amber-300"
    };
  }
  if (totalPoints >= 100) {
    return {
      label: "SILVER",
      nextMilestone: 250,
      nextLabel: "Gold",
      progress: (totalPoints / 250) * 100,
      accent: "text-slate-200"
    };
  }
  return {
    label: "BRONZE",
    nextMilestone: 100,
    nextLabel: "Silver",
    progress: totalPoints,
    accent: "text-orange-300"
  };
}

export default function AmbassadorDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [linkValues, setLinkValues] = useState<Record<string, string>>({});
  const [fileValues, setFileValues] = useState<Record<string, File | null>>({});
  const [submittingTask, setSubmittingTask] = useState<string | null>(null);

  async function fetchDashboardData(activeUser: User) {
    const token = await activeUser.getIdToken();

    const [dataRes, leaderboardRes] = await Promise.all([
      fetch("/api/ambassador/ca-data", {
        headers: { Authorization: `Bearer ${token}` }
      }),
      fetch("/api/ambassador/leaderboard", {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]);

    const dataJson = (await dataRes.json()) as {
      success: boolean;
      error?: string;
      profile?: Profile;
      submissions?: Submission[];
    };
    const leaderboardJson = (await leaderboardRes.json()) as {
      success: boolean;
      error?: string;
      leaderboard?: LeaderboardEntry[];
    };

    if (!dataRes.ok || !dataJson.success || !dataJson.profile) {
      throw new Error(dataJson.error || "Failed to load CA profile");
    }

    if (!leaderboardRes.ok || !leaderboardJson.success || !leaderboardJson.leaderboard) {
      throw new Error(leaderboardJson.error || "Failed to load leaderboard");
    }

    setProfile(dataJson.profile);
    setSubmissions(dataJson.submissions || []);
    setLeaderboard(leaderboardJson.leaderboard);
  }

  useEffect(() => {
    const auth = getFirebaseClientAuth();
    return onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        router.replace("/ambassador/portal");
        return;
      }

      setUser(authUser);
      setLoading(true);
      setError("");

      try {
        await fetchDashboardData(authUser);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    });
  }, [router]);

  const totalPoints = Number(profile?.totalPoints) || 0;
  const approvedCount = submissions.filter((submission) => submission.status === "approved").length;
  const totalReferrals = Number(profile?.totalReferrals) || 0;
  const rank = useMemo(() => {
    if (!profile) return "-";
    const entry = leaderboard.find((item) => item.caCode === profile.caCode);
    return entry ? `#${entry.rank}` : "-";
  }, [leaderboard, profile]);
  const tierMeta = getTierMeta(totalPoints);

  async function handleTaskSubmit(task: TaskConfig) {
    if (!user || !profile) return;

    setSubmittingTask(task.title);
    setError("");

    try {
      let submissionData = "";
      let storagePath = "";

      if (task.inputType === "url") {
        const value = (linkValues[task.title] || "").trim();
        if (!value) throw new Error("Please enter a valid URL.");
        submissionData = value;
      } else {
        const storage = getFirebaseClientStorage();
        const file = fileValues[task.title];
        if (!file) throw new Error("Please select an image file to upload.");
        if (file.size > 2 * 1024 * 1024) {
          throw new Error("File is too large. Max size is 2MB.");
        }

        const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
        storagePath = `ca-submissions/${profile.caCode}/${task.title.replace(/\s/g, "_")}/${Date.now()}_${safeName}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, file);
        submissionData = await getDownloadURL(storageRef);
      }

      const token = await user.getIdToken();
      const response = await fetch("/api/ambassador/ca-submit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          caCode: profile.caCode,
          caName: profile.fullname,
          taskType: task.title,
          points: task.points,
          submissionData,
          storagePath
        })
      });

      const result = (await response.json()) as { success: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit task");
      }

      setLinkValues((current) => ({ ...current, [task.title]: "" }));
      setFileValues((current) => ({ ...current, [task.title]: null }));
      await fetchDashboardData(user);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while submitting your task."
      );
    } finally {
      setSubmittingTask(null);
    }
  }

  async function handleLogout() {
    const auth = getFirebaseClientAuth();
    await signOut(auth);
    router.replace("/ambassador/portal");
  }

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        <div className="fixed inset-0 z-[-50] bg-black">
          <Galaxy
            hueShift={214}
            density={0.92}
            glowIntensity={0.34}
            saturation={0.26}
            mouseRepulsion={false}
            speed={0.72}
            transparent
          />
        </div>
        <div className="flex min-h-screen items-center justify-center font-mono text-cyan-300">
          AUTHENTICATING...
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="fixed inset-0 z-[-50] bg-black">
        <Galaxy
          hueShift={214}
          density={0.92}
          glowIntensity={0.34}
          saturation={0.26}
          mouseRepulsion={false}
          speed={0.72}
          transparent
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[-40] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_58%,rgba(0,0,0,0.92)_100%)]" />

      <section className="container-shell relative z-10 py-14 sm:py-18">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.36em] text-cyan-400 sm:text-sm">
              [ CA_DASHBOARD // LIVE ]
            </p>
            <h1 className="mt-4 font-mono text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Welcome, {profile?.fullname?.split(" ")[0] || "Ambassador"}
            </h1>
            <p className="mt-4 font-mono text-sm leading-8 text-white/74 sm:text-base">
              CA Code:{" "}
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">
                {profile?.caCode || "N/A"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <ActionButton href="/ambassador" variant="secondary" className="min-w-[210px]">
              [ OVERVIEW ]
            </ActionButton>
            <button
              type="button"
              onClick={handleLogout}
              className="command-btn inline-flex min-w-[210px] items-center justify-center border border-white/20 bg-black/45 px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.24em] text-white transition-all duration-150 hover:border-fuchsia-300/45 hover:text-fuchsia-200"
            >
              [ LOGOUT ]
            </button>
          </div>
        </div>
      </section>

      <section className="container-shell relative z-10 pb-20">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total Points", value: totalPoints },
            { label: "Tasks Completed", value: approvedCount },
            { label: "Global Rank", value: rank },
            { label: "Referrals Brought", value: totalReferrals }
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] border border-white/10 bg-black/48 p-5 text-center shadow-[0_16px_50px_rgba(0,0,0,0.34)] backdrop-blur-md"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/46">
                {stat.label}
              </p>
              <p className="mt-4 font-mono text-4xl font-bold text-cyan-200">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[30px] border border-cyan-400/22 bg-black/50 p-6 shadow-[0_18px_80px_rgba(0,0,0,0.4)] backdrop-blur-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-400/78">
            [ CLEARANCE_STATUS ]
          </p>
          <h2 className={`mt-4 font-mono text-3xl font-black uppercase ${tierMeta.accent}`}>
            {tierMeta.label} Ambassador
          </h2>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-white transition-all duration-700"
              style={{ width: `${Math.min(tierMeta.progress, 100)}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-white/58">
            {tierMeta.label === "PLATINUM"
              ? `${totalPoints} points // max tier reached`
              : `${totalPoints} / ${tierMeta.nextMilestone} to ${tierMeta.nextLabel}`}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-mono text-2xl font-black uppercase text-white sm:text-3xl">
            Submit Tasks
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task.title}
                className="rounded-[28px] border border-white/10 bg-black/48 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-mono text-lg font-bold uppercase text-white">{task.title}</h3>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300">
                    {task.points} pts
                  </span>
                </div>

                <div className="mt-5">
                  {task.inputType === "url" ? (
                    <input
                      className={fieldShell}
                      value={linkValues[task.title] || ""}
                      onChange={(event) =>
                        setLinkValues((current) => ({ ...current, [task.title]: event.target.value }))
                      }
                      placeholder={task.placeholder}
                    />
                  ) : (
                    <div className="space-y-3">
                      <label className="block cursor-pointer rounded-2xl border border-dashed border-cyan-400/35 bg-black/36 px-4 py-4 font-mono text-sm text-white/64 transition-all hover:border-cyan-300 hover:text-white">
                        {fileValues[task.title]?.name || task.storageLabel}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) =>
                            setFileValues((current) => ({
                              ...current,
                              [task.title]: event.target.files?.[0] || null
                            }))
                          }
                        />
                      </label>
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Max file size: 2MB
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleTaskSubmit(task)}
                  disabled={submittingTask === task.title}
                  className="command-btn mt-5 inline-flex w-full items-center justify-center border border-cyan-400/28 bg-cyan-400/8 px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.24em] text-cyan-200 transition-all duration-150 hover:bg-cyan-400/16 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submittingTask === task.title ? "[ SUBMITTING ]" : "[ SUBMIT_TASK ]"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-mono text-2xl font-black uppercase text-white sm:text-3xl">
              Submission History
            </h2>
            <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-black/48 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="min-w-full font-mono text-sm">
                  <thead className="bg-white/5 text-cyan-300">
                    <tr>
                      {["Date", "Task", "Points", "Status", "Admin Note"].map((heading) => (
                        <th key={heading} className="px-4 py-4 text-left text-[10px] uppercase tracking-[0.26em]">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-white/54">
                          No submissions yet.
                        </td>
                      </tr>
                    ) : (
                      submissions.map((submission) => (
                        <tr key={submission.id} className="border-t border-white/8">
                          <td className="px-4 py-4 text-white/68">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-white">{submission.taskType}</td>
                          <td className="px-4 py-4 text-white/78">
                            {submission.pointsAwarded || submission.points || 0}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${
                                submission.status === "approved"
                                  ? "border border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                                  : submission.status === "rejected"
                                    ? "border border-red-400/25 bg-red-500/10 text-red-300"
                                    : "border border-amber-400/25 bg-amber-500/10 text-amber-300"
                              }`}
                            >
                              {submission.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-white/58">{submission.adminNote || "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-mono text-2xl font-black uppercase text-white sm:text-3xl">
              Global Leaderboard
            </h2>
            <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-black/48 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="min-w-full font-mono text-sm">
                  <thead className="bg-white/5 text-cyan-300">
                    <tr>
                      {["Rank", "Ambassador", "College", "Tier", "Points"].map((heading) => (
                        <th key={heading} className="px-4 py-4 text-left text-[10px] uppercase tracking-[0.26em]">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry) => {
                      const isCurrent = profile?.caCode === entry.caCode;
                      return (
                        <tr
                          key={`${entry.caCode}-${entry.rank}`}
                          className={`border-t border-white/8 ${isCurrent ? "bg-cyan-500/8" : ""}`}
                        >
                          <td className="px-4 py-4 text-white/76">#{entry.rank}</td>
                          <td className="px-4 py-4 text-white">{entry.name}</td>
                          <td className="px-4 py-4 text-white/68">{entry.college}</td>
                          <td className="px-4 py-4 text-white/76">{entry.tier}</td>
                          <td className="px-4 py-4 text-cyan-200">{entry.totalPoints}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeTerminalFooter lightLinks />
    </main>
  );
}
