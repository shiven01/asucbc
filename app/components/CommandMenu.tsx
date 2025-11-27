"use client";

import { useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getGroupedCommandMenuItems, type NavigationItem } from "@/lib/navigation-config";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();
  const groupedItems = getGroupedCommandMenuItems();

  // Close on escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  // Handle navigation
  const handleSelect = useCallback(
    (item: NavigationItem) => {
      onOpenChange(false);
      
      // Track analytics
      if (item.umamiEvent && typeof window !== "undefined" && (window as any).umami) {
        (window as any).umami.track(item.umamiEvent, {
          source: "command-menu",
        });
      }

      // Navigate
      if (item.isExternal) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [onOpenChange, router]
  );

  const CommandItem = ({ item }: { item: NavigationItem }) => (
    <Command.Item
      value={`${item.label} ${item.description} ${item.keywords?.join(" ")}`}
      onSelect={() => handleSelect(item)}
      className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 data-[selected=true]:bg-[var(--theme-text-accent)]/10 data-[selected=true]:text-[var(--theme-text-accent)] hover:bg-[var(--theme-text-accent)]/5"
    >
      <span className="text-xl" aria-hidden="true">
        {item.icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{item.label}</span>
          {item.isExternal && (
            <svg
              className="w-3 h-3 opacity-50 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </div>
        {item.description && (
          <div className="text-sm opacity-60 truncate">{item.description}</div>
        )}
      </div>
    </Command.Item>
  );

  const CategoryGroup = ({ 
    title, 
    items 
  }: { 
    title: string; 
    items: NavigationItem[] 
  }) => {
    if (items.length === 0) return null;
    
    return (
      <Command.Group 
        heading={title}
        className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-[var(--theme-text-primary)] [&_[cmdk-group-heading]]:opacity-50 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide"
      >
        {items.map((item) => (
          <CommandItem key={item.href} item={item} />
        ))}
      </Command.Group>
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={() => onOpenChange(false)}
          />

          {/* Command Menu */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-2xl"
            >
              <Command
                className="rounded-xl border-2 border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] shadow-2xl overflow-hidden"
                shouldFilter={true}
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--theme-card-border)]">
                  <svg
                    className="w-5 h-5 text-[var(--theme-text-primary)] opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <Command.Input
                    placeholder="Search pages..."
                    className="flex-1 bg-transparent border-none outline-none text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-primary)] placeholder:opacity-50 text-base"
                    autoFocus
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-[var(--theme-text-primary)] opacity-50 bg-[var(--theme-text-accent)]/10 rounded border border-[var(--theme-card-border)]">
                    ESC
                  </kbd>
                </div>

                {/* Command List */}
                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                  <Command.Empty className="px-4 py-8 text-center text-[var(--theme-text-primary)] opacity-50">
                    No results found.
                  </Command.Empty>

                  <CategoryGroup title="Pages" items={groupedItems.main} />
                  <CategoryGroup title="Developer Tools" items={groupedItems.hidden} />
                  <CategoryGroup title="External Links" items={groupedItems.external} />
                </Command.List>

                {/* Footer with keyboard hints */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--theme-card-border)] bg-[var(--theme-card-bg)]/50 text-xs text-[var(--theme-text-primary)] opacity-50">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-[var(--theme-text-accent)]/10 rounded border border-[var(--theme-card-border)]">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-[var(--theme-text-accent)]/10 rounded border border-[var(--theme-card-border)]">↓</kbd>
                      to navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-[var(--theme-text-accent)]/10 rounded border border-[var(--theme-card-border)]">↵</kbd>
                      to select
                    </span>
                  </div>
                  <span>
                    <kbd className="px-1.5 py-0.5 bg-[var(--theme-text-accent)]/10 rounded border border-[var(--theme-card-border)]">ESC</kbd>
                    to close
                  </span>
                </div>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
