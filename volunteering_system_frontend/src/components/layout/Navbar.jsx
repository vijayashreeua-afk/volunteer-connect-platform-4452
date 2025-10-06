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
};
```

Explanation: Create Footer
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/components/layout/Footer.jsx"
import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Footer shows minimal site info.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="container" role="contentinfo" aria-label="Footer">
      <span>© {year} Volunteer Connect • Built with Ocean Professional Theme</span>
    </div>
  );
}
```

Explanation: Create common Button component with variants
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/components/common/Button.jsx"
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Button component supporting primary, secondary, and ghost variants.
 */
export default function Button({ children, variant = 'primary', className = '', ...rest }) {
  const classes = ['btn'];
  if (variant === 'primary') classes.push('btn-primary');
  if (variant === 'secondary') classes.push('btn-secondary');
  if (variant === 'ghost') classes.push('btn-ghost');

  return (
    <button className={`${classes.join(' ')} ${className}`} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  className: PropTypes.string,
};
```

Explanation: Create common Card
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/components/common/Card.jsx"
import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Card component for surface blocks with header/body slots.
 */
export default function Card({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || action) && (
        <div className="card-header">
          <div>
            {title && <div className="card-title">{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  action: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};
```

Explanation: Create Loader spinner
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/components/common/Loader.jsx"
import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Loader displays a simple spinner.
 */
export default function Loader() {
  const size = 22;
  const style = {
    width: size,
    height: size,
    border: '3px solid rgba(37,99,235,0.2)',
    borderTopColor: 'var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 0.9s linear infinite',
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={style} aria-label="Loading" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span className="text-muted">Loading...</span>
    </div>
  );
}
```

Explanation: Create EmptyState
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/components/common/EmptyState.jsx"
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * PUBLIC_INTERFACE
 * EmptyState displays a friendly message and optional action when no data is present.
 */
export default function EmptyState({ title = 'Nothing here yet', description = 'Try adjusting filters or come back later.', actionText, onAction }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: 24 }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>🌊</div>
      <div className="card-title">{title}</div>
      <div className="card-subtitle" style={{ marginBottom: 12 }}>{description}</div>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
};
```

Explanation: Create Home page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/Home.jsx"
import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Home page introducing the app.
 */
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card
        title="Welcome to Volunteer Connect"
        subtitle="Find opportunities and make an impact"
        action={<Button variant="primary" onClick={() => navigate('/opportunities')}>Browse Opportunities</Button>}
      >
        <p className="text-muted">Ocean Professional theme applied. This is a scaffold page.</p>
      </Card>

      <div className="grid grid-3">
        <Card title="Discover" subtitle="Explore events near you">
          <p>Search and filter volunteering events tailored to your interests.</p>
        </Card>
        <Card title="Participate" subtitle="Join with ease">
          <p>Register quickly and track your participation history.</p>
        </Card>
        <Card title="Connect" subtitle="Organizations and communities">
          <p>Follow organizations and stay updated on upcoming opportunities.</p>
        </Card>
      </div>
    </div>
  );
}
```

Explanation: Create OpportunitiesList page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/OpportunitiesList.jsx"
import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Opportunities list scaffold with placeholder content.
 */
export default function OpportunitiesList() {
  const navigate = useNavigate();

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Opportunities</div>
            <div className="card-subtitle">Browse available events</div>
          </div>
          <Button variant="primary" onClick={() => navigate('/create')}>Create Opportunity</Button>
        </div>
        <div className="spacing" />
        <EmptyState
          title="No opportunities yet"
          description="Create the first opportunity to get started."
          actionText="Create Opportunity"
          onAction={() => navigate('/create')}
        />
      </div>

      <div className="grid grid-3">
        <Card title="Sample Beach Cleanup" subtitle="Community • 2h">
          <Button variant="secondary" onClick={() => navigate('/opportunities/1')}>View Details</Button>
        </Card>
        <Card title="Food Drive Support" subtitle="Organization • 4h">
          <Button variant="secondary" onClick={() => navigate('/opportunities/2')}>View Details</Button>
        </Card>
        <Card title="Park Tree Planting" subtitle="Environment • 3h">
          <Button variant="secondary" onClick={() => navigate('/opportunities/3')}>View Details</Button>
        </Card>
      </div>
    </div>
  );
}
```

Explanation: Create OpportunityDetails page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/OpportunityDetails.jsx"
import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * Opportunity details scaffold page.
 */
export default function OpportunityDetails() {
  const { id } = useParams();

  return (
    <Card title={`Opportunity #${id}`} subtitle="Details">
      <p>Placeholder for detailed information about the selected opportunity.</p>
      <div className="section">
        <Button variant="primary">Register</Button>
        <span style={{ marginLeft: 8 }} />
        <Button variant="secondary">Save</Button>
      </div>
    </Card>
  );
}
```

Explanation: Create CreateOpportunity page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/CreateOpportunity.jsx"
import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

/**
 * PUBLIC_INTERFACE
 * Create Opportunity scaffold form.
 */
export default function CreateOpportunity() {
  return (
    <Card title="Create Opportunity" subtitle="Provide basic details">
      <div className="section">
        <label>Title</label>
        <input className="input" placeholder="Beach Cleanup" />
      </div>
      <div className="section">
        <label>Description</label>
        <textarea className="textarea" rows="4" placeholder="Describe the opportunity..." />
      </div>
      <div className="section">
        <label>Category</label>
        <select className="select">
          <option>Environment</option>
          <option>Community</option>
          <option>Education</option>
        </select>
      </div>
      <div className="section-lg">
        <Button variant="primary">Save</Button>
        <span style={{ marginLeft: 8 }} />
        <Button variant="secondary">Cancel</Button>
      </div>
    </Card>
  );
}
```

Explanation: Create Dashboard page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/Dashboard.jsx"
import React from 'react';
import Card from '../components/common/Card';

/**
 * PUBLIC_INTERFACE
 * Dashboard scaffold for authenticated users.
 */
export default function Dashboard() {
  return (
    <div className="grid grid-3">
      <Card title="Upcoming" subtitle="Your next events">
        <p className="text-muted">No upcoming events yet.</p>
      </Card>
      <Card title="Activity" subtitle="Recent participation">
        <p className="text-muted">No recent activity.</p>
      </Card>
      <Card title="Stats" subtitle="Hours and impact">
        <p className="text-muted">0 total hours logged.</p>
      </Card>
    </div>
  );
}
```

Explanation: Create Profile page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/Profile.jsx"
import React from 'react';
import Card from '../components/common/Card';

/**
 * PUBLIC_INTERFACE
 * Profile scaffold page.
 */
export default function Profile() {
  return (
    <Card title="Your Profile" subtitle="Manage your information">
      <div className="section">
        <label>Name</label>
        <input className="input" placeholder="Alex Volunteer" />
      </div>
      <div className="section">
        <label>Email</label>
        <input className="input" placeholder="alex@example.com" />
      </div>
    </Card>
  );
}
```

Explanation: Create Auth/Login page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/Auth/Login.jsx"
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../state/authContext';
import { useNavigate, Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Login scaffold. Uses AuthContext to simulate login and persist token.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    login({ token: 'mock-token', user: { email } });
    navigate('/dashboard');
  };

  return (
    <Card title="Login" subtitle="Access your account">
      <form onSubmit={onSubmit}>
        <div className="section">
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="section">
          <label>Password</label>
          <input className="input" type="password" placeholder="••••••••" />
        </div>
        <div className="section-lg">
          <Button variant="primary" type="submit">Login</Button>
        </div>
        <p className="text-muted">Don&apos;t have an account? <Link to="/register">Register</Link></p>
      </form>
    </Card>
  );
}
```

Explanation: Create Auth/Register page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/Auth/Register.jsx"
import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Register scaffold page.
 */
export default function Register() {
  return (
    <Card title="Register" subtitle="Create your account">
      <div className="section">
        <label>Name</label>
        <input className="input" placeholder="Your name" />
      </div>
      <div className="section">
        <label>Email</label>
        <input className="input" type="email" placeholder="you@example.com" />
      </div>
      <div className="section">
        <label>Password</label>
        <input className="input" type="password" placeholder="••••••••" />
      </div>
      <div className="section-lg">
        <Button variant="primary">Create Account</Button>
      </div>
      <p className="text-muted">Already have an account? <Link to="/login">Login</Link></p>
    </Card>
  );
}
```

Explanation: Create Organizations page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/Organizations.jsx"
import React from 'react';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';

/**
 * PUBLIC_INTERFACE
 * Organizations scaffold page.
 */
export default function Organizations() {
  return (
    <Card title="Organizations" subtitle="Discover and follow">
      <EmptyState title="No organizations found" description="Once organizations are added, they'll appear here." />
    </Card>
  );
}
```

Explanation: Create NotFound page
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/pages/NotFound.jsx"
import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NotFound page for unmatched routes.
 */
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Card title="Page not found" subtitle="The page you are looking for doesn't exist.">
      <Button variant="secondary" onClick={() => navigate('/')}>Go Home</Button>
    </Card>
  );
}
```

Explanation: Create state/store.js as placeholder for future global store
````write file="volunteer-connect-platform-4452/volunteering_system_frontend/src/state/store.js"
 /**
  * PUBLIC_INTERFACE
  * Placeholder for future global store and reducers. For now, exports an empty object.
  */
const store = {};

export default store;
