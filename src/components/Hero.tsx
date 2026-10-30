import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Eye, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { trackHeroEvent } from '../utils/analytics';
import { scrollToSection } from '../utils/scrollToSection';
import profile from '../config/profile.json';
import projectsData from '../config/projects.json';
import ResumeViewer from './ResumeViewer';

const showResume = import.meta.env.VITE_SHOW_RESUME === 'true' && Boolean(import.meta.env.VITE_RESUME_URL);
const ROTATION_MS = 6000;
const featuredWork = projectsData.projects.filter(
  (project) => project.featured && project.image && (project.liveUrl || project.githubUrl)
);
export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion || featuredWork.length < 2) return;
    const id = window.setInterval(() => setSelectedIndex((index) => (index + 1) % featuredWork.length), ROTATION_MS);
    return () => window.clearInterval(id);
  }, [isPaused, reduceMotion, selectedIndex]);

  const currentProject = featuredWork[selectedIndex];
  const projectUrl = currentProject?.liveUrl || currentProject?.githubUrl;

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
        {currentProject && projectUrl && (
          <motion.div className="hero-showcase" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.15}} aria-label="Selected work"
            onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false); }}>
            <div className="showcase-top"><span className="showcase-indicator"/><span>SELECTED WORK</span><span>{String(selectedIndex + 1).padStart(2,'0')} / {String(featuredWork.length).padStart(2,'0')}</span></div>
            <a className="showcase-project-link" href={projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${currentProject.title} ${currentProject.liveUrl ? 'live website' : 'source code'} in a new tab`}>
              <div className="showcase-image">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img key={currentProject.image} src={currentProject.image} alt={`Screenshot of ${currentProject.title}`} loading={selectedIndex === 0 ? 'eager' : 'lazy'}
                    initial={reduceMotion ? false : {opacity:0}} animate={{opacity:1}} exit={reduceMotion ? undefined : {opacity:0}}
                    transition={{duration:reduceMotion ? 0 : .3}}/>
                </AnimatePresence>
              </div>
              <div className="showcase-bottom"><div><strong>{currentProject.title}</strong><small>{currentProject.technologies.slice(0,3).join(' · ')}</small></div><ArrowUpRight size={20}/></div>
            </a>
            {featuredWork.length > 1 && (
              <div className="showcase-controls" aria-label="Choose showcased project">
                <div className="showcase-dots">{featuredWork.map((project,index)=><button type="button" key={project.title} aria-label={`Show ${project.title}`} aria-current={index===selectedIndex ? 'true' : undefined} className={index===selectedIndex ? 'active' : ''} onClick={()=>setSelectedIndex(index)}/>)}</div>
                <div className="showcase-buttons"><button type="button" aria-label="Previous project" onClick={()=>setSelectedIndex(i=>(i+featuredWork.length-1)%featuredWork.length)}><ChevronLeft size={17}/></button><button type="button" aria-label="Next project" onClick={()=>setSelectedIndex(i=>(i+1)%featuredWork.length)}><ChevronRight size={17}/></button></div>
              </div>
            )}
          </motion.div>
        )}
      </div>
      {showResume && <ResumeViewer isOpen={isResumeOpen} onClose={()=>setIsResumeOpen(false)} />}
    </section>
  );
}