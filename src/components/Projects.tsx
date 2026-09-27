import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Github, Info } from 'lucide-react';
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
  const projects = projectsData.projects as Project[];

  const handleProjectClick = (project: Project) => {
    trackProjectEvent('project_details_click', project.title);
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsProjectModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsProjectModalOpen(false);
  };

  const featuredProjects = projects.filter((project) => project.featured && (!hideBeginnerProjects || !project.beginner));

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-primary)' }} aria-label="Featured engineering work" role="region" tabIndex={-1}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="section-title">Featured Engineering</h2>
          <p className="section-subtitle">
            A few projects that best show how I approach systems, product engineering, performance, developer tooling, and applied ML.
          </p>
        </motion.div>

        <div className="mb-14 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="group flex flex-col overflow-hidden rounded-2xl border"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
            >
              <div className="relative overflow-hidden border-b" style={{ borderColor: 'var(--border-color)' }}>
                {project.image ? (
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover object-top"
                    spinnerClassName="profile-spinner"
                    fallback={
                      <div className="flex h-52 items-center justify-center" style={{ background: fallbackGradientMap[project.fallbackGradient] || defaultFallbackGradient }}>
                        <span className="text-5xl" aria-hidden="true">{project.fallbackIcon || '🚀'}</span>
                      </div>
                    }
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center" style={{ background: fallbackGradientMap[project.fallbackGradient] || defaultFallbackGradient }}>
                    <span className="text-5xl" aria-hidden="true">{project.fallbackIcon || '🚀'}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
                <p className="mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span key={tech} className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-secondary)' }}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="rounded-md px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-secondary)' }}>
                      +{project.technologies.length - 6}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
                  <button type="button" onClick={() => handleProjectClick(project)} className="inline-flex min-h-11 items-center gap-2" style={{ color: 'var(--primary-color)' }}>
                    <Info size={16} /> Case Study
                  </button>
                  {project.liveUrl && project.liveUrl !== project.githubUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2" style={{ color: 'var(--primary-color)' }} onClick={() => trackProjectEvent('live_demo_click', project.title)}>
                      <Eye size={16} /> Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2" style={{ color: 'var(--text-secondary)' }} onClick={() => trackProjectEvent('github_click', project.title)}>
                      <Github size={16} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center">
          <p className="mb-5" style={{ color: 'var(--text-secondary)' }}>
            The archive keeps the rest of the journey — experiments, Android apps, utilities, and earlier builds.
          </p>
          <Link to="/projects" className="btn btn-secondary">
            Explore My Project Journey <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
    </section>
  );
};

export default Projects;
