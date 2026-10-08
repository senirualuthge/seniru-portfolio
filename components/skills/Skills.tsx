"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <Section id="skills" index="07" eyebrow="CAPABILITIES" title="Tech Stack">
      <p className="-mt-6 mb-10 max-w-2xl text-secondary">
        No fake percentages. Every technology below is one I actually use in a
        project — hover any chip to see what I use it for.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: gi * 0.08 }}
            className="rounded-lg border border-line bg-panel p-5"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.25em] text-accent">
                {group.category}
              </span>
              <span className="h-px flex-1 bg-line" />
              <span className="font-mono text-[10px] text-secondary/50">
                {group.items.length}
              </span>
            </div>

            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.name} className="group relative">
                  <div
                    tabIndex={0}
                    data-cursor="link"
                    className="flex w-full items-center justify-between rounded px-3 py-2.5 text-left transition-colors hover:bg-accent/10 focus:bg-accent/10 focus:outline-none"
                  >
                    <span className="text-sm text-secondary transition-colors group-hover:text-primary group-focus:text-primary">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] text-line transition-colors group-hover:text-accent group-focus:text-accent">
                      ↗
                    </span>
                  </div>

                  {/* hover card */}
                  <div className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden w-full rounded border border-accent/50 bg-ink p-3 shadow-xl shadow-accent/10 group-hover:block group-focus:block">
                    <p className="font-mono text-[9px] tracking-widest text-accent">
                      USED FOR
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-secondary">
                      {item.usedFor}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
