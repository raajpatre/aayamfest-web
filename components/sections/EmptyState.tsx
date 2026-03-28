import { GlassCard } from "@/components/ui/GlassCard";

export function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <GlassCard className="p-8">
      <p className="data-line">Awaiting Sync</p>
      <h3 className="terminal-heading mt-4 text-2xl font-black text-white">{title}</h3>
      <p className="mt-4 max-w-xl text-sm leading-7 text-textDim">{description}</p>
    </GlassCard>
  );
}
