"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { Settings2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface InputSectionProps {
  title: string;
  icon?: LucideIcon;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

/** A visible group of inputs with an icon-chip header. */
export function InputSection({
  title,
  icon: Icon,
  description,
  className,
  children,
}: InputSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

interface AdvancedSectionsProps {
  label?: string;
  children: React.ReactNode;
}

/**
 * Wrapper for collapsed "advanced" input sections. Compose with
 * AdvancedSection children; each renders as an accordion item.
 */
export function AdvancedSections({
  label = "Advanced settings",
  children,
}: AdvancedSectionsProps) {
  const count = React.Children.count(children);
  const openedRef = React.useRef<Set<string>>(new Set());

  const handleValueChange = (open: string[]) => {
    for (const section of open) {
      if (!openedRef.current.has(section)) {
        openedRef.current.add(section);
        track("advanced_section_opened", { section });
      }
    }
  };

  return (
    <div className="rounded-lg border bg-muted/30 px-4">
      <div className="flex items-center gap-2 pt-3">
        <Settings2 className="size-4 text-muted-foreground" />
        <span className="text-sm font-semibold">{label}</span>
        <Badge variant="secondary" className="text-[10px]">
          {count} {count === 1 ? "section" : "sections"}
        </Badge>
      </div>
      <Accordion type="multiple" onValueChange={handleValueChange}>
        {children}
      </Accordion>
    </div>
  );
}

interface AdvancedSectionProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

/** A single collapsible section inside AdvancedSections. */
export function AdvancedSection({
  title,
  icon: Icon,
  children,
}: AdvancedSectionProps) {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="text-sm font-medium hover:no-underline">
        <span className="flex items-center gap-2">
          {Icon && <Icon className="size-4 text-muted-foreground" />}
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-1">{children}</AccordionContent>
    </AccordionItem>
  );
}
