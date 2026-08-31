"use client";

import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable filter container.
 *
 * UI only — filtering logic is handled by the consumer.
 */
export function Filter({
  children,
  title = "Filters",
  showIcon = true,
  className,
  contentClassName,
  titleClassName,
  ...props
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-background p-4",
        className,
      )}
      {...props}
    >
      {title && (
        <div className="mb-4 flex items-center gap-2">
          {showIcon && (
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          )}

          <h3
            className={cn(
              "text-sm font-medium text-foreground",
              titleClassName,
            )}
          >
            {title}
          </h3>
        </div>
      )}

      <div className={cn("flex flex-wrap items-end gap-4", contentClassName)}>
        {children}
      </div>
    </section>
  );
}
