"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";

const ITEMS = [
  { id: "01", name: "Agreement Platform", stage: "Development", progress: 75 },
  { id: "02", name: "Aariya", stage: "Development", progress: 65 },
  { id: "03", name: "Portfolio", stage: "Building", progress: 90 },
];

const LEARNING = [
  "AI systems",
  "Full-stack architecture",
  "Real-time systems",
  "Secure application development",
];

export default function CurrentlyBuilding() {
  return (
    <Section id="building" index="10" eyebrow="STATUS" title="Currently Building">
      <p className="-mt-6 mb-10 max-w-2xl text-secondary">
        Nothing here is finished, and I won&apos;t pretend otherwise. This is the
        honest status board.
      </p>

      <div className="space-y-4">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="rounded-lg border border-line bg-panel p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-secondary/60">
                  {item.id}
                </span>
                <span className="text-lg font-medium text-primary">
                  {item.name}
                </span>
              </div>
              <span className="rounded border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-widest text-accent">
                {item.stage.toUpperCase()}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-1.5 flex-1 overflow-hidden rounded bg-line">
                <motion.div
                  className="h-full rounded bg-gradient-to-r from-accent to-cyan"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                />
              </div>
              <span className="font-mono text-xs text-secondary">
                {item.progress}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-line bg-panel p-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-secondary/60">04</span>
          <span className="font-mono text-sm tracking-[0.2em] text-success">
            LEARNING
          </span>
          <span className="h-px flex-1 bg-line" />
          <span className="h-2 w-2 animate-pulse-node rounded-full bg-success" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {LEARNING.map((topic) => (
            <span
              key={topic}
              data-cursor="link"
              className="rounded border border-line px-3 py-1.5 text-sm text-secondary transition-colors hover:border-success hover:text-success"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
