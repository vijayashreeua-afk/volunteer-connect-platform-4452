import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * PUBLIC_INTERFACE
 * EmptyState displays a friendly message and optional action when no data is present.
 */
export default function EmptyState({ title = 'Nothing here yet', description = 'Try adjusting filters or come back later.', actionText, onAction }) {
  const titleId = React.useId();
  const descId = React.useId();
  return (
    <div className="card" style={{ textAlign: 'center', padding: 24 }} role="region" aria-labelledby={titleId} aria-describedby={descId}>
      <div style={{ fontSize: 36, marginBottom: 8 }} aria-hidden="true">🌊</div>
      <div className="card-title" id={titleId}>{title}</div>
      <div className="card-subtitle" style={{ marginBottom: 12 }} id={descId}>{description}</div>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction} aria-label={actionText}>{actionText}</Button>
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
