/**
 * Google Analytics utilities for tracking custom events
 *
 * Usage:
 * import { trackEvent, trackPageView } from './utils/analytics';
 * trackEvent('careerbot', 'question_asked', 'What is Saurabh's role?');
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * Track custom events in Google Analytics
 * @param category - Event category (e.g., 'careerbot', 'project', 'contact')
 * @param action - Event action (e.g., 'click', 'submit', 'view')
 * @param label - Optional event label for more context
 * @param value - Optional numeric value
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log('[Analytics] Event tracked:', { category, action, label, value });
  }
};

/**
 * Track page views (for SPAs)
 * @param path - Page path (e.g., '/projects', '/contact')
 * @param title - Page title
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
    console.log('[Analytics] Page view tracked:', path);
  }
};

/**
 * Track CareerBot interactions
 */
export const trackCareerBotEvent = (action: string, label?: string): void => {
  trackEvent('careerbot', action, label);
};

/**
 * Track project interactions
 */
export const trackProjectEvent = (action: string, projectName: string): void => {
  trackEvent('project', action, projectName);
};

/**
 * Track resume downloads
 */
export const trackResumeDownload = (): void => {
  trackEvent('resume', 'download', 'Resume PDF');
};

/**
 * Track contact form submissions
 */
export const trackContactFormSubmit = (success: boolean): void => {
  trackEvent('contact', success ? 'submit_success' : 'submit_error');
};
