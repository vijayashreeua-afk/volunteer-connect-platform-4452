import React from 'react';
import Card from '../components/common/Card';

/**
 * PUBLIC_INTERFACE
 * Dashboard scaffold for authenticated users.
 */
export default function Dashboard() {
  return (
    <div className="grid grid-3">
      <Card title="Upcoming" subtitle="Your next events">
        <p className="text-muted">No upcoming events yet.</p>
      </Card>
      <Card title="Activity" subtitle="Recent participation">
        <p className="text-muted">No recent activity.</p>
      </Card>
      <Card title="Stats" subtitle="Hours and impact">
        <p className="text-muted">0 total hours logged.</p>
      </Card>
    </div>
  );
}
