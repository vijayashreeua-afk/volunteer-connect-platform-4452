import { apiClient } from './apiClient';

/**
 * PUBLIC_INTERFACE
 * Profile API placeholder functions.
 */
export const profileApi = {
  get: async () => apiClient.get('/profile'),
  update: async (payload) => apiClient.put('/profile', payload),
};
