import { apiClient } from './apiClient';

/**
 * PUBLIC_INTERFACE
 * Organizations API placeholder functions.
 */
export const organizationsApi = {
  list: async () => apiClient.get('/organizations'),
  follow: async (id) => apiClient.post(`/organizations/${id}/follow`),
};
