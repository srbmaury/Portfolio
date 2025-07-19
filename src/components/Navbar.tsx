import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onOpenTerminal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md dark:bg-slate-900/95' : 'bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text"
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="transition-colors duration-200 font-medium"
                style={{
                  color: 'var(--nav-text)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--nav-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--nav-text)';
                }}
              >
                {item.name}
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Terminal Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-green-400 rounded-lg hover:bg-green-900 hover:text-green-300 transition-colors duration-200 font-medium ml-4 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
              title="Open Terminal"
            >
              <TerminalIcon size={18} />
              <span className="hidden sm:inline">Terminal</span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="transition-colors duration-200"
              style={{
                color: 'var(--nav-text)',
              }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
            {/* Terminal Button Mobile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenTerminal}
              className="flex items-center gap-1 px-2 py-2 bg-gray-900 text-green-400 rounded-lg hover:bg-green-900 hover:text-green-300 transition-colors duration-200 font-medium dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
              title="Open Terminal"
            >
              <TerminalIcon size={18} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 font-medium"
                  style={{
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--nav-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 