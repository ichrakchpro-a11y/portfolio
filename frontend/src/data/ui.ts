import type { Locale } from "@/data/profile";

// Textes de l'interface (hors données du profil), dans les deux langues.
export const ui = {
  fr: {
    nav: { projects: "Projets", experience: "Expertise", stack: "Stack", about: "À propos", contact: "Contact" },
    navToggle: "Ouvrir ou fermer le menu",
    switchLanguage: "Switch to English",
    themeToLight: "Passer au thème clair",
    themeToDark: "Passer au thème sombre",
    hero: {
      available: "Disponible pour de nouvelles opportunités",
      viewWork: "Voir mes projets",
      contact: "Me contacter",
      downloadCv: "Télécharger le CV",
      stats: { years: "Années d'expérience", projects: "Projets livrés", languages: "Langues parlées" },
    },
    projects: {
      label: "Projets",
      title: "Quelques projets à montrer",
      description:
        "D'un CMS headless multi-tenant à des outils mobiles critiques : des produits conçus et livrés pour de vraies équipes. Du plus récent au plus ancien.",
      googlePlay: "Disponible sur Google Play",
      appStore: "Disponible sur l'App Store",
      website: "Voir le site",
      gallery: {
        open: (n: number, total: number) => `Agrandir la capture ${n} sur ${total}`,
        close: "Fermer",
        previous: "Capture précédente",
        next: "Capture suivante",
      },
    },
    experience: {
      label: "Expérience & expertise",
      title: "Là où le travail se fait",
      description: (years: number) =>
        `Plus de ${years} ans chez YZY Digital à concevoir, développer et mettre en production des produits web, de l'idée au déploiement.`,
      experience: "Expérience",
      expertise: "Expertise",
    },
    stack: {
      label: "Stack technique",
      title: "Les outils que j'utilise",
      description: "Une boîte à outils pragmatique, construite sur des produits en production.",
    },
    about: {
      label: "À propos",
      title: "Au-delà du code",
      education: "Formation",
      languages: "Langues",
      basedIn: "Basée à",
    },
    contact: {
      label: "Contact",
      title: "Construisons quelque chose de fiable, bien conçu et prêt à être livré.",
      copy: "Copier l'adresse",
      copied: "Copiée ✓",
    },
    footer: "Réalisé avec Next.js, Tailwind CSS & Framer Motion",
  },
  en: {
    nav: { projects: "Work", experience: "Expertise", stack: "Stack", about: "About", contact: "Contact" },
    navToggle: "Toggle menu",
    switchLanguage: "Passer en français",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    hero: {
      available: "Available for new opportunities",
      viewWork: "View My Work",
      contact: "Contact Me",
      downloadCv: "Download CV",
      stats: { years: "Years of experience", projects: "Shipped projects", languages: "Spoken languages" },
    },
    projects: {
      label: "Selected Work",
      title: "A few projects worth showing",
      description:
        "From a headless multi-tenant CMS to mission-critical mobile tools — products built and shipped for real teams. Most recent first.",
      googlePlay: "Get it on Google Play",
      appStore: "Download on the App Store",
      website: "Visit website",
      gallery: {
        open: (n: number, total: number) => `Enlarge screenshot ${n} of ${total}`,
        close: "Close",
        previous: "Previous screenshot",
        next: "Next screenshot",
      },
    },
    experience: {
      label: "Experience & Expertise",
      title: "Where the work happens",
      description: (years: number) =>
        `${years}+ years at YZY Digital designing, building and shipping web products, from idea to deployment.`,
      experience: "Experience",
      expertise: "Core expertise",
    },
    stack: {
      label: "Technology Stack",
      title: "Tools I reach for",
      description: "A pragmatic toolkit assembled across production products, not a checklist of buzzwords.",
    },
    about: {
      label: "About",
      title: "Beyond the code",
      education: "Education",
      languages: "Languages",
      basedIn: "Based in",
    },
    contact: {
      label: "Contact",
      title: "Let's build something reliable, well-engineered, and worth shipping.",
      copy: "Copy address",
      copied: "Copied ✓",
    },
    footer: "Built with Next.js, Tailwind CSS & Framer Motion",
  },
} satisfies Record<Locale, unknown>;

export type UiStrings = (typeof ui)["fr"];
