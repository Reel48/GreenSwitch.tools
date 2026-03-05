import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ResultCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: LucideIcon;
  variant?: "default" | "highlight" | "savings";
}

const variantStyles: Record<string, string> = {
  default: "",
  highlight: "border-primary",
  savings: "border-green-500/50 bg-green-50 dark:bg-green-950/20",
};

export function ResultCard({
  label,
  value,
  subtext,
  icon: Icon,
  variant = "default",
}: ResultCardProps) {
  return (
    <Card className={cn("transition-shadow hover:shadow-md", variantStyles[variant])}>
      <CardContent className="flex items-start gap-4">
        {Icon && (
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg",
              variant === "savings"
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                : "bg-primary/10 text-primary"
            )}
          >
            <Icon className="size-5" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p
            className={cn(
              "font-semibold tracking-tight",
              variant === "savings"
                ? "text-xl text-green-700 sm:text-2xl dark:text-green-400"
                : "text-lg sm:text-xl"
            )}
          >
            {value}
          </p>
          {subtext && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtext}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
