"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import {
  SidebarResponsiveProvider,
  useSidebarResponsive,
} from "./SidebarResponsiveContext";

const SidebarContext = createContext(null);

export function Sidebar({
  children,
  defaultOpen = true,
  className,
  contentClassName,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <SidebarResponsiveProvider>
        <SidebarContent
          className={className}
          contentClassName={contentClassName}
        >
          {children}
        </SidebarContent>
      </SidebarResponsiveProvider>
    </SidebarContext.Provider>
  );
}

function SidebarContent({ children, className, contentClassName }) {
  const { open } = useSidebar();
  const responsiveMode = useSidebarResponsive();

  return (
    <aside
      className={cn(
        "h-full shrink-0 transition-[width] duration-200",
        open ? "w-64" : responsiveMode === "mobile" ? "w-0" : "w-12",
        className,
      )}
    >
      <div className={cn("h-full", contentClassName)}>{children}</div>
    </aside>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used inside Sidebar");
  }

  return context;
}
