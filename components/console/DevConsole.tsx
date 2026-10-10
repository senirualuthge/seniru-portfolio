"use client";

import { useEffect, useState } from "react";

const COMMANDS: Record<string, (args: string[]) => string> = {
  help: () => "Commands: help, about, projects, skills, github, contact, clear, whoami",
  about: () => "Seniru Aluthge — Undergraduate Developer. Building Software + AI Systems.",
  projects: () => "01 Agreement Platform\n02 Aariya\n03 Portfolio",
  skills: () => "Full-Stack, AI Systems, System Design, TypeScript, Next.js, Python, FastAPI",
  github: () => "https://github.com/senirualuthge",
  contact: () => "mailto:seniru2004@gmail.com",
  whoami: () => "seniru@portfolio",
  clear: () => "__CLEAR__",
};

export default function DevConsole() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(["seniru@portfolio:~$ "]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setHistory((h) => [...h, "seniru@portfolio:~$ "]);
      setInput("");
      return;
    }
    const [cmd, ...args] = trimmed.split(/\s+/);
    const handler = COMMANDS[cmd.toLowerCase()];
    const output = handler ? handler(args) : `command not found: ${cmd}`;
    if (output === "__CLEAR__") {
      setHistory(["seniru@portfolio:~$ "]);
      setInput("");
      return;
    }
    setHistory((h) => [...h, `seniru@portfolio:~$ ${trimmed}`, output]);
    setInput("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center px-4 pb-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-line bg-ink/95 shadow-2xl">
        <div className="flex items-center justify-between border-b border-line bg-panel px-4 py-2 font-mono text-[10px] text-secondary">
          <span>seniru@portfolio:~ — terminal</span>
          <button onClick={() => setOpen(false)} className="hover:text-primary" data-cursor="link">
            ESC
          </button>
        </div>
        <div className="h-64 overflow-y-auto bg-ink p-4 font-mono text-xs text-primary">
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span>seniru@portfolio:~$</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent outline-none"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
