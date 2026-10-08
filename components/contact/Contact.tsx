"use client";

import { motion } from "framer-motion";
import { openCommandPalette } from "@/hooks/useCommandPalette";

const LINKS = [
  {
    label: "GITHUB",
    href: "https://github.com/senirualuthge",
    handle: "senirualuthge",
  },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/seniru-aluthge-30bb33188",
    handle: "seniru-aluthge",
  },
  {
    label: "EMAIL",
    href: "mailto:seniru2004@gmail.com",
    handle: "seniru2004@gmail.com",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 overflow-hidden px-5 py-28"
    >
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
      <div
        className="absolute bottom-0 left-1/2 h-72 w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-secondary">
          <span className="text-accent">11</span>
          <span className="h-px w-8 bg-line" />
          <span>CONTACT</span>
        </div>

        <h2 className="mt-5 text-4xl font-semibold tracking-tight text-primary sm:text-6xl">
          LET&apos;S BUILD
          <br />
          SOMETHING.
        </h2>

        <p className="mt-6 max-w-md text-lg text-secondary">
          Interested in software, AI systems or interesting ideas? I&apos;m an
          undergraduate actively looking for internships and junior roles.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-cursor="link"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="group flex items-center justify-between rounded-lg border border-line bg-panel px-5 py-4 transition-all hover:border-accent"
            >
              <div>
                <p className="font-mono text-sm tracking-[0.2em] text-primary group-hover:text-accent">
                  {link.label}
                </p>
                <p className="mt-1 text-xs text-secondary">{link.handle}</p>
              </div>
              <span className="font-mono text-secondary transition-all group-hover:translate-x-1 group-hover:text-accent">
                ↗
              </span>
            </motion.a>
          ))}
        </div>

        <button
          onClick={openCommandPalette}
          data-cursor="link"
          className="mt-6 font-mono text-[11px] tracking-widest text-secondary/70 underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          or press ⌘K to jump anywhere
        </button>

        <div className="mt-20 border-t border-line pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-sm tracking-[0.3em] text-primary">
                SENIRU ALUTHGE
              </p>
              <p className="mt-1.5 font-mono text-[11px] tracking-[0.2em] text-secondary">
                Undergraduate Developer
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-accent">
                Building · Learning · Experimenting
              </p>
            </div>
            <p className="font-mono text-[10px] text-secondary/50">
              Designed & built by Seniru — this portfolio is the project.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
