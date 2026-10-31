import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectModal from './ProjectModal';
import { useModal } from '../hooks/useModal';
import projectsData from '../config/projects.json';
import type { Project } from '../types/project';
import LazyImage from './LazyImage';
import { fallbackGradientMap, defaultFallbackGradient } from '../config/gradientMap';
import { trackProjectEvent } from '../utils/analytics';
import { useRouteSeo } from '../hooks/useRouteSeo';
import profile from '../config/profile.json';

const hideBeginnerProjects = import.meta.env.VITE_HIDE_BEGINNER_PROJECTS === 'true';

const categories = ['All', 'Developer tools', 'AI & ML', 'Web & data', 'Mobile', 'Earlier projects'] as const;
type Category = typeof categories[number];
const categoryFor = (project: Project): Category => {
  if (['ExitSense', 'RecallLater', 'NEET'].includes(project.title)) return 'Mobile';
  if (['PR Blast Radius', 'Developer Knowledge Base', 'Codeforces Filter', 'YAML Data Visualizer'].includes(project.title)) return 'Developer tools';
  if (['Evalcue AI', 'Chess ML Coach', 'Ecommerce Search Engine'].includes(project.title)) return 'AI & ML';
  if (['India Startup Map', 'Kindred Code', 'MERN Chat Application', 'Hackathon Portal', 'Store Management System'].includes(project.title)) return 'Web & data';
  return 'Earlier projects';
};

const ProjectArchive = () => {
  const [category, setCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsProjectModalOpen } = useModal();
  const projects = (projectsData.projects as Project[]).filter(
    (project) => !project.featured && (!hideBeginnerProjects || !project.beginner)
  );

  const visibleProjects = projects.filter(project => category === 'All' || categoryFor(project) === category);
  const availableCategories = categories.filter(item => item === 'All' || projects.some(project => categoryFor(project) === item));

  const openProjectDetails = (project: Project) => {
    trackProjectEvent('project_details_click', project.title);
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsProjectModalOpen(true);
  };

  const closeProjectDetails = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsProjectModalOpen(false);
  };

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
          url: project.githubUrl ?? project.liveUrl,
        })),
      },
    },
  });

  return (
    <section className="section min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: '8rem' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="font-semibold mb-3" style={{ color: 'var(--primary-color)' }}>PROJECT ARCHIVE</p>
          <h1 className="section-title">Project archive</h1>
          <p className="section-subtitle mb-6">
            Smaller tools, experiments, and earlier projects from my development journey.
          </p>
          <Link to="/#projects" className="btn btn-secondary">
            <ArrowLeft size={18} /> Back to selected projects
          </Link>
        </motion.div>

        <nav className="archive-filters" aria-label="Filter projects by category">
          {availableCategories.map(item => <button key={item} type="button" aria-pressed={category === item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item} <span>{item === "All" ? projects.length : projects.filter(p => categoryFor(p) === item).length}</span></button>)}
        </nav>
        <p className="archive-count" aria-live="polite">Showing {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}</p>
        {visibleProjects.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`card flex flex-col ${visibleProjects.length % 3 === 1 && index === visibleProjects.length - 1 ? 'lg:col-start-2' : ''}`}
            >
              {project.image ? (
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-36 object-cover object-top rounded-lg mb-5 ${project.imageFit === 'contain' ? 'image-contain' : ''}`}
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
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-3" style={{ borderColor: 'var(--border-color)' }}>
                <button type="button" onClick={() => openProjectDetails(project)} className="min-h-11 inline-flex items-center gap-2 font-medium text-sm" style={{ color: 'var(--primary-color)' }}>
                  <Info size={16} /> Project details
                </button>
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center gap-2 font-medium text-sm" style={{ color: 'var(--primary-color)' }} onClick={() => trackProjectEvent('live_demo_click', project.title)} aria-label={`View ${project.title}`}>
                  <ExternalLink size={16} /> Live demo
                </a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center gap-2 font-medium text-sm" style={{ color: 'var(--text-secondary)' }} onClick={() => trackProjectEvent('github_click', project.title)} aria-label={`View ${project.title} source code`}>
                  <Github size={16} /> Source code
                </a>}
              </div>
            </motion.article>
          ))}
        </div> : <p className="rounded-xl border p-6 text-center" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>No projects in this category yet.</p>}
      </div>
      <ProjectModal isOpen={isModalOpen} onClose={closeProjectDetails} project={selectedProject} />
    </section>
  );
};

export default ProjectArchive;
