"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable modal with optional header, warning, footer, and actions.
 */
export function Modal({
  open = false,
  onClose,

  title,
  description,
  warning,

  children,

  action,
  actionLabel = "Confirm",

  showCrossButton = false,
  showCloseButton = true,
  closeOnBackdropClick = true,

  size = "md",

  className,
  backdropClassName,
  contentClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  warningClassName,
  bodyClassName,
  footerClassName,
  closeClassName,
  actionClassName,

  ...props
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/50 backdrop-blur-sm",
        backdropClassName,
      )}
      onMouseDown={(event) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose?.();
        }
      }}
      {...props}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={cn(
          "relative max-h-[90vh] w-full overflow-y-auto rounded-xl",
          "border border-border bg-background shadow-xl",
          size === "sm" && "max-w-sm",
          size === "md" && "max-w-lg",
          size === "lg" && "max-w-2xl",
          size === "xl" && "max-w-4xl",
          size === "full" && "max-w-6xl",
          contentClassName,
          className,
        )}
      >
        {showCrossButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={cn(
              "absolute right-4 top-4 inline-flex h-8 w-8",
              "items-center justify-center rounded-md",
              "text-muted-foreground transition-colors",
              "hover:bg-surface hover:text-foreground",
              closeClassName,
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {(title || description) && (
          <header className={cn("p-6 pb-4", headerClassName)}>
            {title && (
              <h2
                id="modal-title"
                className={cn(
                  "pr-8 text-lg font-semibold text-foreground",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                className={cn(
                  "mt-1 pr-8 text-sm text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            )}
          </header>
        )}

        {warning && (
          <div
            className={cn(
              "mx-6 rounded-md border border-warning/30",
              "bg-warning/10 p-3 text-sm text-warning",
              warningClassName,
            )}
          >
            {warning}
          </div>
        )}

        {children && <div className={cn("p-6", bodyClassName)}>{children}</div>}

        {(action || showCloseButton) && (
          <footer
            className={cn(
              "flex flex-col-reverse gap-2 border-t border-border p-6 sm:flex-row sm:justify-end",
              footerClassName,
            )}
          >
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-border px-4 py-2 text-sm text-foreground hover:bg-surface"
              >
                Cancel
              </button>
            )}

            {action && (
              <button
                type="button"
                onClick={action}
                className={cn(
                  "rounded-md bg-primary px-4 py-2 text-sm font-medium text-white",
                  "hover:bg-primary/90",
                  actionClassName,
                )}
              >
                {actionLabel}
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}
