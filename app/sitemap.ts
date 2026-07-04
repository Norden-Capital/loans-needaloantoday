import { MetadataRoute } from 'next';
import { loanAmounts } from '@/lib/loan-amounts';
import { loanPurposes } from '@/lib/loan-purposes';
import { loanTypes } from '@/lib/loan-types';
import { creditScoreRanges } from '@/lib/credit-scores';
import { canadaLocations } from '@/lib/canada-locations';
import { guides } from '@/lib/guides';
import { comparisons } from '@/lib/comparisons';

const baseUrl = 'https://needaloantoday.ca';

// Fixed publish date for the current content set. Bump this manually only when
// page content actually changes — recomputing it on every request/build (e.g.
// `new Date()`) makes Search Console distrust the sitemap's freshness signal.
const lastModified = '2026-06-15';

type PageConfig = {
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
};

const pages: PageConfig[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/loans', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/loans/by-amount', priority: 0.6, changeFrequency: 'monthly' },
  ...loanAmounts.map((entry): PageConfig => ({
    path: `/loans/by-amount/${entry.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/loans/by-purpose', priority: 0.6, changeFrequency: 'monthly' },
  ...loanPurposes.map((entry): PageConfig => ({
    path: `/loans/by-purpose/${entry.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/loans/by-type', priority: 0.6, changeFrequency: 'monthly' },
  ...loanTypes.map((entry): PageConfig => ({
    path: `/loans/by-type/${entry.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/loans/by-credit-score', priority: 0.6, changeFrequency: 'monthly' },
  ...creditScoreRanges.map((entry): PageConfig => ({
    path: `/loans/by-credit-score/${entry.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/loans/by-location', priority: 0.6, changeFrequency: 'monthly' },
  ...canadaLocations.map((entry): PageConfig => ({
    path: `/loans/by-location/${entry.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/resources', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/resources/guides', priority: 0.6, changeFrequency: 'monthly' },
  ...guides.map((entry): PageConfig => ({
    path: `/resources/guides/${entry.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/resources/comparisons', priority: 0.6, changeFrequency: 'monthly' },
  ...comparisons.map((entry): PageConfig => ({
    path: `/resources/comparisons/${entry.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/terms-of-use', priority: 0.4, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
