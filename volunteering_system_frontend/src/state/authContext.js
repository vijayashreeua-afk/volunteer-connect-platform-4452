import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const AuthContext = createContext(null);

const initialState = {
  token: null,
  user: null,
};

// Simple reducer placeholder to be expanded as needed
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.payload.token, user: action.payload.user };
    case 'LOGOUT':
      return { ...state, token: null, user: null };
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps the app and provides auth state with localStorage persistence.
 */
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem('vc_auth');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return init;
  });

  useEffect(() => {
    try {
      localStorage.setItem('vc_auth', JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const value = useMemo(() => {
    return {
      ...state,
      isAuthenticated: Boolean(state.token),
      // PUBLIC_INTERFACE
      login: (data) => dispatch({ type: 'LOGIN', payload: data }),
      // PUBLIC_INTERFACE
      logout: () => dispatch({ type: 'LOGOUT' }),
    };
  }, [state]);

  // Apply a data-auth attribute for potential styling or testing
  useEffect(() => {
    document.documentElement.setAttribute('data-auth', value.isAuthenticated ? 'true' : 'false');
  }, [value.isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * Hook to access auth context easily.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
```

Explanation: Create Theme context with light/dark support
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/state/uiTheme.js"
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * ThemeProvider manages light/dark theme with persistence to localStorage and data-theme attribute.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('vc_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('vc_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    // PUBLIC_INTERFACE
    toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    // PUBLIC_INTERFACE
    setTheme,
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useTheme hook to access theme context.
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

Explanation: Create services placeholders
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/services/apiClient.js"
 /**
  * PUBLIC_INTERFACE
  * apiClient placeholder. In Step 2, this will be replaced with real fetch/axios logic.
  */
export const apiClient = {
  async get(path) { return { ok: true, path, data: null }; },
  async post(path, body) { return { ok: true, path, body, data: null }; },
  async put(path, body) { return { ok: true, path, body, data: null }; },
  async del(path) { return { ok: true, path, data: null }; },
};
