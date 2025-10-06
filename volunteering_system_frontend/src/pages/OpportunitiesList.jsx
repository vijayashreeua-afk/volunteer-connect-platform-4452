import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Opportunities list scaffold with placeholder content.
 */
export default function OpportunitiesList() {
  const navigate = useNavigate();

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Opportunities</div>
            <div className="card-subtitle">Browse available events</div>
          </div>
          <Button variant="primary" onClick={() => navigate('/create')}>Create Opportunity</Button>
        </div>
        <div className="spacing" />
        <EmptyState
          title="No opportunities yet"
          description="Create the first opportunity to get started."
          actionText="Create Opportunity"
          onAction={() => navigate('/create')}
        />
      </div>

      <div className="grid grid-3">
        <Card title="Sample Beach Cleanup" subtitle="Community • 2h">
          <Button variant="secondary" onClick={() => navigate('/opportunities/1')}>View Details</Button>
        </Card>
        <Card title="Food Drive Support" subtitle="Organization • 4h">
          <Button variant="secondary" onClick={() => navigate('/opportunities/2')}>View Details</Button>
        </Card>
        <Card title="Park Tree Planting" subtitle="Environment • 3h">
          <Button variant="secondary" onClick={() => navigate('/opportunities/3')}>View Details</Button>
        </Card>
      </div>
    </div>
  );
}
