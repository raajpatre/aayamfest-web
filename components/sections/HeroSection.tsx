"use client";

import { motion } from "framer-motion";
import { ActionButton } from "@/components/ui/ActionButton";
import { FestLogo } from "@/components/ui/FestLogo";
import { GridScan } from "@/components/ui/GridScan";

export function HeroSection({
  festName,
  backdropImage
}: {
  festName: string;
  backdropImage?: string;
}) {
  return (
    <section className="terminal-shell relative min-h-[calc(100vh-78px)] overflow-hidden">
      <div className="absolute inset-0">
        <GridScan
          className="z-0 opacity-80"
          linesColor="#35283f"
          scanColor="#ff9ffc"
          gridScale={0.11}
          enableWebcam={false}
          enablePost
          scanOpacity={0.48}
        />
        {backdropImage ? (
          <div className="pointer-events-none absolute inset-0">
            <div
              className="noise-mask h-full w-full bg-cover bg-center opacity-20 grayscale contrast-150"
              style={{ backgroundImage: `url(${backdropImage})` }}
            />
          </div>
        ) : (
          <div className="terminal-grid absolute inset-0 opacity-35" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-base/10 via-base/75 to-base" />
      </div>

      <div className="container-shell relative z-10 flex min-h-[calc(100vh-78px)] items-center py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="data-line">ID: AAYAM_CORE_P01</p>
            <div className="mt-8">
              <FestLogo
                className="h-[72px] w-[272px] drop-shadow-[0_0_22px_rgba(255,255,255,0.12)] sm:h-[104px] sm:w-[390px] lg:h-[134px] lg:w-[500px]"
                priority
              />
            </div>
            <p className="system-label mt-4 text-sm text-amberGlow sm:text-base">
              Step Beyond the Known
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-textDim">
              {festName} is a technical breach into the next century for coders, robotics crews,
              makers, and campus operators competing inside a neon-drenched fest grid.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ActionButton href="/events">Enter The Future</ActionButton>
              <ActionButton href="/sponsors" variant="ghost">
                View Protocols
              </ActionButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="space-y-4"
          >
            <div className="terminal-panel p-6">
              <div className="flex items-center justify-between">
                <span className="system-label text-[10px] text-cyanGlow">Signal</span>
                <span className="system-label text-[10px] text-pinkGlow">Live</span>
              </div>
              <div className="relative mt-4 h-44 overflow-hidden bg-panel">
                <div className="terminal-grid absolute inset-0 opacity-40" />
                <div className="absolute inset-y-0 w-24 animate-sweep bg-gradient-to-r from-transparent via-cyanGlow/20 to-transparent" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="terminal-panel p-5">
                <p className="system-label text-[10px] text-textDim">Latency</p>
                <p className="terminal-heading mt-4 text-3xl font-black text-cyanGlow">14MS</p>
              </div>
              <div className="terminal-panel p-5">
                <p className="system-label text-[10px] text-textDim">Encryption</p>
                <p className="terminal-heading mt-4 text-3xl font-black text-pinkGlow">AES_256</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
