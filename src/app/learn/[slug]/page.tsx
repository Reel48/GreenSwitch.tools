import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAllSlugs, getPostBySlug, getWordCount, getRelatedPosts } from "@/lib/blog";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { ArticleSchema } from "@/components/blog/article-schema";
import { RelatedArticles } from "@/components/blog/related-articles";
import { AdUnit } from "@/components/ads/ad-unit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | GoGreenCalc`,
      description: post.description,
      url: `/learn/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
    alternates: {
      canonical: `/learn/${slug}`,
    },
  };
}

const CALCULATOR_LINKS: Record<string, { name: string; href: string; description: string }> = {
  "ev-vs-gas-cost": {
    name: "EV vs Gas Cost Calculator",
    href: "/calculators/ev-vs-gas-cost",
    description: "Compare total ownership costs of electric vs gas vehicles with your real numbers.",
  },
  "ev-tax-credit": {
    name: "EV Tax Credit Calculator",
    href: "/calculators/ev-tax-credit",
    description: "Check your eligibility for federal EV tax credits up to $7,500.",
  },
  "solar-payback": {
    name: "Solar Payback Calculator",
    href: "/calculators/solar-payback",
    description: "Calculate your solar panel ROI and payback period with 25-year projections.",
  },
  "battery-storage": {
    name: "Battery Storage ROI Calculator",
    href: "/calculators/battery-storage",
    description: "Evaluate home battery ROI with TOU arbitrage and solar pairing.",
  },
  "heat-pump": {
    name: "Heat Pump Savings Calculator",
    href: "/calculators/heat-pump",
    description: "Compare heat pump vs furnace costs by climate zone.",
  },
  "ev-charging-cost": {
    name: "EV Charging Cost Calculator",
    href: "/calculators/ev-charging-cost",
    description: "Calculate EV charging costs at home and on the go.",
  },
};

export default async function LearnArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const calculator = post.calculator ? CALCULATOR_LINKS[post.calculator] : null;
  const relatedArticles = getRelatedPosts(slug, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Learn", href: "/learn" },
          { name: post.title, href: `/learn/${slug}` },
        ]}
      />
      <ArticleSchema
        title={post.title}
        description={post.description}
        datePublished={post.date}
        url={`/learn/${slug}`}
        keywords={post.tags}
        wordCount={getWordCount(post.content)}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href="/learn" className="hover:text-green-700">
              ← All articles
            </Link>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-gray-600">{post.description}</p>
        </header>

        {/* Calculator CTA */}
        {calculator && (
          <div className="mb-10 rounded-xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-800">
              Run the numbers yourself
            </p>
            <Link
              href={calculator.href}
              className="mt-1 block text-lg font-semibold text-green-700 hover:text-green-900"
            >
              {calculator.name} →
            </Link>
            <p className="mt-1 text-sm text-green-700">{calculator.description}</p>
          </div>
        )}

        {/* Ad: before article body */}
        <AdUnit slot="ARTICLE_TOP_SLOT" className="mb-8" />

        {/* Article body */}
        <div className="prose prose-lg prose-green mx-auto max-w-none prose-headings:scroll-mt-20 prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        {/* Ad: after article body */}
        <AdUnit slot="ARTICLE_BOTTOM_SLOT" className="mt-10" />

        {/* Bottom CTA */}
        {calculator && (
          <div className="mt-16 rounded-xl bg-gray-900 p-8 text-center">
            <h2 className="text-2xl font-bold text-white">
              Ready to see your savings?
            </h2>
            <p className="mt-2 text-gray-300">{calculator.description}</p>
            <Link
              href={calculator.href}
              className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
            >
              Try the {calculator.name}
            </Link>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <RelatedArticles articles={relatedArticles} />
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link
            href="/learn"
            className="text-sm font-medium text-green-700 hover:text-green-900"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
}
