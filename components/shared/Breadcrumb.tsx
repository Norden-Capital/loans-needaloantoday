'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

const SITE_URL = "https://needaloantoday.ca";

const palettes = {
  light: { link: "hsl(215,14%,46%)", current: "hsl(215,28%,12%)", chevron: "hsl(215,14%,70%)", linkHoverClass: "hover:text-[hsl(215,28%,12%)]" },
  dark: { link: "rgba(255,255,255,0.5)", current: "#FFFFFF", chevron: "rgba(255,255,255,0.3)", linkHoverClass: "hover:text-white" },
};

const Breadcrumb = ({ items, dark = false }: { items: BreadcrumbItem[]; dark?: boolean }) => {
  const pathname = usePathname();
  const palette = dark ? palettes.dark : palettes.light;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href ?? pathname}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="flex justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ol className="flex items-center flex-wrap justify-center gap-2 text-sm font-dm-sans">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`transition-colors ${palette.linkHoverClass}`}
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
};

export default Breadcrumb;
