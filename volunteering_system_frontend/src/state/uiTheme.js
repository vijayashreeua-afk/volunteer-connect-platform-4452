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
      // ignore write errors
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
