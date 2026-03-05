"use client";

import * as React from "react";
import { useState } from "react";
import { Code, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CalculatorEmbedButtonProps {
  calculatorSlug: string;
}

export function CalculatorEmbedButton({
  calculatorSlug,
}: CalculatorEmbedButtonProps) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe
  src="https://gogreencalc.com/embed/${calculatorSlug}"
  width="100%"
  height="600"
  frameborder="0"
  title="GoGreenCalc - ${calculatorSlug}"
  loading="lazy"
></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = embedCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Code className="size-4" />
          Embed This Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Embed This Calculator</DialogTitle>
          <DialogDescription>
            Copy the code below and paste it into your website&apos;s HTML to
            embed this calculator.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{embedCode}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
              className="absolute top-2 right-2"
            >
              {copied ? (
                <Check className="size-4 text-green-600" />
              ) : (
                <Copy className="size-4" />
              )}
              <span className="sr-only">
                {copied ? "Copied" : "Copy embed code"}
              </span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            By embedding this calculator, you agree to our terms of service. The
            calculator will automatically adapt to your site&apos;s width.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
