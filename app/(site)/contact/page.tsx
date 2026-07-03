import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/shared/motion";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Bagas Abiyu Kumara untuk diskusi proyek, peluang kerja, atau kolaborasi — via form, email, LinkedIn, atau GitHub.",
  alternates: { canonical: "/contact" },
};

const directLinks = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "bagas-abiyu-kumara",
    href: siteConfig.links.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "Bagas34645",
    href: siteConfig.links.github,
    icon: GithubIcon,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Hubungi Saya
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Punya proyek, peluang, atau sekadar ingin berdiskusi soal system
          design? Kirim pesan — saya akan membalas secepatnya.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.16}>
          <aside className="space-y-3" aria-label="Tautan kontak langsung">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Tautan langsung
            </h2>
            {directLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent hover:bg-muted"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <link.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{link.label}</p>
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    {link.value}
                  </p>
                </div>
              </a>
            ))}
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
