"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, Search } from "lucide-react";
import type { PostMeta } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StaggerList, StaggerItem } from "@/components/shared/motion";

const LEVEL_ORDER = ["Fundamental", "Intermediate", "Advanced", "Expert"];

function getPostLevel(post: PostMeta): string {
  for (const level of LEVEL_ORDER) {
    if (post.tags.includes(level)) return level;
  }
  return "Lainnya";
}

export function SeriesTutorialList({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [posts, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, PostMeta[]>();
    for (const post of filtered) {
      const level = getPostLevel(post);
      if (!map.has(level)) map.set(level, []);
      map.get(level)!.push(post);
    }
    return [...map.entries()].sort(
      (a, b) => LEVEL_ORDER.indexOf(a[0]) - LEVEL_ORDER.indexOf(b[0]),
    );
  }, [filtered]);

  const getGlobalIndex = (level: string, localIdx: number): number => {
    let count = 0;
    for (const [lvl, lvlPosts] of grouped) {
      if (lvl === level) return count + localIdx + 1;
      count += lvlPosts.length;
    }
    return localIdx + 1;
  };

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
          aria-label="Cari tutorial dalam seri"
        />
      </div>

      {grouped.map(([level, levelPosts]) => (
        <section key={level} className="mt-8">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <span
              className={cn(
                "inline-block h-2 w-2 rounded-full",
                level === "Fundamental" && "bg-green-500",
                level === "Intermediate" && "bg-blue-500",
                level === "Advanced" && "bg-orange-500",
                level === "Expert" && "bg-red-500",
                level === "Lainnya" && "bg-muted-foreground",
              )}
            />
            {level}
          </h2>
          <StaggerList className="space-y-3">
            {levelPosts.map((post, idx) => (
              <StaggerItem key={post.slug}>
                <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-start gap-4 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {getGlobalIndex(level, idx)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold leading-snug tracking-tight">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {post.readingTime}
                        </span>
                        {post.tags
                          .filter((t) => !LEVEL_ORDER.includes(t) && t !== post.series)
                          .slice(0, 3)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-[10px]"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </Link>
                </Card>
              </StaggerItem>
            ))}
          </StaggerList>
        </section>
      ))}

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          Tidak ada tutorial yang cocok dengan pencarian.
        </p>
      )}
    </>
  );
}
