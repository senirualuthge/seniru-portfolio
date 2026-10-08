"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import SystemSimulator from "@/components/interactive/SystemSimulator";
import VoiceVisualizer from "@/components/interactive/VoiceVisualizer";
import WorkflowSimulator from "@/components/interactive/WorkflowSimulator";
import { cn } from "@/lib/utils";

const DEMOS = [
  { id: "state", label: "AI STATE SIMULATOR", note: "Interactive" },
  { id: "voice", label: "VOICE VISUALIZER", note: "Canvas" },
  { id: "workflow", label: "AGREEMENT WORKFLOW", note: "Interactive" },
] as const;

export default function SystemLab() {
  const [demo, setDemo] = useState<(typeof DEMOS)[number]["id"]>("state");

  return (
    <Section
      id="lab"
      index="06"
      eyebrow="TECHNICAL PLAYGROUND"
      title="System Lab"
      className="relative"
    >
      <p className="-mt-6 mb-10 max-w-2xl text-secondary">
        Don&apos;t take my word for it — operate the systems yourself. Every demo
        below is a real model of how the underlying software behaves.
      </p>

      <div className="overflow-hidden rounded-xl border border-line bg-panel">
        <div className="flex flex-wrap gap-1 border-b border-line p-2">
          {DEMOS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDemo(d.id)}
              data-cursor="link"
              className={cn(
                "flex items-center gap-2 rounded px-3 py-2 font-mono text-[11px] tracking-widest transition-colors",
                demo === d.id
                  ? "bg-accent/15 text-primary"
                  : "text-secondary hover:text-primary"
              )}
            >
              {d.label}
              <span className="text-[9px] text-secondary/50">{d.note}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[420px] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={demo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              {demo === "state" && <SystemSimulator />}
              {demo === "voice" && <VoiceVisualizer />}
              {demo === "workflow" && <WorkflowSimulator />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
