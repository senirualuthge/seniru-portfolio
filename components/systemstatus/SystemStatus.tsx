"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";

export default function SystemStatus() {
  const [githubStatus, setGithubStatus] = useState<"connected" | "rate-limited" | "checking">("checking");

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/rate_limit", { headers: { Accept: "application/vnd.github+json" } })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) setGithubStatus("connected");
        else setGithubStatus("rate-limited");
      })
      .catch(() => {
        if (!cancelled) setGithubStatus("rate-limited");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section id="system-status" index="03d" eyebrow="SYSTEM STATUS" title="Live Status">
      <p className="-mt-6 mb-10 max-w-2xl text-secondary">
        Honest status indicators for connected services.
      </p>

      <div className="relative overflow-hidden rounded-xl border border-line bg-panel p-6 sm:p-10">
        <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35 }}
            className="flex items-center justify-between rounded-lg border border-line bg-ink/70 p-5"
          >
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-primary">PORTFOLIO</p>
              <p className="mt-1 text-sm text-secondary">Live site</p>
            </div>
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-success">
              <span className="h-1.5 w-1.5 animate-pulse-node rounded-full bg-success" /> ONLINE
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="flex items-center justify-between rounded-lg border border-line bg-ink/70 p-5"
          >
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-primary">GITHUB API</p>
              <p className="mt-1 text-sm text-secondary">Live data</p>
            </div>
            <span
              className={`flex items-center gap-2 font-mono text-[10px] tracking-widest ${
                githubStatus === "connected" ? "text-success" : githubStatus === "rate-limited" ? "text-accent" : "text-secondary"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 animate-pulse-node rounded-full ${
                  githubStatus === "connected" ? "bg-success" : githubStatus === "rate-limited" ? "bg-accent" : "bg-secondary"
                }`}
              />
              {githubStatus === "checking" ? "CHECKING" : githubStatus === "connected" ? "CONNECTED" : "RATE-LIMITED"}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="flex items-center justify-between rounded-lg border border-line bg-ink/70 p-5"
          >
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-primary">AGREEMENT PLATFORM</p>
              <p className="mt-1 text-sm text-secondary">In development</p>
            </div>
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> BUILDING
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="flex items-center justify-between rounded-lg border border-line bg-ink/70 p-5"
          >
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-primary">AARIYA</p>
              <p className="mt-1 text-sm text-secondary">In development</p>
            </div>
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> BUILDING
            </span>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
