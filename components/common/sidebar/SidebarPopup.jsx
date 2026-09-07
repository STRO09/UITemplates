"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSidebarResponsive } from "./SidebarResponsiveContext";

export function SidebarPopup({ children, content, className }) {
  const mode = useSidebarResponsive();
  const [open, setOpen] = useState(false);

  const isMobile = mode === "mobile";

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => {
        if (!isMobile) {
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setOpen(false);
        }
      }}
    >
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {children}
      </div>

      {open && (
        <div className="absolute left-full top-0 ml-1 min-w-48 rounded-md border bg-popover p-1 shadow-md">
          {content}
        </div>
      )}
    </div>
  );
}
