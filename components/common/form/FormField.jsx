import { cn } from "@/lib/utils";

/**
 * Groups a form control with its label, description, and error.
 */
export function FormField({ children, className, ...props }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}
