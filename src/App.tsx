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
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import { ThemeProvider } from './providers/ThemeProvider';
import { ModalProvider } from './contexts/ModalContext';
import profile from './config/profile.json';

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

  return null;
};


function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCareerBotOpen, setIsCareerBotOpen] = useState(false);
  // Only show loading screen if not visited before
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !localStorage.getItem('visited');
    } catch {
      return true;
    }
  });

  const handleOpenTerminal = () => setIsTerminalOpen(true);
  const handleCloseTerminal = () => setIsTerminalOpen(false);
  const handleOpenCareerBot = () => {
    setIsCareerBotOpen(true);
    setIsTerminalOpen(false); // Close terminal when opening CareerBot
  };
  const handleCloseCareerBot = () => setIsCareerBotOpen(false);
  const handleLoadingComplete = () => {
    setIsLoading(false);
    try {
      localStorage.setItem('visited', 'true');
    } catch {
      // Ignore errors from localStorage (e.g., private mode)
    }
  };

  // Wake up backend on app load
  useEffect(() => {
    wakeUpBackend();
  }, []);

  return (
    <ThemeProvider>
      <ModalProvider>
        <Router>
          <RouteScrollManager />
          <div className="App">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
            <CustomCursor />
            <ScrollProgress />
            <Navbar onOpenTerminal={handleOpenTerminal} />
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
            <Suspense fallback={null}>
              <CareerBot
                isOpen={isCareerBotOpen}
                onClose={handleCloseCareerBot}
                onOpen={handleOpenCareerBot}
              />
              <Terminal
                isOpen={isTerminalOpen}
                onClose={handleCloseTerminal}
                onOpenCareerBot={handleOpenCareerBot}
              />
            </Suspense>
          </div>
        </Router>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
