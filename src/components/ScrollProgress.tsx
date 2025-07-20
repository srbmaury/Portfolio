import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9998] origin-left"
      style={{ 
        scaleX,
        background: 'linear-gradient(to right, var(--primary-color), var(--accent-color))'
      }}
    />
  );
};

export default ScrollProgress; 