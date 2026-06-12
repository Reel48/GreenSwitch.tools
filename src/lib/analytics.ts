type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Fire a GA4 event. No-ops when gtag isn't loaded (GA disabled, ad
 * blockers, SSR), so callers never need to guard.
 */
export function track(eventName: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };
  w.gtag?.("event", eventName, params);
}
