import { cn } from "@/lib/utils";

/**
 * Label for a form control.
 */
export function FormLabel({ children, htmlFor, className, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    >
      {children}
    </label>
  );
}
