
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Play } from 'lucide-react';
import ProjectModal from './ProjectModal';
import LazyImage from './LazyImage';
import projectsData from '../config/projects.json';
import type { Project } from '../types/project';
import { useModal } from '../hooks/useModal';
import { fallbackGradientMap, defaultFallbackGradient } from '../config/gradientMap';
import { trackProjectEvent } from '../utils/analytics';

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
            Here are some of my projects that showcase my skills in full-stack development, game development, and API integration.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group"
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
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                    <motion.button
                      onClick={() => handleProjectClick(project)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-800 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      title="View Demo"
                      aria-label={`View demo for ${project.title}`}
                    >
                      <Play size={20} />
                    </motion.button>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackProjectEvent('live_demo_click', project.title)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-800 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackProjectEvent('github_click', project.title)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-800 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    >
                      <Github size={20} />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div>
                <h3 className="text-xl font-bold mb-3 gradient-text">{project.title}</h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full font-medium"
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        opacity: 0.9
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 font-medium transition-colors duration-200"
                    style={{ color: 'var(--primary-color)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <Eye size={16} />
                    <span>View Project</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 font-medium transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
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

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">All Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-32 object-cover object-top"
                      onError={(e) => {
                        // Fallback to beautiful placeholder if image doesn't load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  {/* Beautiful fallback placeholder */}
                  <div
                    className={`w-full h-32 flex items-center justify-center ${!project.image ? '' : 'hidden'} relative overflow-hidden z-0`}
                    style={{
                      background:
                        fallbackGradientMap[project.fallbackGradient] || defaultFallbackGradient
                    }}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 left-2 w-4 h-4 border border-white rounded-full"></div>
                      <div className="absolute top-6 right-4 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute bottom-4 left-6 w-3 h-3 border border-white rounded"></div>
                    </div>
                    <div className="text-white text-center z-10">
                      <div className="text-3xl mb-1 animate-pulse">{project.fallbackIcon || '🚀'}</div>
                      <p className="text-sm font-bold">{project.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <motion.button
                        onClick={() => handleProjectClick(project)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
                        title="View Demo"
                      >
                        <Play size={16} />
                      </motion.button>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      >
                        <Github size={16} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div>
                  <h4 className="text-lg font-bold mb-2 gradient-text">{project.title}</h4>
                  <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full font-medium"
                        style={{
                          backgroundColor: 'var(--primary-color)',
                          color: 'white',
                          opacity: 0.9
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className="px-2 py-1 text-xs rounded-full font-medium"
                        style={{
                          backgroundColor: 'var(--tag-bg)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4 relative z-10" style={{ pointerEvents: 'auto' }}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-3 py-2 font-medium transition-colors duration-200 text-sm rounded-lg relative z-50"
                      style={{
                        color: 'var(--primary-color)',
                        pointerEvents: 'auto'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-3 py-2 font-medium transition-colors duration-200 text-sm rounded-lg relative z-50"
                      style={{
                        color: 'var(--text-secondary)',
                        pointerEvents: 'auto'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
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