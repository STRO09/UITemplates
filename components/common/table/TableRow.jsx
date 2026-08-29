import { cn } from "@/lib/utils";
import { TableCell } from "./TableCell";

/**
 * Renders a single table row and its cells.
 */
export function TableRow({
  row,
  rowIndex,
  columns,
  selectable,
  selected,
  onSelect,
  className,
  cellClassName,
}) {
  return (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-surface/50",
        selected && "bg-surface/50",
        typeof className === "function" ? className(row, rowIndex) : className,
      )}
    >
      {selectable && (
        <TableCell className="w-10 px-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            aria-label="Select row"
          />
        </TableCell>
      )}
      
      {columns.map((column) => {
        const value = row[column.key];

        return (
          <TableCell
            key={column.key}
            className={cn(
              "px-4 py-3",
              cellClassName,
              typeof column.cellClassName === "function"
                ? column.cellClassName(value, row, rowIndex)
                : column.cellClassName,
            )}
          >
            {column.render ? column.render(value, row, rowIndex) : value}
          </TableCell>
        );
      })}
    </tr>
  );
}
