import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Guides, comparisons, and data-driven articles on EVs, solar panels, heat pumps, and clean energy savings. Make smarter green energy decisions.",
  openGraph: {
    title: "Green Energy Guides & Articles | GoGreenCalc",
    description:
      "Guides, comparisons, and data-driven articles on EVs, solar, heat pumps, and clean energy savings.",
    url: "/learn",
  },
  alternates: {
    canonical: "/learn",
  },
};

const TAG_COLORS: Record<string, string> = {
  ev: "bg-blue-100 text-blue-800",
  solar: "bg-amber-100 text-amber-800",
  "heat-pump": "bg-red-100 text-red-800",
  battery: "bg-purple-100 text-purple-800",
  "tax-credit": "bg-green-100 text-green-800",
};

export default function LearnPage() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Learn", href: "/learn" },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Green Energy Guides
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Data-driven articles to help you make smarter clean energy decisions
            — from EV ownership costs to solar ROI and home electrification.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            Articles coming soon. Check back shortly!
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <Link href={`/learn/${post.slug}`} className="group block">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
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

                  <h2 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-green-700 sm:text-2xl">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-gray-600">{post.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[tag] || "bg-gray-100 text-gray-700"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
