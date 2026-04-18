"use client";

import { useState, useRef, useEffect } from "react";

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close popup when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed bottom-[4.5rem] right-5 z-[10020] flex flex-col items-center">
      {/* Popup */}
      <div
        ref={popupRef}
        className={`absolute bottom-[calc(100%+0.625rem)] right-0 min-w-[260px] rounded-2xl border border-cyan-400/25 bg-black/80 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(34,211,238,0.12)] backdrop-blur-xl transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        <p className="mb-2.5 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/70"
           style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
          Need Help?
        </p>
        <div className="space-y-2">
          <a
            href="https://easebuzz.in/link/B8EIK"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300 transition-colors group-hover:bg-cyan-400/20">
              {/* Registration / form icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </span>
            <span className="text-[11px] leading-tight text-white/90 transition-colors group-hover:text-cyan-200"
                  style={{ fontFamily: "'Space Grotesk', Inter, sans-serif", letterSpacing: "0.04em" }}>
              Facing issues registering on Unstop?<br />
              <span className="text-cyan-400/80 group-hover:text-cyan-300">Register here →</span>
            </span>
          </a>

          <a
            href="https://www.instagram.com/aayamfest"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 transition-all duration-200 hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.06]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-fuchsia-400/10 text-fuchsia-300 transition-colors group-hover:bg-fuchsia-400/20">
              {/* Instagram icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </span>
            <span className="text-[11px] leading-tight text-white/90 transition-colors group-hover:text-fuchsia-200"
                  style={{ fontFamily: "'Space Grotesk', Inter, sans-serif", letterSpacing: "0.04em" }}>
              Other issues?<br />
              <span className="text-fuchsia-400/80 group-hover:text-fuchsia-300">Contact us on Instagram →</span>
            </span>
          </a>
        </div>
      </div>

      {/* Help Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Help"
        aria-expanded={isOpen}
        className={`inline-flex items-center justify-center rounded-full border px-3 py-3 backdrop-blur-md transition-all duration-300 ${
          isOpen
            ? "border-cyan-300/90 bg-black/55 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.32),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
            : "border-white/20 bg-black/55 text-white/70 shadow-[0_0_12px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.2)]"
        }`}
      >
        {/* Question-mark / help icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </button>
    </div>
  );
}
