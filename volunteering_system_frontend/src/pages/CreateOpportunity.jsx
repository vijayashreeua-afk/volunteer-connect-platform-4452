import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { opportunitiesApi } from '../services/opportunitiesApi';
import { ApiError } from '../services/apiClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/authContext';

/**
 * PUBLIC_INTERFACE
 * Create Opportunity form posting to backend.
 * On success, shows an inline success message briefly then redirects to details or list.
 */
export default function CreateOpportunity() {
  const navigate = useNavigate();
  const { isAuthenticated, handleAuthError } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Environment');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const created = await opportunitiesApi.create({ title, description, category });
      const id = created?.id || created?._id;
      setSuccessMsg('Opportunity created successfully. Redirecting...');
      setTimeout(() => {
        if (id) navigate(`/opportunities/${id}`, { replace: true });
        else navigate('/opportunities', { replace: true });
      }, 500);
    } catch (e2) {
      if (e2 instanceof ApiError && e2.code === 'AUTH_401') handleAuthError();
      setError(e2?.message || 'Failed to create opportunity');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Create Opportunity" subtitle="Provide basic details">
      {!isAuthenticated && (
        <div className="card-subtitle" style={{ color: 'var(--color-error)' }}>
          You must be logged in to create opportunities.
        </div>
      )}
      <form onSubmit={onSave}>
        <div className="section">
          <label htmlFor="opp-title">Title</label>
          <input id="opp-title" className="input" placeholder="Beach Cleanup" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="section">
          <label htmlFor="opp-desc">Description</label>
          <textarea id="opp-desc" className="textarea" rows="4" placeholder="Describe the opportunity..." value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="section">
          <label htmlFor="opp-category">Category</label>
          <select id="opp-category" className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Environment</option>
            <option>Community</option>
            <option>Education</option>
          </select>
        </div>
        {error && <div className="card-subtitle" style={{ color: 'var(--color-error)' }}>{error}</div>}
        {successMsg && <div className="card-subtitle">{successMsg}</div>}
        <div className="section-lg">
          <Button variant="primary" type="submit" disabled={!isAuthenticated || saving} aria-label="Save opportunity">
            {saving ? <Loader /> : 'Save'}
          </Button>
          <span style={{ marginLeft: 8 }} />
          <Button variant="secondary" type="button" onClick={() => navigate('/opportunities')} disabled={saving} aria-label="Cancel and go back">Cancel</Button>
        </div>
      </form>
    </Card>
  );
}
