'use client';

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Breadcrumb, { type BreadcrumbItem } from "@/components/shared/Breadcrumb";

const DetailHero = ({
  breadcrumb,
  icon: Icon,
  title,
  subtitle,
  meta,
  children,
  maxWidthClassName = "max-w-3xl",
}: {
  breadcrumb: BreadcrumbItem[];
  icon: LucideIcon;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  meta?: React.ReactNode;
  children?: React.ReactNode;
  maxWidthClassName?: string;
}) => {
  return (
    <section className="relative overflow-hidden bg-[hsl(215,28%,12%)] pt-10 pb-14 md:pt-14 md:pb-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="detail-hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#detail-hero-grid)" />
        </svg>
        <div className="absolute top-0 -right-24 w-80 h-80 rounded-full bg-[hsl(160,84%,39%)]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[hsl(160,84%,39%)]/8 blur-3xl" />
      </div>

      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[hsl(160,84%,39%)]/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[hsl(160,84%,39%)]/30 pointer-events-none" />

      <div className={`relative z-10 ${maxWidthClassName} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="mb-8">
          <Breadcrumb items={breadcrumb} dark />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-[hsl(160,84%,39%)]/15 ring-1 ring-[hsl(160,84%,39%)]/30">
            <Icon className="w-7 h-7 text-[hsl(160,84%,39%)]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto leading-relaxed font-dm-sans text-white/60">
            {subtitle}
          </p>

          {meta && (
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs font-dm-sans text-white/40">
              {meta}
            </div>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default DetailHero;
