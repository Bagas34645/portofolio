"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buttonClasses } from "@/components/ui/button";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: "easeOut" as const },
  });

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
      <motion.p
        {...fadeUp(0)}
        className="font-mono text-sm text-accent"
      >
        Halo, saya
      </motion.p>
      <motion.h1
        {...fadeUp(0.08)}
        className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl"
      >
        {siteConfig.name}
      </motion.h1>
      <motion.p
        {...fadeUp(0.16)}
        className="mt-3 text-lg font-medium text-muted-foreground sm:text-2xl"
      >
        {siteConfig.role}
      </motion.p>
      <motion.p
        {...fadeUp(0.24)}
        className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        Membangun sistem full-stack end-to-end, mulai dari REST API dan microservice
        machine learning hingga aplikasi web dan mobile.
      </motion.p>
      <motion.div {...fadeUp(0.32)} className="mt-8 flex flex-wrap gap-3">
        <Link href="/projects" className={buttonClasses("primary", "lg")}>
          Lihat Proyek
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/contact" className={buttonClasses("outline", "lg")}>
          <Mail className="h-4 w-4" aria-hidden="true" />
          Hubungi Saya
        </Link>
      </motion.div>
    </section>
  );
}
