"use client";

import Link from "next/link";
import Image from "next/image";
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
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
        <motion.div
          {...fadeUp(0.12)}
          className="relative mx-auto shrink-0 md:order-2 md:mx-0"
        >
          <div
            className="absolute -inset-4 -z-10 rounded-full bg-accent-soft blur-2xl md:rounded-3xl"
            aria-hidden="true"
          />
          <Image
            src="/images/profile/bagas.jpg"
            alt="Foto Bagas Abiyu Kumara"
            width={800}
            height={800}
            priority
            sizes="(max-width: 768px) 160px, 288px"
            className="h-36 w-36 rounded-full border border-border object-cover shadow-lg sm:h-40 sm:w-40 md:h-64 md:w-64 md:rounded-3xl lg:h-72 lg:w-72"
          />
        </motion.div>

        <div className="text-center md:order-1 md:text-left">
          <motion.p {...fadeUp(0)} className="font-mono text-sm text-accent">
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
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0"
          >
            Membangun sistem full-stack end-to-end, mulai dari REST API dan
            microservice machine learning hingga aplikasi web dan mobile.
          </motion.p>
          <motion.div
            {...fadeUp(0.32)}
            className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
          >
            <Link href="/projects" className={buttonClasses("primary", "lg")}>
              Lihat Proyek
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className={buttonClasses("outline", "lg")}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Hubungi Saya
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
