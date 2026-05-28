import { Metadata } from "next";

export const baseUrl = 'https://needaloantoday.ca';

/**
 * Generates canonical and alternate language metadata for a given path and locale.
 * @param path The path of the page (e.g., '/about', '/contact', or '/' for homepage)
 * @param locale The current locale ('en' or 'fr')
 * @returns Metadata object with alternates
 */
export function getAlternateMetadata(path: string, locale: string): Metadata["alternates"] {
  // Normalize path: ensure it starts with / and handle homepage
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  
  return {
    canonical: `/${locale}${normalizedPath}`,
    languages: {
      'en-CA': `/en${normalizedPath}`,
      'fr-CA': `/fr${normalizedPath}`,
      'x-default': `/en${normalizedPath}`, // Default to English for search engines
    },
  };
}

/**
 * Generates BreadcrumbList structured data.
 * @param items List of breadcrumb items with name and path
 * @returns JSON-LD object for BreadcrumbList
 */
export function getBreadcrumbSchema(items: { name: string, path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.path.startsWith('/') ? item.path : `/${item.path}`}`
    }))
  };
}
