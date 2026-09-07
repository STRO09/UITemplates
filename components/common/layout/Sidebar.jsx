"use client";

import { cn } from "@/lib/utils";

export function Sidebar({ children, className, contentClassName }) {
  return (
    <aside className={cn("h-full", className)}>
      <div className={cn("h-full", contentClassName)}>{children}</div>
    </aside>
  );
}
