"use client";

import { useEffect, useRef, useState } from "react";
import Galaxy from "@/components/Galaxy";
import styles from "./WarpSpeedIntro.module.css";

type IntroPhase = "prompt" | "blackout" | "warp" | "flash" | "done";
const DURATION = 3600;
const BLACKOUT_DURATION = 550;
const PARTICLE_COUNT = 280;
const COLORS = [
  [244, 124, 233],
  [131, 245, 255],
  [168, 85, 247],
  [59, 130, 246]
] as const;

type Particle = {
  x: number;
  y: number;
  speed: number;
  size: number;
  color: (typeof COLORS)[number];
};

export function WarpSpeedIntro({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<IntroPhase>("prompt");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "warp") {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      setPhase("done");
      return;
    }

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
    };

    const createParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 140 + Math.random() * 190;
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        speed: Math.random() * 1.45 + 0.8,
        size: Math.random() * 2 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      };
    };

    const ease = (progress: number) =>
      progress < 0.7
        ? Math.pow(progress / 0.7, 3)
        : 1 - Math.pow((progress - 0.7) / 0.3, 2) * 0.3;

    const render = (now: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }

      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const intensity = ease(progress);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      const speed = 2 + (48 - 2) * intensity;
      const streakLength = intensity * 150;

      const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 240);
      glow.addColorStop(0, `rgba(244,124,233,${0.12 + intensity * 0.12})`);
      glow.addColorStop(0.45, `rgba(131,245,255,${0.06 + intensity * 0.08})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((particle, index) => {
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));

        if (
          particle.x < -100 ||
          particle.x > width + 100 ||
          particle.y < -100 ||
          particle.y > height + 100
        ) {
          particlesRef.current[index] = createParticle();
          return;
        }

        const nx = dx / distance;
        const ny = dy / distance;

        particle.x += nx * particle.speed * speed;
        particle.y += ny * particle.speed * speed;

        const size = particle.size * (1 + intensity * 3) * (distance / 200 + 0.45);
        const alpha = Math.min(1, 0.28 + intensity * 0.72) * Math.min(1, distance / 70);

        ctx.beginPath();
        ctx.moveTo(particle.x - nx * streakLength, particle.y - ny * streakLength);
        ctx.lineTo(particle.x, particle.y);
        ctx.strokeStyle = `rgba(${particle.color[0]},${particle.color[1]},${particle.color[2]},${alpha})`;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.92})`;
        ctx.fill();
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }

      setPhase("flash");
    };

    resize();
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, createParticle);
    startTimeRef.current = null;
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "flash") return;

    const completeTimer = window.setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 700);

    return () => window.clearTimeout(completeTimer);
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase !== "blackout") return;

    const blackoutTimer = window.setTimeout(() => {
      setPhase("warp");
    }, BLACKOUT_DURATION);

    return () => window.clearTimeout(blackoutTimer);
  }, [phase]);

  if (phase === "done") {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.galaxyLayer}>
        <Galaxy
          mouseInteraction={false}
          glowIntensity={0.45}
          density={1.1}
          speed={0.7}
          hueShift={210}
          saturation={0.55}
          rotationSpeed={0.08}
          transparent={false}
        />
      </div>
      <canvas ref={canvasRef} className={styles.canvas} />

      {phase === "prompt" || phase === "blackout" ? (
        <div className={styles.prompt}>
          <div className={`${styles.promptCopy} ${phase === "blackout" ? styles.promptCopyFade : ""}`}>
            <p className={styles.eyebrow}>`entry_protocol --init`</p>
            <h1 className={styles.title}>Ready To Step Beyond The Known?</h1>
            <p className={styles.copy}>
              $ confirm jump sequence
              <br />
              $ launch warp corridor
              <br />
              $ arrive at aayam.home
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.button} onClick={() => setPhase("blackout")}>
                &gt; initiate_warp
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {phase === "warp" ? <div className={styles.warpOverlay} /> : null}

      <div className={`${styles.flash} ${phase === "flash" ? styles.flashActive : ""}`} />
      <div className={`${styles.blackout} ${phase === "blackout" ? styles.blackoutActive : ""}`} />
    </div>
  );
}
