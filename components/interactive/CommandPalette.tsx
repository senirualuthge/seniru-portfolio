"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Command = {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
      // Vim-style G H / G P etc - only on home or global? simple
      if (e.key === "g") {
        const next = (ev: KeyboardEvent) => {
          if (ev.key.toLowerCase() === "h") {
            if (pathname === "/") document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
            else router.push("/#home");
          } else if (ev.key.toLowerCase() === "p") {
            router.push("/#problems-solutions");
          } else if (ev.key.toLowerCase() === "l") {
            router.push("/#failures-lessons");
          } else if (ev.key.toLowerCase() === "c") {
            router.push("/#contact");
          }
        };
        window.addEventListener("keydown", next, { once: true });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pathname, router]);

  const commands = useMemo<Command[]>(() => {
    const isHome = pathname === "/";
    const goTo = (id: string) => {
      if (!isHome) {
        router.push(`/#${id}`);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setOpen(false);
      setQuery("");
    };

    return [
      { id: "home", label: "Go to Home", hint: "Top of page", run: () => goTo("home") },
      { id: "about", label: "Go to About", hint: "Introduction", run: () => goTo("about") },
      { id: "build", label: "Go to What I Build", hint: "Overview", run: () => goTo("build") },
      { id: "how-i-think", label: "Go to How I Think", hint: "Engineering thinking", run: () => goTo("how-i-think") },
      { id: "problems-solutions", label: "Go to Problems → Solutions", hint: "Approach", run: () => goTo("problems-solutions") },
      { id: "failures-lessons", label: "Go to Failures → Lessons", hint: "Learnings", run: () => goTo("failures-lessons") },
      { id: "agreement-platform", label: "Go to Agreement Platform", hint: "Project", run: () => goTo("agreement-platform") },
      { id: "aariya", label: "Go to Aariya", hint: "AI companion", run: () => goTo("aariya") },
      { id: "lab", label: "Go to System Lab", hint: "Playground", run: () => goTo("lab") },
      { id: "skills", label: "Go to Skills", hint: "Technologies", run: () => goTo("skills") },
      { id: "journey", label: "Go to Journey", hint: "Timeline", run: () => goTo("journey") },
      { id: "github", label: "Go to GitHub", hint: "Repositories", run: () => goTo("github") },
      { id: "building", label: "Go to Currently Building", hint: "In progress", run: () => goTo("building") },
      { id: "build-log", label: "Go to Build Log", hint: "Changelog", run: () => goTo("build-log") },
      { id: "system-status", label: "Go to System Status", hint: "Live status", run: () => goTo("system-status") },
      { id: "contact", label: "Go to Contact", hint: "Get in touch", run: () => goTo("contact") },
      { id: "resume", label: "Resume", hint: "View resume", run: () => router.push("/resume") },
      { id: "buildlog", label: "Build Log", hint: "Build in public", run: () => router.push("/build-log") },
      { id: "experiments", label: "Experiments", hint: "Playground", run: () => router.push("/experiments") },
      { id: "decisions", label: "Decisions", hint: "Technical decisions", run: () => router.push("/decisions") },
      {
        id: "ghlink",
        label: "Open GitHub profile",
        hint: "github.com/senirualuthge",
        run: () => window.open("https://github.com/senirualuthge", "_blank"),
      },
    ];
  }, [pathname, router]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return commands.slice(0, 20);
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [commands, query]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setQuery(""), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm">
          <div className="mx-auto mt-24 max-w-xl px-4">
            <div className="rounded-lg border border-line bg-panel shadow-xl">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                className="w-full bg-transparent px-4 py-3 font-mono text-sm text-primary placeholder:text-secondary focus:outline-none"
              />
              <div className="max-h-80 overflow-y-auto border-t border-line">
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={c.run}
                    className="flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-accent/10"
                  >
                    <div>
                      <div className="font-mono text-sm text-primary">{c.label}</div>
                      {c.hint && <div className="font-mono text-[10px] text-secondary">{c.hint}</div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
