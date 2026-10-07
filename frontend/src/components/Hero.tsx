"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useLocale } from "@/lib/i18n";
import { Counter } from "@/components/Counter";
import { TechOrbit } from "@/components/TechOrbit";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { locale, t } = useLocale();
  const [titleMain, titleTech] = profile.title[locale].split(" | ");

  const stats = [
    { id: "years", value: profile.experienceYears, suffix: "+", label: t.hero.stats.years },
    { id: "projects", value: profile.projects.length, suffix: "", label: t.hero.stats.projects },
    { id: "languages", value: profile.languages.length, suffix: "", label: t.hero.stats.languages },
  ];

  return (
    <section id="home" ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="mx-auto grid w-full max-w-content items-center gap-8 px-5 md:grid-cols-[1.1fr_0.9fr] md:gap-4 md:px-8">
        <div className="flex flex-col gap-7">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {t.hero.available}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col gap-2 text-xl text-muted md:text-2xl"
          >
            {/* « Titre | technos » : les technos passent sur une seconde ligne plus discrète. */}
            <span>{titleMain}</span>
            {titleTech && (
              <span className="font-mono text-sm tracking-wide text-muted/80">{titleTech}</span>
            )}
          </motion.p>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-lg text-base leading-relaxed text-muted"
          >
            {profile.heroDescription[locale]}
          </motion.p>

          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => scrollTo("#projects")}
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              {t.hero.viewWork}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 rounded-md border border-border/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {t.hero.contact}
            </button>
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-ink underline decoration-border/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {t.hero.downloadCv}
                <span aria-hidden>↓</span>
              </a>
            )}

            <div className="ml-1 flex items-center gap-3 text-muted">
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-ink/5 hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    stroke="currentColor"
                    strokeWidth="1.6"
                    d="M3.5 6.5h17v11h-17z"
                  />
                  <path stroke="currentColor" strokeWidth="1.6" d="m3.5 7 8.5 6.5L20.5 7" />
                </svg>
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-ink/5 hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                  <path stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M8 10.5v6M8 7.75v.01M12.5 16.5v-3.6c0-1.2.9-2.15 2.1-2.15 1.15 0 1.9.85 1.9 2.15v3.6" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex max-w-md gap-8 border-t border-border/10 pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.id}>
                <p className="font-heading text-2xl font-semibold text-ink">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <TechOrbit />
      </div>
    </section>
  );
}
