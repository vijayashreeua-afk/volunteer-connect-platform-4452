 /**
  * PUBLIC_INTERFACE
  * Simple validator helpers.
  */
export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').toLowerCase());
}

export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}
