import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectMeta } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: ProjectMeta;
  priority?: boolean;
}) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <div className="relative aspect-[1200/630] overflow-hidden border-b border-border bg-muted">
          <Image
            src={project.cover}
            alt={`Cover proyek ${project.title}`}
            fill
            priority={priority}
            unoptimized={project.cover.endsWith(".svg")}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap gap-1.5">
            {project.categories.map((category) => (
              <Badge key={category} variant="accent">
                {category}
              </Badge>
            ))}
          </div>
          <h3 className="flex items-start gap-1 text-lg font-semibold leading-snug tracking-tight">
            {project.title}
            <ArrowUpRight
              className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="outline" className="font-mono text-[11px]">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 5 && (
              <Badge variant="outline" className="font-mono text-[11px]">
                +{project.techStack.length - 5}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}
