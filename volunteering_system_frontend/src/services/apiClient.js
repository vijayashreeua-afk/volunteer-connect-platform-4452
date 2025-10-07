 /**
  * PUBLIC_INTERFACE
  * apiClient provides helper methods for HTTP requests with:
  * - base URL from REACT_APP_API_BASE_URL (defaults to http://localhost:4000)
  * - Authorization: Bearer <token> header if token available in localStorage (vc_auth.token)
  * - Centralized error handling and JSON parsing
  * - 401 handling: throws error with code 'AUTH_401'
  *
  * Additionally supports mock mode when REACT_APP_USE_MOCK === 'true':
  * - Exports same API surfaces from ./authApi, ./opportunitiesApi, ./profileApi, ./organizationsApi,
  *   but backed by in-memory mock implementations from ./apiMock.
  */
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

/**
 * Determine mock mode:
 * - Treat undefined, null, and empty string as "use mock" for preview-friendly defaults.
 * - Respect explicit falsy values like 'false' or '0'.
 * - Accept truthy values 'true' or '1' to enable mock explicitly.
 *
 * This ensures first-time runs (no .env) default to mocks, while allowing CI/real API runs
 * to set REACT_APP_USE_MOCK=false and avoid mock mode.
 */
const useMockRaw = (process.env.REACT_APP_USE_MOCK ?? '').toString().trim().toLowerCase();
// Mock when explicitly true/1 OR when empty/omitted.
const USE_MOCK = useMockRaw === 'true' || useMockRaw === '1' || useMockRaw === '';

// PUBLIC_INTERFACE
export class ApiError extends Error {
  /** Create an API error with HTTP status and optional code/payload */
  constructor(message, { status, code, payload } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

/** Internal: read token from localStorage saved by AuthContext */
function getToken() {
  try {
    const raw = localStorage.getItem('vc_auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

/** Internal: build absolute URL respecting single slash */
function buildUrl(path) {
  if (!path) return BASE_URL;
  const base = BASE_URL.replace(/\/*$/, '');
  const p = String(path).replace(/^\/*/, '');
  return `${base}/${p}`;
}

/** Internal: common fetch with error handling and JSON parsing */
async function request(method, path, { body, headers } = {}) {
  const token = getToken();
  const url = buildUrl(path);

  const finalHeaders = {
    Accept: 'application/json',
    ...headers,
  };

  const hasBody = body !== undefined && body !== null;
  let payload = body;

  if (hasBody && !(body instanceof FormData)) {
    finalHeaders['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: hasBody ? payload : undefined,
    credentials: 'include',
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  let data = null;

  if (isJson) {
    try {
      data = await res.json();
    } catch (e) {
      if (!res.ok) {
        throw new ApiError('Failed to parse error response JSON', { status: res.status, code: 'INVALID_JSON' });
      }
    }
  } else {
    try {
      const text = await res.text();
      data = text;
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    if (res.status === 401) {
      const err = new ApiError('Unauthorized', { status: 401, code: 'AUTH_401', payload: data });
      throw err;
    }
    const message = (data && (data.message || data.error)) || `Request failed with status ${res.status}`;
    throw new ApiError(message, { status: res.status, payload: data });
  }

  return data;
}

// PUBLIC_INTERFACE
export const apiClient = {
  /** Perform a GET request */
  async get(path, options = {}) {
    return request('GET', path, options);
  },
  /** Perform a POST request with optional JSON body */
  async post(path, body, options = {}) {
    return request('POST', path, { ...options, body });
  },
  /** Perform a PUT request with optional JSON body */
  async put(path, body, options = {}) {
    return request('PUT', path, { ...options, body });
  },
  /** Perform a PATCH request with optional JSON body */
  async patch(path, body, options = {}) {
    return request('PATCH', path, { ...options, body });
  },
  /** Perform a DELETE request */
  async del(path, options = {}) {
    return request('DELETE', path, options);
  },
};

// In mock mode, re-export service facades backed by apiMock so pages can import from their usual modules.
let exportedAuthApi, exportedOpportunitiesApi, exportedProfileApi, exportedOrganizationsApi;
if (USE_MOCK) {
  const mock = require('./apiMock');
  exportedAuthApi = mock.mockAuthApi;
  exportedOpportunitiesApi = mock.mockOpportunitiesApi;
  exportedProfileApi = mock.mockProfileApi;
  exportedOrganizationsApi = mock.mockOrganizationsApi;
} else {
  exportedAuthApi = require('./authApi').authApi;
  exportedOpportunitiesApi = require('./opportunitiesApi').opportunitiesApi;
  exportedProfileApi = require('./profileApi').profileApi;
  exportedOrganizationsApi = require('./organizationsApi').organizationsApi;
}

// PUBLIC_INTERFACE
export const authApi = exportedAuthApi;
// PUBLIC_INTERFACE
export const opportunitiesApi = exportedOpportunitiesApi;
// PUBLIC_INTERFACE
export const profileApi = exportedProfileApi;
// PUBLIC_INTERFACE
export const organizationsApi = exportedOrganizationsApi;

// PUBLIC_INTERFACE
export const __internal = { USE_MOCK };
