import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useTheme } from '../../state/uiTheme';
import { useAuth } from '../../state/authContext';

/**
 * PUBLIC_INTERFACE
 * Navbar provides top navigation with primary routes, theme toggle, and auth actions.
 * Includes an accessible mobile menu toggle with keyboard support and ARIA states.
 */
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  // Close on Escape when menu is open
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Close when clicking outside menu on small screens
  useEffect(() => {
    function onClickOutside(e) {
      if (!menuOpen) return;
      if (menuRef.current && !menuRef.current.contains(e.target) && !toggleBtnRef.current?.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    window.addEventListener('click', onClickOutside);
    return () => window.removeEventListener('click', onClickOutside);
  }, [menuOpen]);

  const onToggleMenu = () => setMenuOpen((v) => !v);

  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <>
      <div className="brand">
        <span className="brand-badge" aria-hidden="true">VC</span>
        <span>Volunteer Connect</span>
      </div>

      {/* Mobile menu toggle */}
      <Button
        variant="secondary"
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
        ref={toggleBtnRef}
      >
        {menuOpen ? '✕' : '☰'}
      </Button>

      <nav
        id="primary-navigation"
        ref={menuRef}
        className={`nav-links ${menuOpen ? 'is-open' : ''}`}
        aria-label="Main navigation"
        role="navigation"
      >
        <NavLink className={navLinkClass} to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink className={navLinkClass} to="/opportunities" onClick={() => setMenuOpen(false)}>Opportunities</NavLink>
        <NavLink className={navLinkClass} to="/organizations" onClick={() => setMenuOpen(false)}>Organizations</NavLink>
        <NavLink className={navLinkClass} to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
        <NavLink className={navLinkClass} to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
      </nav>

      <div className="nav-actions">
        <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
        {!isAuthenticated ? (
          <>
            <Button variant="secondary" onClick={() => { navigate('/login'); setMenuOpen(false); }}>Login</Button>
            <Button variant="primary" onClick={() => { navigate('/register'); setMenuOpen(false); }}>Register</Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleLogout}>Logout</Button>
        )}
      </div>
    </>
  );
}
