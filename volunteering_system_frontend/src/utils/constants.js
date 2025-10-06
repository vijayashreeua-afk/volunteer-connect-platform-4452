 /**
  * PUBLIC_INTERFACE
  * Global constants and placeholders for future configuration.
  */
export const APP_NAME = 'Volunteer Connect';

export const ROUTES = {
  HOME: '/',
  OPPORTUNITIES: '/opportunities',
  OPPORTUNITY_DETAILS: (id = ':id') => `/opportunities/${id}`,
  CREATE: '/create',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ORGANIZATIONS: '/organizations',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const THEME = {
  PRIMARY: '#2563EB',
  SECONDARY: '#F59E0B',
  ERROR: '#EF4444',
  BACKGROUND: '#f9fafb',
  SURFACE: '#ffffff',
  TEXT: '#111827',
};

// PUBLIC_INTERFACE
export const API = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000',
};
