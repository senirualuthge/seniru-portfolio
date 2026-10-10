"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { failuresLessons } from "@/data/failures-lessons";

export default function FailuresLessons() {
  return (
    <Section id="failures-lessons" index="03f" eyebrow="LEARNINGS" title="Failures → Lessons">
      <p className="-mt-6 mb-10 max-w-2xl text-secondary">
        Things that didn&apos;t work as expected — and what changed because of them.
      </p>

      <div className="relative overflow-hidden rounded-xl border border-line bg-panel p-6 sm:p-10">
        <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
        <div className="relative grid gap-4 lg:grid-cols-3">
          {failuresLessons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-lg border border-line bg-ink/70 p-5"
            >
              <p className="font-mono text-sm tracking-[0.15em] text-primary">{item.experiment.toUpperCase()}</p>
              <div className="mt-3">
                <p className="font-mono text-[10px] tracking-widest text-accent">PROBLEM</p>
                <p className="mt-1 text-sm text-secondary">{item.problem}</p>
              </div>
              <div className="mt-3">
                <p className="font-mono text-[10px] tracking-widest text-cyan">CHANGE</p>
                <p className="mt-1 text-sm text-secondary">{item.change}</p>
              </div>
              <div className="mt-3">
                <p className="font-mono text-[10px] tracking-widest text-success">LESSON</p>
                <p className="mt-1 text-sm text-secondary">{item.lesson}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
