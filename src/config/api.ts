// API configuration for different environments

// Prefer VITE_API_BASE_URL from environment variables if set
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
  window.location.hostname !== 'localhost'
    ? window.location.origin
    : 'http://localhost:3001'
);

export const API_ENDPOINTS = {
  ANALYZE_CAREER: `${API_BASE_URL}/api/analyze-career`,
};

export default API_BASE_URL; 