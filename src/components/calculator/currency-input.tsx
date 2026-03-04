"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { InputGroup } from "./input-group";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  label: string;
  tooltip?: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function CurrencyInput({
  label,
  tooltip,
  value,
  onChange,
  className,
}: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "" || raw === ".") {
      onChange(0);
      return;
    }
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <InputGroup label={label} tooltip={tooltip} className={className}>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
          $
        </span>
        <Input
          type="number"
          value={value}
          onChange={handleChange}
          className={cn("pl-7")}
          min={0}
          step="0.01"
        />
      </div>
    </InputGroup>
  );
}
