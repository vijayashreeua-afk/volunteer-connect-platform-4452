import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Loader displays a simple spinner.
 */
export default function Loader() {
  const size = 22;
  const style = {
    width: size,
    height: size,
    border: '3px solid rgba(37,99,235,0.2)',
    borderTopColor: 'var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 0.9s linear infinite',
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }} role="status" aria-live="polite" aria-busy="true">
      <div style={style} aria-label="Loading" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span className="text-muted">Loading...</span>
    </div>
  );
}
