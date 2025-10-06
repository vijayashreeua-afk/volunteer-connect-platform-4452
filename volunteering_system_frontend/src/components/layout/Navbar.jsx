import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useTheme } from '../../state/uiTheme';
import { useAuth } from '../../state/authContext';

/**
 * PUBLIC_INTERFACE
 * Navbar provides top navigation with primary routes, theme toggle, and auth actions.
 */
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="brand">
        <span className="brand-badge">VC</span>
        Volunteer Connect
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">Home</NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/opportunities">Opportunities</NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/organizations">Organizations</NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/dashboard">Dashboard</NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/profile">Profile</NavLink>
      </nav>

      <div className="nav-actions">
        <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
        {!isAuthenticated ? (
          <>
            <Button variant="secondary" onClick={() => navigate('/login')}>Login</Button>
            <Button variant="primary" onClick={() => navigate('/register')}>Register</Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleLogout}>Logout</Button>
        )}
      </div>
    </>
  );
}
