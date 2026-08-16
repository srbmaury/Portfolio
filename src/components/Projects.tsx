
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Eye, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectModal from './ProjectModal';
import LazyImage from './LazyImage';
import projectsData from '../config/projects.json';
import type { Project } from '../types/project';
import { useModal } from '../hooks/useModal';
import { fallbackGradientMap, defaultFallbackGradient } from '../config/gradientMap';
import { trackProjectEvent } from '../utils/analytics';

const hideBeginnerProjects = import.meta.env.VITE_HIDE_BEGINNER_PROJECTS === 'true';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsProjectModalOpen } = useModal();

  const handleProjectClick = (project: Project) => {
    // Track project view
    trackProjectEvent('view', project.title);

    setSelectedProject(project);
    setIsModalOpen(true);
    setIsProjectModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsProjectModalOpen(false);
  };

  const projects = projectsData.projects as Project[];

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-primary)' }} aria-label="Projects section" role="region" tabIndex={-1}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" tabIndex={0} aria-label="Featured Projects">Featured Projects</h2>
          <p className="section-subtitle">
            A curated selection of production-minded projects spanning AI, full-stack development, data visualization, and mobile engineering.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.filter((project) => project.featured && (!hideBeginnerProjects || !project.beginner)).map((project, index, featuredProjects) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card group flex flex-col ${featuredProjects.length % 2 === 1 && index === featuredProjects.length - 1 ? 'lg:col-span-2 lg:max-w-2xl lg:w-full lg:mx-auto' : ''}`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                {project.image ? (
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover object-top"
                    spinnerClassName="profile-spinner"
                    fallback={
                      <div
                        className="w-full h-48 flex items-center justify-center relative overflow-hidden"
                        style={{
                          background:
                            fallbackGradientMap[project.fallbackGradient] || defaultFallbackGradient
                        }}
                      >
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                          <div className="absolute top-12 right-8 w-4 h-4 bg-white rounded-full"></div>
                          <div className="absolute bottom-8 left-12 w-6 h-6 border-2 border-white rounded-lg"></div>
                          <div className="absolute bottom-16 right-4 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="text-white text-center z-10">
                          <div className="text-6xl mb-4 animate-pulse">{project.fallbackIcon || '🚀'}</div>
                          <p className="text-xl font-bold mb-2">{project.title}</p>
                          <p className="text-sm opacity-90">Click to explore</p>
                        </div>
                      </div>
                    }
                  />
                ) : (
                  <div
                    className="w-full h-48 flex items-center justify-center relative overflow-hidden"
                    style={{
                      background:
                        fallbackGradientMap[project.fallbackGradient] || defaultFallbackGradient
                    }}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                      <div className="absolute top-12 right-8 w-4 h-4 bg-white rounded-full"></div>
                      <div className="absolute bottom-8 left-12 w-6 h-6 border-2 border-white rounded-lg"></div>
                      <div className="absolute bottom-16 right-4 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="text-white text-center z-10">
                      <div className="text-6xl mb-4 animate-pulse">{project.fallbackIcon || '🚀'}</div>
                      <p className="text-xl font-bold mb-2">{project.title}</p>
                      <p className="text-sm opacity-90">Click to explore</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 gradient-text">{project.title}</h3>
                <p className="mb-4 leading-relaxed line-clamp-4 sm:line-clamp-none" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 5).map((tech, techIndex) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-sm rounded-full font-medium ${techIndex >= 3 ? 'hidden sm:inline-flex' : ''}`}
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        opacity: 0.9
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && <span className="px-3 py-1 text-sm rounded-full font-medium sm:hidden" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-secondary)' }}>+{project.technologies.length - 3}</span>}
                  {project.technologies.length > 5 && <span className="hidden sm:inline-flex px-3 py-1 text-sm rounded-full font-medium" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-secondary)' }}>+{project.technologies.length - 5}</span>}
                </div>

                {/* Project Links */}
                <div className="flex flex-wrap gap-4 mt-auto">
                  <button onClick={() => handleProjectClick(project)} className="min-h-11 flex items-center space-x-2 font-medium" style={{ color: 'var(--primary-color)' }}>
                    <Info size={16} /><span>Details</span>
                  </button>
                  {project.liveUrl && project.liveUrl !== project.githubUrl && <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-11 flex items-center space-x-2 font-medium transition-colors duration-200"
                    style={{ color: 'var(--primary-color)' }}
                    onClick={() => trackProjectEvent('live_demo_click', project.title)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <Eye size={16} />
                    <span>Live Demo</span>
                  </a>}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-11 flex items-center space-x-2 font-medium transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={() => trackProjectEvent('github_click', project.title)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    <Github size={16} />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project archive link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Looking for experiments, earlier builds, and smaller utilities?
            </p>
            <Link to="/projects" className="btn btn-secondary">
              Explore the project archive <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
