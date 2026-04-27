"use client";

import { useEffect, useState } from "react";

export function usePerformance() {
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      const ua = navigator.userAgent.toLowerCase();
      
      // 1. Detect TV devices
      const isTV = /tv|smarttv|tizen|webos|googletv|appletv|hbbtv|pov_tv|netcast.tv|viera|aquos|sharp|sony|bravia|philips|mitsubishi|roku|firetv|crusty/i.test(ua);
      
      // 2. Check hardware constraints where available
      // @ts-ignore
      const memory = navigator.deviceMemory || 8; // 4GB or less is low
      const cores = navigator.hardwareConcurrency || 4; // Dual core or less is low
      
      // 3. Check for low-end mobile / tablets or reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (isTV || memory <= 4 || cores <= 2 || prefersReducedMotion) {
        console.log("Performance Mode Enabled: ", { isTV, memory, cores, prefersReducedMotion });
        setIsLowPerf(true);
        document.documentElement.classList.add("low-perf");
      } else {
        document.documentElement.classList.remove("low-perf");
      }
    };

    checkPerformance();
  }, []);

  return { isLowPerf };
}
