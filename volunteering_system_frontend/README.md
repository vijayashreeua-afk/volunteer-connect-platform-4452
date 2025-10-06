# Volunteer Connect Frontend

This React application provides the user-facing web interface for discovering, creating, and participating in volunteering opportunities. It implements a modern Ocean Professional theme with blue and amber accents, rounded cards, subtle shadows, and responsive layout.

## Project Overview (Ocean Professional Theme)

The app applies a clean, modern design with a soft gradient backdrop and accessible defaults. Core UI elements are implemented as lightweight React components with minimal dependencies, styled via CSS variables in src/App.css. The layout consists of a sticky top navigation bar, a main content area, and a compact footer. A theme toggler supports light and dark modes with persistence.

Key highlights:
- Responsive navigation with protected routes for dashboard, profile, and create opportunity.
- Centralized authentication state with localStorage persistence and /auth/me bootstrap.
- Pluggable data layer with real API mode or in-memory mock mode controlled by environment variables.

## Prerequisites and Installation

Before running the app locally, ensure you have:
- Node.js 16+ and npm 8+ installed
- A running API backend if you plan to use real API mode (optional; mock mode requires none)

Steps:
1. Navigate to the frontend directory:
   - volunteer-connect-platform-4452/volunteering_system_frontend
2. Install dependencies:
   - npm install

## Available Scripts

The following scripts are available via package.json and react-scripts:
- npm start: Starts the development server at http://localhost:3000 with automatic reload.
- npm test: Runs the tests in watch mode using react-scripts.
- npm run build: Builds a production-optimized bundle into the build directory.

## Environment Variables

The app supports the following environment variables (Create React App convention using REACT_APP_ prefix):
- REACT_APP_API_BASE_URL: Base URL of the backend API. Defaults to http://localhost:4000 if not provided.
- REACT_APP_USE_MOCK: When set to 'true', the app routes all service calls to an in-memory mock implementation instead of a real backend.

Example .env.local for local development:
REACT_APP_API_BASE_URL=http://localhost:4000
REACT_APP_USE_MOCK=true

These values are read at build time by Create React App. After changing them, restart the dev server.

## Running with Real API vs Mock Mode

You can toggle between real backend mode and mock mode without code changes:
- Mock Mode (recommended for first run):
  - Set REACT_APP_USE_MOCK=true.
  - The services exported from src/services/apiClient.js will point to in-memory mocks in src/services/apiMock.js.
  - No backend is required; authentication and data are simulated.
- Real API Mode:
  - Set REACT_APP_USE_MOCK to anything other than 'true' (or omit it).
  - Set REACT_APP_API_BASE_URL to your backend URL, for example http://localhost:4000.
  - Service modules will use fetch via apiClient to call assumed REST endpoints.

Note: When switching modes, stop and restart npm start to apply the new environment variables.

## Routing Overview and Protected Routes

The app uses react-router-dom v6 and defines the following routes in src/router/Router.js:
- /: Home page with introduction and quick access to browse opportunities.
- /opportunities: List of volunteering opportunities with loading, empty, and error states.
- /opportunities/:id: Details view for a single opportunity with register and save actions.
- /create: Protected route to create a new opportunity.
- /dashboard: Protected route showing upcoming events, saved items, and stats.
- /profile: Protected route to view and edit the current user profile.
- /organizations: Public scaffold for organizations list and follow actions.
- /login: Authentication form for existing users.
- /register: Registration form for new users.
- *: 404 page for unknown routes.

ProtectedRoute in Router.js guards /create, /dashboard, and /profile. If a user is not authenticated, it redirects to /login and includes a return path in location.state for post-login redirection.

## Authentication Behavior

Authentication state is centralized in src/state/authContext.js. The provider:
- Persists token and basic user info to localStorage under the key vc_auth.
- On app load, attempts to hydrate session from localStorage and calls authApi.me to bootstrap the current user. If the call fails or returns 401, it clears the session.
- Exposes login, register, fetchMe, logout, and handleAuthError helpers. Login and register store the token, attempt to fetch /auth/me, and propagate errors to the UI. Logout clears state and storage.

401 Handling:
- The shared apiClient throws an ApiError with code AUTH_401 on HTTP 401. Pages catch this and call handleAuthError from the auth context, which clears the session immediately. The ProtectedRoute will then redirect the user to /login.

Token Usage:
- apiClient attaches Authorization: Bearer <token> automatically if vc_auth.token is present in localStorage.

## Services and Endpoint Assumptions

In real API mode, the app uses the following assumed REST endpoints (replace with actual backend endpoints once available):
- Auth (src/services/authApi.js):
  - POST /auth/login
  - POST /auth/register
  - GET /auth/me
  - POST /auth/logout
  - POST /auth/refresh
- Opportunities (src/services/opportunitiesApi.js):
  - GET /opportunities
  - GET /opportunities/:id
  - POST /opportunities
  - PUT /opportunities/:id
  - DELETE /opportunities/:id
  - POST /opportunities/:id/register
  - POST /opportunities/:id/save
  - DELETE /opportunities/:id/save
- Profile (src/services/profileApi.js):
  - GET /profile
  - PUT /profile
  - GET /profile/history
  - GET /profile/saved
- Organizations (src/services/organizationsApi.js):
  - GET /organizations
  - GET /organizations/:id
  - POST /organizations/:id/follow
  - DELETE /organizations/:id/follow

When the backend spec becomes available, align these paths, payloads, and response shapes. The UI already tolerates some variance by accepting either arrays or { items: [] } in list responses and checking for token or accessToken fields in auth responses.

## Mock Mode Usage

When REACT_APP_USE_MOCK='true', apiClient re-exports service facades backed by src/services/apiMock.js. The mocks:
- Provide in-memory lists for opportunities and organizations.
- Simulate auth, issuing and checking a mock token for protected actions.
- Add small delays to mimic network latency and throw ApiError with AUTH_401 when appropriate.

This allows end-to-end navigation and interactions without any backend. It is ideal for UI development, demos, and CI checks.

## Development Tips and Folder Structure Summary

Key folders:
- src/router: Router.js defines routes and ProtectedRoute.
- src/state: Auth and theme providers with hooks.
- src/services: apiClient, real service facades, and apiMock for mock mode.
- src/pages: Page-level components for each route, implementing data fetching and user actions.
- src/components: Common UI pieces (Button, Card, Loader, EmptyState) and layout (Navbar, Footer).
- src/utils: Constants and simple validators.

Tips:
- After changing environment variables, restart the dev server.
- For accessibility, interactive elements have visible focus states and ARIA attributes. Keep these conventions when adding features.
- To adjust the theme, edit CSS variables and utilities in src/App.css. Theme state is toggled through the useTheme hook.
- If you integrate a real backend, start by updating REACT_APP_API_BASE_URL and verifying /auth/me returns the current user. The app’s bootstrap relies on this for session restoration.

## Quick Start

1. Copy the example environment to .env.local (optional):
   - REACT_APP_API_BASE_URL=http://localhost:4000
   - REACT_APP_USE_MOCK=true
2. Install and run:
   - npm install
   - npm start
3. Open http://localhost:3000 and explore:
   - Public pages: Home, Opportunities, Organizations, Login, Register
   - Auth-only pages: Create, Dashboard, Profile

## Notes on Replacing Placeholder Endpoints

The current endpoints are placeholders aligned with common REST patterns. Once the backend contract is finalized:
- Update paths and payloads in src/services/*.js to match the API spec.
- Ensure auth responses include a token or accessToken. The app reads either and stores it in vc_auth.
- Ensure an /auth/me equivalent exists; the app relies on this to populate user state at startup.
- Review error payloads and, if needed, map them to user-friendly messages in page components.

