"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Download, Eye, Trophy, X } from "lucide-react";
import type { Award } from "@/lib/data";

function CertificateModal({
  award,
  onClose,
}: {
  award: Award;
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Sertifikat ${award.title}`}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{award.title}</p>
            <p className="text-xs text-muted-foreground">{award.detail}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={award.certificateUrl}
              download={award.certificateFilename}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label="Download sertifikat"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label="Tutup preview"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="overflow-auto p-2" style={{ maxHeight: "calc(90vh - 60px)" }}>
          <Image
            src={award.certificateUrl!}
            alt={`Sertifikat ${award.title}`}
            width={1200}
            height={850}
            className="h-auto w-full rounded-lg"
            sizes="(max-width: 768px) 95vw, 768px"
          />
        </div>
      </div>
    </div>
  );
}

export function AwardCard({ award }: { award: Award }) {
  const [showPreview, setShowPreview] = useState(false);
  const hasCert = Boolean(award.certificateUrl);

  return (
    <>
      <div className="flex h-full gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/50">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <Trophy className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-mono text-xs text-accent">{award.year}</p>
          <h3 className="mt-1 text-sm font-semibold leading-snug">
            {award.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{award.detail}</p>
          {hasCert && (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:bg-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                Preview
              </button>
              <a
                href={award.certificateUrl}
                download={award.certificateFilename}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:bg-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Download
              </a>
            </div>
          )}
        </div>
      </div>

      {showPreview && award.certificateUrl && (
        <CertificateModal
          award={award}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
