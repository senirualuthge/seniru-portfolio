"use client";

import { useEffect, useState } from "react";

type Prefs = {
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
};

const STORAGE_KEY = "seniru:accessibility";

export default function AccessibilityPrefs() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ reduceMotion: false, highContrast: false, largeText: false });

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const loaded = JSON.parse(raw) as Partial<Prefs>;
          setPrefs((prev) => ({ ...prev, ...loaded }));
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}

    document.documentElement.classList.toggle("reduce-motion", prefs.reduceMotion);
    document.documentElement.classList.toggle("high-contrast", prefs.highContrast);
    document.documentElement.classList.toggle("large-text", prefs.largeText);
  }, [prefs]);

  return (
    <div className="fixed bottom-4 right-4 z-[80]">
      <button
        onClick={() => setOpen((o) => !o)}
        data-cursor="link"
        className="rounded-full border border-line bg-panel px-4 py-2 font-mono text-[10px] tracking-widest text-secondary transition-colors hover:border-accent hover:text-primary"
      >
        A11Y
      </button>
      {open && (
        <div className="absolute bottom-12 right-0 w-64 rounded-lg border border-line bg-panel p-4 shadow-xl">
          <p className="mb-3 font-mono text-[10px] tracking-widest text-accent">ACCESSIBILITY</p>
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm text-secondary">
              <span>Reduce motion</span>
              <input
                type="checkbox"
                checked={prefs.reduceMotion}
                onChange={(e) => setPrefs((p) => ({ ...p, reduceMotion: e.target.checked }))}
              />
            </label>
            <label className="flex items-center justify-between text-sm text-secondary">
              <span>High contrast</span>
              <input
                type="checkbox"
                checked={prefs.highContrast}
                onChange={(e) => setPrefs((p) => ({ ...p, highContrast: e.target.checked }))}
              />
            </label>
            <label className="flex items-center justify-between text-sm text-secondary">
              <span>Larger text</span>
              <input
                type="checkbox"
                checked={prefs.largeText}
                onChange={(e) => setPrefs((p) => ({ ...p, largeText: e.target.checked }))}
              />
            </label>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded border border-line px-2 py-1.5 font-mono text-[10px] text-secondary transition-colors hover:text-primary"
          >
            CLOSE
          </button>
        </div>
      )}
    </div>
  );
}
