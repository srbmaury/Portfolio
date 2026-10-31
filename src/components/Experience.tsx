import { motion } from 'framer-motion';
import profile from '../config/profile.json';

const Experience = () => (
  <section id="experience" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }} aria-label="Professional experience">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="section-title">Where I’ve worked</h2>
        <p className="section-subtitle">Engineering experience across enterprise platforms, payments, developer infrastructure, and observability.</p>
      </motion.div>

      <div className="career-timeline">
        {profile.experience.map((exp, index) => (
          <motion.article
            key={`${exp.company}-${exp.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="career-entry rounded-2xl border p-6 md:p-8"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
          >
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="career-step">0{index + 1} / {profile.experience.length}</p>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{exp.company}</h3>
                <p className="font-medium" style={{ color: 'var(--primary-color)' }}>{exp.title}</p>
              </div>
              <div className="text-sm sm:text-right" style={{ color: 'var(--text-secondary)' }}>
                <div>{exp.year}</div>
                <div>{exp.location}</div>
              </div>
            </div>

            <ul className="space-y-3">
              {exp.highlights.map((highlight, highlightIndex) => (
                <li key={highlight} className="experience-highlight flex gap-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span aria-hidden="true" className="experience-highlight-index">0{highlightIndex + 1}</span>
                  <span>{highlight.split(/(more than \d+|under \d+ minutes|\d+(?:%|x)?)/gi).map((part, index) => /(?:more than \d+|under \d+ minutes|\d+(?:%|x)?)/i.test(part) ? <strong className="impact-emphasis" key={`${highlightIndex}-${index}`}>{part}</strong> : part)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {exp.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-secondary)' }}>{tech}</span>
              ))}
              {exp.technologies.length > 4 && <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-secondary)' }}>+{exp.technologies.length - 4}</span>}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
