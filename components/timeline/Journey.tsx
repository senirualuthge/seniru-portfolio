"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { journey } from "@/data/timeline";

export default function Journey() {
  return (
    <Section id="journey" index="08" eyebrow="TIMELINE" title="My Building Journey">
      <p className="-mt-6 mb-10 max-w-2xl text-secondary">
        No inflated job titles — just the honest sequence of what I&apos;ve been
        building and learning. Scroll horizontally →
      </p>

      <div className="no-scrollbar -mx-5 overflow-x-auto scroll-smooth px-5 pb-4">
        <div className="flex min-w-max gap-5 sm:gap-6">
          {journey.map((entry, i) => (
            <motion.article
              key={entry.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative w-72 snap-start"
            >
              {/* spine */}
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-3 w-3 items-center justify-center">
                  <span className="h-3 w-3 rotate-45 border border-accent bg-ink" />
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-accent to-line" />
              </div>

              <p className="font-mono text-4xl font-bold text-line">{entry.year}</p>
              <h3 className="mt-2 text-lg font-medium text-primary">
                {entry.title}
              </h3>

              <ul className="mt-4 space-y-2 rounded-lg border border-line bg-panel p-4">
                {entry.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm text-secondary"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}

          {/* now marker */}
          <div className="relative w-48">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-line" />
              <span className="h-2 w-2 animate-pulse-node rounded-full bg-success" />
            </div>
            <p className="font-mono text-xl font-bold text-success">NOW</p>
            <p className="mt-2 text-sm text-secondary">
              Still building. Still learning.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
