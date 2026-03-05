"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ComparisonBarItem {
  label: string;
  value: number;
  color: string;
}

interface ComparisonBarProps {
  items: ComparisonBarItem[];
  formatValue?: (value: number) => string;
}

export function ComparisonBar({ items, formatValue }: ComparisonBarProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  const format = formatValue ?? ((v: number) => v.toLocaleString("en-US"));

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const widthPercent = (item.value / maxValue) * 100;

        return (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="min-w-0 truncate font-medium">{item.label}</span>
              <span className="shrink-0 pl-2 text-muted-foreground">
                {format(item.value)}
              </span>
            </div>
            <div className="h-6 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full transition-all duration-700 ease-out")}
                style={{
                  width: `${Math.max(widthPercent, 2)}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
