import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { canadaLocations } from "@/lib/canada-locations";
import { comparisons } from "@/lib/comparisons";
import { creditScoreRanges } from "@/lib/credit-scores";
import { guides } from "@/lib/guides";
import { loanAmounts } from "@/lib/loan-amounts";
import { loanPurposes } from "@/lib/loan-purposes";
import { loanTypes } from "@/lib/loan-types";
import { getAllNews } from "@/lib/news";
import { BASE_URL } from "@/lib/seo";

// Each section is served at /sitemap/<section>.xml and listed by the index at /sitemap.xml
export const sitemapSections = [
  "pages",
  "loans",
  "resources",
  "blog",
  "news",
] as const;

export type SitemapSection = (typeof sitemapSections)[number];

// Last real content change of each page group ("YYYY-MM-DD"), taken from git
// history. Update a group's date only when the visible content of its pages
// changes: text, data (amounts, rates, FAQs, tables, lists), links in the page
// body, or sections added/removed. Do NOT update it for metadata, analytics,
// styling or code-only changes, and never compute it (`new Date()`, build
// time) — search engines stop trusting lastmod dates that move without a real
// change. Blog and news posts use their own `updated` frontmatter instead, and
// /blog and /news follow their newest post.
const pageLastModified = {
  home: "2026-08-07",
  about: "2026-08-07",
  applicationForm: "2026-08-07",
  contact: "2026-08-15",
  privacyPolicy: "2026-06-13",
  termsOfUse: "2026-06-13",
  loansHub: "2026-08-07", // /loans
  byAmount: "2026-08-07", // /loans/by-amount and its detail pages
  byPurpose: "2026-08-07", // /loans/by-purpose and its detail pages
  byType: "2026-08-07", // /loans/by-type and its detail pages
  byCreditScore: "2026-08-07", // /loans/by-credit-score and its detail pages
  byLocation: "2026-08-07", // /loans/by-location and its detail pages
  resourcesHub: "2026-08-07", // /resources
  guides: "2026-08-07", // /resources/guides and its detail pages
  comparisons: "2026-08-07", // /resources/comparisons and its detail pages
};

type PageConfig = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified: string;
};

// A listing page followed by its detail pages, all sharing the group's date.
function listingWithDetails(
  path: string,
  items: readonly { slug: string }[],
  lastModified: string,
): PageConfig[] {
  return [
    { path, priority: 0.6, changeFrequency: "monthly", lastModified },
    ...items.map(
      (item): PageConfig => ({
        path: `${path}/${item.slug}`,
        priority: 0.5,
        changeFrequency: "monthly",
        lastModified,
      }),
    ),
  ];
}

const pages: PageConfig[] = [
  {
    path: "",
    priority: 1,
    changeFrequency: "weekly",
    lastModified: pageLastModified.home,
  },
  {
    path: "/about",
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: pageLastModified.about,
  },
  {
    path: "/application-form",
    priority: 0.9,
    changeFrequency: "monthly",
    lastModified: pageLastModified.applicationForm,
  },
  {
    path: "/contact",
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: pageLastModified.contact,
  },
  {
    path: "/privacy-policy",
    priority: 0.4,
    changeFrequency: "yearly",
    lastModified: pageLastModified.privacyPolicy,
  },
  {
    path: "/terms-of-use",
    priority: 0.4,
    changeFrequency: "yearly",
    lastModified: pageLastModified.termsOfUse,
  },
];

const loansPages: PageConfig[] = [
  {
    path: "/loans",
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: pageLastModified.loansHub,
  },
  ...listingWithDetails("/loans/by-amount", loanAmounts, pageLastModified.byAmount),
  ...listingWithDetails("/loans/by-purpose", loanPurposes, pageLastModified.byPurpose),
  ...listingWithDetails("/loans/by-type", loanTypes, pageLastModified.byType),
  ...listingWithDetails(
    "/loans/by-credit-score",
    creditScoreRanges,
    pageLastModified.byCreditScore,
  ),
  ...listingWithDetails(
    "/loans/by-location",
    canadaLocations,
    pageLastModified.byLocation,
  ),
];

const resourcesPages: PageConfig[] = [
  {
    path: "/resources",
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: pageLastModified.resourcesHub,
  },
  ...listingWithDetails("/resources/guides", guides, pageLastModified.guides),
  ...listingWithDetails(
    "/resources/comparisons",
    comparisons,
    pageLastModified.comparisons,
  ),
];

function toEntries(configs: PageConfig[]): MetadataRoute.Sitemap {
  return configs.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

// Listing pages change whenever their newest post does. Post dates are
// "YYYY-MM-DD" strings, so the greatest string is the newest date.
function newestDate(days: string[]): string | undefined {
  if (days.length === 0) return undefined;
  return days.reduce((latest, day) => (day > latest ? day : latest));
}

export function isSitemapSection(value: string): value is SitemapSection {
  return (sitemapSections as readonly string[]).includes(value);
}

export function getSitemapEntries(
  section: SitemapSection,
): MetadataRoute.Sitemap {
  if (section === "pages") return toEntries(pages);
  if (section === "loans") return toEntries(loansPages);
  if (section === "resources") return toEntries(resourcesPages);

  if (section === "blog") {
    const posts = getAllPosts();
    const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updated,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [
      {
        url: `${BASE_URL}/blog`,
        lastModified: newestDate(posts.map((post) => post.updated)),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      ...blogPosts,
    ];
  }

  const news = getAllNews();
  const newsPosts: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${BASE_URL}/news/${item.slug}`,
    lastModified: item.updated,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: `${BASE_URL}/news`,
      lastModified: newestDate(news.map((item) => item.updated)),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...newsPosts,
  ];
}

// Same markup Next.js generates for a built-in app/sitemap.ts, which can't be
// used here because it would take over /sitemap.xml from the index.
export function toUrlsetXml(entries: MetadataRoute.Sitemap): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const entry of entries) {
    xml += "<url>\n";
    xml += `<loc>${entry.url}</loc>\n`;
    if (entry.lastModified) {
      const lastModified =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified;
      xml += `<lastmod>${lastModified}</lastmod>\n`;
    }
    if (entry.changeFrequency) {
      xml += `<changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    if (typeof entry.priority === "number") {
      xml += `<priority>${entry.priority}</priority>\n`;
    }
    xml += "</url>\n";
  }

  xml += "</urlset>\n";
  return xml;
}

export function toSitemapIndexXml(): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const section of sitemapSections) {
    xml += "<sitemap>\n";
    xml += `<loc>${BASE_URL}/sitemap/${section}.xml</loc>\n`;
    xml += "</sitemap>\n";
  }

  xml += "</sitemapindex>\n";
  return xml;
}
