import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

// Register service worker for PWA
// This will be automatically handled by vite-plugin-pwa
// and will skip caching resume.pdf
const updateSW = registerSW({
  onNeedRefresh() {
    // Show a prompt to user to refresh for new content
    // For now, auto-update
    updateSW(true);
  },
  onOfflineReady() {
    console.log('App is ready for offline use');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
