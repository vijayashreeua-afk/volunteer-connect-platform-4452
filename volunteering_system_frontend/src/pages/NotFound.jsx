import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NotFound page for unmatched routes.
 */
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Card title="Page not found" subtitle="The page you are looking for doesn't exist.">
      <Button variant="secondary" onClick={() => navigate('/')}>Go Home</Button>
    </Card>
  );
}
