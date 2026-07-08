"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { TocItem } from "@/lib/toc";

const ACCENT = "hsl(160,84%,39%)";

/**
 * Table of contents.
 * - variant="mobile": a collapsible block shown above the article on small screens.
 * - variant="sidebar": a sticky side rail shown next to the article on lg+ (parent handles the sticky wrapper).
 * Scroll-spy highlights the section currently in view. Themed to the NeedALoanToday emerald accent.
 */
export function TableOfContents({
  items,
  variant = "sidebar",
}: {
  items: TocItem[];
  variant?: "sidebar" | "mobile";
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  const list = (
    <ul className="flex flex-col gap-2 text-[0.8125rem] font-dm-sans">
      {items.map((item) => {
        const active = activeId === item.id;
        return (
          <li key={item.id} className={item.depth === 3 ? "pl-3" : ""}>
            <a
              href={`#${item.id}`}
              className="block leading-snug transition-colors border-l-2 -ml-px pl-3"
              style={{
                borderColor: active ? ACCENT : "transparent",
                color: active ? ACCENT : "hsl(215,14%,46%)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  const header = (
    <div className="flex items-center gap-2 mb-3">
      <List size={14} style={{ color: ACCENT }} strokeWidth={2} />
      <span
        className="text-[11px] font-semibold tracking-[0.14em] uppercase font-space-grotesk"
        style={{ color: "hsl(215,14%,46%)" }}
      >
        On this page
      </span>
    </div>
  );

  if (variant === "mobile") {
    return (
      <details
        className="lg:hidden mb-8 rounded-xl border bg-[hsl(210,25%,97%)] p-4"
        style={{ borderColor: "hsl(214,20%,90%)" }}
      >
        <summary
          className="flex items-center gap-2 cursor-pointer list-none text-[11px] font-semibold tracking-[0.14em] uppercase font-space-grotesk"
          style={{ color: "hsl(215,14%,46%)" }}
        >
          <List size={14} style={{ color: ACCENT }} strokeWidth={2} />
          On this page
        </summary>
        <div className="mt-4 border-l" style={{ borderColor: "hsl(214,20%,90%)" }}>
          {list}
        </div>
      </details>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="border-l"
      style={{ borderColor: "hsl(214,20%,90%)" }}
    >
      <div className="pl-3">{header}</div>
      {list}
    </nav>
  );
}
