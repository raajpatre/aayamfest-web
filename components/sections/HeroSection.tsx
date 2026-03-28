"use client";

import { motion } from "framer-motion";
import { ActionButton } from "@/components/ui/ActionButton";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="ambient-orb left-[8%] top-24 h-56 w-56 bg-violetGlow" />
      <div className="ambient-orb right-[8%] top-20 h-48 w-48 bg-cyanGlow" />
      <div className="container-shell relative flex min-h-[calc(100vh-80px)] items-center py-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-5 text-sm uppercase tracking-[0.38em] text-cyanGlow">
              Modern Futurism
            </p>
            <h1 className="font-display text-5xl uppercase leading-none text-white sm:text-7xl lg:text-[5.8rem]">
              AAYAM <span className="text-gradient">Tech Fest</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Step Beyond the Known
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-textDim">
              A sleek, future-forward stage for coders, builders, creators, and campus talent to
              collide through high-impact events, premium experiences, and bold ideas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionButton href="/events">Explore Events</ActionButton>
              <ActionButton href="/admin" variant="secondary">
                Open Admin Dashboard
              </ActionButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="glass-panel relative rounded-[2rem] p-6 shadow-glow"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(84,243,255,0.25),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,94,219,0.22),transparent_30%)]" />
            <div className="relative grid gap-4">
              <div className="rounded-[1.5rem] border border-cyanGlow/20 bg-[#07101f] p-4">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-textDim">
                  <span>Signal</span>
                  <span className="text-cyanGlow">Live</span>
                </div>
                <div className="h-40 rounded-[1.25rem] bg-hero-grid bg-[length:38px_38px] [mask-image:linear-gradient(180deg,black,transparent)]" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-textDim">Arena</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Innovation Grid</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-textDim">Mode</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Future Ready</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
