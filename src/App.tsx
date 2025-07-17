import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CareerBot from './components/CareerBot';
import ErrorPage from './components/ErrorPage';
import Terminal from './components/Terminal';
import { useState } from 'react';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleOpenTerminal = () => setIsTerminalOpen(true);
  const handleCloseTerminal = () => setIsTerminalOpen(false);

  return (
    <Router>
      <div className="App">
        <Navbar onOpenTerminal={handleOpenTerminal} />
        <main>
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Hero />
                <About />
                <Skills />
                <Projects />
                <GitHubStats username="srbmaury" />
                <Contact />
              </motion.div>
            } />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
        <CareerBot />
        <Terminal isOpen={isTerminalOpen} onClose={handleCloseTerminal} />
      </div>
    </Router>
  );
}

export default App;
