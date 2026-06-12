"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface RangeInputProps {
  label: string;
  tooltip?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  className?: string;
}

export function RangeInput({
  label,
  tooltip,
  min,
  max,
  step,
  value,
  onChange,
  unit,
  className,
}: RangeInputProps) {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") return;
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, min), max);
      onChange(clamped);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Label>{label}</Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Info className="size-3.5" />
                    <span className="sr-only">More information</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <span className="shrink-0 rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium tabular-nums text-primary">
          {value.toLocaleString("en-US", { maximumFractionDigits: 3 })}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={handleSliderChange}
          className="flex-1"
        />
        <div className="w-full shrink-0 sm:w-24">
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleInputChange}
            className="pr-2 text-right tabular-nums"
          />
        </div>
      </div>
    </div>
  );
}
