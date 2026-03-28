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
    <div className="max-w-3xl">
      <p className="data-line">{eyebrow}</p>
      <h2 className="terminal-heading mt-4 text-4xl font-black leading-none text-white sm:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-7 text-textDim">{description}</p> : null}
    </div>
  );
}
