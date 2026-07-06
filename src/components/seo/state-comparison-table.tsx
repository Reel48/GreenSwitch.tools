"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComparisonColumn {
  key: string;
  label: string;
  /** Right-align and sort numerically. */
  numeric?: boolean;
}

export interface ComparisonRow {
  slug: string;
  name: string;
  href: string;
  /** Raw values used for sorting. */
  values: Record<string, number | string | boolean>;
  /** Preformatted display strings, keyed the same as `values`. */
  display: Record<string, string>;
}

interface Props {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  /** "name" or one of the column keys. */
  defaultSortKey?: string;
  defaultSortDir?: "asc" | "desc";
  nameLabel?: string;
}

/**
 * Reusable, sortable state comparison table. Rendered server-side with the
 * default sort applied (crawlable, real <a> links per row), then hydrated so
 * users can re-sort by any column. Drives "X by state" comparison hub pages.
 */
export function StateComparisonTable({
  columns,
  rows,
  defaultSortKey = "name",
  defaultSortDir = "asc",
  nameLabel = "State",
}: Props) {
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [dir, setDir] = useState<"asc" | "desc">(defaultSortDir);

  function toggle(key: string) {
    if (sortKey === key) {
      setDir(dir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setDir("asc");
    }
  }

  const sorted = [...rows].sort((a, b) => {
    let av: number | string | boolean =
      sortKey === "name" ? a.name : a.values[sortKey];
    let bv: number | string | boolean =
      sortKey === "name" ? b.name : b.values[sortKey];
    if (typeof av === "boolean") av = av ? 1 : 0;
    if (typeof bv === "boolean") bv = bv ? 1 : 0;
    let cmp: number;
    if (typeof av === "number" && typeof bv === "number") {
      cmp = av - bv;
    } else {
      cmp = String(av).localeCompare(String(bv));
    }
    return dir === "asc" ? cmp : -cmp;
  });

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-foreground">
            <th className="px-3 py-2.5">
              <button
                type="button"
                onClick={() => toggle("name")}
                className="inline-flex items-center gap-1 font-medium hover:text-primary"
              >
                {nameLabel}
                <ArrowUpDown className="size-3 opacity-60" />
              </button>
            </th>
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn("px-3 py-2.5", c.numeric && "text-right")}
              >
                <button
                  type="button"
                  onClick={() => toggle(c.key)}
                  className={cn(
                    "inline-flex items-center gap-1 font-medium hover:text-primary",
                    c.numeric && "flex-row-reverse",
                  )}
                >
                  {c.label}
                  <ArrowUpDown className="size-3 opacity-60" />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {sorted.map((row) => (
            <tr key={row.slug} className="hover:bg-muted/30">
              <td className="px-3 py-2 font-medium">
                <Link
                  href={row.href}
                  className="hover:text-primary hover:underline"
                >
                  {row.name}
                </Link>
              </td>
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    "px-3 py-2 text-muted-foreground",
                    c.numeric && "text-right tabular-nums",
                  )}
                >
                  {row.display[c.key] ?? String(row.values[c.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
