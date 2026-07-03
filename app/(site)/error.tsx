"use client";

import { Button } from "@/components/ui/button";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-mono text-sm text-accent">500</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        Terjadi kesalahan
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Maaf, ada yang tidak beres saat memuat halaman ini. Silakan coba lagi.
      </p>
      <Button size="lg" className="mt-8" onClick={reset}>
        Coba Lagi
      </Button>
    </div>
  );
}
