import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="flex flex-col gap-4">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-border/20" aria-hidden />
        <span>{label}</span>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description && <p className="max-w-2xl text-base text-muted">{description}</p>}
    </Reveal>
  );
}
