import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import CTASection from "@/components/home/cta-section";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { baseUrl } from "@/lib/seo";
import { getAllNews } from "@/lib/news";

const title = "News | NeedALoanToday";
const description =
  "Loan and interest-rate news for Canadian borrowers — Bank of Canada decisions, lending data, and credit trends, reported in plain English by NeedALoanToday.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "canada loan news",
    "interest rate news canada",
    "consumer debt news canada",
    "needaloantoday news",
  ],
  alternates: {
    canonical: "/news",
    types: {
      "application/rss+xml": `${baseUrl}/news/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/news`,
    title,
    description,
    siteName: "NeedALoanToday",
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image", title, description },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
}

export default function NewsIndex() {
  const items = getAllNews();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${baseUrl}/news/${p.slug}`,
    })),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Header */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-[hsl(215,28%,12%)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[hsl(160,84%,39%)]/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Breadcrumb
                items={[{ label: "Home", href: "/" }, { label: "News" }]}
                dark
              />
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

      {/* Items */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          {items.length === 0 ? (
            <div className="max-w-lg mx-auto text-center flex flex-col items-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-[hsl(160,84%,39%)]/10 flex items-center justify-center mb-6">
                <Newspaper size={26} className="text-[hsl(160,84%,39%)]" strokeWidth={1.75} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[hsl(215,28%,12%)] mb-3 font-space-grotesk">
                News <span className="text-[hsl(160,84%,39%)]">coming soon</span>
              </h2>
              <p className="text-[hsl(215,14%,46%)] leading-relaxed mb-8 font-dm-sans">
                We&apos;re tracking Bank of Canada decisions, lending data, and rule
                changes that affect Canadian borrowers. Check back shortly — the
                latest updates will be posted here.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(215,28%,12%)] underline underline-offset-4 decoration-[hsl(215,28%,12%)]/25 hover:decoration-[hsl(215,28%,12%)] transition-all font-dm-sans"
              >
                In the meantime, read the blog
                <ArrowUpRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {items.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  className="group flex flex-col bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_hsla(160,84%,39%,0.12)] hover:-translate-y-1"
                  style={{ borderColor: "hsl(214,20%,90%)" }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(210,25%,97%)]">
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(160,84%,39%)]/20 via-[hsl(160,84%,39%)]/5 to-transparent" />
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-[0.1em] uppercase text-[hsl(160,84%,35%)] px-2.5 py-1 rounded-full font-dm-sans">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="text-lg font-bold text-[hsl(215,28%,12%)] leading-snug mb-2 group-hover:text-[hsl(160,84%,35%)] transition-colors font-space-grotesk">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[hsl(215,14%,46%)] leading-relaxed mb-5 flex-1 font-dm-sans">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-wide text-[hsl(215,14%,55%)] font-dm-sans">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>·</span>
                      <span>{post.readingTime} min read</span>
                      <ArrowUpRight
                        size={13}
                        className="ml-auto text-[hsl(160,84%,39%)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
