import type { FaqItem } from "@/lib/blog";

interface FaqSchemaProps {
  items: FaqItem[];
}

/**
 * Emits FAQPage JSON-LD so question/answer pairs are eligible for
 * featured snippets and citations in AI answer engines.
 */
export function FaqSchema({ items }: FaqSchemaProps) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
