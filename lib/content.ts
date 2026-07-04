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
  series: string;
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
      series: (data.series as string) ?? "",
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
      series: (data.series as string) ?? "",
      readingTime: `${Math.max(1, Math.ceil(readingTime(content).minutes))} menit baca`,
    } satisfies PostMeta,
    content,
  };
}

export type SeriesMeta = {
  slug: string;
  title: string;
  description: string;
  totalPosts: number;
  totalReadingMinutes: number;
  levels: string[];
};

const SERIES_INFO: Record<string, { title: string; description: string }> = {
  Linux: {
    title: "Linux",
    description:
      "Dari terminal dasar hingga Docker & production troubleshooting | kuasai sistem operasi yang menjalankan internet.",
  },
  Python: {
    title: "Python",
    description:
      "Dari variabel hingga machine learning | 18 bab mencakup fundamental, OOP, database, data science (NumPy/Pandas/Matplotlib), ML dengan scikit-learn, testing, dan deployment production.",
  },
};

export function getPostsBySeries(series: string): PostMeta[] {
  return getPosts()
    .filter((p) => p.series.toLowerCase() === series.toLowerCase())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getSeries(): SeriesMeta[] {
  const posts = getPosts();
  const seriesNames = [...new Set(posts.map((p) => p.series).filter(Boolean))];

  return seriesNames.map((name) => {
    const seriesPosts = posts.filter((p) => p.series === name);
    const totalMinutes = seriesPosts.reduce(
      (sum, p) => sum + parseInt(p.readingTime),
      0,
    );
    const levels = [
      ...new Set(
        seriesPosts.flatMap((p) =>
          p.tags.filter((t) =>
            ["Fundamental", "Intermediate", "Advanced", "Expert"].includes(t),
          ),
        ),
      ),
    ];
    const info = SERIES_INFO[name] ?? { title: name, description: "" };
    return {
      slug: name.toLowerCase(),
      title: info.title,
      description: info.description,
      totalPosts: seriesPosts.length,
      totalReadingMinutes: totalMinutes,
      levels,
    };
  });
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
