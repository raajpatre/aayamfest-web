"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "firebase/auth";
import Galaxy from "@/components/Galaxy";
import { HomeTerminalFooter } from "@/components/sections/HomeTerminalFooter";
import { ActionButton } from "@/components/ui/ActionButton";
import { getFirebaseClientAuth } from "@/lib/firebase-client";

const fieldShell =
  "w-full rounded-2xl border border-white/10 bg-black/45 px-4 py-3 font-mono text-sm text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-cyan-400/45 focus:bg-black/65 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_0_24px_rgba(34,211,238,0.14)]";

const labelClass = "mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/84";

export default function AmbassadorPortalPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" | "" }>({
    text: "",
    type: ""
  });

  useEffect(() => {
    const auth = getFirebaseClientAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/ambassador/dashboard");
      }
    });
  }, [router]);

  async function handleLogin() {
    setSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const auth = getFirebaseClientAuth();
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/ambassador/dashboard");
    } catch (error) {
      const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
      const text =
        code === "auth/user-not-found" || code === "auth/wrong-password"
          ? "Invalid email or password."
          : error instanceof Error
            ? error.message
            : "Failed to login.";

      setMessage({ text, type: "error" });
      setSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setMessage({ text: "Enter your email first to reset your password.", type: "error" });
      return;
    }

    try {
      const auth = getFirebaseClientAuth();
      await sendPasswordResetEmail(auth, email);
      setMessage({ text: "Password reset email sent. Check your inbox.", type: "success" });
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : "Could not send reset email.",
        type: "error"
      });
    }
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

      <section className="container-shell relative z-10 flex min-h-[80vh] items-center py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.36em] text-cyan-400 sm:text-sm">
              [ CA_PORTAL // AUTH_GATE ]
            </p>
            <h1 className="font-mono text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Access The
              <span className="block bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                Ambassador Dashboard
              </span>
            </h1>
            <p className="max-w-xl bg-gradient-to-r from-cyan-200 via-cyan-100 to-fuchsia-200 bg-clip-text font-mono text-base leading-8 text-transparent">
              Approved ambassadors can sign in here to track points, submit tasks, and monitor their position on the global relay board.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/38 p-4 backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300/80">
                  [ ENTRY ]
                </p>
                <p className="mt-3 font-mono text-sm leading-7 text-white/74">
                  Use the email approved by Team AAYAM and the password you set from the welcome mail.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/38 p-4 backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fuchsia-300/80">
                  [ RESET ]
                </p>
                <p className="mt-3 font-mono text-sm leading-7 text-white/74">
                  If access is lost, enter your email and trigger a password reset directly from this portal.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-black/48 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-400">
              [ LOGIN_SEQUENCE ]
            </p>
            <h2 className="mt-4 font-mono text-3xl font-black uppercase text-white">CA Portal</h2>

            <div className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className={fieldShell}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="john@college.edu"
                />
              </div>

              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={fieldShell}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-fuchsia-300/80 transition-colors hover:text-fuchsia-200"
                >
                  &gt; forgot_password
                </button>
              </div>

              {message.text ? (
                <div
                  className={`rounded-2xl px-4 py-3 font-mono text-sm ${
                    message.type === "error"
                      ? "border border-red-400/25 bg-red-500/10 text-red-200"
                      : "border border-cyan-400/25 bg-cyan-500/10 text-cyan-100"
                  }`}
                >
                  {message.text}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleLogin}
                  className="command-btn inline-flex min-w-[220px] items-center justify-center bg-pinkGlow px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.24em] text-[#510051] shadow-[0_0_20px_rgba(255,0,255,0.35)] transition-all duration-150 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "[ LOGGING_IN ]" : "[ OPEN_PORTAL ]"}
                </button>
                <ActionButton href="/ambassador/apply" variant="secondary" className="min-w-[220px]">
                  [ APPLY_FIRST ]
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeTerminalFooter lightLinks />
    </main>
  );
}
