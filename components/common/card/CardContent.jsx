import { cn } from "@/lib/utils";

/**
 * Main card content.
 */
export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn("space-y-3 p-4", className)} {...props}>
      {children}
    </div>
  );
}
