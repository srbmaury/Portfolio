import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Eye, Github } from 'lucide-react';
import { useState } from 'react';
import { trackHeroEvent } from '../utils/analytics';
import { scrollToSection } from '../utils/scrollToSection';
import profile from '../config/profile.json';
import ResumeViewer from './ResumeViewer';
const showResume = import.meta.env.VITE_SHOW_RESUME === 'true' && Boolean(import.meta.env.VITE_RESUME_URL);
export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  return (
    <section id="home" className="portfolio-hero" aria-label="Introduction">
      <div className="container hero-layout">
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="hero-copy">
          <p className="eyebrow">SOFTWARE ENGINEER AT SALESFORCE</p>
          <p className="hero-name">{profile.personalInfo.name}</p>
          <h1>Building software<br/>that makes complex<br/>things <span>simpler.</span></h1>
          <p className="hero-intro">I work on backend systems, developer tools, and applications where performance and reliability matter. Outside work, I turn ideas into open-source projects.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary" onClick={(event) => { event.preventDefault(); trackHeroEvent('cta_click','view_projects'); scrollToSection('#projects'); }}>Explore projects <ArrowRight size={17}/></a>
            <a href={profile.personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" onClick={() => trackHeroEvent('github_click','hero')}><Github size={17}/> GitHub</a>
            {showResume && <button type="button" className="btn btn-secondary" onClick={()=>{trackHeroEvent('cta_click','view_resume');setIsResumeOpen(true);}}><Eye size={17}/> Resume</button>}
          </div>
          <div className="hero-meta"><span>Salesforce</span><span>Razorpay</span><span>IIT BHU</span></div>
        </motion.div>
        <motion.div className="hero-showcase" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.15}} aria-label="Preview of projects">
          <div className="showcase-top"><span className="showcase-indicator"/><span>SELECTED WORK</span><span>PROJECT SPOTLIGHT</span></div>
          <div className="showcase-image"><img src="/images/EcommerceSearch.webp" alt="Screenshot of Ecommerce Search Engine" loading="eager"/></div>
          <div className="showcase-bottom"><div><strong>Ecommerce Search Engine</strong><small>Search · Ranking · Systems</small></div><a href="#projects" aria-label="Browse featured projects" onClick={(event) => { event.preventDefault(); scrollToSection('#projects'); }}><ArrowDown size={20}/></a></div>
        </motion.div>
      </div>
      {showResume && <ResumeViewer isOpen={isResumeOpen} onClose={()=>setIsResumeOpen(false)} />}
    </section>
  );
}