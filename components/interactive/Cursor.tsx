"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "view";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    document.documentElement.classList.add("custom-cursor");

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (target) {
        setMode((target.dataset.cursor as CursorMode) || "link");
      } else {
        const interactive = (e.target as HTMLElement | null)?.closest?.(
          "a, button, input, label, [role='button']"
        );
        setMode(interactive ? "link" : "default");
      }
    };
    const onLeave = () => setVisible(false);

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  const label = mode === "view" ? "VIEW" : "";
  const ringSize = mode === "default" ? 26 : label ? 64 : 44;

  return (
    <div
      aria-hidden
      className="cursor-layer pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
    >
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,border-color,background-color] duration-200"
        style={{
          width: ringSize,
          height: ringSize,
          borderColor: mode === "default" ? "#a1a1aa" : "#7c3aed",
          backgroundColor: label ? "#7c3aed" : "transparent",
        }}
      >
        {label ? (
          <span className="font-mono text-[10px] font-bold tracking-widest text-white">
            {label}
          </span>
        ) : null}
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary"
        style={{ opacity: mode === "view" ? 0 : 1 }}
      />
    </div>
  );
}
