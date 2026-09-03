import { apiClient } from "../clientMiddleware";

import { AUTH_ENDPOINTS } from "../endpoints/authEndpoints";

export const authClientApi = {
  /**
   * Authenticate user.
   */
  login: (payload) => apiClient.post(AUTH_ENDPOINTS.login, payload),

  /**
   * Register new user.
   */
  register: (payload) => apiClient.post(AUTH_ENDPOINTS.register, payload),

  /**
   * Logout current user.
   */
  logout: () => apiClient.post(AUTH_ENDPOINTS.logout),

  me: () => apiClient.get(AUTH_ENDPOINTS.me),

  getAll: () => apiClient.get(AUTH_ENDPOINTS.list, { tags: "users" }),

  /**
   * Cached SSR fetch for single user.
   */
  getById: (id) =>
    apiClient.get(AUTH_ENDPOINTS.getById(id), { tags: `user-${id}` }),
};
