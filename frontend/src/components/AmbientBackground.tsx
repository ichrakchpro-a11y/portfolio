"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Soft out-of-focus shapes, like the blurred office behind the portrait:
// oak furniture, green plants, a hint of navy.
const blobs = [
  { color: "var(--wood)", size: 42, x: 72, y: 8, opacity: 0.28, duration: 26, delay: 0 },
  { color: "var(--leaf)", size: 34, x: -6, y: 38, opacity: 0.22, duration: 32, delay: -8 },
  { color: "var(--accent)", size: 30, x: 58, y: 62, opacity: 0.12, duration: 36, delay: -14 },
  { color: "var(--leaf)", size: 26, x: 86, y: 48, opacity: 0.18, duration: 28, delay: -20 },
  { color: "var(--wood)", size: 28, x: 8, y: 82, opacity: 0.2, duration: 30, delay: -4 },
];

export function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      ref.current?.style.setProperty("--mx", `${event.clientX}px`);
      ref.current?.style.setProperty("--my", `${event.clientY}px`);
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ "--mx": "50%", "--my": "30%" } as CSSProperties}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl motion-reduce:!animate-none"
          style={{
            width: `${b.size}vmax`,
            height: `${b.size}vmax`,
            left: `${b.x}%`,
            top: `${b.y}%`,
            background: `radial-gradient(circle, rgb(${b.color} / ${b.opacity}), transparent 68%)`,
            animation: `drift ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}

      {/* Daylight falling through the windows. */}
      <div
        className="absolute -top-1/4 left-[30%] h-[150%] w-[40%] motion-reduce:!animate-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.10) 30%, transparent 45%, rgb(255 255 255 / 0.07) 65%, transparent)",
          animation: "light-sweep 18s ease-in-out infinite",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(520px circle at var(--mx) var(--my), rgb(var(--wood) / 0.10), transparent 70%)",
        }}
      />
    </div>
  );
}
