"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Tracks how far the viewport has scrolled past `ref`'s element, as a 0..1
 * fraction of its own height. Stored in a ref (not state) so callers driving
 * a render loop (e.g. r3f's useFrame) can read it every frame without
 * triggering React re-renders.
 */
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const progress = useRef(0);

  useEffect(() => {
    function onScroll() {
      const el = ref.current;
      if (!el) return;
      const height = el.offsetHeight || 1;
      progress.current = Math.min(Math.max(window.scrollY / height, 0), 1);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return progress;
}
