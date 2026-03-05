import Link from "next/link";
import { Leaf } from "lucide-react";

const calculatorLinks = [
  { label: "EV vs Gas Cost", href: "/calculators/ev-vs-gas-cost" },
  { label: "Solar Payback", href: "/calculators/solar-payback" },
  { label: "EV Charging Cost", href: "/calculators/ev-charging-cost" },
  { label: "Heat Pump vs Furnace", href: "/calculators/heat-pump" },
  { label: "EV Tax Credit", href: "/calculators/ev-tax-credit" },
  { label: "Battery Storage", href: "/calculators/battery-storage" },
] as const;

const resourceLinks = [
  { label: "Learn", href: "/learn" },
  { label: "Methodology", href: "/methodology" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 gap-6 py-8 sm:gap-8 sm:py-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
                <Leaf className="size-3.5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                GoGreenCalc
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Free calculators to help you make smarter clean energy decisions
              with real data.
            </p>
          </div>

          {/* Calculators Column */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Calculators
            </h3>
            <ul className="space-y-2.5">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/60 py-4 sm:py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GoGreenCalc. Built for a cleaner
            future.
          </p>
        </div>
      </div>
    </footer>
  );
}
