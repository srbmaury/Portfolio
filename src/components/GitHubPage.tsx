import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import GitHubStats from './GitHubStats';

const GitHubPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-lg shadow-lg transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </motion.button>
        </Link>
      </motion.div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 pb-8 text-center"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            GitHub Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my open-source contributions, repositories, and coding activity on GitHub.
          </p>
        </div>
      </motion.div>

      {/* GitHub Statistics */}
      <GitHubStats username="srbmaury" />

      {/* Additional GitHub Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 gradient-text">
              More About My GitHub Activity
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Open Source</h3>
                <p className="text-gray-600">
                  I actively contribute to open-source projects and maintain several repositories 
                  that help other developers in their projects.
                </p>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Learning</h3>
                <p className="text-gray-600">
                  My GitHub showcases my learning journey with projects ranging from 
                  beginner-friendly tutorials to complex full-stack applications.
                </p>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Collaboration</h3>
                <p className="text-gray-600">
                  I believe in the power of collaboration and welcome contributions, 
                  issues, and discussions on my repositories.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <a
                href="https://github.com/srbmaury"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors duration-300 text-lg font-medium"
              >
                Visit My Full GitHub Profile
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GitHubPage; 