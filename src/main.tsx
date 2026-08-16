import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Remove the retired PWA worker for visitors who loaded an older deployment.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then((registration) => registration?.unregister());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
