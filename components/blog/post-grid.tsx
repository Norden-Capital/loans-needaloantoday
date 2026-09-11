import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";

import { formatDate, type ArticleSection, type PostMeta } from "@/lib/content";

/** Card grid for the blog and news listing pages, with an empty state. */
export function PostGrid({
  posts,
  section,
  empty,
}: {
  posts: PostMeta[];
  section: ArticleSection;
  empty: { title: ReactNode; text: string; link: { label: string; href: string } };
}) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {posts.length === 0 ? (
          <div className="max-w-lg mx-auto text-center flex flex-col items-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(160,84%,39%)]/10 flex items-center justify-center mb-6">
              <Newspaper size={26} className="text-[hsl(160,84%,39%)]" strokeWidth={1.75} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[hsl(215,28%,12%)] mb-3 font-space-grotesk">
              {empty.title}
            </h2>
            <p className="text-[hsl(215,14%,46%)] leading-relaxed mb-8 font-dm-sans">{empty.text}</p>
            <Link
              href={empty.link.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(215,28%,12%)] underline underline-offset-4 decoration-[hsl(215,28%,12%)]/25 hover:decoration-[hsl(215,28%,12%)] transition-all font-dm-sans"
            >
              {empty.link.label}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`${section.path}/${post.slug}`}
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
  );
}
