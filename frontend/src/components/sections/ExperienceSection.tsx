"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useLocale } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealStagger, revealItem } from "@/components/Reveal";

export function ExperienceSection() {
  const { locale, t } = useLocale();

  return (
    <section id="experience" className="border-t border-border/10 py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          index="02"
          label={t.experience.label}
          title={t.experience.title}
          description={t.experience.description(profile.experienceYears)}
        />

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.experience.experience}</p>
            <div className="flex flex-col gap-6">
              {profile.experience.map((item) => (
                <motion.div
                  key={item.company}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className="border-l border-border/15 pl-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-ink">{item.company}</h3>
                    <span className="font-mono text-xs text-muted">{item.period[locale]}</span>
                  </div>
                  <p className="mt-1 text-sm text-accent">{item.role[locale]}</p>
                  <p className="mt-1 text-sm text-muted">{item.location}</p>
                  {item.highlights && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {item.highlights[locale].map((point) => (
                        <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink/80">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.experience.expertise}</p>
            <RevealStagger className="flex flex-col divide-y divide-border/10" stagger={0.08}>
              {profile.expertise.map((item) => (
                <motion.div key={item.title.en} variants={revealItem} className="py-4 first:pt-0">
                  <h3 className="text-sm font-semibold text-ink">{item.title[locale]}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description[locale]}</p>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
