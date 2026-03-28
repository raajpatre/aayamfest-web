"use client";

import { useEffect, useState } from "react";
import { formatCountdown } from "@/lib/format";

const cornerClass =
  "pointer-events-none absolute h-4 w-4 border-cyan-300/80 drop-shadow-[0_0_10px_rgba(103,232,249,0.35)]";

export function CountdownTimer({ targetDate = "2026-04-24T00:00:00" }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState(() => formatCountdown(targetDate));

  useEffect(() => {
    setTimeLeft(formatCountdown(targetDate));
    const interval = window.setInterval(() => {
      setTimeLeft(formatCountdown(targetDate));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  if (!targetDate || !timeLeft) {
    return <p className="text-sm uppercase tracking-[0.18em] text-textDim">Fest date awaiting operator sync</p>;
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative w-full overflow-hidden border border-white/20 bg-black/60 px-4 py-6 shadow-[0_18px_44px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md">
            <span className={`${cornerClass} left-3 top-3 border-l border-t`} />
            <span className={`${cornerClass} right-3 top-3 border-r border-t`} />
            <span className={`${cornerClass} bottom-3 left-3 border-b border-l`} />
            <span className={`${cornerClass} bottom-3 right-3 border-b border-r`} />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-white/10" />
            <div className="relative flex min-h-[136px] items-center justify-center">
              <span className="text-5xl font-bold text-white [text-shadow:0_6px_24px_rgba(0,0,0,0.8),0_0_14px_rgba(255,255,255,0.08)] sm:text-6xl lg:text-7xl">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
          </div>
          <div className="mt-3 text-center font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
