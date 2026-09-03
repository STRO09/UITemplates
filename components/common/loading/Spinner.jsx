import { cn } from "@/lib/utils";

/**
 * Reusable loading spinner.
 */
export function Spinner({
  size = "md",
  className,
  containerClassName,
  ...props
}) {
  return (
    <div
      className={cn("flex items-center justify-center", containerClassName)}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-border border-t-primary",

          size === "sm" && "h-5 w-5",
          size === "md" && "h-8 w-8",
          size === "lg" && "h-12 w-12",

          className,
        )}
      />
    </div>
  );
}
