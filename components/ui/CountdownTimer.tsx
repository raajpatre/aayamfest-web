"use client";

import { useEffect, useState } from "react";
import { formatCountdown } from "@/lib/format";

export function CountdownTimer({ targetDate }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState(() => formatCountdown(targetDate));

  useEffect(() => {
    setTimeLeft(formatCountdown(targetDate));
    const interval = window.setInterval(() => {
      setTimeLeft(formatCountdown(targetDate));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  if (!targetDate || !timeLeft) {
    return <p className="text-textDim">Fest date will appear here once updated from admin.</p>;
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {units.map((unit) => (
        <div key={unit.label} className="glass-panel rounded-[1.5rem] p-5 text-center">
          <div className="font-display text-3xl text-white sm:text-4xl">
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.28em] text-textDim">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
