"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Animates a number toward `target`, starting from the previously displayed
 * value (not zero) so live recalculations glide instead of restarting.
 * Returns the raw interpolated value — format in the caller.
 */
export function useCountUp(target: number, duration: number = 450): number {
  const [current, setCurrent] = useState(0);
  const displayedRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = displayedRef.current;
    if (from === target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (reduceMotion) {
        displayedRef.current = target;
        setCurrent(target);
        return;
      }
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = from + (target - from) * eased;
      displayedRef.current = value;
      setCurrent(value);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration]);

  return current;
}
