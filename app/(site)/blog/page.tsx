import type { Metadata } from "next";
import { Terminal, Code } from "lucide-react";
import { getSeries } from "@/lib/content";
import { Reveal, StaggerList, StaggerItem } from "@/components/shared/motion";
import { SeriesCourseCard } from "@/components/sections/series-course-card";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tutorial",
  description:
    "Study with me! Seri tutorial Linux dan Python lengkap dari fundamental hingga expert — belajar bareng step by step.",
  alternates: { canonical: "/blog" },
};

const SERIES_ICONS: Record<string, typeof Terminal> = {
  linux: Terminal,
  python: Code,
};

export default function BlogPage() {
  const seriesList = getSeries();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tutorial
        </h1>
        <p className="mt-3 text-lg font-medium text-foreground/80">
          Study with me!
        </p>
        <p className="mt-2 text-muted-foreground">
          Yuk belajar bareng dari nol, pilih seri yang kamu minati dan kita
          jelajahi bersama, step by step sampai mahir.
        </p>
      </Reveal>

      <StaggerList className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {seriesList.map((series) => (
          <StaggerItem key={series.slug}>
            <SeriesCourseCard
              title={series.title}
              description={series.description}
              href={`/blog/series/${series.slug}`}
              totalPosts={series.totalPosts}
              totalReadTime={series.totalReadingMinutes}
              levels={series.levels}
              icon={SERIES_ICONS[series.slug] ?? Terminal}
            />
          </StaggerItem>
        ))}
      </StaggerList>
    </div>
  );
}
