"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContext = createContext(null);

function useSelect() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be used inside <Select>.");
  }

  return context;
}

/**
 * Reusable select field.
 *
 * Supports controlled/uncontrolled values,
 * keyboard navigation, and typeahead.
 */
export function Select({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  children,
  className,
  disabled = false,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [highlightedValue, setHighlightedValue] = useState(defaultValue);

  const ref = useRef(null);
  const typeaheadRef = useRef("");
  const typeaheadTimeoutRef = useRef(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }

    setHighlightedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  const close = () => {
    setOpen(false);
    setHighlightedValue(value);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (!ref.current?.contains(event.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, value]);

  useEffect(() => {
    return () => {
      clearTimeout(typeaheadTimeoutRef.current);
    };
  }, []);

  const handleTypeahead = (character) => {
    const search = (typeaheadRef.current + character).toLowerCase();

    typeaheadRef.current = search;

    clearTimeout(typeaheadTimeoutRef.current);

    typeaheadTimeoutRef.current = setTimeout(() => {
      typeaheadRef.current = "";
    }, 500);

    const items = Array.from(
      ref.current?.querySelectorAll(
        '[role="option"]:not([aria-disabled="true"])',
      ) ?? [],
    );

    const match = items.find((item) =>
      item.textContent?.trim().toLowerCase().startsWith(search),
    );

    if (match) {
      const nextValue = match.dataset.value;

      setHighlightedValue(nextValue);

      match.scrollIntoView({
        block: "nearest",
      });
    }
  };

  const handleKeyDown = (event) => {
    if (disabled) return;

    if (!open) {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        setOpen(true);
        setHighlightedValue(value);
      }

      return;
    }

    const items = Array.from(
      ref.current?.querySelectorAll(
        '[role="option"]:not([aria-disabled="true"])',
      ) ?? [],
    );

    if (!items.length) return;

    const values = items.map((item) => item.dataset.value);

    const currentIndex = values.indexOf(highlightedValue);

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();

        const nextIndex =
          currentIndex < values.length - 1 ? currentIndex + 1 : 0;

        setHighlightedValue(values[nextIndex]);

        items[nextIndex]?.scrollIntoView({
          block: "nearest",
        });

        break;
      }

      case "ArrowUp": {
        event.preventDefault();

        const previousIndex =
          currentIndex > 0 ? currentIndex - 1 : values.length - 1;

        setHighlightedValue(values[previousIndex]);

        items[previousIndex]?.scrollIntoView({
          block: "nearest",
        });

        break;
      }

      case "Home": {
        event.preventDefault();
        setHighlightedValue(values[0]);
        break;
      }

      case "End": {
        event.preventDefault();
        setHighlightedValue(values[values.length - 1]);
        break;
      }

      case "Enter":
      case " ": {
        event.preventDefault();

        if (highlightedValue) {
          setValue(highlightedValue);
        }

        break;
      }

      case "Escape":
        event.preventDefault();
        close();
        break;

      default:
        if (event.key.length === 1) {
          handleTypeahead(event.key);
        }
    }
  };

  return (
    <SelectContext.Provider
      value={{
        value,
        open,
        setOpen,
        setValue,
        highlightedValue,
        setHighlightedValue,
        disabled,
      }}
    >
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
}

/**
 * Select trigger.
 */
export function SelectTrigger({
  children,
  placeholder = "Select...",
  className,
  ...props
}) {
  const { value, open, setOpen, disabled } = useSelect();

  return (
    <button
      type="button"
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={() => {
        setOpen(!open);
      }}
      className={cn(
        "flex h-10 w-full items-center justify-between gap-2",
        "rounded-md border border-border bg-background",
        "px-3 text-sm text-foreground",
        "transition-colors hover:bg-surface",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className={cn(!value && "text-muted-foreground")}>
        {children || value || placeholder}
      </span>

      <ChevronDown
        className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
      />
    </button>
  );
}

/**
 * Select option container.
 */
export function SelectContent({ children, className, ...props }) {
  const { open } = useSelect();

  if (!open) {
    return null;
  }

  return (
    <div
      role="listbox"
      className={cn(
        "absolute left-0 top-full z-50 mt-2 w-full",
        "max-h-60 overflow-y-auto",
        "rounded-md border border-border bg-background",
        "p-1 shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Select option.
 */
export function SelectItem({
  value,
  children,
  disabled = false,
  className,
  ...props
}) {
  const { value: selectedValue, highlightedValue, setValue } = useSelect();

  const selected = selectedValue === value;
  const highlighted = highlightedValue === value;

  return (
    <button
      type="button"
      role="option"
      data-value={value}
      aria-selected={selected}
      aria-disabled={disabled}
      disabled={disabled}
      onMouseEnter={() => {
        // Mouse movement updates the visual highlight.
      }}
      onClick={() => {
        if (!disabled) {
          setValue(value);
        }
      }}
      className={cn(
        "flex w-full items-center justify-between",
        "rounded-sm px-3 py-2 text-left text-sm",
        "text-foreground transition-colors",
        "hover:bg-surface",
        "disabled:pointer-events-none disabled:opacity-50",
        highlighted && "bg-surface",
        selected && "font-medium",
        className,
      )}
      {...props}
    >
      <span>{children}</span>

      {selected && <Check className="h-4 w-4" />}
    </button>
  );
}
