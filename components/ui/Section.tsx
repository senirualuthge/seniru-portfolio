"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Section({
  id,
  index,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-24 sm:py-28", className)}
    >
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-secondary">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-5xl">
          {title}
        </h2>
      </motion.header>
      {children}
    </section>
  );
}
