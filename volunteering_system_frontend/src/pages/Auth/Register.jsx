import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Register scaffold page.
 */
export default function Register() {
  return (
    <Card title="Register" subtitle="Create your account">
      <div className="section">
        <label>Name</label>
        <input className="input" placeholder="Your name" />
      </div>
      <div className="section">
        <label>Email</label>
        <input className="input" type="email" placeholder="you@example.com" />
      </div>
      <div className="section">
        <label>Password</label>
        <input className="input" type="password" placeholder="••••••••" />
      </div>
      <div className="section-lg">
        <Button variant="primary">Create Account</Button>
      </div>
      <p className="text-muted">Already have an account? <Link to="/login">Login</Link></p>
    </Card>
  );
}
