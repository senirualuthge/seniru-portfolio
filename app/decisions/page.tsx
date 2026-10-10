import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Decisions — Seniru Aluthge",
  description: "Technical decisions across projects.",
};

export default function DecisionsPage() {
  const all = Object.values(caseStudies).flatMap((s) =>
    s.sections
      .filter((sec) => sec.kind === "decisions")
      .flatMap((sec) =>
        (sec as Extract<typeof sec, { kind: "decisions" }>).decisions.map((d) => ({ ...d, project: s.title }))
      )
  );

  return (
    <main className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-28 sm:pt-32">
      <header className="mb-10">
        <p className="font-mono text-[11px] tracking-[0.25em] text-accent">DECISIONS</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Technical Decisions</h1>
        <p className="mt-3 max-w-2xl text-secondary">Cross-project decision log with context, reasoning, and trade-offs.</p>
      </header>

      <div className="space-y-4">
        {all.map((d) => (
          <details key={`${d.project}-${d.id}`} className="group rounded-xl border border-line bg-panel open:border-accent/50">
            <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 p-5 [&::-webkit-details-marker]:hidden">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-accent">DECISION #{d.id}</span>
                <span className="font-mono text-sm text-primary">{d.question}</span>
                <span className="font-mono text-[10px] text-secondary/60">[{d.project}]</span>
              </div>
              <span className="font-mono text-xs text-secondary transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-line p-5 text-sm">
              <p className="text-secondary">
                <span className="font-mono text-[10px] tracking-widest text-secondary/70">CONTEXT</span>
                <br />
                {d.context}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {d.options.map((o) => (
                  <div key={o.name} className={`rounded border p-3 ${o.name === d.chosen ? "border-success/50 bg-success/5" : "border-line"}`}>
                    <p className="font-mono text-[11px] text-primary">
                      {o.name}
                      {o.name === d.chosen && <span className="ml-2 text-success">✓</span>}
                    </p>
                    <p className="mt-1 text-xs text-secondary">{o.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <p className="text-secondary">
                  <span className="font-mono text-[10px] tracking-widest text-secondary/70">REASONING</span>
                  <br />
                  {d.reasoning}
                </p>
                <p className="text-secondary">
                  <span className="font-mono text-[10px] tracking-widest text-secondary/70">TRADE-OFFS</span>
                  <br />
                  {d.tradeoffs}
                </p>
              </div>
              <p className="mt-4 font-mono text-[10px] tracking-widest text-secondary/70">STATUS — {d.status.toUpperCase()}</p>
            </div>
          </details>
        ))}
      </div>
    </main>
  );
}
