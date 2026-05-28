import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://needaloantoday.ca';
  const locales = routing.locales;
  const pages = ['', '/about', '/contact', '/privacy', '/terms'];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: locales.reduce((acc, l) => ({
          ...acc,
          [l]: `${baseUrl}/${l}${page}`,
        }), {}),
      },
    }))
  );
}
