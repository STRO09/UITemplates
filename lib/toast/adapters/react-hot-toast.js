// import { toast as hotToast } from "react-hot-toast";

export const reactHotToastAdapter = {
  show: (options) => hotToast(options.message, options),

  success: (message, options) => hotToast.success(message, options),

  error: (message, options) => hotToast.error(message, options),

  warning: (message, options) =>
    hotToast(message, {
      ...options,
      icon: "⚠️",
    }),

  info: (message, options) =>
    hotToast(message, {
      ...options,
      icon: "ℹ️",
    }),

  dismiss: (id) => hotToast.dismiss(id),

  dismissAll: () => hotToast.dismiss(),
};
