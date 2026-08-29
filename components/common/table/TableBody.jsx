import { cn } from "@/lib/utils";
import { TableRow } from "./TableRow";

/**
 * Renders table rows from the supplied data.
 */
export function TableBody({
  columns,
  data,
  selectable,
  isSelected,
  onSelectRow,
  className,
  rowClassName,
  cellClassName,
}) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)}>
      {data.map((row, rowIndex) => (
        <TableRow
          key={rowIndex ?? row.id}
          row={row}
          rowIndex={rowIndex}
          columns={columns}
          selectable={selectable}
          selected={isSelected(row)}
          onSelect={()=> onSelectRow(row)}
          className={rowClassName}
          cellClassName={cellClassName}
        />
      ))}
    </tbody>
  );
}
