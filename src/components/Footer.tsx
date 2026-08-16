import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import profile from '../config/profile.json';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--footer-text-primary)' }}>
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
            <h3 className="text-2xl font-bold gradient-text mb-4">{profile.personalInfo.name}</h3>
            <p className="leading-relaxed" style={{ color: 'var(--footer-text-secondary)' }}>
              {profile.personalInfo.bio}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-center md:mt-0"
          >
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--footer-text-primary)' }}>Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <Link
                  key={link}
                  to={`/#${link.toLowerCase()}`}
                  className="block transition-colors duration-200"
                  style={{ color: 'var(--footer-text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--footer-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--footer-text-secondary)';
                  }}
                >
                  {link}
                </Link>
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
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--footer-text-primary)' }}>Contact</h4>
            <div className="space-y-2" style={{ color: 'var(--footer-text-secondary)' }}>
              <p>{profile.personalInfo.email}</p>
              <p>{profile.personalInfo.phone}</p>
              <p>{profile.personalInfo.location}</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t my-8" style={{ borderColor: 'var(--border-color)' }}></div>

        {/* Bottom Section */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ color: 'var(--footer-text-secondary)' }}
        >
          © {new Date().getFullYear()} {profile.personalInfo.name}
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
