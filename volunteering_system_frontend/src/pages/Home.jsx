import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Home page introducing the app.
 */
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card
        title="Welcome to Volunteer Connect"
        subtitle="Find opportunities and make an impact"
        action={<Button variant="primary" onClick={() => navigate('/opportunities')}>Browse Opportunities</Button>}
      >
        <p className="text-muted">Ocean Professional theme applied. This is a scaffold page.</p>
      </Card>

      <div className="grid grid-3">
        <Card title="Discover" subtitle="Explore events near you">
          <p>Search and filter volunteering events tailored to your interests.</p>
        </Card>
        <Card title="Participate" subtitle="Join with ease">
          <p>Register quickly and track your participation history.</p>
        </Card>
        <Card title="Connect" subtitle="Organizations and communities">
          <p>Follow organizations and stay updated on upcoming opportunities.</p>
        </Card>
      </div>
    </div>
  );
}
