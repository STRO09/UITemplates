let adapter = null;

/**
 * Registers the underlying toast implementation.
 */
export function setToastAdapter(toastAdapter) {
  adapter = toastAdapter;
}

/**
 * Returns the active toast implementation.
 */
export function getToastAdapter() {
  if (!adapter) {
    throw new Error("Toast adapter has not been configured.");
  }

  return adapter;
}
