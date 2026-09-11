import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArrowUpRight } from "lucide-react";

import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostImage } from "@/components/blog/post-image";
import { TableOfContents } from "@/components/blog/table-of-contents";
import CTASection from "@/components/home/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { formatDate, type ArticleSection, type Post } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { extractToc } from "@/lib/toc";

/** Full article page, shared by blog posts and news items. */
export function Article({ post, section }: { post: Post; section: ArticleSection }) {
  const { meta, content } = post;
  const path = `${section.path}/${meta.slug}`;
  const toc = extractToc(content);
  const internal = meta.related.filter((link) => !link.href.startsWith("http"));
  const sources = meta.related.filter((link) => link.href.startsWith("http"));
  const faq = faqJsonLd(meta.faqs);

  const byline =
    section.dateLine === "published"
      ? `By the ${meta.author} · Published ${formatDate(meta.date)}${
          meta.updated !== meta.date ? ` · Updated ${formatDate(meta.updated)}` : ""
        } · ${meta.readingTime} min read`
      : `Reviewed by the ${meta.author} · Updated ${formatDate(meta.updated)} · ${meta.readingTime} min read`;

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: section.label, path: section.path },
            { name: meta.title, path },
          ]),
          articleJsonLd(meta, section),
          ...(faq ? [faq] : []),
        ]}
      />

      {/* Header */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-18 bg-[hsl(215,28%,12%)] relative overflow-x-clip">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[hsl(160,84%,39%)]/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: section.label, href: section.path },
                  { label: meta.title },
                ]}
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
            <p className="text-white/40 text-xs font-dm-sans">{byline}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 lg:items-start max-w-5xl">
          <article className="min-w-0 w-full max-w-[760px] mx-auto lg:mx-0">
            <TableOfContents items={toc} variant="mobile" />
            <div className="blog-prose prose prose-lg max-w-none">
              {/* rehype-raw lets posts embed HTML (figures, video, iframes);
                  rehype-slug gives headings the ids the table of contents uses. */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                components={{ img: PostImage }}
              >
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

            {/* Back to the listing */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
              <Link
                href={section.path}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(215,28%,12%)] underline underline-offset-4 decoration-[hsl(215,28%,12%)]/25 hover:decoration-[hsl(215,28%,12%)] transition-all font-dm-sans"
              >
                <ArrowUpRight size={14} className="rotate-180" />
                {section.backLabel}
              </Link>
              <Link
                href={section.next.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(215,28%,12%)] underline underline-offset-4 decoration-[hsl(215,28%,12%)]/25 hover:decoration-[hsl(215,28%,12%)] transition-all font-dm-sans"
              >
                {section.next.label}
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
              {meta.faqs.map((item) => (
                <div
                  key={item.question}
                  className="border-b last:border-b-0 py-5"
                  style={{ borderColor: "hsl(214,20%,90%)" }}
                >
                  <h3 className="text-base font-semibold text-[hsl(215,28%,12%)] mb-2 font-space-grotesk">
                    {item.question}
                  </h3>
                  <p className="text-sm text-[hsl(215,14%,46%)] leading-relaxed font-dm-sans">
                    {item.answer}
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
