import { cn } from "@/lib/utils";

/**
 * Reusable button with overridable styles.
 */
export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",

        variant === "primary" && "bg-primary text-white hover:bg-primary/90",

        variant === "secondary" &&
          "bg-surface text-foreground hover:bg-surface/80",

        variant === "outline" &&
          "border border-border bg-background text-foreground hover:bg-surface",

        variant === "ghost" && "text-foreground hover:bg-surface",

        variant === "destructive" &&
          "bg-destructive text-white hover:bg-destructive/90",

        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-11 px-5 text-base",

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
