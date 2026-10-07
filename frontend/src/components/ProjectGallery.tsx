"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/profile";
import { useLocale } from "@/lib/i18n";

type GalleryImage = NonNullable<Project["images"]>[number];

// Largeur des miniatures selon le format (hauteur commune h-24) : écran d'ordinateur en 16:10 par défaut.
const thumbWidth: Record<string, string> = {
  mobile: "w-[3.375rem]",
  tablet: "w-32",
};

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const { locale, t } = useLocale();
  const [index, setIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  // Ne dépend que de l'ouverture : changer d'image ne doit pas redonner le focus au bouton Fermer.
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const current = index === null ? null : images[index];

  return (
    <>
      {/* Hauteur commune ; la largeur suit le format de l'écran (voir thumbWidth). */}
      <ul className="mt-6 flex flex-wrap gap-3">
        {images.map((image, i) => (
          <li key={image.src} className={`h-24 ${thumbWidth[image.format ?? ""] ?? "w-[9.6rem]"}`}>
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setIndex(i);
              }}
              aria-label={t.projects.gallery.open(i + 1, images.length)}
              className="group/thumb relative block h-full w-full overflow-hidden rounded-md border border-border/15 bg-raised transition-colors hover:border-accent/50 focus-visible:border-accent"
            >
              <Image
                src={image.src}
                alt={image.alt[locale]}
                fill
                sizes={image.format === "mobile" ? "60px" : "160px"}
                className="object-cover object-top transition-transform duration-300 group-hover/thumb:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt[locale]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/85 p-4 backdrop-blur-sm md:p-10"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={t.projects.gallery.close}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                <path stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="relative h-full max-h-[78vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt[locale]}
                fill
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-contain"
              />
            </div>

            <div className="flex items-center gap-4 text-sm text-white/85" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t.projects.gallery.previous}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                ←
              </button>
              <p className="max-w-xl text-center">
                <span className="mr-2 font-mono text-xs text-white/50">
                  {index + 1}/{images.length}
                </span>
                {current.alt[locale]}
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t.projects.gallery.next}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
