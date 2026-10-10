"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { openCommandPalette } from "@/hooks/useCommandPalette";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "build", label: "WHAT I BUILD" },
  { id: "how-i-think", label: "HOW I THINK" },
  { id: "agreement-platform", label: "AGREEMENT PLATFORM" },
  { id: "aariya", label: "AARIYA" },
  { id: "lab", label: "SYSTEM LAB" },
  { id: "skills", label: "SKILLS" },
  { id: "journey", label: "JOURNEY" },
  { id: "github", label: "GITHUB" },
  { id: "building", label: "CURRENTLY BUILDING" },
  { id: "build-log", label: "BUILD LOG" },
  { id: "system-status", label: "SYSTEM STATUS" },
  { id: "contact", label: "CONTACT" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    if (pathname !== "/") {
      // On a subpage, navigate home first, then scroll to the section
      router.push(`/#${id}`);
      return;
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "border-b border-line bg-ink/85 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button
            onClick={() => go("home")}
            className="font-mono text-sm font-bold tracking-[0.3em] text-primary transition-colors hover:text-accent"
            data-cursor="link"
          >
            SENIRU
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={openCommandPalette}
              data-cursor="link"
              className="hidden items-center gap-2 rounded border border-line px-3 py-1.5 font-mono text-[11px] text-secondary transition-colors hover:border-accent hover:text-primary sm:flex"
            >
              Search <kbd className="text-accent">⌘K</kbd>
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              data-cursor="link"
              aria-expanded={menuOpen}
              className="flex items-center gap-2 rounded border border-line px-3 py-1.5 font-mono text-[11px] tracking-widest text-primary transition-colors hover:border-accent"
            >
              {menuOpen ? "CLOSE" : "MENU"}
              <span className="flex flex-col gap-[3px]">
                <span className="block h-px w-3 bg-current" />
                <span className="block h-px w-3 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink/95 backdrop-blur-md transition-all duration-300",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="mx-auto flex h-full max-w-6xl flex-col justify-center px-5 pt-16">
          <ul className="grid gap-1 sm:grid-cols-2">
            {LINKS.map((link, i) => (
              <li
                key={link.id}
                style={{
                  transitionDelay: menuOpen ? `${i * 30}ms` : "0ms",
                }}
                className={cn(
                  "transition-all duration-300",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
              >
                <button
                  onClick={() => go(link.id)}
                  data-cursor="link"
                  className="group flex w-full items-center gap-4 border-b border-line/60 py-3 text-left transition-colors hover:border-accent"
                >
                  <span className="font-mono text-[10px] text-secondary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-medium tracking-tight text-secondary transition-colors group-hover:text-primary sm:text-2xl">
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[11px] text-secondary/60">
            Press <span className="text-accent">⌘K</span> for the command palette
          </p>
        </nav>
      </div>
    </>
  );
}
