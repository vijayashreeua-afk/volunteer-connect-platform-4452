import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { opportunitiesApi } from '../services/opportunitiesApi';
import { ApiError } from '../services/apiClient';
import { useAuth } from '../state/authContext';

/**
 * PUBLIC_INTERFACE
 * Opportunity details page with data fetch and actions.
 */
export default function OpportunityDetails() {
  const { id } = useParams();
  const { isAuthenticated, handleAuthError } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [actionMsg, setActionMsg] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await opportunitiesApi.getById(id);
        if (mounted) setItem(data);
      } catch (e) {
        if (e instanceof ApiError && e.code === 'AUTH_401') {
          handleAuthError();
        }
        if (mounted) setError(e?.message || 'Failed to load opportunity');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id, handleAuthError]);

  const onRegister = async () => {
    setRegistering(true);
    setActionMsg(null);
    try {
      await opportunitiesApi.register(id);
      setActionMsg('Registered successfully.');
    } catch (e) {
      if (e instanceof ApiError && e.code === 'AUTH_401') handleAuthError();
      setActionMsg(e?.message || 'Failed to register');
    } finally {
      setRegistering(false);
    }
  };

  const onSave = async () => {
    setSaving(true);
    setActionMsg(null);
    try {
      await opportunitiesApi.save(id);
      setActionMsg('Saved to your list.');
    } catch (e) {
      if (e instanceof ApiError && e.code === 'AUTH_401') handleAuthError();
      setActionMsg(e?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <Card title="Error" subtitle="Unable to fetch details">
        <div className="card-subtitle" style={{ color: 'var(--color-error)' }}>{error}</div>
      </Card>
    );
  }

  if (!item) {
    return (
      <Card title="Not found" subtitle="No details available">
        <div className="text-muted">This opportunity may have been removed.</div>
      </Card>
    );
  }

  return (
    <Card title={item.title || `Opportunity #${id}`} subtitle={item.category || 'Details'}>
      <p className="text-muted">{item.description || 'No description provided.'}</p>
      <div className="section">
        <Button variant="primary" disabled={!isAuthenticated || registering} onClick={onRegister} aria-label="Register for opportunity">
          {registering ? 'Registering...' : 'Register'}
        </Button>
        <span style={{ marginLeft: 8 }} />
        <Button variant="secondary" disabled={!isAuthenticated || saving} onClick={onSave} aria-label="Save opportunity">
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>
      {actionMsg && (
        <div className="section">
          <span className="card-subtitle">{actionMsg}</span>
        </div>
      )}
    </Card>
  );
}
