import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "GoGreenCalc privacy policy — how we handle your data.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 2026
      </p>

      <Separator className="my-8" />

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Overview</h2>
        <p>
          GoGreenCalc (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
          is committed to protecting your privacy. This policy explains what
          data we collect, how we use it, and your rights regarding that data.
        </p>

        <h2>Data We Collect</h2>
        <p>
          <strong>Calculator inputs:</strong> The values you enter into our
          calculators are processed locally in your browser. We do not store
          your calculator inputs on our servers.
        </p>
        <p>
          <strong>Analytics:</strong> We may use privacy-respecting analytics
          to understand how visitors use our site. This may include page views,
          referral sources, and general device/browser information. We do not
          collect personally identifiable information through analytics.
        </p>

        <h2>Cookies</h2>
        <p>
          We use minimal cookies necessary for site functionality. Our
          calculators may use browser localStorage to save your inputs so you
          can return to them later. You can clear this data at any time through
          your browser settings.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services such as Google Analytics and hosting
          providers. These services have their own privacy policies governing
          their use of data.
        </p>

        <h2>No Sale of Data</h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties.
        </p>

        <h2>Children&rsquo;s Privacy</h2>
        <p>
          Our site is not directed at children under 13. We do not knowingly
          collect information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be
          posted on this page with an updated &ldquo;Last updated&rdquo; date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us
          through our website.
        </p>
      </div>
    </div>
  );
}
