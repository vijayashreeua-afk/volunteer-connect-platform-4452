import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Button component supporting primary, secondary, and ghost variants.
 */
export default function Button({ children, variant = 'primary', className = '', ...rest }) {
  const classes = ['btn'];
  if (variant === 'primary') classes.push('btn-primary');
  if (variant === 'secondary') classes.push('btn-secondary');
  if (variant === 'ghost') classes.push('btn-ghost');

  return (
    <button className={`${classes.join(' ')} ${className}`} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  className: PropTypes.string,
};
