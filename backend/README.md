# Backend — API NestJS

API du portfolio d'Ichrak Chahbani : expose l'assistant conversationnel (`POST /chat/ask`) et
journalise les questions posées dans MongoDB.

Voir le [README à la racine du dépôt](../README.md) pour les instructions d'installation et de
déploiement.

## Structure

- `src/profile/profile-context.ts` : contenu du profil (identité, projets, formation) injecté
  comme contexte système de l'assistant.
- `src/llm/` : abstraction du fournisseur de génération de texte (`LlmProvider`) et son
  implémentation Gemini (`GeminiProvider`).
- `src/chat/` : module NestJS (controller, service, DTO, schéma Mongoose) exposant l'endpoint
  de l'assistant.
