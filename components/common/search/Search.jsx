"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable search input.
 *
 * UI only — search logic is handled by the consumer.
 */
export function Search({
  value = "",
  onChange,
  placeholder = "Search...",
  className,
  inputClassName,
  iconClassName,
  clearClassName,
  showClear = true,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative flex h-10 items-center rounded-md border border-border bg-background",
        className,
      )}
    >
      <SearchIcon
        className={cn(
          "pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground",
          iconClassName,
        )}
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-full w-full rounded-md bg-transparent pl-9 pr-9 text-sm text-foreground outline-none",
          "placeholder:text-muted-foreground",
          "focus:ring-2 focus:ring-primary/30",
          inputClassName,
        )}
        {...props}
      />

      {showClear && value && (
        <button
          type="button"
          onClick={() => onChange?.("")}
          aria-label="Clear search"
          className={cn(
            "absolute right-2 inline-flex h-7 w-7 items-center justify-center rounded-md",
            "text-muted-foreground hover:bg-surface hover:text-foreground",
            clearClassName,
          )}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
