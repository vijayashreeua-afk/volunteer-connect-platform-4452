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
```

Explanation: Create utils/validators.js
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/utils/validators.js"
 /**
  * PUBLIC_INTERFACE
  * Simple validator helpers.
  */
export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').toLowerCase());
}

export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}
