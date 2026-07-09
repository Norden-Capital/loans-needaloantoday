import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { PostImage } from "@/components/blog/post-image";
import rehypeRaw from "rehype-raw";
import { ArrowUpRight } from "lucide-react";
import CTASection from "@/components/home/cta-section";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { baseUrl } from "@/lib/seo";
import { getAllNews, getNews } from "@/lib/news";
import { extractToc } from "@/lib/toc";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNews().map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

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

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) return {};

  const title = `${item.meta.title} | NeedALoanToday`;
  const url = `${baseUrl}/news/${slug}`;

  return {
    title,
    description: item.meta.description,
    keywords: item.meta.keywords.length
      ? item.meta.keywords
      : [item.meta.title.toLowerCase(), "canada loan news", "needaloantoday"],
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      type: "article",
      url,
      title,
      description: item.meta.description,
      siteName: "NeedALoanToday",
      locale: "en_CA",
      publishedTime: item.meta.date,
      modifiedTime: item.meta.updated,
      authors: [item.meta.author],
    },
    twitter: { card: "summary_large_image", title, description: item.meta.description },
  };
}

export default async function NewsArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();

  const { meta, content } = item;
  const toc = extractToc(content);
  const url = `${baseUrl}/news/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated,
    ...(meta.image ? { image: meta.image } : {}),
    author: { "@type": "Organization", name: meta.author },
    publisher: {
      "@type": "Organization",
      name: "NeedALoanToday",
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.svg` },
    },
    mainEntityOfPage: url,
    url,
  };

  const faqJsonLd =
    meta.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: meta.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const internal = meta.related.filter((l) => !l.href.startsWith("http"));
  const sources = meta.related.filter((l) => l.href.startsWith("http"));

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Header */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-18 bg-[hsl(215,28%,12%)] relative overflow-x-clip">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[hsl(160,84%,39%)]/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "News", href: "/news" },
                  { label: meta.title },
                ]}
                dark
              />
            </div>
            <span className="inline-block text-xs font-semibold tracking-[0.14em] uppercase text-[hsl(160,84%,39%)] mb-4 font-dm-sans">
              {meta.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5 font-space-grotesk">
              {meta.title}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-5 font-dm-sans">
              {meta.description}
            </p>
            <p className="text-white/40 text-xs font-dm-sans">
              By the {meta.author} · Published {formatDate(meta.date)}
              {meta.updated !== meta.date ? ` · Updated ${formatDate(meta.updated)}` : ""} · {meta.readingTime} min read
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 lg:items-start max-w-5xl">
          <article className="min-w-0 w-full max-w-[760px] mx-auto lg:mx-0">
            <TableOfContents items={toc} variant="mobile" />
            <div className="blog-prose prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug]} components={{ img: PostImage }}>
                {content}
              </ReactMarkdown>
            </div>

            {/* Related reading + sources */}
            {(internal.length > 0 || sources.length > 0) && (
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {internal.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-[hsl(215,28%,12%)] mb-4 font-space-grotesk">
                      Related Reading
                    </h2>
                    <ul className="flex flex-col gap-2.5">
                      {internal.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(160,84%,35%)] hover:underline underline-offset-2 font-dm-sans"
                          >
                            {link.label}
                            <ArrowUpRight size={13} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {sources.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-[hsl(215,28%,12%)] mb-4 font-space-grotesk">
                      Sources
                    </h2>
                    <ul className="flex flex-col gap-2.5">
                      {sources.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-[hsl(215,14%,46%)] hover:text-[hsl(160,84%,35%)] underline underline-offset-2 decoration-[hsl(215,14%,46%)]/40 font-dm-sans"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Back to hub */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(215,28%,12%)] underline underline-offset-4 decoration-[hsl(215,28%,12%)]/25 hover:decoration-[hsl(215,28%,12%)] transition-all font-dm-sans"
              >
                <ArrowUpRight size={14} className="rotate-180" />
                All news
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(215,28%,12%)] underline underline-offset-4 decoration-[hsl(215,28%,12%)]/25 hover:decoration-[hsl(215,28%,12%)] transition-all font-dm-sans"
              >
                Read the blog
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </article>

          <aside className="hidden lg:block sticky top-24 self-start">
            <TableOfContents items={toc} variant="sidebar" />
          </aside>
        </div>
      </section>

      {/* FAQ */}
      {meta.faqs.length > 0 && (
        <section className="pb-20 md:pb-28 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[hsl(215,28%,12%)] leading-tight mb-8 text-center font-space-grotesk">
              Frequently Asked <span className="text-[hsl(160,84%,39%)]">Questions</span>
            </h2>
            <div className="flex flex-col">
              {meta.faqs.map((f) => (
                <div
                  key={f.question}
                  className="border-b last:border-b-0 py-5"
                  style={{ borderColor: "hsl(214,20%,90%)" }}
                >
                  <h3 className="text-base font-semibold text-[hsl(215,28%,12%)] mb-2 font-space-grotesk">
                    {f.question}
                  </h3>
                  <p className="text-sm text-[hsl(215,14%,46%)] leading-relaxed font-dm-sans">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
