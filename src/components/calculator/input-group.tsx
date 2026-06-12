"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { InfoTip } from "./info-tip";
import { cn } from "@/lib/utils";

interface InputGroupProps {
  label: string;
  tooltip?: string;
  children: React.ReactNode;
  className?: string;
}

export function InputGroup({
  label,
  tooltip,
  children,
  className,
}: InputGroupProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-1.5">
        <Label>{label}</Label>
        {tooltip && <InfoTip content={tooltip} />}
      </div>
      {children}
    </div>
  );
}
