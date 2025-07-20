import { motion } from 'framer-motion';
import { Code, Database, Cloud, Cpu } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Fundamentals',
      icon: <Cpu size={24} />,
      skills: [
        'Data Structures & Algorithms',
        'System Design',
        'Object-Oriented Programming',
        'Problem Solving',
        'Code Review',
        'Testing & Debugging'
      ]
    },
    {
      title: 'Languages & Frameworks',
      icon: <Code size={24} />,
      skills: [
        'C++',
        'Java',
        'Python',
        'JavaScript',
        'Node.js',
        'React.js'
      ]
    },
    {
      title: 'Backend & Cloud',
      icon: <Cloud size={24} />,
      skills: [
        'RESTful APIs',
        'Docker',
        'AWS (EC2, Lambda)',
        'GraphQL',
        'Microservices',
        'CI/CD'
      ]
    },
    {
      title: 'Databases & Testing',
      icon: <Database size={24} />,
      skills: [
        'MySQL',
        'MongoDB',
        'Jest',
        'Selenium',
        'UTAM',
        'Prometheus'
      ]
    }
  ];

  return (
    <section id="skills" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            My technical skills and expertise across various technologies and tools.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <div className="mr-3" style={{ color: 'var(--primary-color)' }}>{category.icon}</div>
                <h3 className="text-xl font-bold gradient-text">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                    }}
                    className="px-4 py-3 rounded-lg border text-center transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      borderColor: 'var(--border-color)'
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Tools & Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Git', 'Grafana', 'PromQL', 'AlertManager', 'PHP', 'SOQL', 'Apex', 'LWC', 
              'Salesforce DB', 'D3.js', 'Connect REST APIs', 'UI APIs', 'GraphQL'
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                }}
                className="px-4 py-3 rounded-lg border text-center transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 