import { ImageResponse } from "next/og";

import { BASE_URL } from "@/lib/seo";

const NAVY = "hsl(215, 28%, 12%)";
const ACCENT = "hsl(160, 84%, 39%)";

/** Social share card for blog posts and news items, in the NeedALoanToday navy and emerald palette. */
export function articleOgImage({
  title,
  eyebrow,
  path,
  size,
}: {
  title: string;
  eyebrow: string;
  path: string;
  size: { width: number; height: number };
}) {
  const footer = `${new URL(BASE_URL).host}${path}`;

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
            {eyebrow.toUpperCase()}
          </span>
          <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.08, maxWidth: 1000, letterSpacing: -1.5 }}>
            {title}
          </span>
        </div>

        <span style={{ fontSize: 24, color: "rgba(255,255,255,0.55)" }}>{footer}</span>
      </div>
    ),
    { ...size },
  );
}
