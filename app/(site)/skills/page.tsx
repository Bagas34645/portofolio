import type { Metadata } from "next";
import {
  Code2,
  Layers,
  Database,
  Terminal,
  Brain,
  Network,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/lib/data";
import { Reveal, StaggerList, StaggerItem } from "@/components/shared/motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Keahlian",
  description:
    "Keahlian teknis Bagas Abiyu Kumara: bahasa pemrograman, framework, database, machine learning, system design, dan cyber security — dibuktikan lewat proyek nyata.",
  alternates: { canonical: "/skills" },
};

const icons: Record<string, LucideIcon> = {
  code: Code2,
  layers: Layers,
  database: Database,
  terminal: Terminal,
  brain: Brain,
  network: Network,
  shield: Shield,
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Keahlian
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Dikelompokkan per kategori — setiap keahlian di sini dipakai di
          proyek nyata, bukan sekadar daftar kata kunci.
        </p>
      </Reveal>

      <StaggerList className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => {
          const Icon = icons[category.icon] ?? Code2;
          return (
            <StaggerItem key={category.title}>
              <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="font-semibold leading-snug">{category.title}</h2>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <li key={item}>
                      <Badge variant="outline" className="px-2.5 py-1 text-xs">
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerList>
    </div>
  );
}
