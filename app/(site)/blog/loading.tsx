export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6" aria-busy="true">
      <div className="h-10 w-36 animate-pulse rounded-lg bg-muted" />
      <div className="mt-4 h-5 w-full max-w-lg animate-pulse rounded-lg bg-muted" />
      <div className="mt-10 space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border p-6">
            <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            <div className="h-6 w-4/5 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
