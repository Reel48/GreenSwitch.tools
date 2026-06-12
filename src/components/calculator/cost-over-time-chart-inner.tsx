"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { YearlyBreakdown } from "@/calculators/types";

export interface CostOverTimeChartProps {
  data: YearlyBreakdown[];
  labelA: string;
  labelB: string;
  colorA?: string;
  colorB?: string;
  breakEvenYear?: number | null;
  formatValue?: (n: number) => string;
}

const compactCurrency = (n: number) => formatCurrency(n, { compact: true });

function ChartTooltip({
  active,
  payload,
  label,
  labelA,
  labelB,
  formatValue,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number; color?: string }>;
  label?: number;
  labelA: string;
  labelB: string;
  formatValue: (n: number) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="mb-1 font-medium">Year {label}</p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <span
            className="inline-block size-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.dataKey === "cumulativeCostA" ? labelA : labelB}:{" "}
          <span className="font-medium tabular-nums text-foreground">
            {formatValue(entry.value ?? 0)}
          </span>
        </p>
      ))}
    </div>
  );
}

export function CostOverTimeChartInner({
  data,
  labelA,
  labelB,
  colorA = "var(--chart-1)",
  colorB = "var(--chart-4)",
  breakEvenYear,
  formatValue = (n) => formatCurrency(Math.round(n)),
}: CostOverTimeChartProps) {
  const gradientIdA = React.useId();
  const gradientIdB = React.useId();

  const breakEvenPoint =
    breakEvenYear != null
      ? data.find((d) => d.year === Math.ceil(breakEvenYear))
      : undefined;

  return (
    <div className="w-full">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 4 }}
          >
            <defs>
              <linearGradient id={gradientIdA} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colorA} stopOpacity={0.25} />
                <stop offset="100%" stopColor={colorA} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id={gradientIdB} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colorB} stopOpacity={0.25} />
                <stop offset="100%" stopColor={colorB} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => `Yr ${v}`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={52}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              tickFormatter={compactCurrency}
            />
            <Tooltip
              content={
                <ChartTooltip
                  labelA={labelA}
                  labelB={labelB}
                  formatValue={formatValue}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="cumulativeCostB"
              stroke={colorB}
              strokeWidth={2}
              fill={`url(#${gradientIdB})`}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="cumulativeCostA"
              stroke={colorA}
              strokeWidth={2.5}
              fill={`url(#${gradientIdA})`}
              isAnimationActive={false}
            />
            {breakEvenPoint && (
              <ReferenceDot
                x={breakEvenPoint.year}
                y={breakEvenPoint.cumulativeCostA}
                r={5}
                fill={colorA}
                stroke="var(--background)"
                strokeWidth={2}
                label={{
                  value: "Break-even",
                  position:
                    breakEvenPoint.year <= data.length / 4 ? "right" : "top",
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex items-center justify-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-4 rounded-full"
            style={{ backgroundColor: colorA }}
          />
          {labelA}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-4 rounded-full"
            style={{ backgroundColor: colorB }}
          />
          {labelB}
        </span>
      </div>
    </div>
  );
}
