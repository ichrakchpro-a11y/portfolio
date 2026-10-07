"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useLocale } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealStagger, revealItem } from "@/components/Reveal";

export function StackSection() {
  const { locale, t } = useLocale();

  return (
    <section id="stack" className="border-t border-border/10 py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading index="03" label={t.stack.label} title={t.stack.title} description={t.stack.description} />

        <RevealStagger
          className="mt-16 grid grid-cols-1 gap-x-10 border-b border-border/10 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
        >
          {profile.skills.map(({ category, items }) => (
            <motion.div key={category.en} variants={revealItem} className="flex flex-col gap-4 border-t border-border/10 py-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{category[locale]}</p>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item} className="text-sm text-ink/85">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
