"use client";

import { useRef, useState } from "react";

export function AudioController() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      <audio ref={audioRef} src="/assets/bgm.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggleAudio}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className={`fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full border px-4 py-3 font-mono text-xs uppercase tracking-[0.28em] backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? "border-cyan-300/90 bg-black/55 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.32),inset_0_1px_0_0_rgba(255,255,255,0.08)] [text-shadow:0_0_12px_rgba(34,211,238,0.55)]"
            : "border-white/20 bg-black/50 text-white/78 shadow-[0_0_0_rgba(0,0,0,0)] hover:border-cyan-300/45 hover:text-cyan-100"
        } ${!isPlaying ? "audio-controller-attention" : ""}`}
      >
        <span>[ BGM : {isPlaying ? "ON" : "OFF"} ]</span>
        <span className={`flex items-end gap-1 ${isPlaying ? "opacity-100" : "opacity-60"}`}>
          {[0, 1, 2, 3].map((bar) => (
            <span
              key={bar}
              className={`audio-eq-bar ${isPlaying ? "bg-cyan-300" : "bg-white/25"}`}
              style={{ animationDelay: `${bar * 0.14}s` }}
            />
          ))}
        </span>
      </button>
    </>
  );
}
