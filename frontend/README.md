# Frontend — Portfolio Next.js

Site du portfolio d'Ichrak Chahbani (Next.js 14, App Router, TypeScript, Tailwind CSS,
Framer Motion), bilingue français / anglais.

Voir le [README à la racine du dépôt](../README.md) pour les instructions d'installation et de
déploiement.

## Structure

- `../shared/profile.json` : tout le contenu du portfolio (profil, projets, expérience,
  compétences), dans les deux langues.
- `src/data/profile.ts` : types et import de `profile.json`.
- `src/data/ui.ts` : textes de l'interface (titres de sections, boutons) en français et en anglais.
- `src/lib/i18n.tsx` : gestion de la langue (français par défaut, bouton FR / EN).
- `src/components/Hero.tsx` et `src/components/TechOrbit.tsx` : en-tête avec la photo et le
  cercle de logos.
- `src/components/sections/` : sections Projets, Expérience, Stack, À propos et Contact.
- `src/components/ProjectGallery.tsx` : captures d'écran des projets, avec agrandissement.
- `public/projects/` : captures des projets ; `public/cv/` : CV en PDF (FR et EN).
- `src/app/globals.css` : palette de couleurs et animations (avec prise en charge de
  `prefers-reduced-motion`).
