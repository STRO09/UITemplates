import { apiClient } from '../clientMiddleware';
import { USER_ENDPOINTS } from '../endpoints/userEndpoints';

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
export const userClientApi = {
    /**
     * Get all users.
     */
    getAll: () =>
        apiClient.get(
            USER_ENDPOINTS.list
        ),

    /**
     * Get user by ID.
     */
    getById: (id) =>
        apiClient.get(
            USER_ENDPOINTS.getById(id)
        ),

    /**
     * Create new user.
     */
    create: (payload) =>
        apiClient.post(
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
        apiClient.patch(
            USER_ENDPOINTS.update(id),
            payload
        ),

    /**
     * Delete user.
     */
    remove: (id) =>
        apiClient.delete(
            USER_ENDPOINTS.delete(id)
        ),
};