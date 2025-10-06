import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * PUBLIC_INTERFACE
 * EmptyState displays a friendly message and optional action when no data is present.
 */
export default function EmptyState({ title = 'Nothing here yet', description = 'Try adjusting filters or come back later.', actionText, onAction }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: 24 }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>🌊</div>
      <div className="card-title">{title}</div>
      <div className="card-subtitle" style={{ marginBottom: 12 }}>{description}</div>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
};
