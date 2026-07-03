import type { Metadata } from "next";
import { Download, GraduationCap, Trophy, Rocket, BadgeCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { certifications, timeline, techStackPreview } from "@/lib/data";
import { Reveal, StaggerList, StaggerItem } from "@/components/shared/motion";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tentang Saya",
  description:
    "Cerita di balik Bagas Abiyu Kumara — mahasiswa D4 Teknik Informatika yang membangun sistem produksi nyata multi-platform, dari REST API hingga microservice machine learning.",
  alternates: { canonical: "/about" },
};

const timelineIcons = {
  education: GraduationCap,
  award: Trophy,
  project: Rocket,
} as const;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tentang Saya
        </h1>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="prose mt-8">
          <p>
            Saya {siteConfig.name}, mahasiswa D4 Teknik Informatika di
            Universitas Harkat Negeri (2023 – sekarang). Saya suka komputer sejak
            sebelum kuliah, mulai dari belajar Linux dan jaringan. Dari situ
            muncul satu pertanyaan yang selalu saya pikirkan: <em>bagaimana cara
            merancang sistem yang baik?</em>
          </p>
          <p>
            Saya banyak belajar lewat proyek dan tugas kuliah. Untuk kasus
            pemilihan penerima beasiswa di sekolah, saya membuat sistem pendukung
            keputusan dengan metode SAW. Untuk kasus pencatatan gym yang masih
            manual, saya membangun sistem dengan empat bagian: REST API Laravel,
            dashboard Next.js, aplikasi mobile Flutter, dan face recognition
            FastAPI.
          </p>
          <p>
            Dari proyek-proyek kuliah itu saya belajar memikirkan keterbatasan
            sejak awal: solusi harus ringan agar bisa jalan di hosting sederhana,
            data biometrik yang sensitif perlu enkripsi, dan pemilihan teknologi
            harus mempertimbangkan biaya.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="mt-12" aria-labelledby="prinsip-heading">
          <h2 id="prinsip-heading" className="text-2xl font-bold tracking-tight">
            Prinsip dalam Membangun Sistem
          </h2>
          <ul className="mt-6 space-y-4">
            <li className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Membuat sistem yang rapi dan mudah dikembangkan</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Saya menyusun setiap bagian sistem secara teratur, seperti
                menata ruangan yang rapi. Dengan begitu, sistem tetap mudah
                dirawat dan bisa terus dikembangkan tanpa jadi berantakan.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Menjaga keamanan sejak awal</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Keamanan saya pikirkan sejak awal, bukan ditambal belakangan.
                Data penting seperti password dan data pribadi yang bersifat rahasia selalu dilindungi
                agar tidak mudah bocor atau disalahgunakan.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Memilih teknologi sesuai kebutuhan</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Saya memilih teknologi berdasarkan kebutuhan dan anggaran, bukan
                sekadar mengikuti tren. Tujuannya agar sistem tetap hemat biaya
                dan pas dengan kondisi pengguna.
              </p>
            </li>
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="mt-12" aria-labelledby="stack-heading">
          <h2 id="stack-heading" className="text-2xl font-bold tracking-tight">
            Ringkasan Tech Stack
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {techStackPreview.map((tech) => (
              <Badge key={tech} variant="outline" className="px-3 py-1.5 font-mono text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </section>
      </Reveal>

      <section className="mt-12" aria-labelledby="timeline-heading">
        <Reveal>
          <h2 id="timeline-heading" className="text-2xl font-bold tracking-tight">
            Timeline Pendidikan &amp; Pencapaian
          </h2>
        </Reveal>
        <StaggerList className="mt-6 space-y-0">
          {timeline.map((item, i) => {
            const Icon = timelineIcons[item.type];
            return (
              <StaggerItem key={item.title}>
                <div className="relative flex gap-4 pb-8">
                  {i < timeline.length - 1 && (
                    <span
                      className="absolute left-5 top-10 h-full w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-accent-soft text-accent">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="pt-1">
                    <p className="font-mono text-xs text-accent">{item.year}</p>
                    <h3 className="mt-1 font-semibold leading-snug">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </section>

      <section className="mt-8" aria-labelledby="sertifikasi-heading">
        <Reveal>
          <h2 id="sertifikasi-heading" className="text-2xl font-bold tracking-tight">
            Sertifikasi
          </h2>
        </Reveal>
        <StaggerList className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {certifications.map((cert) => (
            <StaggerItem key={cert.title}>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent hover:bg-muted"
              >
                <BadgeCheck className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium leading-snug">{cert.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    Codepolitan — verifikasi
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>

      <Reveal>
        <div className="mt-12 rounded-xl border border-border bg-muted/40 p-6 text-center">
          <h2 className="text-lg font-semibold">Butuh versi ringkasnya?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Unduh CV saya dalam format PDF.
          </p>
          <a
            href="/cv/Bagas_Software_Engineer.pdf"
            download
            className={buttonClasses("primary", "lg", "mt-4")}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Unduh CV
          </a>
        </div>
      </Reveal>
    </div>
  );
}
