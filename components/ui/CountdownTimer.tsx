"use client";

import { useEffect, useState } from "react";
import { formatCountdown } from "@/lib/format";

const cornerClass =
  "pointer-events-none absolute h-4 w-4 border-cyan-300/80 drop-shadow-[0_0_10px_rgba(103,232,249,0.35)]";
const zeroTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

export function CountdownTimer({ targetDate = "2026-04-24T00:00:00" }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState(zeroTime);

  useEffect(() => {
    setTimeLeft(formatCountdown(targetDate) ?? zeroTime);
    const interval = window.setInterval(() => {
      setTimeLeft(formatCountdown(targetDate) ?? zeroTime);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  if (!targetDate) {
    return <p className="text-sm uppercase tracking-[0.18em] text-textDim">Fest date awaiting operator sync</p>;
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative w-full overflow-hidden border border-white/20 bg-black/60 px-2 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:px-4 sm:py-6">
            <span className={`${cornerClass} left-2 top-2 h-3 w-3 border-l border-t sm:left-3 sm:top-3 sm:h-4 sm:w-4`} />
            <span className={`${cornerClass} right-2 top-2 h-3 w-3 border-r border-t sm:right-3 sm:top-3 sm:h-4 sm:w-4`} />
            <span className={`${cornerClass} bottom-2 left-2 h-3 w-3 border-b border-l sm:bottom-3 sm:left-3 sm:h-4 sm:w-4`} />
            <span className={`${cornerClass} bottom-2 right-2 h-3 w-3 border-b border-r sm:bottom-3 sm:right-3 sm:h-4 sm:w-4`} />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-white/10" />
            <div className="relative flex min-h-[82px] items-center justify-center sm:min-h-[136px]">
              <span className="text-2xl font-bold text-white [text-shadow:0_6px_24px_rgba(0,0,0,0.8),0_0_14px_rgba(255,255,255,0.08)] sm:text-6xl lg:text-7xl">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
          </div>
          <div className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.22em] text-gray-400 sm:mt-3 sm:text-xs sm:tracking-[0.3em]">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
