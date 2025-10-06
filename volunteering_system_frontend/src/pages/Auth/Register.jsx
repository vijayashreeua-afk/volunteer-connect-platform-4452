import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/authContext';

/**
 * PUBLIC_INTERFACE
 * Register page integrates with AuthContext.register which calls the API.
 */
export default function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      const res = await register(form);
      // If token returned, user is logged in; otherwise show success message
      if (res?.token || res?.accessToken) {
        navigate('/dashboard');
      } else {
        setSuccess(true);
      }
    } catch {
      // error displayed from context
    }
  };

  return (
    <Card title="Register" subtitle="Create your account">
      <form onSubmit={onSubmit}>
        <div className="section">
          <label>Name</label>
          <input className="input" name="name" value={form.name} onChange={onChange} placeholder="Your name" required />
        </div>
        <div className="section">
          <label>Email</label>
          <input className="input" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
        </div>
        <div className="section">
          <label>Password</label>
          <input className="input" name="password" type="password" value={form.password} onChange={onChange} placeholder="••••••••" required />
        </div>
        {error && <div className="card-subtitle" style={{ color: 'var(--color-error)' }}>{error}</div>}
        {success && <div className="card-subtitle">Registration successful. You may now log in.</div>}
        <div className="section-lg">
          <Button variant="primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</Button>
        </div>
        <p className="text-muted">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </Card>
  );
}
