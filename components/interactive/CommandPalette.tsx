"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function PaletteBody({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  const commands: Command[] = useMemo(() => {
    /** Scroll on the homepage; navigate home first when on a subpage. */
    const goToSection = (id: string) => {
      if (pathname !== "/") {
        router.push(`/#${id}`);
      } else {
        scrollTo(id);
      }
    };

    return [
      { id: "home", label: "Home", hint: "Top of page", run: () => goToSection("home") },
      { id: "about", label: "About", hint: "Who I am", run: () => goToSection("about") },
      { id: "build", label: "What I Build", hint: "Direction", run: () => goToSection("build") },
      {
        id: "agreement",
        label: "Agreement Platform",
        hint: "Featured project 01",
        run: () => goToSection("agreement-platform"),
      },
      { id: "aariya", label: "Aariya", hint: "Featured project 02", run: () => goToSection("aariya") },
      { id: "lab", label: "System Lab", hint: "Interactive demos", run: () => goToSection("lab") },
      { id: "skills", label: "Tech Stack", hint: "Skills", run: () => goToSection("skills") },
      { id: "journey", label: "Journey", hint: "Building timeline", run: () => goToSection("journey") },
      { id: "github", label: "GitHub", hint: "Live activity", run: () => goToSection("github") },
      { id: "building", label: "Currently Building", hint: "Status", run: () => goToSection("building") },
      { id: "contact", label: "Contact", hint: "Let's build something", run: () => goToSection("contact") },
      {
        id: "case-agreement",
        label: "Case Study: Agreement Platform",
        hint: "Lifecycle · architecture · decisions",
        run: () => router.push("/projects/agreement-platform"),
      },
      {
        id: "case-aariya",
        label: "Case Study: Aariya",
        hint: "AI core · voice · real-time",
        run: () => router.push("/projects/aariya"),
      },
      {
        id: "ghlink",
        label: "Open GitHub profile",
        hint: "github.com/senirualuthge",
        run: () => window.open("https://github.com/senirualuthge", "_blank"),
      },
    ];
  }, [pathname, router]);

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.hint.toLowerCase().includes(query.toLowerCase())
  );

  const execute = (cmd: Command) => {
    onClose();
    cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      execute(filtered[active]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-lg border border-line bg-panel shadow-2xl shadow-accent/10">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="font-mono text-xs text-accent">❯</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search portfolio..."
            className="w-full bg-transparent font-mono text-sm text-primary outline-none placeholder:text-secondary/60"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-secondary">
            ESC
          </kbd>
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-center font-mono text-xs text-secondary">
              No matches.
            </p>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => execute(cmd)}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors",
                  i === active ? "bg-accent/15 text-primary" : "text-secondary"
                )}
              >
                <span className="flex items-center gap-2 font-mono text-sm">
                  <span className={i === active ? "text-accent" : "text-line"}>→</span>
                  {cmd.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-secondary/60">
                  {cmd.hint}
                </span>
              </button>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-secondary/70">
          <span>↑↓ navigate · ↵ select</span>
          <span>⌘K to toggle</span>
        </div>
      </div>
    </div>
  );
}

export default function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  if (!open) return null;
  return <PaletteBody onClose={() => setOpen(false)} />;
}
