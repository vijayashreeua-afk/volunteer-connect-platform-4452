import { apiClient } from './apiClient';

/**
 * PUBLIC_INTERFACE
 * Opportunities API placeholder functions.
 */
export const opportunitiesApi = {
  list: async () => apiClient.get('/opportunities'),
  getById: async (id) => apiClient.get(`/opportunities/${id}`),
  create: async (payload) => apiClient.post('/opportunities', payload),
};
