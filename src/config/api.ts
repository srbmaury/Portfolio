// API configuration for different environments
const isProduction = window.location.hostname !== 'localhost';
const API_BASE_URL = isProduction 
  ? window.location.origin // Use the same domain in production
  : 'http://localhost:3001'; // Use localhost in development

export const API_ENDPOINTS = {
  ANALYZE_CAREER: `${API_BASE_URL}/api/analyze-career`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL; 