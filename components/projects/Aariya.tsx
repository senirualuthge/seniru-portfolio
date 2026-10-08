"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import { aariyaBranches, aariyaStack } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function Aariya() {
  const [active, setActive] = useState<string>("voice");
  const branch = aariyaBranches.find((b) => b.id === active) ?? aariyaBranches[0];

  return (
    <Section id="aariya" index="05" eyebrow="FEATURED PROJECT 02" title="Aariya">
      <div className="relative overflow-hidden rounded-xl border border-line bg-[#080a0c]">
        {/* distinct environment: cyan glow + node field */}
        <div
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan/10 blur-[120px]"
          aria-hidden
        />
        <div className="grid-bg absolute inset-0 opacity-25" aria-hidden />

        <div className="relative p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="font-mono text-5xl font-bold text-line">02</span>
              <h3 className="mt-2 font-mono text-xl tracking-[0.2em] text-primary sm:text-2xl">
                AARIYA
              </h3>
              <p className="mt-4 max-w-xl text-secondary">
                A multi-surface AI companion designed around natural
                conversation, real-time interaction and intelligent assistance.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded border border-line px-2 py-1 font-mono text-[10px] tracking-wider text-secondary">
                  ONGOING
                </span>
                <span className="rounded border border-cyan/50 px-2 py-1 font-mono text-[10px] tracking-wider text-cyan">
                  IN DEVELOPMENT
                </span>
                <span className="rounded border border-line px-2 py-1 font-mono text-[10px] tracking-wider text-secondary">
                  PYTHON · FASTAPI · REACT · FLUTTER
                </span>
              </div>
            </div>

            {/* Core → branches graph */}
            <div className="w-full max-w-sm">
              <div className="flex justify-center">
                <div
                  data-cursor="link"
                  className="flex items-center gap-2 rounded-full border border-cyan bg-ink px-5 py-2.5 shadow-lg shadow-cyan/20"
                >
                  <span className="h-2 w-2 animate-pulse-node rounded-full bg-cyan" />
                  <span className="font-mono text-[11px] tracking-[0.25em] text-primary">
                    AARIYA CORE
                  </span>
                </div>
              </div>

              <svg
                className="mx-auto h-8 w-full"
                viewBox="0 0 100 32"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M50 0 V12 M15 32 V20 Q15 12 50 12 Q85 12 85 20 V32 M50 12 V32"
                  fill="none"
                  stroke="#27272a"
                  strokeWidth="1"
                  className="flow-line"
                />
              </svg>

              <div className="grid grid-cols-3 gap-3">
                {aariyaBranches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setActive(b.id)}
                    data-cursor="link"
                    className={cn(
                      "rounded border px-2 py-3 text-center transition-all",
                      active === b.id
                        ? "border-cyan bg-cyan/10 shadow-lg shadow-cyan/10"
                        : "border-line hover:border-secondary"
                    )}
                  >
                    <p
                      className={cn(
                        "font-mono text-[11px] tracking-widest",
                        active === b.id ? "text-cyan" : "text-primary"
                      )}
                    >
                      {b.label}
                    </p>
                    <p className="mt-1 hidden text-[10px] leading-tight text-secondary sm:block">
                      {b.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pipeline panel */}
          <div className="mt-10 rounded-lg border border-line bg-ink/70 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={branch.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="mb-6 text-center font-mono text-[11px] tracking-[0.3em] text-cyan">
                  {branch.label} SYSTEM
                </p>
                <ol className="mx-auto max-w-md">
                  {branch.pipeline.map((step, i) => (
                    <li key={step}>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        data-cursor="link"
                        className="rounded border border-line bg-panel px-4 py-2.5 text-center font-mono text-xs tracking-wider text-primary transition-colors hover:border-cyan"
                      >
                        {step}
                      </motion.div>
                      {i < branch.pipeline.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.08 + 0.04 }}
                          className="py-1 text-center font-mono text-xs text-cyan"
                        >
                          ↓
                        </motion.div>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-center text-[11px] text-secondary/60">
                  Click VOICE · MEMORY · AI above to inspect each subsystem.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stack */}
          <div className="mt-8 flex flex-wrap gap-2">
            {aariyaStack.map((tech) => (
              <span
                key={tech}
                data-cursor="link"
                className="rounded border border-line px-3 py-1.5 font-mono text-[11px] text-secondary transition-colors hover:border-cyan hover:text-cyan"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/projects/aariya"
              data-cursor="link"
              className="group inline-flex items-center gap-2 rounded border border-line px-5 py-3 font-mono text-xs tracking-[0.2em] text-primary transition-colors hover:border-cyan hover:text-cyan"
            >
              READ FULL CASE STUDY
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
