"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

interface MobileSummaryBarProps {
  label: string;
  value: string;
  tone?: "positive" | "negative" | "neutral";
}

/**
 * Mobile-only bar pinned to the bottom of the viewport showing the headline
 * result while the user is scrolled into the input form. Hides itself when
 * the results panel is on screen.
 *
 * NOTE: If AdSense anchor ads are enabled later, they also pin to the bottom
 * edge — disable this component (stop passing `mobileSummary` to
 * CalculatorShell) to avoid overlap.
 */
export function MobileSummaryBar({
  label,
  value,
  tone = "positive",
}: MobileSummaryBarProps) {
  const [resultsVisible, setResultsVisible] = React.useState(true);
  const [footerVisible, setFooterVisible] = React.useState(false);

  React.useEffect(() => {
    const results = document.getElementById("calc-results");
    if (!results) return;
    const resultsObserver = new IntersectionObserver(
      ([entry]) => setResultsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    resultsObserver.observe(results);

    // Hide the bar at the page bottom so it never covers footer links
    const footer = document.querySelector("footer");
    let footerObserver: IntersectionObserver | undefined;
    if (footer) {
      footerObserver = new IntersectionObserver(([entry]) =>
        setFooterVisible(entry.isIntersecting),
      );
      footerObserver.observe(footer);
    }

    return () => {
      resultsObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  const scrollToResults = () => {
    track("summary_bar_click");
    document
      .getElementById("calc-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {!resultsVisible && !footerVisible && (
        <motion.div
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 72, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 z-40 border-t bg-background/90 px-4 py-3 backdrop-blur-md lg:hidden"
          // The bar's box is pushed 50vh below the bottom edge (negative
          // `bottom`) and that distance is added back as padding, so the
          // content stays in the same visible spot while the bar's own
          // (frosted) background bleeds 50vh past the bottom of the screen.
          // This covers any gap a browser's collapsing toolbar (e.g. Chrome's
          // URL bar on scroll) opens beneath the bar, so page content never
          // shows through.
          style={{
            bottom: "-50vh",
            paddingBottom:
              "calc(50vh + max(0.75rem, env(safe-area-inset-bottom)))",
          }}
        >
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">{label}</p>
              <p
                className={cn(
                  "text-lg font-bold tabular-nums",
                  tone === "positive" && "text-green-700 dark:text-green-400",
                  tone === "negative" && "text-amber-700 dark:text-amber-400",
                )}
              >
                {value}
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={scrollToResults}>
              See details
              <ArrowDown className="ml-1.5 size-3.5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
