"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownContext = createContext(null);

function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Dropdown components must be used inside <Dropdown>.");
  }

  return context;
}

/**
 * Reusable dropdown menu.
 *
 * Handles open/close, outside clicks, Escape, and controlled state.
 */
export function Dropdown({
  children,
  className,
  open: controlledOpen,
  onOpenChange,
  ...props
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const ref = useRef(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (value) => {
    if (!isControlled) {
      setInternalOpen(value);
    }

    onOpenChange?.(value);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (!ref.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

/**
 * Dropdown trigger.
 */
export function DropdownTrigger({ children, className, ...props }) {
  const { open, setOpen } = useDropdown();

  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border",
        "bg-background px-3 py-2 text-sm text-foreground",
        "transition-colors hover:bg-surface",
        className,
      )}
      {...props}
    >
      {children}

      <ChevronDown
        className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
      />
    </button>
  );
}

/**
 * Dropdown content container.
 */
export function DropdownContent({ children, className, ...props }) {
  const { open } = useDropdown();

  if (!open) {
    return null;
  }

  return (
    <div
      role="menu"
      className={cn(
        "absolute left-0 top-full z-50 mt-2 min-w-40",
        "rounded-md border border-border bg-background p-1 shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Dropdown menu item.
 */
export function DropdownItem({
  children,
  onSelect,
  disabled = false,
  destructive = false,
  className,
  ...props
}) {
  const { setOpen } = useDropdown();

  const handleSelect = (event) => {
    if (disabled) return;

    onSelect?.(event);
    setOpen(false);
  };

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleSelect}
      className={cn(
        "flex w-full items-center rounded-sm px-3 py-2",
        "text-left text-sm transition-colors",
        "text-foreground hover:bg-surface",
        "disabled:pointer-events-none disabled:opacity-50",
        destructive && "text-destructive hover:bg-destructive/10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
