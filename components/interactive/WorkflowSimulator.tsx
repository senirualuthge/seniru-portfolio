"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { agreementWorkflow } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function WorkflowSimulator() {
  const [step, setStep] = useState(0);
  const current = agreementWorkflow[step];
  const done = step === agreementWorkflow.length - 1;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <ol>
        {agreementWorkflow.map((stage, i) => {
          const status = i < step ? "done" : i === step ? "current" : "pending";
          return (
            <li key={stage.step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] transition-colors",
                    status === "done" && "border-success bg-success/15 text-success",
                    status === "current" &&
                      "border-accent bg-accent/20 text-primary shadow shadow-accent/40",
                    status === "pending" && "border-line text-secondary/50"
                  )}
                >
                  {status === "done" ? "✓" : i + 1}
                </span>
                {i < agreementWorkflow.length - 1 && (
                  <span
                    className={cn(
                      "w-px flex-1",
                      i < step ? "bg-success/50" : "bg-line"
                    )}
                  />
                )}
              </div>
              <div className="pb-5">
                <p
                  className={cn(
                    "font-mono text-xs tracking-[0.2em]",
                    status === "pending" ? "text-secondary/50" : "text-primary"
                  )}
                >
                  {stage.step}
                </p>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    status === "current" ? "text-secondary" : "text-secondary/50"
                  )}
                >
                  {stage.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-col justify-center rounded-lg border border-line bg-ink p-6">
        <p className="font-mono text-[11px] tracking-[0.25em] text-accent">
          SIMULATOR
        </p>
        <div className="mt-5 rounded border border-line bg-panel p-5">
          <p className="font-mono text-[10px] tracking-widest text-secondary">
            CURRENT STAGE
          </p>
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 font-mono text-xl tracking-widest text-primary"
          >
            {current.step}
          </motion.p>
          <p className="mt-3 text-sm text-secondary">{current.detail}</p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded bg-line">
            <motion.div
              className="h-full bg-accent"
              animate={{
                width: `${((step + 1) / agreementWorkflow.length) * 100}%`,
              }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <p className="mt-2 font-mono text-[10px] text-secondary">
            {step + 1} / {agreementWorkflow.length}
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => setStep((s) => Math.min(s + 1, agreementWorkflow.length - 1))}
            disabled={done}
            data-cursor="link"
            className="flex-1 rounded border border-accent bg-accent px-4 py-3 font-mono text-xs tracking-widest text-white transition-colors hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {done ? "AGREEMENT ACTIVE" : "ADVANCE →"}
          </button>
          <button
            onClick={() => setStep(0)}
            data-cursor="link"
            className="rounded border border-line px-4 py-3 font-mono text-xs tracking-widest text-secondary transition-colors hover:border-primary hover:text-primary"
          >
            RESET
          </button>
        </div>
        <p className="mt-4 text-[11px] text-secondary/70">
          {done
            ? "The agreement is live — renewals, deadlines and reminders are now tracked."
            : "Step through the agreement lifecycle the way a real contract moves through it."}
        </p>
      </div>
    </div>
  );
}
