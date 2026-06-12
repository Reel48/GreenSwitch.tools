import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the GoGreenCalc team — report a data issue, suggest a calculator, or ask a question.",
};

const CONTACT_EMAIL = "brayden@reel48.com";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Questions, corrections, and suggestions are always welcome — a real
        person reads every message.
      </p>

      <Separator className="my-8" />

      <Card>
        <CardContent className="flex items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Mail className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email us at</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <h2>What to reach out about</h2>
        <ul>
          <li>
            <strong>Data corrections</strong> — if an electricity rate, fuel
            price, or incentive looks outdated for your state, tell us and
            we&rsquo;ll verify it against the source.
          </li>
          <li>
            <strong>Bugs</strong> — a calculator behaving oddly, a broken
            page, or results that don&rsquo;t add up.
          </li>
          <li>
            <strong>Calculator requests</strong> — a clean energy decision you
            wish you could put numbers on.
          </li>
          <li>
            <strong>Press and partnerships</strong> — we&rsquo;re happy to
            explain our <Link href="/methodology">methodology</Link> or
            provide context on how the estimates work.
          </li>
        </ul>
        <p>
          We typically reply within a few business days. Please note we
          can&rsquo;t provide individual financial, tax, or installation
          advice.
        </p>
      </div>
    </div>
  );
}
