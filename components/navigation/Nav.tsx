"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS: { id: string; label: string; href?: string }[] = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "build", label: "WHAT I BUILD" },
  { id: "agreement-platform", label: "AGREEMENT PLATFORM" },
  { id: "aariya", label: "AARIYA" },
  { id: "lab", label: "SYSTEM LAB" },
  { id: "skills", label: "SKILLS" },
  { id: "journey", label: "JOURNEY" },
  { id: "build-log", label: "BUILD LOG" },
  { id: "how-i-think", label: "HOW I THINK" },
  { id: "problems-solutions", label: "PROBLEMS → SOLUTIONS" },
  { id: "failures-lessons", label: "FAILURES → LESSONS" },
  { id: "decisions", label: "DECISIONS", href: "/decisions" },
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

  const isHome = pathname === "/";

  const handleClick = (link: { id: string; href?: string }) => {
    if (link.href) {
      router.push(link.href);
    } else if (!isHome) {
      router.push(`/#${link.id}`);
    } else {
      const el = document.getElementById(link.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "bg-ink/80 backdrop-blur-sm border-b border-line" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="font-mono text-sm tracking-[0.3em] text-primary" data-cursor="link">
            SENIRU
          </Link>
          <button
            aria-label="Toggle menu"
            className="font-mono text-[10px] tracking-[0.2em] text-secondary hover:text-primary transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            data-cursor="link"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink/95 transition-transform duration-500 ease-out",
          menuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  className="group flex w-full items-baseline justify-between border-b border-line pb-1 text-left"
                  onClick={() => handleClick(link)}
                  data-cursor="link"
                >
                  <span className="font-mono text-xs tracking-[0.25em] text-secondary transition-colors group-hover:text-primary">
                    {link.label}
                  </span>
                  <span className="font-mono text-[10px] text-secondary/50 group-hover:text-accent">#{link.id}</span>
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
