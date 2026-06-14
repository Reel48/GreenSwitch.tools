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
          // Chrome edge-to-edge "fast path": the bar stays glued to the dynamic
          // bottom inset as the address bar / chin / nav bar retracts on scroll.
          //   chin shown   → safe-area-inset == max → bottom 0 (content sits
          //                  above the chin via the padding)
          //   chin retracts → inset shrinks → bottom goes negative, so the bar
          //                  and its frosted background slide down with it — no
          //                  gap, no page content showing through.
          // Non-Chrome browsers (safe-area-max-inset unsupported → 0px) reduce
          // to bottom = safe-area-inset-bottom (the home indicator), so Safari
          // behaves as before. Requires viewport-fit=cover (set in layout).
          style={{
            bottom:
              "calc(env(safe-area-inset-bottom, 0px) - env(safe-area-max-inset-bottom, 0px))",
            paddingBottom: "calc(0.75rem + env(safe-area-max-inset-bottom, 0px))",
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
