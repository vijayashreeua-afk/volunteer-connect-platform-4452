import { apiClient } from './apiClient';

/**
 * PUBLIC_INTERFACE
 * Opportunities API functions with CRUD and user actions.
 */
export const opportunitiesApi = {
  /** List opportunities with optional query params (e.g., ?search=&page=) */
  list: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const path = query ? `/opportunities?${query}` : '/opportunities';
    return apiClient.get(path);
  },
  /** Retrieve opportunity by id */
  getById: async (id) => apiClient.get(`/opportunities/${id}`),
  /** Create new opportunity (org/admin only) */
  create: async (payload) => apiClient.post('/opportunities', payload),
  /** Update opportunity */
  update: async (id, payload) => apiClient.put(`/opportunities/${id}`, payload),
  /** Delete opportunity */
  remove: async (id) => apiClient.del(`/opportunities/${id}`),
  /** Register current user to an opportunity */
  register: async (id) => apiClient.post(`/opportunities/${id}/register`, {}),
  /** Save/bookmark an opportunity */
  save: async (id) => apiClient.post(`/opportunities/${id}/save`, {}),
  /** Unsave a saved opportunity */
  unsave: async (id) => apiClient.del(`/opportunities/${id}/save`),
};
