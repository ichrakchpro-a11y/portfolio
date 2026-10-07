"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useLocale } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealStagger, revealItem } from "@/components/Reveal";
import { ProjectGallery } from "@/components/ProjectGallery";
import type { UiStrings } from "@/data/ui";

function linkLabel(url: string, t: UiStrings): string {
  const host = new URL(url).hostname;
  if (host === "play.google.com") return t.projects.googlePlay;
  if (host === "apps.apple.com") return t.projects.appStore;
  return t.projects.website;
}

export function ProjectsSection() {
  const { locale, t } = useLocale();

  return (
    <section id="projects" className="border-t border-border/10 py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading index="01" label={t.projects.label} title={t.projects.title} description={t.projects.description} />

        <RevealStagger className="mt-16 flex flex-col" stagger={0.08}>
          {profile.projects.map((project, index) => {
            const name = project.name[locale];
            const keyPoints = project.keyPoints[locale];

            return (
              <motion.div
                key={project.slug}
                id={project.slug}
                variants={revealItem}
                className="group scroll-mt-24 border-b border-border/10 py-10 first:pt-0 md:grid md:grid-cols-[3rem_1fr_16rem] md:gap-8"
              >
                <span className="font-mono text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>

                <div className="mt-3 md:mt-0">
                  <h3 className="text-xl font-semibold text-ink md:text-2xl">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                      >
                        {name}
                        <span aria-hidden className="text-base text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                          ↗
                        </span>
                      </a>
                    ) : (
                      name
                    )}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{project.description[locale]}</p>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-md border border-border/15 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {linkLabel(project.url, t)}
                      <span aria-hidden>↗</span>
                    </a>
                  )}

                  {keyPoints.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {keyPoints.map((point) => (
                        <li key={point} className="flex gap-2.5 text-sm text-ink/80">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {project.images && project.images.length > 0 && <ProjectGallery images={project.images} />}
                </div>

                <p className="mt-5 font-mono text-xs leading-relaxed text-muted md:mt-0 md:text-right">
                  {project.stack.map((tech, i) => (
                    <span key={tech}>
                      {i > 0 && " · "}
                      <span className="whitespace-nowrap">{tech}</span>
                    </span>
                  ))}
                </p>
              </motion.div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
