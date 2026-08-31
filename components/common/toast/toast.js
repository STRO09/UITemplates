import { getToastAdapter } from "@/lib/toast/toast-adapter";

/**
 * Application-level toast API.
 */
export const toast = {
  show: (options) => getToastAdapter().show(options),

  success: (message, options) => getToastAdapter().success(message, options),

  error: (message, options) => getToastAdapter().error(message, options),

  warning: (message, options) => getToastAdapter().warning(message, options),

  info: (message, options) => getToastAdapter().info(message, options),

  dismiss: (id) => getToastAdapter().dismiss?.(id),

  dismissAll: () => getToastAdapter().dismissAll?.(),
};
