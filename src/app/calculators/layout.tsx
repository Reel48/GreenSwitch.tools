import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s Calculator | GoGreenCalc",
    default: "Calculators | GoGreenCalc",
  },
  description:
    "Free clean energy calculators — compare EV costs, solar payback, heat pump savings, and more.",
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {children}
    </div>
  );
}
