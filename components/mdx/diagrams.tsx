import { cn } from "@/lib/utils";

function DiagramBox({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center justify-center rounded-lg border border-border bg-card px-3 py-2.5 text-center shadow-sm",
        className,
      )}
    >
      <span className="text-xs font-semibold sm:text-sm">{title}</span>
      {subtitle && (
        <span className="font-mono text-[10px] text-muted-foreground sm:text-xs">
          {subtitle}
        </span>
      )}
    </div>
  );
}

function Arrow({ label, down = false }: { label?: string; down?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 text-muted-foreground",
        down ? "flex-col" : "flex-row",
      )}
      aria-hidden="true"
    >
      {label && <span className="font-mono text-[10px]">{label}</span>}
      <span className="text-sm">{down ? "↓" : "→"}</span>
    </div>
  );
}

export function GymArchitectureDiagram() {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-muted/40 p-4 sm:p-6">
      <div className="flex flex-col items-center gap-3">
        <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          <DiagramBox title="Dashboard Admin + Kiosk" subtitle="Next.js" />
          <DiagramBox title="Aplikasi Mobile Member" subtitle="Flutter" />
          <DiagramBox title="Integrasi Payment Gateway" subtitle="Midtrans" />
        </div>
        <Arrow down label="HTTPS + JWT" />
        <DiagramBox
          title="Backend REST API — Orkestrator"
          subtitle="Laravel 13 · RBAC · 70+ endpoint"
          className="w-full max-w-md border-accent bg-accent-soft"
        />
        <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <div className="flex flex-col items-center gap-2">
            <Arrow down label="Eloquent" />
            <DiagramBox
              title="PostgreSQL"
              subtitle="embedding terenkripsi"
              className="w-44"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Arrow down label="server-to-server (internal)" />
            <DiagramBox
              title="Face Recognition Service"
              subtitle="FastAPI · ONNX · InsightFace"
              className="w-56"
            />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">
        Arsitektur 4 komponen, microservice ML hanya diakses Laravel, tidak
        pernah terekspos ke klien.
      </figcaption>
    </figure>
  );
}

export function RagPipelineDiagram() {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-muted/40 p-4 sm:p-6">
      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-2 font-mono text-xs font-semibold text-accent">
            FASE 1 — INDEXING
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
            <DiagramBox title="Data CSV" subtitle="tanya–jawab" />
            <Arrow label="embed" />
            <DiagramBox title="BAAI/bge-m3" subtitle="SentenceTransformers" />
            <Arrow label="simpan" />
            <DiagramBox title="TiDB Cloud" subtitle="Vector Search" />
          </div>
        </div>
        <div>
          <p className="mb-2 font-mono text-xs font-semibold text-accent">
            FASE 2 — RETRIEVAL &amp; GENERATION
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
            <DiagramBox title="Query Pengguna" />
            <Arrow label="embed + top-K" />
            <DiagramBox title="TiDB Cloud" subtitle="cosine distance" />
            <Arrow label="konteks" />
            <DiagramBox title="Gemma2:2b" subtitle="Ollama (lokal)" />
            <Arrow label="jawaban" />
            <DiagramBox title="Respons Grounded" className="border-accent bg-accent-soft" />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">
        Pipeline RAG dua fase: indexing knowledge base, lalu retrieval semantik
        + generasi jawaban dengan LLM lokal.
      </figcaption>
    </figure>
  );
}

export function LayeredArchDiagram() {
  const layers = [
    { title: "Form / JDialog", subtitle: "UI / presentation" },
    { title: "TableModel", subtitle: "binding data JTable" },
    { title: "Service", subtitle: "logika bisnis (interface–impl)" },
    { title: "DAO", subtitle: "akses database" },
    { title: "Model", subtitle: "entity" },
  ];

  return (
    <figure className="my-8 rounded-xl border border-border bg-muted/40 p-4 sm:p-6">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
        {layers.map((layer, i) => (
          <div key={layer.title} className="flex w-full flex-col items-center gap-2">
            {i > 0 && <Arrow down />}
            <DiagramBox
              title={layer.title}
              subtitle={layer.subtitle}
              className={cn("w-full", i === 2 && "border-accent bg-accent-soft")}
            />
          </div>
        ))}
        <Arrow down />
        <DiagramBox title="MySQL" subtitle="21 tabel terelasi" className="w-full" />
      </div>
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">
        Arsitektur berlapis AppKasir — setiap lapisan hanya berbicara dengan
        lapisan di bawahnya.
      </figcaption>
    </figure>
  );
}
