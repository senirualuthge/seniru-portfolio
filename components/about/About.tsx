"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const ASPECTS = [
  {
    id: "ai",
    label: "AI SYSTEMS",
    items: [
      "Conversation systems",
      "Real-time interaction",
      "Voice systems",
      "Agent architecture",
      "Context & memory",
    ],
  },
  {
    id: "fullstack",
    label: "FULL STACK",
    items: [
      "Frontend",
      "Backend",
      "Databases",
      "APIs",
      "Authentication",
      "System architecture",
    ],
  },
  {
    id: "systems",
    label: "SYSTEM DESIGN",
    items: [
      "Data modeling",
      "Streaming architectures",
      "Real-time protocols",
      "Workflow design",
      "Security & access control",
    ],
  },
];

const CURRENTLY = [
  { icon: "🎓", text: "Undergraduate at ICET" },
  { icon: "🧠", text: "Learning AI systems" },
  { icon: "💻", text: "Building a SaaS platform" },
  { icon: "🚀", text: "Building real projects" },
];

export default function About() {
  const [active, setActive] = useState<string>("ai");
  const current = ASPECTS.find((a) => a.id === active);

  return (
    <Section id="about" index="02" eyebrow="WHO I AM" title="About Me">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <p className="max-w-xl text-xl leading-relaxed text-secondary sm:text-2xl">
            I&apos;m an undergraduate developer interested in{" "}
            <span className="text-primary">Full-Stack Development</span> and{" "}
            <span className="text-primary">AI Systems</span>.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-secondary/80">
            Software Development student at ICET, Sri Lanka. Currently building a
            contract lifecycle SaaS platform and a multi-platform AI companion
            with real-time voice interaction.
          </p>

          <div className="mt-8 rounded-lg border border-line bg-panel p-5">
            <p className="mb-4 font-mono text-[11px] tracking-[0.25em] text-accent">
              CURRENTLY
            </p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {CURRENTLY.map((c) => (
                <li
                  key={c.text}
                  className="flex items-center gap-3 text-sm text-secondary"
                >
                  <span aria-hidden>{c.icon}</span>
                  {c.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive aspect explorer */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {ASPECTS.map((a) => (
              <button
                key={a.id}
                onClick={() => setActive(a.id)}
                data-cursor="link"
                className={cn(
                  "rounded border px-3 py-2 font-mono text-[11px] tracking-widest transition-all",
                  active === a.id
                    ? "border-accent bg-accent/15 text-primary"
                    : "border-line text-secondary hover:border-secondary hover:text-primary"
                )}
              >
                {a.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, height: 8 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 8 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden rounded-lg border border-line bg-panel"
            >
              <div className="border-b border-line px-4 py-3 font-mono text-xs tracking-[0.2em] text-primary">
                {current?.label}
              </div>
              <ul className="p-4">
                {current?.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 border-b border-line/50 py-2.5 text-sm text-secondary last:border-0"
                  >
                    <span className="font-mono text-[10px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
