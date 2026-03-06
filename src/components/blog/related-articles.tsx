import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

const TAG_COLORS: Record<string, string> = {
  ev: "bg-blue-100 text-blue-800",
  solar: "bg-amber-100 text-amber-800",
  "heat-pump": "bg-red-100 text-red-800",
  battery: "bg-purple-100 text-purple-800",
  "tax-credit": "bg-green-100 text-green-800",
};

interface RelatedArticlesProps {
  articles: BlogPostMeta[];
  /** Heading text — defaults to "Related Articles" */
  heading?: string;
}

export function RelatedArticles({
  articles,
  heading = "Related Articles",
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((post) => (
          <Link
            key={post.slug}
            href={`/learn/${post.slug}`}
            className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-green-300 hover:shadow-md"
          >
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${TAG_COLORS[tag] || "bg-gray-100 text-gray-700"}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-green-700">
              {post.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {post.description}
            </p>
            <p className="mt-2 text-xs text-gray-400">{post.readingTime}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
