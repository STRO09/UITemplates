import { cn } from "@/lib/utils";

/**
 * Optional card actions/footer.
 */
export function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn("flex items-center gap-3 p-4 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
