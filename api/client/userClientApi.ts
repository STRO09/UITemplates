import { apiClient } from '../clientMiddleware';
import { USER_ENDPOINTS } from '../endpoints/userEndpoints';

import {
    User,
    CreateUserPayload,
    UpdateUserPayload,
} from '@/lib/types/User';

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
        apiClient.get<User[]>(
            USER_ENDPOINTS.list
        ),

    /**
     * Get user by ID.
     */
    getById: (id: string) =>
        apiClient.get<User>(
            USER_ENDPOINTS.getById(id)
        ),

    /**
     * Create new user.
     */
    create: (payload: CreateUserPayload) =>
        apiClient.post<User>(
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
        apiClient.patch<User>(
            USER_ENDPOINTS.update(id),
            payload
        ),

    /**
     * Delete user.
     */
    remove: (id: string) =>
        apiClient.delete<{ success: boolean }>(
            USER_ENDPOINTS.delete(id)
        ),
};