import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content/learn");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  calculator?: string;
  readingTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  calculator?: string;
  readingTime: string;
}

function getMdxFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(): BlogPostMeta[] {
  const files = getMdxFiles();

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      tags: data.tags || [],
      calculator: data.calculator,
      readingTime: stats.text,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    tags: data.tags || [],
    calculator: data.calculator,
    readingTime: stats.text,
    content,
  };
}

export function getAllSlugs(): string[] {
  return getMdxFiles().map((file) => file.replace(/\.mdx$/, ""));
}

export function getWordCount(content: string): number {
  return content.split(/\s+/).filter(Boolean).length;
}

/**
 * Get related posts for a given article slug.
 * Scores by matching tags and shared calculator, then sorts by score + date.
 */
export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): BlogPostMeta[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);

  const scored = allPosts.map((post) => {
    let score = 0;
    for (const tag of post.tags) {
      if (currentPost.tags.includes(tag)) score += 2;
    }
    if (post.calculator && post.calculator === currentPost.calculator)
      score += 1;
    return { ...post, score };
  });

  return scored
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, limit);
}

/**
 * Get all posts linked to a specific calculator slug.
 */
export function getPostsByCalculator(calculatorSlug: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.calculator === calculatorSlug);
}
