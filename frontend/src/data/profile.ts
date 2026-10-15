import data from "../../../shared/profile.json";

// Source unique des données du profil, partagée avec le backend (contexte de l'assistant).
// Pour modifier le contenu du portfolio, éditer shared/profile.json à la racine du dépôt.

export type Locale = "fr" | "en";
export type Localized<T = string> = Record<Locale, T>;

export interface Project {
  slug: string;
  name: Localized;
  description: Localized;
  keyPoints: Localized<string[]>;
  stack: string[];
  images?: Array<{ src: string; alt: Localized; format?: string }>; // format: "mobile" (téléphone, portrait) ou "tablet" (iPad)
  url?: string;
}

export interface Profile {
  name: string;
  title: Localized;
  location: Localized;
  experienceYears: number;
  email: string;
  linkedin: string;
  linkedinUrl: string;
  cvUrl: Localized | null;
  heroDescription: Localized;
  bio: Localized;
  skills: Array<{ category: Localized; items: string[] }>;
  experience: Array<{ company: string; role: Localized; period: Localized; location: string; highlights?: Localized<string[]> }>;
  expertise: Array<{ title: Localized; description: Localized }>;
  education: Array<{ degree: Localized; school: string; period: string }>;
  languages: Array<{ name: Localized; level: Localized; percent: number }>;
  projects: Project[];
}

export const profile: Profile = data;
