"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
}

export function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as any).adsbygoogle ?? [];
      adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense script not loaded yet or ad blocker active
    }
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8588626535470507"
        data-ad-slot={slot}
        data-ad-format={format}
        {...(responsive && { "data-full-width-responsive": "true" })}
      />
    </div>
  );
}
