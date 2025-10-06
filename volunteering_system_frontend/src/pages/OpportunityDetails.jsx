import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * Opportunity details scaffold page.
 */
export default function OpportunityDetails() {
  const { id } = useParams();

  return (
    <Card title={`Opportunity #${id}`} subtitle="Details">
      <p>Placeholder for detailed information about the selected opportunity.</p>
      <div className="section">
        <Button variant="primary">Register</Button>
        <span style={{ marginLeft: 8 }} />
        <Button variant="secondary">Save</Button>
      </div>
    </Card>
  );
}
