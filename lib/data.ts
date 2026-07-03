export type SkillCategory = {
  title: string;
  icon: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Bahasa Pemrograman",
    icon: "code",
    items: ["PHP", "TypeScript / JavaScript", "Java", "Python", "Dart", "SQL"],
  },
  {
    title: "Framework & Library",
    icon: "layers",
    items: [
      "Laravel",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Flutter (GetX)",
      "FastAPI",
      "Java Swing",
    ],
  },
  {
    title: "Database",
    icon: "database",
    items: ["PostgreSQL", "MySQL / MariaDB", "TiDB Cloud (Vector Search)"],
  },
  {
    title: "Infrastruktur & Tools",
    icon: "terminal",
    items: ["Git", "Linux", "Apache", "Vite", "Apache Ant", "XAMPP"],
  },
  {
    title: "Machine Learning / AI",
    icon: "brain",
    items: [
      "RAG pipeline",
      "Embedding (SentenceTransformers)",
      "InsightFace / ArcFace",
      "Ollama",
      "ONNX Runtime",
    ],
  },
  {
    title: "Konsep System Design",
    icon: "network",
    items: [
      "REST API design",
      "Microservice",
      "BFF pattern",
      "Layered architecture",
      "JWT auth & RBAC",
      "Relational schema design",
    ],
  },
  {
    title: "Cyber Security",
    icon: "shield",
    items: [
      "Penetration testing fundamental",
      "Secure auth (SHA-256, JWT httpOnly)",
      "Enkripsi data sensitif",
    ],
  },
];

export type Certification = {
  title: string;
  url: string;
};

export const certifications: Certification[] = [
  {
    title: "Cyber Security and Penetration Testing Fundamental",
    url: "https://codepolitan.com/c/IL5QPWB",
  },
  { title: "Python", url: "https://codepolitan.com/c/DYHDL8J" },
  { title: "Advanced Git", url: "https://codepolitan.com/c/KMBQTVW" },
  { title: "HTML", url: "https://codepolitan.com/c/LFLYW1O" },
  { title: "CSS", url: "https://codepolitan.com/c/LFVE9BC" },
  {
    title: "Bootstrap CSS Framework",
    url: "https://codepolitan.com/c/YOQVG2D",
  },
  { title: "JavaScript", url: "https://codepolitan.com/c/RHHVF0D" },
];

export type Award = {
  year: string;
  title: string;
  detail: string;
  certificateUrl?: string;
  certificateFilename?: string;
};

export const awards: Award[] = [
  {
    year: "2025",
    title: "Top 3 Best Project Workshop Cyber Security",
    detail: "National IT Workshop INVOFEST 2025",
    certificateUrl: "/images/awards/top3-invofest-2025.jpg",
    certificateFilename: "Top 3 Best Project INVOFEST 2025.jpg",
  },
  {
    year: "2024",
    title: "Juara 1 Lomba Apresiasi GTK PAUD dan DIKMAS",
    detail: "Kategori Instruktur LKP Tingkat Kota Tegal",
    certificateUrl: "/images/awards/juara1-gtk-2024.jpg",
    certificateFilename: "Juara 1 GTK PAUD DIKMAS 2024.jpg",
  },
  {
    year: "2019",
    title: "Juara 1 Instruktur Komputer",
    detail:
      "Apresiasi GTK PAUD dan DIKMAS Berprestasi dan Berdedikasi Tingkat Kota Tegal",
  },
];

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  type: "education" | "award" | "project";
};

export const timeline: TimelineItem[] = [
  {
    year: "2025",
    title: "Top 3 Best Project Workshop Cyber Security — INVOFEST 2025",
    description:
      "Meraih Top 3 Best Project pada National IT Workshop INVOFEST 2025 bidang cyber security.",
    type: "award",
  },
  {
    year: "2024",
    title: "Juara 1 Apresiasi GTK PAUD dan DIKMAS Kota Tegal",
    description: "Kategori Instruktur LKP Tingkat Kota Tegal.",
    type: "award",
  },
  {
    year: "2023",
    title: "Mulai kuliah D4 Teknik Informatika",
    description:
      "Universitas Harkat Negeri — fokus pada full stack development, jaringan, dan keamanan siber.",
    type: "education",
  },
  {
    year: "2019",
    title: "Juara 1 Instruktur Komputer Kota Tegal",
    description:
      "Apresiasi GTK PAUD dan DIKMAS Berprestasi dan Berdedikasi Tingkat Kota Tegal.",
    type: "award",
  },
];

export const techStackPreview = [
  "Laravel",
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "MySQL",
  "Tailwind CSS",
  "Java",
  "Linux",
];
