"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULTS = [
  { id: "energy", label: "Energy", value: 72, color: "text-accent" },
  { id: "warmth", label: "Warmth", value: 88, color: "text-cyan" },
  { id: "confidence", label: "Confidence", value: 81, color: "text-success" },
  { id: "playfulness", label: "Playfulness", value: 42, color: "text-accent" },
  { id: "concern", label: "Concern", value: 18, color: "text-secondary" },
];

function moodReadout(state: Record<string, number>) {
  if (state.concern > 60) return "⚠  Concerned — careful responses";
  if (state.playfulness > 70) return "✦  Playful — energetic tone";
  if (state.warmth > 70 && state.energy > 60) return "◆  Warm & engaged";
  if (state.confidence > 75) return "◆  Confident & direct";
  if (state.energy < 30) return "◇  Calm — low energy";
  return "◆  Balanced";
}

function Bar({ value, color }: { value: number; color: string }) {
  const filled = Math.round(value / 10);
  return (
    <span className={cn("font-mono tracking-tight", color)}>
      {"█".repeat(filled)}
      <span className="text-line">{"░".repeat(10 - filled)}</span>
    </span>
  );
}

export default function SystemSimulator() {
  const [state, setState] = useState(() =>
    Object.fromEntries(DEFAULTS.map((d) => [d.id, d.value]))
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <p className="mb-5 font-mono text-[11px] tracking-[0.25em] text-accent">
          AARIYA INTERNAL STATE
        </p>
        <div className="space-y-4">
          {DEFAULTS.map((item) => (
            <div key={item.id}>
              <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                <span className="text-secondary">{item.label}</span>
                <span className="text-primary">{state[item.id]}%</span>
              </div>
              <div className="mb-2 text-sm leading-none">
                <Bar value={state[item.id]} color={item.color} />
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={state[item.id]}
                aria-label={`${item.label} level`}
                onChange={(e) =>
                  setState((s) => ({ ...s, [item.id]: Number(e.target.value) }))
                }
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-lg border border-line bg-ink p-6">
        <p className="font-mono text-[11px] tracking-[0.25em] text-secondary">
          RESULTING BEHAVIOR
        </p>
        <p className="mt-4 font-mono text-lg text-primary">
          {moodReadout(state)}
        </p>
        <div className="mt-6 space-y-2 text-sm text-secondary">
          <p>
            <span className="font-mono text-accent">greeting→</span>{" "}
            {state.warmth > 60
              ? "\"Hey! Good to hear from you.\""
              : "\"Hello. How can I help?\""}
          </p>
          <p>
            <span className="font-mono text-cyan">pacing→</span>{" "}
            {state.energy > 60 ? "fast, upbeat" : "slow, measured"}
          </p>
          <p>
            <span className="font-mono text-success">tone→</span>{" "}
            {state.playfulness > 60
              ? "playful, a little teasing"
              : state.confidence > 75
                ? "direct and assured"
                : "neutral and friendly"}
          </p>
        </div>
        <p className="mt-6 border-t border-line pt-4 text-[11px] leading-relaxed text-secondary/70">
          This is the shape of the state object Aariya&apos;s voice director
          reads before planning every response.
        </p>
      </div>
    </div>
  );
}
