"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface ComparisonBarItem {
  label: string;
  value: number;
  color: string;
}

interface ComparisonBarProps {
  items: ComparisonBarItem[];
  formatValue?: (value: number) => string;
  showPercent?: boolean;
}

export function ComparisonBar({
  items,
  formatValue,
  showPercent = false,
}: ComparisonBarProps) {
  const maxValue = Math.max(...items.map((item) => Math.abs(item.value)), 1);
  const total = items.reduce((sum, item) => sum + Math.abs(item.value), 0);

  const format = formatValue ?? ((v: number) => v.toLocaleString("en-US"));

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const widthPercent = (Math.abs(item.value) / maxValue) * 100;
        const shareOfTotal =
          total > 0 ? (Math.abs(item.value) / total) * 100 : 0;

        return (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="min-w-0 truncate font-medium">{item.label}</span>
              <span className="shrink-0 pl-2 tabular-nums text-muted-foreground">
                {format(item.value)}
                {showPercent && (
                  <span className="ml-1.5 text-[11px] opacity-70">
                    {shareOfTotal.toFixed(0)}%
                  </span>
                )}
              </span>
            </div>
            <div className="h-6 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(widthPercent, 2)}%` }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                style={{
                  background: `linear-gradient(90deg, ${item.color}, color-mix(in oklab, ${item.color} 78%, transparent))`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
