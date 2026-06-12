"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";
import { cn, formatCurrency } from "@/lib/utils";

type VerdictTone = "positive" | "negative" | "neutral";

interface VerdictBannerProps {
  headline: string;
  amount: number;
  format?: (n: number) => string;
  caption?: string;
  tone?: VerdictTone;
  detail?: React.ReactNode;
}

const toneStyles: Record<VerdictTone, { container: string; value: string }> = {
  positive: {
    container:
      "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800/50 dark:from-green-950/30 dark:to-emerald-950/30",
    value: "text-green-700 dark:text-green-400",
  },
  negative: {
    container:
      "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-800/50 dark:from-amber-950/30 dark:to-orange-950/30",
    value: "text-amber-700 dark:text-amber-400",
  },
  neutral: {
    container: "border-border bg-gradient-to-br from-muted/60 to-muted/20",
    value: "text-foreground",
  },
};

/**
 * The hero result: a large animated number with a one-line verdict.
 * The amount glides from its previous value on live recalculation.
 */
export function VerdictBanner({
  headline,
  amount,
  format = (n) => formatCurrency(Math.round(n)),
  caption,
  tone = "positive",
  detail,
}: VerdictBannerProps) {
  const animated = useCountUp(amount);
  const styles = toneStyles[tone];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border p-6 text-center shadow-md md:p-8",
        styles.container,
      )}
    >
      <p className="text-sm font-medium text-muted-foreground">{headline}</p>
      <p
        className={cn(
          "mt-2 text-4xl font-bold tracking-tight tabular-nums md:text-5xl",
          styles.value,
        )}
      >
        {format(animated)}
      </p>
      {caption && (
        <p className="mt-1 text-sm text-muted-foreground">{caption}</p>
      )}
      {detail && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {detail}
        </div>
      )}
    </motion.div>
  );
}
