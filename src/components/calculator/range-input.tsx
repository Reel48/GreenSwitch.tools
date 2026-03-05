"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { InputGroup } from "./input-group";
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

  const displayLabel = unit ? `${label}: ${value} ${unit}` : `${label}: ${value}`;

  return (
    <InputGroup label={displayLabel} tooltip={tooltip} className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={handleSliderChange}
          className="flex-1"
        />
        <div className="relative w-full shrink-0 sm:w-24">
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleInputChange}
            className={cn("pr-2 text-right", unit && "pr-12")}
          />
          {unit && (
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
              {unit}
            </span>
          )}
        </div>
      </div>
    </InputGroup>
  );
}
