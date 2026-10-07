"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useLocale } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealStagger, revealItem } from "@/components/Reveal";

export function AboutSection() {
  const { locale, t } = useLocale();

  return (
    <section id="about" className="border-t border-border/10 py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading index="04" label={t.about.label} title={t.about.title} />

        <div className="mt-16 grid gap-14 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal className="flex flex-col gap-8">
            <div className="flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-ink/90">
              {profile.bio[locale].split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.about.education}</p>
              <div className="flex flex-col gap-4">
                {profile.education.map((item) => (
                  <div key={item.degree.en} className="border-l border-border/15 pl-4">
                    <p className="text-sm font-medium text-ink">{item.degree[locale]}</p>
                    <p className="mt-0.5 text-sm text-muted">
                      {item.school} <span className="text-border">·</span> {item.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.about.languages}</p>
            <RevealStagger className="flex flex-col gap-5" stagger={0.08}>
              {profile.languages.map((lang) => (
                <motion.div key={lang.name.en} variants={revealItem} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-ink">{lang.name[locale]}</span>
                    <span className="font-mono text-xs text-muted">{lang.level[locale]}</span>
                  </div>
                  <div className="h-px w-full bg-border/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-px bg-accent"
                    />
                  </div>
                </motion.div>
              ))}
            </RevealStagger>

            <div className="mt-4 flex flex-col gap-1 border-t border-border/10 pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.about.basedIn}</p>
              <p className="text-sm text-ink">{profile.location[locale]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
