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
      <div className="w-full h-96 bg-white rounded-lg overflow-hidden relative">
        {/* Zoom Controls */}
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-lg transition-colors"
            title="Zoom Out (-)"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-lg transition-colors"
            title="Zoom In (+)"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-lg transition-colors"
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
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-pulse">{project.fallbackIcon}</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">{project.title}</h3>
          <p className="text-lg text-gray-600 max-w-md mx-auto">{project.description}</p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <ExternalLink size={20} />
              View Project
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                <p className="text-gray-600 mt-1">{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Play size={20} className="text-blue-600" />
                    Project Demo
                    {zoom !== 1 && (
                      <span className="text-sm text-gray-500 ml-2">
                        (Zoom: {Math.round(zoom * 100)}%)
                      </span>
                    )}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-lg transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
                {renderDemoContent()}
                
                {/* Zoom Instructions */}
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Use <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">+</kbd> <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">-</kbd> <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">0</kbd> keys or buttons to zoom
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features/Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Responsive design that works on all devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Modern UI/UX with smooth animations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Optimized performance and accessibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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