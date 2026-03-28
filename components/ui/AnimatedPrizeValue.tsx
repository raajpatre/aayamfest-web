"use client";

import { useEffect, useState } from "react";

function formatIndianNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function AnimatedPrizeValue({ value }: { value?: string }) {
  const numericValue = Number(String(value || "").replace(/[^\d]/g, ""));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!numericValue) {
      return;
    }

    let frame = 0;
    const totalFrames = 48;
    const step = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(numericValue * eased));
      if (frame < totalFrames) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [numericValue]);

  if (!numericValue) {
    return <span>{value || "To be announced"}</span>;
  }

  return <span>{`\u20B9${formatIndianNumber(display)}+`}</span>;
}
