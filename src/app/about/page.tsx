import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "GoGreenCalc is a free, independent set of clean energy calculators built and maintained by Reel48. Learn who we are and why the numbers are trustworthy.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        About GoGreenCalc
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Free, independent calculators that help you decide whether clean energy
        upgrades actually pay off — with real numbers, not sales pitches.
      </p>

      <Separator className="my-8" />

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Why we built this</h2>
        <p>
          Deciding whether to buy an EV, install solar panels, switch to a heat
          pump, or add home battery storage is ultimately a math problem — but
          most of the information online comes from companies trying to sell
          you one of those things. GoGreenCalc exists to answer the question
          honestly: <em>will this actually save you money, and when?</em>
        </p>
        <p>
          Every calculator shows its work. If the math says a furnace is
          cheaper than a heat pump in your climate, or that an EV won&rsquo;t
          break even at your mileage, that&rsquo;s what you&rsquo;ll see. We
          don&rsquo;t sell equipment, installations, or leads, and no
          manufacturer or installer pays to influence results.
        </p>

        <h2>Who runs GoGreenCalc</h2>
        <p>
          GoGreenCalc is built and maintained by{" "}
          <strong>Reel48</strong>, a small independent company in the United
          States. It&rsquo;s a hands-on project: we maintain the calculators,
          update the underlying rate and incentive data, and write the guides
          ourselves.
        </p>

        <h2>Where the numbers come from</h2>
        <p>
          Our data comes from official government and industry sources: the
          U.S. Energy Information Administration (EIA) for electricity rates
          and fuel prices, the EPA and Department of Energy for efficiency and
          emissions figures, and the Database of State Incentives for
          Renewables &amp; Efficiency (DSIRE) for state-level incentives.
          Federal tax credit rules reflect current Inflation Reduction Act
          provisions. The full details are on our{" "}
          <Link href="/methodology">methodology page</Link>, and every
          calculator includes its own &ldquo;How We Calculate This&rdquo;
          section.
        </p>

        <h2>What we are not</h2>
        <p>
          GoGreenCalc provides estimates, not quotes, and education, not
          financial advice. Your actual costs will depend on your local
          installer, utility, and equipment choices. Use our results as a
          well-grounded starting point — then verify the specifics for your
          situation.
        </p>

        <h2>Get in touch</h2>
        <p>
          Spotted outdated data, a bug, or a calculation you disagree with?
          We want to hear about it — see the{" "}
          <Link href="/contact">contact page</Link>. Corrections make the
          calculators better for everyone.
        </p>
      </div>
    </div>
  );
}
