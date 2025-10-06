import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Button component supporting primary, secondary, and ghost variants.
 * Provides accessible defaults (type="button") and forwards ref.
 */
const Button = React.forwardRef(function Button(
  { children, variant = 'primary', className = '', type, ...rest },
  ref
) {
  const classes = ['btn'];
  if (variant === 'primary') classes.push('btn-primary');
  if (variant === 'secondary') classes.push('btn-secondary');
  if (variant === 'ghost') classes.push('btn-ghost');

  const finalType = type || 'button';

  return (
    <button ref={ref} type={finalType} className={`${classes.join(' ')} ${className}`} {...rest}>
      {children}
    </button>
  );
});

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
