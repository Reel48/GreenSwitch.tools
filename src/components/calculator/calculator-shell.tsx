"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CalculatorMethodology } from "./calculator-methodology";
import { CalculatorFaq } from "./calculator-faq";
import { AdUnit } from "@/components/ads/ad-unit";
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
  methodology,
  faqs,
  relatedCalculators,
  howToSteps,
  url,
}: CalculatorShellProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:space-y-8 md:py-12">
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
      <section className="space-y-4 text-center">
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

      {/* Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle>Calculator Inputs</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>

      {/* Results Panel */}
      <AnimatePresence mode="wait">
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {results}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ad: between results and methodology */}
      <AdUnit slot="CALC_MID_SLOT" className="my-6" />

      {/* Methodology */}
      {methodology && (
        <>
          <Separator />
          <CalculatorMethodology content={methodology} />
        </>
      )}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <>
          <Separator />
          <CalculatorFaq faqs={faqs} />
        </>
      )}

      {/* Ad: after FAQ */}
      <AdUnit slot="CALC_BOTTOM_SLOT" className="my-6" />

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
                  >
                    <Card
                      className={cn(
                        "h-full transition-colors hover:border-primary/50 hover:shadow-md"
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
