import { motion } from 'framer-motion';
import profile from '../config/profile.json';

const Experience = () => (
  <section id="experience" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }} aria-label="Professional experience">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">Production engineering across enterprise platforms, payments, metadata systems, caching, and observability.</p>
      </motion.div>

      <div className="mx-auto max-w-4xl space-y-6">
        {profile.experience.map((exp, index) => (
          <motion.article
            key={`${exp.company}-${exp.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="rounded-2xl border p-6 md:p-8"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
          >
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{exp.company}</h3>
                <p className="font-medium" style={{ color: 'var(--primary-color)' }}>{exp.title}</p>
              </div>
              <div className="text-sm sm:text-right" style={{ color: 'var(--text-secondary)' }}>
                <div>{exp.year}</div>
                <div>{exp.location}</div>
              </div>
            </div>

            <ul className="space-y-3">
              {exp.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ backgroundColor: 'var(--primary-color)' }} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span key={tech} className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--text-secondary)' }}>{tech}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
