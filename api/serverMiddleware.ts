/**
 * -------------------------------------------------------
 * Server-side API middleware
 * -------------------------------------------------------
 *
 * PURPOSE:
 * Unified server-side fetch layer for authenticated SSR requests.
 *
 * USE IN:
 * - Server Components
 * - Route Handlers
 * - Server Actions
 *
 * NEVER IMPORT INTO:
 * - Client Components
 *
 * WHY THIS EXISTS:
 * Next.js server environments do NOT automatically forward
 * browser cookies to external backends.
 *
 * This wrapper:
 * - forwards auth/session cookies
 * - preserves user identity during SSR
 * - standardizes API responses
 * - supports Next.js caching/revalidation
 * - enables request deduplication
 *
 * FEATURES:
 * - Cookie forwarding
 * - Typed responses
 * - Cache tags
 * - Revalidation support
 * - Automatic error normalization
 * - React cache() deduplication
 *
 * NOTES:
 * - Uses SERVER_BASE_URL
 * - Runs only on the server
 * - Safe for authenticated SSR
 * -------------------------------------------------------
 */
import { cookies, headers } from 'next/headers';
import { cache } from 'react';

/**
 * Configuration options for server-side API requests.
 */
type RequestOptions = {
  /**
   * HTTP method.
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
   * - Authorization
   * - Content negotiation
   * - Custom backend headers
   */
  headers?: Record<string, string>;

  /**
   * Next.js cache tags used for selective cache invalidation.
   *
   * Example:
   * tags: ['posts']
   *
   * Later:
   * revalidateTag('posts')
   */
  tags?: string[];

  /**
   * Next.js ISR revalidation duration in seconds.
   *
   * false → disables caching entirely
   *
   * Example:
   * revalidate: 60
   */
  revalidate?: number | false;
};

/**
 * Standardized API response shape used across the application.
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
   * - request never reached server
   */
  status: number;
};

/**
 * Base backend URL used for server-side requests.
 *
 * Example:
 * SERVER_BASE_URL=http://localhost:8080
 */
const BASE_URL = process.env.SERVER_BASE_URL ?? '';

/**
 * Low-level server-side fetch wrapper.
 *
 * Handles:
 * - cookie forwarding
 * - request serialization
 * - standardized error handling
 * - SSR-safe authenticated requests
 * - Next.js caching options
 *
 * @template T Expected response payload type
 *
 * @param endpoint Backend API endpoint
 * @param options Request configuration
 *
 * @returns Standardized API response object
 *
 * @example
 * const res = await serverFetch<User>('/users/me');
 *
 * if (res.data) {
 *   console.log(res.data.name);
 * }
 */
async function serverFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers: extraHeaders = {},
    tags,
    revalidate,
  } = options;

  /**
   * Forward incoming browser cookies to the backend API.
   *
   * Without this:
   * - authenticated SSR requests fail
   * - backend sessions are lost
   * - protected endpoints return unauthorized
   */
  const cookieStore = cookies();

  /**
   * Access incoming request headers.
   */
  const headerStore = headers();

  /**
   * Serialize all cookies into a valid Cookie header string.
   */
  const sessionCookie = cookieStore.toString();

  /**
   * Preserve original client IP information when available.
   */
  const forwardedFor =
    (await headerStore).get('x-forwarded-for') ?? '';

  /**
   * Standardized fetch configuration.
   */
  const config: RequestInit = {
    method,

    headers: {
      'Content-Type': 'application/json',

      /**
       * Forward browser cookies to backend API.
       */
      Cookie: sessionCookie,

      ...(forwardedFor
        ? { 'x-forwarded-for': forwardedFor }
        : {}),

      ...extraHeaders,
    },

    /**
     * Serialize request body if provided.
     */
    ...(body
      ? { body: JSON.stringify(body) }
      : {}),

    /**
     * Next.js extended fetch options.
     */
    next: {
      ...(tags ? { tags } : {}),
      ...(revalidate !== undefined
        ? { revalidate }
        : {}),
    },
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
     * - reverse proxies may return HTML
     * - nginx errors are often text/html
     * - parsing invalid JSON would crash
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
     * Successful request.
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
     * - connection timeout
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
 * Cached GET request helper.
 *
 * Uses React's cache() utility to deduplicate identical
 * GET requests during the same render cycle.
 *
 * Useful for:
 * - nested server components
 * - repeated layout fetches
 * - shared SSR data
 *
 * @template T Expected response payload type
 *
 * @param endpoint Backend API endpoint
 * @param tags Optional Next.js cache tags
 *
 * @example
 * const user = await cachedGet<User>('/users/me');
 */
export const cachedGet = cache(
  <T>(endpoint: string, tags?: string[]) =>
    serverFetch<T>(endpoint, {
      method: 'GET',
      tags,
    })
);

/**
 * High-level server API client.
 *
 * Provides convenient typed wrappers around serverFetch().
 *
 * Example:
 * apiServer.get<User>('/users/me')
 * apiServer.post('/posts', data)
 */
export const apiServer = {
  /**
   * Perform a GET request.
   */
  get: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) =>
    serverFetch<T>(endpoint, {
      method: 'GET',
      ...options,
    }),

  /**
   * Perform a POST request.
   */
  post: <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) =>
    serverFetch<T>(endpoint, {
      method: 'POST',
      body,
      ...options,
    }),

  /**
   * Perform a PUT request.
   */
  put: <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) =>
    serverFetch<T>(endpoint, {
      method: 'PUT',
      body,
      ...options,
    }),

  /**
   * Perform a PATCH request.
   */
  patch: <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) =>
    serverFetch<T>(endpoint, {
      method: 'PATCH',
      body,
      ...options,
    }),

  /**
   * Perform a DELETE request.
   */
  delete: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) =>
    serverFetch<T>(endpoint, {
      method: 'DELETE',
      ...options,
    }),
};