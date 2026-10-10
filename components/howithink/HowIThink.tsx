"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { thinkingExamples, thinkingProcess } from "@/data/how-i-think";

export default function HowIThink() {
  return (
    <Section id="how-i-think" index="03b" eyebrow="ENGINEERING THINKING" title="How I Think">
      <p className="-mt-6 mb-10 max-w-2xl text-secondary">
        I focus on process over perfection. Here&apos;s how I break down problems and work through them.
      </p>

      <div className="relative overflow-hidden rounded-xl border border-line bg-panel p-6 sm:p-10">
        <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
        <div className="relative">
          <p className="mb-8 font-mono text-[11px] tracking-[0.25em] text-accent">
            PROBLEM-SOLVING PROCESS
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {thinkingProcess.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="relative flex flex-col rounded-lg border border-line bg-ink/70 p-5"
              >
                {i < thinkingProcess.length - 1 && (
                  <>
                    <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 font-mono text-lg text-accent lg:block">
                      →
                    </span>
                    <span className="absolute -bottom-4 left-1/2 block -translate-x-1/2 font-mono text-lg text-accent lg:hidden">
                      ↓
                    </span>
                  </>
                )}
                <span className="font-mono text-2xl font-bold text-line">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-mono text-xs tracking-[0.2em] text-primary">{step.label}</p>
                <p className="mt-2 text-sm text-secondary">{step.detail}</p>
              </motion.div>
            ))}
          </div>

          <p className="mb-6 mt-12 font-mono text-[11px] tracking-[0.25em] text-accent">
            APPLIED IN PRACTICE
          </p>
          <div className="grid gap-5 lg:grid-cols-3">
            {thinkingExamples.map((ex, i) => (
              <motion.div
                key={ex.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex flex-col rounded-lg border border-line bg-ink/70 p-5"
              >
                <span className="font-mono text-[10px] tracking-widest text-secondary/60">{ex.project}</span>
                <h3 className="mt-2 font-mono text-sm tracking-[0.15em] text-primary">{ex.title.toUpperCase()}</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-accent">PROBLEM</p>
                    <p className="mt-1 text-secondary">{ex.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-cyan">APPROACH</p>
                    <p className="mt-1 text-secondary">{ex.approach}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-success">OUTCOME</p>
                    <p className="mt-1 text-secondary">{ex.outcome}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
