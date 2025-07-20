import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<string>('');
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail effect
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrails(prev => [...prev.slice(-5), newTrail]); // Keep last 5 trails
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      
      // Determine hover type based on element
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        setHoverType('button-hover');
      } else if (target.tagName === 'A' || target.closest('a')) {
        setHoverType('link-hover');
      } else if (target.closest('.terminal')) {
        setHoverType('terminal-hover');
      } else {
        setHoverType('hover');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoverType('');
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .terminal, .card, .btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.filter(trail => Date.now() - trail.id < 1000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div
        className={`cursor-dot ${isHovering ? hoverType : ''}`}
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      />
      
      {/* Cursor ring */}
      <div
        className={`cursor-ring ${isHovering ? hoverType : ''}`}
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      />
      
      {/* Cursor trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 2,
            top: trail.y - 2,
            opacity: 0.6 - (index * 0.1),
            transform: `scale(${1 - index * 0.1})`,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor; 