import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * Create Opportunity scaffold form.
 */
export default function CreateOpportunity() {
  return (
    <Card title="Create Opportunity" subtitle="Provide basic details">
      <div className="section">
        <label>Title</label>
        <input className="input" placeholder="Beach Cleanup" />
      </div>
      <div className="section">
        <label>Description</label>
        <textarea className="textarea" rows="4" placeholder="Describe the opportunity..." />
      </div>
      <div className="section">
        <label>Category</label>
        <select className="select">
          <option>Environment</option>
          <option>Community</option>
          <option>Education</option>
        </select>
      </div>
      <div className="section-lg">
        <Button variant="primary">Save</Button>
        <span style={{ marginLeft: 8 }} />
        <Button variant="secondary">Cancel</Button>
      </div>
    </Card>
  );
}
