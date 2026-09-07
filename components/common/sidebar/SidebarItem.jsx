"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "./Sidebar";
import { useSidebarNavigation } from "./SidebarNavigationContext";
import { SidebarSubmenu } from "./SidebarSubmenu";
import { SidebarPopup } from "./SidebarPopup";

export function SidebarItem({ item, className }) {
  const { open: sidebarOpen } = useSidebar();
  const navigationMode = useSidebarNavigation();

  const [open, setOpen] = useState(false);

  const Icon = item.icon;
  const hasChildren = item.children?.length > 0;

  /*
   * A leaf item is always just a link,
   * regardless of where it is rendered.
   */
  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2",
          navigationMode === "sidebar" && !sidebarOpen && "justify-center",
          className,
        )}
      >
        {Icon && <Icon className="h-5 w-5 shrink-0" />}

        {(sidebarOpen || navigationMode === "popup") && (
          <span className="truncate">{item.label}</span>
        )}
      </Link>
    );
  }

  /*
   * Nested item inside an existing popup.
   * Render another cascading popup.
   */
  if (navigationMode === "popup") {
    return (
      <SidebarPopup content={<SidebarSubmenu items={item.children} />}>
        <div
          className={cn(
            "flex w-full items-center justify-between px-2 py-1.5",
            className,
          )}
        >
          <span className="truncate">{item.label}</span>

          <ChevronRight className="h-4 w-4 shrink-0" />
        </div>
      </SidebarPopup>
    );
  }

  /*
   * Collapsed sidebar.
   * The first level opens a popup beside the sidebar.
   */
  if (!sidebarOpen) {
    return (
      <SidebarPopup
        content={<SidebarSubmenu items={item.children} />}
        className={className}
      >
        <div className="flex w-full items-center justify-center px-3 py-2">
          {Icon && <Icon className="h-5 w-5 shrink-0" />}
        </div>
      </SidebarPopup>
    );
  }

  /*
   * Expanded sidebar.
   * Nested items are rendered inline.
   */
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
