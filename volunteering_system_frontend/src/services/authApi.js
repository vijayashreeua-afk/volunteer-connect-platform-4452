import { apiClient } from './apiClient';

/**
 * PUBLIC_INTERFACE
 * Auth API functions using assumed backend endpoints.
 */
export const authApi = {
  /** Login with email/password; returns { token, user } */
  login: async (payload) => apiClient.post('/auth/login', payload),
  /** Register a user; returns { token, user } or { user } depending on backend */
  register: async (payload) => apiClient.post('/auth/register', payload),
  /** Get current user profile */
  me: async () => apiClient.get('/auth/me'),
  /** Logout endpoint if backend supports it */
  logout: async () => apiClient.post('/auth/logout', {}),
  /** Refresh token if supported */
  refresh: async () => apiClient.post('/auth/refresh', {}),
};
