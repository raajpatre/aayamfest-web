import type { ReactNode } from "react";

export function AdminSection({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="terminal-panel p-6 sm:p-8">
      <div className="mb-6">
        <p className="system-label text-[10px] text-cyanGlow">Panel</p>
        <h2 className="terminal-heading mt-3 text-3xl font-black text-white">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-textDim">{description}</p>
      </div>
      {children}
    </section>
  );
}
