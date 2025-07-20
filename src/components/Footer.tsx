import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">Saurabh Maurya</h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Software Development Engineer passionate about building scalable applications 
              and solving complex technical challenges.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Contact</h4>
            <div className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <p>srbmaury@gmail.com</p>
              <p>+91 7355069174</p>
              <p>Chandauli, UP</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t my-8" style={{ borderColor: 'var(--border-color)' }}></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
            style={{ color: 'var(--text-secondary)' }}
          >
            © {new Date().getFullYear()} Saurabh Maurya. Made with{' '}
            <Heart size={16} className="inline" style={{ color: '#ef4444' }} /> and React.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 