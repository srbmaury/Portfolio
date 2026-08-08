import { motion } from 'framer-motion';
import { Bot, Cloud, Code, Database, Network, Server } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code size={24} />,
      skills: [
        'Java',
        'Python',
        'C++',
        'JavaScript / TypeScript'
      ]
    },
    {
      title: 'Backend Technologies',
      icon: <Server size={24} />,
      skills: [
        'Spring Boot',
        'GraphQL',
        'REST APIs',
        'SQLAlchemy'
      ]
    },
    {
      title: 'Distributed Systems',
      icon: <Network size={24} />,
      skills: [
        'System Design',
        'Caching',
        'Event-Driven Architecture',
        'Scalability'
      ]
    },
    {
      title: 'Databases & Storage',
      icon: <Database size={24} />,
      skills: [
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'SQLite'
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: <Cloud size={24} />,
      skills: [
        'AWS (EC2, S3, RDS)',
        'Docker',
        'Git',
        'Bazel'
      ]
    },
    {
      title: 'AI & Agent Systems',
      icon: <Bot size={24} />,
      skills: [
        'MCP',
        'RAG',
        'LangChain / LangGraph',
        'Vector Databases'
      ]
    }
  ];

  return (
    <section id="skills" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }} aria-label="Skills section" role="region" tabIndex={-1}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" tabIndex={0} aria-label="Skills and Expertise">Skills & Expertise</h2>
          <p className="section-subtitle">
            My technical skills and expertise across various technologies and tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="card !p-6"
            >
              <div className="flex items-center mb-4">
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
                    className="px-3 py-2 rounded-lg border text-center transition-all duration-300"
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

      </div>
    </section>
  );
};

export default Skills;
