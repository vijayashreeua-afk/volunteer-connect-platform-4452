import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from '../pages/Home';
import OpportunitiesList from '../pages/OpportunitiesList';
import OpportunityDetails from '../pages/OpportunityDetails';
import CreateOpportunity from '../pages/CreateOpportunity';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Organizations from '../pages/Organizations';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import NotFound from '../pages/NotFound';
import { useAuth } from '../state/authContext';

/**
 * ProtectedRoute placeholder. For now, if not authenticated, navigates to /login,
 * otherwise renders children. Logic can be expanded in next steps.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/**
 * PUBLIC_INTERFACE
 * AppRouter provides all application routes using react-router-dom v6.
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/opportunities" element={<OpportunitiesList />} />
        <Route path="/opportunities/:id" element={<OpportunityDetails />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateOpportunity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
