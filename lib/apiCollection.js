/**
 * =======================================================
 * API ROUTE COLLECTION
 * =======================================================
 *
 * Centralized API endpoint registry for the entire app.
 *
 * PURPOSE
 * -------------------------------------------------------
 * Keeps all backend routes in one place instead of
 * splitting them across multiple endpoint files.
 *
 * BENEFITS
 * -------------------------------------------------------
 * Single source of truth
 * Easier route refactoring
 * Better autocomplete
 * Prevents hardcoded strings
 * Cleaner imports
 *
 * USAGE
 * -------------------------------------------------------
 *
 * apiClient.get(API.users.list)
 *
 * apiClient.get(
 *   API.users.getById(userId)
 * )
 *
 * apiClient.post(
 *   API.auth.login,
 *   credentials
 * )
 *
 * =======================================================
 */

export const API = {
    /**
     * =====================================================
     * Authentication Routes
     * =====================================================
     */
    auth: {
        /** POST /auth/login */
        login: '/auth/login',

        /** POST /auth/logout */
        logout: '/auth/logout',

        /** POST /auth/register */
        register: '/auth/register',

        /** GET /auth/me */
        me: '/auth/me',

        /** POST /auth/refresh */
        refresh: '/auth/refresh',
    },

    /**
     * =====================================================
     * User Routes
     * =====================================================
     */
    users: {
        /** GET /users */
        list: '/users',

        /** GET /users/:id */
        getById: (id) => `/users/${id}`,

        /** POST /users */
        create: '/users',

        /** PATCH /users/:id */
        update: (id) => `/users/${id}`,

        /** DELETE /users/:id */
        delete: (id) => `/users/${id}`,

        /** GET /users/me */
        me: '/users/me',
    }
};