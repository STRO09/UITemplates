import { cn } from "@/lib/utils";

/**
 * Optional supporting text for a form field.
 */
export function FormDescription({ children, className, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
