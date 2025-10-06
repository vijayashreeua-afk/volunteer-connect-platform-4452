import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../state/authContext';
import { useNavigate, Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Login scaffold. Uses AuthContext to simulate login and persist token.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    login({ token: 'mock-token', user: { email } });
    navigate('/dashboard');
  };

  return (
    <Card title="Login" subtitle="Access your account">
      <form onSubmit={onSubmit}>
        <div className="section">
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="section">
          <label>Password</label>
          <input className="input" type="password" placeholder="••••••••" />
        </div>
        <div className="section-lg">
          <Button variant="primary" type="submit">Login</Button>
        </div>
        <p className="text-muted">Don&apos;t have an account? <Link to="/register">Register</Link></p>
      </form>
    </Card>
  );
}
