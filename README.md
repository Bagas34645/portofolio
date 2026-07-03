# Portofolio — Bagas Abiyu Kumara

Website portofolio pribadi yang dibangun dengan Next.js (App Router), TypeScript strict, Tailwind CSS v4, Framer Motion, dan MDX. Setiap proyek disajikan sebagai **case study**: masalah → constraint → arsitektur → trade-off → hasil.

## Menjalankan Proyek

```bash
# Install dependensi
npm install

# Development server
npm run dev

# Production build + start
npm run build
npm start

# Lint
npm run lint
```

Buka [http://localhost:3000](http://localhost:3000).

### Environment variable (opsional)

Salin `.env.example` menjadi `.env.local`:

| Variabel | Kegunaan |
| --- | --- |
| `RESEND_API_KEY` | Mengirim email dari form kontak via [Resend](https://resend.com). Jika kosong, form otomatis menawarkan fallback `mailto:`. |
| `CONTACT_TO_EMAIL` | Alamat tujuan pesan form kontak. **Penting:** pada mode testing Resend (tanpa domain terverifikasi), email hanya bisa dikirim ke alamat email akun Resend Anda sendiri. |
| `CONTACT_FROM_EMAIL` | Alamat pengirim. Default `Portofolio <onboarding@resend.dev>` (mode testing). Setelah verifikasi domain di [resend.com/domains](https://resend.com/domains), ganti dengan alamat di domain Anda. |

## Struktur Folder

```
app/
  (site)/            # route group halaman publik
    page.tsx         # beranda
    about/           # tentang saya
    projects/        # daftar proyek + [slug] case study
    skills/          # keahlian
    blog/            # daftar artikel + [slug] detail
    contact/         # form kontak
  api/contact/       # route handler form kontak
  sitemap.ts         # sitemap.xml
  robots.ts          # robots.txt
  opengraph-image.tsx# OG image dinamis
components/
  ui/                # primitif UI (button, card, badge)
  sections/          # hero, project card, filter, form, TOC
  shared/            # navbar, footer, theme toggle, helper animasi
  mdx/               # renderer MDX, code block, diagram arsitektur
content/
  projects/          # case study proyek (.mdx)
  blog/              # artikel blog (.mdx)
lib/                 # util, loader konten, data, konfigurasi situs
public/
  images/projects/   # cover per proyek
  cv/                # file CV (PDF)
```

## Menambah Proyek Baru

1. Buat file `content/projects/nama-proyek.mdx` dengan frontmatter:

```yaml
---
title: "Judul Proyek"
summary: "Ringkasan masalah yang diselesaikan dalam 1–2 kalimat."
categories: ["Full-Stack"] # Full-Stack | Machine Learning / AI | Desktop | Web
techStack: ["Laravel", "Next.js"]
role: "Peran Anda di proyek"
featured: false # true = tampil di beranda
order: 6 # urutan tampil (kecil = atas)
cover: "/images/projects/nama-proyek/cover.png"
demoUrl: "https://..." # opsional
repoUrl: "https://..." # opsional
---
```

2. Tulis konten dengan struktur konsisten: Gambaran Umum, Masalah Utama, Constraint dan Tantangan, Arsitektur Sistem, Alasan Pemilihan Teknologi dan Trade-off, Highlight Implementasi, Hasil dan Dampak, Pelajaran yang Dipetik.
3. Tambahkan cover di `public/images/projects/nama-proyek/`. (Cover saat ini masih placeholder SVG — ganti dengan screenshot asli lalu perbarui path `cover` di frontmatter.)

Halaman daftar, detail, filter kategori, sitemap, dan metadata SEO ter-update otomatis.

## Menambah Artikel Blog Baru

Buat file `content/blog/judul-artikel.mdx`:

```yaml
---
title: "Judul Artikel"
description: "Deskripsi singkat untuk SEO dan kartu daftar."
date: "2026-07-01"
tags: ["System Design"]
---
```

Fitur otomatis: syntax highlighting (Shiki, tema light/dark), estimasi waktu baca, table of contents sticky, dan tombol salin pada code block. Beri judul file pada code block dengan ` ```php title="NamaFile.php" `.

## Deploy ke Vercel

Proyek siap deploy tanpa konfigurasi tambahan:

1. Push repositori ke GitHub.
2. Import di [vercel.com/new](https://vercel.com/new), pilih root `webapp/` (jika repo berisi folder lain).
3. Tambahkan `RESEND_API_KEY` di Environment Variables (opsional).

## Catatan TODO Konten

- Ganti placeholder cover SVG di `public/images/projects/*/cover.svg` dengan screenshot asli.
- Perbarui `public/cv/Bagas_Software_Engineer.pdf` bila ada versi terbaru.
