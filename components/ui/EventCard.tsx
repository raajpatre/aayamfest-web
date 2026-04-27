import Image from "next/image";
import { EventRecord } from "@/lib/types";
import { ActionButton } from "@/components/ui/ActionButton";
import { GlassCard } from "@/components/ui/GlassCard";

export function EventCard({ event }: { event: EventRecord }) {
  return (
    <GlassCard className="group overflow-hidden border border-outlineSoft/25 p-1 transition-colors hover:border-pinkGlow/45">
      <div className="noise-mask relative aspect-[4/3] overflow-hidden border border-pinkGlow/45">
        <Image
          src={event.posterImage}
          alt={event.title}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/40 to-transparent" />
        <div className="absolute right-3 top-3 border border-cyanGlow/35 bg-black/65 px-2 py-1">
          <span className="system-label text-[9px] text-cyanGlow">ID: {event._id.slice(-4)}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="terminal-heading text-2xl font-black text-white">{event.title}</h3>
          <span className="border border-amberGlow/25 bg-amberGlow/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-amberGlow">
            {event.category}
          </span>
        </div>
        <p className="text-sm leading-6 text-textDim">{event.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.18em]">
          <div className="text-cyanGlow">Loc: Fest Grid</div>
          <div className="text-white/75">{event.teamSize}</div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="system-label text-[10px] text-textDim">Prize Pool</p>
            <p className="terminal-heading mt-2 text-xl font-bold text-white">{event.prizePool}</p>
          </div>
          <ActionButton href={event.registrationLink} external className="shrink-0">
            Run Register.exe
          </ActionButton>
        </div>
      </div>
    </GlassCard>
  );
}
