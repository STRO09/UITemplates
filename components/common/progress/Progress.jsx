import { cn } from "@/lib/utils";

/**
 * Reusable progress bar.
 */
export function Progress({
  value = 0,
  max = 100,
  showValue = false,
  className,
  trackClassName,
  indicatorClassName,
  valueClassName,
  ...props
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex items-center gap-3">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          className={cn(
            "h-2 w-full overflow-hidden rounded-full bg-surface",
            trackClassName,
          )}
        >
          <div
            className={cn(
              "h-full rounded-full bg-primary transition-[width] duration-300",
              indicatorClassName,
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {showValue && (
          <span
            className={cn(
              "shrink-0 text-sm text-muted-foreground",
              valueClassName,
            )}
          >
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
}
