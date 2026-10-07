# Portfolio — Ichrak Chahbani

Portfolio full-stack présentant le profil, les projets, l'expérience et les compétences
d'Ichrak Chahbani, avec un assistant conversationnel qui répond aux questions des visiteurs
à partir de ces informations.

Le projet est composé de deux applications indépendantes :

- `backend/` : API NestJS exposant l'endpoint de l'assistant (`POST /chat/ask`) et journalisant
  les questions posées dans MongoDB.
- `frontend/` : site Next.js 14 (App Router, TypeScript) affichant le portfolio et le widget
  de chat.

Ce sont deux projets npm distincts, sans outillage de monorepo : chacun a son propre
`package.json`, ses propres dépendances et son propre `tsconfig.json`.

## Modifier le contenu du portfolio

Toutes les données du profil (projets, expérience, compétences, formation, langues, contact)
sont dans un seul fichier bilingue : `shared/profile.json`. Le frontend l'affiche et le backend
s'en sert pour générer le contexte de l'assistant, donc le site et l'assistant restent toujours
cohérents. Chaque texte existe en `fr` et en `en`, et le visiteur bascule avec le bouton FR / EN.

Les textes de l'interface (titres de sections, boutons, chat) sont dans `frontend/src/data/ui.ts`.

Pour proposer le téléchargement du CV : déposer le PDF dans `frontend/public/` (par exemple
`frontend/public/cv-ichrak-chahbani.pdf`) et renseigner `"cvUrl": "/cv-ichrak-chahbani.pdf"`
dans `shared/profile.json`. Le bouton « Télécharger le CV » n'apparaît que si `cvUrl` est défini.

Après une modification de `shared/profile.json`, redémarrer le backend pour que l'assistant
prenne en compte les nouvelles données.

## Lancer le projet en local

### Backend

```bash
cd backend
cp .env.example .env
# renseigner MONGODB_URI et GEMINI_API_KEY dans .env
npm install
npm run start:dev
```

Le serveur démarre par défaut sur `http://localhost:3000`.

### Frontend

```bash
cd frontend
cp .env.local.example .env.local
# vérifier que NEXT_PUBLIC_API_URL pointe vers le backend (port défini par PORT dans backend/.env)
npm install
npm run dev
```

Le site est alors disponible sur `http://localhost:3001` si le port 3000 est déjà pris par le
backend (Next.js choisit automatiquement un port libre), ou sur `http://localhost:3000` sinon.

## Obtenir une clé API Gemini gratuite

L'assistant utilise l'API Gemini pour générer ses réponses. Une clé gratuite peut être créée
depuis Google AI Studio, en se connectant avec un compte Google puis en générant une clé API.
Cette clé se renseigne dans `backend/.env` sous la variable `GEMINI_API_KEY`.

## Déploiement

### Frontend sur Vercel

1. Importer le dépôt dans Vercel.
2. Définir `frontend/` comme racine du projet (« Root Directory »).
3. Ajouter les variables d'environnement `NEXT_PUBLIC_API_URL` (URL publique du backend
   déployé) et `NEXT_PUBLIC_SITE_URL` (URL publique du site, utilisée pour l'image d'aperçu
   sur LinkedIn et les réseaux).
4. Laisser activée l'option « Include files outside of the Root Directory in the Build Step »
   (activée par défaut) : le frontend lit `shared/profile.json`, situé hors de `frontend/`.
5. Déployer : Vercel détecte automatiquement Next.js et applique la commande de build standard.

### Backend sur Render ou Railway

1. Créer un nouveau service web Node à partir du dépôt, en pointant sur le dossier `backend/`.
   Le dépôt complet doit être cloné (comportement par défaut), car le backend lit
   `shared/profile.json` à la racine.
2. Commande d'installation : `npm install`. Commande de démarrage : `npm run start:prod`
   (après `npm run build`, ou laisser la plateforme exécuter le build automatiquement).
3. Renseigner les variables d'environnement : `MONGODB_URI`, `GEMINI_API_KEY`, `GEMINI_MODEL`,
   `ALLOWED_ORIGIN` (l'URL du frontend déployé sur Vercel) et `PORT` (si la plateforme l'exige).
4. L'API est limitée à 10 questions par minute et 60 par heure pour chaque IP, afin de
   protéger le quota Gemini (réglable dans `backend/src/app.module.ts`).

### Base de données sur MongoDB Atlas

Créer un cluster gratuit sur MongoDB Atlas, y créer un utilisateur de base de données et
autoriser l'accès réseau nécessaire, puis récupérer la chaîne de connexion à renseigner dans
`MONGODB_URI` (en local et sur la plateforme de déploiement du backend).
