"use client";

import { cn } from "@/lib/utils";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { useSelection } from "@/hooks/use-selection";

/**
 * Reusable table with customizable columns, data, and styles.
 */
export function Table({
  columns,
  data,
  selectable = false,
  getRowId = (row) => row.id,
  className,
  headerClassName,
  headerCellClassName,
  bodyClassName,
  rowClassName,
  cellClassName,
}) {
  const selection = useSelection({
    items: data,
    getId: getRowId,
  });
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full caption-bottom text-sm", className)}>
        <TableHeader
          columns={columns}
          selectable={selectable}
          allSelected={selection.allSelected}
          onSelectAll={selection.toggleAll}
          className={headerClassName}
          cellClassName={headerCellClassName}
        />

        <TableBody
          columns={columns}
          data={data}
          selectable={selectable}
          isSelected={selection.isSelected}
          onSelectRow={selection.toggle}
          className={bodyClassName}
          rowClassName={rowClassName}
          cellClassName={cellClassName}
        />
      </table>
    </div>
  );
}
