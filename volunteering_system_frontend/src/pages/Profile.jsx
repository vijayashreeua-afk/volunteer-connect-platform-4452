import React from 'react';
import Card from '../components/common/Card';

/**
 * PUBLIC_INTERFACE
 * Profile scaffold page.
 */
export default function Profile() {
  return (
    <Card title="Your Profile" subtitle="Manage your information">
      <div className="section">
        <label>Name</label>
        <input className="input" placeholder="Alex Volunteer" />
      </div>
      <div className="section">
        <label>Email</label>
        <input className="input" placeholder="alex@example.com" />
      </div>
    </Card>
  );
}
