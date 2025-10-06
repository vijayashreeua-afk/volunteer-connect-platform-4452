import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Card component for surface blocks with header/body slots.
 */
export default function Card({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || action) && (
        <div className="card-header">
          <div>
            {title && <div className="card-title">{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  action: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};
