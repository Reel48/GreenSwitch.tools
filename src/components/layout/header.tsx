"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Menu, X, ChevronDown, Calculator, Sun, Zap, Flame, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const calculators = [
  {
    label: "EV vs Gas Cost",
    href: "/calculators/ev-vs-gas-cost",
    icon: Zap,
    description: "Compare total cost of ownership",
  },
  {
    label: "Solar Payback",
    href: "/calculators/solar-payback",
    icon: Sun,
    description: "Calculate your solar ROI",
  },
  {
    label: "EV Charging Cost",
    href: "/calculators/ev-charging-cost",
    icon: Calculator,
    description: "Estimate charging expenses",
  },
  {
    label: "Heat Pump vs Furnace",
    href: "/calculators/heat-pump-vs-furnace",
    icon: Flame,
    description: "Compare heating system costs",
  },
  {
    label: "EV Tax Credit",
    href: "/calculators/ev-tax-credit",
    icon: DollarSign,
    description: "Check your EV tax credit eligibility",
  },
] as const;

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="size-4.5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            GoGreenCalc
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Calculators Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCalcDropdownOpen(true)}
            onMouseLeave={() => setCalcDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCalcDropdownOpen((prev) => !prev)}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                calcDropdownOpen && "text-foreground"
              )}
            >
              Calculators
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  calcDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Panel */}
            <div
              className={cn(
                "absolute left-1/2 top-full pt-2 -translate-x-1/2 transition-all duration-200",
                calcDropdownOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              )}
            >
              <div className="w-72 rounded-xl border border-border/60 bg-white p-2 shadow-lg shadow-black/5">
                {calculators.map((calc) => {
                  const Icon = calc.icon;
                  return (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      onClick={() => setCalcDropdownOpen(false)}
                      className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                    >
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {calc.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {calc.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Other Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {/* CTA */}
          <div className="ml-2">
            <Button asChild size="sm">
              <Link href="/calculators/ev-vs-gas-cost">Try a Calculator</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-white transition-all duration-300 ease-in-out md:hidden",
          mobileOpen ? "max-h-[32rem] opacity-100" : "max-h-0 border-t-0 opacity-0"
        )}
      >
        <div className="space-y-1 px-4 pb-4 pt-3">
          {/* Mobile Calculators Section */}
          <div className="pb-2">
            <div className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Calculators
            </div>
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={calc.href}
                  href={calc.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <Icon className="size-4 text-primary" />
                  {calc.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Divider */}
          <div className="border-t border-border/60" />

          {/* Mobile Other Links */}
          <div className="pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="pt-2">
            <Button asChild className="w-full">
              <Link
                href="/calculators/ev-vs-gas-cost"
                onClick={() => setMobileOpen(false)}
              >
                Try a Calculator
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
