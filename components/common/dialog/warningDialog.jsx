"use client";

import { AlertTriangle } from "lucide-react";
import { Modal } from "@/components/common/modal";
import { cn } from "@/lib/utils";

/**
 * Displays an informational warning without action buttons.
 */
export default function WarningDialog({
  open,
  onClose,
  title = "Warning",
  description,
  children,
  icon: Icon = AlertTriangle,
  size = "sm",
  className,
  iconClassName,
  ...props
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size={size}
      showCloseButton
      showCancelButton={false}
      action={null}
      className={className}
      {...props}
    >
      <div className="flex flex-col items-center text-center">
        <Icon className={cn("mb-4 h-10 w-10 text-warning", iconClassName)} />

        {title && (
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        )}

        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}

        {children && <div className="mt-4 w-full">{children}</div>}
      </div>
    </Modal>
  );
}
