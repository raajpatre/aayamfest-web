import Image from "next/image";
import { EventRecord } from "@/lib/types";
import { ActionButton } from "@/components/ui/ActionButton";
import { GlassCard } from "@/components/ui/GlassCard";

export function EventCard({ event }: { event: EventRecord }) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="relative h-52">
        <Image
          src={event.posterImage}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.28em] text-cyanGlow">{event.category}</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">{event.title}</h3>
        <p className="mt-3 text-sm leading-6 text-textDim">{event.description}</p>
        <div className="mt-5 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="block text-xs uppercase tracking-[0.22em] text-textDim">Prize Pool</span>
            <span className="mt-2 block font-semibold">{event.prizePool}</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="block text-xs uppercase tracking-[0.22em] text-textDim">Team Size</span>
            <span className="mt-2 block font-semibold">{event.teamSize}</span>
          </div>
        </div>
        <ActionButton href={event.registrationLink} external className="mt-6 w-full">
          Register
        </ActionButton>
      </div>
    </GlassCard>
  );
}
