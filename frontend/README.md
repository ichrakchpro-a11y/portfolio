# Frontend — Portfolio Next.js

Site du portfolio d'Ichrak Chahbani (Next.js 14, App Router, TypeScript, TailwindCSS), avec le
widget de chat de l'assistant conversationnel.

Voir le [README à la racine du dépôt](../README.md) pour les instructions d'installation et de
déploiement.

## Structure

- `src/data/profile.ts` : contenu réel du portfolio (profil, projets, expérience, compétences).
- `src/components/Sidebar.tsx` : navigation façon arborescence de fichiers d'un IDE.
- `src/components/EditorTabBar.tsx` : fil d'ariane façon invite de terminal.
- `src/components/ChatWidget.tsx` : widget de chat flottant relié au backend.
- `src/components/ProjectCard.tsx` : carte de projet façon fichier ouvert dans un éditeur.
- `src/app/globals.css` : palette de couleurs et animations (avec prise en charge de
  `prefers-reduced-motion`).
