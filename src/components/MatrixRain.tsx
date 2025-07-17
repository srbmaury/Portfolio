import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatrixRainProps {
  isActive: boolean;
  onClose: () => void;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ isActive, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (mix of katakana, numbers, and symbols)
    const matrixChars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Rain drops
    const drops: { x: number; y: number; speed: number; char: string; opacity: number }[] = [];
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * fontSize,
        y: Math.random() * -canvas.height,
        speed: 1 + Math.random() * 2,
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
        opacity: 0.1 + Math.random() * 0.9
      });
    }

    // Animation loop
    const animate = () => {
      if (!isActive) return;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = '#0f0';

             // Update and draw drops
       drops.forEach((drop) => {
        // Update position
        drop.y += drop.speed;
        
        // Reset drop if it goes off screen
        if (drop.y > canvas.height) {
          drop.y = Math.random() * -100;
          drop.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          drop.opacity = 0.1 + Math.random() * 0.9;
        }

        // Draw the character with varying opacity
        ctx.globalAlpha = drop.opacity;
        ctx.fillText(drop.char, drop.x, drop.y);
        
        // Add glow effect for some characters
        if (Math.random() > 0.95) {
          ctx.shadowColor = '#0f0';
          ctx.shadowBlur = 10;
          ctx.fillText(drop.char, drop.x, drop.y);
          ctx.shadowBlur = 0;
        }
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        onClose();
      }
    };

    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onClose]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] pointer-events-none"
        >
          {/* Matrix Rain Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ background: 'transparent' }}
          />
          
          {/* Overlay Controls */}
          <div className="absolute top-4 right-4 pointer-events-auto">
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              className="bg-black/50 text-green-400 hover:text-green-300 hover:bg-black/70 px-3 py-2 rounded-lg border border-green-400/30 backdrop-blur-sm transition-all duration-200"
            >
              Exit Matrix
            </motion.button>
          </div>

          {/* Matrix Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-green-400 mb-4 tracking-wider">
                MATRIX
              </h1>
              <p className="text-green-300 text-lg md:text-xl">
                Welcome to the digital realm
              </p>
              <p className="text-green-400/60 text-sm mt-2">
                Press ESC or click "Exit Matrix" to return
              </p>
            </div>
          </motion.div>

          {/* Floating Matrix Code */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  opacity: 0
                }}
                animate={{ 
                  y: window.innerHeight + 50,
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3
                }}
                className="absolute text-green-400/30 text-xs font-mono"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                {`${Math.random().toString(16).substring(2, 8).toUpperCase()}`}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatrixRain; 