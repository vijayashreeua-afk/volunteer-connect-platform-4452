import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { authApi } from '../services/authApi';

const AuthContext = createContext(null);

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  hydrated: false, // indicates we tried to restore session
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, token: action.payload.token, user: action.payload.user, error: null };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ME_SUCCESS':
      return { ...state, user: action.payload.user ?? action.payload, token: state.token ?? action.payload.token ?? state.token, error: null, hydrated: true };
    case 'HYDRATE_DONE':
      return { ...state, hydrated: true };
    case 'LOGOUT':
      return { token: null, user: null, loading: false, error: null, hydrated: true };
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps the app and provides auth state with localStorage persistence.
 * It initializes by loading token from localStorage and attempts to fetch current user (/auth/me).
 * On 401, it clears session. Exposes actions that return promises for redirect flows.
 */
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem('vc_auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...init, token: parsed?.token ?? null, user: parsed?.user ?? null, loading: false, error: null };
      }
    } catch {
      // ignore
    }
    return init;
  });

  // Persist token/user
  useEffect(() => {
    try {
      localStorage.setItem('vc_auth', JSON.stringify({ token: state.token, user: state.user }));
    } catch {
      // ignore write failures
    }
  }, [state.token, state.user]);

  // Hydrate / fetch current user on app load if token exists
  useEffect(() => {
    let cancelled = false;
    async function hydrate() {
      if (!state.token) {
        dispatch({ type: 'HYDRATE_DONE' });
        return;
      }
      try {
        const me = await authApi.me();
        if (!cancelled) {
          dispatch({ type: 'ME_SUCCESS', payload: me });
        }
      } catch (e) {
        // if unauthorized or failure, clear session
        if (!cancelled) {
          dispatch({ type: 'LOGOUT' });
        }
      }
    }
    hydrate();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return {
      ...state,
      isAuthenticated: Boolean(state.token),
      // PUBLIC_INTERFACE
      login: async ({ email, password }) => {
        dispatch({ type: 'LOGIN_START' });
        try {
          const res = await authApi.login({ email, password });
          const token = res?.token ?? res?.accessToken ?? null;
          const user = res?.user ?? null;
          if (!token) throw new Error('Missing token in response');
          dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
          // attempt to fetch current user if not present
          try {
            const me = await authApi.me();
            dispatch({ type: 'ME_SUCCESS', payload: me });
          } catch {
            // ignore me failure; session still established
          }
          return { token, user };
        } catch (err) {
          dispatch({ type: 'LOGIN_ERROR', payload: err?.message || 'Login failed' });
          throw err;
        }
      },
      // PUBLIC_INTERFACE
      register: async ({ name, email, password }) => {
        dispatch({ type: 'LOGIN_START' });
        try {
          const res = await authApi.register({ name, email, password });
          const token = res?.token ?? res?.accessToken ?? null;
          const user = res?.user ?? res ?? null;
          if (token) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
            try {
              const me = await authApi.me();
              dispatch({ type: 'ME_SUCCESS', payload: me });
            } catch {
              // ignore
            }
          } else {
            // registration succeeded but no login; clear loading and set no error
            dispatch({ type: 'LOGIN_ERROR', payload: null });
          }
          return res;
        } catch (err) {
          dispatch({ type: 'LOGIN_ERROR', payload: err?.message || 'Registration failed' });
          throw err;
        }
      },
      // PUBLIC_INTERFACE
      fetchMe: async () => {
        const me = await authApi.me();
        dispatch({ type: 'ME_SUCCESS', payload: me });
        return me;
      },
      // PUBLIC_INTERFACE
      logout: async () => {
        try { await authApi.logout(); } catch { /* ignore */ }
        dispatch({ type: 'LOGOUT' });
      },
      // PUBLIC_INTERFACE
      handleAuthError: () => {
        // Clear session immediately on 401s
        dispatch({ type: 'LOGOUT' });
      },
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
}
