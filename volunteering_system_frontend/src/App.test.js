import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Basic smoke test to ensure the application shell renders.
 * Asserts on stable Navbar brand text "Volunteer Connect" which is always present on initial load.
 */
test('renders app shell with site brand', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const el = screen.getByText(/volunteer connect/i);
  expect(el).toBeInTheDocument();
});
