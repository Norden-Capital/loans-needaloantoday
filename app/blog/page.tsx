import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostGrid } from "@/components/blog/post-grid";
import CTASection from "@/components/home/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_DESCRIPTION, BLOG_SECTION, getAllPosts } from "@/lib/blog";
import { BASE_URL, breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

const base = buildMetadata({
  title: BLOG_SECTION.label,
  description: BLOG_DESCRIPTION,
  path: BLOG_SECTION.path,
  keywords: [
    "personal loan blog canada",
    "loan tips canada",
    "borrowing advice canada",
    "needaloantoday blog",
  ],
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    types: { "application/rss+xml": `${BASE_URL}${BLOG_SECTION.path}/feed.xml` },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: BLOG_SECTION.label, path: BLOG_SECTION.path },
          ]),
          ...(posts.length > 0 ? [itemListJsonLd(BLOG_SECTION, posts)] : []),
        ]}
      />

      {/* Header */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-[hsl(215,28%,12%)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[hsl(160,84%,39%)]/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: BLOG_SECTION.label }]} />
            </div>
            <span className="inline-block text-xs font-semibold tracking-[0.14em] uppercase text-[hsl(160,84%,39%)] mb-4 font-dm-sans">
              The Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 font-space-grotesk">
              Borrowing, <span className="text-[hsl(160,84%,39%)]">Explained</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed font-dm-sans">
              Rate explainers, debt-payoff strategies, and honest guides to
              personal loans in Canada — written to help you borrow smarter.
            </p>
          </div>
        </div>
      </section>

      <PostGrid
        posts={posts}
        section={BLOG_SECTION}
        empty={{
          title: (
            <>
              New posts <span className="text-[hsl(160,84%,39%)]">coming soon</span>
            </>
          ),
          text: "We're putting together fresh rate explainers, borrowing tips, and honest guides for Canadian borrowers. Check back shortly — new articles will land here soon.",
          link: { label: "In the meantime, explore our loan guides", href: "/resources/guides" },
        }}
      />

      <CTASection />
    </div>
  );
}
