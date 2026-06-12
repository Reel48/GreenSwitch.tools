"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { CalculatorMethodology } from "./calculator-methodology";
import { CalculatorFaq } from "./calculator-faq";
import { HowToSchema } from "@/components/seo/howto-schema";
import type { LucideIcon } from "lucide-react";

interface RelatedCalculator {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

interface FAQ {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface CalculatorShellProps {
  title: string;
  description: string;
  lastUpdated: string;
  children: React.ReactNode;
  results?: React.ReactNode;
  mobileSummary?: React.ReactNode;
  methodology?: string;
  faqs?: FAQ[];
  relatedCalculators?: RelatedCalculator[];
  howToSteps?: HowToStep[];
  url?: string;
}

export function CalculatorShell({
  title,
  description,
  lastUpdated,
  children,
  results,
  mobileSummary,
  methodology,
  faqs,
  relatedCalculators,
  howToSteps,
  url,
}: CalculatorShellProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:space-y-8 md:py-12 lg:max-w-7xl">
      {/* HowTo Schema */}
      {howToSteps && url && (
        <HowToSchema
          name={title}
          description={description}
          url={url}
          steps={howToSteps}
        />
      )}

      {/* Hero Section */}
      <section className="relative space-y-4 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 -top-12 -bottom-4 -z-10 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_65%)]"
        />
        <Badge variant="secondary" className="text-xs">
          Updated {lastUpdated}
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      </section>

      <Separator />

      {/* Calculator: inputs + live results */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:items-start">
        <Card>
          <CardHeader>
            <CardTitle>Your Inputs</CardTitle>
            <p className="text-sm text-muted-foreground">
              Results update instantly as you make changes.
            </p>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>

        <div
          id="calc-results"
          className="scroll-mt-20 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pb-2"
        >
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {results}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile sticky headline (hidden while results are on screen) */}
      {mobileSummary}

      {/* Methodology */}
      {methodology && (
        <div className="mx-auto w-full max-w-4xl space-y-6 sm:space-y-8">
          <Separator />
          <CalculatorMethodology content={methodology} />
        </div>
      )}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <div className="mx-auto w-full max-w-4xl space-y-6 sm:space-y-8">
          <Separator />
          <CalculatorFaq faqs={faqs} />
        </div>
      )}

      {/* Related Calculators */}
      {relatedCalculators && relatedCalculators.length > 0 && (
        <>
          <Separator />
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Related Calculators
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCalculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="group block"
                    onClick={() =>
                      track("related_calculator_click", { to: calc.href })
                    }
                  >
                    <Card
                      className={cn(
                        "h-full transition-colors hover:border-primary/50 hover:shadow-md",
                      )}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="size-5" />
                          </div>
                          <CardTitle className="text-base group-hover:text-primary">
                            {calc.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {calc.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
