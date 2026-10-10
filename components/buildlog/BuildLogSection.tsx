"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { buildLog } from "@/data/build-log";

export default function BuildLogSection() {
  return (
    <Section id="build-log" index="03c" eyebrow="BUILD IN PUBLIC" title="Build Log">
      <p className="-mt-6 mb-10 max-w-2xl text-secondary">
        A running log of what I&apos;m building and learning. Nothing staged — just honest progress.
      </p>

      <div className="relative overflow-hidden rounded-xl border border-line bg-panel p-6 sm:p-10">
        <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
        <div className="relative">
          <div className="space-y-4">
            {buildLog.map((entry, i) => (
              <motion.div
                key={`${entry.date}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex flex-col gap-3 rounded-lg border border-line bg-ink/70 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] tracking-widest text-secondary/60">{entry.date}</span>
                  <div>
                    <p className="font-mono text-sm tracking-[0.15em] text-primary">{entry.project}</p>
                    <p className="mt-1 text-sm text-secondary">{entry.change}</p>
                  </div>
                </div>
                <span
                  className={`rounded border px-3 py-1 font-mono text-[10px] tracking-widest ${
                    entry.type === "feature"
                      ? "border-accent/50 text-accent"
                      : entry.type === "improvement"
                        ? "border-cyan/50 text-cyan"
                        : "border-success/50 text-success"
                  }`}
                >
                  {entry.type.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
