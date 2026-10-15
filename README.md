# Portfolio — Ichrak Chahbani

Portfolio d'Ichrak Chahbani, développeuse web Full-Stack : profil, projets, expérience et
compétences, en français et en anglais.

En ligne : https://ichrak-chahbani.vercel.app

Le site est une application Next.js 14 (App Router, TypeScript, Tailwind CSS, Framer Motion)
située dans `frontend/`.

## Modifier le contenu du portfolio

Toutes les données du profil (projets, expérience, compétences, formation, langues, contact)
sont dans un seul fichier bilingue : `shared/profile.json`. Chaque texte existe en `fr` et en
`en`, et le visiteur bascule avec le bouton FR / EN (le français est la langue par défaut).

Les textes de l'interface (titres de sections, boutons) sont dans `frontend/src/data/ui.ts`.

Les captures des projets sont dans `frontend/public/projects/<projet>/` et déclarées dans le
champ `images` de chaque projet.

Les CV téléchargeables sont dans `frontend/public/cv/` (une version française et une version
anglaise). Le bouton « Télécharger le CV » propose celle qui correspond à la langue de la page ;
les chemins sont définis dans `cvUrl` de `shared/profile.json`. Pour mettre à jour un CV, il
suffit de remplacer le PDF en gardant le même nom de fichier.

## Lancer le projet en local

```bash
cd frontend
npm install
npm run dev
```

Le site est alors disponible sur `http://localhost:3000`.

## Déploiement sur Vercel

Le site est déployé sur Vercel ; chaque `git push` sur `main` déclenche un nouveau déploiement.

Réglages du projet Vercel :

1. **Root Directory** : `frontend`.
2. Laisser activée l'option « Include files outside of the Root Directory in the Build Step » :
   le site lit `shared/profile.json`, situé hors de `frontend/`.
3. Aucune variable d'environnement n'est nécessaire. L'URL publique du site, utilisée pour
   l'image d'aperçu sur LinkedIn et les réseaux, est définie dans `metadataBase` de
   `frontend/src/app/layout.tsx`.
