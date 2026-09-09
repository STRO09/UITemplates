"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  SidebarResponsiveProvider,
  useSidebarResponsive,
} from "./SidebarResponsiveContext";

const SidebarContext = createContext(null);

/**
 * Sidebar component that provides a collapsible sidebar with responsive behavior.
 * It wraps its children in a responsive provider to detect mobile/desktop modes.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Sidebar content (header, nav, footer, etc.)
 * @param {boolean} [props.defaultOpen=true] - Initial open state on desktop.
 * @param {string} [props.className] - Extra classes for the <aside> element.
 * @param {string} [props.contentClassName] - Extra classes for the inner flex container.
 */
export function Sidebar({
  children,
  defaultOpen = true,
  className,
  contentClassName,
}) {
  return (
    <SidebarResponsiveProvider>
      <SidebarState
        defaultOpen={defaultOpen}
        className={className}
        contentClassName={contentClassName}
      >
        {children}
      </SidebarState>
    </SidebarResponsiveProvider>
  );
}

/**
 * Internal component that manages the open/closed state based on responsive mode.
 */
function SidebarState({ children, defaultOpen, className, contentClassName }) {
  const responsiveMode = useSidebarResponsive();
  const isMobile = responsiveMode === "mobile";

  const [open, setOpen] = useState(() => {
    // On mobile, start closed. On desktop, use the defaultOpen prop.
    return isMobile ? false : defaultOpen;
  });

  // Force close when switching to mobile.
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <aside
        className={cn(
          "relative h-full shrink-0 transition-[width] duration-200",
          // Widths: mobile closed = 56px (w-14), mobile open = 256px (w-64)
          //         desktop closed = 64px (w-16), desktop open = 256px (w-64)
          isMobile ? (open ? "w-64" : "w-12") : open ? "w-64" : "w-16",
          className,
        )}
      >
        <div className={cn("flex h-full flex-col", contentClassName)}>
          {children}
        </div>
      </aside>
    </SidebarContext.Provider>
  );
}

/**
 * Hook to access sidebar state (open, setOpen) within sidebar children.
 */
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used inside Sidebar");
  }
  return context;
}
