import { cn } from "@/lib/utils";
import { TableCell } from "./TableCell";

/**
 * Renders table column headers.
 */
export function TableHeader({
  columns,
  className,
  cellClassName,
}) {
  return (
    <thead className={cn("border-b border-border", className)}>
      <tr>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            as="th"
            className={cn(
              "h-10 px-4 text-left font-medium text-muted-foreground",
              cellClassName,
              column.headerClassName,
            )}
          >
            {column.header}
          </TableCell>
        ))}
      </tr>
    </thead>
  );
}