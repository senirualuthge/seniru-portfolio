"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ArchitectureExplorer from "@/components/case-study/ArchitectureExplorer";
import type { CaseStudy, Section } from "@/data/case-studies";
import { cn } from "@/lib/utils";

function SectionBlock({
  section,
  accent,
}: {
  section: Section;
  accent: "violet" | "cyan";
}) {
  const accentText = accent === "cyan" ? "text-cyan" : "text-accent";

  return (
    <section id={section.id} className="scroll-mt-24 py-12 sm:py-16">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-secondary">
          <span className={accentText}>§</span>
          <span className="h-px w-8 bg-line" />
          <span>{section.title.toUpperCase()}</span>
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          {section.title}
        </h2>
        {section.intro && (
          <p className="mt-3 max-w-2xl text-secondary">{section.intro}</p>
        )}
      </motion.header>

      {section.kind === "prose" && (
        <div className="max-w-3xl">
          {section.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="mb-4 leading-relaxed text-secondary">
              {p}
            </p>
          ))}
          {section.bullets && (
            <ul className="mt-6 space-y-2.5">
              {section.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-primary/90">
                  <span className={accentText}>▸</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {section.kind === "cards" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {section.cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded border border-line bg-panel p-5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: accent === "cyan" ? "#06b6d4" : "#7c3aed",
                  }}
                />
                <h3 className="font-mono text-xs tracking-widest text-primary">
                  {c.title.toUpperCase()}
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-secondary">
                {c.detail}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {section.kind === "flow" && (
        <ol className="mx-auto max-w-2xl">
          {section.steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]",
                    accent === "cyan"
                      ? "border-cyan text-cyan"
                      : "border-accent text-accent"
                  )}
                >
                  {i + 1}
                </span>
                {i < section.steps.length - 1 && (
                  <span className="w-px flex-1 bg-line" />
                )}
              </div>
              <div className="pb-6">
                <p className="font-mono text-xs tracking-[0.2em] text-primary">
                  {s.title.toUpperCase()}
                </p>
                <p className="mt-1 text-sm text-secondary">{s.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      )}

      {section.kind === "architecture" && (
        <ArchitectureExplorer nodes={section.nodes} accent={accent} />
      )}

      {section.kind === "decisions" && (
        <div className="space-y-4">
          {section.decisions.map((d) => (
            <details
              key={d.id}
              className="group rounded border border-line bg-panel open:border-accent/50"
            >
              <summary
                data-cursor="link"
                className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 p-5 [&::-webkit-details-marker]:hidden"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-widest",
                      accent === "cyan" ? "text-cyan" : "text-accent"
                    )}
                  >
                    DECISION #{d.id}
                  </span>
                  <span className="font-mono text-sm text-primary">
                    {d.question}
                  </span>
                </div>
                <span className="font-mono text-xs text-secondary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-line p-5 text-sm">
                <p className="text-secondary">
                  <span className="font-mono text-[10px] tracking-widest text-secondary/70">
                    CONTEXT
                  </span>
                  <br />
                  {d.context}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {d.options.map((o) => (
                    <div
                      key={o.name}
                      className={cn(
                        "rounded border p-3",
                        o.name === d.chosen
                          ? "border-success/50 bg-success/5"
                          : "border-line"
                      )}
                    >
                      <p className="font-mono text-[11px] text-primary">
                        {o.name}
                        {o.name === d.chosen && (
                          <span className="ml-2 text-success">✓</span>
                        )}
                      </p>
                      <p className="mt-1 text-xs text-secondary">{o.note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <p className="text-secondary">
                    <span className="font-mono text-[10px] tracking-widest text-secondary/70">
                      REASONING
                    </span>
                    <br />
                    {d.reasoning}
                  </p>
                  <p className="text-secondary">
                    <span className="font-mono text-[10px] tracking-widest text-secondary/70">
                      TRADE-OFFS
                    </span>
                    <br />
                    {d.tradeoffs}
                  </p>
                </div>

                <p className="mt-4 font-mono text-[10px] tracking-widest text-secondary/70">
                  STATUS — {d.status.toUpperCase()}
                </p>
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}

export default function CaseStudyView({ study }: { study: CaseStudy }) {
  const accentHex = study.accent === "cyan" ? "#06b6d4" : "#7c3aed";
  const [activeId, setActiveId] = useState(study.sections[0]?.id ?? "");

  // Track the section currently in view for the side nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    study.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [study]);

  return (
    <main className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:pt-32">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-xl border border-line bg-panel p-6 sm:p-10">
        <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[120px]"
          style={{ background: `${accentHex}1a` }}
          aria-hidden
        />

        <div className="relative">
          <Link
            href="/"
            data-cursor="link"
            className="font-mono text-[11px] tracking-widest text-secondary transition-colors hover:text-primary"
          >
            ← BACK TO PORTFOLIO
          </Link>

          <div className="mt-6 flex items-start gap-5">
            <span className="font-mono text-5xl font-bold text-line sm:text-6xl">
              {study.index}
            </span>
            <div>
              <h1 className="font-mono text-2xl tracking-[0.15em] text-primary sm:text-4xl">
                {study.title.toUpperCase()}
              </h1>
              <p className="mt-2 text-secondary sm:text-lg">
                {study.subtitle}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl leading-relaxed text-secondary">
            {study.intro}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {study.statusChips.map((chip) => (
              <span
                key={chip.label}
                className={cn(
                  "rounded border px-2.5 py-1 font-mono text-[10px] tracking-wider",
                  chip.tone === "success"
                    ? "border-success/50 text-success"
                    : chip.tone === "accent"
                      ? "border-accent/50 text-accent"
                      : "border-line text-secondary"
                )}
              >
                {chip.label}
              </span>
            ))}
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-line px-2.5 py-1 font-mono text-[10px] tracking-wider text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-10 gap-12 lg:grid lg:grid-cols-[200px_1fr]">
        {/* Sticky section nav */}
        <nav
          aria-label="Case study sections"
          className="mb-8 lg:mb-0 lg:self-start"
        >
          <div className="sticky top-24 flex gap-1 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible">
            <p className="hidden pb-3 font-mono text-[10px] tracking-[0.25em] text-secondary/70 lg:block">
              CONTENTS
            </p>
            {study.sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-cursor="link"
                className={cn(
                  "shrink-0 whitespace-nowrap rounded px-3 py-2 font-mono text-[11px] tracking-wider transition-colors lg:whitespace-normal",
                  activeId === s.id
                    ? "bg-accent/15 text-primary"
                    : "text-secondary hover:text-primary"
                )}
                style={
                  activeId === s.id && study.accent === "cyan"
                    ? { background: "rgba(6,182,212,0.15)", color: "#f5f5f5" }
                    : undefined
                }
              >
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Sections */}
        <div className="min-w-0 divide-y divide-line border-t border-line lg:border-t-0">
          {study.sections.map((s) => (
            <SectionBlock key={s.id} section={s} accent={study.accent} />
          ))}

          {/* Next project */}
          <div className="pt-12">
            <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/70">
              NEXT CASE STUDY
            </p>
            <Link
              href={`/projects/${study.next.slug}`}
              data-cursor="link"
              className="group mt-3 flex items-center justify-between rounded border border-line bg-panel p-5 transition-colors hover:border-accent"
            >
              <span className="font-mono text-lg tracking-widest text-primary sm:text-2xl">
                {study.next.title.toUpperCase()}
              </span>
              <span className="font-mono text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
