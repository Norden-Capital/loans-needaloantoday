import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

// The dark palette of components/shared/Breadcrumb, for the navy blog and news headers.
const palette = {
  link: "rgba(255,255,255,0.5)",
  current: "#FFFFFF",
  chevron: "rgba(255,255,255,0.3)",
};

/**
 * Breadcrumb trail for blog and news pages. The BreadcrumbList structured data
 * is rendered by the page itself (JsonLd + breadcrumbJsonLd), not here.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex justify-center">
      <ol className="flex items-center flex-wrap justify-center gap-2 text-sm font-dm-sans">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                  style={{ color: palette.link }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  style={{ color: isLast ? palette.current : palette.link }}
                  className={isLast ? "font-medium" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="w-4 h-4" style={{ color: palette.chevron }} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
