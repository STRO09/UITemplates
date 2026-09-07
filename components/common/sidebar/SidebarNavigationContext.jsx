"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "./Sidebar";
import { SidebarSubmenu } from "./SidebarSubmenu";
import { SidebarPopup } from "./SidebarPopup";

export function SidebarItem({ item, className }) {
  const { open: sidebarOpen } = useSidebar();
  const [open, setOpen] = useState(false);

  const Icon = item.icon;
  const hasChildren = item.children?.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2",
          !sidebarOpen && "justify-center",
          className,
        )}
      >
        {Icon && <Icon className="h-5 w-5 shrink-0" />}

        {sidebarOpen && <span className="truncate">{item.label}</span>}
      </Link>
    );
  }

  if (!sidebarOpen) {
    return (
      <SidebarPopup content={<SidebarSubmenu items={item.children} />}>
        <div
          className={cn(
            "flex w-full items-center justify-center px-3 py-2",
            className,
          )}
        >
          {Icon && <Icon className="h-5 w-5 shrink-0" />}
        </div>
      </SidebarPopup>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 px-3 py-2"
      >
        {Icon && <Icon className="h-5 w-5 shrink-0" />}

        <span className="flex-1 truncate text-left">{item.label}</span>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="ml-4">
          <SidebarSubmenu items={item.children} />
        </div>
      )}
    </div>
  );
}
