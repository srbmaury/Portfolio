import { motion } from 'framer-motion';
import { ArrowDown, Code2, Eye, Github } from 'lucide-react';
import { useState } from 'react';
import { trackHeroEvent } from '../utils/analytics';
import profile from '../config/profile.json';
import ResumeViewer from './ResumeViewer';

const showResume = import.meta.env.VITE_SHOW_RESUME === 'true' && Boolean(import.meta.env.VITE_RESUME_URL);

const Hero = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const scrollToAbout = () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16" style={{ background: 'linear-gradient(145deg, var(--bg-secondary), var(--bg-primary) 55%, var(--bg-secondary))' }} role="region" aria-label="Introduction">
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--primary-color)' }}>Software Engineer</p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            <span className="gradient-text">{profile.personalInfo.name}</span>
          </h1>
          <h2 className="mb-6 text-xl font-medium md:text-2xl" style={{ color: 'var(--text-secondary)' }}>
            Distributed Systems <span aria-hidden="true">•</span> Developer Tools <span aria-hidden="true">•</span> AI Products
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-base leading-8 md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Building scalable backend systems, developer infrastructure, and AI-powered products. Exploring open source, system design, performance engineering, and continuous learning.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#projects" className="btn btn-primary" onClick={() => trackHeroEvent('cta_click', 'view_projects')}>
              <Code2 size={19} /> <span>Explore My Work</span>
            </a>
            {showResume && (
              <button type="button" className="btn btn-secondary" onClick={() => { trackHeroEvent('cta_click', 'view_resume'); setIsResumeOpen(true); }}>
                <Eye size={19} /> <span>Resume</span>
              </button>
            )}
            <a href={profile.personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" onClick={() => trackHeroEvent('github_click', 'hero')}>
              <Github size={19} /> <span>GitHub</span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }} aria-label="Career highlights">
            <span>Salesforce</span><span aria-hidden="true">•</span><span>Razorpay</span><span aria-hidden="true">•</span><span>IIT BHU</span>
          </div>

          <button type="button" onClick={scrollToAbout} className="mt-12 inline-flex flex-col items-center gap-2 text-sm transition-colors hover:text-[var(--primary-color)]" style={{ color: 'var(--text-secondary)' }}>
            <span>Know more about me</span>
            <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity }}><ArrowDown size={20} /></motion.span>
          </button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--primary-color)', opacity: 0.12 }} />
        <div className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--accent-color)', opacity: 0.1 }} />
      </div>

      {showResume && <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />}
    </section>
  );
};

export default Hero;
