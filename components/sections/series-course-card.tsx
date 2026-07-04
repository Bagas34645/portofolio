import Link from "next/link";
import { ArrowRight, BookOpen, Clock, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type SeriesCourseCardProps = {
  title: string;
  description: string;
  href: string;
  totalPosts: number;
  totalReadTime: number;
  levels: string[];
  icon: LucideIcon;
};

const LEVEL_ORDER = ["Fundamental", "Intermediate", "Advanced", "Expert"];

export function SeriesCourseCard({
  title,
  description,
  href,
  totalPosts,
  totalReadTime,
  levels,
  icon: Icon,
}: SeriesCourseCardProps) {
  const sortedLevels = levels.sort(
    (a, b) => LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b),
  );

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        href={href}
        className="flex flex-1 flex-col p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {sortedLevels.map((level) => (
            <Badge key={level} variant="accent" className="text-[11px]">
              {level}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {totalPosts} modul
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            ~{totalReadTime} menit
          </span>
        </div>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: "100%" }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {totalPosts} modul tersedia
          </p>
        </div>

        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent/80">
          Mulai Belajar
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </Card>
  );
}
