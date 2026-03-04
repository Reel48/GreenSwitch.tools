"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalculatorMethodologyProps {
  content: string;
}

export function CalculatorMethodology({
  content,
}: CalculatorMethodologyProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="space-y-3">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-0 hover:bg-transparent"
      >
        <h2 className="text-xl font-semibold tracking-tight">
          How We Calculate This
        </h2>
        <ChevronDown
          className={cn(
            "size-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="prose prose-sm max-w-none pb-4 text-muted-foreground dark:prose-invert">
            {content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
