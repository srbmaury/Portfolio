// API configuration for different environments

const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
// Local development should use the local Express API even when .env has the
// deployed API URL. Production builds continue to honor VITE_API_BASE_URL.
const API_BASE_URL = import.meta.env.DEV && isLocalHost
  ? 'http://localhost:3001'
  : import.meta.env.VITE_API_BASE_URL || (
      !isLocalHost ? window.location.origin : 'http://localhost:3001'
    );

export const API_ENDPOINTS = {
  ANALYZE_CAREER: `${API_BASE_URL}/api/analyze-career`,
  githubStats: (username: string) =>
    `${API_BASE_URL}/api/github-stats/${encodeURIComponent(username)}`,
};

export default API_BASE_URL;
