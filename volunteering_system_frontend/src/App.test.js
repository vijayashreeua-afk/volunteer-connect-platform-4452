import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * PUBLIC_INTERFACE
 * Basic smoke test to ensure the application shell renders.
 * Asserts on stable Navbar brand text "Volunteer Connect" which is always present on initial load.
 */
test('renders app shell with site brand', () => {
  render(<App />);
  const el = screen.getByText(/volunteer connect/i);
  expect(el).toBeInTheDocument();
});
