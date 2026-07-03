import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { getProjects } from "@/lib/content";
import { awards, techStackPreview } from "@/lib/data";
import { Hero } from "@/components/sections/hero";
import { ProjectCard } from "@/components/sections/project-card";
import { Reveal, StaggerList, StaggerItem } from "@/components/shared/motion";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600;

export default function HomePage() {
  const featured = getProjects().filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="featured-heading">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="featured-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
                Proyek Unggulan
              </h2>
              <p className="mt-2 text-muted-foreground">
              Proyek terpilih yang mencerminkan proses kerja saya dari ide hingga produk jadi.
              </p>
            </div>
            <Link
              href="/projects"
              className="link-underline hidden shrink-0 items-center gap-1 text-sm font-medium text-accent sm:inline-flex"
            >
              Semua proyek
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <StaggerList className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} priority={i === 0} />
            </StaggerItem>
          ))}
        </StaggerList>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="link-underline inline-flex items-center gap-1 text-sm font-medium text-accent"
          >
            Semua proyek
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40" aria-labelledby="stack-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 id="stack-heading" className="text-center font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Teknologi yang saya gunakan
            </h2>
          </Reveal>
          <StaggerList className="mt-6 flex flex-wrap justify-center gap-2.5">
            {techStackPreview.map((tech) => (
              <StaggerItem key={tech}>
                <Badge
                  variant="outline"
                  className="bg-card px-3 py-1.5 font-mono text-xs"
                >
                  {tech}
                </Badge>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="awards-heading">
        <Reveal>
          <h2 id="awards-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Penghargaan
          </h2>
        </Reveal>
        <StaggerList className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {awards.map((award) => (
            <StaggerItem key={award.title}>
              <div className="flex h-full gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Trophy className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-xs text-accent">{award.year}</p>
                  <h3 className="mt-1 text-sm font-semibold leading-snug">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {award.detail}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>
    </>
  );
}
