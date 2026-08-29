/**
 * Product-related API endpoints.
 */
export const PRODUCT_ENDPOINTS = {
    /** GET /products */
    list: '/products',

    listPaginated: '/products/paginated',

    /** GET /users/:id */
    getById: (id) => `/products/${id}`,

    /** POST /users */
    create: '/products',

    /** PUT /users/:id */
    update: (id) => `/products/${id}`,

    /** DELETE /users/:id */
    delete: (id) => `/products/${id}`,
};