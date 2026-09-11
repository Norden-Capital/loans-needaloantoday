import { createPostCollection, type ArticleSection } from "@/lib/content";

export type { PostMeta as NewsMeta } from "@/lib/content";

export const NEWS_DESCRIPTION =
  "Loan and interest-rate news for Canadian borrowers — Bank of Canada decisions, lending data, and credit trends, reported in plain English by NeedALoanToday.";

export const NEWS_SECTION: ArticleSection = {
  label: "News",
  path: "/news",
  schemaType: "NewsArticle",
  dateLine: "published",
  backLabel: "All news",
  next: { label: "Read the blog", href: "/blog" },
};

const news = createPostCollection({
  folder: "news",
  defaultAuthor: "NeedALoanToday Newsroom",
  defaultCategory: "News",
});

/** Published news items, newest first. */
export const getAllNews = news.getAll;
export const getNews = news.get;
