import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { StackSection } from "@/components/sections/StackSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <StackSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
