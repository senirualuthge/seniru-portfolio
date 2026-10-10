"use client";

import { useEffect, useState } from "react";

const KEY = "seniru:visited";

export default function Welcome() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const visited = localStorage.getItem(KEY);
        if (!visited) {
          setShow(true);
        }
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show) {
      try {
        localStorage.setItem(KEY, "true");
      } catch {}
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShow(false)} />
      <div className="relative max-w-md rounded-xl border border-line bg-panel p-6 text-center shadow-xl">
        <p className="font-mono text-[10px] tracking-widest text-accent">WELCOME</p>
        <h2 className="mt-3 font-mono text-lg tracking-[0.15em] text-primary">SENIRU.OS</h2>
        <p className="mt-3 text-sm text-secondary">This is how I think, what I&apos;m building, and how my systems work. Feel free to explore.</p>
        <button
          onClick={() => setShow(false)}
          data-cursor="link"
          className="mt-5 rounded border border-accent bg-accent px-5 py-2 font-mono text-xs tracking-widest text-white transition-colors hover:bg-accent/80"
        >
          EXPLORE
        </button>
      </div>
    </div>
  );
}
