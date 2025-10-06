import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Footer shows minimal site info.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="container" role="contentinfo" aria-label="Site footer">
      <span>© {year} Volunteer Connect • Built with Ocean Professional Theme</span>
    </div>
  );
}
