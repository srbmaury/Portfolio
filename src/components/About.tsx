import { motion } from 'framer-motion';

const About = () => {
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
    <section id="about" className="section bg-white min-h-screen flex items-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
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
                <img
                  src="/images/profile.jpg"
                  alt="Saurabh Maurya"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">👨‍💻</div>
                    <p className="text-xl font-medium">Saurabh Maurya</p>
                    <p className="text-sm opacity-80">Add your photo to /public/images/profile.jpg</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-20"></div>
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
                <h3 className="text-2xl font-bold mb-6 gradient-text">Experience</h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-l-4 border-blue-500 pl-6"
                    >
                      <div className="text-sm text-blue-600 font-medium mb-1">{exp.year}</div>
                      <h4 className="text-lg font-semibold mb-1">{exp.title}</h4>
                      <p className="text-gray-600 font-medium mb-2">{exp.company} • {exp.location}</p>
                      <p className="text-gray-600">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 