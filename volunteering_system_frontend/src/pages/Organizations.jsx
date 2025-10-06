import React from 'react';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';

/**
 * PUBLIC_INTERFACE
 * Organizations scaffold page.
 */
export default function Organizations() {
  return (
    <Card title="Organizations" subtitle="Discover and follow">
      <EmptyState title="No organizations found" description="Once organizations are added, they'll appear here." />
    </Card>
  );
}
