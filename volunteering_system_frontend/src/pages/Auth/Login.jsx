import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../state/authContext';
import { useNavigate, Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Login form integrates with AuthContext.login which calls the API.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch {
      // error handled in context; no-op
    }
  };

  return (
    <Card title="Login" subtitle="Access your account">
      <form onSubmit={onSubmit}>
        <div className="section">
          <label>Email</label>
          <input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="section">
          <label>Password</label>
          <input className="input" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        {error && <div className="card-subtitle" style={{ color: 'var(--color-error)' }}>{error}</div>}
        <div className="section-lg">
          <Button variant="primary" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
        </div>
        <p className="text-muted">Don&apos;t have an account? <Link to="/register">Register</Link></p>
      </form>
    </Card>
  );
}
