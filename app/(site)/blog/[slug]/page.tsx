import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { extractHeadings, getPost, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { MdxContent } from "@/components/mdx/mdx-content";
import { TableOfContents } from "@/components/sections/table-of-contents";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const headings = extractHeadings(content);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        <article className="mx-auto w-full max-w-3xl lg:mx-0">
          <Link
            href="/blog"
            className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Semua artikel
          </Link>

          <header className="mt-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {meta.readingTime}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {meta.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {meta.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <hr className="my-8 border-border" />

          <MdxContent source={content} />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </div>
  );
}
