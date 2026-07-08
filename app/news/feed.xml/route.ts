import { getAllNews } from "@/lib/news";
import { baseUrl } from "@/lib/seo";

export const dynamic = "force-static";

const SITE_NAME = "NeedALoanToday";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = getAllNews();

  const entries = items
    .map((p) => {
      const link = `${baseUrl}/news/${p.slug}`;
      const pubDate = new Date(`${p.date}T00:00:00Z`).toUTCString();
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(p.category)}</category>
      <description>${escapeXml(p.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} News</title>
    <link>${baseUrl}/news</link>
    <description>Loan and interest-rate news for Canadian borrowers.</description>
    <language>en-CA</language>
    <atom:link href="${baseUrl}/news/feed.xml" rel="self" type="application/rss+xml" />${entries}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
