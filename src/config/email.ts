import profile from './profile.json';

const configuredEmail = import.meta.env.VITE_TO_EMAIL?.trim();

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  toEmail: configuredEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredEmail)
    ? configuredEmail
    : profile.personalInfo.email,
  toName: import.meta.env.VITE_TO_NAME?.trim() || profile.personalInfo.name
};
