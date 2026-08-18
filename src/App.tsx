import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Bot, X } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ErrorPage from './components/ErrorPage';
import ProjectArchive from './components/ProjectArchive';
import { Suspense, lazy, useState, useEffect } from 'react';
import { wakeUpBackend } from './utils/backendWakeup';

const CareerBot = lazy(() => import('./components/CareerBot'));
const Terminal = lazy(() => import('./components/Terminal'));
import CustomCursor from './components/CustomCursor';
import CareerBotLauncher from './components/CareerBotLauncher';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import { ThemeProvider } from './providers/ThemeProvider';
import { ModalProvider } from './contexts/ModalContext';
import profile from './config/profile.json';
import { trackPageView } from './utils/analytics';

const showCustomCursor = import.meta.env.VITE_HIDE_CUSTOM_CURSOR !== 'true';
const showTerminal = import.meta.env.VITE_SHOW_TERMINAL === 'true';

const CareerBotLoading = ({ onClose }: { onClose: () => void }) => (
  <div
    className="fixed bottom-20 left-2 right-2 z-50 flex h-[70vh] max-h-[500px] flex-col overflow-hidden rounded-lg border shadow-2xl sm:bottom-24 sm:left-auto sm:right-6 sm:h-[500px] sm:w-96"
    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
    role="dialog"
    aria-modal="true"
    aria-label="Starting career assistant"
  >
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
      <div className="flex items-center gap-2">
        <Bot size={20} />
        <span className="font-semibold">Starting assistant</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded p-1 text-white/80 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Cancel opening career bot"
      >
        <X size={20} />
      </button>
    </div>
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center" aria-live="polite">
      <Bot size={32} style={{ color: 'var(--primary-color)' }} aria-hidden="true" />
      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Preparing the career assistant…</p>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>You can ask about experience, projects, and skills in a moment.</p>
    </div>
  </div>
);

const RouteScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0 });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
};


function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCareerBotOpen, setIsCareerBotOpen] = useState(false);

  const handleOpenTerminal = () => setIsTerminalOpen(true);
  const handleCloseTerminal = () => setIsTerminalOpen(false);
  const handleOpenCareerBot = () => {
    void wakeUpBackend();
    setIsCareerBotOpen(true);
    setIsTerminalOpen(false); // Close terminal when opening CareerBot
  };
  const handleCloseCareerBot = () => setIsCareerBotOpen(false);

  return (
    <ThemeProvider>
      <ModalProvider>
        <Router>
          <RouteScrollManager />
          <div className="App">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            {showCustomCursor && <CustomCursor />}
            <ScrollProgress />
            <Navbar onOpenTerminal={handleOpenTerminal} showTerminal={showTerminal} />
            <main id="main-content">
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <GitHubStats username={profile.githubSnapshot.username} />
                    <Contact />
                  </>
                } />
                <Route path="/projects" element={<ProjectArchive />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
            {!isCareerBotOpen && <CareerBotLauncher onOpen={handleOpenCareerBot} />}
            <Suspense fallback={isCareerBotOpen ? <CareerBotLoading onClose={handleCloseCareerBot} /> : null}>
              {isCareerBotOpen && <CareerBot
                isOpen={isCareerBotOpen}
                onClose={handleCloseCareerBot}
              />}
              {showTerminal && <Terminal
                isOpen={isTerminalOpen}
                onClose={handleCloseTerminal}
                onOpenCareerBot={handleOpenCareerBot}
              />}
            </Suspense>
          </div>
        </Router>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
