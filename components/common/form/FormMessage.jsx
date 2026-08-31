import { cn } from "@/lib/utils";

/**
 * Displays a validation or form error.
 */
export function FormMessage({ children, className, ...props }) {
  if (!children) {
    return null;
  }

  return (
    <p
      role="alert"
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}
