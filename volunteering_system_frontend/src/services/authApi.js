import { apiClient } from './apiClient';

/**
 * PUBLIC_INTERFACE
 * Auth API placeholder functions.
 */
export const authApi = {
  login: async (payload) => apiClient.post('/auth/login', payload),
  register: async (payload) => apiClient.post('/auth/register', payload),
  me: async () => apiClient.get('/auth/me'),
};
