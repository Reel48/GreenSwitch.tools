import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "GoGreenCalc terms of service and usage conditions.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 2026
      </p>

      <Separator className="my-8" />

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using GoGreenCalc (&ldquo;the Site&rdquo;), you
          accept and agree to be bound by these Terms of Service. If you do
          not agree, please do not use the Site.
        </p>

        <h2>Description of Service</h2>
        <p>
          GoGreenCalc provides free online calculators for estimating costs,
          savings, and return on investment for clean energy technologies
          including electric vehicles, solar panels, heat pumps, and battery
          storage systems.
        </p>

        <h2>Not Financial Advice</h2>
        <p>
          The calculators and information on this site are provided for
          educational and informational purposes only. Results are estimates
          based on the inputs you provide and general assumptions. They do not
          constitute financial, tax, legal, or professional advice. Always
          consult qualified professionals before making significant financial
          decisions.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          We strive to keep our data and calculations accurate and up to date,
          but we make no warranties or guarantees regarding the accuracy,
          completeness, or reliability of any information on this site. Actual
          costs and savings will vary based on your specific circumstances.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          GoGreenCalc shall not be liable for any direct, indirect, incidental,
          consequential, or punitive damages arising from your use of or
          reliance on the calculators or information provided on this site.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on this site, including text, graphics, logos, and
          calculator designs, is the property of GoGreenCalc and is protected
          by applicable intellectual property laws.
        </p>

        <h2>User Conduct</h2>
        <p>
          You agree to use the Site only for lawful purposes and in a manner
          that does not infringe on the rights of others or restrict their use
          of the Site.
        </p>

        <h2>Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued
          use of the Site after changes constitutes acceptance of the updated
          terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the
          laws of the United States.
        </p>
      </div>
    </div>
  );
}
