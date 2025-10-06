import { apiClient } from './apiClient';

/**
 * PUBLIC_INTERFACE
 * Profile API functions.
 */
export const profileApi = {
  /** Get current user's profile */
  get: async () => apiClient.get('/profile'),
  /** Update profile fields */
  update: async (payload) => apiClient.put('/profile', payload),
  /** Get participation history */
  history: async () => apiClient.get('/profile/history'),
  /** Get saved/bookmarked opportunities */
  saved: async () => apiClient.get('/profile/saved'),
};
