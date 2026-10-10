"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { problemsSolutions } from "@/data/problems-solutions";

export default function ProblemsSolutions() {
  return (
    <Section id="problems-solutions" index="03e" eyebrow="PROBLEM SOLVING" title="Problems → Solutions">
      <p className="-mt-6 mb-10 max-w-2xl text-secondary">
        Focusing on the problem first, then the minimal solution that solves it.
      </p>

      <div className="relative overflow-hidden rounded-xl border border-line bg-panel p-6 sm:p-10">
        <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
        <div className="relative grid gap-4 lg:grid-cols-2">
          {problemsSolutions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-lg border border-line bg-ink/70 p-5"
            >
              <span className="font-mono text-[10px] tracking-widest text-secondary/60">{item.project}</span>
              <div className="mt-3">
                <p className="font-mono text-[10px] tracking-widest text-accent">PROBLEM</p>
                <p className="mt-1 text-sm text-secondary">{item.problem}</p>
              </div>
              <div className="mt-3">
                <p className="font-mono text-[10px] tracking-widest text-cyan">SOLUTION</p>
                <p className="mt-1 text-sm text-secondary">{item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
