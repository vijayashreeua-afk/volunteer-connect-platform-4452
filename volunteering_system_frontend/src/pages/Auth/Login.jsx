import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../state/authContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Login form integrates with AuthContext.login which calls the API.
 * After success, redirects to the intended route (from location.state) or /dashboard.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from || '/dashboard';

  const [successMsg, setSuccessMsg] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg(null);
    try {
      await login({ email, password });
      setSuccessMsg('Login successful. Redirecting...');
      setTimeout(() => navigate(returnTo, { replace: true }), 400);
    } catch {
      // error handled in context; no-op
    }
  };

  return (
    <Card title="Login" subtitle="Access your account">
      <form onSubmit={onSubmit}>
        <div className="section">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className="input"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="section">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            className="input"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        {error && <div className="card-subtitle" style={{ color: 'var(--color-error)' }}>{error}</div>}
        {successMsg && <div className="card-subtitle">{successMsg}</div>}
        <div className="section-lg">
          <Button variant="primary" type="submit" disabled={loading} aria-label="Submit login form">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
        <p className="text-muted">
          Don't have an account? <Link to="/register" state={{ from: returnTo }}>Register</Link>
        </p>
      </form>
    </Card>
  );
}
