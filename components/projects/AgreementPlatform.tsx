"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import {
  agreementLifecycle,
  agreementOverview,
  agreementSecurity,
  agreementStack,
  agreementTabs,
  agreementWorkflow,
  type TabId,
} from "@/data/projects";
import { cn } from "@/lib/utils";

function ArchNode({
  label,
  accent,
  description,
}: {
  label: string;
  accent?: boolean;
  description?: string;
}) {
  return (
    <div
      data-cursor="link"
      className={cn(
        "group rounded border bg-ink px-4 py-3 text-center transition-colors",
        accent ? "border-accent" : "border-line hover:border-secondary"
      )}
      title={description}
    >
      <p
        className={cn(
          "font-mono text-xs tracking-wider",
          accent ? "text-accent" : "text-primary"
        )}
      >
        {label}
      </p>
      {description ? (
        <p className="mt-1 hidden text-[11px] leading-snug text-secondary group-hover:block">
          {description}
        </p>
      ) : null}
    </div>
  );
}

const Connector = () => (
  <div className="flex justify-center">
    <div className="h-6 w-px bg-line">
      <div className="mx-auto mt-1 h-1.5 w-1.5 rotate-45 border-b border-r border-accent/70" />
    </div>
  </div>
);

function ArchitecturePanel() {
  return (
    <div className="mx-auto max-w-xl">
      <ArchNode label="FRONTEND" description="React interface for drafting and review" />
      <Connector />
      <ArchNode
        label="API LAYER"
        accent
        description="Routes, validation, permissions"
      />
      <Connector />
      <div className="grid grid-cols-2 gap-4">
        <ArchNode
          label="AGREEMENT ENGINE"
          description="Lifecycle, clauses, versioning"
        />
        <ArchNode label="AUTH SYSTEM" description="Identity, roles, party access" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <Connector />
          <div className="w-full">
            <ArchNode label="DATABASE" description="Agreements, versions, users" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Connector />
          <div className="w-full">
            <ArchNode label="AUDIT HISTORY" description="Approvals & signatures, ordered" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowPanel() {
  return (
    <ol className="mx-auto max-w-2xl">
      {agreementWorkflow.map((stage, i) => (
        <motion.li
          key={stage.step}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
          className="flex gap-4"
        >
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]",
                i === agreementWorkflow.length - 1
                  ? "border-success text-success"
                  : "border-accent text-accent"
              )}
            >
              {i + 1}
            </span>
            {i < agreementWorkflow.length - 1 && (
              <span className="w-px flex-1 bg-line" />
            )}
          </div>
          <div className="pb-6">
            <p className="font-mono text-xs tracking-[0.2em] text-primary">
              {stage.step}
            </p>
            <p className="mt-1 text-sm text-secondary">{stage.detail}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export default function AgreementPlatform() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <Section
      id="agreement-platform"
      index="04"
      eyebrow="FEATURED PROJECT 01"
      title="Agreement Platform"
    >
      <div className="overflow-hidden rounded-xl border border-line bg-panel">
        {/* Case-study header */}
        <div className="relative border-b border-line p-6 sm:p-10">
          <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="font-mono text-5xl font-bold text-line">01</span>
              <h3 className="mt-2 font-mono text-xl tracking-[0.2em] text-primary sm:text-2xl">
                AGREEMENT PLATFORM
              </h3>
              <p className="mt-4 max-w-xl text-secondary">
                A full-stack agreement management platform for the complete
                business agreement lifecycle.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded border border-line px-2 py-1 font-mono text-[10px] tracking-wider text-secondary">
                  ONGOING
                </span>
                <span className="rounded border border-success/50 px-2 py-1 font-mono text-[10px] tracking-wider text-success">
                  IN DEVELOPMENT
                </span>
                <span className="rounded border border-line px-2 py-1 font-mono text-[10px] tracking-wider text-secondary">
                  NODE.JS
                </span>
              </div>
            </div>

            {/* Lifecycle */}
            <div className="flex flex-col items-start gap-1 lg:items-center lg:flex-row lg:gap-2">
              {agreementLifecycle.map((stage, i) => (
                <div key={stage} className="flex items-center gap-1 lg:gap-2">
                  <span
                    data-cursor="link"
                    className="rounded border border-line bg-ink px-2.5 py-1.5 font-mono text-[10px] tracking-widest text-secondary transition-colors hover:border-accent hover:text-primary"
                  >
                    {stage}
                  </span>
                  {i < agreementLifecycle.length - 1 && (
                    <span className="font-mono text-[10px] text-accent lg:rotate-0 rotate-90">
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-line px-3 py-2 sm:px-6">
          {agreementTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              data-cursor="link"
              className={cn(
                "rounded px-3 py-2 font-mono text-[11px] tracking-widest transition-colors",
                tab === t.id
                  ? "bg-accent/15 text-primary"
                  : "text-secondary hover:text-primary"
              )}
            >
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-[360px] p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "overview" && (
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <p className="text-lg leading-relaxed text-secondary">
                      {agreementOverview.description}
                    </p>
                    <p className="mt-6 font-mono text-[11px] tracking-[0.25em] text-accent">
                      LIFECYCLE
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {agreementLifecycle.map((s, i) => (
                        <span
                          key={s}
                          className="font-mono text-xs text-secondary"
                        >
                          {s}
                          {i < agreementLifecycle.length - 1 && (
                            <span className="mx-2 text-accent">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ul className="grid content-start gap-3">
                    {agreementOverview.points.map((p, i) => (
                      <li
                        key={p}
                        className="flex gap-3 rounded border border-line bg-ink p-4 text-sm text-secondary"
                      >
                        <span className="font-mono text-[10px] text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tab === "architecture" && (
                <div>
                  <p className="mb-8 text-center font-mono text-[11px] tracking-[0.25em] text-secondary">
                    SYSTEM ARCHITECTURE — hover a node
                  </p>
                  <ArchitecturePanel />
                </div>
              )}

              {tab === "workflow" && (
                <div>
                  <p className="mb-8 text-center font-mono text-[11px] tracking-[0.25em] text-secondary">
                    AGREEMENT WORKFLOW
                  </p>
                  <WorkflowPanel />
                </div>
              )}

              {tab === "security" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {agreementSecurity.map((s, i) => (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded border border-line bg-ink p-5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        <h4 className="font-mono text-xs tracking-widest text-primary">
                          {s.title.toUpperCase()}
                        </h4>
                      </div>
                      <p className="mt-2 text-sm text-secondary">{s.detail}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {tab === "stack" && (
                <div>
                  <p className="mb-6 font-mono text-[11px] tracking-[0.25em] text-secondary">
                    TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {agreementStack.map((tech) => (
                      <span
                        key={tech}
                        data-cursor="link"
                        className="rounded border border-line bg-ink px-4 py-2.5 font-mono text-sm text-primary transition-colors hover:border-accent hover:text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="font-mono text-[11px] text-secondary/60">
          Architecture data is live — switch tabs above to explore the system.
        </p>
        <Link
          href="/projects/agreement-platform"
          data-cursor="link"
          className="group inline-flex items-center gap-2 rounded border border-line px-5 py-3 font-mono text-xs tracking-[0.2em] text-primary transition-colors hover:border-accent hover:text-accent"
        >
          READ FULL CASE STUDY
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </Section>
  );
}
