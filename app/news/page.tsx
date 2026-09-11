import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostGrid } from "@/components/blog/post-grid";
import CTASection from "@/components/home/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllNews, NEWS_DESCRIPTION, NEWS_SECTION } from "@/lib/news";
import { BASE_URL, breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

const base = buildMetadata({
  title: NEWS_SECTION.label,
  description: NEWS_DESCRIPTION,
  path: NEWS_SECTION.path,
  keywords: [
    "canada loan news",
    "interest rate news canada",
    "consumer debt news canada",
    "needaloantoday news",
  ],
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    types: { "application/rss+xml": `${BASE_URL}${NEWS_SECTION.path}/feed.xml` },
  },
};

export default function NewsPage() {
  const news = getAllNews();

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: NEWS_SECTION.label, path: NEWS_SECTION.path },
          ]),
          ...(news.length > 0 ? [itemListJsonLd(NEWS_SECTION, news)] : []),
        ]}
      />

      {/* Header */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-[hsl(215,28%,12%)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[hsl(160,84%,39%)]/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: NEWS_SECTION.label }]} />
            </div>
            <span className="inline-block text-xs font-semibold tracking-[0.14em] uppercase text-[hsl(160,84%,39%)] mb-4 font-dm-sans">
              Newsroom
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 font-space-grotesk">
              Loan &amp; Rate <span className="text-[hsl(160,84%,39%)]">News</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed font-dm-sans">
              Bank of Canada decisions, lending data, and credit trends that shape
              what you pay to borrow — reported in plain English.
            </p>
          </div>
        </div>
      </section>

      <PostGrid
        posts={news}
        section={NEWS_SECTION}
        empty={{
          title: (
            <>
              News <span className="text-[hsl(160,84%,39%)]">coming soon</span>
            </>
          ),
          text: "We're tracking Bank of Canada decisions, lending data, and rule changes that affect Canadian borrowers. Check back shortly — the latest updates will be posted here.",
          link: { label: "In the meantime, read the blog", href: "/blog" },
        }}
      />

      <CTASection />
    </div>
  );
}
