"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    id: "ai",
    title: "AI SYSTEMS",
    body: "Intelligent software systems",
    accent: "text-accent",
    border: "hover:border-accent",
  },
  {
    id: "fs",
    title: "FULL STACK",
    body: "Web applications & SaaS platforms",
    accent: "text-cyan",
    border: "hover:border-cyan",
  },
  {
    id: "exp",
    title: "EXPERIMENTS",
    body: "Ideas → prototypes → systems",
    accent: "text-success",
    border: "hover:border-success",
  },
];

function TiltCard({
  card,
  index,
}: {
  card: (typeof CARDS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 10, y: px * 10 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        data-cursor="link"
        className={cn(
          "group flex h-64 flex-col justify-between rounded-lg border border-line bg-panel p-6 transition-all duration-300",
          card.border
        )}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] text-secondary/60">
            0{index + 1}
          </span>
          <span
            className={cn(
              "h-2 w-2 rounded-full opacity-60 transition-opacity group-hover:opacity-100",
              card.accent,
              "bg-current"
            )}
          />
        </div>
        <div>
          <h3
            className={cn(
              "font-mono text-lg tracking-[0.2em] transition-colors sm:text-xl",
              card.accent
            )}
          >
            {card.title}
          </h3>
          <p className="mt-2 text-sm text-secondary">{card.body}</p>
        </div>
        <span className="font-mono text-xl text-secondary transition-all group-hover:translate-x-2 group-hover:text-primary">
          →
        </span>
      </div>
    </motion.div>
  );
}

export default function WhatIBuild() {
  return (
    <Section id="build" index="03" eyebrow="DIRECTION" title="What I Build">
      <div className="grid gap-5 sm:grid-cols-3">
        {CARDS.map((card, i) => (
          <TiltCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </Section>
  );
}
