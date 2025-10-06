import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { profileApi } from '../services/profileApi';
import { ApiError } from '../services/apiClient';
import { useAuth } from '../state/authContext';

/**
 * PUBLIC_INTERFACE
 * Profile page integrates with backend to load and update user profile.
 */
export default function Profile() {
  const { handleAuthError } = useAuth();
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [savedMsg, setSavedMsg] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await profileApi.get();
        if (!mounted) return;
        setForm({ name: data?.name || '', email: data?.email || '' });
      } catch (e) {
        if (e instanceof ApiError && e.code === 'AUTH_401') handleAuthError();
        if (mounted) setError(e?.message || 'Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [handleAuthError]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg(null);
    setError(null);
    try {
      await profileApi.update(form);
      setSavedMsg('Profile updated');
    } catch (e2) {
      if (e2 instanceof ApiError && e2.code === 'AUTH_401') handleAuthError();
      setError(e2?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Your Profile" subtitle="Manage your information">
      {loading ? <Loader /> : (
        <form onSubmit={onSave}>
          <div className="section">
            <label htmlFor="profile-name">Name</label>
            <input id="profile-name" className="input" name="name" value={form.name} onChange={onChange} placeholder="Your name" />
          </div>
          <div className="section">
            <label htmlFor="profile-email">Email</label>
            <input id="profile-email" className="input" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
          </div>
          {error && <div className="card-subtitle" style={{ color: 'var(--color-error)' }}>{error}</div>}
          {savedMsg && <div className="card-subtitle">{savedMsg}</div>}
          <div className="section-lg">
            <Button variant="primary" type="submit" disabled={saving} aria-label="Save profile">{saving ? 'Saving...' : 'Save'}</Button>
          </div>
        </form>
      )}
    </Card>
  );
}
