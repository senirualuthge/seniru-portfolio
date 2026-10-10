"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const NODES = [
  { id: "ai", label: "AI", sub: "SYSTEMS", x: 12, y: 74 },
  { id: "fs", label: "FULL", sub: "STACK", x: 50, y: 92 },
  { id: "sd", label: "SYSTEMS", sub: "DESIGN", x: 88, y: 74 },
];

type Offset = { dx: number; dy: number };

export default function Hero() {
  const vizRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<Record<string, Offset>>({});

  /** Nodes drift away from the cursor — the system "reacts" to you. */
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const rect = vizRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const next: Record<string, Offset> = {};
    for (const node of NODES) {
      const px = (node.x / 100) * rect.width;
      const py = (node.y / 100) * rect.height;
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.max(Math.hypot(dx, dy), 1);
      const force = Math.min(60 / dist, 1) * 14;
      next[node.id] = { dx: (dx / dist) * force, dy: (dy / dist) * force };
    }
    setOffsets(next);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden scroll-mt-0 pt-20 sm:pt-24"
    >
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 px-5 lg:grid-cols-2 lg:items-center">
        {/* Left: type block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-accent">
            PORTFOLIO / V1.0
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-none tracking-tight text-primary sm:text-7xl">
            SENIRU
            <br />
            ALUTHGE
          </h1>
          <div className="my-5 h-px w-full max-w-md bg-gradient-to-r from-line to-transparent" />
          <p className="font-mono text-xs leading-relaxed tracking-[0.2em] text-secondary sm:text-sm">
            UNDERGRADUATE DEVELOPER
            <br />
            <span className="text-primary">BUILDING SOFTWARE + AI SYSTEMS</span>
          </p>
          <p className="mt-6 max-w-md text-lg text-secondary">
            I learn by building real things.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#agreement-platform"
              data-cursor="link"
              className="rounded border border-accent bg-accent px-6 py-3 font-mono text-xs tracking-widest text-white transition-all hover:bg-accent/80"
            >
              EXPLORE MY WORK
            </a>
            <a
              href="https://github.com/senirualuthge"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="rounded border border-line px-6 py-3 font-mono text-xs tracking-widest text-secondary transition-all hover:border-primary hover:text-primary"
            >
              GITHUB ↗
            </a>
          </div>

          <div className="mt-16 flex items-center gap-3 font-mono text-[11px] tracking-widest text-secondary/70">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="inline-block text-accent"
            >
              ↓
            </motion.span>
            SCROLL TO EXPLORE
          </div>
        </motion.div>

        {/* Right: interactive system visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          ref={vizRef}
          onMouseMove={onMove}
          onMouseLeave={() => setOffsets({})}
          data-cursor="link"
          className="relative mx-auto aspect-[4/3] w-full max-w-lg rounded-lg border border-line bg-panel/60"
          aria-label="Interactive system visualization: Seniru System branching into AI Systems, Full Stack and Systems Design"
        >
          <span className="absolute left-3 top-3 font-mono text-[9px] tracking-widest text-secondary/50">
            SYSTEM MAP — move your cursor
          </span>

          {/* connectors */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="50" y1="26" x2="12" y2="74" stroke="#27272a" strokeWidth="0.5" className="flow-line" />
            <line x1="50" y1="26" x2="50" y2="92" stroke="#27272a" strokeWidth="0.5" className="flow-line" />
            <line x1="50" y1="26" x2="88" y2="74" stroke="#27272a" strokeWidth="0.5" className="flow-line" />
          </svg>

          {/* root node */}
          <div className="absolute left-1/2 top-[26%] -translate-x-1/2 -translate-y-1/2">
            <div className="rounded border border-accent/70 bg-ink px-5 py-3 text-center shadow-lg shadow-accent/20">
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary">
                SENIRU
              </p>
              <p className="font-mono text-[9px] tracking-[0.25em] text-accent">
                SYSTEM
              </p>
            </div>
            <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse-node rounded-full bg-success" />
          </div>

          {/* child nodes */}
          {NODES.map((node) => {
            const { dx, dy } = offsets[node.id] ?? { dx: 0, dy: 0 };
            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`,
                }}
              >
                <div className="rounded border border-line bg-ink px-4 py-2 text-center transition-colors hover:border-cyan">
                  <p className="font-mono text-[10px] tracking-widest text-primary">
                    {node.label}
                  </p>
                  <p className="font-mono text-[9px] tracking-widest text-cyan">
                    {node.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
