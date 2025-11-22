"use client";

import { useState, useEffect } from "react";
import CommandMenu from "./CommandMenu";

/**
 * CommandMenuProvider
 * Provides global keyboard shortcut for command menu (Cmd+K / Ctrl+K)
 */
export default function CommandMenuProvider() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return <CommandMenu open={open} onOpenChange={setOpen} />;
}
