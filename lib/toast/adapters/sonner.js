import { toast as sonnerToast } from "sonner";

export const sonnerAdapter = {
  show: (options) => sonnerToast(options.message, options),

  success: (message, options) => sonnerToast.success(message, options),

  error: (message, options) => sonnerToast.error(message, options),

  warning: (message, options) => sonnerToast.warning(message, options),

  info: (message, options) => sonnerToast.info(message, options),

  dismiss: (id) => sonnerToast.dismiss(id),

  dismissAll: () => sonnerToast.dismiss(),
};
