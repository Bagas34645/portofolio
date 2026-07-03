"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type Slide = {
  src: string;
  alt: string;
  caption?: string;
};

const AUTOPLAY_INTERVAL = 5000;

export function PhotoSlideshow({ slides }: { slides: Slide[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  const playing = autoplay && !paused && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [playing, slides.length]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) return;
    goTo(deltaX > 0 ? index - 1 : index + 1);
  };

  const slide = slides[index];

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeri kegiatan"
      className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative aspect-[4/3] bg-muted sm:aspect-[16/10]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            aria-live={playing ? "off" : "polite"}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        <p className="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-0.5 font-mono text-xs text-white">
          {index + 1} / {slides.length}
        </p>

        <button
          type="button"
          aria-label="Foto sebelumnya"
          onClick={() => goTo(index - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Foto berikutnya"
          onClick={() => goTo(index + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
          {slide.caption ?? slide.alt}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Pilih foto">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Ke foto ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-200",
                  i === index
                    ? "w-5 bg-accent"
                    : "w-2 bg-border hover:bg-muted-foreground",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label={autoplay ? "Jeda slideshow" : "Putar slideshow"}
            onClick={() => setAutoplay((v) => !v)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {autoplay ? (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
