import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
            <Suspense fallback={null}>
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
