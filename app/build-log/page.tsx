import type { Metadata } from "next";
import { buildLog } from "@/data/build-log";

export const metadata: Metadata = {
  title: "Build Log — Seniru Aluthge",
  description: "Running build log of what Seniru is building and learning.",
};

export default function BuildLogPage() {
  return (
    <main className="relative mx-auto w-full max-w-4xl px-5 pb-24 pt-28 sm:pt-32">
      <header className="mb-10">
        <p className="font-mono text-[11px] tracking-[0.25em] text-accent">BUILD IN PUBLIC</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Build Log</h1>
        <p className="mt-3 max-w-2xl text-secondary">
          A running log of changes, experiments and improvements as I build.
        </p>
      </header>

      <div className="space-y-4">
        {buildLog.map((entry, i) => (
          <div
            key={`${entry.date}-${i}`}
            className="flex flex-col gap-3 rounded-xl border border-line bg-panel p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-widest text-secondary/60">{entry.date}</span>
              <div>
                <p className="font-mono text-sm tracking-[0.15em] text-primary">{entry.project}</p>
                <p className="mt-1 text-sm text-secondary">{entry.change}</p>
              </div>
            </div>
            <span
              className={`rounded border px-3 py-1 font-mono text-[10px] tracking-widest ${
                entry.type === "feature"
                  ? "border-accent/50 text-accent"
                  : entry.type === "improvement"
                    ? "border-cyan/50 text-cyan"
                    : "border-success/50 text-success"
              }`}
            >
              {entry.type.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
