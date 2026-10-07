"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import {
  siDocker,
  siGraphql,
  siJavascript,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { profile } from "@/data/profile";

type Tech = { label: string; icon: SimpleIcon };

type Ring = {
  radius: number; // in cqw, relative to the container width
  duration: number; // seconds per full turn
  reverse?: boolean;
  offset: number; // starting angle in degrees
  items: Tech[];
};

const rings: Ring[] = [
  {
    radius: 43,
    duration: 80,
    offset: -90,
    items: [
      { label: "React", icon: siReact },
      { label: "Next.js", icon: siNextdotjs },
      { label: "TypeScript", icon: siTypescript },
      { label: "Tailwind", icon: siTailwindcss },
      { label: "JavaScript", icon: siJavascript },
      { label: "NestJS", icon: siNestjs },
      { label: "Node.js", icon: siNodedotjs },
      { label: "MongoDB", icon: siMongodb },
      { label: "MySQL", icon: siMysql },
      { label: "Docker", icon: siDocker },
      { label: "GraphQL", icon: siGraphql },
    ],
  },
];

function TechLogo({ icon }: { icon: SimpleIcon }) {
  // Black logos (e.g. Next.js) would vanish in dark mode, so they follow the text color instead.
  const fill = icon.hex === "000000" ? "currentColor" : `#${icon.hex}`;
  return (
    <svg viewBox="0 0 24 24" className="h-[5.5cqw] w-[5.5cqw] text-ink" aria-hidden>
      <path d={icon.path} fill={fill} />
    </svg>
  );
}

function OrbitRing({ ring, index }: { ring: Ring; index: number }) {
  const spin = `orbit-spin ${ring.duration}s linear infinite${ring.reverse ? " reverse" : ""}`;
  // Badges spin the opposite way at the same speed so they always stay upright.
  const counterSpin = `orbit-spin ${ring.duration}s linear infinite${ring.reverse ? "" : " reverse"}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
      className="absolute inset-0"
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/10"
        style={{ width: `${ring.radius * 2}cqw`, height: `${ring.radius * 2}cqw` }}
      />
      <div className="orbit-track absolute inset-0" style={{ animation: spin }}>
        {ring.items.map(({ label, icon }, i) => {
          const angle = ring.offset + (360 / ring.items.length) * i;
          const style: CSSProperties = {
            transform: `rotate(${angle}deg) translateX(${ring.radius}cqw) rotate(${-angle}deg)`,
          };
          return (
            <div key={label} className="absolute left-1/2 top-1/2 h-0 w-0" style={style}>
              <div className="orbit-track h-0 w-0" style={{ animation: counterSpin }}>
                <div className="peer absolute left-0 top-0 flex h-[12cqw] w-[12cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border/10 bg-raised shadow-[0_4px_20px_-6px_rgb(0_0_0/0.35)] transition-[transform,border-color] duration-300 hover:scale-110 hover:border-wood/60">
                  <TechLogo icon={icon} />
                </div>
                <span className="pointer-events-none absolute left-0 top-[7.5cqw] -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-0.5 font-mono text-[11px] text-bg opacity-0 transition-opacity duration-200 peer-hover:opacity-100">
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function TechOrbit() {
  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[34rem] [container-type:inline-size]">
      <div
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(var(--wood)/0.35),transparent_70%)] blur-2xl"
        aria-hidden
      />

      {rings.map((ring, i) => (
        <OrbitRing key={ring.radius} ring={ring} index={i} />
      ))}

      {/* Plain wrapper keeps the centering transform; framer-motion owns the inner one. */}
      <div className="absolute left-1/2 top-1/2 h-[64cqw] w-[64cqw] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-raised bg-raised shadow-[0_0_0_1px_rgb(var(--wood)/0.5),0_24px_60px_-12px_rgb(var(--accent)/0.35)]"
        >
          <Image src="/ichrak.jpg" alt={profile.name} fill sizes="(min-width: 768px) 360px, 60vw" priority className="object-cover" />
        </motion.div>
      </div>
    </div>
  );
}
