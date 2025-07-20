import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Loading components...' },
      { progress: 40, text: 'Setting up theme...' },
      { progress: 60, text: 'Preparing animations...' },
      { progress: 80, text: 'Almost ready...' },
      { progress: 100, text: 'Welcome!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onLoadingComplete, 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="text-center">
          {/* Logo/Name */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold gradient-text mb-2">Saurabh Maurya</h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Full Stack Engineer</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-2 rounded-full overflow-hidden mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>

          {/* Loading Text */}
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ color: 'var(--text-secondary)' }}
          >
            {loadingText}
          </motion.p>

          {/* Animated Dots */}
          <div className="flex justify-center mt-4 space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--primary-color)' }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen; 