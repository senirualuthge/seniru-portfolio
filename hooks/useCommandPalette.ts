"use client";

import { useEffect, useState } from "react";

export const COMMAND_EVENT = "seniru:command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(COMMAND_EVENT));
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_EVENT, onOpen);
    };
  }, []);

  return { open, setOpen };
}
