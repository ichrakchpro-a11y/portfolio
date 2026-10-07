import { readFileSync } from 'node:fs';

type Localized<T = string> = { fr: T; en: T };

interface Profile {
  name: string;
  title: Localized;
  location: Localized;
  experienceYears: number;
  email: string;
  linkedin: string;
  cvUrl: string | null;
  bio: Localized;
  skills: Array<{ category: Localized; items: string[] }>;
  experience: Array<{ company: string; role: Localized; period: Localized; location: string; highlights?: Localized<string[]> }>;
  expertise: Array<{ title: Localized; description: Localized }>;
  education: Array<{ degree: Localized; school: string; period: string }>;
  languages: Array<{ name: Localized; level: Localized }>;
  projects: Array<{
    name: Localized;
    description: Localized;
    keyPoints: Localized<string[]>;
    stack: string[];
    url?: string;
  }>;
}

// Source unique des données du profil, partagée avec le frontend.
// Le chemin est identique depuis src/profile/ et dist/profile/.
const profile = JSON.parse(
  readFileSync(new URL('../../../shared/profile.json', import.meta.url), 'utf8'),
) as Profile;

function buildProfileContext(p: Profile): string {
  const projects = p.projects
    .map((project, index) => {
      const lines = [
        `## ${index + 1}. ${project.name.fr}`,
        `Description: ${project.description.fr}`,
      ];
      if (project.url) lines.push(`Lien: ${project.url}`);
      if (project.keyPoints.fr.length > 0) {
        lines.push('Points clés:', ...project.keyPoints.fr.map((point) => `- ${point}`));
      }
      lines.push(`Stack: ${project.stack.join(', ')}.`);
      return lines.join('\n');
    })
    .join('\n\n');

  return `
# Profil

Nom: ${p.name}
Titre: ${p.title.fr}
Localisation: ${p.location.fr}
Expérience: ${p.experienceYears} ans
Présentation: ${p.bio.fr}

# Compétences

${p.skills.map((s) => `${s.category.fr}: ${s.items.join(', ')}`).join('\n')}

# Expérience professionnelle

${p.experience
  .map((e) =>
    [`${e.company} — ${e.role.fr} (${e.period.fr}, ${e.location})`, ...(e.highlights?.fr ?? []).map((h) => `- ${h}`)].join('\n'),
  )
  .join('\n')}

# Expertise

${p.expertise.map((x) => `- ${x.title.fr} : ${x.description.fr}`).join('\n')}

# Projets

${projects}

# Formation

${p.education.map((e) => `- ${e.degree.fr} — ${e.school} (${e.period})`).join('\n')}

# Langues

${p.languages.map((l) => `${l.name.fr} (${l.level.fr.toLowerCase()})`).join(', ')}

# Contact

Email: ${p.email}
LinkedIn: ${p.linkedin}${p.cvUrl ? `\nCV: téléchargeable depuis le portfolio` : ''}
`.trim();
}

export const PROFILE_CONTEXT = buildProfileContext(profile);

export function buildSystemPrompt(): string {
  return `Tu es l'assistant du portfolio en ligne d'Ichrak Chahbani. Tu réponds aux questions des visiteurs (souvent des recruteurs) UNIQUEMENT à partir des informations du contexte ci-dessous. N'invente aucune information qui n'y figure pas. Si la réponse à une question ne se trouve pas dans ce contexte, dis honnêtement que tu ne disposes pas de cette information, sans l'inventer. Réponds dans la même langue que la question posée par le visiteur (français par défaut si la langue n'est pas claire). Reste concis et professionnel. Pour la mise en forme, limite-toi au gras (**texte**) et aux listes à puces (- élément) ; pas de titres, de tableaux ni de liens Markdown.

Contexte:
${PROFILE_CONTEXT}`;
}
