import { motion } from 'framer-motion';
import { useState } from 'react';
import ResumeViewer from './ResumeViewer';
import LazyImage from './LazyImage';

const About = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const experiences = [
    {
      year: 'June 2024 - Present',
      title: 'Associate Member of Technical Staff',
      company: 'Salesforce',
      location: 'Hyderabad',
      description: 'Engineered interactive dependency graphs using D3.js, developed AI-driven test data generators, and automated frontend testing achieving 90% test coverage. Technologies: SOQL, Java, Apex, Git, UTAM, Selenium, LWC, Salesforce DB, JavaScript.'
    },
    {
      year: 'May 2023 - July 2023',
      title: 'Software Development Intern',
      company: 'Razorpay Software Pvt. Ltd.',
      location: 'Bengaluru',
      description: 'Crafted 20+ Interactive Grafana Dashboards for payment monitoring, configured dynamic alert rules, and implemented metrics integration into Prometheus. Technologies: Grafana, PromQL, Prometheus, AlertManager, PHP.'
    }
  ];


  return (
    <section id="about" className="section min-h-screen flex items-center" style={{ backgroundColor: 'var(--bg-primary)' }} aria-label="About section" role="region" tabIndex={-1}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" tabIndex={0} aria-label="About Me">About Me</h2>
          <p className="section-subtitle" tabIndex={0} style={{ color: 'var(--text-secondary)', textShadow: '0 1px 2px #fff, 0 0 0 #000' }}>
            Get to know me better - my journey, experience, and what drives me to build exceptional software solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Profile image */}
              <div className="w-full h-96 rounded-2xl overflow-hidden">
                <div className="profile-img-container group w-full h-full rounded-2xl overflow-hidden transition-all duration-300 border-4 border-transparent hover:border-blue-400 hover:shadow-xl relative">
                  <LazyImage
                    src="/images/profile.jpg"
                    alt="Saurabh Maurya"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    fallback={
                      <div className="profile-fallback absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center transition-opacity duration-500 opacity-100 pointer-events-auto">
                        <div className="text-white text-center">
                          <div className="text-6xl mb-4">👤</div>
                          <p className="text-xl font-medium">Saurabh Maurya</p>
                          <p className="text-sm opacity-80">
                            {typeof window !== 'undefined' && !navigator.onLine
                              ? 'Profile photo unavailable offline'
                              : 'Profile photo unavailable'}
                          </p>
                        </div>
                      </div>
                    }
                    spinnerClassName="profile-spinner"
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: 'var(--accent-color)' }}></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: 'var(--primary-color)' }}></div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              {/* Experience */}
              <div>
                <h3 className="text-2xl font-bold mb-6 gradient-text" tabIndex={0} aria-label="Experience">Experience</h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-l-4 pl-6"
                      style={{ borderColor: 'var(--primary-color)' }}
                    >
                      <div className="text-sm font-medium mb-1" style={{ color: 'var(--primary-color)' }}>{exp.year}</div>
                      <h4 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{exp.title}</h4>
                      <p className="font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{exp.company} • {exp.location}</p>
                      <p style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>


            </div>
          </motion.div>
        </div>
      </div>

      {/* Resume Viewer Modal */}
      <ResumeViewer
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </section>
  );
};

export default About; 