import { cn } from "@/lib/utils";

/**
 * Base card container.
 */
export function Card({ children, className, ...props }) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-background shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}