import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, User } from "lucide-react";
import { GithubIcon } from "@/components/shared/brand-icons";
import { getProject, getProjects } from "@/lib/content";
import { MdxContent } from "@/components/mdx/mdx-content";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.meta.title,
    description: project.meta.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.meta.title,
      description: project.meta.summary,
      type: "article",
      images: [{ url: project.meta.cover }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { meta, content } = project;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/projects"
        className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Semua proyek
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap gap-2">
          {meta.categories.map((category) => (
            <Badge key={category} variant="accent">
              {category}
            </Badge>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {meta.summary}
        </p>

        <dl className="mt-6 space-y-3 rounded-xl border border-border bg-muted/40 p-5 text-sm">
          <div className="flex items-start gap-2">
            <dt className="flex items-center gap-1.5 font-medium">
              <User className="h-4 w-4 text-accent" aria-hidden="true" />
              Peran:
            </dt>
            <dd className="text-muted-foreground">{meta.role}</dd>
          </div>
          <div>
            <dt className="sr-only">Tech stack</dt>
            <dd className="flex flex-wrap gap-1.5">
              {meta.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="bg-card font-mono text-[11px]">
                  {tech}
                </Badge>
              ))}
            </dd>
          </div>
          {(meta.demoUrl || meta.repoUrl) && (
            <div className="flex flex-wrap gap-4 pt-1">
              {meta.demoUrl && (
                <a
                  href={meta.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Demo
                </a>
              )}
              {meta.repoUrl && (
                <a
                  href={meta.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
                >
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  Repository
                </a>
              )}
            </div>
          )}
        </dl>

        <div className="relative mt-8 aspect-[1200/630] overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src={meta.cover}
            alt={`Cover proyek ${meta.title}`}
            fill
            priority
            unoptimized={meta.cover.endsWith(".svg")}
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </header>

      <div className="mt-10">
        <MdxContent source={content} />
      </div>
    </article>
  );
}
