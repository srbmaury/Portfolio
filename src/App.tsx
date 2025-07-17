import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
  const [isCareerBotOpen, setIsCareerBotOpen] = useState(false);

  const handleOpenTerminal = () => setIsTerminalOpen(true);
  const handleCloseTerminal = () => setIsTerminalOpen(false);
  const handleOpenCareerBot = () => {
    setIsCareerBotOpen(true);
    setIsTerminalOpen(false); // Close terminal when opening CareerBot
  };
  const handleCloseCareerBot = () => setIsCareerBotOpen(false);

  return (
    <Router>
      <div className="App">
        <Navbar onOpenTerminal={handleOpenTerminal} />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <GitHubStats username="srbmaury" />
                <Contact />
              </>
            } />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
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
      </div>
    </Router>
  );
}

export default App;
