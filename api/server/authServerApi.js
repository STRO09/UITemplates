import { apiServer, cachedGet } from "../serverMiddleware";

import { AUTH_ENDPOINTS } from "../endpoints/authEndpoints";

export const authServerApi = {

  me: () => apiServer.get(AUTH_ENDPOINTS.me),

  getAll: () => cachedGet(AUTH_ENDPOINTS.list, ["users"]),

  /**
   * Cached SSR fetch for single user.
   */
  getById: (id) => cachedGet(AUTH_ENDPOINTS.getById(id), [`user-${id}`]),
};
