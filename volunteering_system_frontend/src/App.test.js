import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock react-router-dom components/hooks that require Router context
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
    // NavLink is used in Navbar; mock to simple span for coverage
    NavLink: ({ children }) => <span>{children}</span>,
  };
});

/**
 * PUBLIC_INTERFACE
 * Smoke test: Renders App (without adding Router), mocks router-dom hooks, and asserts stable brand text.
 * The test is resilient to navigation and routing structure.
 */
test('renders app shell with site brand', () => {
  render(<App />);
  // Brand can be wrapped/fragmented, so match case-insensitively and partially
  const el = screen.getByText(/volunteer connect/i);
  expect(el).toBeInTheDocument();
});
