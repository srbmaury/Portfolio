import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'MERN Chat Application',
      description: 'A real-time chat application built with MERN stack featuring JWT authentication, WhatsApp-like interface, and secure messaging capabilities. Includes user authentication and real-time communication.',
      image: '/images/MernChatApp.png',
      fallbackIcon: '💬',
      fallbackGradient: 'from-green-400 to-blue-500',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT', 'Express'],
      liveUrl: 'https://mern-chat-app-xlr3.onrender.com/',
      githubUrl: 'https://github.com/srbmaury/MERN-Chat-App',
      featured: true
    },
    {
      title: 'Store Management System',
      description: 'A comprehensive store management application with inventory tracking, sales management, and reporting features. Built with modern JavaScript and responsive design.',
      image: '/images/StoreManagement.png',
      fallbackIcon: '🏪',
      fallbackGradient: 'from-purple-400 to-pink-500',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Local Storage', 'Bootstrap'],
      liveUrl: 'https://store-management-frontend-x0e2.onrender.com/',
      githubUrl: 'https://github.com/srbmaury/store-management',
      featured: true
    },
    {
      title: 'Kanban Board',
      description: 'A Trello-like kanban board application for task management and project organization. Features drag-and-drop functionality and real-time updates.',
      image: '/images/KanbanBoard.png',
      fallbackIcon: '📋',
      fallbackGradient: 'from-blue-400 to-indigo-500',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Drag & Drop API', 'Local Storage'],
      liveUrl: 'https://saurabh-kanban-board.netlify.app/',
      githubUrl: 'https://github.com/srbmaury/saurabh-kanban-board',
      featured: false
    },
    {
      title: 'Notes Application',
      description: 'A feature-rich notes application with CRUD operations, search functionality, and markdown support. Built for Hacktoberfest contribution.',
      image: '/images/MagicNotes.png',
      fallbackIcon: '📝',
      fallbackGradient: 'from-yellow-400 to-orange-500',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Local Storage', 'Markdown'],
      liveUrl: 'https://srbmaury.github.io/notes/',
      githubUrl: 'https://github.com/srbmaury/notes',
      featured: false
    },
    {
      title: 'Quiz Application',
      description: 'An interactive quiz application with multiple categories, scoring system, and result tracking. Features responsive design and user-friendly interface.',
      image: '/images/Quiz.png',
      fallbackIcon: '❓',
      fallbackGradient: 'from-red-400 to-pink-500',
      technologies: ['CSS', 'HTML', 'JavaScript', 'Quiz API', 'Responsive Design'],
      liveUrl: 'https://srbmaury.github.io/quiz1/',
      githubUrl: 'https://github.com/srbmaury/quiz1',
      featured: false
    },
    {
      title: 'Tic Tac Toe Game',
      description: 'A classic Tic Tac Toe game with AI opponent, score tracking, and smooth animations. Features both single-player and two-player modes.',
      image: '/images/TictacToe.png',
      fallbackIcon: '⭕',
      fallbackGradient: 'from-green-400 to-teal-500',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Game Logic', 'AI Algorithm'],
      liveUrl: 'https://tic-tac-toe-silk-sigma.vercel.app/',
      githubUrl: 'https://github.com/srbmaury/tic-tac-toe',
      featured: false
    },
    {
      title: 'Dictionary Application',
      description: 'A comprehensive dictionary application with word definitions, pronunciations, and example usage. Integrates with external dictionary APIs.',
      image: '/images/Dictionary.png',
      fallbackIcon: '📚',
      fallbackGradient: 'from-indigo-400 to-purple-500',
      technologies: ['JavaScript', 'HTML', 'CSS', 'API Integration', 'Responsive Design'],
      liveUrl: 'https://srbmaury.github.io/dictionary/',
      githubUrl: 'https://github.com/srbmaury/dictionary',
      featured: false
    },
    {
      title: 'Flappy Bird Game',
      description: 'A recreation of the classic Flappy Bird game with smooth animations, score tracking, and responsive controls.',
      image: '/images/FlappyBird.png',
      fallbackIcon: '🐦',
      fallbackGradient: 'from-yellow-400 to-green-500',
      technologies: ['JavaScript', 'HTML5 Canvas', 'CSS', 'Game Development', 'Animation'],
      liveUrl: 'https://srbmaury.github.io/flappyBird/',
      githubUrl: 'https://github.com/srbmaury/flappyBird',
      featured: false
    },
    {
      title: 'Codeforces Filter',
      description: 'A chrome extension to filter and display blog entries from Codeforces users with specified minimum ratings and blog quality filters.',
      fallbackIcon: '🔍',
      fallbackGradient: 'from-gray-400 to-blue-500',
      technologies: ['JavaScript', 'HTML', 'CSS', 'API Integration', 'Data Filtering'],
      liveUrl: 'https://github.com/srbmaury/CF-Filter-Recent-Actions',
      githubUrl: 'https://github.com/srbmaury/CF-Filter-Recent-Actions',
      featured: false
    },
    {
      title: 'Payment Flow Testing',
      description: 'End-to-end testing implementation for payment flows using public API documentation. Comprehensive testing for merchant payment processing.',
      fallbackIcon: '💳',
      fallbackGradient: 'from-emerald-400 to-cyan-500',
      technologies: ['HTML', 'JavaScript', 'API Testing', 'Payment Integration', 'E2E Testing'],
      liveUrl: 'https://github.com/srbmaury/Flow-for-payments',
      githubUrl: 'https://github.com/srbmaury/Flow-for-payments',
      featured: false
    }
  ];

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
                <div className={`w-full h-48 bg-gradient-to-br ${project.fallbackGradient} flex items-center justify-center ${!project.image ? '' : 'hidden'} relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                    <div className="absolute top-12 right-8 w-4 h-4 bg-white rounded-full"></div>
                    <div className="absolute bottom-8 left-12 w-6 h-6 border-2 border-white rounded-lg"></div>
                    <div className="absolute bottom-16 right-4 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="text-white text-center z-10">
                    <div className="text-6xl mb-4 animate-pulse">{project.fallbackIcon}</div>
                    <p className="text-xl font-bold mb-2">{project.title}</p>
                    <p className="text-sm opacity-90">Click to explore</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
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
                  <div className={`w-full h-32 bg-gradient-to-br ${project.fallbackGradient} flex items-center justify-center ${!project.image ? '' : 'hidden'} relative overflow-hidden z-0`}>
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 left-2 w-4 h-4 border border-white rounded-full"></div>
                      <div className="absolute top-6 right-4 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute bottom-4 left-6 w-3 h-3 border border-white rounded"></div>
                    </div>
                    <div className="text-white text-center z-0">
                      <div className="text-3xl mb-1 animate-pulse">{project.fallbackIcon}</div>
                      <p className="text-sm font-bold">{project.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
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
    </section>
  );
};

export default Projects; 