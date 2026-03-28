const raw = import.meta.env.VITE_API_URL;
const trimmed = typeof raw === 'string' ? raw.trim().replace(/\/$/, '') : '';
export const apiBaseUrl = trimmed || 'http://localhost:5000';
