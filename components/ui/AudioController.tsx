"use client";

import { useEffect, useRef, useState } from "react";

export function AudioController() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    const handleFirstInteraction = async () => {
      setHasInteracted(true);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      if (!audio.paused) return;
      await playAudio();
    };

    audio.volume = 1;
    void playAudio();
    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/aayam.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggleAudio}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className={`fixed bottom-5 right-5 z-[10020] inline-flex items-end gap-1.5 rounded-full border px-3 py-3 backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? "border-cyan-300/90 bg-black/55 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.32),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
            : "border-red-400/70 bg-black/55 text-red-300 shadow-[0_0_18px_rgba(248,113,113,0.2),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
        } ${!isPlaying ? "audio-controller-attention" : ""}`}
      >
        <span className="sr-only">
          {isPlaying ? "Background music is playing" : hasInteracted ? "Background music is muted" : "Background music is ready to play"}
        </span>
        <span className={`flex items-end gap-1 ${isPlaying ? "opacity-100" : "opacity-90"}`}>
          {[0, 1, 2, 3].map((bar, index) => (
            <span
              key={bar}
              className={`audio-eq-bar ${isPlaying ? "bg-cyan-300" : "bg-red-400"} ${!isPlaying ? "audio-eq-bar-muted" : ""}`}
              style={{ animationDelay: `${index * 0.14}s` }}
            />
          ))}
        </span>
      </button>
    </>
  );
}
