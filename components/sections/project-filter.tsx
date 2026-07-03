"use client";

import { useMemo, useState } from "react";
import type { ProjectMeta } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/sections/project-card";
import { StaggerList, StaggerItem } from "@/components/shared/motion";

export function ProjectFilter({ projects }: { projects: ProjectMeta[] }) {
  const [active, setActive] = useState<string>("Semua");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return ["Semua", ...Array.from(set).sort()];
  }, [projects]);

  const filtered =
    active === "Semua"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter proyek berdasarkan kategori"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              active === category
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <StaggerList
        key={active}
        className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerList>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          Tidak ada proyek pada kategori ini.
        </p>
      )}
    </>
  );
}
