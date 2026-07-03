import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Reveal, StaggerList, StaggerItem } from "@/components/shared/motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Catatan teknis Bagas Abiyu Kumara tentang system design, keputusan arsitektur, machine learning, dan pelajaran dari proyek nyata.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-3 text-muted-foreground">
          Catatan teknis dari proyek nyata — system design, keputusan
          arsitektur, dan pelajaran yang dipetik.
        </p>
      </Reveal>

      <StaggerList className="mt-10 space-y-5">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <Link
                href={`/blog/${post.slug}`}
                className="block p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="accent" className="text-[11px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
            </Card>
          </StaggerItem>
        ))}
      </StaggerList>
    </div>
  );
}
