import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Play, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import type { ProjectModalProps } from '../types/project';

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case '=':
      case '+':
        e.preventDefault();
        handleZoomIn();
        break;
      case '-':
        e.preventDefault();
        handleZoomOut();
        break;
      case '0':
        e.preventDefault();
        handleReset();
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!project) return null;

  const renderDemoContent = () => {
    // Calculate dimensions to fill available space when zoomed out
    const containerWidth = 800; // Approximate modal width
    const containerHeight = 384; // h-96 = 24rem = 384px
    
    const demoStyle = {
      transform: `scale(${zoom}) rotate(${rotation}deg)`,
      transition: 'transform 0.2s ease-in-out',
      width: zoom < 1 ? `${containerWidth / zoom}px` : '100%',
      height: zoom < 1 ? `${containerHeight / zoom}px` : '100%',
    };

    // Zoom functionality for content scaling

    const renderContent = (content: React.ReactNode) => (
      <div className="w-full h-96 rounded-lg overflow-hidden relative" style={{ backgroundColor: 'var(--card-bg)' }}>
        {/* Zoom Controls */}
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg shadow-lg transition-colors"
            style={{ 
              backgroundColor: 'var(--card-bg)', 
              color: 'var(--text-primary)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
            }}
            title="Zoom Out (-)"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg shadow-lg transition-colors"
            style={{ 
              backgroundColor: 'var(--card-bg)', 
              color: 'var(--text-primary)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
            }}
            title="Zoom In (+)"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg shadow-lg transition-colors"
            style={{ 
              backgroundColor: 'var(--card-bg)', 
              color: 'var(--text-primary)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
            }}
            title="Reset (0)"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full h-full overflow-auto flex items-center justify-center">
          <div style={demoStyle} className="origin-center">
            {content}
          </div>
        </div>
      </div>
    );

    if (project.demoType === 'iframe' && project.demoUrl) {
      return renderContent(
        <iframe
          src={project.demoUrl}
          className="w-full h-full border-0"
          title={`${project.title} Demo`}
          allowFullScreen
        />
      );
    }

    if (project.demoType === 'video' && project.demoUrl) {
      return renderContent(
        <video
          src={project.demoUrl}
          className="w-full h-full object-cover"
          controls
          autoPlay
          muted
          loop
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    // Default to project image or fallback
    if (project.image) {
      return renderContent(
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      );
    }

    // Fallback for projects without images or demos
    return renderContent(
      <div className="w-full h-full flex items-center justify-center" style={{ 
        background: 'linear-gradient(to bottom right, var(--bg-secondary), var(--bg-primary))'
      }}>
        <div className="text-center">
          <div className="text-8xl mb-6 animate-pulse">{project.fallbackIcon}</div>
          <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
          <p className="text-lg max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--primary-color)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--secondary-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-color)';
              }}
            >
              <ExternalLink size={20} />
              View Project
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--bg-dark)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-dark)';
              }}
            >
              <Github size={20} />
              View Code
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            style={{ backgroundColor: 'var(--card-bg)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</h2>
                <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Demo Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <Play size={20} style={{ color: 'var(--primary-color)' }} />
                    Project Demo
                    {zoom !== 1 && (
                      <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>
                        (Zoom: {Math.round(zoom * 100)}%)
                      </span>
                    )}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-white text-sm rounded-lg transition-colors"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--secondary-color)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                      }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-white text-sm rounded-lg transition-colors"
                      style={{ backgroundColor: 'var(--bg-dark)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-dark)';
                      }}
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
                {renderDemoContent()}
                
                {/* Zoom Instructions */}
                <div className="mt-3 text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                  Use <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>+</kbd> <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>-</kbd> <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>0</kbd> keys or buttons to zoom
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
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
              </div>

              {/* Features/Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Key Features</h3>
                <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                    <span>Responsive design that works on all devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                    <span>Modern UI/UX with smooth animations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                    <span>Optimized performance and accessibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                    <span>Clean, maintainable code structure</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 