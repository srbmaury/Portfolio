import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Terminal as TerminalIcon, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useModal } from '../hooks/useModal';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps { onOpenTerminal: () => void; showTerminal: boolean; }

const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, showTerminal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isProjectModalOpen } = useModal();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      setIsOpen(false);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const goHome = () => {
    if (location.pathname !== '/') navigate('/');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} className="fixed left-0 right-0 top-0 z-50 transition-all duration-300" style={{ backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent', boxShadow: scrolled ? 'var(--shadow-sm)' : 'none', backdropFilter: scrolled ? 'blur(14px)' : 'none' }}>
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <button type="button" onClick={goHome} className="min-h-11 text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }} aria-label="Saurabh Maurya home">
            Saurabh Maurya
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <button key={item.name} type="button" onClick={() => scrollToSection(item.href)} className="min-h-11 text-sm font-medium transition-colors hover:text-[var(--primary-color)]" style={{ color: 'var(--nav-text)' }}>{item.name}</button>
            ))}
            <ThemeToggle />
            {showTerminal && !isProjectModalOpen && (
              <button type="button" onClick={onOpenTerminal} className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-primary)' }} title="Open terminal">
                <TerminalIcon size={17} /><span>Terminal</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex h-11 w-11 items-center justify-center" style={{ color: 'var(--nav-text)' }} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen}>
              {isOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t pb-3 md:hidden" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            {navItems.map((item) => (
              <button key={item.name} type="button" onClick={() => scrollToSection(item.href)} className="block min-h-11 w-full rounded-md px-3 py-2 text-left font-medium" style={{ color: 'var(--text-primary)' }}>{item.name}</button>
            ))}
            {showTerminal && !isProjectModalOpen && (
              <button type="button" onClick={onOpenTerminal} className="flex min-h-11 w-full items-center gap-2 px-3 text-left font-medium" style={{ color: 'var(--text-primary)' }}><TerminalIcon size={17} /> Terminal</button>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
