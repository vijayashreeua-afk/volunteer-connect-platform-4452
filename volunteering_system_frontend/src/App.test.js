import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock only useNavigate to avoid Router context failures (App provides Router via AppRouter)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

/**
 * PUBLIC_INTERFACE
 * Stable smoke test: renders App and asserts the persistent Navbar brand text appears.
 * Does not wrap App with any router. Ensures "Volunteer Connect" brand is present.
 */
test('renders app shell with site brand', () => {
  render(<App />);
  const el = screen.getByText(/volunteer connect/i);
  expect(el).toBeInTheDocument();
});
