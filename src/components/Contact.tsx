import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Linkedin, Github } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/email';
import { trackContactEvent, trackContactFormSubmit, trackContactFormIntent, trackSocialEvent } from '../utils/analytics';
import profile from '../config/profile.json';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasContactFormOpened, setHasContactFormOpened] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackContactFormIntent('contact_form_submit_attempt');
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init(emailConfig.publicKey);
      
      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: emailConfig.toName,
          to_email: emailConfig.toEmail
        }
      );
      
      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        trackContactFormSubmit(true);
      } else {
        setSubmitStatus('error');
        trackContactFormSubmit(false);
      }
    } catch {
      setSubmitStatus('error');
      trackContactFormSubmit(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: profile.personalInfo.email,
      link: `mailto:${profile.personalInfo.email}`
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: profile.personalInfo.location,
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, url: profile.personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <Github size={20} />, url: profile.personalInfo.github, label: 'GitHub' }
  ];

  const handleFormOpen = () => {
    if (!hasContactFormOpened) {
      setHasContactFormOpened(true);
      trackContactFormIntent('contact_form_start');
    }
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 gradient-text">Let's Talk</h3>
            
            <div className="space-y-3 sm:space-y-6 mb-6 sm:mb-8">
              {contactInfo.map((info, index) => {
                const content = (
                  <>
                    <div style={{ color: 'var(--primary-color)' }}>{info.icon}</div>
                    <div>
                      <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{info.title}</h4>
                      <p style={{ color: 'var(--text-secondary)' }}>{info.value}</p>
                    </div>
                  </>
                );

                return info.link === '#' ? (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-3 sm:p-4 rounded-lg"
                    style={{ backgroundColor: 'var(--tag-bg)' }}
                  >
                    {content}
                  </motion.div>
                ) : (
                  <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow duration-200"
                  style={{ backgroundColor: 'var(--tag-bg)' }}
                  onClick={() => {
                    if (info.title === 'Email') trackContactEvent('email_click');
                  }}
                >
                    {content}
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => trackSocialEvent(social.label)}
                    className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors duration-200 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)]"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="card">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Send Message</h3>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 border rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgb(34, 197, 94)', color: 'rgb(21, 128, 61)' }}>
                  Thank you for your message! I will get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 border rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgb(239, 68, 68)', color: 'rgb(185, 28, 28)' }}>
                  Sorry, there was an error sending your message. Please try again or contact me directly via email.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" onFocus={handleFormOpen}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg transition-colors duration-200 bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-[var(--primary-color)] focus:outline-none focus:shadow-[0_0_0_6px_rgba(59,130,246,0.06)]"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg transition-colors duration-200 bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-[var(--primary-color)] focus:outline-none focus:shadow-[0_0_0_6px_rgba(59,130,246,0.06)]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg transition-colors duration-200 bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-[var(--primary-color)] focus:outline-none focus:shadow-[0_0_0_6px_rgba(59,130,246,0.06)]"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg transition-colors duration-200 resize-none bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-[var(--primary-color)] focus:outline-none focus:shadow-[0_0_0_6px_rgba(59,130,246,0.06)]"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn btn-primary flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
