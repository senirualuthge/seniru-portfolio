"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ArchNodeDef } from "@/data/case-studies";
import { cn } from "@/lib/utils";

/**
 * Reusable interactive architecture diagram.
 *
 * Nodes are placed on a simple col/row grid; connectors are drawn in an SVG
 * overlay using percentage coordinates (with non-scaling strokes, so the
 * overlay can stretch freely). Clicking a node highlights it, dims unrelated
 * nodes, highlights its connectors, and opens a detail panel underneath.
 */
export default function ArchitectureExplorer({
  nodes,
  accent = "violet",
  hint = "Click a component to inspect it",
}: {
  nodes: ArchNodeDef[];
  accent?: "violet" | "cyan";
  hint?: string;
}) {
  const cols = Math.max(...nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...nodes.map((n) => n.row)) + 1;
  const [selectedId, setSelectedId] = useState<string | null>(
    nodes.find((n) => n.accent)?.id ?? nodes[0]?.id ?? null
  );

  const selected = nodes.find((n) => n.id === selectedId) ?? null;

  // Percentage coordinates for each node centre
  const pos = (n: ArchNodeDef) => ({
    x: ((n.col + 0.5) / cols) * 100,
    y: ((n.row + 0.5) / rows) * 100,
  });

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const edges = nodes.flatMap((n) =>
    n.connectsTo
      .filter((target) => byId.has(target))
      .map((target) => ({ from: n, to: byId.get(target)! }))
  );

  const relatedIds = selected
    ? new Set([
        selected.id,
        ...selected.connectsTo,
        ...edges.filter((e) => e.to.id === selected.id).map((e) => e.from.id),
      ])
    : null;

  const accentColor = accent === "cyan" ? "#06b6d4" : "#7c3aed";

  return (
    <div>
      <p className="mb-6 text-center font-mono text-[11px] tracking-[0.25em] text-secondary">
        SYSTEM ARCHITECTURE — {hint.toUpperCase()}
      </p>

      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div
          className="relative mx-auto w-full min-w-[520px] sm:min-w-[560px]"
          style={{ height: Math.max(rows * 110, 300) }}
        >
          {/* Connectors */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {edges.map(({ from, to }) => {
              const a = pos(from);
              const b = pos(to);
              const active =
                !relatedIds ||
                (relatedIds.has(from.id) && relatedIds.has(to.id));
              return (
                <line
                  key={`${from.id}-${to.id}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={active ? accentColor : "#27272a"}
                  strokeWidth={active ? 1.5 : 1}
                  strokeDasharray="4 4"
                  className={active ? "flow-line" : undefined}
                  vectorEffect="non-scaling-stroke"
                  opacity={active ? 0.9 : 0.5}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((n) => {
            const p = pos(n);
            const isSelected = n.id === selectedId;
            const dimmed = relatedIds ? !relatedIds.has(n.id) : false;
            return (
              <button
                key={n.id}
                onClick={() =>
                  setSelectedId((cur) => (cur === n.id ? null : n.id))
                }
                data-cursor="link"
                aria-pressed={isSelected}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded border bg-ink px-3 py-2 text-center transition-all duration-200 sm:px-4 sm:py-3",
                  isSelected
                    ? "shadow-lg"
                    : dimmed
                      ? "border-line opacity-40"
                      : "border-line hover:border-secondary"
                )}
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  borderColor: isSelected
                    ? accentColor
                    : undefined,
                  boxShadow: isSelected
                    ? `0 0 24px ${accentColor}33`
                    : undefined,
                }}
              >
                <span
                  className="block font-mono text-[11px] tracking-wider sm:text-xs"
                  style={{ color: isSelected ? accentColor : undefined }}
                >
                  {n.label.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="mt-6 rounded-lg border border-line bg-ink p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4
                className="font-mono text-sm tracking-[0.2em]"
                style={{ color: accentColor }}
              >
                {selected.label.toUpperCase()}
              </h4>
              <button
                onClick={() => setSelectedId(null)}
                data-cursor="link"
                className="font-mono text-[10px] tracking-widest text-secondary transition-colors hover:text-primary"
              >
                CLOSE ✕
              </button>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {selected.summary}
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/70">
                  RESPONSIBILITIES
                </p>
                <ul className="mt-2 space-y-1.5">
                  {selected.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2 text-sm text-primary/90"
                    >
                      <span style={{ color: accentColor }}>▸</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/70">
                  TECHNOLOGY
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-line px-2 py-1 font-mono text-[11px] text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-secondary/70">
                  CONNECTS TO
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.connectsTo.length > 0 ? (
                    selected.connectsTo.map((id) => (
                      <button
                        key={id}
                        onClick={() => setSelectedId(id)}
                        data-cursor="link"
                        className="rounded border border-line px-2 py-1 font-mono text-[11px] text-primary transition-colors hover:border-accent hover:text-accent"
                      >
                        {byId.get(id)?.label ?? id}
                      </button>
                    ))
                  ) : (
                    <span className="font-mono text-[11px] text-secondary/60">
                      Terminal node
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
