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
 * Base backend URL used for server-side requests.
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
 * @param {string} endpoint Backend API endpoint
 * @param {Object} options Request configuration
 *
 * @returns {Promise<{
 *   data: any,
 *   error: string | null,
 *   status: number
 * }>}
 */
async function serverFetch(
  endpoint,
  options = {}
) {
  const {
    method = 'GET',
    body,
    headers: extraHeaders = {},
    tags,
    revalidate,
  } = options;

  /**
   * Forward incoming browser cookies
   * to backend API.
   */
  const cookieStore = await cookies();

  /**
   * Access incoming request headers.
   */
  const headerStore = await headers();

  /**
   * Serialize cookies into Cookie header.
   */
  const sessionCookie = cookieStore.toString();

  /**
   * Preserve original client IP.
   */
  const forwardedFor =
    headerStore.get('x-forwarded-for') ?? '';

  /**
   * Standardized fetch configuration.
   */
  const config = {
    method,

    headers: {
      'Content-Type': 'application/json',

      /**
       * Forward browser cookies to backend.
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
     * Successful request.
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
 * Cached GET request helper.
 *
 * Deduplicates identical GET requests
 * during the same render cycle.
 */
export const cachedGet = cache(
  (endpoint, tags) =>
    serverFetch(endpoint, {
      method: 'GET',
      tags,
    })
);

/**
 * High-level server API client.
 */
export const apiServer = {
  /**
   * Perform a GET request.
   */
  get: (endpoint, options) =>
    serverFetch(endpoint, {
      method: 'GET',
      ...options,
    }),

  /**
   * Perform a POST request.
   */
  post: (endpoint, body, options) =>
    serverFetch(endpoint, {
      method: 'POST',
      body,
      ...options,
    }),

  /**
   * Perform a PUT request.
   */
  put: (endpoint, body, options) =>
    serverFetch(endpoint, {
      method: 'PUT',
      body,
      ...options,
    }),

  /**
   * Perform a PATCH request.
   */
  patch: (endpoint, body, options) =>
    serverFetch(endpoint, {
      method: 'PATCH',
      body,
      ...options,
    }),

  /**
   * Perform a DELETE request.
   */
  delete: (endpoint, options) =>
    serverFetch(endpoint, {
      method: 'DELETE',
      ...options,
    }),
};