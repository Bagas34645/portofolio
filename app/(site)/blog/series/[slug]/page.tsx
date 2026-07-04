import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { getPostsBySeries, getSeries } from "@/lib/content";
import { Reveal } from "@/components/shared/motion";
import { SeriesTutorialList } from "@/components/sections/series-tutorial-list";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSeries().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeries().find((s) => s.slug === slug);
  if (!series) return {};
  return {
    title: `Tutorial ${series.title}`,
    description: series.description,
    alternates: { canonical: `/blog/series/${slug}` },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = getSeries().find((s) => s.slug === slug);
  if (!series) notFound();

  const posts = getPostsBySeries(slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <Link
          href="/blog"
          className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Semua Kursus
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Seri {series.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{series.description}</p>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {series.totalPosts} modul
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            ~{series.totalReadingMinutes} menit total
          </span>
        </div>
      </Reveal>

      <SeriesTutorialList posts={posts} />
    </div>
  );
}
