"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      if (form.name && form.email && form.message) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    }, 800);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mt-10 grid gap-4 rounded-xl border border-line bg-panel/60 p-6 sm:max-w-lg"
    >
      <div>
        <label className="mb-1.5 block font-mono text-[10px] tracking-widest text-secondary">NAME</label>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded border border-line bg-ink px-3 py-2 font-mono text-sm text-primary outline-none placeholder:text-secondary/40 focus:border-accent"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="mb-1.5 block font-mono text-[10px] tracking-widest text-secondary">EMAIL</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full rounded border border-line bg-ink px-3 py-2 font-mono text-sm text-primary outline-none placeholder:text-secondary/40 focus:border-accent"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block font-mono text-[10px] tracking-widest text-secondary">MESSAGE</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          rows={4}
          className="w-full rounded border border-line bg-ink px-3 py-2 font-mono text-sm text-primary outline-none placeholder:text-secondary/40 focus:border-accent"
          placeholder="Tell me about your idea..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        data-cursor="link"
        className="rounded border border-accent bg-accent px-6 py-3 font-mono text-xs tracking-widest text-white transition-all hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "sending" ? "SENDING..." : status === "success" ? "MESSAGE RECEIVED ✓" : "SEND MESSAGE"}
      </button>
      {status === "error" && (
        <p className="font-mono text-[10px] text-accent">Please fill in all fields.</p>
      )}
      {status === "success" && (
        <p className="font-mono text-[10px] text-success">Thanks for reaching out.</p>
      )}
    </motion.form>
  );
}
