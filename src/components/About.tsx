import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import profile from '../config/profile.json';

const About = () => {
  return (
    <section id="about" className="section overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }} aria-label="About Saurabh" role="region" tabIndex={-1}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            The person behind the projects — what I enjoy building, learning, and exploring.
          </p>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mx-auto w-full max-w-xs">
            <div className="profile-img-container relative aspect-[4/5] overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
              <LazyImage src="/images/profile.jpg" alt={profile.personalInfo.name} sizes="(max-width: 768px) 80vw, 320px" className="h-full w-full object-cover" spinnerClassName="profile-spinner" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-7">
            <div className="space-y-4 text-base leading-8 md:text-lg" style={{ color: 'var(--text-secondary)' }}>
              <p>
                I’m a software engineer who enjoys building systems where product behavior and engineering depth meet — distributed platforms, developer tools, performance-sensitive applications, and ML-backed products.
              </p>
              <p>
                I currently work at Salesforce. Outside work, I spend a lot of time building open-source projects, studying system design, solving competitive programming problems, experimenting with new engineering ideas, and playing chess.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--primary-color)' }}>What I keep coming back to</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span key={interest} className="rounded-full border px-3 py-1.5 text-sm" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--tag-bg)', color: 'var(--text-primary)' }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {profile.achievements.map((achievement) => (
                <div key={achievement} className="rounded-xl border p-4 text-sm leading-relaxed" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' }}>
                  {achievement}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
