import {
    apiServer,
    cachedGet,
} from '../serverMiddleware';

import { USER_ENDPOINTS } from '../endpoints/userEndpoints';

import {
    User,
    CreateUserPayload,
    UpdateUserPayload,
} from '@/lib/types/User';

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
        cachedGet<User[]>(
            USER_ENDPOINTS.list,
            ['users']
        ),

    /**
     * Cached SSR fetch for single user.
     */
    getById: (id: string) =>
        cachedGet<User>(
            USER_ENDPOINTS.getById(id),
            [`user-${id}`]
        ),

    /**
     * Create new user.
     */
    create: (payload: CreateUserPayload) =>
        apiServer.post<User>(
            USER_ENDPOINTS.create,
            payload
        ),

    /**
     * Update existing user.
     */
    update: (
        id: string,
        payload: UpdateUserPayload
    ) =>
        apiServer.patch<User>(
            USER_ENDPOINTS.update(id),
            payload
        ),

    /**
     * Delete user.
     */
    remove: (id: string) =>
        apiServer.delete<{ success: boolean }>(
            USER_ENDPOINTS.delete(id)
        ),
};