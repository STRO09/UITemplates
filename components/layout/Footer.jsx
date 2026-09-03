import { cn } from "@/lib/utils";

/**
 * Reusable page footer.
 */
export function Footer({ children, className, contentClassName, ...props }) {
  return (
    <footer
      className={cn("border-t border-border bg-background", className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-6",
          contentClassName,
        )}
      >
        {children}
      </div>
    </footer>
  );
}
