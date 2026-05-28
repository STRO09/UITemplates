/**
 * -------------------------------------------------------
 * Client-side API middleware
 * -------------------------------------------------------
 *
 * PURPOSE:
 * Standardized fetch wrapper for browser-side requests.
 *
 * USE IN:
 * - Client Components
 * - Custom hooks
 * - Event handlers
 * - Browser interactions
 *
 * DO NOT USE IN:
 * - Server Components
 * - Server Actions
 * - Route Handlers
 *
 * FEATURES:
 * - JSON serialization
 * - Automatic error normalization
 * - Cookie/session forwarding
 * - Consistent API shape
 *
 * NOTES:
 * - Uses NEXT_PUBLIC_API_URL
 * - Runs in the browser
 * - Cannot access server-only APIs
 * -------------------------------------------------------
 */

/**
 * Public backend API URL exposed to browser.
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * Low-level browser-side fetch wrapper.
 *
 * Handles:
 * - JSON serialization
 * - credential forwarding
 * - standardized error handling
 * - safe non-JSON parsing
 *
 * @param {string} endpoint Backend API endpoint
 * @param {Object} options Request configuration
 *
 * @returns {Promise<{
 *   data: any,
 *   error: string | null,
 *   status: number
 * }>}
 */
async function clientFetch(
  endpoint,
  options = {}
) {
  const {
    method = 'GET',
    body,
    headers = {},
  } = options;

  /**
   * Standardized browser fetch configuration.
   */
  const config = {
    method,

    /**
     * Include browser cookies in requests.
     */
    credentials: 'include',

    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },

    /**
     * Serialize request payload if provided.
     */
    ...(body
      ? { body: JSON.stringify(body) }
      : {}),
  };

  try {
    const res = await fetch(
      `${BASE_URL}${endpoint}`,
      config
    );

    /**
     * Detect whether response is JSON.
     */
    const contentType =
      res.headers.get('content-type');

    const isJson =
      contentType?.includes('application/json');

    /**
     * Safely parse response payload.
     */
    const payload = isJson
      ? await res.json()
      : await res.text();

    /**
     * Normalize failed responses.
     */
    if (!res.ok) {
      const message =
        isJson && payload?.message
          ? payload.message
          : `Request failed with status ${res.status}`;

      return {
        data: null,
        error: message,
        status: res.status,
      };
    }

    /**
     * Successful request response.
     */
    return {
      data: payload,
      error: null,
      status: res.status,
    };
  } catch (err) {
    /**
     * Handle network-level failures.
     */
    const message =
      err instanceof Error
        ? err.message
        : 'Network error';

    return {
      data: null,
      error: message,
      status: 0,
    };
  }
}

/**
 * High-level browser API client.
 */
export const apiClient = {
  /**
   * Perform a GET request.
   */
  get: (endpoint, headers) =>
    clientFetch(endpoint, {
      method: 'GET',
      headers,
    }),

  /**
   * Perform a POST request.
   */
  post: (endpoint, body, headers) =>
    clientFetch(endpoint, {
      method: 'POST',
      body,
      headers,
    }),

  /**
   * Perform a PUT request.
   */
  put: (endpoint, body, headers) =>
    clientFetch(endpoint, {
      method: 'PUT',
      body,
      headers,
    }),

  /**
   * Perform a PATCH request.
   */
  patch: (endpoint, body, headers) =>
    clientFetch(endpoint, {
      method: 'PATCH',
      body,
      headers,
    }),

  /**
   * Perform a DELETE request.
   */
  delete: (endpoint, headers) =>
    clientFetch(endpoint, {
      method: 'DELETE',
      headers,
    }),
};