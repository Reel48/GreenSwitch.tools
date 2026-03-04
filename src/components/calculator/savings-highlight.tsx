"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface SavingsHighlightProps {
  amount: number;
  label: string;
  period?: string;
}

function useAnimatedCounter(target: number, duration: number = 1200) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

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

export function SavingsHighlight({
  amount,
  label,
  period,
}: SavingsHighlightProps) {
  const animatedAmount = useAnimatedCounter(amount);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center dark:border-green-800/50 dark:from-green-950/30 dark:to-emerald-950/30 md:p-8"
    >
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-4xl font-bold tracking-tight text-green-700 dark:text-green-400 md:text-5xl">
        {formatCurrency(animatedAmount)}
      </p>
      {period && (
        <p className="mt-1 text-sm text-muted-foreground">{period}</p>
      )}
    </motion.div>
  );
}
