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
 * Mobile-only bar that overlays the navbar at the top of the viewport, showing
 * the headline result while the user is scrolled into the input form. Slides
 * away to reveal the navbar again when the results panel is back on screen.
 *
 * NOTE: If AdSense anchor ads are enabled later, a top anchor ad could overlap
 * this — disable this component (stop passing `mobileSummary` to
 * CalculatorShell) if that happens.
 */
export function MobileSummaryBar({
  label,
  value,
  tone = "positive",
}: MobileSummaryBarProps) {
  const [resultsVisible, setResultsVisible] = React.useState(true);
  const [footerVisible, setFooterVisible] = React.useState(false);
  // Keep the real navbar visible at the very top of the page; only let the bar
  // take over once the user has scrolled past the navbar's height.
  const [scrolledDown, setScrolledDown] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolledDown(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {!resultsVisible && !footerVisible && scrolledDown && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          // Overlays the navbar (mirrors its height + styling) while scrolled
          // into the form; slides up out of view to reveal the navbar again
          // once the results panel is back on screen. Mobile only.
          className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80 lg:hidden"
        >
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">{label}</p>
              <p
                className={cn(
                  "truncate text-base font-bold leading-tight tabular-nums",
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
