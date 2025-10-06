 /**
  * PUBLIC_INTERFACE
  * apiClient placeholder. In Step 2, this will be replaced with real fetch/axios logic.
  */
export const apiClient = {
  async get(path) { return { ok: true, path, data: null }; },
  async post(path, body) { return { ok: true, path, body, data: null }; },
  async put(path, body) { return { ok: true, path, body, data: null }; },
  async del(path) { return { ok: true, path, data: null }; },
};
