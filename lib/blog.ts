import { createPostCollection, type ArticleSection } from "@/lib/content";

export type { PostMeta as BlogMeta } from "@/lib/content";

export const BLOG_DESCRIPTION =
  "Practical borrowing insights for Canadians — rate explainers, debt-payoff strategies, and plain-English guides to personal loans, all from the NeedALoanToday team.";

export const BLOG_SECTION: ArticleSection = {
  label: "Blog",
  path: "/blog",
  schemaType: "BlogPosting",
  dateLine: "updated",
  backLabel: "All blog posts",
  next: { label: "In-depth loan guides", href: "/resources/guides" },
};

const blog = createPostCollection({
  folder: "blog",
  defaultAuthor: "NeedALoanToday Editorial Team",
  defaultCategory: "Article",
});

/** Published blog posts, newest first. */
export const getAllPosts = blog.getAll;
export const getPost = blog.get;
