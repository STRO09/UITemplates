import { cn } from "@/lib/utils";

/**
 * Shared table cell supporting <td> and <th>.
 */
export function TableCell({
  as: Component = "td",
  className,
  children,
  ...props
}) {
  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}