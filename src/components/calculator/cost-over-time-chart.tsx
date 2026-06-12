"use client";

import dynamic from "next/dynamic";
import type { CostOverTimeChartProps } from "./cost-over-time-chart-inner";

// Recharts is heavy (~90KB gz) — load it only when the chart scrolls into the
// bundle, keeping it out of the calculator route's first-load JS.
const CostOverTimeChartInner = dynamic(
  () =>
    import("./cost-over-time-chart-inner").then(
      (m) => m.CostOverTimeChartInner,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[17.5rem] w-full animate-pulse rounded-lg bg-muted/60" />
    ),
  },
);

export function CostOverTimeChart(props: CostOverTimeChartProps) {
  return <CostOverTimeChartInner {...props} />;
}
