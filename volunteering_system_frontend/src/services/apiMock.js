 /**
  * PUBLIC_INTERFACE
  * apiMock provides in-memory implementations for auth, opportunities, profile, and organizations.
  * It mirrors the signatures used across the app so pages work unchanged.
  * Enable via REACT_APP_USE_MOCK=true to route requests here from apiClient.js.
  */
import { ApiError } from './apiClient';

// Internal in-memory "database"
let _idCounter = 3;
let currentToken = null;

const seedUser = {
  id: 'u_1',
  name: 'Alex Volunteer',
  email: 'alex@example.com',
};

const opportunities = [
  {
    id: '1',
    title: 'Beach Cleanup',
    description: 'Help clean the coastline and protect marine life.',
    category: 'Environment',
    duration: '3h',
  },
  {
    id: '2',
    title: 'Food Bank Support',
    description: 'Assist with sorting and distributing food to families.',
    category: 'Community',
    duration: '2h',
  },
  {
    id: '3',
    title: 'Tutoring Program',
    description: 'Tutor local students in math and science.',
    category: 'Education',
    duration: '1.5h',
  },
];

const organizations = [
  { id: 'org_1', name: 'Coastal Care', following: false },
  { id: 'org_2', name: 'City Food Share', following: true },
];

const profileState = {
  ...seedUser,
  history: [
    { id: '1', title: 'Beach Cleanup', date: '2025-10-15', hours: 3 },
    { id: '2', title: 'Food Bank Support', date: '2025-11-01', hours: 2 },
  ],
  saved: [{ id: '3', title: 'Tutoring Program' }],
};

// Helpers
function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function requireAuth() {
  if (!currentToken) {
    throw new ApiError('Unauthorized (mock)', { status: 401, code: 'AUTH_401' });
  }
}

/**
 * PUBLIC_INTERFACE
 * Mock Auth service: login/register/me/logout/refresh
 */
export const mockAuthApi = {
  async login({ email, password }) {
    await delay();
    if (!email || !password) {
      throw new ApiError('Email and password are required', { status: 400 });
    }
    // Accept any credentials; issue token
    currentToken = 'mock-token-' + Math.random().toString(36).slice(2);
    return { token: currentToken, user: seedUser };
  },
  async register({ name, email, password }) {
    await delay();
    if (!email || !password || !name) {
      throw new ApiError('Missing fields', { status: 400 });
    }
    // Pretend created; also auto-login for convenience
    currentToken = 'mock-token-' + Math.random().toString(36).slice(2);
    const user = { ...seedUser, name, email };
    return { token: currentToken, user };
  },
  async me() {
    await delay(200);
    if (!currentToken) {
      throw new ApiError('Unauthorized (mock)', { status: 401, code: 'AUTH_401' });
    }
    return { ...seedUser, token: currentToken };
  },
  async logout() {
    await delay(150);
    currentToken = null;
    return { success: true };
  },
  async refresh() {
    await delay(150);
    if (!currentToken) {
      throw new ApiError('Unauthorized (mock)', { status: 401, code: 'AUTH_401' });
    }
    currentToken = 'mock-token-' + Math.random().toString(36).slice(2);
    return { token: currentToken };
  },
};

/**
 * PUBLIC_INTERFACE
 * Mock Opportunities service.
 */
export const mockOpportunitiesApi = {
  async list(params = {}) {
    await delay(300);
    // Simple search filter support
    const q = (params.search || '').toLowerCase();
    const items = q
      ? opportunities.filter(
          (o) =>
            o.title.toLowerCase().includes(q) ||
            (o.description || '').toLowerCase().includes(q) ||
            (o.category || '').toLowerCase().includes(q)
        )
      : opportunities.slice();
    // Return array directly to match pages' flexible handling
    return items;
  },
  async getById(id) {
    await delay(250);
    const item = opportunities.find((o) => String(o.id) === String(id));
    if (!item) {
      throw new ApiError('Not found (mock)', { status: 404 });
    }
    return item;
  },
  async create(payload) {
    await delay(400);
    requireAuth();
    if (!payload?.title || !payload?.description) {
      throw new ApiError('Title and description are required', { status: 400 });
    }
    const newItem = {
      id: String(++_idCounter),
      title: payload.title,
      description: payload.description,
      category: payload.category || 'General',
      duration: payload.duration || '2h',
    };
    opportunities.push(newItem);
    return newItem;
  },
  async update(id, payload) {
    await delay(350);
    requireAuth();
    const idx = opportunities.findIndex((o) => String(o.id) === String(id));
    if (idx === -1) throw new ApiError('Not found (mock)', { status: 404 });
    opportunities[idx] = { ...opportunities[idx], ...payload };
    return opportunities[idx];
  },
  async remove(id) {
    await delay(300);
    requireAuth();
    const idx = opportunities.findIndex((o) => String(o.id) === String(id));
    if (idx === -1) throw new ApiError('Not found (mock)', { status: 404 });
    const [removed] = opportunities.splice(idx, 1);
    return removed;
  },
  async register(id) {
    await delay(250);
    requireAuth();
    const item = opportunities.find((o) => String(o.id) === String(id));
    if (!item) throw new ApiError('Not found (mock)', { status: 404 });
    // append to history as upcoming
    profileState.history.push({ id: item.id, title: item.title, date: 'TBD', hours: 0 });
    return { success: true };
  },
  async save(id) {
    await delay(220);
    requireAuth();
    const item = opportunities.find((o) => String(o.id) === String(id));
    if (!item) throw new ApiError('Not found (mock)', { status: 404 });
    if (!profileState.saved.find((s) => String(s.id) === String(id))) {
      profileState.saved.push({ id: item.id, title: item.title });
    }
    return { success: true };
  },
  async unsave(id) {
    await delay(200);
    requireAuth();
    const idx = profileState.saved.findIndex((s) => String(s.id) === String(id));
    if (idx >= 0) profileState.saved.splice(idx, 1);
    return { success: true };
  },
};

/**
 * PUBLIC_INTERFACE
 * Mock Profile service.
 */
export const mockProfileApi = {
  async get() {
    await delay(220);
    requireAuth();
    return { name: profileState.name, email: profileState.email, id: profileState.id };
  },
  async update(payload) {
    await delay(300);
    requireAuth();
    profileState.name = payload?.name ?? profileState.name;
    profileState.email = payload?.email ?? profileState.email;
    return { success: true };
  },
  async history() {
    await delay(240);
    requireAuth();
    // Return array directly
    return profileState.history.slice();
  },
  async saved() {
    await delay(200);
    requireAuth();
    return profileState.saved.slice();
  },
};

/**
 * PUBLIC_INTERFACE
 * Mock Organizations service.
 */
export const mockOrganizationsApi = {
  async list() {
    await delay(220);
    return organizations.slice();
  },
  async getById(id) {
    await delay(220);
    const org = organizations.find((o) => String(o.id) === String(id));
    if (!org) throw new ApiError('Not found (mock)', { status: 404 });
    return org;
  },
  async follow(id) {
    await delay(200);
    requireAuth();
    const org = organizations.find((o) => String(o.id) === String(id));
    if (!org) throw new ApiError('Not found (mock)', { status: 404 });
    org.following = true;
    return { success: true };
  },
  async unfollow(id) {
    await delay(200);
    requireAuth();
    const org = organizations.find((o) => String(o.id) === String(id));
    if (!org) throw new ApiError('Not found (mock)', { status: 404 });
    org.following = false;
    return { success: true };
  },
};

/**
 * PUBLIC_INTERFACE
 * Aggregated export for convenience when switching in apiClient.js
 */
export const apiMock = {
  authApi: mockAuthApi,
  opportunitiesApi: mockOpportunitiesApi,
  profileApi: mockProfileApi,
  organizationsApi: mockOrganizationsApi,
};
