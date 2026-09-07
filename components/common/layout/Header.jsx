"use client";

import { cn } from "@/lib/utils";

export function Header({ children, className, contentClassName }) {
  return (
    <header className={cn("w-full", className)}>
      <div
        className={cn("flex items-center justify-between", contentClassName)}
      >
        {children}
      </div>
    </header>
  );
}
