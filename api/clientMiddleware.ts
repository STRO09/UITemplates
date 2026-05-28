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
 * - Cookie/session forwarding via credentials: 'include'
 * - Typed responses
 * - Consistent API shape
 *
 * NOTES:
 * - Uses NEXT_PUBLIC_API_URL
 * - Runs in the browser
 * - Cannot access server-only APIs
 * -------------------------------------------------------
 */
/**
 * Configuration options for client-side API requests.
 */
type RequestOptions = {
  /**
   * HTTP request method.
   *
   * @default 'GET'
   */
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  /**
   * Request payload.
   *
   * Automatically serialized using JSON.stringify().
   */
  body?: unknown;

  /**
   * Additional custom request headers.
   *
   * Useful for:
   * - Authorization headers
   * - Feature flags
   * - Custom backend headers
   */
  headers?: Record<string, string>;

  /**
   * Included only to keep the client/server API layer
   * interface consistent.
   *
   * Not used client-side.
   */
  tags?: string[];
};

/**
 * Standardized API response shape returned by all
 * client-side requests.
 *
 * @template T Expected response payload type
 */
type ApiResponse<T> = {
  /**
   * Successful response payload.
   *
   * null when request fails.
   */
  data: T | null;

  /**
   * Human-readable error message.
   *
   * null when request succeeds.
   */
  error: string | null;

  /**
   * HTTP response status code.
   *
   * 0 indicates:
   * - network failure
   * - DNS issue
   * - CORS issue
   * - request never reached backend
   */
  status: number;
};

/**
 * Public backend API URL exposed to the browser.
 *
 * Must use NEXT_PUBLIC_ prefix because this file runs
 * client-side.
 *
 * Example:
 * NEXT_PUBLIC_API_URL=http://localhost:8080
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
 * - typed responses
 * - safe non-JSON parsing
 *
 * Designed for:
 * - Client Components
 * - hooks
 * - event handlers
 * - browser interactions
 *
 * @template T Expected response payload type
 *
 * @param endpoint Backend API endpoint
 * @param options Request configuration
 *
 * @returns Standardized API response object
 *
 * @example
 * const res = await clientFetch<User>('/users/me');
 *
 * if (res.data) {
 *   console.log(res.data.name);
 * }
 */
async function clientFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
  } = options;

  /**
   * Standardized browser fetch configuration.
   */
  const config: RequestInit = {
    method,

    /**
     * Include browser cookies in requests.
     *
     * Required for:
     * - session authentication
     * - cookie-based auth
     * - protected API routes
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
     *
     * Important because:
     * - nginx/proxy errors may return HTML
     * - backend crashes may return text
     * - parsing invalid JSON would throw
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
     * Normalize non-successful responses.
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
      data: payload as T,
      error: null,
      status: res.status,
    };
  } catch (err) {
    /**
     * Handle network-level failures.
     *
     * Examples:
     * - backend offline
     * - DNS failure
     * - CORS rejection
     * - internet disconnected
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
 *
 * Provides convenient typed wrappers around clientFetch().
 *
 * Example:
 * apiClient.get<User>('/users/me')
 * apiClient.post('/posts', data)
 */
export const apiClient = {
  /**
   * Perform a GET request.
   */
  get: <T>(
    endpoint: string,
    headers?: Record<string, string>
  ) =>
    clientFetch<T>(endpoint, {
      method: 'GET',
      headers,
    }),

  /**
   * Perform a POST request.
   */
  post: <T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>
  ) =>
    clientFetch<T>(endpoint, {
      method: 'POST',
      body,
      headers,
    }),

  /**
   * Perform a PUT request.
   */
  put: <T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>
  ) =>
    clientFetch<T>(endpoint, {
      method: 'PUT',
      body,
      headers,
    }),

  /**
   * Perform a PATCH request.
   */
  patch: <T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>
  ) =>
    clientFetch<T>(endpoint, {
      method: 'PATCH',
      body,
      headers,
    }),

  /**
   * Perform a DELETE request.
   */
  delete: <T>(
    endpoint: string,
    headers?: Record<string, string>
  ) =>
    clientFetch<T>(endpoint, {
      method: 'DELETE',
      headers,
    }),
};