import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsData from '../config/projects.json';
import type { Project } from '../types/project';
import LazyImage from './LazyImage';
import { fallbackGradientMap, defaultFallbackGradient } from '../config/gradientMap';
import { trackProjectEvent } from '../utils/analytics';
import { useRouteSeo } from '../hooks/useRouteSeo';
import profile from '../config/profile.json';

const ProjectArchive = () => {
  const projects = (projectsData.projects as Project[]).filter((project) => !project.featured);

  useRouteSeo({
    title: `Software Engineering Projects | ${profile.personalInfo.name}`,
    description: 'Earlier builds, focused utilities, and production-minded experiments by Saurabh Maurya across web, mobile, developer tools, and data visualization.',
    canonicalPath: '/projects',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Software Engineering Projects',
      description: 'A collection of software projects and engineering experiments by Saurabh Maurya.',
      url: 'https://srbmaury.com/projects',
      author: {
        '@type': 'Person',
        name: profile.personalInfo.name,
        url: profile.personalInfo.portfolio,
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.title,
          url: project.githubUrl,
        })),
      },
    },
  });

  return (
    <section className="section min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: '8rem' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="font-semibold mb-3" style={{ color: 'var(--primary-color)' }}>PROJECT ARCHIVE</p>
          <h1 className="section-title">More Projects & Experiments</h1>
          <p className="section-subtitle mb-6">
            Earlier builds, focused utilities, and experiments that document my growth as a developer.
          </p>
          <Link to="/#projects" className="btn btn-secondary">
            <ArrowLeft size={18} /> Back to featured work
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`card flex flex-col ${projects.length % 3 === 1 && index === projects.length - 1 ? 'lg:col-start-2' : ''}`}
            >
              {project.image ? (
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-36 object-cover object-top rounded-lg mb-5"
                  fallback={
                    <div className="w-full h-36 rounded-lg mb-5 flex items-center justify-center text-5xl" style={{ background: fallbackGradientMap[project.fallbackGradient] || defaultFallbackGradient }}>
                      {project.fallbackIcon}
                    </div>
                  }
                />
              ) : (
                <div className="w-full h-36 rounded-lg mb-5 flex items-center justify-center text-5xl" style={{ background: fallbackGradientMap[project.fallbackGradient] || defaultFallbackGradient }}>
                  {project.fallbackIcon}
                </div>
              )}
              <h2 className="text-xl font-bold mb-3 gradient-text">{project.title}</h2>
              <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-secondary)' }}>{tech}</span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center gap-2 font-medium text-sm" style={{ color: 'var(--primary-color)' }} onClick={() => trackProjectEvent('live_demo_click', project.title)} aria-label={`View ${project.title}`}>
                  <ExternalLink size={16} /> View
                </a>}
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center gap-2 font-medium text-sm" style={{ color: 'var(--text-secondary)' }} onClick={() => trackProjectEvent('github_click', project.title)} aria-label={`View ${project.title} source code`}>
                  <Github size={16} /> Source
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectArchive;
