import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Play } from 'lucide-react';
import ProjectModal from './ProjectModal';
import projectsData from '../config/projects.json';
import type { Project } from '../types/project';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects = projectsData.projects as Project[];

  return (
    <section id="projects" className="section bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Featured Projects</h2>
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
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover object-top"
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
                  className={`w-full h-48 flex items-center justify-center ${!project.image ? '' : 'hidden'} relative overflow-hidden`}
                  style={{
                    background: project.fallbackGradient === 'from-gray-400 to-blue-500' ? 'linear-gradient(to bottom right, #9ca3af, #3b82f6)' :
                             project.fallbackGradient === 'from-emerald-400 to-cyan-500' ? 'linear-gradient(to bottom right, #34d399, #06b6d4)' :
                             project.fallbackGradient === 'from-purple-400 to-pink-500' ? 'linear-gradient(to bottom right, #a78bfa, #ec4899)' :
                             project.fallbackGradient === 'from-blue-400 to-indigo-500' ? 'linear-gradient(to bottom right, #60a5fa, #6366f1)' :
                             project.fallbackGradient === 'from-yellow-400 to-orange-500' ? 'linear-gradient(to bottom right, #fbbf24, #f97316)' :
                             project.fallbackGradient === 'from-red-400 to-pink-500' ? 'linear-gradient(to bottom right, #f87171, #ec4899)' :
                             project.fallbackGradient === 'from-green-400 to-teal-500' ? 'linear-gradient(to bottom right, #4ade80, #14b8a6)' :
                             project.fallbackGradient === 'from-indigo-400 to-purple-500' ? 'linear-gradient(to bottom right, #818cf8, #a855f7)' :
                             project.fallbackGradient === 'from-yellow-400 to-green-500' ? 'linear-gradient(to bottom right, #fbbf24, #22c55e)' :
                             'linear-gradient(to bottom right, #9ca3af, #3b82f6)'
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
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                    <motion.button
                      onClick={() => handleProjectClick(project)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-800 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      title="View Demo"
                    >
                      <Play size={20} />
                    </motion.button>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
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
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
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
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    <Eye size={16} />
                    <span>View Project</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
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
                      background: project.fallbackGradient === 'from-gray-400 to-blue-500' ? 'linear-gradient(to bottom right, #9ca3af, #3b82f6)' :
                               project.fallbackGradient === 'from-emerald-400 to-cyan-500' ? 'linear-gradient(to bottom right, #34d399, #06b6d4)' :
                               project.fallbackGradient === 'from-purple-400 to-pink-500' ? 'linear-gradient(to bottom right, #a78bfa, #ec4899)' :
                               project.fallbackGradient === 'from-blue-400 to-indigo-500' ? 'linear-gradient(to bottom right, #60a5fa, #6366f1)' :
                               project.fallbackGradient === 'from-yellow-400 to-orange-500' ? 'linear-gradient(to bottom right, #fbbf24, #f97316)' :
                               project.fallbackGradient === 'from-red-400 to-pink-500' ? 'linear-gradient(to bottom right, #f87171, #ec4899)' :
                               project.fallbackGradient === 'from-green-400 to-teal-500' ? 'linear-gradient(to bottom right, #4ade80, #14b8a6)' :
                               project.fallbackGradient === 'from-indigo-400 to-purple-500' ? 'linear-gradient(to bottom right, #818cf8, #a855f7)' :
                               project.fallbackGradient === 'from-yellow-400 to-green-500' ? 'linear-gradient(to bottom right, #fbbf24, #22c55e)' :
                               'linear-gradient(to bottom right, #9ca3af, #3b82f6)'
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
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
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
                      className="inline-flex items-center space-x-2 px-3 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 text-sm hover:bg-blue-50 rounded-lg relative z-50"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 text-sm hover:bg-gray-50 rounded-lg relative z-50"
                      style={{ pointerEvents: 'auto' }}
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