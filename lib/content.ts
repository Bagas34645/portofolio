import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content");

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  categories: string[];
  techStack: string[];
  role: string;
  featured: boolean;
  order: number;
  cover: string;
  demoUrl?: string;
  repoUrl?: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

function readMdxFiles(dir: string) {
  const fullDir = path.join(contentDir, dir);
  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullDir, file), "utf-8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, content };
    });
}

export function getProjects(): ProjectMeta[] {
  return readMdxFiles("projects")
    .map(({ slug, data }) => ({
      slug,
      title: data.title as string,
      summary: data.summary as string,
      categories: (data.categories as string[]) ?? [],
      techStack: (data.techStack as string[]) ?? [],
      role: (data.role as string) ?? "",
      featured: Boolean(data.featured),
      order: (data.order as number) ?? 99,
      cover: (data.cover as string) ?? `/images/projects/${slug}/cover.svg`,
      demoUrl: data.demoUrl as string | undefined,
      repoUrl: data.repoUrl as string | undefined,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string) {
  const filePath = path.join(contentDir, "projects", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = getProjects().find((p) => p.slug === slug);
  if (!meta) return null;
  return { meta: { ...meta, ...data } as ProjectMeta, content };
}

export function getPosts(): PostMeta[] {
  return readMdxFiles("blog")
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      readingTime: `${Math.max(1, Math.ceil(readingTime(content).minutes))} menit baca`,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string) {
  const filePath = path.join(contentDir, "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      readingTime: `${Math.max(1, Math.ceil(readingTime(content).minutes))} menit baca`,
    } satisfies PostMeta,
    content,
  };
}

export type TocHeading = {
  id: string;
  text: string;
  level: number;
};

export function extractHeadings(content: string): TocHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    headings.push({ id, text, level: match[1].length });
  }
  return headings;
}
