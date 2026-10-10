import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experiments — Seniru Aluthge",
  description: "Interactive experiments and playground demos.",
};

const experiments = [
  {
    id: "01",
    title: "AI State Simulator",
    description: "Interactive model of Aariya's internal state and resulting behavior.",
  },
  {
    id: "02",
    title: "Voice Visualizer",
    description: "Canvas-based voice waveform showing pipeline stages in action.",
  },
  {
    id: "03",
    title: "Agreement Workflow Simulator",
    description: "Step through the agreement lifecycle interactively.",
  },
  {
    id: "04",
    title: "Architecture Explorer",
    description: "Interactive system architecture with clickable components and details.",
  },
  {
    id: "05",
    title: "Interactive Tech Stack",
    description: "Technology cards with contextual usage details.",
  },
];

export default function ExperimentsPage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:pt-32">
      <header className="mb-10">
        <p className="font-mono text-[11px] tracking-[0.25em] text-accent">PLAYGROUND</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Experiments</h1>
        <p className="mt-3 max-w-2xl text-secondary">
          Small interactive explorations. See them in action in the <Link href="/#lab" className="text-accent underline-offset-4 hover:underline">System Lab</Link>.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((exp) => (
          <div key={exp.id} className="rounded-xl border border-line bg-panel p-6">
            <span className="font-mono text-xs text-secondary/60">{exp.id}</span>
            <h3 className="mt-2 font-mono text-sm tracking-[0.15em] text-primary">{exp.title.toUpperCase()}</h3>
            <p className="mt-2 text-sm text-secondary">{exp.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
