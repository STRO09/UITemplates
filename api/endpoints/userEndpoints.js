/**
 * User-related API endpoints.
 */
export const USER_ENDPOINTS = {
    /** GET /users */
    list: '/users',

    /** GET /users/:id */
    getById: (id) => `/users/${id}`,

    /** POST /users */
    create: '/users',

    /** PUT /users/:id */
    update: (id) => `/users/${id}`,

    /** DELETE /users/:id */
    delete: (id) => `/users/${id}`,
};