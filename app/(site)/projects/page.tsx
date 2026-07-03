import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectFilter } from "@/components/sections/project-filter";
import { Reveal } from "@/components/shared/motion";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Proyek",
  description:
    "Kumpulan proyek nyata Bagas Abiyu Kumara — dari sistem gym multi-platform dengan face recognition, chatbot RAG, aplikasi POS desktop, hingga e-commerce UMKM. Setiap proyek disajikan sebagai case study.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Proyek</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
        Setiap proyek punya cerita, masalah yang dipecahkan, keputusan yang diambil, dan pelajaran yang didapat.
        </p>
      </Reveal>
      <div className="mt-8">
        <ProjectFilter projects={projects} />
      </div>
    </div>
  );
}
