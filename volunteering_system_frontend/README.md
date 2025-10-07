# Volunteer Connect Frontend

This React application provides the user-facing web interface for discovering, creating, and participating in volunteering opportunities. It implements a modern Ocean Professional theme with blue and amber accents, rounded cards, subtle shadows, and a responsive layout.

## Quick Start (Mock Mode by Default)

First run uses in-memory mock APIs so no backend is required.

1) From the project root, go to the frontend:
   - volunteer-connect-platform-4452/volunteering_system_frontend

2) Create a .env.local file (optional but recommended) with mock mode enabled:
   REACT_APP_USE_MOCK=true
   REACT_APP_API_BASE_URL=http://localhost:4000

3) Install dependencies:
   - npm install

4) Start the app:
   - npm start
   The app will be available at http://localhost:3000

5) Run the smoke test (optional):
   - CI=true npm test

Notes:
- prop-types is already listed in package.json and will be installed by npm install.
- Environment variables are read at build time; restart the dev server after changing them.

## Prerequisites

- Node.js 16+ and npm 8+

No backend is required for mock mode. If you want to call a real API, provide a live base URL and disable mock mode (details below).

## Environment Variables

Create React App reads variables prefixed with REACT_APP_ at build time.

- REACT_APP_USE_MOCK
  - Default behavior: If omitted or empty, the app runs in mock mode for an easy first run.
  - To explicitly enable mock mode: set REACT_APP_USE_MOCK=true
  - To disable mock mode (use real API): set REACT_APP_USE_MOCK=false

- REACT_APP_API_BASE_URL
  - Base URL for the backend API when mock mode is off.
  - Defaults to http://localhost:4000 when not set.
  - Example: http://localhost:4000

Example .env.local:
REACT_APP_USE_MOCK=true
REACT_APP_API_BASE_URL=http://localhost:4000

After changes to .env.local, stop and restart npm start.

## Running Modes

- Mock Mode (default/easiest):
  - REACT_APP_USE_MOCK=true (or leave unset)
  - All service calls are handled by in-memory mocks in src/services/apiMock.js
  - No backend is needed; auth and data are simulated

- Real API Mode:
  - REACT_APP_USE_MOCK=false
  - Set REACT_APP_API_BASE_URL to your backend URL (e.g., http://localhost:4000)
  - API calls are performed with fetch in src/services/apiClient.js using the assumed REST endpoints

Tip: When switching modes, restart the dev server so new environment values are applied.

## Available Scripts

- npm start: Start the development server (http://localhost:3000)
- npm test: Run tests in watch mode. For CI-style smoke test, use CI=true npm test
- npm run build: Create a production build

## Ocean Professional Theme

The app uses a modern, accessible theme with:
- Blue primary (#2563EB) and amber secondary (#F59E0B) accents
- Subtle shadows, rounded corners, and a soft gradient backdrop
- Light/dark toggle persisted to localStorage (via ThemeProvider)
- Styles defined primarily in src/App.css with CSS variables

Layout:
- Sticky Navbar with main navigation and auth actions
- Main content area for pages and cards
- Compact Footer with subtle styling

## Routes and Pages

Defined in src/router/Router.js (react-router-dom v6):

Public:
- / (Home)
- /opportunities (Opportunities List)
- /opportunities/:id (Opportunity Details)
- /organizations (Organizations)
- /login (Login)
- /register (Register)

Protected (requires auth):
- /create (Create Opportunity)
- /dashboard (Dashboard)
- /profile (Profile)

A 404 route (*) renders NotFound for unmatched paths. Protected routes redirect unauthenticated users to /login and preserve the intended return path.

## Authentication and API Basics

- Auth state is managed in src/state/authContext.js, persisted in localStorage (vc_auth)
- apiClient (src/services/apiClient.js) attaches Authorization: Bearer <token> when available
- On HTTP 401, apiClient throws an ApiError with code AUTH_401; the app clears the session and redirects as needed
- Service modules are in src/services/*.js and switch automatically between mock and real APIs based on REACT_APP_USE_MOCK

## Service Endpoint Assumptions (Real API Mode)

Until a backend spec is available, the app assumes typical REST paths:
- Auth: /auth/login, /auth/register, /auth/me, /auth/logout, /auth/refresh
- Opportunities: /opportunities, /opportunities/:id, /opportunities/:id/register, /opportunities/:id/save
- Profile: /profile, /profile/history, /profile/saved
- Organizations: /organizations, /organizations/:id, /organizations/:id/follow

Adjust src/services/*.js to match your backend once finalized.

## Folder Structure Highlights

- src/router: Routing and ProtectedRoute
- src/state: Auth and Theme providers/hooks
- src/services: apiClient, mock and real service facades
- src/pages: Page-level components
- src/components: UI building blocks (Button, Card, Loader, EmptyState) and layout (Navbar, Footer)
- src/utils: Constants and validators

Accessibility:
- Visible focus styles, ARIA attributes, and keyboard-friendly interactions are included by default. Preserve these patterns when adding features.
