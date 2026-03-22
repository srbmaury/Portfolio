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

    const matrixChars =
      'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';

    const fontSize = 14;
    let drops: {
      x: number;
      y: number;
      speed: number;
      char: string;
      opacity: number;
    }[] = [];

    const initDrops = () => {
      const columns = Math.floor(canvas.width / fontSize);
      drops = [];

      for (let i = 0; i < columns; i++) {
        drops.push({
          x: i * fontSize,
          y: Math.random() * -canvas.height,
          speed: 1 + Math.random() * 2,
          char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
          opacity: 0.1 + Math.random() * 0.9,
        });
      }
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initDrops();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!isActive) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = '#0f0';

      drops.forEach((drop) => {
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = Math.random() * -100;
          drop.char =
            matrixChars[Math.floor(Math.random() * matrixChars.length)];
          drop.opacity = 0.1 + Math.random() * 0.9;
        }

        ctx.globalAlpha = drop.opacity;
        ctx.fillText(drop.char, drop.x, drop.y);

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

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  // Mobile-safe viewport height fix
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  // Escape key handler
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
          className="fixed inset-0 z-[60] pointer-events-none w-full"
          style={{
            height: 'calc(var(--vh) * 100)',
            overflow: 'hidden',
          }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: 'block' }}
          />

          {/* Exit Button */}
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

          {/* Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto text-center px-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-green-400 mb-4 tracking-wider">
              MATRIX
            </h1>
            <p className="text-green-300 text-base sm:text-lg md:text-xl">
              Welcome to the digital realm
            </p>
            <p className="text-green-400/60 text-xs sm:text-sm mt-2">
              Press ESC or tap "Exit Matrix"
            </p>
          </motion.div>

          {/* Floating Code */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  opacity: 0,
                }}
                animate={{
                  y: window.innerHeight + 50,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
                className="absolute text-green-400/30 text-xs font-mono"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              >
                {Math.random().toString(16).substring(2, 8).toUpperCase()}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatrixRain;