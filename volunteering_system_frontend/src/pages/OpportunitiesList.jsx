import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import { opportunitiesApi } from '../services/opportunitiesApi';
import { ApiError } from '../services/apiClient';
import { useAuth } from '../state/authContext';

/**
 * PUBLIC_INTERFACE
 * Opportunities list page fetching data from API with loading/empty/error states.
 */
export default function OpportunitiesList() {
  const navigate = useNavigate();
  const { handleAuthError } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await opportunitiesApi.list();
        // Accept either {items: []} or [] shape
        const list = Array.isArray(data) ? data : (data?.items ?? []);
        if (mounted) setItems(list);
      } catch (e) {
        if (e instanceof ApiError && e.code === 'AUTH_401') {
          handleAuthError();
        }
        if (mounted) setError(e?.message || 'Failed to load opportunities');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, [handleAuthError]);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Opportunities</div>
            <div className="card-subtitle">Browse available events</div>
          </div>
          <Button variant="primary" onClick={() => navigate('/create')} aria-label="Create a new opportunity">Create Opportunity</Button>
        </div>
        <div className="spacing" />
        {loading && <Loader />}
        {!loading && error && (
          <div className="card-subtitle" style={{ color: 'var(--color-error)' }}>{error}</div>
        )}
        {!loading && !error && items.length === 0 && (
          <EmptyState
            title="No opportunities yet"
            description="Create the first opportunity to get started."
            actionText="Create Opportunity"
            onAction={() => navigate('/create')}
          />
        )}
      </div>

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-3">
          {items.map((it) => (
            <Card key={it.id} title={it.title} subtitle={`${it.category || it.type || 'General'} • ${it.duration || ''}`}>
              <Button variant="secondary" onClick={() => navigate(`/opportunities/${it.id}`)} aria-label={`View details for ${it.title}`}>View Details</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
