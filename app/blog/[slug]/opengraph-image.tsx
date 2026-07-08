import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";

export const alt = "NeedALoanToday blog article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

const NAVY = "hsl(215, 28%, 12%)";
const ACCENT = "hsl(160, 84%, 39%)";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.meta.title ?? "NeedALoanToday Blog";
  const category = (post?.meta.category ?? "Blog").toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NAVY,
          padding: "72px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: ACCENT }} />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: ACCENT }} />
          <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>NeedALoanToday</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 5, color: "#5fd6a3" }}>
            {category}
          </span>
          <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.08, maxWidth: 1000, letterSpacing: -1.5 }}>
            {title}
          </span>
        </div>

        <span style={{ fontSize: 24, color: "rgba(255,255,255,0.55)" }}>needaloantoday.ca/blog</span>
      </div>
    ),
    { ...size },
  );
}
