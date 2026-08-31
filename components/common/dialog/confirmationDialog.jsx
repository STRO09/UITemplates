"use client";

import { Modal } from "@/components/common/modal";
import { cn } from "@/lib/utils";

/**
 * Confirmation dialog for actions requiring user approval.
 */
export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,

  title = "Are you sure?",
  description,

  children,

  confirmLabel = "Confirm",
  cancelLabel = "Cancel",

  variant = "primary",

  size = "sm",

  className,
  confirmClassName,
  cancelClassName,

  ...props
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
      showCloseButton
      showCancelButton
      cancelLabel={cancelLabel}
      action={onConfirm}
      actionLabel={confirmLabel}
      actionClassName={cn(
        variant === "destructive" && "bg-destructive hover:bg-destructive/90",
        confirmClassName,
      )}
      cancelClassName={cancelClassName}
      className={className}
      {...props}
    >
      {children}
    </Modal>
  );
}
