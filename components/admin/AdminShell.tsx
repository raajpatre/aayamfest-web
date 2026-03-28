import type { ReactNode } from "react";

export function AdminShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-700">Admin Dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{title}</h1>
          <p className="mt-3 max-w-3xl text-slate-600">{description}</p>
        </div>
        {children}
      </div>
    </main>
  );
}
