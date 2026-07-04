"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, Search } from "lucide-react";
import type { PostMeta } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StaggerList, StaggerItem } from "@/components/shared/motion";

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [activeSeries, setActiveSeries] = useState<string>("Semua");

  const seriesList = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.series) set.add(p.series);
    });
    return ["Semua", ...Array.from(set).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;

    if (activeSeries !== "Semua") {
      result = result.filter((p) => p.series === activeSeries);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [posts, activeSeries, query]);

  const grouped = useMemo(() => {
    if (activeSeries !== "Semua") return null;
    const map = new Map<string, PostMeta[]>();
    for (const post of filtered) {
      const series = post.series || "Lainnya";
      if (!map.has(series)) map.set(series, []);
      map.get(series)!.push(post);
    }
    return map;
  }, [filtered, activeSeries]);

  return (
    <>
      <div className="relative mt-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari tutorial..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          aria-label="Cari tutorial"
        />
      </div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter berdasarkan seri"
      >
        {seriesList.map((series) => (
          <button
            key={series}
            type="button"
            aria-pressed={activeSeries === series}
            onClick={() => setActiveSeries(series)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              activeSeries === series
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {series}
          </button>
        ))}
      </div>

      {grouped ? (
        Array.from(grouped.entries()).map(([series, seriesPosts]) => (
          <section key={series} className="mt-10">
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground">
              {series}
            </h2>
            <StaggerList className="space-y-4">
              {seriesPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <PostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerList>
          </section>
        ))
      ) : (
        <StaggerList key={activeSeries} className="mt-8 space-y-4">
          {filtered.map((post) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerList>
      )}

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          Tidak ada tutorial yang cocok dengan pencarian.
        </p>
      )}
    </>
  );
}

function PostCard({ post }: { post: PostMeta }) {
  return (
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
          {post.series && (
            <Badge variant="outline" className="text-[11px]">
              {post.series}
            </Badge>
          )}
        </div>
        <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
          {post.title}
        </h3>
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
  );
}
