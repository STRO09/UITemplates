const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

const RETRYABLE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const DEFAULT_RETRIES = 2;
const DEFAULT_RETRY_DELAY = 300;

/**
 * Executes an operation with retry support.
 */
export async function withRetry(
  operation,
  {
    retries = DEFAULT_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY,
    shouldRetry = () => true,
  } = {},
) {
  let attempt = 0;

  while (true) {
    try {
      const result = await operation();

      if (!shouldRetry(result) || attempt >= retries) {
        return result;
      }

      attempt++;
    } catch (error) {
      if (attempt >= retries) {
        throw error;
      }

      attempt++;
    }

    const delay = retryDelay * 2 ** (attempt - 1) + Math.random() * 100;

    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

export function isRetryableMethod(method) {
  return RETRYABLE_METHODS.has(method.toUpperCase());
}

export function isRetryableStatus(status) {
  return RETRYABLE_STATUS_CODES.has(status);
}
