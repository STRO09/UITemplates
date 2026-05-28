import {
    apiServer,
    cachedGet,
} from '../serverMiddleware';

import { USER_ENDPOINTS } from '../endpoints/userEndpoints';


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
export const userServerApi = {
    /**
     * Cached SSR fetch for all users.
     */
    getAll: () =>
        cachedGet(
            USER_ENDPOINTS.list,
            ['users']
        ),

    /**
     * Cached SSR fetch for single user.
     */
    getById: (id) =>
        cachedGet(
            USER_ENDPOINTS.getById(id),
            [`user-${id}`]
        ),

    /**
     * Create new user.
     */
    create: (payload) =>
        apiServer.post(
            USER_ENDPOINTS.create,
            payload
        ),

    /**
     * Update existing user.
     */
    update: (
        id,
        payload
    ) =>
        apiServer.patch(
            USER_ENDPOINTS.update(id),
            payload
        ),

    /**
     * Delete user.
     */
    remove: (id) =>
        apiServer.delete(
            USER_ENDPOINTS.delete(id)
        ),
};