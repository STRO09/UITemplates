import { apiClient } from "../clientMiddleware";
import { PRODUCT_ENDPOINTS } from "../endpoints/productEndpoints";

/**
 * Client-side user API.
 *
 * Use for:
 * - forms
 * - button actions
 * - interactive mutations
 * - browser-triggered requests
 *
 * DO NOT use in Server Components.
 */
export const productClientApi = {
  /**
   * Get all users.
   */
  getAll: () => apiClient.get(PRODUCT_ENDPOINTS.list),

  getAllPaginated: ({ page = 1, limit = 10, search } = {}) =>
    apiClient.get(
      `${PRODUCT_ENDPOINTS.listPaginated}?page=${page}&limit=${limit}`+
      (search ? `&search=${search}` : ''),
    ),

  /**
   * Get user by ID.
   */
  // getById: (id) => apiClient.get(USER_ENDPOINTS.getById(id)),

  // /**
  //  * Create new user.
  //  */
  // create: (payload) => apiClient.post(USER_ENDPOINTS.create, payload),

  // /**
  //  * Update existing user.
  //  */
  // update: (id, payload) => apiClient.patch(USER_ENDPOINTS.update(id), payload),

  // /**
  //  * Delete user.
  //  */
  // remove: (id) => apiClient.delete(USER_ENDPOINTS.delete(id)),
};
