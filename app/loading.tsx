export default function Loading() {
  return (
    <main className="container-shell py-16">
      <div className="glass-panel h-56 animate-pulse rounded-[2rem]" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="glass-panel h-48 animate-pulse rounded-[1.75rem]" />
        ))}
      </div>
    </main>
  );
}
