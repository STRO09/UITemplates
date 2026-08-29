import { apiServer, cachedGet } from "../serverMiddleware";

import { PRODUCT_ENDPOINTS } from "../endpoints/productEndpoints";

/**
 * Server-side user API.
 *
 * Use for:
 * - Server Components
 * - SSR data fetching
 * - protected routes
 * - layouts
 * - Server Actions
 *
 * Features:
 * - cookie forwarding
 * - SSR-safe auth
 * - caching
 * - revalidation
 * - request deduplication
 *
 * NEVER import into Client Components.
 */
export const productServerApi = {
  /**
   * Cached SSR fetch for all users.
   */
  getAll: () => cachedGet(PRODUCT_ENDPOINTS.list, ["products"]),

  getAllPaginated: ({ page = 1, limit = 10 } = {}) =>
    cachedGet(
      `${PRODUCT_ENDPOINTS.listPaginated}?page=${page}&limit=${limit}`,
      ["products"],
    ),

  /**
   * Cached SSR fetch for single user.
   */
  // getById: (id) =>
  //     cachedGet(
  //         USER_ENDPOINTS.getById(id),
  //         [`user-${id}`]
  //     ),

  // /**
  //  * Create new user.
  //  */
  // create: (payload) =>
  //     apiServer.post(
  //         USER_ENDPOINTS.create,
  //         payload
  //     ),

  // /**
  //  * Update existing user.
  //  */
  // update: (
  //     id,
  //     payload
  // ) =>
  //     apiServer.patch(
  //         USER_ENDPOINTS.update(id),
  //         payload
  //     ),

  // /**
  //  * Delete user.
  //  */
  // remove: (id) =>
  //     apiServer.delete(
  //         USER_ENDPOINTS.delete(id)
  //     ),
};
