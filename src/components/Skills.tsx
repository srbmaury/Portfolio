import { motion } from 'framer-motion';
import { Activity, Bot, Cloud, Code, Network, Server } from 'lucide-react';
import profile from '../config/profile.json';

const skillIcons = { activity: Activity, bot: Bot, cloud: Cloud, code: Code, network: Network, server: Server };

const Skills = () => (
  <section id="skills" className="section" style={{ backgroundColor: 'var(--bg-primary)' }} aria-label="Technical toolkit">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="section-title">Technical Toolkit</h2>
        <p className="section-subtitle">The technologies I use most often across backend systems, data, infrastructure, and AI products.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profile.skillCategories.map((category, index) => {
          const Icon = skillIcons[category.icon as keyof typeof skillIcons] || Code;
          return (
            <motion.div key={category.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.05 }} viewport={{ once: true }} className="rounded-xl border p-5" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
              <div className="mb-4 flex items-center gap-3">
                <Icon size={20} style={{ color: 'var(--primary-color)' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="rounded-md px-2.5 py-1.5 text-sm" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-secondary)' }}>{skill}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Skills;
