"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "./Sidebar";

/**
 * Toggle button that collapses/expands the sidebar.
 * Positioned inside the sidebar to avoid being clipped by overflow-hidden.
 */

export function SidebarToggle({ className }) {
  const { open, setOpen } = useSidebar();

  return (
    <button
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      className={cn(
        "absolute -right-3 top-1/2 z-20",
        "flex h-6 w-6 -translate-y-1/2 items-center justify-center",
        "rounded-full border bg-card shadow-sm",
        "transition-colors hover:bg-muted",
        className,
      )}
    >
      {open ? (
        <ChevronLeft className="h-3.5 w-3.5" />
      ) : (
        <ChevronRight className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
