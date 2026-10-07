"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useActiveSection } from "@/lib/useActiveSection";
import { useLocale } from "@/lib/i18n";
import type { UiStrings } from "@/data/ui";

const links: Array<{ key: keyof UiStrings["nav"]; href: string }> = [
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "stack", href: "#stack" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const active = useActiveSection(links.map((l) => l.href.slice(1)));

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-border/10 bg-bg/85 backdrop-blur-sm" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#home"
          onClick={(e) => handleNavigate(e, "#home")}
          className="font-mono text-sm font-medium tracking-tight text-ink"
        >
          ichrak<span className="text-accent">.</span>chahbani
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavigate(e, link.href)}
                className={`relative px-3.5 py-2 text-sm transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {t.nav[link.key]}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-0.5 left-3.5 right-3.5 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            aria-label={t.navToggle}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="block h-px w-5 bg-ink" />
              <motion.span animate={{ opacity: open ? 0 : 1 }} className="block h-px w-5 bg-ink" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="block h-px w-5 bg-ink" />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[65px] z-30 flex flex-col bg-bg md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavigate(e, link.href)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                className="flex items-baseline gap-4 border-b border-border/10 px-6 py-6 text-2xl font-medium text-ink"
              >
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
                {t.nav[link.key]}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
