import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { profileApi } from '../services/profileApi';
import { ApiError } from '../services/apiClient';
import { useAuth } from '../state/authContext';

/**
 * PUBLIC_INTERFACE
 * Dashboard loads user-centric data panels.
 */
export default function Dashboard() {
  const { handleAuthError } = useAuth();
  const [history, setHistory] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const [h, s] = await Promise.all([profileApi.history(), profileApi.saved()]);
        if (!mounted) return;
        setHistory(Array.isArray(h) ? h : (h?.items ?? []));
        setSaved(Array.isArray(s) ? s : (s?.items ?? []));
      } catch (e) {
        if (e instanceof ApiError && e.code === 'AUTH_401') handleAuthError();
        if (mounted) setErr(e?.message || 'Failed to load dashboard');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [handleAuthError]);

  const totalHours = history.reduce((acc, it) => acc + (it.hours || 0), 0);

  return (
    <div className="grid grid-3">
      <Card title="Upcoming" subtitle="Your next events">
        {loading ? <Loader /> : err ? (
          <div className="card-subtitle" style={{ color: 'var(--color-error)' }}>{err}</div>
        ) : history.length === 0 ? (
          <p className="text-muted">No upcoming events yet.</p>
        ) : (
          <ul>
            {history.slice(0, 3).map((it) => (
              <li key={it.id}>{it.title} • {it.date || ''}</li>
            ))}
          </ul>
        )}
      </Card>
      <Card title="Saved" subtitle="Bookmarked opportunities">
        {loading ? <Loader /> : saved.length === 0 ? (
          <p className="text-muted">You haven't saved any items.</p>
        ) : (
          <ul>
            {saved.slice(0, 3).map((it) => (
              <li key={it.id}>{it.title}</li>
            ))}
          </ul>
        )}
      </Card>
      <Card title="Stats" subtitle="Hours and impact">
        {loading ? <Loader /> : (
          <p className="text-muted">{totalHours} total hours logged.</p>
        )}
      </Card>
    </div>
  );
}
