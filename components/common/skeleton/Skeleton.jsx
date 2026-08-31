import { cn } from "@/lib/utils";

/**
 * Reusable loading placeholder.
 */
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface", className)}
      {...props}
    />
  );
}
