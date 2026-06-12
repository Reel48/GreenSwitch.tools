"use client";

import * as React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const COARSE_POINTER_QUERY = "(hover: none), (pointer: coarse)";

function useIsCoarsePointer(): boolean {
  // SSR and first client render default to false (tooltip branch) so
  // hydration matches; touch devices flip to the popover after mount
  const [coarse, setCoarse] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(COARSE_POINTER_QUERY);
    setCoarse(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return coarse;
}

interface InfoTipProps {
  content: string;
  className?: string;
}

/**
 * Input help icon that opens a hover tooltip on mouse devices and a
 * tap-toggled popover on touch devices, where hover tooltips don't work.
 * The padding/negative-margin pair enlarges the tap target without
 * changing layout.
 */
export function InfoTip({ content, className }: InfoTipProps) {
  const coarse = useIsCoarsePointer();

  const trigger = (
    <button
      type="button"
      className={cn(
        "-m-3 inline-flex p-3 text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      <Info className="size-3.5" />
      <span className="sr-only">More information</span>
    </button>
  );

  if (coarse) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          side="top"
          className="w-auto max-w-xs px-3 py-1.5 text-xs"
        >
          <p>{content}</p>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
