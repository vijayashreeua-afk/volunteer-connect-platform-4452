import { apiClient } from './apiClient';

/**
 * PUBLIC_INTERFACE
 * Organizations API functions.
 */
export const organizationsApi = {
  /** List organizations */
  list: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const path = query ? `/organizations?${query}` : '/organizations';
    return apiClient.get(path);
  },
  /** Get single organization */
  getById: async (id) => apiClient.get(`/organizations/${id}`),
  /** Follow an organization */
  follow: async (id) => apiClient.post(`/organizations/${id}/follow`, {}),
  /** Unfollow an organization */
  unfollow: async (id) => apiClient.del(`/organizations/${id}/follow`),
};
