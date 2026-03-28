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
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-textDim">{description}</p>
    </GlassCard>
  );
}
