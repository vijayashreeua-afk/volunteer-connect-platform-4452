import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Card component for surface blocks with header/body slots.
 */
export default function Card({ title, subtitle, action, children, className = '' }) {
  const headingId = React.useId();
  const subId = React.useId();
  const labelledBy = title ? headingId : undefined;
  const describedBy = subtitle ? subId : undefined;

  return (
    <section className={`card ${className}`} aria-labelledby={labelledBy} aria-describedby={describedBy}>
      {(title || subtitle || action) && (
        <header className="card-header">
          <div>
            {title && <div className="card-title" id={headingId}>{title}</div>}
            {subtitle && <div className="card-subtitle" id={subId}>{subtitle}</div>}
          </div>
          {action && <div>{action}</div>}
        </header>
      )}
      <div className="card-body">
        {children}
      </div>
    </section>
  );
}

Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  action: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};
