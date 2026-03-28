export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm uppercase tracking-[0.32em] text-cyanGlow">{eyebrow}</p>
      <h2 className="font-display text-3xl uppercase tracking-[0.12em] text-white sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-textDim">{description}</p> : null}
    </div>
  );
}
