"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Daftar isi" className="text-sm">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Daftar Isi
      </p>
      <ul className="mt-3 space-y-2 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block border-l-2 py-0.5 transition-colors duration-200",
                heading.level === 3 ? "pl-7" : "pl-4",
                activeId === heading.id
                  ? "-ml-px border-accent font-medium text-accent"
                  : "-ml-px border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
